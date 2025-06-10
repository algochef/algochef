import LeftSidebar from '@/components/pages/practice/sidebar/left-sidebar'
import SheetDetails from '@/components/pages/sheet/sheet-details'
import SheetProblemList from '@/components/pages/sheet/sheet-problem-list'
import { getServerSession } from 'next-auth'
import React from 'react'
import {SignJWT} from "jose"

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || '');
const generateJwtToken = async (userId: number) => {

    const token = new SignJWT({id: userId})
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(secret)

    return token;

}

const SheetPage = async ({ params }: { params: { slug: string } }) => {
    const slug = (await params).slug;

    const session = await getServerSession();
    const userToken = session?.user ? await generateJwtToken(session.user.id) : undefined;
    console.log(slug, session)
    return (
        <div className='flex flex-col pt-16  items-center dark:bg-neutral-900/30'>
            <div className='w-11/12  flex justify-between space-x-2'>
                <LeftSidebar />
                <SheetDetails slug={slug} userToken={userToken}/>
            </div>
        </div>
    )
}

export default SheetPage