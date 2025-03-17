import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styled from 'styled-components';

const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  background: white;
  border-radius: 8px;
  padding: 16px;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ChartTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-md rounded">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm font-medium text-blue-600">${payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const BalanceHistoryChart = () => {
  // Sample data based on the image
  const data = [
    { name: 'Jul', value: 200 },
    { name: 'Aug', value: 350 },
    { name: 'Sep', value: 250 },
    { name: 'Oct', value: 700 },
    { name: 'Nov', value: 400 },
    { name: 'Dec', value: 650 },
    { name: 'Jan', value: 550 },
  ];

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4169E1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#4169E1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            domain={[0, 'dataMax + 100']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#4169E1"
            strokeWidth={2}
            dot={{ r: 0 }}
            activeDot={{
              r: 6,
              fill: '#4169E1',
              stroke: '#fff',
              strokeWidth: 2,
            }}
          />
          <area
            type="monotone"
            dataKey="value"
            stroke="none"
            fillOpacity={1}
            fill="url(#colorBalance)"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default BalanceHistoryChart;
