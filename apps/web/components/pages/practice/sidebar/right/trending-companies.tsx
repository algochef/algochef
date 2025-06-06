import { Tag } from '@repo/types/problem';
import { CompaniesWithNavigation } from './companies-with-pagination';

const OJ_BACKEND = 'http://localhost:3001'
const fetchTags = async () => {
    try {
        const res = await fetch(OJ_BACKEND + '/api/v1/companies');
        if (!res.ok) {
            return [];
        }
        const resData = await res.json();
        console.log(resData);
        return resData.companyTags;
    }
    catch (err) {
        console.log(err);
        return [];
    }
}

type CustomTag = Tag & { count: number };

const TrendingCompanies = async () => {
    const tags: CustomTag[] = await fetchTags();
    console.log(tags);
    return (
        <div className='shadow-lg px-2 py-2 border-[0.5px] bg-gray-50 dark:bg-neutral-800/30 rounded-lg'>
            <CompaniesWithNavigation tags={tags} />
        </div>
    )
}




export default TrendingCompanies