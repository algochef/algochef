import { Star } from "lucide-react"
import FeatureCards from "./feature-cards"

const COMPANIES = [
    { id: 'google', name: 'Google' },
    { id: 'ms', name: 'Microsoft' },
    { id: 'amazon', name: 'Amazon' },
]

const Features = () => {
    return (
        <div className="flex flex-col items-center justify-center py-4">
            <p className="uppercase text-xs text-gray-500">Trusted by engineers at</p>
            <div className="grid grid-cols-3 gap-2 items-center justify-center pt-2 pb-4">
                {COMPANIES.map(company => {
                    return <div key={company.id} className="border-[1px] border-gray-400/30 rounded-xl">
                        <p className="text-center px-2 py-0.5">{company.name}</p>
                    </div>
                })}

            </div>
            <div className='mt-16 mb-4'>
                <p className='flex flex-wrap text-xs items-center border-[1px] border-gray-500/20 dark:border-gray-200/25 w-fit px-3 text-center rounded-lg py-0.5 font-semibold text-wrap'>
                    <span className='flex space-x-1'>
                        <Star size={15} />
                        <span>Features</span>
                    </span>
                </p>
            </div>
            <div className="w-7/12 flex flex-col items-center justify-center text-center flex-wrap text-wrap">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-8 md:leading-10 lg:leading-12 tracking-tighter">Everything You Need to Excel</h2>
                <p className="text-gray-500">From curated problem sets to real-time contest tracking, we've got all the ingredients for your coding success.</p>
            </div>

            <FeatureCards/>

        </div>
    )
}

export default Features