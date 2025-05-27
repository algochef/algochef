import { Calendar, Clock } from "lucide-react"

const ContestCard = () => {
  return (
    <div>
        <div className="flex items-center space-x-3">
            <div>
                <img src="https://ui-avatars.com/api/?name=Jay+Bee&background=0D8ABC&color=fff" alt="" className="rounded-md w-10" />
            </div>
            <div className="flex flex-col">
                <h3 className="font-semibold">Weekly Contest 348</h3>
                <p className="text-sm text-gray-500">LeetCode</p>
            </div>
        </div>
        <div className="flex space-x-2 items-center">
            <Calendar size={17} className="text-gray-500"/>
            <p className="text-sm tracking-tight">Sunday 1 June 2025</p>
        </div>
        <div className="flex space-x-2 items-center">
            <Clock size={17} className="text-gray-500"/>
            <p className="text-sm tracking-tight">8:30 am • 1 hour 30 minutes</p>
        </div>
    </div>
  )
}

export default ContestCard