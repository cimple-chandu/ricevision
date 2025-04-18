from flask import Flask, request, jsonify, make_response
import tensorflow as tf
import numpy as np
import io
from PIL import Image
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Dynamic (lazy) TFLite model loading to prevent memory overuse
def load_and_infer(model_path, input_data):
    try:
        interpreter = tf.lite.Interpreter(model_path=model_path)
        interpreter.allocate_tensors()
        input_details = interpreter.get_input_details()
        output_details = interpreter.get_output_details()
        interpreter.set_tensor(input_details[0]['index'], input_data)
        interpreter.invoke()
        return interpreter.get_tensor(output_details[0]['index'])
    except Exception as e:
        print(f"❌ Error loading or running model {model_path}: {e}")
        return None

def preprocess_image(image):
    image = image.resize((224, 224))
    image = np.array(image, dtype=np.float32) / 255.0
    return np.expand_dims(image, axis=0)

@app.after_request
def add_headers(response):
    # Ensure consistent response headers
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    response.headers["Content-Type"] = "application/json"
    return response

@app.route("/", methods=["GET"])
def index():
    return make_response(jsonify({"status": "✅ Rice Disease Detection Backend is Running"}), 200)

@app.route("/", methods=["POST"])
def predict():
    if "image" not in request.files:
        return make_response(jsonify({"error": "No image file provided."}), 400)

    file = request.files["image"]
    if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        return make_response(jsonify({"error": "Invalid file type. Only PNG, JPG, JPEG are allowed."}), 400)

    try:
        image = Image.open(io.BytesIO(file.read())).convert("RGB")
        preprocessed = preprocess_image(image)

        # Step 1: Leaf detection
        leaf_result = load_and_infer("detected.tflite", preprocessed)
        if leaf_result is None:
            return make_response(jsonify({"error": "Leaf detection model failed."}), 500)

        is_leaf = float(leaf_result[0][0]) > 0.5
        if not is_leaf:
            return jsonify({
                "disease": "Not a Leaf",
                "severity": "-",
                "description": "The uploaded image is not a rice leaf.",
                "treatment": "Please upload a valid rice leaf image.",
                "confidence": 0.0
            }), 200

        # Step 2: Feature extraction
        features_dense = load_and_infer("densenet169.tflite", preprocessed)
        features_incep = load_and_infer("inceptionv3.tflite", preprocessed)

        if features_dense is None or features_incep is None:
            return make_response(jsonify({"error": "Error in feature extraction."}), 500)

        combined = np.concatenate([features_dense.flatten(), features_incep.flatten()])
        combined = np.expand_dims(combined, axis=0).astype(np.float32)

        # Step 3: Meta model prediction
        meta_output = load_and_infer("meta_model.tflite", combined)
        if meta_output is None:
            return make_response(jsonify({"error": "Meta model inference failed."}), 500)

        prediction = meta_output[0]
        predicted_index = int(np.argmax(prediction))
        confidence = round(float(prediction[predicted_index]) * 100, 2)

        disease_info = [
            {"disease": "Bacterial Leaf Blight", "severity": "High", "description": "A bacterial disease that causes leaf yellowing and wilting.", "treatment": "Apply copper-based bactericides and ensure proper water drainage."},
            {"disease": "Brown Spot", "severity": "Medium", "description": "A fungal disease causing brown lesions on leaves.", "treatment": "Use recommended fungicides and maintain proper soil nutrition."},
            {"disease": "Healthy", "severity": "None", "description": "The rice leaf is healthy.", "treatment": "No action needed."},
            {"disease": "Leaf Blast", "severity": "High", "description": "A fungal disease that causes elongated grayish lesions on leaves.", "treatment": "Apply fungicides and avoid excess nitrogen fertilizer."},
            {"disease": "Leaf Scald", "severity": "Medium", "description": "A disease that causes reddish-brown streaks on leaves, leading to drying.", "treatment": "Use resistant varieties and avoid high nitrogen levels."},
            {"disease": "Narrow Brown Leaf Spot", "severity": "Low", "description": "A fungal disease causing narrow brown spots on leaves.", "treatment": "Apply potassium fertilizer and use disease-resistant varieties."},
            {"disease": "Neck Blast", "severity": "High", "description": "A severe fungal disease that weakens the neck of rice panicles, causing yield loss.", "treatment": "Apply systemic fungicides and use resistant varieties."},
            {"disease": "Rice Hispa", "severity": "Medium", "description": "An insect pest that scrapes leaf surfaces, reducing photosynthesis.", "treatment": "Use insecticides and introduce natural predators like parasitoid wasps."},
            {"disease": "Sheath Blight", "severity": "High", "description": "A fungal disease affecting rice sheaths, leading to lodging and yield loss.", "treatment": "Apply fungicides and ensure proper spacing between plants."},
            {"disease": "Tungro", "severity": "High", "description": "A viral disease transmitted by leafhoppers, causing yellow-orange discoloration.", "treatment": "Control leafhopper populations and plant resistant rice varieties."}
        ]

        result = disease_info[predicted_index]
        result["confidence"] = confidence
        result["class_index"] = predicted_index

        return jsonify(result), 200

    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return make_response(jsonify({"error": f"Unexpected error occurred: {str(e)}"}), 500)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
