import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';

export const BarChartComponent = ({
  data = [
    { label: 'Q1 Sales', value: 4200 },
    { label: 'Q2 Sales', value: 6800 },
    { label: 'Q3 Sales', value: 9400 },
    { label: 'Q4 Forecast', value: 12100 },
  ],
  dataKey = 'value',
  xAxisKey = 'label',
  color = '#1677D2',
  height = 300,
}) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#071A33',
              borderRadius: '12px',
              border: '1px solid #143666',
              color: '#FFFFFF',
              boxShadow: '0 10px 25px -5px rgba(7, 26, 51, 0.3)',
            }}
          />
          <Bar dataKey={dataKey} radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === data.length - 1 ? '#2F9BF4' : color}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
