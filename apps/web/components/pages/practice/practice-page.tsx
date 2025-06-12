import React from 'react'
import LeftSidebar from './sidebar/left-sidebar'
import RightSidebar from './sidebar/right/right-sidebar'
import Contents from './sidebar/middle/contents'

const PracticePage = async () => {
    return (
        <div className='flex flex-col items-center dark:bg-neutral-900/30'>
            <div className='flex flex-col space-y-2 md:flex-row md:justify-between md:space-x-2'>
                <Contents />
                <RightSidebar />
            </div>
        </div>
    )
}

export default PracticePage