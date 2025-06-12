import { IconLayoutSidebar } from '@tabler/icons-react'
import React from 'react'
import { Separator } from '../ui/separator'
import { ToggleSidebar } from './toggle-sidebar'

const Container = ({ title, children }: { title?: string, children: React.ReactNode }) => {
    return (
        <div className=' bg-gray-100/20 dark:bg-neutral-800/30 border-[1px] rounded-md w-full md:mr-3'>
            <div className='flex space-x-4 items-center  py-2 px-2'>
                <ToggleSidebar />
                {/* <div className='h-4 w-[1px] bg-gray-200'></div> */}
                {/* <h6 className='font-medium'>{title}</h6> */}
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Container