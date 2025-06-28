import { IconAward, IconSparkles } from "@tabler/icons-react";
import StatCard from "./stat-card";
import UserStatCard from "./user-stat-card";
import OJHandlesStats from "./oj-handles-stats";
import UserProgressBar from "./user-progress";
import RatingsCard from "./ratings-card";
import ContestRatings from "./contest-ratings";
import { User } from "@repo/types/user";

const UserProfile = async ({ userInfo }: { userInfo: User }) => {
  return (
    <div className="flex flex-col lg:flex-row w-full space-y-3 lg:space-y-0 space-x-0 lg:space-x-3">
      <UserStatCard userInfo={userInfo} />
      <div className="flex flex-col w-full space-y-4">
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-full space-x-4">
          <UserProgressBar />
          <div className="flex flex-col w-full space-y-4">
            <StatCard
              title="Solved Across Platforms"
              count={1167}
              className="bg-gradient-to-r from-green-100 to-green-200 border-green-300 "
              countStyle="text-green-600"
              iconStyle="bg-green-500"
              textStyle="text-gray-500"
              icon={<IconSparkles />}
            />
            <StatCard
              title="Contests"
              count={101}
              className="bg-gradient-to-r from-blue-100 to-blue-200 border-blue-300 "
              countStyle="text-blue-600"
              iconStyle="bg-blue-500"
              textStyle="text-gray-500"
              icon={<IconAward />}
            />
          </div>
        </div>
        <div>
          <OJHandlesStats handles={userInfo.ojHandles} />
        </div>
        <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 space-x-0 lg:space-x-4">
          <RatingsCard handles={userInfo.ojHandles} />
          <ContestRatings handles={userInfo.ojHandles} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
