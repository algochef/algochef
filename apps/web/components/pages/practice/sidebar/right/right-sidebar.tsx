import React from 'react';
import TrendingCompanies from './trending-companies';
import CustomCalender from './custom-calender';

const RightSidebar = async () => {
    return (
        <div className='flex-[1] flex flex-col items-center space-y-4 my-4'>
            <CustomCalender />
            <TrendingCompanies />
        </div>
    )
}

export default RightSidebar