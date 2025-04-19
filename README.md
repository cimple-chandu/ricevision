# 🌾 Rice Leaf Disease Detection using Deep Learning and Model Ensembling Techniques

Rice is a staple crop vital for food security. Early disease detection reduces yield loss and promotes sustainable farming. This project presents an advanced system for rice leaf disease detection using deep learning and ensemble learning techniques.

A native mobile app and progressive web application (PWA) have been developed to provide real-time, accessible disease identification for farmers, contributing to precision agriculture and better crop management.

🌐 [Live Website](https://ricevision.vercel.com)

---

## 🚀 Features

- 📸 Upload rice leaf images via web or mobile app
- 🤖 Detect rice diseases using deep learning models
- 🔗 Ensemble learning for highly accurate predictions (99%)
- 📊 Real-time disease classification into 10 categories
- 🌐 Deployed as both native mobile app and PWA  
- 💬 AI-powered chatbot for assistance and disease info
- 📱 User-friendly interface for farmers and agriculture experts

---

## 🧠 Models Used

| Model         | Accuracy |
|---------------|----------|
| ResNet152V2   | 95%      |
| DenseNet169   | 97%      |
| InceptionV3   | 97%      |
| MobileNetV2   | 96%      |
| **Meta-model (Stacking Ensemble)** | **99%** |

All models are fine-tuned on the **Rice Leaf Disease Dataset** from [Kaggle](https://www.kaggle.com/datasets/loki4514/rice-leaf-diseases-detection) and exported to **TFLite** format for mobile integration.

---

## 🖼️ Disease Classes (10 Total)

1. Bacterial Leaf Blight  
2. Brown Spot  
3. Leaf Blast  
4. Leaf Scald  
5. Narrow Brown Spot  
6. Sheath Blight  
7. Sheath Rot  
8. Tungro  
9. Rice Blast  
10. Healthy Leaf

---

## 💬 AI Chatbot Support

The web app includes an intelligent chatbot that:
- Provides information about each rice disease
- Answers common queries in farmer-friendly language


---

## 🧰 Tech Stack

### Frontend
- React + Vite
- TypeScript
- Tailwind CSS
- PWA (via Capacitor/Expo) 
- Offline support via Service Worker

### Backend
- Python Flask 
- TensorFlow Lite for model inference

### Android App
- Android Studio (Kotlin)

---

## 🧱 System Architecture

User Input (Image)
       ↓
Frontend (React + TS)
       ↓
Flask Backend API
       ↓
TFLite Model Ensemble
       ↓
Meta-model Prediction (99% accuracy)
       ↓
Result (Disease Class + Advice)

       
## 🛠️ How to Run Locally

### Frontend
-cd frontend
-npm run dev


### Backend
-cd backend
-python app.py




## 📄 License

This project is licensed under the ricevision License.

## 🙏 Acknowledgements

- Kaggle for the Rice Leaf Dataset
- ChatGPT, Gemini, Google Colab, VS Code, Lovable, GitHub, Render, Vercel...

