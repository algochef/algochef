"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import Image from "next/image";

export function LoginForm({
  className,
  isLogin = true,
  ...props
}: { isLogin?: boolean } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Github or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex flex-col gap-4">
              <Button variant="outline" className="w-full" onClick={() => signIn('github')}>
                <Image src={'/icons/mono/github.svg'} alt="github icon" width={20} height={20} />
                Login with Github
              </Button>
              <Button variant="outline" className="w-full" onClick={() => signIn('google')}>
                <Image src={'/icons/mono/google.svg'} alt="google icon" width={20} height={20} />
                Login with Google
              </Button>
            </div>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t my-4">
              <span className="bg-card text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>
          </div>
          <form className="my-2">
            <div className="grid gap-6">

              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                {!isLogin && <>

                  <div className="grid gap-3">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="terminalwarlord"
                      required
                    />
                  </div>
                </>}
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                {!isLogin && <>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="confirm_password">Confirm Password</Label>
                    </div>
                    <Input id="confirm_password" type="password" required />
                  </div>
                </>}

                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                {isLogin ? <>
                  Don&apos;t have an account?{" "}
                  <a href="/auth/signup" className="underline underline-offset-4">
                    Sign up
                  </a>
                </> : <>
                  Already have an account?{" "}
                  <a href="/auth/login" className="underline underline-offset-4">
                    Sign in
                  </a>
                </>}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
