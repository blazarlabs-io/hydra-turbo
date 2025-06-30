"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@repo/ui/components/ui/sheet";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import { Logo } from "../assets/logo";
import { useAuth } from "@/context/auth";
import { Separator } from "@repo/ui/components/ui/separator";
import { LocaleSwitcher } from "@/components/widgets/locale-switcher/locale-switcher";
import { useTheme } from "next-themes";
import Image from "next/image";

export const NavigationBar = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  return (
    <header className="flex items-center w-full h-20 px-4 shrink-0 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="xl:hidden">
            <MenuIcon className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetTitle></SheetTitle>
          <Link href="/home" className="hidden mr-6 xl:flex" prefetch={false}>
            <Logo className="" />
          </Link>
        </SheetContent>
      </Sheet>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-6">
          <Link href="/home" className="hidden mr-6 xl:flex" prefetch={false}>
            <Logo className="" />
          </Link>
          <nav className="hidden gap-6 xl:flex"></nav>
        </div>
        <div className="flex items-center gap-4">
          {/* <LocaleSwitcher /> */}
          {user && user.emailVerified ? (
            // <Button variant="outline" size="sm">
            //   <Link href="/dashboard/home">Back to Dashboard</Link>
            // </Button>
            <></>
          ) : (
            <div className="flex gap-4">
              <Button variant="outline">
                <Link href="/login">Login</Link>
              </Button>
              <Button>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
