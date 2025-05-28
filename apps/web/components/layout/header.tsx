"use client";

import { Code, LogOut, Sun, Trophy, User, Zap } from "lucide-react"
import { Button } from "../ui/button"
import { ModeToggle } from "../ui/theme-toggle"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const Header = () => {
  const { data: session, status } = useSession();
  return (
    <div className="w-11/12 fixed top-0 left-0 right-0 z-50 mx-auto bg-gray-300/15 dark:bg-blue-300/5 backdrop-blur-xs h-16 flex justify-between items-center py-4 px-16 rounded-xl">
      <nav className="flex items-center space-x-8">
        <p className="font-semibold">algochef.</p>
        <Link href={'/practice'} className="flex items-center space-x-1 text-sm text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100">
          <Code size={16} />
          <span>Practice</span>
        </Link>
        <Link href={'/contests'} className="flex items-center space-x-1 text-sm text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100">
          <Trophy size={16} />
          <span>Contests</span>
        </Link>
        <Link href={'/ide'} className="flex items-center space-x-1 text-sm text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100">
          <Zap size={16} />
          <span>IDE</span>
        </Link>
      </nav>
      <ul className="flex items-center space-x-8">
        <li><ModeToggle /></li>
        {status === 'authenticated' && <>

          {/* <li className="flex items-center space-x-1 text-sm text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100">
            <User size={16} />
            <span>Profile</span>
          </li> */}
          <li>
            <LogOut size={18} onClick={()=>signOut()} className="cursor-pointer"/>
          </li>
          <li>
            <Avatar>
              <AvatarImage src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}&background=0D8ABC&color=fff`} alt={`${session.user.name}'s DP`} className="w-10 h-10 rounded-full"/>
              {/* <AvatarFallback>{session.user.name}</AvatarFallback> */}
            </Avatar>
          </li>
        </>}
        {status !== 'authenticated' && <>
          <li className="text-sm  text-gray-700 dark:text-gray-200 hover:text-gray-950 dark:hover:text-gray-100">
            <Link href={'/auth/login'}>Sign In</Link>
          </li>
          <li><Button><Link href="/auth/signup">Get Started</Link></Button></li>

        </>}
      </ul>
    </div>
  )
}

export default Header