"use client";
import { Label, Button, Input } from "@acme/acme-ds";
import styles from "./sign-in.module.css";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <main className="w-full lg:grid lg:grid-cols-12 min-h-screen">
      <div className="bg-muted col-span-5">
        <div className="flex min-h-screen h-full items-center justify-center py-12">
          <div className="mx-auto grid gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Sign in</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>

            <form
              autoComplete="off"
              onSubmit={handleSubmit}
              className="grid gap-4"
            >
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  autoComplete="off"
                  className="bg-white"
                  autoFocus
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  autoComplete="off"
                  id="password"
                  className="bg-white"
                  type="password"
                  required
                />
              </div>

              <div className="grid gap-6">
                <Button type="submit" className="w-full">
                  Login
                </Button>

                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="#" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "inset-0 bg-zinc-900 col-span-7 overflow-hidden",
          styles.bg
        )}
      ></div>
    </main>
  );
}
