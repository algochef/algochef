"use client";

import React, { ReactNode } from 'react';

const SubmissionGraph = () => {
    const start = new Date();
    start.setMonth(start.getMonth() - 12);

    const months: ReactNode[] = [];

    for (let i = 0; i < 12; i++) {
        const year = start.getFullYear();
        const month = start.getMonth();
        const day = new Date(year, month, 1).getDay(); // weekday of the 1st

        const daysInTheMonth = new Date(year, month + 1, 0).getDate();

        // Create a grid: 7 rows (weekdays) x up to 5 columns (weeks)
        const grid: ReactNode[][] = Array(7).fill(null).map(() => []);
        
        let currentDay = 1;
        
        // Fill the grid week by week
        for (let week = 0; week < 6; week++) { // max 6 weeks in a month
            for (let weekday = 0; weekday < 7; weekday++) {
                if (week === 0 && weekday < day) {
                    // Empty cells before the first day of the month
                    grid[weekday].push(<div className='w-2 h-2 lg:w-3 lg:h-3 rounded bg-muted' key={`blank-${i}-${week}-${weekday}`}></div>);
                } else if (currentDay <= daysInTheMonth) {
                    // Days of the month
                    grid[weekday].push(<div className='w-2 h-2 lg:w-3 lg:h-3 rounded bg-green-300' key={`day-${i}-${currentDay}`}></div>);
                    currentDay++;
                } else {
                    // Empty cells after the last day of the month
                    grid[weekday].push(<div className='w-2 h-2 lg:w-3 lg:h-3 rounded bg-muted' key={`blank-end-${i}-${week}-${weekday}`}></div>);
                }
            }
            
            // Stop if we've placed all days
            if (currentDay > daysInTheMonth) break;
        }

        const monthView = (
            <div key={`month-${i}`} className='my-2 flex-shrink-0'>
                <div className='text-center font-semibold mb-2'>
                    {start.toLocaleString('default', { month: 'short' })}
                </div>
                <div className='flex flex-col gap-0.5'>
                    {grid.map((weekdayRow, weekdayIndex) => (
                        <div key={weekdayIndex} className='flex gap-1'>
                            {weekdayRow}
                        </div>
                    ))}
                </div>
            </div>
        );

        months.push(monthView);
        start.setMonth(start.getMonth() + 1);
    }

    return (
        <div className='rounded-md shadow border-[1px] p-4 w-full'>
            <div className='overflow-x-auto md:overflow-visible scrollbar-hide'>
                <div className='flex gap-4 md:justify-between w-max md:w-full'>
                    {months}
                </div>
            </div>
            <style jsx>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default SubmissionGraph;