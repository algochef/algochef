import LeftSidebar from '@/components/pages/practice/sidebar/left-sidebar'
import SheetDetails from '@/components/pages/sheet/sheet-details'
import SheetProblemList from '@/components/pages/sheet/sheet-problem-list'
import { getServerSession } from 'next-auth'
import React from 'react'
import { SignJWT } from "jose"
import { SiteHeader } from '@/components/site-header'
import Container from '@/components/layout/container'
import { fetchAllSheets } from '@/lib/problems-helpers/fetch-all-sheets'
import AllSheets from '@/components/pages/all-sheets/all-sheets'



const AllSheetsPage = async () => {
    const sheets = await fetchAllSheets({});
    return (<Container title='Sheets'>
        <div className='flex px-3 space-x-3 my-2 min-h-screen'>
            <AllSheets sheets={sheets} />
        </div>
    </Container>
    )
}

export default AllSheetsPage;