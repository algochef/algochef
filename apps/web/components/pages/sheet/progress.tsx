import React from 'react'

const ProgressBar = ({
    totalProblems = 0,
    easy = { solved: 0, total: 0 },
    medium = { solved: 0, total: 0 },
    hard = { solved: 0, total: 0 }
}) => {
    const totalSolved = easy.solved + medium.solved + hard.solved;
    const overallPercentage = (totalSolved / totalProblems) * 100;
    const overallPercentageDecimal = Math.floor(overallPercentage);
    const overallPercentageFraction = Math.ceil((overallPercentage - overallPercentageDecimal) * 100);

    const circumference = 2 * Math.PI * 45;

    // Calculate arc lengths for the circular progress
    const totalArc = circumference;


    const easySolved = (easy.solved / totalProblems) * totalArc;
    const mediumSolved = (medium.solved / totalProblems) * totalArc;
    const hardSolved = (hard.solved / totalProblems) * totalArc;

    return (
        <div className=" p-4 rounded-lg  lg:max-w-[350px]">
            {/* <div className="flex items-center">
                <h2 className="text-md md:text-lg lg:text-xl font-semibold text-gray-800 dark:text-gray-50">Progress</h2>
            </div>
            <div className='w-full h-[1px] bg-neutral-400/20 my-4'></div> */}

            <div className="flex items-center justify-between">
                {/* Circular Progress */}
                <div className="relative w-40 h-40">
                    <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
                        {/* Background circle */}
                        <circle
                            cx="50"
                            cy="50"
                            r="35"
                            fill="none"
                            stroke="#f3f4f6"
                            strokeWidth="5"
                            className='dark:stroke-stone-700/60 stroke-gray-400/20'
                        />


                        Easy progress (green/teal)
                        <circle
                            cx="50"
                            cy="50"
                            r="35"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="5"
                            strokeDasharray={`${easySolved} ${totalArc - easySolved}`}
                            strokeDashoffset="0"
                            strokeLinecap="round"
                            className="transition-all duration-500"
                        />

                        {/* Medium progress (orange) */}
                        <circle
                            cx="50"
                            cy="50"
                            r="35"
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="5"
                            strokeDasharray={`${mediumSolved} ${totalArc - mediumSolved}`}
                            strokeDashoffset={-easySolved}
                            strokeLinecap="round"
                            className="transition-all duration-500"
                        />

                        {/* Hard progress (red) */}
                        <circle
                            cx="50"
                            cy="50"
                            r="35"
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="5"
                            strokeDasharray={`${hardSolved} ${totalArc - hardSolved}`}
                            strokeDashoffset={-(easySolved + mediumSolved)}
                            strokeLinecap="round"
                            className="transition-all duration-500"
                        />
                    </svg>

                    {/* Center text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-gray-50">
                            {overallPercentageDecimal}
                            <span className="text-xs md:text-sm font-normal text-gray-500 dark:text-gray-300">.{overallPercentageFraction}%</span>
                        </div>
                        <div className="text-xs md:text-sm text-gray-600 mt-1 dark:text-gray-400">Solved</div>
                    </div>
                </div>

                {/* Stats sidebar */}
                <div className="pr-8 space-y-3 flex flex-col items-center justify-center">
                    {/* Easy */}
                    <div className="flex items-center">
                        <div className="text-center">
                            <div className="text-xs md:text-sm font-medium text-emerald-500">Easy</div>
                            <div className="text-sm md:text-md font-semibold text-gray-800 dark:text-gray-100">
                                {easy.solved}/{easy.total}
                            </div>
                        </div>
                    </div>

                    {/* Medium */}
                    <div className="flex items-center">
                        <div className="text-center">
                            <div className="text-xs md:text-sm font-medium text-amber-500">Med.</div>
                            <div className="text-sm md:text-md font-semibold text-gray-800 dark:text-gray-100">
                                {medium.solved}/{medium.total}
                            </div>
                        </div>
                    </div>

                    {/* Hard */}
                    <div className="flex items-center">
                        <div className="text-center">
                            <div className="text-xs md:text-sm font-medium text-red-500">Hard</div>
                            <div className="text-sm md:text-md font-semibold text-gray-800 dark:text-gray-100">
                                {hard.solved}/{hard.total}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgressBar