"use client";

import Link from "next/link";
import { Logo } from "../assets/logo";
import { Separator } from "@repo/ui/components/ui/separator";
import { useResponsiveSize } from "@/hooks/use-responsive-size";

export const Footer = () => {
  const { device } = useResponsiveSize();

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <Separator className="w-full" />
        <footer className="mt-4 flex h-16 w-full items-start justify-between gap-48 px-8">
          <div className="-mt-2 flex items-center gap-3">
            <Link href="/home" className="hidden xl:flex" prefetch={false}>
              <Logo className="" />
            </Link>
            <span className="mt-2 text-xs">
              © 2023 Tracecork. All rights reserved.
            </span>
          </div>
          <div className="flex items-start gap-8">
            <Link href="/explore" className="text-sm">
              Explore
            </Link>
            <Link href="/pricing" className="text-sm">
              Pricing
            </Link>
            <Link href="/contact" className="text-sm">
              Contact Us
            </Link>
            <Link href="/legal/terms-and-conditions" className="text-sm">
              Terms & Conditions
            </Link>
            <Link href="/legal/terms-and-conditions" className="text-sm">
              Privacy Policy
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
};
