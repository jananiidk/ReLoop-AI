import React, { useState, useEffect } from 'react';
import { Cpu, Smartphone, PlusCircle, Zap, BarChart3, Wifi, WifiOff, RefreshCw, Leaf } from 'lucide-react';
import { checkBackendHealth, isSimulationMode, setSimulationMode } from '../services/api';

export default function Layout({ children, activeTab, setActiveTab, hasDevice }) {
  const [backendLive, setBackendLive] = useState(false);
  const [simulationActive, setSimulationActive] = useState(isSimulationMode());
  const [checking, setChecking] = useState(false);

  const checkStatus = async () => {
    setChecking(true);
    const alive = await checkBackendHealth();
    setBackendLive(alive);
    setSimulationActive(isSimulationMode());
    setChecking(false);
  };

  useEffect(() => {
    checkStatus();
    // Periodically ping backend
    const interval = setInterval(checkStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSimulation = () => {
    const newVal = !simulationActive;
    setSimulationMode(newVal);
    setSimulationActive(newVal);
  };

  const navItems = [
    { id: 'register', label: 'Register Device', icon: PlusCircle, disabled: false },
    { id: 'dashboard', label: 'Digital Twin', icon: Smartphone, disabled: !hasDevice },
    { id: 'recommendations', label: 'AI Actions', icon: Zap, disabled: !hasDevice },
    { id: 'analytics', label: 'Impact Analytics', icon: BarChart3, disabled: !hasDevice },
  ];

  return (
    <div className="flex h-screen bg-samsung-dark overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-samsung-border bg-[#010a04] flex flex-col justify-between z-20">
        <div>
          {/* Logo */}
          <div className="p-6 border-b border-samsung-border flex items-center gap-3">
            <div className="p-2 rounded-lg bg-samsung-blue/20 text-samsung-blue border border-samsung-blue/40 shadow-glow-blue animate-pulse-slow">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg tracking-wider bg-gradient-to-r from-samsung-blue to-samsung-violet bg-clip-text text-transparent">
                ReLoop AI
              </h1>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  disabled={item.disabled}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-samsung-blue/25 to-samsung-violet/10 text-white border-l-4 border-samsung-blue shadow-glow-blue'
                      : item.disabled
                      ? 'text-slate-600 cursor-not-allowed opacity-40'
                      : 'text-samsung-textMuted hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-samsung-blue' : 'text-samsung-textMuted group-hover:text-slate-300'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>


      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-samsung-dark relative">
        {/* Top Header */}
        <header className="h-16 border-b border-samsung-border bg-[#021207]/60 backdrop-blur-md px-8 flex items-center justify-between z-10">
          {/* Left spacer where the badge used to be */}
          <div />

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-xs font-semibold text-white">Galaxy Portal</span>
              <span className="text-[10px] text-samsung-textMuted">Developer Sandbox</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-samsung-blue to-samsung-violet flex items-center justify-center font-bold text-xs text-white border border-white/10 shadow-glow-blue">
              SA
            </div>
          </div>
        </header>

        {/* Dynamic Page Component container */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-6xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
