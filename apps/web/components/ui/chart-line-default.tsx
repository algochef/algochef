"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { Platform } from "@repo/types/contest";
import { Button } from "./button";
import { RatingHistory } from "@repo/types/stat";

export const description = "An area chart";

function CustomTooltipContent({
  payload,
}: {
  payload?: { payload: RatingHistory }[]
}) {
  if (!payload || payload.length === 0) return null

  const { rating, rank, contestTitle, date } = payload[0].payload;

  const formattedDate = new Date(date * 1000).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="p-3 rounded-md shadow bg-white text-sm min-w-[200px]">
      <div className="text-lg font-bold">Rating {rating}</div>
      <div className="text-muted-foreground">{formattedDate}</div>
      <div className="font-semibold">{contestTitle}</div>
      <div className="text-muted-foreground">Rank: {rank}</div>
    </div>
  );
}

export function ChartLineDefault({
  ratingHistory,
  handlePlatformUpdate,
}: {
  ratingHistory: {
    rank: number;
    contestTitle: string;
    date: number;
    rating: number;
  }[];
  handlePlatformUpdate: (platform: Platform) => void;
}) {
  const chartConfig: ChartConfig = {
    rating: {
      label: "Rating",
      color: "var(--chart-1)",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contest Ratings</CardTitle>
        <CardDescription>Contest Ratings Over Time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap space-x-1 space-y-1 mb-4">
          <Button
            size={"sm"}
            onClick={() => {
              handlePlatformUpdate(Platform.CODEFORCES);
            }}
          >
            Codeforces
          </Button>
          <Button
            size={"sm"}
            onClick={() => {
              handlePlatformUpdate(Platform.LEETCODE);
            }}
          >
            Leetcode
          </Button>
          <Button
            size={"sm"}
            onClick={() => {
              handlePlatformUpdate(Platform.CODECHEF);
            }}
          >
            Codechef
          </Button>
          <Button
            size={"sm"}
            onClick={() => {
              handlePlatformUpdate(Platform.ATCODER);
            }}
          >
            Atcoder
          </Button>
        </div>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={ratingHistory}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <defs>
                <linearGradient id="ratingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--chart-1)"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--chart-1)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="contestTitle"
                tick={false}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={["auto", "auto"]}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={{ strokeDasharray: "3 3" }}
                content={<CustomTooltipContent />}
              />
              <Area
                type="natural"
                dataKey="rating"
                stroke="var(--chart-1)"
                fill="url(#ratingGradient)"
                strokeWidth={2}
                dot={{ r: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
