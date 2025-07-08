import * as React from "react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartConfig,
} from "../ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { HistoryPoint } from "~/api/historyPoints";

interface HistoryGraphProps {
  historyPoints: HistoryPoint[];
}

const chartConfig = {
  // visitors: {
  //   label: "Visitors",
  // },
  // buses: {
  //   label: "Buses",
  //   color: "var(--chart-1)",
  // },
  // cars: {
  //   label: "Cars",
  //   color: "var(--chart-2)",
  // },
} satisfies ChartConfig;

export const HistoryGraph: React.FC<HistoryGraphProps> = ({ historyPoints }) => {
  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Очереди на границе</CardTitle>
          <CardDescription>График по числу машин, автобусов и грузовиков</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer className="aspect-auto h-[300px] w-full" config={chartConfig}>
          <LineChart data={historyPoints}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="datetime"
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("ru-RU", {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                })
              }
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <YAxis />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleString("ru-RU", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  }
                />
              }
            />
            <Line
              type="monotone"
              dataKey="cars"
              stroke="var(--color-cars, #3b82f6)"
              strokeWidth={2}
              dot={false}
              name="Машины"
            />
            <Line
              type="monotone"
              dataKey="buses"
              stroke="var(--color-buses, #f59e0b)"
              strokeWidth={2}
              dot={false}
              name="Автобусы"
            />
            {historyPoints.some(p => p.trucks !== undefined && p.trucks !== 0) && (
              <Line
                type="monotone"
                dataKey="trucks"
                stroke="var(--color-trucks, #ef4444)"
                strokeWidth={2}
                dot={false}
                name="Грузовики"
              />
            )}
            <ChartLegend content={<ChartLegendContent payload={undefined} />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
