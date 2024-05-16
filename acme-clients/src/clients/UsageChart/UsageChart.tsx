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
    <ResponsiveContainer style={{ fontFamily: "monospace"}} width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={usageRows.slice(125)}
        className="c-rounded-md c-border"
        style={{ background: "hsl(var(--primary))" }}
        margin={{
          top: 32,
          right: 32,
          left: 0,
          bottom: 32,
        }}
      >
        <XAxis dataKey="date" hide />
        <YAxis fontSize={12} domain={[0, 180]} />
        <Tooltip
          labelStyle={{ color: "hsl(var(--primary-foreground))" }}
          contentStyle={{ background: "hsl(var(--primary))" }}
        />
        <Legend />
        <ReferenceLine x="2021-10-31" label="Max PV PAGE" stroke="red" />
        <ReferenceLine y={115} label="Max" stroke="red" />
        <Line
          strokeWidth={4}
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
          dataKey="ram"
          strokeWidth={4}
          dot={false}
          stroke={palette[2]}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
