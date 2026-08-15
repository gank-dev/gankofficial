"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  navigation,
  type ManagerRole,
} from "@/lib/manager/navigation";

export function MobileNav({
  role,
}: {
  role: ManagerRole;
}) {
  const pathname = usePathname();

  const visibleNavigation = navigation.filter((item) =>
    item.roles.includes(role),
  );

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/95 px-2 py-2 backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-around gap-1">
        {visibleNavigation.slice(0, 5).map((item) => {
          const Icon = item.icon;

          const active =
            item.href === "/manager"
              ? pathname === "/manager"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] transition ${
                active
                  ? "bg-white text-black"
                  : "text-white/40 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon
                size={18}
                strokeWidth={1.8}
              />

              <span className="truncate">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}