# medical-simplifier/backend/main.py

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import spacy
import logging

# --- Setup Logging ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# --- FastAPI App Initialization ---
app = FastAPI(
    title="Medical Terminology Simplifier API",
    description="API for simplifying medical jargon and providing explanations.",
    version="0.1.0",
)

# Configure CORS to allow your React frontend to communicate with the backend
origins = [
    "http://localhost:5173",  # Default Vite/React dev server port
    "http://127.0.0.1:5173",
    # Add other frontend URLs if you deploy it later (e.g., "https://your-frontend-domain.com")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Load SpaCy Model (Run once on startup) ---
try:
    # We are using en_core_web_sm for demonstration.
    # For a real medical application, consider 'en_core_sci_lg' from scispaCy
    # or a custom-trained medical NER model.
    nlp = spacy.load("en_core_web_sm")
    logger.info("SpaCy 'en_core_web_sm' model loaded successfully.")
except OSError:
    logger.error("SpaCy model 'en_core_web_sm' not found. Please run 'python -m spacy download en_core_web_sm'")
    # You might want to raise an exception or handle this gracefully for production
    nlp = None # Set to None to prevent further errors if not loaded

# --- Simple In-Memory Medical Glossary (for demonstration) ---
# In a real application, this would be loaded from a database.
# Keys are complex terms (case-insensitive for lookup), values are simple explanations.
MEDICAL_GLOSSARY = {
    "hypertension": "High blood pressure. This means the force of your blood against the walls of your arteries is too high, which can lead to health problems.",
    "myocardial infarction": "Heart attack. This happens when blood flow to a part of your heart is blocked, usually by a blood clot, causing heart muscle to die.",
    "diabetes mellitus": "Diabetes. A condition where your body either doesn't produce enough insulin or can't effectively use the insulin it produces, leading to high blood sugar levels.",
    "tachycardia": "Fast heart rate. This is when your heart beats too quickly, usually over 100 beats per minute.",
    "bradycardia": "Slow heart rate. This is when your heart beats unusually slowly, usually under 60 beats per minute.",
    "benign": "Not cancerous. It means a growth or tumor is not harmful and won't spread to other parts of the body.",
    "malignant": "Cancerous. It means a growth or tumor is harmful, can grow aggressively, and might spread to other parts of the body.",
    "prognosis": "The likely outcome or course of a disease; a forecast of the probable course and outcome of a disease.",
    "etiology": "The cause or origin of a disease or condition.",
    "pathology": "The study of disease, or the changes in the body caused by disease.",
    "edema": "Swelling caused by fluid trapped in your body's tissues.",
    "gastritis": "Inflammation of the stomach lining.",
    "appendectomy": "Surgical removal of the appendix.",
    "carcinoma": "A type of cancer that starts in cells that make up the skin or the tissue lining organs.",
    "fracture": "A break in a bone.",
    "biopsy": "A medical procedure that involves taking a small sample of tissue from the body to examine it more closely, usually under a microscope, to check for disease."
}

# --- Request Body Model ---
class TextToSimplify(BaseModel):
    text: str

# --- API Endpoint for Simplification ---
@app.post("/simplify")
async def simplify_medical_text(input_data: TextToSimplify):
    if nlp is None:
        raise HTTPException(status_code=500, detail="SpaCy model not loaded. Backend initialization failed.")

    original_text = input_data.text
    doc = nlp(original_text)

    simplified_phrases = [] # To store original phrase, simplified explanation, and its position
    processed_text = original_text # This will be the text to potentially modify or use for display

    # Identify terms from the glossary that are present in the text
    # We'll use a simple matching for now. For more complex cases, rule-based matchers or custom NER would be better.
    found_terms = []
    for term, explanation in MEDICAL_GLOSSARY.items():
        # Case-insensitive search
        if term.lower() in original_text.lower():
            # Find all occurrences and their start/end indices
            # This is a very basic way; for overlapping or more complex matches, Spacy's Matcher is better.
            start_index = 0
            while True:
                idx = original_text.lower().find(term.lower(), start_index)
                if idx == -1:
                    break
                end_idx = idx + len(term)
                # Store original casing from the text itself
                original_phrase_found = original_text[idx:end_idx]
                found_terms.append({
                    "term": original_phrase_found,
                    "explanation": explanation,
                    "start": idx,
                    "end": end_idx
                })
                start_index = end_idx # Continue searching after this found term

    # Sort found terms by their start index to avoid issues with modifying text
    # This also helps in rendering on the frontend
    found_terms.sort(key=lambda x: x['start'])

    # --- Simple Text Simplification Strategy (Placeholder) ---
    # For MVP, we'll return the identified terms and their explanations.
    # More advanced simplification would involve replacing terms inline or rephrasing sentences.
    # For now, we'll return the original text, and the frontend will highlight/display explanations.

    # Example: How you might use SpaCy's NER
    # spaCy's default NER might not pick up medical terms accurately without a specialized model.
    # For instance, "Hypertension" might not be classified as a specific medical entity by `en_core_web_sm`.
    # It focuses on PERSON, ORG, GPE, DATE, etc.
    # For demo, we are relying on our simple `MEDICAL_GLOSSARY` lookup first.
    
    # You could iterate through doc.ents if you had a medical NER model
    # for ent in doc.ents:
    #    if ent.label_ == "DISEASE" or ent.label_ == "SYMPTOM":
    #        # Look up explanation, etc.
    #        print(f"SpaCy detected: {ent.text} ({ent.label_})")

    response_data = {
        "original_text": original_text,
        "simplified_parts": found_terms, # List of identified terms with explanations and positions
        "message": "Processed text. Found terms will be highlighted by the frontend."
    }
    
    logger.info(f"Processed text of length {len(original_text)}. Found {len(found_terms)} glossary terms.")
    return response_data

# --- Health Check Endpoint ---
@app.get("/")
async def read_root():
    logger.info("GET / accessed (Health check).")
    return {"message": "Medical Terminology Simplifier Backend is running!"}

# --- Run the FastAPI application ---
if __name__ == "__main__":
    import uvicorn
    logger.info("Starting Uvicorn server for FastAPI application...")
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)