import { fetchTags } from '@/lib/problems-helpers/fetch-tags'
import { Tag } from '@repo/types/problem';
import React from 'react'



const TagCloud = async () => {
    const tags: (Tag & { count: number })[] = await fetchTags();
    return (
        <div className='flex space-x-2 flex-wrap space-y-3 my-4 h-5 overflow-clip relative items-center'>
            {tags.map(tag => {
                return <div key={tag.slug} className='flex font-(family-name:--font-inter) text-sm leading-5 space-x-1'>
                    <p>{tag.name}</p>
                    <p className='h-fit rounded-xl bg-gray-200 px-1.5 text-gray-500'>{tag.count}</p>
                </div>
            })}
            <div className='absolute right-0'>
                <p className='bg-gray-50 p-1 rounded-md shadow-2xl text-gray-700'>Expand v</p>
            </div>
        </div>
    )
}

export default TagCloud