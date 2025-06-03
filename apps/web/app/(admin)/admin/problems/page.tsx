import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { Edit, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import googleIcon from "@/public/icons/companies/google.svg";
import amazonIcon from "@/public/icons/companies/amazon.svg";
import { getPlatformAvatar } from '@/lib/contest-helpers/platforms'
import { Platform } from '@repo/types/contest'
import DifficultyLabel from '@/lib/problems-helpers/generateDifficultyLabel'
import { DifficultyCategory } from '@repo/types/problem'

const PROBLEMS = [
    {
        url: "https://www.codechef.com/START188C/problems/YETMON",
        difficultyNumeric: 1375,
        title: "Yet Another Monster Problem",
        problemCode: "CCYETMON",
        platform: "CODECHEF",
        slug: "yet-another-monsters-problem",
        tags: [
            { name: "Greedy", slug: "greedy" },
            { name: "DFS", slug: "dfs" },
        ],
        companyTags: [{ name: "Google", slug: "google" }],
    },
    {
        url: "https://leetcode.com/problems/sorting-squares/",
        difficultyCategory: DifficultyCategory.HARD,
        title: "Sorting Squares",
        problemCode: "LCSORTSQR",
        platform: "LEETCODE",
        slug: "sorting-squares",
        tags: [
            { name: "Two Pointers", slug: "two-pointers" },
            { name: "Sorting", slug: "sorting" },
        ],
        companyTags: [{ name: "Amazon", slug: "amazon" }],
    },
    {
        url: "https://www.codeforces.com/problemset/problem/1234/B2",
        difficultyNumeric: 1600,
        title: "Social Network (easy version)",
        problemCode: "CF1234B2",
        platform: "CODEFORCES",
        slug: "social-network-easy",
        tags: [
            { name: "Implementation", slug: "implementation" },
            { name: "Data Structures", slug: "data-structures" },
        ],
        companyTags: [],
    },
    {
        url: "https://atcoder.jp/contests/abc300/tasks/abc300_c",
        difficultyNumeric: 1450,
        title: "Crisscross Grid",
        problemCode: "ABC300C",
        platform: "ATCODER",
        slug: "crisscross-grid",
        tags: [
            { name: "Simulation", slug: "simulation" },
            { name: "Matrices", slug: "matrices" },
        ],
        companyTags: [{ name: "Rakuten", slug: "rakuten" }],
    },
]

const iconMap = {
    "google": googleIcon,
    "amazon": amazonIcon
}

const Problems = () => {
    return <>
        <SiteHeader title='Problems' />
        <div className="flex flex-1 flex-col my-2 p-4">
            <div className='flex flex-col-reverse md:flex-row justify-between'>
                <div>
                    <h2 className='text-xl md:text-2xl lg:text-3xl font-semibold'>Problems</h2>
                    <h4 className='text-sm lg:text-base'>Manage and organize coding problems for your platform.</h4>
                </div>
                <div>
                    <Button className='w-full'>Add A Problem</Button>
                </div>
            </div>
            {PROBLEMS.map(problem => {
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
                            {<>
                                {problem.companyTags.map(tag => {
                                    return <p key={tag.slug} className='text-sm tracking-tighter  bg-gradient-to-t from-gray-300/50 to-gray-100/50 rounded-md px-2 py-0.5 text-gray-600 w-fit shadow border-[1px] h-fit'>
                                        <span className='flex space-x-1'>
                                            {tag.slug === "google" && <Image src={googleIcon} width={15} height={15} alt='Google Icon' />}
                                            <p className='font-medium'>{tag.name}</p>
                                        </span>
                                    </p>
                                })}
                            </>}
                            {<div className='flex flex-wrap space-x-2 space-y-2'>
                                {problem.tags.map(tag => {
                                    return <p key={tag.slug} className='text-sm tracking-tighter border-[1px] bg-gradient-to-b from-blue-700/10 to-blue-50 border-blue-400/30 rounded-md px-2 w-fit h-fit shadow'>{tag.name}</p>
                                })}
                            </div>}
                        </div>

                    </div>
                    <div className='flex space-x-2 items-center'>
                        {/* TODO: Add difficulty category */}
                        <Link href={problem.url} className='flex space-x-1 items-center text-xs px-2 py-1 bg-gray-950 w-fit text-gray-50 rounded h-fit'>
                            <ExternalLink size={15} />
                        </Link>
                        <Edit size={15} />
                    </div>
                </div>
            })}
        </div>
    </>
}
export default Problems