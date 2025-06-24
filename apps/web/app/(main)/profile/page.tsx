import UserProfile from '@/components/pages/profile/user-profile'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route';

const Profile = async () => {
  const session = await getServerSession(authOptions);
  if(!session || !session?.user){
    redirect('/auth/login');
  }
  return <UserProfile username={session.user.username}/>
}

export default Profile