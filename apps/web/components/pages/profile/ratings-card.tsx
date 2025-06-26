"use client";

import { ChartLineDefault } from "@/components/ui/chart-line-default";
import { getCodechefRatingChart } from "@/lib/profile/fetch-codechef-rating";
import { getLeetcodeRatingChart } from "@/lib/profile/fetch-leetcode-rating";
import { Platform } from "@repo/types/contest";
import { OjHandles } from "@repo/types/user";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { RatingHistory } from "@repo/types/stat";
import { getCodeforcesRatingChart } from "@/lib/profile/fetch-codeforces-rating";

const selectInitialPlatform = (handles: OjHandles[]) => {
  for (const handle of handles) {
    if (handle.platform !== Platform.CSES) {
      return handle.platform;
    }
  }
  return Platform.LEETCODE;
};

const RatingsCard = ({ handles }: { handles: OjHandles[] }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(
    selectInitialPlatform(handles),
  );
  const [ratingHistory, setRatingHistory] = useState<RatingHistory[]>([]);
  console.log(ratingHistory, handles);

  useEffect(() => {
    const updateHistory = async () => {
      const profile = handles.find(
        (handle) => selectedPlatform === handle.platform,
      );
      if (!profile) {
        return;
      }
      try {
        let history;
        if (selectedPlatform === Platform.LEETCODE) {
          history = await getLeetcodeRatingChart(profile.handle);
        } else if (selectedPlatform === Platform.CODEFORCES) {
          history = await getCodeforcesRatingChart(profile.handle);
        } else if (selectedPlatform === Platform.CODECHEF) {
          history = await getCodechefRatingChart(profile.handle);
        }
        if (!history) {
          throw new Error("Failed to get contest data!");
        }
        setRatingHistory(history);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("Failed to get contest data!");
        }
      }
    };

    updateHistory();
  }, [selectedPlatform, handles]);

  const handlePlatformUpdate = (platform: Platform) => {
    setSelectedPlatform(platform);
  };

  return (
    <div className="w-[400px]">
      {ratingHistory && (
        <>
          <ChartLineDefault
            ratingHistory={ratingHistory}
            handlePlatformUpdate={handlePlatformUpdate}
          />
        </>
      )}
    </div>
  );
};

export default RatingsCard;
