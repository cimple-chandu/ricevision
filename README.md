# Rice Disease Detection

## Overview

The **Rice Disease Detection** project is an AI-powered web application that helps farmers detect rice diseases using machine learning. The system uses a **TFLite model** for disease classification and provides a **confidence score** for predictions. It also includes a **chatbot** for farmers and an **animated results display** to enhance user experience.

## Tech Stack

- **Frontend:** React (Vite, Framer Motion for animations)
- **Backend:** Flask (Serving TFLite model)
- **Machine Learning Model:** TensorFlow Lite (TFLite)
- **UI Enhancements:** Animated results using Framer Motion
- **Chatbot:** Integrated for farmer assistance

## Features

✅ **Rice Disease Detection** using TFLite Model\
✅ **Confidence Score** Display for Predictions\
✅ **Chatbot** Assistance for Farmers\
✅ **Animated Results** using Framer Motion\
✅ **Fast & Lightweight** with React Vite & Flask

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- Node.js & npm
- Python 3.x
- pip
- Virtual environment (optional but recommended)

### Backend (Flask)

```bash
# Clone the repository
git clone https://github.com/your-repo/rice-disease-detection.git
cd rice-disease-detection/backend

# Create virtual environment (optional)
python -m venv venv
source venv/bin/activate  # On Windows use 'venv\Scripts\activate'

# Install dependencies
pip install -r requirements.txt

# Run Flask server
python app.py
```

### Frontend (React + Vite)

```bash
cd ../frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

## API Endpoints (Flask Backend)

| Method | Endpoint | Description                                                       |
| ------ | -------- | ----------------------------------------------------------------- |
| POST   | /predict | Takes an image & returns disease prediction with confidence score |
                                       |

## Deployment

For deployment, you can use:

- **Frontend:** Vercel / Netlify
- **Backend:** Render / Heroku / AWS

## Future Enhancements

- Multi-language support
- History & Reports for past detections
- Mobile App version

## License

This project is open-source under the **MIT License**.

---

Developed by **Sai Chandu Gedela** 🚀

Machine Learning Enthusiast

