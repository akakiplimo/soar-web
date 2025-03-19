import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchWeeklyActivity } from '../../store/slices/weeklyActivitySlice';

const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  background: white;
  border-radius: 8px;
  padding: 16px;
  color: #333;
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
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: ${entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const WeeklyActivityChart = () => {
  const [chartData, setChartData] = useState([]);
  const dispatch = useAppDispatch();
  const activityState = useAppSelector((state) => state.weeklyActivity);
  const {
    data: weeklyActivity,
    status,
    error,
  } = activityState ?? { data: null, status: 'idle', error: null };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchWeeklyActivity());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (weeklyActivity) {
      setChartData(weeklyActivity);
    }
  }, [weeklyActivity]);

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!chartData || chartData.length === 0)
    return <ChartContainer>No Weekly Activity Data found</ChartContainer>;

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          barGap={8}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
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
          <Legend
            iconType="circle"
            verticalAlign="top"
            align="right"
            height={36}
          />
          <Bar
            dataKey="withdraw"
            name="Withdraw"
            fill="#333"
            radius={[5, 5, 0, 0]}
            barSize={20}
          />
          <Bar
            dataKey="deposit"
            name="Deposit"
            fill="#4169E1"
            radius={[5, 5, 0, 0]}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default WeeklyActivityChart;
