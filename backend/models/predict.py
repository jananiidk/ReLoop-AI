import joblib

model = joblib.load("models/model.pkl")


def predict_discard_risk(
    age,
    battery_health,
    repair_count,
    usage_hours,
    resale_value
):

    probabilities = model.predict_proba(
        [[
            age,
            battery_health,
            repair_count,
            usage_hours,
            resale_value
        ]]
    )

    risk = round(probabilities[0][1] * 100)

    return risk