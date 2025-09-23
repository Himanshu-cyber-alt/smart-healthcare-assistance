
# from fastapi import FastAPI
# from pydantic import BaseModel
# import joblib
# from fastapi.middleware.cors import CORSMiddleware

# # Load trained model and symptom list
# model = joblib.load("disease_model.pkl")
# symptoms_list = joblib.load("symptoms.pkl")  # this is a list of all symptoms/features

# app = FastAPI()

# # Enable CORS for your React frontend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],  # React frontend URL
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Pydantic model for request body
# class Symptoms(BaseModel):
#     symptoms: list[str]

# # Predict endpoint
# @app.post("/predict")
# def predict(data: Symptoms):
#     # Convert selected symptoms into feature vector
#     input_vec = [1 if s in data.symptoms else 0 for s in symptoms_list]

#     # Predict disease
#     disease = model.predict([input_vec])[0]

#     # Map predicted disease to doctor recommendation
#     doctor_map = {
#         "Diabetes": "Endocrinologist",
#         "Asthma": "Pulmonologist",
#         "Migraine": "Neurologist",
#         "Heart Disease": "Cardiologist",
#         "Flu": "General Physician"
#     }

#     return {
#         "predicted_disease": disease,
#         "recommended_doctor": doctor_map.get(disease, "General Physician")
#     }

# app.py
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
from fastapi.middleware.cors import CORSMiddleware
from data import doctor_map

# Load trained model and features
model = joblib.load("disease_model.pkl")
symptoms_list = joblib.load("symptoms.pkl")

app = FastAPI()

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your React app
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class Symptoms(BaseModel):
    symptoms: list[str]

@app.post("/predict")
def predict(data: Symptoms):
    # Convert symptoms to feature vector
    input_vec = [1 if s in data.symptoms else 0 for s in symptoms_list]
    
    disease = model.predict([input_vec])[0]
    recommended_doctor = doctor_map.get(disease, "General Physician")
    
    return {
        "predicted_disease": disease,
        "recommended_doctor": recommended_doctor
    }
