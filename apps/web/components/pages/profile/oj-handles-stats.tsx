import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { GetPlatformAvatar } from "@/components/ui/platforms"
import { Platform } from "@repo/types/contest"

const OJHandlesStats = () => {
    return <div className="border-[1px] shadow rounded-md p-4">
        <h4 className="px-2 font-bold text-2xl py-2">Platform Statistics</h4>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Platform</TableHead>
                    <TableHead>Handle</TableHead>
                    <TableHead>Rank/Rating</TableHead>
                    <TableHead>Contests</TableHead>
                    <TableHead>Solved</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <GetPlatformAvatar platform={Platform.CODEFORCES} />
                    </TableCell>
                    <TableCell>@terminalwarlord</TableCell>
                    <TableCell>7126398</TableCell>
                    <TableCell>96</TableCell>
                    <TableCell>890</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <GetPlatformAvatar platform={Platform.LEETCODE} />
                    </TableCell>
                    <TableCell>@terminalwarlord</TableCell>
                    <TableCell >7126398</TableCell>
                    <TableCell>96</TableCell>
                    <TableCell>890</TableCell>
                </TableRow>
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total Contests</TableCell>
                    <TableCell colSpan={2}>101</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={4}>Total Solved</TableCell>
                    <TableCell colSpan={1}>612857</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    </div>
}

export default OJHandlesStats