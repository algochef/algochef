import { Sheet } from '@repo/types/problem'
import SheetCard from './sheet-card';


const AllSheets = async ({ sheets }: { sheets: Sheet[] }) => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 h-fit items-center w-full' >
            {sheets && sheets.length > 0 && sheets.map(sheet => {
                return <SheetCard sheet={sheet} />
            })}
        </div >
    )
}

export default AllSheets