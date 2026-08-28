import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

export const PieChartComponent = ({
  data = [
    { name: 'Enterprise Subscriptions', value: 48, color: '#1677D2' },
    { name: 'API Volume Usage', value: 27, color: '#2F9BF4' },
    { name: 'Predictive Models', value: 15, color: '#00F0FF' },
    { name: 'Integrations', value: 10, color: '#8B5CF6' },
  ],
  height = 300,
}) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <PieChart>
          <Tooltip
            contentStyle={{
              backgroundColor: '#071A33',
              borderRadius: '12px',
              border: '1px solid #143666',
              color: '#FFFFFF',
            }}
            formatter={(val) => `${val}%`}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value) => <span className="text-xs font-semibold text-text-secondary">{value}</span>}
          />
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || '#1677D2'} stroke="none" />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
