def calculate_sustainability_score(
    battery_health,
    resale_value,
    repair_count
):

    score = (
        battery_health * 0.5
        + (resale_value / 50000) * 30
        - repair_count * 5
    )

    score = max(0, min(100, round(score)))

    return score