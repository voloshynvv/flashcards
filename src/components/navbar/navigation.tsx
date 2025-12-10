"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/utils/cn";

const navItems = [
  { href: "/", label: "Study Mode" },
  {
    href: "/cards",
    label: "All Cards",
  },
];

export const Navigation = () => {
  const pathname = usePathname();

  return (
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
  );
};
