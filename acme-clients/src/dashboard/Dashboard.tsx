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
    <div className="c-flex c-flex-col c-gap-6">
      <h2 className="c-text-2xl c-font-semibold">Financial balance</h2>

      <ResponsiveContainer
        style={{ fontFamily: "monospace" }}
        width="100%"
        height={400}
      >
        <BarChart
          height={300}
          data={data}
          margin={{
            top: 32,
            right: 32,
            left: 0,
            bottom: 32,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis fontSize=".75rem" dataKey="name" />
          <YAxis fontSize=".75rem" />
          <Tooltip />
          <Legend align="left" />
          <ReferenceLine y={0} stroke="#000" />
          <Bar
            barSize={32}
            dataKey="income"
            radius={4}
            fill="hsl(var(--accent))"
          />
          <Bar
            barSize={32}
            dataKey="costs"
            radius={4}
            fill="hsl(var(--secondary-foreground))"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const data = [
  {
    name: "I 2023",
    income: 4000,
    costs: -2400,
    amt: 2400,
  },
  {
    name: "II 2023",
    income: 3000,
    costs: -1398,
    amt: 2210,
  },
  {
    name: "III 2023",
    income: 2000,
    costs: -4800,
    amt: 2290,
  },
  {
    name: "IV 2023",
    income: 2780,
    costs: -3908,
    amt: 2000,
  },
  {
    name: "V 2023",
    income: 1890,
    costs: -4800,
    amt: 2181,
  },
  {
    name: "VI 2023",
    income: 2390,
    costs: -3800,
    amt: 2500,
  },
  {
    name: "VII 2023",
    income: 3490,
    costs: -4300,
    amt: 2100,
  },
  {
    name: "VIII 2023",
    income: 3490,
    costs: -300,
    amt: 2100,
  },
  {
    name: "IX 2023",
    income: 3890,
    costs: -1300,
    amt: 2100,
  },
  {
    name: "X 2023",
    income: 3090,
    costs: -1300,
    amt: 2100,
  },
];

export const Component = Dashboard;
