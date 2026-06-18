def estimate_resale_value(age, battery_health):

    base_price = 50000

    age_penalty = age * 7000
    battery_penalty = (100 - battery_health) * 150

    resale_value = (
        base_price
        - age_penalty
        - battery_penalty
    )

    return max(5000, resale_value)