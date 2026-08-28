import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export const LineChartComponent = ({
  data = [],
  dataKey = 'revenue',
  predictKey = 'predicted',
  xAxisKey = 'month',
  height = 300,
}) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1677D2" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#1677D2" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2F9BF4" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#2F9BF4" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis
            dataKey={xAxisKey}
            tick={{ fill: '#64748B', fontSize: 12 }}
            axisLine={{ stroke: '#CBD5E1' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#64748B', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(val) => `$${val / 1000}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#071A33',
              borderRadius: '12px',
              border: '1px solid #143666',
              color: '#FFFFFF',
              boxShadow: '0 10px 25px -5px rgba(7, 26, 51, 0.3)',
            }}
            formatter={(val) => val ? `$${val.toLocaleString()}` : 'N/A'}
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke="#1677D2"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorRevenue)"
            name="Actual Revenue"
          />
          {predictKey && (
            <Area
              type="monotone"
              dataKey={predictKey}
              stroke="#2F9BF4"
              strokeDasharray="5 5"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPredicted)"
              name="AI Prediction"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
