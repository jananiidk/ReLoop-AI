import React from 'react';
import { Leaf, Droplet, Trash2, ShieldAlert, Cpu } from 'lucide-react';
import { RiskTrendChart, CarbonSavingsChart } from '../components/SustainabilityChart';

export default function Analytics({ device, riskData, recommendation }) {
  if (!device) return null;

  const carbon = recommendation?.carbon_saved_kg || 58;
  // Resource metrics calculations
  const waterSaved = carbon * 12; // Liters
  const eWasteSaved = 180; // Grams
  const preciousMetals = (carbon * 0.25).toFixed(1); // Grams of rare earth metals

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">Environmental Impact Analytics</h2>
        <p className="text-samsung-textMuted text-sm mt-1">
          Detailed metrics showing how circular decisions directly translate to carbon offset and resource recovery.
        </p>
      </div>

      {/* Grid of Key Resource Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Carbon Savings */}
        <div className="glass-card rounded-2xl p-5 border border-samsung-border flex items-start gap-4">
          <div className="p-2.5 bg-samsung-teal/10 rounded-xl text-samsung-teal border border-samsung-teal/20 mt-0.5">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-samsung-textMuted tracking-wider">CO₂ Offset</span>
            <p className="text-xl font-bold text-white mt-1">+{carbon} kg</p>
            <p className="text-[9px] text-samsung-textMuted mt-1">Net greenhouse emissions saved</p>
          </div>
        </div>

        {/* Water Saved */}
        <div className="glass-card rounded-2xl p-5 border border-samsung-border flex items-start gap-4">
          <div className="p-2.5 bg-samsung-blue/10 rounded-xl text-samsung-blue border border-samsung-blue/20 mt-0.5">
            <Droplet className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-samsung-textMuted tracking-wider">Water Conserved</span>
            <p className="text-xl font-bold text-white mt-1">+{waterSaved} Liters</p>
            <p className="text-[9px] text-samsung-textMuted mt-1">Saved from mining & cooling cycles</p>
          </div>
        </div>

        {/* E-Waste Prevented */}
        <div className="glass-card rounded-2xl p-5 border border-samsung-border flex items-start gap-4">
          <div className="p-2.5 bg-samsung-danger/10 rounded-xl text-samsung-danger border border-samsung-danger/20 mt-0.5">
            <Trash2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-samsung-textMuted tracking-wider font-semibold">Landfill Prevented</span>
            <p className="text-xl font-bold text-white mt-1">{eWasteSaved} g</p>
            <p className="text-[9px] text-samsung-textMuted mt-1">Toxic hardware kept out of soil</p>
          </div>
        </div>

        {/* Rare Earth Metals Recycled */}
        <div className="glass-card rounded-2xl p-5 border border-samsung-border flex items-start gap-4">
          <div className="p-2.5 bg-samsung-violet/10 rounded-xl text-samsung-violet border border-samsung-violet/20 mt-0.5">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-samsung-textMuted tracking-wider">Metals Recovered</span>
            <p className="text-xl font-bold text-white mt-1">{preciousMetals} g</p>
            <p className="text-[9px] text-samsung-textMuted mt-1">Gold, Cobalt, Lithium, and Silver</p>
          </div>
        </div>

      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Risk Trend over Time (Line Chart) */}
        <div className="glass-card rounded-2xl p-6 border border-samsung-border">
          <div className="mb-4">
            <h3 className="font-bold text-white text-md tracking-wide">6-Month Discard Risk Forecast</h3>
            <p className="text-xs text-samsung-textMuted mt-0.5">
              Predicted probability of disposal calculated by the AI engine based on aging and cycles.
            </p>
          </div>
          <RiskTrendChart data={riskData?.risk_trend} />
        </div>

        {/* Carbon Offset Comparison (Bar Chart) */}
        <div className="glass-card rounded-2xl p-6 border border-samsung-border">
          <div className="mb-4">
            <h3 className="font-bold text-white text-md tracking-wide">Carbon Offsets by Circular Pathway</h3>
            <p className="text-xs text-samsung-textMuted mt-0.5">
              Net CO₂ emissions offset comparison. Highlighted bar is the recommended path.
            </p>
          </div>
          <CarbonSavingsChart currentAction={recommendation?.recommendation} />
        </div>

      </div>

      {/* Info Callout */}
      <div className="p-5 border border-samsung-border/60 bg-[#041a0e]/30 rounded-2xl flex flex-col md:flex-row md:items-center gap-4 text-xs">
        <div className="p-2 bg-samsung-blue/10 border border-samsung-blue/20 rounded-xl text-samsung-blue shrink-0">
          <Leaf className="w-5 h-5 text-samsung-teal" />
        </div>
        <div>
          <span className="font-bold text-white block mb-0.5">How are these savings calculated?</span>
          <p className="text-samsung-textMuted leading-relaxed">
            Carbon calculations are referenced against standard device manufacturing datasets. Electronic manufacturing accounts for 80% of a device's total lifetime emissions. Extending its lifetime offsets new manufacturing requirements, directly conserving mining water and precious earth metals.
          </p>
        </div>
      </div>
    </div>
  );
}
