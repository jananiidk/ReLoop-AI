from fastapi import APIRouter

from schemas.device_schema import DeviceInput

from utils.resale import estimate_resale_value
from utils.sustainability import calculate_sustainability_score
from utils.recommendation import get_recommendation

router = APIRouter()


@router.post("/recommend-action")
def recommend(device: DeviceInput):

    resale_value = estimate_resale_value(
        device.age,
        device.battery_health
    )

    recommendation = get_recommendation(
        device.battery_health,
        resale_value,
        device.repair_count
    )

    sustainability_score = calculate_sustainability_score(
        device.battery_health,
        resale_value,
        device.repair_count
    )

    return {
        "recommendation": recommendation,
        "resale_value": resale_value,
        "sustainability_score": sustainability_score
    }