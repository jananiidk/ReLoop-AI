import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

df = pd.read_csv("../datasets/device_dataset.csv")

X = df[
    [
        "device_age",
        "battery_health",
        "repair_count",
        "usage_hours",
        "resale_value"
    ]
]

y = df["discarded"]

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X, y)

joblib.dump(model, "model.pkl")

print("Model trained successfully!")