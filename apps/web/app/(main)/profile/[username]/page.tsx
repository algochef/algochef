import UserProfile from "@/components/pages/profile/user-profile";
import { fetchUserInfo } from "@/lib/profile/fetch-user-info";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

const getUserInfo = async (username: string) => {
  return await fetchUserInfo(username);
};

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const userInfo = await getUserInfo((await params).username);

  return {
    title: `${userInfo?.name} | AlgoChef`,
    // TODO: Add better description
    description: `${userInfo?.name} | AlgoChef`,
  };
}

const Profile = async ({ params }: { params: { username: string } }) => {
  const username = (await params).username;
  const userInfo = await getUserInfo(username);
  if (!userInfo) {
    redirect("/");
  }
  return <UserProfile userInfo={userInfo} />;
};

export default Profile;
