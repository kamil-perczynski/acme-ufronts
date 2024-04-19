import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

export const Dashboard: React.FC = () => {
  return (
    <div className="pc-flex pc-flex-col pc-gap-6">
      <h2 className="pc-text-2xl pc-font-semibold">Financial balance</h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis fontSize=".75rem" dataKey="name" />
          <YAxis fontSize=".75rem" />
          <Tooltip />
          <Legend align="left" />
          <ReferenceLine y={0} stroke="#000" />
          <Bar
            dataKey="income"
            radius={4}
            fill="hsl(var(--accent))"
          />
          <Bar dataKey="costs" radius={4} fill="var(--secondary)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const data = [
  {
    name: "January 2023",
    income: 4000,
    costs: -2400,
    amt: 2400,
  },
  {
    name: "February 2023",
    income: 3000,
    costs: -1398,
    amt: 2210,
  },
  {
    name: "March 2023",
    income: 2000,
    costs: -4800,
    amt: 2290,
  },
  {
    name: "April 2023",
    income: 2780,
    costs: -3908,
    amt: 2000,
  },
  {
    name: "May 2023",
    income: 1890,
    costs: -4800,
    amt: 2181,
  },
  {
    name: "June 2023",
    income: 2390,
    costs: -3800,
    amt: 2500,
  },
  {
    name: "July 2023",
    income: 3490,
    costs: -4300,
    amt: 2100,
  },
];

export const Component = Dashboard;