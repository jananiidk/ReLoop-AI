import React, { useState } from 'react';
import { Smartphone, Sparkles, Send, Battery, Hammer, Clock, ShieldAlert } from 'lucide-react';
import { getAvailableSamsungModels } from '../services/api';

export default function RegisterDevice({ onRegisterSuccess }) {
  const models = getAvailableSamsungModels();
  
  const [formData, setFormData] = useState({
    device_name: models[2] || 'Galaxy S21',
    purchase_year: '2021',
    battery_health: 72,
    repair_count: 2,
    usage_hours: 6,
  });

  const [loading, setLoading] = useState(false);

  // Quick preset templates for rapid demoing
  const demoPresets = [
    {
      label: 'Slightly Degraded Galaxy S21 (Rule Match: Sell/Repair)',
      device_name: 'Galaxy S21',
      purchase_year: '2021',
      battery_health: 72,
      repair_count: 2,
      usage_hours: 6,
    },
    {
      label: 'Pristine Galaxy Z Fold 5 (Rule Match: Keep/Sell)',
      device_name: 'Galaxy Z Fold 5',
      purchase_year: '2023',
      battery_health: 94,
      repair_count: 0,
      usage_hours: 4,
    },
    {
      label: 'Critically Worn Laptop (Rule Match: Recycle)',
      device_name: 'Galaxy Book 4 Pro',
      purchase_year: '2020',
      battery_health: 58,
      repair_count: 3,
      usage_hours: 10,
    }
  ];

  const handlePresetSelect = (preset) => {
    setFormData(preset);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'battery_health' || name === 'repair_count' || name === 'usage_hours' 
        ? Number(value) 
        : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Add artificial delay for professional AI processing effect
    setTimeout(async () => {
      try {
        await onRegisterSuccess(formData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Intro Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Create Digital Product Twin
        </h2>
        <p className="text-samsung-textMuted text-sm max-w-2xl leading-relaxed">
          Register a Samsung device to initiate the lifecycle tracking engine. ReLoop's predictive models analyze battery wear, age depreciation, and device history to establish its digital sustainability twin.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Form Panel */}
        <div className="glass-card rounded-2xl p-8 border border-samsung-border shadow-glass relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-samsung-blue via-samsung-violet to-samsung-teal rounded-t-2xl"></div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Device Select */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-samsung-textMuted mb-2">
                  Samsung Device Model
                </label>
                <div className="relative">
                  <select
                    name="device_name"
                    value={formData.device_name}
                    onChange={handleChange}
                    className="w-full bg-[#010904] border border-samsung-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-samsung-blue transition-colors appearance-none"
                  >
                    {models.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-samsung-textMuted">
                    <Smartphone className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Purchase Year */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-samsung-textMuted mb-2">
                  Purchase Year
                </label>
                <select
                  name="purchase_year"
                  value={formData.purchase_year}
                  onChange={handleChange}
                  className="w-full bg-[#010904] border border-samsung-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-samsung-blue transition-colors"
                >
                  {Array.from({ length: 9 }, (_, i) => 2018 + i).map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-5 border-t border-samsung-border/60 pt-5">
              {/* Battery Health Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-samsung-textMuted flex items-center gap-1.5">
                    <Battery className="w-4 h-4 text-samsung-blue" /> Battery Health State
                  </label>
                  <span className={`text-sm font-extrabold ${formData.battery_health < 70 ? 'text-samsung-danger' : formData.battery_health < 85 ? 'text-samsung-warning' : 'text-samsung-success'}`}>
                    {formData.battery_health}%
                  </span>
                </div>
                <input
                  type="range"
                  name="battery_health"
                  min="30"
                  max="100"
                  value={formData.battery_health}
                  onChange={handleChange}
                  className="w-full h-1.5 bg-[#010904] rounded-lg appearance-none cursor-pointer accent-samsung-blue"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>Critical Degradation (30%)</span>
                  <span>Healthy (100%)</span>
                </div>
              </div>

              {/* Repairs Count */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-samsung-textMuted flex items-center gap-1.5">
                    <Hammer className="w-4 h-4 text-samsung-blue" /> Past Hardware Repairs
                  </label>
                  <span className="text-sm font-extrabold text-white">
                    {formData.repair_count} {formData.repair_count === 1 ? 'time' : 'times'}
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {[0, 1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, repair_count: num }))}
                      className={`py-2 rounded-xl text-sm font-bold border transition-all ${
                        formData.repair_count === num
                          ? 'bg-samsung-blue border-samsung-blue text-white shadow-glow-blue'
                          : 'bg-[#010904] border-samsung-border text-samsung-textMuted hover:border-samsung-teal/40'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Usage Hours */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-samsung-textMuted flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-samsung-blue" /> Daily Usage hours
                  </label>
                  <span className="text-sm font-extrabold text-white">
                    {formData.usage_hours} hrs / day
                  </span>
                </div>
                <input
                  type="range"
                  name="usage_hours"
                  min="1"
                  max="15"
                  value={formData.usage_hours}
                  onChange={handleChange}
                  className="w-full h-1.5 bg-[#010904] rounded-lg appearance-none cursor-pointer accent-samsung-blue"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>Minimal (1 hr)</span>
                  <span>Heavy Wear (15 hrs)</span>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="border-t border-samsung-border/60 pt-6 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-samsung-blue to-samsung-violet text-white font-bold rounded-xl shadow-glow-blue flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    <span>Analyzing Lifecycle...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Synchronize Twin</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>


      </div>
    </div>
  );
}
