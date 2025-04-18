from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import io
from PIL import Image
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)


def load_tflite_model(model_path):
    try:
        interpreter = tf.lite.Interpreter(model_path=model_path)
        interpreter.allocate_tensors()
        return interpreter
    except FileNotFoundError:
        print(f"Error: Model file not found at {model_path}")
        return None
    except Exception as e:
        print(f"Error loading TFLite model: {e}")
        return None

# Load models with error handling
model1 = load_tflite_model("densenet169.tflite")
model2 = load_tflite_model("inceptionv3.tflite")
meta_model = load_tflite_model("meta_model.tflite")

if not all([model1, model2, meta_model]):
    exit("Failed to load one or more models.")

def preprocess_image(image):
    image = image.resize((224, 224))
    image = np.array(image, dtype=np.float32) / 255.0
    image = np.expand_dims(image, axis=0)
    return image

def run_inference(interpreter, input_data):
    try:
        input_details = interpreter.get_input_details()
        output_details = interpreter.get_output_details()
        interpreter.set_tensor(input_details[0]['index'], input_data)
        interpreter.invoke()
        return interpreter.get_tensor(output_details[0]['index'])
    except Exception as e:
        print(f"Error during inference: {e}")
        return None

@app.route("/", methods=["GET"])
def index():
    return "Rice Disease Detection Backend is Running ✅", 200

@app.route('/', methods=['POST'])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image provided"}), 400

    file = request.files["image"]
    if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        return jsonify({"error": "Invalid file type. Only image files are accepted."}), 400

    try:
        image = Image.open(io.BytesIO(file.read())).convert("RGB")
        preprocessed_image = preprocess_image(image)

        features1 = run_inference(model1, preprocessed_image)
        features2 = run_inference(model2, preprocessed_image)

        if features1 is None or features2 is None:
            return jsonify({"error": "Inference failed for one of the models."}), 500

        combined_features = np.concatenate([features1.flatten(), features2.flatten()])
        combined_features = np.expand_dims(combined_features, axis=0).astype(np.float32)

        prediction = run_inference(meta_model, combined_features)[0]
        predicted_class = np.argmax(prediction)
        confidence = float(prediction[predicted_class]) * 100

        disease_info = [
            {"disease": "Bacterial Leaf Blight", "severity": "high", "description": "A bacterial disease that causes leaf yellowing and wilting.", "treatment": "Apply copper-based bactericides and ensure proper water drainage."},
            {"disease": "Brown Spot", "severity": "medium", "description": "A fungal disease causing brown lesions on leaves.", "treatment": "Use recommended fungicides and maintain proper soil nutrition."},
            {"disease": "Healthy", "severity": "none", "description": "The rice leaf is healthy.", "treatment": "No action needed."},
            {"disease": "Leaf Blast", "severity": "high", "description": "A fungal disease that causes elongated grayish lesions on leaves.", "treatment": "Apply fungicides and avoid excess nitrogen fertilizer."},
            {"disease": "Leaf Scald", "severity": "medium", "description": "A disease that causes reddish-brown streaks on leaves, leading to drying.", "treatment": "Use resistant varieties and avoid high nitrogen levels."},
            {"disease": "Narrow Brown Leaf Spot", "severity": "low", "description": "A fungal disease causing narrow brown spots on leaves.", "treatment": "Apply potassium fertilizer and use disease-resistant varieties."},
            {"disease": "Neck Blast", "severity": "high", "description": "A severe fungal disease that weakens the neck of rice panicles, causing yield loss.", "treatment": "Apply systemic fungicides and use resistant varieties."},
            {"disease": "Rice Hispa", "severity": "medium", "description": "An insect pest that scrapes leaf surfaces, reducing photosynthesis.", "treatment": "Use insecticides and introduce natural predators like parasitoid wasps."},
            {"disease": "Sheath Blight", "severity": "high", "description": "A fungal disease affecting rice sheaths, leading to lodging and yield loss.", "treatment": "Apply fungicides and ensure proper spacing between plants."},
            {"disease": "Tungro", "severity": "high", "description": "A viral disease transmitted by leafhoppers, causing yellow-orange discoloration.", "treatment": "Control leafhopper populations and plant resistant rice varieties."}
        ]

        result = disease_info[predicted_class]
        result["confidence"] = confidence
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": f"An error occurred: {e}"}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)


 
