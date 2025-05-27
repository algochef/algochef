import { Tabs,TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoadContests from "./load-contest";
import { contestType } from "@repo/types/contest";

const ContestPage = () => {
    return (
        <div>
            <div className="pt-16 flex flex-col items-center">
                <div className="flex flex-col w-11/12 my-8">
                    <h1 className="text-3xl font-bold tracking-tighter">Contest Tracker</h1>
                    <h6 className="text-base text-gray-500 tracking-tight">Never miss a coding contest with our comprehensive tracker</h6>
                    <div className="w-full h-[1px] bg-gray-400/20 my-4 m-auto"></div>
                </div>
                <Tabs defaultValue="upcoming" className="w-11/12 mb-16">
                    <TabsList className="bg-gray-100 dark:bg-gray-100/5">
                        <TabsTrigger value="upcoming" className="border-0">Upcoming</TabsTrigger>
                        <TabsTrigger value="past" className="border-0">Past Contests</TabsTrigger>
                    </TabsList>
                    <LoadContests/>
                    <LoadContests contestType={contestType.PAST}/>
                </Tabs>
            </div>
        </div >
    )
}

export default ContestPage