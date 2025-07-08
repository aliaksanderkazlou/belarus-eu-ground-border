import * as React from "react";
import { Line, LineChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
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
  enabledTypes?: Array<keyof typeof chartConfig>;
}
const chartConfig = {
  cars: {
    label: "Автомобили",
    color: "#60a5fa",
  },
  buses: {
    label: "Автобусы",
    color: "#38bdf8",
  },
  trucks: {
    label: "Грузовики",
    color: "#f87171",
  },
} satisfies ChartConfig;

export const HistoryGraph: React.FC<HistoryGraphProps> = ({ historyPoints, enabledTypes = ["buses"] }) => {
  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Очереди на границе</CardTitle>
          <CardDescription>Последние изменения очередей</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <LineChart
            data={historyPoints}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="datetime"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("ru-RU", {
                  day: "2-digit",
                  month: "short",
                })
              }
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("ru-RU", {
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
            {enabledTypes.includes("cars") && (
              <Line
                dataKey="cars"
                name={chartConfig.cars.label}
                type="monotone"
                stroke={chartConfig.cars.color}
                strokeWidth={2}
                dot={false}
              />
            )}
            {enabledTypes.includes("buses") && (
              <Line
                dataKey="buses"
                name={chartConfig.buses.label}
                type="monotone"
                stroke={chartConfig.buses.color}
                strokeWidth={2}
                dot={false}
              />
            )}
            {enabledTypes.includes("trucks") && (
              <Line
                dataKey="trucks"
                name={chartConfig.trucks.label}
                type="monotone"
                stroke={chartConfig.trucks.color}
                strokeWidth={2}
                dot={false}
              />
            )}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};