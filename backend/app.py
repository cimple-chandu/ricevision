from flask import Flask, request, jsonify
import tensorflow.lite as tflite
import numpy as np
import io
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def load_tflite_model(model_path):
    interpreter = tflite.Interpreter(model_path=model_path)
    interpreter.allocate_tensors()
    return interpreter

# Load models
model1 = load_tflite_model("densenet169_model.tflite")
model2 = load_tflite_model("inceptionv3_model.tflite")
meta_model = load_tflite_model("meta_model.tflite")

def preprocess_image(image):
    image = image.resize((224, 224))
    image = np.array(image, dtype=np.float32) / 255.0
    image = np.expand_dims(image, axis=0)
    return image

def run_inference(interpreter, input_data):
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()
    interpreter.set_tensor(input_details[0]['index'], input_data)
    interpreter.invoke()
    return interpreter.get_tensor(output_details[0]['index'])

@app.route('/predict', methods=['POST'])  # Updated route
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image provided"}), 400

    file = request.files["image"]
    image = Image.open(io.BytesIO(file.read())).convert("RGB")
    preprocessed_image = preprocess_image(image)

    features1 = run_inference(model1, preprocessed_image)
    features2 = run_inference(model2, preprocessed_image)
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

if __name__ == "__main__":
    app.run(debug=True)