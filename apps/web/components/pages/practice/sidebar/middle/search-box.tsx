import { Input } from '@/components/ui/input'
import { IconSearch } from '@tabler/icons-react'
import React from 'react'

const SearchBox = () => {
    return (
        <div className='my-4'>
            <div className='flex bg-gray-100/40 rounded-2xl px-2 py-1.5 items-center max-w-[300px]'>
                <div>
                    <IconSearch size={18} />
                </div>
                <input className='outline-0 px-2 text-sm' placeholder='Search problem' />
            </div>
        </div>
    )
}

export default SearchBox