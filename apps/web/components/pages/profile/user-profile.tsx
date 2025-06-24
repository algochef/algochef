import { IconAward, IconSparkles } from "@tabler/icons-react"
import StatCard from "./stat-card"
import UserStatCard from "./user-stat-card"
import OJHandlesStats from "./oj-handles-stats"
import UserProgressBar from "./user-progress"
import { fetchUserInfo } from "@/lib/profile/fetch-user-info"
import { redirect } from "next/navigation"


const UserProfile = async ({ username }: { username: string }) => {
  console.log("UserProfile",username);
  const userInfo = await fetchUserInfo(username);
  if(!userInfo){
    redirect('/');
  }
  return <div className="flex w-full space-x-3">
    <UserStatCard userInfo={userInfo}/>
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
        <OJHandlesStats />
      </div>
    </div>
  </div>
}

export default UserProfile