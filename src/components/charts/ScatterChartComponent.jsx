import React from 'react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export const ScatterChartComponent = ({ height = 300 }) => {
  const data = [
    { x: 10, y: 30, z: 200, name: 'Campaign Alpha' },
    { x: 20, y: 50, z: 260, name: 'Campaign Beta' },
    { x: 30, y: 75, z: 400, name: 'Campaign Gamma' },
    { x: 45, y: 90, z: 500, name: 'Campaign Delta' },
    { x: 60, y: 120, z: 700, name: 'Campaign Epsilon' },
    { x: 75, y: 150, z: 900, name: 'Campaign Zeta' },
  ];

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis
            type="number"
            dataKey="x"
            name="Ad Spend ($k)"
            unit="k"
            tick={{ fill: '#64748B', fontSize: 12 }}
          />
          <YAxis
            type="number"
            dataKey="y"
            name="Conversions"
            tick={{ fill: '#64748B', fontSize: 12 }}
          />
          <ZAxis type="number" dataKey="z" range={[60, 400]} name="ROI Lift" />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{
              backgroundColor: '#071A33',
              borderRadius: '12px',
              border: '1px solid #143666',
              color: '#FFFFFF',
            }}
          />
          <Scatter name="Campaign Correlation" data={data} fill="#2F9BF4" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScatterChartComponent;
