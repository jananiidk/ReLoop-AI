import React from 'react';
import { Smartphone, Laptop, Tablet, Watch, Calendar, Battery, Hammer, Clock, IndianRupee } from 'lucide-react';

export default function DeviceCard({ device }) {
  if (!device) return null;

  // Determine device icon based on name
  const getDeviceIcon = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('book') || lowerName.includes('laptop')) {
      return <Laptop className="w-10 h-10 text-samsung-blue" />;
    }
    if (lowerName.includes('tab') || lowerName.includes('pad')) {
      return <Tablet className="w-10 h-10 text-samsung-teal" />;
    }
    if (lowerName.includes('watch') || lowerName.includes('gear')) {
      return <Watch className="w-10 h-10 text-samsung-violet" />;
    }
    return <Smartphone className="w-10 h-10 text-samsung-blue" />;
  };

  // Battery health status color
  const getBatteryColorClass = (health) => {
    if (health >= 80) return 'text-samsung-success bg-samsung-success/10 border-samsung-success/20';
    if (health >= 70) return 'text-samsung-warning bg-samsung-warning/10 border-samsung-warning/20';
    return 'text-samsung-danger bg-samsung-danger/10 border-samsung-danger/20';
  };

  return (
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden border border-samsung-border shadow-glass transition-all duration-300 hover:border-samsung-blue/30">
      {/* Background glow blob */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-samsung-blue/10 rounded-full blur-2xl -mr-6 -mt-6"></div>

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#010904] rounded-2xl border border-samsung-border flex items-center justify-center">
            {getDeviceIcon(device.device_name)}
          </div>
          <div>
            <h3 className="font-bold text-lg text-white tracking-wide">{device.device_name}</h3>
            <p className="text-xs text-samsung-textMuted flex items-center gap-1 mt-0.5">
              <Calendar className="w-3.5 h-3.5" /> Age: {device.age} {device.age === 1 ? 'year' : 'years'} ({device.purchase_year})
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-[10px] text-samsung-textMuted uppercase tracking-wider font-semibold">Resale Estimate</span>
          <div className="flex items-center text-samsung-teal font-extrabold text-2xl tracking-tight mt-1 glow-text-teal">
            <span className="text-lg mr-0.5">₹</span>
            <span>{device.resale_value?.toLocaleString('en-IN') || '18,000'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {/* Battery Health */}
        <div className="p-3 bg-[#010904]/45 rounded-xl border border-samsung-border/60">
          <div className="flex items-center justify-between text-samsung-textMuted mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Battery</span>
            <Battery className="w-4 h-4 text-samsung-blue" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-white">{device.battery_health}</span>
            <span className="text-xs text-samsung-textMuted">%</span>
          </div>
          <div className="w-full bg-[#042610] rounded-full h-1.5 mt-2 overflow-hidden">
            <div 
              className={`h-full rounded-full ${
                device.battery_health >= 80 
                  ? 'bg-samsung-success' 
                  : device.battery_health >= 70 
                  ? 'bg-samsung-warning' 
                  : 'bg-samsung-danger'
              }`}
              style={{ width: `${device.battery_health}%` }}
            ></div>
          </div>
        </div>

        {/* Repair Count */}
        <div className="p-3 bg-[#010904]/45 rounded-xl border border-samsung-border/60">
          <div className="flex items-center justify-between text-samsung-textMuted mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Repairs</span>
            <Hammer className="w-4 h-4 text-samsung-blue" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-white">{device.repair_count}</span>
            <span className="text-xs text-samsung-textMuted">{device.repair_count === 1 ? 'time' : 'times'}</span>
          </div>
          <p className="text-[10px] text-samsung-textMuted mt-3">
            {device.repair_count === 0 ? 'Original parts intact' : 'Hardware serviced'}
          </p>
        </div>

        {/* Usage Hours */}
        <div className="p-3 bg-[#010904]/45 rounded-xl border border-samsung-border/60">
          <div className="flex items-center justify-between text-samsung-textMuted mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Daily Usage</span>
            <Clock className="w-4 h-4 text-samsung-blue" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-white">{device.usage_hours}</span>
            <span className="text-xs text-samsung-textMuted">hrs</span>
          </div>
          <p className="text-[10px] text-samsung-textMuted mt-3">
            Avg. Screen Time
          </p>
        </div>
      </div>
    </div>
  );
}
