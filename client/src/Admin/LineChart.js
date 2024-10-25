import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const UserGrowthChart = () => {
  const data = [
    { month: 'January', users: 30 },
    { month: 'February', users: 50 },
    { month: 'March', users: 70 },
    { month: 'April', users: 90 },
    { month: 'May', users: 100 },
    { month: 'June', users: 120 },
    { month: 'July', users: 150 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="users"
          stroke="#4bc0c0"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default UserGrowthChart;
