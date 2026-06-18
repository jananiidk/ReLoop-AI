from fastapi import APIRouter

from schemas.device_schema import DeviceInput
from models.predict import predict_discard_risk
from utils.resale import estimate_resale_value

router = APIRouter()


@router.post("/predict-risk")
def predict_risk(device: DeviceInput):

    resale_value = estimate_resale_value(
        device.age,
        device.battery_health
    )

    risk = predict_discard_risk(
        device.age,
        device.battery_health,
        device.repair_count,
        device.usage_hours,
        resale_value
    )

    return {
        "discard_risk": risk
    }