import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, Zap } from 'lucide-react'
import React from 'react'
import Stats from './stats'

const HeroSection = () => {
    return (
        <section className='flex flex-col items-center font-sans bg-gradient-to-t from-blue-500/5 dark:from-blue-500/10 dark:to-gray-950 pb-10'>
            <div className='w-8/12 flex flex-col items-center'>
                <div className='mt-16 mb-4'>
                    <p className='flex flex-wrap text-xs items-center border-[1px] border-gray-500/20 dark:border-gray-200/25 w-fit px-3 text-center rounded-lg py-0.5 font-semibold text-wrap'>
                        <span className='flex space-x-1'>
                            <Zap size={15} />
                            Trusted by 100+ developers
                        </span>
                    </p>
                </div>
                <div className='flex flex-col text-center text-xl sm:text-3xl md:text-5xl lg:text-7xl font-bold sm:leading-8 md:leading-12 lg:leading-16 tracking-tighter px-2 my-4'>
                    <h2>Master Coding</h2>
                    <h2 className='bg-gradient-to-r from-blue-400 via-blue-700 to-purple-600 bg-clip-text text-transparent px-2'>Like a Chef</h2>
                </div>
                <div className='my-4'>
                    <h3 className='text-center text-wrap lg:text-xl leading-7 text-gray-600/80 dark:text-gray-400'>
                        Your complete platform for competitive programming, technical interviews, and algorithmic mastery. Cook up solutions with curated problems, real-time contests, and powerful tools.
                    </h3>
                </div>
                <div className='flex space-x-0 space-y-4 md:space-y-0 md:space-x-4 md:flex-row flex-col items-center justify-center'>
                    <Button size={'lg'} className='bg-gradient-to-r from-blue-400 to-purple-600 text-white text-xs sm:text-sm md:text-base'>Start Cooking <ArrowRight size={20} />
                    </Button>
                    <Button size={'lg'} variant={'outline'} className=' text-xs sm:text-sm md:text-base'><Calendar size={20} /> View Contests</Button>
                </div>
                <Stats />
            </div>
        </section>
    )
}

export default HeroSection