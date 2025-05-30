import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Platform } from "@repo/types/contest";

const PlatformMap: Record<Platform, { path: string, fallback: string }> = {
    "LEETCODE": {
        path: '/icons/leetcode.svg',
        fallback: 'LC'
    },
    "CODEFORCES": {
        path: '/icons/codeforces.svg',
        fallback: 'CF'
    },
    "CODECHEF": {
        path: '/icons/codechef.svg',
        fallback: 'CC'
    },
    "ATCODER": {
        path: '/icons/atcoder.svg',
        fallback: 'ATC'
    },
}

export function getPlatformAvatar(platform: Platform) {
    const selectedPlatform = PlatformMap[platform];
    return (
        <div className="w-10 h-10">
            <Avatar className="w-full h-full">
                <AvatarImage
                    src={selectedPlatform.path}
                    alt={`${platform} logo`}
                    className={`w-full h-full object-contain aspect-square bg-gray-400/15 bg-gradient-to-bl from-gray-50 to-gray-300/15 dark:from-blue-300/20 dark:to-gray-950/15 p-2 rounded-sm`}
                />
                <AvatarFallback className="w-full h-full flex items-center justify-center text-sm font-medium aspect-square">
                    {selectedPlatform.fallback}
                </AvatarFallback>
            </Avatar>
        </div>
    );
}