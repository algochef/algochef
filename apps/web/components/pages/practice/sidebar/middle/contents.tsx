import { Button } from '@/components/ui/button';
import { getPlatformAvatar } from '@/lib/contest-helpers/platforms';
import { fetchProblems } from '@/lib/problems-helpers/fetch-problems';
import DifficultyLabel from '@/lib/problems-helpers/generate-difficulty-label';
import { Problem } from '@repo/types/problem';
import { IconCheck } from '@tabler/icons-react';
import React from 'react'
import SearchBox from './search-box';
import TagCloud from './tag-clouds';

const Contents = async () => {
    const problems: Problem[] = await fetchProblems();
    console.log(problems);
    return (
        <div className='flex-[3] px-4'>
            <TagCloud/>
            <div className='w-full h-[1.5px] bg-gray-300/60 my-4 dark:bg-gray-800'></div>
            <SearchBox/>
            <div className='flex flex-col justify-center'>
                {problems && problems.map(problem => {
                    return <div className='flex justify-between px-8 odd:bg-gray-100/40 py-2 items-center rounded-md bg-white dark:bg-neutral-900/30 dark:odd:bg-neutral-800/50'>
                        <div className='flex space-x-2'>
                            <div className='flex'>
                                {getPlatformAvatar(problem.platform)}
                            </div>
                            <div>
                                <IconCheck className='text-green-600' size={20} />
                            </div>
                            <div className='flex flex-col'>
                                <div className='flex items-center space-x-2'>
                                    <h2 className='text-sm font-medium leading-5'>{problem.title}</h2>
                                    <DifficultyLabel difficulty={problem.difficultyCategory || problem.difficultyNumeric} />
                                </div>
                                {<div className='flex flex-wrap space-x-2 my-2 space-y-2'>
                                    {problem.companyTags && problem.companyTags.map(tag => {
                                        return <h2 key={tag.slug} className='text-sm tracking-tighter  bg-gradient-to-t from-gray-300/50 to-gray-100/50 rounded-md px-2 py-0.5 text-gray-600 w-fit shadow border-[1px] h-fit dark:from-gray-700/50 dark:border-gray-200/10 dark:to-gray-900 dark:text-gray-50'>
                                            <span className='flex space-x-1'>
                                                {/* TODO: ADD Company ICON */}
                                                <p className='font-medium'>{tag.name}</p>
                                            </span>
                                        </h2>
                                    })}
                                </div>}
                                {/* {<div className='flex flex-wrap space-x-2 space-y-2'>
                                    {problem.tags && problem.tags.map(tag => {
                                        return <p key={tag.slug} className='text-sm tracking-tighter border-[1px] bg-gradient-to-b from-blue-700/10 to-blue-50 border-blue-400/30 rounded-md px-2 w-fit h-fit shadow'>{tag.name}</p>
                                    })}
                                </div>} */}
                            </div>
                        </div>

                    </div>
                })}


            </div>
        </div>
    )
}

export default Contents