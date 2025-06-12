import Container from '@/components/layout/container'
import AuthPage from '@/components/pages/auth-page/auth'
import React from 'react'

const Auth = async ({ params }: { params: { mode: string } }) => {
    const mode = (await params).mode;
    return (
        <div className='flex items-center justify-center my-2 w-full'>
            <AuthPage mode={mode} />
        </div>
    )
}

export default Auth