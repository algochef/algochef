import UserProfile from '@/components/pages/profile/user-profile'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React from 'react'

const Profile = async () => {
  const session = await getServerSession();
  if(!session || !session?.user){
    redirect('/auth/login');
  }
  return <UserProfile username={session.user.username}/>
}

export default Profile