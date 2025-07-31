# AI Medical Terminology Simplifier

A modern and interactive web application designed to simplify complex medical jargon for a general audience. It serves as a personal patient comprehension assistant by highlighting key medical terms in a provided text and offering simple, clear explanations in a professional and engaging user interface.

This project showcases full-stack development, with a Python backend handling the core logic and a dynamic React frontend providing an attractive user experience.

## Features

* **Glossary-Based Simplification:** The backend identifies and matches specific medical terms against a pre-defined glossary.
* **Interactive UI:** A modern, dark-themed user interface built with Material UI that is fully responsive across different devices.
* **Live Highlighting:** Identified medical terms are highlighted in the text, and their simplified explanations are displayed in a tooltip on hover.
* **Dynamic Animations:** Subtle entrance and interactive animations enhance the user experience and give the application a polished, professional feel.
* **Efficient Backend:** A lightweight, high-performance FastAPI backend handles the text processing.

## Tech Stack

**Frontend (React.js):**

* **React.js:** A JavaScript library for building the user interface.
* **Material UI (MUI):** A comprehensive component library for a polished and consistent design.
* **Framer Motion:** A popular library for adding fluid animations and motion effects.
* **Axios:** A promise-based HTTP client for making API calls to the backend.

**Backend (FastAPI):**

* **Python:** The core language for the backend API.
* **FastAPI:** A modern, high-performance web framework.
* **Uvicorn:** The ASGI server used to run the FastAPI application.
* **SpaCy:** An industrial-strength NLP library used for basic text processing and term identification.

## Setup Instructions

Follow these steps to get the project running on your local machine.

### Prerequisites

* **Python 3.9+:** [Download from python.org](https://www.python.org/downloads/)
* **Node.js & npm:** [Download from nodejs.org](https://nodejs.org/en/download/)
* **Git:** [Download from git-scm.com](https://git-scm.com/downloads)

### 1. Backend Setup

1.  Navigate to the `api` directory in your terminal:
    ```bash
    cd medical-simplifier/api
    ```
2.  Create and activate a Python virtual environment:
    ```bash
    # Create the virtual environment
    python -m venv venv
    # Activate on Windows (PowerShell)
    .\venv\Scripts\Activate.ps1
    # On macOS/Linux
    source venv/bin/activate
    ```
3.  Install the backend dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Download the required SpaCy model:
    ```bash
    python -m spacy download en_core_web_sm
    ```

### 2. Frontend Setup

1.  Open a **new** terminal and navigate to the `frontend` directory:
    ```bash
    cd medical-simplifier/frontend
    ```
2.  Install the Node.js dependencies:
    ```bash
    npm install
    ```

### 3. Running the Application

Open two separate terminal windows.

* **Terminal 1 (Backend):**
    ```bash
    cd medical-simplifier/api
    # Activate your venv if not already active
    uvicorn main:app --reload --port 8000
    ```
* **Terminal 2 (Frontend):**
    ```bash
    cd medical-simplifier/frontend
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173`.

## Supported Medical Terms

The application currently provides explanations for the following medical terms from its internal glossary. If a term is not on this list, it will not be highlighted.

* **appendectomy:** Surgical removal of the appendix.
* **benign:** Not cancerous; a growth or tumor that won't spread.
* **biopsy:** Taking a small tissue sample to check for disease.
* **bradycardia:** An unusually slow heart rate (under 60 bpm).
* **carcinoma:** A type of cancer that starts in cells lining organs or skin.
* **diabetes mellitus:** A condition where the body cannot regulate blood sugar properly.
* **edema:** Swelling caused by fluid trapped in your body's tissues.
* **etiology:** The cause or origin of a disease or condition.
* **fracture:** A break in a bone.
* **gastritis:** Inflammation of the stomach lining.
* **hypertension:** High blood pressure.
* **malignant:** Cancerous; a harmful growth that may spread.
* **myocardial infarction:** A heart attack, caused by a blocked blood flow to the heart.
* **pathology:** The study of disease and its effects on the body.
* **prognosis:** The likely outcome or course of a disease.
* **tachycardia:** A fast heart rate (over 100 bpm).
