import { Button } from "@/components/ui/button"
import { Bell, Bookmark, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Contest } from "@repo/types/contest"
import { formatDuration } from "@/lib/timeFormatter"
import { getPlatformAvatar } from "@/lib/contest-helpers/platforms"


const ContestCard = (
    {
        contest

    }: {
        contest: Contest
    }
) => {
    const startDate = new Date(contest.startsAt*1000);
    const formattedDate = startDate.toLocaleDateString(undefined, {
        weekday: 'long',   // e.g., "Sunday"
        day: 'numeric',    // e.g., "1"
        month: 'long',     // e.g., "June"
        year: 'numeric'    // e.g., "2025"
    })
    const formattedTime = startDate.toLocaleTimeString(undefined, {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',

    })
    const curTime  = Math.round(Date.now()/1000);
    const endsAt = (contest.duration+contest.startsAt)
    const hasEnded = endsAt<curTime;

    let startText = `Starts in ${formatDuration(endsAt-curTime)}`;
    if(hasEnded){
        startText = `Ended ${formatDuration(curTime-endsAt)} ago`
    }

    return (
        <div className="border-[1px] p-6 flex flex-col space-y-3 rounded-md">
            <div className="flex justify-between">
                <div className="flex items-center space-x-3">
                    <div>
                        {getPlatformAvatar(contest.platform)}
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-semibold">{contest.title}</h3>
                        <p className="text-sm text-gray-500">{contest.platform}</p>
                    </div>
                </div>
                <div className="flex items-start justify-center space-x-1">
                    <Bookmark size={17} />
                    <Bell size={17} />
                </div>
            </div>
            <div className="flex space-x-2 items-center">
                <Calendar size={17} className="text-gray-500" />
                <p className="text-sm tracking-tight">{formattedDate}</p>
            </div>
            <div className="flex space-x-2 items-center">
                <Clock size={17} className="text-gray-500" />
                <p className="text-sm tracking-tight">{formattedTime.toLocaleLowerCase()} • {formatDuration(contest.duration)}</p>
            </div>
            <p className="tracking-tight border-[1px] border-gray-500/30 dark:border-gray-200/20 w-fit px-3 rounded-xl font-medium text-xs py-0.5">{startText}</p>
            <div className="w-full flex justify-end">
                <Button>
                    <Link href={contest.url}>Contest Link</Link>
                </Button>
            </div>
        </div>
    )
}

export default ContestCard