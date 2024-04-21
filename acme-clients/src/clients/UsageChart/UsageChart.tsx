import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
  Line,
  CartesianGrid,
} from "recharts";
import { usageRows } from "../../client/data";

const palette = [
  "#e60049",
  "#0bb4ff",
  "#50e991",
  "#e6d800",
  "#9b19f5",
  "#ffa300",
  "#dc0ab4",
  "#b3d4ff",
  "#00bfa0",
];

export const UsageChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        width={500}
        height={300}
        data={usageRows.slice(100, 200)}
        className="c-rounded-md c-border"
        style={{ background: "hsl(var(--secondary-foreground))" }}
        margin={{
          top: 20,
          right: 25,
          left: 0,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis unit="k" domain={[0, 180]} />
        <Tooltip />
        <Legend />
        <ReferenceLine x="2021-10-31" label="Max PV PAGE" stroke="red" />
        <ReferenceLine y={115} label="Max" stroke="red" />
        <Line
          strokeWidth={3}
          type="monotone"
          dataKey="vcpu"
          stroke={palette[0]}
          dot={false}
        />
        <Line
          strokeWidth={4}
          type="monotone"
          dataKey="network_total"
          stroke={palette[1]}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="ingress"
          strokeWidth={3}
          dot={false}
          stroke={palette[2]}
        />
        <Line
          type="monotone"
          dataKey="ram"
          strokeWidth={3}
          dot={false}
          stroke={palette[3]}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
