import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { HistoryPoint } from "~/api/historyPoints"

export const description = "An interactive area chart"

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  buses: {
    label: "Buses",
    color: "var(--chart-1)",
  },
  // cars: {
  //   label: "Cars",
  //   color: "var(--chart-2)",
  // },
} satisfies ChartConfig

interface HistoryGraphProps {
  historyPoints: HistoryPoint[];
}

export const HistoryGraph: React.FC<HistoryGraphProps> = ({ historyPoints }) => {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = historyPoints.filter((item) => {
    const date = new Date(item.datetime)
    const referenceDate = new Date("2023-02-10")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillBuses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-buses)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-buses)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="datetime"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="buses"
              type="natural"
              fill="url(#fillBuses)"
              stroke="var(--color-Buses)"
              stackId="a"
            />
            {/* <Area
              dataKey="cars"
              type="natural"
              fill="url(#fillBuses)"
              stroke="var(--color-buses)"
              stackId="a"
            /> */}
            <ChartLegend content={<ChartLegendContent payload={undefined} />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
