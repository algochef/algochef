import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import Container from "@/components/layout/container"
import ProblemsPage from "@/components/pages/admin-panel/problems-page"
import AllSheets from "@/components/pages/all-sheets/all-sheets"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"

export default function Page() {
  return <Container title='Sheets'>
    <div className='flex px-3 space-x-3 my-2 min-h-screen'>
      <ProblemsPage />
    </div>
  </Container>

}
