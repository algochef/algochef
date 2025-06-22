import { CircularProgress } from '@/components/ui/circular-progress'
import React from 'react'

const UserProgressBar = () => {
  return (
    <div className='w-full md:w-10/11 lg:w-6/11 h-full'>
      <CircularProgress />
    </div>
  )
}

export default UserProgressBar