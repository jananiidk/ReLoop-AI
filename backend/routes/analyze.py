from fastapi import APIRouter

from schemas.device_schema import DeviceInput
from models.predict import predict_discard_risk

from utils.resale import estimate_resale_value
from utils.sustainability import calculate_sustainability_score
from utils.recommendation import get_recommendation

from database.db import get_connection

router = APIRouter()


@router.post("/analyze-device")
def analyze_device(device: DeviceInput):

    resale_value = estimate_resale_value(
        device.age,
        device.battery_health
    )

    discard_risk = predict_discard_risk(
        device.age,
        device.battery_health,
        device.repair_count,
        device.usage_hours,
        resale_value
    )

    sustainability_score = calculate_sustainability_score(
        device.battery_health,
        resale_value,
        device.repair_count
    )

    recommendation = get_recommendation(
        device.battery_health,
        resale_value,
        device.repair_count
    )

    # Risk Level
    if discard_risk < 30:
        risk_level = "Low"
    elif discard_risk < 70:
        risk_level = "Medium"
    else:
        risk_level = "High"

    # Environmental Impact Estimate
    estimated_eco_impact = round(
    (
        sustainability_score * 0.4
        + (100 - discard_risk) * 0.4
        + (resale_value / 50000) * 20
    ),
    2
)

    recommendation_reasons = {
        "Sell": "Device is in excellent condition and retains strong market value.",
        "Repair": "Repairing the device can extend its lifespan and reduce e-waste.",
        "Donate": "The device still has useful life and can benefit another user.",
        "Recycle": "The device has reached the end of its practical lifecycle and should be recycled responsibly."
    }

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO devices (
            device_name,
            age,
            battery_health,
            repair_count,
            usage_hours,
            discard_risk,
            recommendation,
            resale_value,
            sustainability_score
        )
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """,
    (
        device.device_name,
        device.age,
        device.battery_health,
        device.repair_count,
        device.usage_hours,
        discard_risk,
        recommendation,
        resale_value,
        sustainability_score
    ))

    conn.commit()

    cur.close()
    conn.close()

    return {
        "device_name": device.device_name,
        "discard_risk": discard_risk,
        "risk_level": risk_level,
        "recommendation": recommendation,
        "recommendation_reason": recommendation_reasons[recommendation],
        "resale_value": resale_value,
        "sustainability_score": sustainability_score,
        "estimated_eco_impact": estimated_eco_impact
    }