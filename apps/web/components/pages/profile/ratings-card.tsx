"use client";

import { ChartLineDefault } from "@/components/ui/chart-line-default";
import { fetchRatingHistory } from "@/lib/profile/fetch-rating-history";
import { Platform } from "@repo/types/contest";
import { OjHandles } from "@repo/types/user";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { RatingHistory } from "@repo/types/stat";

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
      console.info(profile, selectedPlatform);
      try {
        const history = await fetchRatingHistory(profile.handle, selectedPlatform);
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

  console.log(selectedPlatform);
  const handlePlatformUpdate = (platform: Platform) => {
    console.log(platform, "clicked")
    setSelectedPlatform(platform);
  };

  return (
    <div className="w-8/12">
      {ratingHistory && (
        <>
          <ChartLineDefault
            ratingHistory={ratingHistory}
            handlePlatformUpdate={handlePlatformUpdate}
            selectedPlatform={selectedPlatform}
          />
        </>
      )}
    </div>
  );
};

export default RatingsCard;
