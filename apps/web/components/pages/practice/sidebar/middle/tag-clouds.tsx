import { fetchTags } from '@/lib/problems-helpers/fetch-tags'
import { Tag } from '@repo/types/problem';
import React from 'react'
import ToogleTags from './toggle-tags';



const TagCloud = async () => {
    const tags: (Tag & { count: number })[] = await fetchTags();
    return (
        <div className='flex space-x-2 flex-wrap space-y-3 overflow-clip relative items-center'>
            <ToogleTags tags={tags} />
        </div>
    )
}

export default TagCloud