CREATE TABLE IF NOT EXISTS devices (
    id SERIAL PRIMARY KEY,
    device_name VARCHAR(100),
    age INTEGER,
    battery_health INTEGER,
    repair_count INTEGER,
    usage_hours FLOAT,
    discard_risk INTEGER,
    recommendation VARCHAR(50),
    resale_value INTEGER,
    sustainability_score INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);