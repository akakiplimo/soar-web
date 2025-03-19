import { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { fetchExpenses } from '../../store/slices/expenseStatsSlice';

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

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-md rounded">
        <p className="text-sm font-medium text-zinc-950">{payload[0].name}</p>
        <p
          className="text-sm font-medium"
          style={{ color: payload[0].payload.color }}
        >
          {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center">
          <div
            className="w-3 h-3 mr-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-sm text-gray-600">
            {entry.value} {entry.payload.value}%
          </span>
        </div>
      ))}
    </div>
  );
};

const ExpenseStatisticsChart = () => {
  const [chartData, setChartData] = useState([]);
  const dispatch = useAppDispatch();
  const expenseStatsState = useAppSelector((state) => state.expenseStats);
  const {
    data: expenseStats,
    status,
    error,
  } = expenseStatsState ?? { data: null, status: 'idle', error: null };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchExpenses());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (expenseStats) {
      setChartData(expenseStats);
    }
  }, [expenseStats]);

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!chartData || chartData.length === 0)
    return <ChartContainer>No Weekly Activity Data found</ChartContainer>;

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            innerRadius={0}
            paddingAngle={0}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            content={<CustomLegend />}
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default ExpenseStatisticsChart;
