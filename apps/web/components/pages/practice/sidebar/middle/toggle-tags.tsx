"use client";

import { Tag } from '@repo/types/problem'
import { IconChevronsDown, IconChevronsUp } from '@tabler/icons-react'
import React, { useState } from 'react'

const ToogleTags = ({ tags }: { tags: (Tag & { count: number })[] }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpandOrCollapse = () => {
        setExpanded(prev => !prev);
    }
    return (
        <div
            className="relative transition-all duration-500 ease-in-out overflow-hidden"
            style={{ maxHeight: expanded ? '1000px' : '40px' }}
        >
            <div className="flex flex-wrap my-4 space-y-3 space-x-2">
                {tags.map(tag => (
                    <div key={tag.slug} className="flex text-sm leading-5 space-x-1">
                        <p>{tag.name}</p>
                        <p className="h-fit rounded-xl bg-gray-200 px-1.5 text-gray-500">{tag.count}</p>
                    </div>
                ))}
            </div>

            {!expanded && (
                <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white/5 to-transparent pointer-events-none z-10" />
            )}

            <div className="absolute right-0 bottom-0 z-20">
                <div
                    className="bg-gray-50 px-2 py-0.5 text-sm rounded-xl text-gray-700 flex space-x-2 cursor-pointer"
                    onClick={toggleExpandOrCollapse}
                >
                    <span>{expanded ? 'Collapse' : 'Expand'}</span>
                    {expanded ? <IconChevronsUp /> : <IconChevronsDown />}
                </div>
            </div>
        </div>
    )
}

export default ToogleTags