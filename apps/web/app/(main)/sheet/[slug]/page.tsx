import LeftSidebar from '@/components/pages/practice/sidebar/left-sidebar'
import SheetDetails from '@/components/pages/sheet/sheet-details'
import SheetProblemList from '@/components/pages/sheet/sheet-problem-list'
import { getServerSession } from 'next-auth'
import React from 'react'
import { SignJWT } from "jose"
import { SiteHeader } from '@/components/site-header'
import Container from '@/components/layout/container'

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || '');
const generateJwtToken = async (userId: number) => {

    const token = new SignJWT({ id: userId })
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
    return (<Container title='Problems'>
            <div className='flex px-3 space-x-3 my-2 min-h-screen'>
                <SheetDetails slug={slug} userToken={userToken} />
            </div>
        </Container>
    )
}

export default SheetPage