"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Session } from 'next-auth';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { AvatarFallback } from '../ui/avatar';
import { IconBinaryTree2 } from '@tabler/icons-react';
import { FileSpreadsheet, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { ModeToggle } from '../ui/theme-toggle';

const MobileNav = ({ session, status }: { session: Session | null, status: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Navigation Bar (visible only on small screens) */}
      <div className='lg:hidden w-full bg-gray-50 dark:bg-neutral-800 border-b-[1px] h-14 z-50 flex items-center px-4 justify-between fixed '>
        <h1 className=' font-bold text-xl'>algochef</h1>

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='flex flex-col space-y-1.5 focus:outline-none'
          aria-label='Toggle menu'
        >
          <div className={`w-6 h-[2px]  dark:bg-white bg-black transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-6 h-[2px]  dark:bg-white bg-black transition-all ${isOpen ? 'opacity-0' : 'opacity-100'}`}></div>
          <div className={`w-6 h-[2px]  dark:bg-white bg-black transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      <div className={`lg:hidden fixed top-14 left-0 w-full bg-gray-100 dark:bg-neutral-900 z-40 transition-all duration-300 ease-in-out ${isOpen ? 'h-[calc(100svh-4rem)]' : 'h-0 overflow-hidden'}`}>
        <div className='py-4'>
          <ul className='flex flex-col px-6 space-y-2'>
            <li>
              <Link href={'/problems'} className='flex space-x-2 py-2'>
                <IconBinaryTree2 />
                <h3 className='tracking-tight font-medium'>Problems</h3>
              </Link>
            </li>
            <li>
              <Link href={'/problems'} className='flex space-x-2 py-2'>
                <FileSpreadsheet />
                <h3 className='tracking-tight font-medium'>Sheets</h3>
              </Link>
            </li>

            {status === "authenticated" && session?.user && <>
              <li className='flex items-center space-x-4 py-2 justify-between'>
                <div className='flex items-center space-x-4 '>
                  <div>
                    <Avatar>
                      <AvatarImage src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}&background=0D8ABC&color=fff`} alt={`${session.user.name}'s DP`} className="w-12 h-12 rounded-full" />
                      <AvatarFallback>{session.user.name}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <h1 className='font-bold text-xl'>{session.user.name}</h1>
                    <h6 className='text-sm'>Profile</h6>
                  </div>
                </div>
                <LogOut size={18} onClick={() => signOut()} className="cursor-pointer" />
              </li>
            </>}
            <li><ModeToggle /></li>

          </ul>
        </div>

      </div>

      {/* Overlay when menu is open */}
      {isOpen && (
        <div
          className='lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 top-16'
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default MobileNav;