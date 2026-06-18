import React, { useState } from 'react';
import { Hammer, CircleDollarSign, Heart, Recycle, Info, ChevronRight, Leaf, ShieldCheck, MapPin, Award } from 'lucide-react';

export default function Recommendations({ device, recommendation }) {
  const [selectedPath, setSelectedPath] = useState(recommendation?.recommendation || 'Sell');

  if (!device) return null;

  const pathways = {
    Sell: {
      title: 'Resell on Marketplace',
      icon: CircleDollarSign,
      color: 'text-samsung-blue border-samsung-blue/20 bg-samsung-blue/5',
      badgeColor: 'bg-samsung-blue/15 text-samsung-blue border border-samsung-blue/30',
      description: 'Find a new owner. Giving your device a second life offsets the emissions of manufacturing a brand new phone.',
      stats: [
        { label: 'Market Value', value: `₹${device.resale_value?.toLocaleString('en-IN') || '18,000'}` },
        { label: 'CO₂ Saved', value: `${recommendation?.carbon_saved_kg || 65} kg` },
        { label: 'Circular Match', value: 'High' }
      ],
      cta: 'List on Samsung Trade-In',
      ctaLink: 'https://www.samsung.com/in/smartphones/',
      details: [
        'Estimated eBay Resale Value: ₹18,000 - ₹21,000 based on standard wear.',
        'Instantly claim a Samsung Upgrade credit to purchase your next Galaxy device.',
        'Shipping materials provided by Samsung for free carbon-neutral transit.'
      ]
    },
    Repair: {
      title: 'Repair & Restore',
      icon: Hammer,
      color: 'text-samsung-violet border-samsung-violet/20 bg-samsung-violet/5',
      badgeColor: 'bg-samsung-violet/15 text-samsung-violet border border-samsung-violet/30',
      description: 'Replace degraded components. Usually, battery and screen replacement is 80% cheaper than buying a new equivalent model.',
      stats: [
        { label: 'Repair Cost', value: `₹${(recommendation?.repair_cost_est * 80)?.toLocaleString('en-IN') || '3,200'}` },
        { label: 'iFixit Score', value: '8/10' },
        { label: 'CO₂ Offset', value: `${recommendation?.carbon_saved_kg || 55} kg` }
      ],
      cta: 'Schedule Samsung Care+',
      ctaLink: 'https://www.samsung.com/in/support/',
      details: [
        'Battery diagnostics indicate 72% health. Recommended fix: Battery Swap.',
        'Authorized Samsung service repairs protect waterproofing and parts warranty.',
        'Same-day service available at 14 local repair hubs in your metro area.'
      ]
    },
    Donate: {
      title: 'Social Donation',
      icon: Heart,
      color: 'text-samsung-teal border-samsung-teal/20 bg-samsung-teal/5',
      badgeColor: 'bg-samsung-teal/15 text-samsung-teal border border-samsung-teal/30',
      description: 'Provide devices to public schools or community initiatives. Extend accessibility while earning carbon offset certificates.',
      stats: [
        { label: 'Charity Match', value: '3 Centers' },
        { label: 'CO₂ Saved', value: `${recommendation?.carbon_saved_kg || 78} kg` },
        { label: 'Tax Deductible', value: 'Yes' }
      ],
      cta: 'Find Donation Box',
      ctaLink: 'https://maps.google.com/?q=e-waste+donation+drop+box+near+me',
      details: [
        'Partnering with eVidyalaya Foundation: devices loaded with learning software.',
        'Includes pre-paid courier label to drop at any post office kiosk.',
        'Receive an official green certificate acknowledging your carbon contribution.'
      ]
    },
    Recycle: {
      title: 'E-Waste Recycling',
      icon: Recycle,
      color: 'text-samsung-warning border-samsung-warning/20 bg-samsung-warning/5',
      badgeColor: 'bg-samsung-warning/15 text-samsung-warning border border-samsung-warning/30',
      description: 'Safely recover raw precious materials. Avoid heavy metals leaking into municipal landfills.',
      stats: [
        { label: 'Recycled Metals', value: '14.2 g' },
        { label: 'Landfill Avoided', value: '180 g' },
        { label: 'Reward Coupon', value: '₹1,500' }
      ],
      cta: 'Claim Recycling Voucher',
      ctaLink: 'https://www.samsung.com/global/sustainability/',
      details: [
        'E-waste contains Gold, Silver, Copper, and Cobalt ready for extraction.',
        'Samsung Eco-kiosks are located at all central brand stores.',
        'Earn a ₹1,500 coupon for accessories upon drop-off verification.'
      ]
    }
  };

  const rec = recommendation?.recommendation || 'Sell';
  const activePathDetails = pathways[selectedPath] || pathways.Sell;
  const ActiveIcon = activePathDetails.icon;

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">AI Circular Recommendations</h2>
        <p className="text-samsung-textMuted text-sm mt-1">
          Predictive algorithms match your device health and resale value to optimal eco-friendly actions.
        </p>
      </div>

      {/* Recommended Hero Panel */}
      <div className="glass-card rounded-3xl p-8 border border-samsung-teal/20 bg-gradient-to-br from-samsung-dark to-[#041d0e] shadow-glass relative overflow-hidden">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-samsung-teal/10 rounded-full blur-3xl"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-samsung-border/60">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-samsung-textMuted uppercase tracking-wider">AI Recommendation:</span>
            <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${pathways[rec]?.badgeColor}`}>
              {rec}
            </span>
          </div>
          
          <div className="flex gap-4">
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-samsung-textMuted font-bold uppercase tracking-wider">CO₂ Impact</span>
              <span className="text-samsung-teal font-extrabold text-sm">{recommendation?.carbon_saved_kg || 58} kg offset</span>
            </div>
            <div className="w-[1px] bg-samsung-border"></div>
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-samsung-textMuted font-bold uppercase tracking-wider">Landfill Diverted</span>
              <span className="text-samsung-blue font-extrabold text-sm">{recommendation?.landfill_prevented_g || 180} g</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-4">
          <div className="p-3 bg-samsung-teal/15 rounded-2xl border border-samsung-teal/25 text-samsung-teal mt-1">
            <Leaf className="w-6 h-6 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h3 className="font-extrabold text-white text-lg tracking-wide">
              {rec === 'Sell' && 'Capitalize on Remaining Resale Value'}
              {rec === 'Repair' && 'Extend Life Cycle via Battery Replacement'}
              {rec === 'Donate' && 'Repurpose Hardware for Social Benefit'}
              {rec === 'Recycle' && 'Safe Recovery of Critical Minerals'}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {recommendation?.explanation || `Your device conditions indicate that ${rec} is the best balance of carbon offsetting, residual trade-in payouts, and overall lifecycle longevity.`}
            </p>
          </div>
        </div>
      </div>

      {/* Tab selectors for all 4 paths */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.keys(pathways).map((pathKey) => {
          const path = pathways[pathKey];
          const PathIcon = path.icon;
          const isSelected = selectedPath === pathKey;
          const isAiRecommendation = rec === pathKey;

          return (
            <button
              key={pathKey}
              onClick={() => setSelectedPath(pathKey)}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 relative ${
                isSelected
                  ? 'bg-[#051c0f] border-samsung-blue shadow-glow-blue'
                  : 'bg-[#03140a]/40 border-samsung-border/60 hover:border-slate-700 hover:bg-[#03140a]/75'
              }`}
            >
              {isAiRecommendation && (
                <span className="absolute top-3 right-3 text-[9px] font-extrabold text-samsung-teal bg-samsung-teal/10 border border-samsung-teal/20 px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                  AI Rec
                </span>
              )}
              <PathIcon className={`w-8 h-8 ${path.color.split(' ')[0]} mb-3`} />
              <h4 className="font-bold text-sm text-white">{pathKey}</h4>
              <p className="text-[10px] text-samsung-textMuted mt-1 line-clamp-1">{path.title}</p>
            </button>
          );
        })}
      </div>

      {/* Path Detail Section */}
      <div className="glass-card rounded-2xl p-8 border border-samsung-border shadow-glass relative">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-2">
              <ActiveIcon className={`w-6 h-6 ${activePathDetails.color.split(' ')[0]}`} />
              <h3 className="text-xl font-bold text-white tracking-wide">{activePathDetails.title}</h3>
            </div>
            <p className="text-sm text-samsung-textMuted leading-relaxed">
              {activePathDetails.description}
            </p>

            <div className="space-y-2.5 pt-2">
              {activePathDetails.details.map((detail, idx) => (
                <div key={idx} className="flex gap-2.5 items-start text-xs text-slate-300">
                  <ChevronRight className="w-4 h-4 text-samsung-blue shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Path Stats Side Panel */}
          <div className="w-full md:w-80 p-5 rounded-2xl bg-[#010904]/70 border border-samsung-border flex flex-col gap-4 self-stretch justify-between">
            <div>
              <span className="text-[10px] text-samsung-textMuted font-bold uppercase tracking-wider block mb-3">Path Metrics</span>
              <div className="space-y-3">
                {activePathDetails.stats.map((stat, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1.5 border-b border-samsung-border/40 text-xs">
                    <span className="text-samsung-textMuted">{stat.label}</span>
                    <span className="font-bold text-white">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={activePathDetails.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-samsung-blue hover:bg-samsung-blue/90 text-white text-xs font-bold rounded-xl shadow-glow-blue transition-all mt-4 flex items-center justify-center gap-2 no-underline"
            >
              <MapPin className="w-3.5 h-3.5" />
              {activePathDetails.cta}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
