from utils.resale import estimate_resale_value
from utils.sustainability import calculate_sustainability_score
from utils.recommendation import get_recommendation

resale = estimate_resale_value(3, 72)

score = calculate_sustainability_score(
    72,
    resale,
    2
)

action = get_recommendation(
    72,
    resale,
    2
)

print("Resale Value:", resale)
print("Sustainability Score:", score)
print("Recommendation:", action)