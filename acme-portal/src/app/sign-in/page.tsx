import { Label, Button, Input } from "@acme/acme-ds";
import styles from "./sign-in.module.css";
import Link from "next/link";
import { cn } from "~/lib/utils";

export default function SignInPage() {
  return (
    <main className="w-full lg:grid lg:grid-cols-12 lg:min-h-screen">
      <div className="bg-muted col-span-5">
        <div className="flex h-full items-center justify-center py-12">
          <div className="mx-auto grid gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Sign in</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
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
                  id="password"
                  className="bg-white"
                  type="password"
                  required
                />
              </div>

              <div className="grid gap-6">
                <Button asChild className="w-full">
                  <Link href="/product-catalog">Login</Link>
                </Button>

                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
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
          styles.bg,
        )}
      ></div>
    </main>
  );
}
