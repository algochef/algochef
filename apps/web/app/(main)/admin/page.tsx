import Container from "@/components/layout/container";
import ProblemsPage from "@/components/pages/admin-panel/problems-page";

export default function Page() {
  return (
    <Container>
      <div className="flex px-3 space-x-3 my-2 min-h-screen">
        <ProblemsPage />
      </div>
    </Container>
  );
}
