import ProblemsPage from '@/components/pages/admin-panel/problems-page'
import { SiteHeader } from '@/components/site-header'
import React from 'react'


const Problems = () => {
    return <>
        <SiteHeader title='Problems' />
        <ProblemsPage />
    </>
}
export default Problems