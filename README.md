# ReLoop AI

## Overview

ReLoop AI is an AI-powered Circular Economy platform designed to reduce electronic waste by predicting when a device is likely to be discarded and recommending the most sustainable next step.
Using Machine Learning, the platform analyzes Samsung Mobile device age, battery health, repair history, usage patterns, and resale value to generate disposal risk predictions, sustainability insights, and recommendations such as Repair, Sell, Donate, or Recycle.

## Tech Stack

### Backend

* Python
* FastAPI
* PostgreSQL
* Scikit-learn
* Pandas
* NumPy

### Frontend

* React
* Vite
* JavaScript
* CSS

---

## Setup

### Clone Repository

```bash
git clone https://github.com/jananiidk/ReLoop-AI.git
cd ReLoop-AI
```

---

## Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure PostgreSQL credentials in:

```text
backend/database/db.py
```

Replace:

```python
"password": "YOUR_PASSWORD"
```

with your PostgreSQL password.

Run backend:

```bash
python -m uvicorn main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger Documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

Open a new terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## Features

* Device Registration
* Device Lifecycle Analysis
* Discard Risk Prediction
* Sustainability Scoring
* Eco Impact Scoring
* Resale Value Estimation
* AI-Powered Recommendations
* PostgreSQL Device History Storage

## Built By

* @jananiidk
* @Vidhushaaa30
