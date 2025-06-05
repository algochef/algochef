
"use client";
import CustomLabel from '@/components/ui/custom-label';
import { Tag } from '@repo/types/problem';
import { IconCaretLeft, IconCaretLeftFilled, IconCaretRight, IconCaretRightFilled, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, { useState } from 'react'

export const CompaniesWithNavigation = ({ tags }: { tags: (Tag & { count: number })[] }) => {
    const totalPages = Math.ceil(tags.length / 20);
    const [page, setPage] = useState(1);

    console.log(page);
    const handlePagination = (updateType: string) => {
        if (updateType === "inc") {
            setPage(prev => {
                return Math.min(prev + 1, totalPages);
            })
        }
        else {
            setPage(prev => {
                return Math.max(prev - 1, 1);
            })
        }
    }

    const tagsToBeRendered = tags.filter((tag, idx) => {
        if (idx < page * 20 && idx >= (page - 1) * 20) {
            return true;
        }
        return false;
    })
    return <>
        <div className='flex space-x-2 items-center mt-2 mb-4 justify-between px-2'>
            <IconChevronLeft
                onClick={() => handlePagination('dec')}
                className={`border-2 rounded-md ${page === 1 && "text-gray-300"}`}
            />
            <h1 className='font-semibold text-sm'>Trending Companies</h1>
            <IconChevronRight
                onClick={() => handlePagination('inc')}

                className={`border-2 rounded-md ${page === totalPages && "text-gray-300"}`}
            />
        </div>
        <div className='flex space-x-2 flex-wrap space-y-1.5 px-2'>
            {tagsToBeRendered && tagsToBeRendered?.map(tag => {
                return <CustomLabel key={tag.slug} title={tag.name} count={tag.count} />
            })}
        </div>
    </>
}