import pandas as pd
import random

data = []

for _ in range(5000):

    age = random.randint(1, 8)
    battery_health = random.randint(40, 100)
    repair_count = random.randint(0, 5)
    usage_hours = random.randint(1, 12)

    resale_value = (
        50000
        - age * 7000
        - (100 - battery_health) * 150
    )

    resale_value = max(5000, resale_value)

    discarded = 1 if (
        battery_health < 65
        or age > 4
        or repair_count > 2
    ) else 0

    data.append([
        age,
        battery_health,
        repair_count,
        usage_hours,
        resale_value,
        discarded
    ])

df = pd.DataFrame(
    data,
    columns=[
        "device_age",
        "battery_health",
        "repair_count",
        "usage_hours",
        "resale_value",
        "discarded"
    ]
)

df.to_csv("device_dataset.csv", index=False)

print("Dataset generated successfully!")