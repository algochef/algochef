"use client";

import { Code, LogOut, Sun, Trophy, User, Zap } from "lucide-react"
import { Button } from "../ui/button"
import { ModeToggle } from "../ui/theme-toggle"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileNav from "./mobile-nav";

const Header = () => {
  const { data: session, status } = useSession();
  const isMobile = useIsMobile();
  console.log(isMobile);
  if (isMobile) {
    return <MobileNav session={session} status={status}/>;
  }
  return (
    <div className="w-full mx-auto bg-gray-100/30 dark:bg-neutral-800/30 backdrop-blur-xs h-12 flex justify-between items-center py-4 px-16 border-b-[1px] z-1000">
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
            <LogOut size={18} onClick={() => signOut()} className="cursor-pointer" />
          </li>
          <li>
            <Avatar>
              <AvatarImage src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}&background=0D8ABC&color=fff`} alt={`${session.user.name}'s DP`} className="w-7 h-7 rounded-full" />
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