

import React from 'react'

const StatCard = ({ icon, title, subtitle }: { icon: React.ReactNode, title: string, subtitle: string }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="rounded-full bg-blue-300/20 p-2 text-blue-500">{icon}</div>
            <p className="font-bold text-sm sm:text-lg md:text-xl lg:text-2xl">{title}</p>
            <p className="text-xs md:text-sm text-gray-500">{subtitle}</p>
        </div>
    )
}

export default StatCard