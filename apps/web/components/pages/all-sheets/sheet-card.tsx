"use client";

import { Sheet } from '@repo/types/problem';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'



const COLORS = {
    "EMERALD": {
        color: "from-emerald-700 to-emerald-950",
        icon: "/icons/sheet-icons/binary.png"
    },
    "CYAN": {
        color: "from-cyan-700 to-cyan-950",
        icon: "/icons/sheet-icons/diamond.png"
    },
    "INDIGO": {
        color: "from-indigo-700 to-indigo-950",
        icon: "/icons/sheet-icons/data-structure.png"
    },
    "BLUE": {
        color: "from-blue-700 to-blue-950",
        icon: "/icons/sheet-icons/tree.png"

    },
    "TEAL": {
        color: "from-teal-700 to-teal-950",
        icon: "/icons/sheet-icons/graph.png"

    },
    "YELLOW": {
        color: "from-yellow-400 to-yellow-700",
        icon: "/icons/sheet-icons/diamond.png"

    }
}

const SheetCard = ({ sheet }: { sheet: Sheet }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <Link
            href={'/sheet/'+sheet.slug}
            key={sheet.slug}
            onMouseOver={() => {
                setIsHovered(true);
            }}
            onMouseOut={() => {
                setIsHovered(false);
            }}
            className={`w-full min-h-[170px] md:min-h-[200px] max-h-fit bg-gradient-to-br  rounded-md p-4 relative ${COLORS[sheet.theme].color} overflow-clip`}
        >
            <div className="relative z-10">
                <h2 className='tracking-tight font-semibold text-lg md:text-xl text-gray-50'>{sheet.title}</h2>
                <h6 className='text-xs md:text-sm tracking-tighter text-gray-200/80'>{sheet.description}</h6>
            </div>

            <div className={`-rotate-45 absolute right-2 bottom-2 transform transition-all duration-200 ease-in-out z-0 w-[80px] h-[80px]  sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] ${isHovered ? "scale-150" : ""}`}>
                <Image src={COLORS[sheet.theme].icon} alt='icon' width={120} height={120} />
            </div>
        </Link>
    )
}

export default SheetCard