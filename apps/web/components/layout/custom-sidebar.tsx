"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { SidebarContext } from "@/store/sidebar-store"
import { Icon360View, IconBrandUbuntu, IconChevronDown, IconChevronsDown, IconCross, IconDeviceIpadQuestion, IconFileSpreadsheet, IconHeartRateMonitor, IconVs, IconX } from "@tabler/icons-react"
import { AlertCircle, Cpu } from "lucide-react"
import Link from "next/link"
import { useContext, useState } from "react"
import { Button } from "../ui/button";


const MENU = [
    {
        title: "Problem",
        icon: <IconDeviceIpadQuestion size={18} />,
        submenu: [
            {
                title: "Browse",
                url: "/practice"
            }
        ]
    },
    {
        title: "Contests",
        icon: <IconVs size={18} />,
        submenu: [
            {
                title: "Upcoming",
                url: "/contests?type=upcoming"
            },
            {
                title: "Past",
                url: "/contests?type=past"
            }
        ]
    },
    {
        title: "Sheets",
        icon: <IconFileSpreadsheet size={18} />,
        submenu: [
            {
                title: "Browse",
                url: "/sheets"
            },
        ]
    },
    {
        title: "Operating System",
        icon: <IconBrandUbuntu size={18} />,
        submenu: [
            {
                title: "Browse",
                url: "/sheets"
            },
        ]
    },
    {
        title: "System Design",
        icon: <Cpu size={18} />,
        submenu: [
            {
                title: "Browse",
                url: "/sheets"
            },
        ]
    }
]

const CustomSidebar = () => {
    const sidebarCtx = useContext(SidebarContext);
    const [openItems, setOpenItems] = useState(MENU.map(m => m.title));

    return (
        <div className={`${sidebarCtx.isOpen ? "w-50 sm:70 fixed left-0 top-0 pt-12 md:static md:pt-0 md:w-74 md:pl-3" : "w-0 pl-0"} transition-all duration-300 ease-in-out overflow-hidden z-11`}>

            <Accordion
                type="multiple"
                className="h-screen md:h-fit w-full px-3 border-[1px] rounded-md py-2 bg-gray-50 dark:bg-neutral-900"
                value={openItems}
                onValueChange={setOpenItems}

            >
                <div className="flex w-full  md:hidden px-1 py-4">
                    <IconX onClick={sidebarCtx.toggleSidebar} />
                </div>


                {MENU.map(m => {
                    return <AccordionItem value={m.title} className="border-0" key={m.title}>
                        <AccordionTrigger className="border-0 flex space-x-0 hover:bg-gray-100 p-1.5 px-2 hover:no-underline items-center dark:hover:bg-neutral-800">
                            <div className="flex space-x-3 items-center">
                                {m.icon}
                                <span>{m.title}</span>
                            </div>
                            <IconChevronDown className="text-sm font-normal" size={18} />
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-1 text-balance border-l-[1px] ml-4 text-xs">
                            {m.submenu && m.submenu.length && m.submenu.map(sub => {
                                return <Link key={sub.url} href={sub.url} className="px-2 py-1 hover:bg-gray-100 rounded ml-2  dark:hover:bg-neutral-800">{sub.title}</Link>
                            })}

                        </AccordionContent>
                    </AccordionItem>
                })}

            </Accordion>
        </div>
    )
}

export default CustomSidebar