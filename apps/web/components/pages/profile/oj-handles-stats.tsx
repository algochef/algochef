import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetPlatformAvatar } from "@/components/ui/platforms";
import { OjHandles } from "@repo/types/user";

const OJHandlesStats = ({ handles }: { handles: OjHandles[] }) => {
  console.log(handles);
  const total = { contests: 0, solved: 0 };
  return (
    <div className="border-[1px] shadow rounded-md p-4">
      <h4 className="px-2 font-bold text-2xl py-2">Platform Overview</h4>
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
          {handles &&
            handles.length &&
            handles.map((handle) => {
              total.contests += handle.totalContests || 0;
              total.solved += handle.totalSolved;
              return (
                <TableRow key={`${handle.handle}${handle.platform}`}>
                  <TableCell>
                    <GetPlatformAvatar platform={handle.platform} />
                  </TableCell>
                  <TableCell>@{handle.handle}</TableCell>
                  <TableCell>{handle.rank}</TableCell>
                  <TableCell>{handle.totalContests}</TableCell>
                  <TableCell>{handle.totalSolved}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Contests</TableCell>
            <TableCell colSpan={2}>{total.contests}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4}>Total Solved</TableCell>
            <TableCell colSpan={1}>{total.solved}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default OJHandlesStats;
