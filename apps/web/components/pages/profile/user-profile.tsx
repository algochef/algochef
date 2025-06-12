import { IconBrandGithub, IconBrandInstagram, IconBrandLinkedin, IconBrandX, IconWorld } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const UserProfile = () => {
  return (
    <div className='shadow h-fit rounded-b-md'>
      <div className='relative  h-fit'>
        <div className='w-[400px] h-[150px] bg-gradient-to-r from-blue-500 to-violet-500 rounded-t-lg'>
          <div className='absolute -bottom-8 left-0 flex items-center justify-center w-full'>
            <Image src={'https://assets.leetcode.com/users/avatars/avatar_1644600734.png'} alt='DP' width={100} height={100} className='rounded-full border-2' />
          </div>
        </div>

      </div>
      <div className='flex flex-col items-center mt-12'>
        <div className='flex flex-col items-center'>
          <h1 className='text-xl tracking-tight font-bold'>Joy Biswas</h1>
          <h6 className='tracking-tighter font-medium text-gray-600'>@terminalwarlord</h6>
          <p className='tracking-tight text-gray-500 text-sm'>Premier University, Chittagong</p>
        </div>
        <div className='flex space-x-2 mt-4'>
          <Link href={'https://github.com/TerminalWarlord'} className='cursor-pointer'>
            <IconBrandGithub size={22} />
          </Link>
          <Link href={'https://www.linkedin.com/in/joybiswas389'} className='cursor-pointer'>
            <IconBrandLinkedin size={22} />
          </Link>
          <Link href={'https://x.com/JayBeeOP'} className='cursor-pointer'>
            <IconBrandX size={22} />
          </Link>
          <Link href={'https://instagram.com/joybiswas389'} className='cursor-pointer'>
            <IconBrandInstagram size={22} />
          </Link>
          <Link href={'https://joybiswas.com'} className='cursor-pointer'>
            <IconWorld size={22} />
          </Link>
        </div>
        <div className='flex flex-col my-4 w-full items-center'>
          <div className='w-10/12 h-[1px] bg-gray-300 my-2'></div>
          <div className='grid grid-cols-3 px-4 w-full'>
            <div className='flex flex-col items-center'>
              <h3 className='text-2xl font-bold font-(family-name:--font-inter)'>375</h3>
              <p className='uppercase font-medium text-xs'>Solved</p>
            </div>
            <div className='flex flex-col items-center'>
              <h3 className='text-2xl font-bold font-(family-name:--font-inter)'>23</h3>
              <p className='uppercase font-medium text-xs'>Rank</p>
            </div>
            <div className='flex flex-col items-center'>
              <h3 className='text-2xl font-bold font-(family-name:--font-inter)'>101</h3>
              <p className='uppercase font-medium text-xs'>Contests</p>
            </div>
          </div>
          <div className='w-10/12 h-[1px] bg-gray-300 my-2'></div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile