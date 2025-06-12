import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '../ui/menubar'
import { LogOut } from 'lucide-react'
import Link from 'next/link'

const AvatarMenu = ({ image, name }: { image: string | undefined | null, name: string }) => {
    return (
        <Menubar className='border-0 bg-transparent shadow-none'>
            <MenubarMenu>
                <MenubarTrigger className='border-0 flex items-center justify-center bg-transparent'>
                    <Avatar>
                        <AvatarImage src={image || `https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff`} alt={`${name}'s DP`} className=" rounded-full" />
                        <AvatarFallback>{name}</AvatarFallback>
                    </Avatar>
                </MenubarTrigger>
                <MenubarContent align='center' className='min-w-[8px]'>
                    <MenubarItem>
                        <Link href={'/profile'}>Profile</Link>
                    </MenubarItem>
                    <MenubarItem variant='destructive'>Logout<LogOut size={18}  className="cursor-pointer" /></MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}

export default AvatarMenu