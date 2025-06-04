import ContestPage from "@/components/pages/contests/contests-page";
import { getServerSession } from "next-auth";


export default async function Page() {
  const session = await getServerSession();
  
  return <ContestPage/>;
}
