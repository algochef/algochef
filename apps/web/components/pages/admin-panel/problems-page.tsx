import { Button } from '@/components/ui/button'
import { Edit, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getPlatformAvatar } from '@/lib/contest-helpers/platforms'
import { Platform } from '@repo/types/contest'
import DifficultyLabel from '@/lib/problems-helpers/generate-difficulty-label'
import { DifficultyCategory, Problem } from '@repo/types/problem'
import { AddProblemModal } from './add-problem-modal'
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'


const OJ_BACKEND = "http://localhost:3001"
const getProblems = async ()=>{
    try{
        const res = await fetch(OJ_BACKEND+"/api/v1/problems");
        if(!res.ok){
            return [];
        }
        const resData = await res.json();

        return resData.results;
    }
    catch(err){
        console.log(err);
        return []
    }
}

const ProblemsPage = async () => {
    const problems: Problem[] = await getProblems();
    console.log(problems);
    return (
        <div className="flex flex-1 flex-col my-2 p-4">
            <div className='flex flex-col-reverse md:flex-row justify-between'>
                <div>
                    <h2 className='text-xl md:text-2xl lg:text-3xl font-semibold'>Problems</h2>
                    <h4 className='text-sm lg:text-base'>Manage and organize coding problems for your platform.</h4>
                </div>
                <div>
                    <AddProblemModal />
                </div>
            </div>
            {problems.map(problem => {
                return <div key={problem.slug} className='flex w-full space-x-3 rounded-md border-2 border-gray-500/10 justify-between my-2 p-4 '>

                    <div className='flex space-x-2 items-center'>
                        <div className='w-fit flex-wrap'>{getPlatformAvatar(problem.platform as Platform)}</div>
                        <div className='flex flex-col space-y-1'>
                            <span>
                                <span className='flex space-x-1'>
                                    <h2 className='text-sm font-semibold'>{problem.title}</h2>
                                    <DifficultyLabel difficulty={problem.difficultyNumeric || problem.difficultyCategory} />
                                </span>
                                <span className='flex space-x-1'>
                                    <h4 className='text-xs tracking-tighter'>{problem.problemCode}</h4>
                                </span>


                            </span>
                            {<div className='flex  flex-wrap space-x-2 my-2 space-y-2'>
                                {problem.companyTags && problem.companyTags.map(tag => {
                                    return <h2 key={tag.slug} className='text-sm tracking-tighter  bg-gradient-to-t from-gray-300/50 to-gray-100/50 rounded-md px-2 py-0.5 text-gray-600 w-fit shadow border-[1px] h-fit'>
                                        <span className='flex space-x-1'>
                                            {/* TODO: ADD Company ICON */}
                                            <p className='font-medium'>{tag.name}</p>
                                        </span>
                                    </h2>
                                })}
                            </div>}
                            {<div className='flex flex-wrap space-x-2 space-y-2'>
                                {problem.tags && problem.tags.map(tag => {
                                    return <p key={tag.slug} className='text-sm tracking-tighter border-[1px] bg-gradient-to-b from-blue-700/10 to-blue-50 border-blue-400/30 rounded-md px-2 w-fit h-fit shadow'>{tag.name}</p>
                                })}
                            </div>}
                        </div>

                    </div>
                    <div className='flex space-x-2 items-center'>
                        <Link href={problem.url} className='flex space-x-1 items-center text-xs px-2 py-1 bg-gray-950 w-fit text-gray-50 rounded h-fit'>
                            <ExternalLink size={15} />
                        </Link>
                        <Edit size={15} />
                    </div>
                </div>

            })}
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious></PaginationPrevious>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext></PaginationNext>
                    </PaginationItem>
                </PaginationContent>

            </Pagination>
        </div>
    )
}

export default ProblemsPage