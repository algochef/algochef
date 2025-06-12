import Container from "@/components/layout/container";
import ContestPage from "@/components/pages/contests/contests-page";
import { getServerSession } from "next-auth";


export default async function Page() {
  return (<Container title='Contests'>
    <div className='flex px-3 space-x-3 my-2 min-h-screen'>
      <ContestPage />
    </div>
  </Container>
  )
}
