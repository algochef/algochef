"use client";

import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarContext } from '@/store/sidebar-store'
import { IconLayoutSidebar } from '@tabler/icons-react'
import React, { useContext, useEffect, useState } from 'react'

export const ToggleSidebar = () => {
    const sidebarCtx = useContext(SidebarContext);
    return (
        <div>
            <IconLayoutSidebar size={18} onClick={sidebarCtx.toggleSidebar} />
        </div>
    )
}

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState({
        isOpen: false,
    })




    const toggleSidebar = () => {
        setIsSidebarOpen(prev => {
            console.log(prev);
            return {
                ...prev,
                isOpen: !prev.isOpen
            }
        })
    }


    const ctxVal = {
        isOpen: isSidebarOpen.isOpen,
        toggleSidebar: toggleSidebar
    }
    return <SidebarContext.Provider value={ctxVal}>
        {children}
    </SidebarContext.Provider>
}