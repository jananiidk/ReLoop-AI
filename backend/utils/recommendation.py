def get_recommendation(
    battery_health,
    resale_value,
    repair_count
):

    if battery_health >= 85 and resale_value >= 25000:
        return "Sell"

    elif battery_health >= 60 and repair_count <= 2:
        return "Repair"

    elif battery_health >= 40:
        return "Donate"

    else:
        return "Recycle"