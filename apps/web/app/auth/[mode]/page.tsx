import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function authPage({ params }: { params: { mode: string } }) {
    const session = await getServerSession(authOptions);

    if (session) {
        // user is already logged in, redirect to homepage
        redirect("/"); 
    }
    const isLogin = (await params).mode === 'login';
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center font-medium">
                    <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    algochef.
                </a>
                <LoginForm isLogin={isLogin} />
            </div>
        </div>
    )
}
