import Container from '@/components/layout/container'
import { fetchAllSheets } from '@/lib/problems-helpers/fetch-all-sheets'
import AllSheets from '@/components/pages/all-sheets/all-sheets'



const AllSheetsPage = async () => {
    const sheets = await fetchAllSheets({});
    return (<AllSheets sheets={sheets} />)
}

export default AllSheetsPage;