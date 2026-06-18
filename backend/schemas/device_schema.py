from pydantic import BaseModel


class DeviceInput(BaseModel):
    device_name: str
    age: int
    battery_health: int
    repair_count: int
    usage_hours: float