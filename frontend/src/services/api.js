import axios from 'axios';

// Base URL for backend. Vite proxies '/api' to 'http://localhost:8000'
const API_BASE = '/api';

// Simple check if API is available. Falls back to mock data if it fails.
let useSimulator = false;

// Set up axios instance
const client = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 4000, // Quick timeout to failover to mock data instantly if backend is down
});

// Interceptor to catch connection errors and trigger simulation mode
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!useSimulator && (!error.response || error.code === 'ECONNABORTED' || error.message.includes('Network Error'))) {
      console.warn('Backend API connection failed. ReLoop AI is automatically switching to High-Fidelity Client-Side Simulation Mode for the hackathon demo.');
      useSimulator = true;
    }
    return Promise.reject(error);
  }
);

// --- SIMULATOR UTILS & DATA ---
const MOCK_DEVICES_DB = [];

const SAMSUNG_MODELS_INFO = {
  'Galaxy S24 Ultra': { originalPrice: 1299, repairability: 9, carbonMfg: 74, carbonSavedPerAction: { repair: 60, sell: 70, donate: 74, recycle: 55 } },
  'Galaxy S23': { originalPrice: 799, repairability: 8, carbonMfg: 61, carbonSavedPerAction: { repair: 50, sell: 58, donate: 61, recycle: 45 } },
  'Galaxy S21': { originalPrice: 799, repairability: 7, carbonMfg: 58, carbonSavedPerAction: { repair: 48, sell: 55, donate: 58, recycle: 42 } },
  'Galaxy Z Fold 5': { originalPrice: 1799, repairability: 5, carbonMfg: 110, carbonSavedPerAction: { repair: 85, sell: 100, donate: 110, recycle: 80 } },
  'Galaxy Z Flip 5': { originalPrice: 999, repairability: 6, carbonMfg: 82, carbonSavedPerAction: { repair: 65, sell: 75, donate: 82, recycle: 60 } },
  'Galaxy Tab S9': { originalPrice: 799, repairability: 6, carbonMfg: 95, carbonSavedPerAction: { repair: 70, sell: 85, donate: 95, recycle: 70 } },
  'Galaxy Book 4 Pro': { originalPrice: 1449, repairability: 7, carbonMfg: 220, carbonSavedPerAction: { repair: 160, sell: 200, donate: 220, recycle: 170 } },
  'Galaxy Watch 6': { originalPrice: 299, repairability: 5, carbonMfg: 28, carbonSavedPerAction: { repair: 20, sell: 25, donate: 28, recycle: 20 } },
};

// Calculate Estimated Resale Value based on age, battery and repairs
function calculateResaleValue(deviceModel, age, batteryHealth, repairCount) {
  const info = SAMSUNG_MODELS_INFO[deviceModel] || { originalPrice: 600 };
  let baseVal = info.originalPrice;
  
  // Depreciation factor based on age
  const ageDepreciation = Math.pow(0.78, age); // 22% depreciation per year
  
  // Battery health discount factor
  const batteryFactor = batteryHealth / 100;
  
  // Repair penalty
  const repairFactor = Math.max(0.7, 1 - (repairCount * 0.08));
  
  let estimatedValue = baseVal * ageDepreciation * batteryFactor * repairFactor;
  
  // Ensure a minimum value for working/recyclable devices
  return Math.max(Math.round(estimatedValue), Math.round(info.originalPrice * 0.05));
}

// Calculate Discard Risk Probability (simulates Random Forest)
function calculateDiscardRisk(age, batteryHealth, repairCount, dailyUsage) {
  // Higher risk when: high age, low battery health, high repair count, low usage (user gets bored/inactive)
  // Or very high usage (device wears out fast)
  let riskScore = 0;
  
  // Age impact (up to 30 points)
  riskScore += Math.min(age * 8, 30);
  
  // Battery impact (up to 35 points)
  if (batteryHealth < 80) {
    riskScore += (80 - batteryHealth) * 1.25;
  }
  
  // Repair count impact (up to 20 points)
  riskScore += Math.min(repairCount * 6, 20);
  
  // Daily usage hours impact (if they use it very little, they are prone to abandon it)
  if (dailyUsage < 2) {
    riskScore += 15;
  } else if (dailyUsage > 8) {
    riskScore += 10; // heavy wear and tear risk
  }
  
  // Normalize between 10% and 98%
  return Math.min(Math.max(Math.round(riskScore + 10), 10), 98);
}

// --- API ACTIONS ---

export const registerDevice = async (deviceData) => {
  if (useSimulator) {
    return simulateRegisterDevice(deviceData);
  }
  try {
    const res = await client.post('/register-device', deviceData);
    return res.data;
  } catch (error) {
    // After interceptor sets useSimulator=true, fall back to simulation
    return simulateRegisterDevice(deviceData);
  }
};

export const predictRisk = async (deviceParams) => {
  if (useSimulator) {
    return simulatePredictRisk(deviceParams);
  }
  try {
    const res = await client.post('/predict-risk', deviceParams);
    return res.data;
  } catch (error) {
    return simulatePredictRisk(deviceParams);
  }
};

export const getRecommendation = async (deviceParams) => {
  if (useSimulator) {
    return simulateGetRecommendation(deviceParams);
  }
  try {
    const res = await client.post('/recommend-action', deviceParams);
    return res.data;
  } catch (error) {
    return simulateGetRecommendation(deviceParams);
  }
};

export const getSustainabilityScore = async (deviceParams) => {
  if (useSimulator) {
    return simulateGetSustainabilityScore(deviceParams);
  }
  try {
    const res = await client.post('/sustainability-score', deviceParams);
    return res.data;
  } catch (error) {
    return simulateGetSustainabilityScore(deviceParams);
  }
};

// Check if Backend is alive, to toggle simulation flag
export const checkBackendHealth = async () => {
  try {
    await client.get('/');
    useSimulator = false;
    return true;
  } catch (error) {
    useSimulator = true;
    return false;
  }
};

export const isSimulationMode = () => useSimulator;

// Enable simulator manually (useful for demo controls)
export const setSimulationMode = (active) => {
  useSimulator = active;
};

// --- SIMULATION ALGORITHMS ---

function simulateRegisterDevice(deviceData) {
  const currentYear = new Date().getFullYear();
  const age = Math.max(0, currentYear - Number(deviceData.purchase_year));
  
  const resaleValue = calculateResaleValue(
    deviceData.device_name, 
    age, 
    Number(deviceData.battery_health), 
    Number(deviceData.repair_count)
  );
  
  const id = `dev_${Math.random().toString(36).substr(2, 9)}`;
  const registered = {
    id,
    ...deviceData,
    age,
    resale_value: resaleValue
  };
  
  MOCK_DEVICES_DB.push(registered);
  return registered;
}

function simulatePredictRisk(deviceParams) {
  const age = Number(deviceParams.age) || 0;
  const batteryHealth = Number(deviceParams.battery_health) || 80;
  const repairCount = Number(deviceParams.repair_count) || 0;
  const dailyUsage = Number(deviceParams.usage_hours) || 4;
  
  const risk = calculateDiscardRisk(age, batteryHealth, repairCount, dailyUsage);
  
  // Generate a mock history trend for risk
  const riskTrend = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  let currentRisk = Math.max(10, risk - 20);
  for (let i = 0; i < months.length; i++) {
    riskTrend.push({
      month: months[i],
      risk: Math.round(currentRisk),
    });
    currentRisk += (risk - currentRisk) / (months.length - i);
  }
  
  return {
    discard_risk: risk,
    risk_trend: riskTrend
  };
}

function simulateGetRecommendation(deviceParams) {
  const battery = Number(deviceParams.battery_health) || 80;
  const resaleValue = Number(deviceParams.resale_value) || 200;
  const model = deviceParams.device_name || 'Galaxy S21';
  const age = Number(deviceParams.age) || 2;
  const info = SAMSUNG_MODELS_INFO[model] || { originalPrice: 600, repairability: 7 };
  
  // Approximate repair cost
  const repairCost = Math.round(info.originalPrice * 0.18 + (age * 30));
  
  let recommend = "Sell";
  let explanation = "";
  
  if (battery > 70) {
    recommend = "Sell";
    explanation = `Your ${model}'s battery is in good health (${battery}%). Selling it now yields high circular value ($${resaleValue}) before deeper hardware depreciation.`;
  } else if (repairCost < resaleValue) {
    recommend = "Repair";
    explanation = `The estimated repair cost ($${repairCost}) is less than the device's remaining resale potential ($${resaleValue}). Replacing the battery can restore performance and add years to its lifecycle.`;
  } else if (age < 5) {
    recommend = "Donate";
    explanation = `While not optimal for high-value resale, this ${model} is still highly functional for schools or community clinics. Donating extends device usage and offsets carbon footprints.`;
  } else {
    recommend = "Recycle";
    explanation = `The hardware is legacy or heavily degraded. Professional recycling ensures raw precious metals (gold, copper, lithium) are safely extracted to build new Samsung devices, avoiding toxic landfill leaks.`;
  }
  
  const savedCarbon = info.carbonSavedPerAction[recommend.toLowerCase()] || 40;
  
  return {
    recommendation: recommend,
    explanation,
    repair_cost_est: repairCost,
    carbon_saved_kg: savedCarbon,
    water_saved_liters: savedCarbon * 12, // mock metric
    landfill_prevented_g: 180, // Samsung average weight in grams
  };
}

function simulateGetSustainabilityScore(deviceParams) {
  const battery = Number(deviceParams.battery_health) || 80;
  const model = deviceParams.device_name || 'Galaxy S21';
  const resaleValue = Number(deviceParams.resale_value) || 200;
  const info = SAMSUNG_MODELS_INFO[model] || { originalPrice: 600, repairability: 7, carbonMfg: 60 };
  
  // Normalized metrics
  const batteryScore = battery; // 0 - 100
  const resalePotential = Math.min(Math.round((resaleValue / info.originalPrice) * 100), 100); // 0 - 100
  const repairabilityScore = info.repairability * 10; // 0 - 100 (e.g. 8/10 -> 80)
  
  // Carbon Impact (relative to manufacturing)
  // Devices with high manufacturing carbon have higher impact, but we want the score to improve if carbon impact is offset
  // We represent "Carbon Impact Score" where lower carbon footprint = higher score
  const carbonImpactScore = Math.max(0, 100 - Math.round(info.carbonMfg * 0.4)); 
  
  // Score = Battery Health + Resale Potential + Repairability - Carbon Impact (represented as raw value subtraction)
  // Let's implement the formula: Score = (Battery + Resale + Repairability + CarbonImpactOffset) / 4
  const finalScore = Math.round((batteryScore + resalePotential + repairabilityScore + carbonImpactScore) / 4);
  
  return {
    score: Math.min(Math.max(finalScore, 10), 100),
    breakdown: {
      battery_health: batteryScore,
      resale_potential: resalePotential,
      repairability: repairabilityScore,
      carbon_impact: 100 - carbonImpactScore, // Actual impact
    }
  };
}

// Available Samsung Models for Frontend Selection
export const getAvailableSamsungModels = () => Object.keys(SAMSUNG_MODELS_INFO);
export const getModelSpecs = (model) => SAMSUNG_MODELS_INFO[model] || { originalPrice: 600, repairability: 7, carbonMfg: 60 };
