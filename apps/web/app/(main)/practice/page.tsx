import Container from '@/components/layout/container'
import PracticePage from '@/components/pages/practice/practice-page'
import React from 'react'

const Practice = async () => {
  return (<Container title='Contests'>
    <div className='flex px-3 space-x-3 my-2 min-h-screen'>
      <PracticePage />
    </div>
  </Container>)
}

export default Practice