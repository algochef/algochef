import { prismaClient } from "@repo/db/client";
import { Platform } from "@repo/types/contest";

export type TimeRange = "last6m" | "last1y" | string;

const isValidTimeRange = (value: TimeRange) => {
  return (
    value === "last6m" ||
    value === "last1y" ||
    (Number(value) >= 2017 && Number(value) <= new Date().getFullYear())
  );
};

const getRange = (duration: TimeRange) => {
  if (!isValidTimeRange(duration)) {
    throw new Error("Invalid duration");
  }

  let start: Date;
  let end: Date;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (duration === "last6m") {
    start = new Date(today);
    start.setMonth(start.getMonth() - 6);
    start.setHours(0, 0, 0, 0);
    end = new Date(today);
  } else if (duration === "last1y") {
    console.log(duration)
    start = new Date(today);
    start.setFullYear(start.getFullYear() - 1);
    start.setHours(0, 0, 0, 0);
    end = new Date(today);
  } else {
    start = new Date(Number(duration), 0, 1, 0, 0, 0, 0);
    end = new Date(Number(duration), 11, 31, 0, 0, 0, 0);
  }
  return { start, end };
};

export const generateSubmissionGraph = async (
  userId: number,
  platform: Platform | "all",
  duration: string,
) => {
  // console.log(username, platform, duration);
  const { start, end } = getRange(duration as unknown as TimeRange);
  // console.log(start, end);
  const submissions = await prismaClient.submission.findMany({
    where: {
      userId: userId,
      ...(platform !== "all" && { platform }),
      submittedOn: {
        gte: start,
        lte: end,
      },
    },
    omit: {
      id: true,
      ojProfileId: true,
    },
    orderBy: {
      submittedOn: "asc",
    },
  });
  return submissions;
};

// (async () => {
//   console.log(await generateSubmissionGraph('terminalwarlord', Platform.LEETCODE, "last6m"))
// })()
