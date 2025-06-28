import { Platform } from "@repo/types/contest";
import { OjHandles } from "@repo/types/user";
import { IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

const getBadge = (platform: Platform, handle: OjHandles) => {
  if (platform === Platform.ATCODER) {
    return (
      <Image
        src={handle.badge || ""}
        width={80}
        height={80}
        alt="Atcoder Badge"
      />
    );
  } else if (platform === Platform.LEETCODE) {
    return (
      <Image
        src={"https://leetcode.com/static/images/badges/guardian.png"}
        width={80}
        height={80}
        alt="Leetcode Badge"
      />
    );
  } else if (platform === Platform.CODECHEF) {
    const stars = Array.from(
      { length: parseInt(handle.badge || "0") },
      (_, i) => (
        <IconStarFilled key={i} className="text-yellow-500 w-full h-full" />
      ),
    );
    return (
      <div className="flex space-x-1 w-[80px] h-[80px]">
        {stars.map((star) => {
          return star;
        })}
      </div>
    );
  } else if (platform === Platform.CODEFORCES) {
    return (
      <div className="flex items-center justify-center flex-col w-[80px] h-[80px]">
        <h4 className="text-xl font-bold">{handle.badge?.toUpperCase()}</h4>
      </div>
    );
  }
};

const ContestRatings = ({ handles }: { handles: OjHandles[] }) => {
  return (
    <div className="rounded-md shadow border-[1px] flex-auto">
      <h2 className="text-center font-bold text-xl my-4 text-gray-700">
        Contest Ratings
      </h2>
      <div className="w-full h-[1px] bg-gray-200 mb-6"></div>
      {handles &&
        handles.length &&
        handles.map((handle) => {
          if (handle.platform === Platform.CSES) return;
          return (
            <div
              key={handle.handle + handle.platform}
              className="flex flex-col"
            >
              <p className="text-center font-bold tracking-tighter">
                {handle.platform}
              </p>
              <div className="flex items-center justify-around">
                {/* {handle.platform===} */}
                {getBadge(handle.platform, handle)}
                <div className="flex flex-col">
                  <h4 className="text-2xl font-bold tracking-tighter">
                    {handle.rating}
                  </h4>
                  <h6 className="tracking-tighter">max. {handle.maxRating}</h6>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ContestRatings;
