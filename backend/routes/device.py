from fastapi import APIRouter
from schemas.device_schema import DeviceInput
from database.db import get_connection

router = APIRouter()


@router.post("/register-device")
def register_device(device: DeviceInput):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO devices (
            device_name,
            age,
            battery_health,
            repair_count,
            usage_hours
        )
        VALUES (%s, %s, %s, %s, %s)
        RETURNING id
    """,
    (
        device.device_name,
        device.age,
        device.battery_health,
        device.repair_count,
        device.usage_hours
    ))

    device_id = cur.fetchone()[0]

    conn.commit()

    cur.close()
    conn.close()

    return {
        "message": "Device Registered",
        "device_id": device_id
    }


@router.get("/devices")
def get_devices():

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT *
        FROM devices
        ORDER BY id DESC
    """)

    rows = cur.fetchall()

    devices = []

    for row in rows:
        devices.append({
    "id": row[0],
    "device_name": row[1],
    "age": row[2],
    "battery_health": row[3],
    "repair_count": row[4],
    "usage_hours": row[5],
    "discard_risk": row[6],
    "recommendation": row[7],
    "resale_value": row[8],
    "sustainability_score": row[9]
})

    cur.close()
    conn.close()

    return devices