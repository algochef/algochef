"use client";

import { createContext } from "react";

type SidebarContextType = {
    isOpen: boolean,
    toggleSidebar: () => void
}

export const SidebarContext = createContext<SidebarContextType>({
    isOpen: false,
    toggleSidebar: () => { }
})