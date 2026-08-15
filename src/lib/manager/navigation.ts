import {
  BarChart3,
  CreditCard,
  LayoutDashboard,
  Package,
  Settings,
  Smartphone,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type ManagerRole =
  | "OWNER"
  | "ADMIN"
  | "TECHNICIAN";

export type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  roles: ManagerRole[];
};

export const navigation: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/manager",
    icon: LayoutDashboard,
    roles: ["OWNER", "ADMIN", "TECHNICIAN"],
  },
  {
    label: "Servis",
    href: "/manager/services",
    icon: Wrench,
    roles: ["OWNER", "ADMIN", "TECHNICIAN"],
  },
  {
    label: "Pelanggan",
    href: "/manager/customers",
    icon: Users,
    roles: ["OWNER", "ADMIN", "TECHNICIAN"],
  },
  {
    label: "Inventory",
    href: "/manager/inventory",
    icon: Package,
    roles: ["OWNER", "ADMIN", "TECHNICIAN"],
  },
  {
    label: "Pembayaran",
    href: "/manager/payments",
    icon: CreditCard,
    roles: ["OWNER", "ADMIN"],
  },
  {
    label: "Laporan",
    href: "/manager/reports",
    icon: BarChart3,
    roles: ["OWNER", "ADMIN"],
  },
  {
    label: "Teknisi",
    href: "/manager/technicians",
    icon: Smartphone,
    roles: ["OWNER"],
  },
  {
    label: "Pengaturan",
    href: "/manager/settings",
    icon: Settings,
    roles: ["OWNER"],
  },
];