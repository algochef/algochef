import UserProfile from "@/components/pages/profile/user-profile";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { fetchUserInfo } from "@/lib/profile/fetch-user-info";
import { Metadata } from "next";




const getUserInfo = async (username: string) => {
  return await fetchUserInfo(username);
}

export async function generateMetadata(): Promise<Metadata> {
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) {
    return {};
  }
  const userInfo = await getUserInfo(session.user.username);

  return {
    title: `${userInfo?.name} | AlgoChef`,
    description: `${userInfo?.name} | AlgoChef`,
  };
}


const Profile = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) {
    redirect("/auth/login");
  }
  const userInfo = await getUserInfo(session.user.username);
  if (!userInfo) {
    redirect('/');
  }
  return <UserProfile userInfo={userInfo} />;
};

export default Profile;
