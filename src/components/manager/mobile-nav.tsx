"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CreditCard,
  LayoutDashboard,
  Package,
  Settings,
  Smartphone,
  Users,
  Wrench,
} from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    href: "/manager",
    icon: LayoutDashboard,
  },
  {
    label: "Servis",
    href: "/manager/services",
    icon: Wrench,
  },
  {
    label: "Pelanggan",
    href: "/manager/customers",
    icon: Users,
  },
  {
    label: "Inventory",
    href: "/manager/inventory",
    icon: Package,
  },
  {
    label: "Pembayaran",
    href: "/manager/payments",
    icon: CreditCard,
  },
  {
    label: "Laporan",
    href: "/manager/reports",
    icon: BarChart3,
  },
  {
    label: "Teknisi",
    href: "/manager/technicians",
    icon: Smartphone,
  },
  {
    label: "Pengaturan",
    href: "/manager/settings",
    icon: Settings,
  },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-between overflow-x-auto">
        {navigation.map((item) => {
          const Icon = item.icon;

          const active =
            item.href === "/manager"
              ? pathname === "/manager"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-w-[72px] flex-col items-center gap-1 px-2 py-3 text-[10px] transition ${
                active
                  ? "text-white"
                  : "text-white/40 hover:text-white"
              }`}
            >
              <Icon size={19} strokeWidth={active ? 2.2 : 1.8} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}