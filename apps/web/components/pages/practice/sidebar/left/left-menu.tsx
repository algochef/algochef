"use client";

import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { IconDatabase, IconDeviceIpadQuestion, IconFileSpreadsheet, IconHexagonLetterC } from '@tabler/icons-react'
import { usePathname } from 'next/navigation';

const LeftMenu = () => {
    const pathname = usePathname();
    const currentPath = pathname.split('/')[1];
    return (
        <ScrollArea className='flex flex-col my-4 border-r-[1px] h-screen pr-2'>
            <div className={`flex space-x-1 items-center font-semibold hover:bg-gray-100 hover:dark:bg-neutral-800/30 rounded-md px-2 py-2 ${currentPath === 'practice' && "bg-gray-100 dark:bg-neutral-800/30"} my-1`}>
                <IconDeviceIpadQuestion size={18} />
                <p>Problems</p>
            </div>
            <div className={`flex space-x-1 items-center font-semibold hover:bg-gray-100 hover:dark:bg-neutral-800/30 rounded-md px-2 py-2 my-1 ${currentPath === 'resource' && "bg-gray-100 dark:bg-neutral-800/30"}`}>
                <IconDatabase size={18} />
                <p>Resource</p>
            </div>
            <div className={`flex space-x-1 items-center font-semibold hover:bg-gray-100 hover:dark:bg-neutral-800/30 rounded-md px-2 py-2 my-1 ${currentPath === 'sheets' && "bg-gray-100 dark:bg-neutral-800/30"}`}>
                <IconFileSpreadsheet size={18} />
                <p>Sheets</p>
            </div>
            <div className={`flex space-x-1 items-center font-semibold hover:bg-gray-100 hover:dark:bg-neutral-800/30 rounded-md px-2 py-2 my-1 ${currentPath === 'companies' && "bg-gray-100 dark:bg-neutral-800/30"}`}>
                <IconHexagonLetterC size={18} />
                <p>Companies</p>
            </div>
        </ScrollArea>
    )
}

export default LeftMenu