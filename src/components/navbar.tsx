"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

import { AuthButton } from "./auth-button";

export const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Study Mode" },
    {
      href: "/cards",
      label: "All Cards",
    },
  ];

  return (
    <header className="flex items-center justify-between gap-4 p-4 md:px-8 md:py-5 lg:py-6">
      <Link href="/">
        <Image
          className="md:hidden"
          src="/logo-small.svg"
          alt=""
          width={40}
          height={40}
        />

        <Image
          className="hidden md:block"
          src="/logo-large.svg"
          alt=""
          width={156}
          height={40}
        />
      </Link>

      <div className="flex flex-wrap items-center justify-around gap-4">
        <AuthButton />

        <nav>
          <ul className="flex w-fit gap-1 rounded-full border bg-neutral-50 p-1 shadow-[1px_2px_0px_0px]">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    className={cn(
                      "block rounded-full border px-3 py-1.5 font-semibold transition-colors md:px-4 md:py-2",
                      isActive && "bg-yellow-500",
                      !isActive && "hover:border-border border-transparent",
                    )}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};
