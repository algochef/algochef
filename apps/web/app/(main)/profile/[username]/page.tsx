import UserProfile from '@/components/pages/profile/user-profile'
import React from 'react'

const Profile = async ({params}: {params: {username: string}}) => {
  const username = (await params).username;
  return <UserProfile username={username}/>
}

export default Profile