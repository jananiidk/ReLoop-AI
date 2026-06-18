import React from 'react';
import { ShieldAlert, ArrowRight, Award, Leaf, Zap, BarChart3, TrendingUp } from 'lucide-react';
import DeviceCard from '../components/DeviceCard';
import RiskGauge from '../components/RiskGauge';
import { ScoreBreakdownChart } from '../components/SustainabilityChart';

export default function Dashboard({ device, riskData, scoreData, recommendation, setActiveTab }) {
  if (!device) return (
    <div className="flex flex-col items-center justify-center py-20 text-center glass-card rounded-2xl border border-samsung-border p-8">
      <p className="text-samsung-textMuted mb-4">No device twin synchronized yet.</p>
      <button
        onClick={() => setActiveTab('register')}
        className="px-4 py-2 bg-samsung-blue text-white rounded-xl text-sm font-bold shadow-glow-blue hover:scale-105 active:scale-95 transition-all"
      >
        Go to Registration
      </button>
    </div>
  );

  const getScoreColorClass = (score) => {
    if (score >= 80) return 'text-samsung-teal bg-samsung-teal/15 border-samsung-teal/30';
    if (score >= 60) return 'text-samsung-warning bg-samsung-warning/15 border-samsung-warning/30';
    return 'text-samsung-danger bg-samsung-danger/15 border-samsung-danger/30';
  };

  const isRiskHigh = riskData?.discard_risk >= 60;

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Dashboard Heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Digital Product Twin</h2>
          <p className="text-samsung-textMuted text-sm mt-1">Real-time lifecycle monitoring, AI threat modeling, and environmental scores.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-samsung-textMuted font-semibold uppercase tracking-widest">Twin Status:</span>
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-samsung-blue/15 border border-samsung-blue/30 text-samsung-blue shadow-glow-blue animate-pulse">
            ACTIVE & SYNCED
          </span>
        </div>
      </div>

      {/* Critical Alert if risk is high */}
      {isRiskHigh && (
        <div className="p-4 bg-samsung-danger/10 border border-samsung-danger/25 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 animate-pulse-slow">
          <div className="flex gap-3 items-start md:items-center">
            <ShieldAlert className="w-5 h-5 text-samsung-danger shrink-0" />
            <div>
              <span className="font-bold text-white text-sm">Critical Discard Probability Detected</span>
              <p className="text-xs text-samsung-textMuted mt-0.5">
                AI estimates a {riskData?.discard_risk}% chance this device will be decommissioned or thrown away within 6 months. Action recommended.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('recommendations')}
            className="flex items-center gap-1.5 px-4 py-2 bg-samsung-danger/20 hover:bg-samsung-danger/30 text-samsung-danger rounded-xl text-xs font-bold border border-samsung-danger/40 transition-colors self-end md:self-auto shrink-0"
          >
            <span>Resolve Risk</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Primary Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Device Overview card & General Stats */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Device Card */}
          <DeviceCard device={device} />

          {/* Environmental Savings Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-5 border border-samsung-border flex items-center gap-4">
              <div className="p-3 bg-samsung-teal/10 rounded-xl text-samsung-teal border border-samsung-teal/20">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-samsung-textMuted tracking-wider">Carbon Saved Option</span>
                <p className="text-lg font-bold text-white mt-0.5">+{recommendation?.carbon_saved_kg || 58} kg CO₂</p>
                <p className="text-[10px] text-samsung-textMuted">Offsetting device manufacturing footprint</p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-samsung-border flex items-center gap-4">
              <div className="p-3 bg-samsung-violet/10 rounded-xl text-samsung-violet border border-samsung-violet/20">
                <TrendingUp className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-samsung-textMuted tracking-wider">Circular Path</span>
                <p className="text-lg font-bold text-white mt-0.5">{recommendation?.recommendation || 'Sell'}</p>
                <p className="text-[10px] text-samsung-textMuted">AI recommended action course</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Discard Risk speed indicator */}
        <div className="glass-card rounded-2xl p-6 border border-samsung-border flex flex-col items-center justify-center shadow-glass relative">
          <div className="absolute top-4 left-6 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-samsung-violet" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-samsung-textMuted">AI Risk Predictor</span>
          </div>
          <RiskGauge percentage={riskData?.discard_risk} />
        </div>
      </div>

      {/* Sustainability Score Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sustainability Meter */}
        <div className="glass-card rounded-2xl p-8 border border-samsung-border lg:col-span-1 flex flex-col justify-between relative overflow-hidden">
          {/* Decorative Ring */}
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-samsung-teal/10 rounded-full blur-2xl"></div>
          
          <div>
            <h3 className="font-bold text-lg text-white tracking-wide flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-samsung-teal" />
              Sustainability Rating
            </h3>
            <p className="text-xs text-samsung-textMuted leading-relaxed">
              This score aggregates battery status, repair records, estimated circular values, and product recycling viability to rank device durability.
            </p>
          </div>

          <div className="my-8 flex items-center justify-center">
            <div className={`w-32 h-32 rounded-full border-4 flex flex-col items-center justify-center shadow-glass ${getScoreColorClass(scoreData?.score)}`}>
              <span className="text-4xl font-black tracking-tight">{scoreData?.score}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-samsung-textMuted">/100 Index</span>
            </div>
          </div>

          <div className="text-center">
            <span className="text-xs font-bold text-white">
              {scoreData?.score >= 80 ? 'Highly Sustainable Device' : scoreData?.score >= 60 ? 'Moderately Sustainable' : 'High Ecological Impact'}
            </span>
          </div>
        </div>

        {/* Sustainability Attribute Radar Breakdown */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-samsung-border relative">
          <div className="absolute top-4 left-6 flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-samsung-teal" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-samsung-textMuted">Lifecycle Metrics Analysis</span>
          </div>
          <div className="mt-4">
            <ScoreBreakdownChart scoreData={scoreData?.breakdown} />
          </div>
        </div>

      </div>
    </div>
  );
}
