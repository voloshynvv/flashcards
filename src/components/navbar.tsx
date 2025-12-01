"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { cn } from "@/utils/cn";

const navItems = [
  { href: "/", label: "Study Mode" },
  { href: "/cards", label: "All Cards" },
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between p-4 md:px-8 md:py-5 lg:py-6">
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

      <nav>
        <ul className="shadow-border-xs flex w-fit gap-1 rounded-full border bg-neutral-50 p-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  className={cn(
                    "block rounded-full border px-3 py-1.5 font-semibold md:px-4 md:py-2",
                    isActive && "bg-yellow-500",
                    !isActive && "border-transparent",
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
    </header>
  );
};
