import React from 'react'
import LeftSidebar from './sidebar/left-sidebar'
import RightSidebar from './sidebar/right/right-sidebar'
import Contents from './sidebar/middle/contents'

const PracticePage = async () => {
    return (
        <div className='flex flex-col pt-16  items-center dark:bg-neutral-900/30'>
            <div className='w-11/12  flex justify-between'>
                <LeftSidebar />
                <Contents />
                <RightSidebar />
            </div>
        </div>
    )
}

export default PracticePage