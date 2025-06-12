import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/(main)/api/auth/[...nextauth]/route";

export default async function AuthPage({ mode }: { mode: string }) {
    const session = await getServerSession(authOptions);

    if (session) {
        // user is already logged in, redirect to homepage
        redirect("/");
    }
    const isLogin = mode === 'login';
    return (
        <div className="flex min-h-svh flex-col items-center justify-center p-2 md:p-10">
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
