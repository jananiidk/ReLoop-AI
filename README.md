# ReLoop AI - Backend

## Overview

ReLoop AI is an AI-powered Circular Economy platform that predicts whether an electronic device is likely to be discarded and recommends the best sustainability pathway such as Repair, Sell, Donate, or Recycle.

The backend uses FastAPI, PostgreSQL, and a Machine Learning model to analyze device health, estimate resale value, and generate sustainability insights.

## Tech Stack

* Python
* FastAPI
* PostgreSQL
* Scikit-learn
* Pandas
* NumPy

## Setup

### Install Dependencies
```bash
pip install -r requirements.txt
```
### Configure Database
Open:
```text
database/db.py
```
Replace:
```python
"password": "YOUR_PASSWORD"
```
with your PostgreSQL password.
### Run Backend

```bash
python -m uvicorn main:app --reload
```
