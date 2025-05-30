import { Target, Trophy, Users } from "lucide-react"
import StatCard from "./stat-card"

const Stats = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 md:gap-y-0 md:grid-cols-3 my-8 items-center justify-evenly w-8/12">
            <StatCard icon={<Users size={25} />} subtitle="Active Users" title="100+" />
            <StatCard icon={<Target size={25} />} subtitle="Problems Added" title="400+" />
            <StatCard icon={<Trophy size={25} />} subtitle="Contest Tracked" title="4K+" />
        </div>
    )
}

export default Stats