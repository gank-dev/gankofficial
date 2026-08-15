"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  navigation,
  type ManagerRole,
} from "@/lib/manager/navigation";

export function Sidebar({
  role,
}: {
  role: ManagerRole;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const visibleNavigation = navigation.filter((item) =>
    item.roles.includes(role),
  );

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/manager/login");
    router.refresh();
  }

  return (
    <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-black lg:flex lg:flex-col">
      <div className="flex h-20 items-center border-b border-white/10 px-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">
            GANK SERVICE
          </p>

          <p className="mt-1 text-lg font-semibold tracking-tight">
            Manager
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {visibleNavigation.map((item) => {
          const Icon = item.icon;

          const active =
            item.href === "/manager"
              ? pathname === "/manager"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                active
                  ? "bg-white text-black"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/50 transition hover:bg-white/5 hover:text-white"
        >
          <LogOut size={18} strokeWidth={1.8} />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
}