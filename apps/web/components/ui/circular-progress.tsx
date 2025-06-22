"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A donut chart with text"

const chartData = [
    { problem: "easy", solved: 275, fill: "var(--easy)" },
    { problem: "medium", solved: 200, fill: "var(--medium)" },
    { problem: "hard", solved: 190, fill: "var(--hard)" },
]

const chartConfig = {
    visitors: {
        label: "Solved",
    },
    chrome: {
        label: "Easy",
        color: "var(--chart-1)",
    },
    safari: {
        label: "Medium",
        color: "var(--chart-2)",
    },
    firefox: {
        label: "Hard",
        color: "var(--chart-3)",
    }
} satisfies ChartConfig

export function CircularProgress() {
    const totalSolved = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.solved, 0)
    }, [])

    return (
        <Card className="flex flex-col">
            {/* <CardHeader className="items-center pb-0">
                <CardTitle>Problems Solved</CardTitle>
                <CardDescription>in algochef</CardDescription>
            </CardHeader> */}
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[180px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="solved"
                            nameKey="problem"
                            innerRadius={57}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalSolved.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Solved
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
