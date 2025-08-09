"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartData } from "@/models/components";

interface ChartDataProps {
  data: ChartData[];
}
export default function BarChartCard({ data }: ChartDataProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex-between">
        <CardTitle className="text-2xl font-semibold">Overview</CardTitle>
      </CardHeader>
      <CardContent className="align-center gap-1">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Bar dataKey="total" fill="#3498db" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
