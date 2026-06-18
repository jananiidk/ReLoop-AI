import React, { useState } from 'react';
import Layout from './components/Layout';
import RegisterDevice from './pages/RegisterDevice';
import Dashboard from './pages/Dashboard';
import Recommendations from './pages/Recommendations';
import Analytics from './pages/Analytics';
import { registerDevice, predictRisk, getRecommendation, getSustainabilityScore } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('register');
  
  // State variables for the twin
  const [device, setDevice] = useState(null);
  const [riskData, setRiskData] = useState(null);
  const [scoreData, setScoreData] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  const handleRegisterSuccess = async (formData) => {
    try {
      // 1. Register device
      const registeredDevice = await registerDevice(formData);
      setDevice(registeredDevice);

      // Extract details for secondary predictive models
      const { age, battery_health, repair_count, usage_hours, resale_value, device_name } = registeredDevice;

      // 2. Call risk model
      const riskPayload = { age, battery_health, repair_count, usage_hours };
      const riskResult = await predictRisk(riskPayload);
      setRiskData(riskResult);

      // 3. Call recommendation engine
      const recPayload = { device_name, age, battery_health, resale_value, repair_count };
      const recResult = await getRecommendation(recPayload);
      setRecommendation(recResult);

      // 4. Call sustainability score calculator
      const scorePayload = { device_name, battery_health, resale_value };
      const scoreResult = await getSustainabilityScore(scorePayload);
      setScoreData(scoreResult);

      // Transition to twin dashboard
      setActiveTab('dashboard');
    } catch (error) {
      console.error('Error synchronizing digital twin:', error);
    }
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'register':
        return <RegisterDevice onRegisterSuccess={handleRegisterSuccess} />;
      case 'dashboard':
        return (
          <Dashboard
            device={device}
            riskData={riskData}
            scoreData={scoreData}
            recommendation={recommendation}
            setActiveTab={setActiveTab}
          />
        );
      case 'recommendations':
        return <Recommendations device={device} recommendation={recommendation} />;
      case 'analytics':
        return <Analytics device={device} riskData={riskData} recommendation={recommendation} />;
      default:
        return <RegisterDevice onRegisterSuccess={handleRegisterSuccess} />;
    }
  };

  return (
    <Layout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      hasDevice={!!device}
    >
      {renderActivePage()}
    </Layout>
  );
}
