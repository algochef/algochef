"use client";

import { fetchSubmissionGraph } from "@/lib/profile/fetch-submission-graph";
import { Platform } from "@repo/types/contest";
import React, { ReactNode, useEffect, useState } from "react";
import clsx from "clsx";

// ✅ Tooltip Component
const Tooltip = ({ children, text }: { children: ReactNode; text: string }) => (
  <div className="relative group cursor-pointer">
    {children}
    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white text-xs px-2 py-1 rounded z-10 whitespace-nowrap pointer-events-none">
      {text}
    </div>
  </div>
);

const SubmissionGraph = () => {
  const [submissionHistory, setSubmissionHistory] = useState<
    Record<string, number>
  >({});
  const [duration, setDuration] = useState("last1y");
  const [platform, setPlatform] = useState<Platform | "ALL">("ALL");
  // TODO:  Add username (of algochef not OJ)
  const username = "joybiswas389";

  useEffect(() => {
    const updateSubmissionHistory = async () => {
      try {
        const data = await fetchSubmissionGraph(
          username,
          platform === 'ALL' ? "ALL" : "SPECIFIC",
          duration,
          platform === "ALL" ? undefined : platform
        );
        console.log("Fetched Submission Data:", data);

        const counts: Record<string, number> = {};
        if (Array.isArray(data)) {
          data.forEach((item) => {
            const date = item.submittedOn.split("T")[0];
            counts[date] = item.count;
          });
          setSubmissionHistory(counts);
        } else {
          console.warn("Unexpected submission data format:", data);
        }
      } catch (error) {
        console.error("Failed to fetch submission graph:", error);
      }
    };

    updateSubmissionHistory();
  }, [duration, platform]);

  let start: Date;

  if (duration === "last1y") {
    start = new Date();
    start.setMonth(start.getMonth() - 12);
  } else {
    start = new Date(parseInt(duration), 0, 1);
  }
  const months: ReactNode[] = [];

  for (let i = 0; i < 12; i++) {
    const year = start.getFullYear();
    const month = start.getMonth();
    const dayOfWeek = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const grid: ReactNode[][] = Array(7)
      .fill(null)
      .map(() => []);

    let currentDay = 1;

    for (let week = 0; week < 6; week++) {
      for (let weekday = 0; weekday < 7; weekday++) {
        if (week === 0 && weekday < dayOfWeek) {
          grid[weekday].push(
            <div
              key={`blank-${i}-${week}-${weekday}`}
              className="w-1.5 h-1.5 lg:w-2.5 lg:h-2.5 rounded-xs bg-muted"
            />,
          );
        } else if (currentDay <= daysInMonth) {
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(currentDay).padStart(2, "0")}`;
          const count = submissionHistory[dateStr] || 0;

          const bgColor = clsx("w-1.5 h-1.5 lg:w-2.5 lg:h-2.5 rounded-xs", {
            "bg-muted": count === 0,
            "bg-green-100": count > 0 && count <= 1,
            "bg-green-300": count > 1 && count <= 3,
            "bg-green-500": count > 3 && count <= 6,
            "bg-green-700": count > 6,
          });

          grid[weekday].push(
            <Tooltip
              key={`day-${i}-${currentDay}`}
              text={`${dateStr}: ${count} submission${count === 1 ? "" : "s"}`}
            >
              <div className={bgColor} />
            </Tooltip>,
          );

          currentDay++;
        } else {
          grid[weekday].push(
            <div
              key={`blank-end-${i}-${week}-${weekday}`}
              className="w-1.5 h-1.5 lg:w-2.5 lg:h-2.5 rounded-xs bg-muted"
            />,
          );
        }
      }

      if (currentDay > daysInMonth) break;
    }

    months.push(
      <div key={`month-${i}`} className="my-2 flex-shrink-0">
        <div className="text-center font-semibold mb-2">
          {start.toLocaleString("default", { month: "short" })}
        </div>
        <div className="flex flex-col gap-0.5">
          {grid.map((row, idx) => (
            <div key={idx} className="flex gap-1">
              {row}
            </div>
          ))}
        </div>
      </div>,
    );

    start.setMonth(start.getMonth() + 1);
  }

  return (
    <div className="rounded-md shadow border-[1px] p-4 w-full">
      <div className="overflow-x-auto md:overflow-visible scrollbar-hide">
        <div className="flex justify-between mb-4 gap-2">
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as Platform)}
            className="border px-2 py-1 rounded"
          >
            <option value="ALL">All</option>
            <option value="LEETCODE">Leetcode</option>
            <option value="CODEFORCES">Codeforces</option>
          </select>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="last1y">Current</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>
        <div className="flex gap-4 md:justify-between w-max md:w-full">
          {months}
        </div>
      </div>
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SubmissionGraph;
