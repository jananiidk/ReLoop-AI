import React from 'react';

export default function RiskGauge({ percentage }) {
  // Clamp value
  const val = Math.min(Math.max(percentage || 0, 0), 100);

  // SVG Gauge Math
  const radius = 60;
  const strokeWidth = 10;
  const center = 75;
  const circumference = 2 * Math.PI * radius; // ~377
  
  // Semicircle arc (we only use 75% of the circle)
  const arcLength = circumference * 0.75; // ~282.7
  const strokeDashoffset = arcLength - (arcLength * (val / 100));

  // Determine risk grade and colors
  let statusText = 'Low Risk';
  let strokeColor = '#10b981'; // Green
  let glowClass = 'shadow-glow-teal text-samsung-teal';
  let textColorClass = 'text-samsung-teal';

  if (val >= 70) {
    statusText = 'Critical Risk';
    strokeColor = '#ef4444'; // Red
    glowClass = 'text-samsung-danger';
    textColorClass = 'text-samsung-danger';
  } else if (val >= 40) {
    statusText = 'Moderate Risk';
    strokeColor = '#f59e0b'; // Amber
    glowClass = 'text-samsung-warning';
    textColorClass = 'text-samsung-warning';
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* SVG gauge */}
        <svg className="w-full h-full transform -rotate-225" viewBox="0 0 150 150">
          {/* Background Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />
          {/* Foreground Active Line */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0px 0px 6px ${strokeColor}aa)`,
            }}
          />
        </svg>

        {/* Text inside the gauge */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
          <span className="text-3xl font-extrabold text-white tracking-tight leading-none">
            {val}%
          </span>
          <span className="text-[10px] text-samsung-textMuted font-semibold uppercase tracking-widest mt-1">
            Discard Risk
          </span>
        </div>
      </div>

      {/* Status Badge */}
      <div className={`mt-2 px-3 py-1 rounded-full text-xs font-bold border ${
        val >= 70 
          ? 'bg-samsung-danger/10 border-samsung-danger/25 text-samsung-danger' 
          : val >= 40 
          ? 'bg-samsung-warning/10 border-samsung-warning/25 text-samsung-warning' 
          : 'bg-samsung-success/10 border-samsung-success/25 text-samsung-success'
      }`}>
        {statusText}
      </div>
      
      <p className="text-[11px] text-samsung-textMuted text-center mt-3 leading-relaxed max-w-[200px]">
        {val >= 70 
          ? 'Highly likely to be discarded soon. Action recommended.' 
          : val >= 40 
          ? 'Device shows moderate wear. Keep eye on health.'
          : 'Healthy lifecycle pattern. Continue standard usage.'}
      </p>
    </div>
  );
}
