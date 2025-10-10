import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';

export function BloodTypeDistribution({ data }) {
  const COLORS = ['#ef5350', '#e57373', '#f06292', '#ab47bc', '#5c6bc0', '#29b6f6', '#26a69a', '#66bb6a'];
  const chartData = Object.entries(data).map(([type, value], idx) => ({ name: type, value, fill: COLORS[idx % COLORS.length] }));
  return (
    <div style={{ width: '100%', height: 240 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={80}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function StatsBar({ items }) {
  return (
    <div style={{ width: '100%', height: 240 }}>
      <ResponsiveContainer>
        <BarChart data={items}>
          <XAxis dataKey="name" stroke="#fff"/>
          <YAxis stroke="#fff"/>
          <Tooltip />
          <Bar dataKey="value" fill="#ef5350" radius={[6,6,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
