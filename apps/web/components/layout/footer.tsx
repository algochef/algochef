import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex items-center justify-between px-20 mb-6'>
      <p className='text-xs text-gray-500'>&copy; 2025 AlgoChef.dev. All rights reserved.</p>
      <div className='flex space-x-3'>
        <a href="https://github.com/algochef" className='text-sm dark:invert-75 dark:hover:invert-100'>
          <p className='flex space-x-1'>
            <Image src='/icons/github.svg' height={18} width={18} alt='github icon'/>
          </p>
        </a>
        <a href="https://discord.gg/BQCVgah4HN" className='text-sm dark:invert-75 dark:hover:invert-100'>
          <p className='flex space-x-1'>
            <Image src='/icons/discord.svg' height={18} width={18} alt='discord icon'/>
          </p>
        </a>
        <a href="https://x.com/AlgoChefDev" className='text-sm dark:invert-75 dark:hover:invert-100'>
          <p className='flex space-x-1'>
            <Image src='/icons/x.svg' height={18} width={18} alt='x icon'/>
          </p>
        </a>
        <a href="https://www.instagram.com/algochef.dev/" className='text-sm dark:invert-75 dark:hover:invert-100'>
          <p className='flex space-x-1'>
            <Image src='/icons/instagram.svg' height={18} width={18} alt='Instagram icon'/>
          </p>
        </a>
        <a href="https://www.linkedin.com/company/algochefdev" className='text-sm dark:invert-75 dark:hover:invert-100'>
          <p className='flex space-x-1'>
            <Image src='/icons/linkedin.svg' height={18} width={18} alt='Linkedin icon'/>
          </p>
        </a>
      </div>
    </div>
  )
}

export default Footer