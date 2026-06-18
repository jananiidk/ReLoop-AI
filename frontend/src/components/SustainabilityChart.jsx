import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Cell 
} from 'recharts';

// Custom Tooltip component for sleek dark mode look
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0f172a]/95 backdrop-blur-md border border-samsung-border p-3 rounded-xl shadow-glass">
        <p className="text-xs font-semibold text-samsung-textMuted mb-1">{label}</p>
        {payload.map((entry, idx) => (
          <p key={idx} className="text-sm font-bold" style={{ color: entry.color || entry.fill }}>
            {entry.name}: {entry.value}
            {entry.unit || ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// 1. Line Chart showing Discard Risk progression
export function RiskTrendChart({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="w-full h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
          <defs>
            <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00ff87" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#00f5d4" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
          <XAxis 
            dataKey="month" 
            stroke="#94a3b8" 
            fontSize={11} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="#94a3b8" 
            fontSize={11} 
            tickLine={false} 
            axisLine={false}
            domain={[0, 100]}
            unit="%"
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="risk" 
            name="Discard Probability"
            unit="%"
            stroke="#00ff87" 
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2, fill: '#030806' }}
            activeDot={{ r: 6, stroke: '#00f5d4', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// 2. Bar Chart comparing carbon savings by action
export function CarbonSavingsChart({ currentAction }) {
  const data = [
    { name: 'Repair', value: 55, color: '#00f5d4' },
    { name: 'Sell', value: 65, color: '#00ff87' },
    { name: 'Donate', value: 80, color: '#6ee7b7' },
    { name: 'Recycle', value: 45, color: '#10b981' },
  ];

  return (
    <div className="w-full h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
          <XAxis 
            dataKey="name" 
            stroke="#94a3b8" 
            fontSize={11} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="#94a3b8" 
            fontSize={11} 
            tickLine={false} 
            axisLine={false}
            unit=" kg"
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" name="CO₂ Offset" unit=" kg" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => {
              const isRecommended = entry.name.toLowerCase() === currentAction?.toLowerCase();
              return (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  fillOpacity={isRecommended ? 1.0 : 0.4}
                  stroke={isRecommended ? '#ffffff' : 'transparent'}
                  strokeWidth={isRecommended ? 1.5 : 0}
                  className="transition-all duration-300"
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// 3. Radar Chart showing sustainability score attributes
export function ScoreBreakdownChart({ scoreData }) {
  if (!scoreData) return null;

  const data = [
    { subject: 'Battery Health', value: scoreData.battery_health, fullMark: 100 },
    { subject: 'Resale Value', value: scoreData.resale_potential, fullMark: 100 },
    { subject: 'Repairability', value: scoreData.repairability, fullMark: 100 },
    { subject: 'Carbon Savings', value: 100 - scoreData.carbon_impact, fullMark: 100 },
  ];

  return (
    <div className="w-full h-[250px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" radius="70%" data={data}>
          <PolarGrid stroke="rgba(255, 255, 255, 0.08)" />
          <PolarAngleAxis 
            dataKey="subject" 
            stroke="#94a3b8" 
            fontSize={10}
            tickLine={false}
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            stroke="rgba(255, 255, 255, 0.2)"
            fontSize={8}
            tick={false}
          />
          <Radar 
            name="Score Weight" 
            dataKey="value" 
            stroke="#00ff87" 
            fill="#00ff87" 
            fillOpacity={0.25} 
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
