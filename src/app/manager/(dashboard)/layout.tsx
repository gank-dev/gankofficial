import type { Metadata } from "next";
import { Header } from "@/components/manager/header";
import { MobileNav } from "@/components/manager/mobile-nav";
import { Sidebar } from "@/components/manager/sidebar";
import { getManagerProfile } from "@/lib/manager/auth";

export const metadata: Metadata = {
  title: {
    default: "Manager",
    template: "%s | GANK OFFICIAL Manager",
  },
  description: "Internal management system for GANK SERVICE.",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getManagerProfile();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex min-h-screen">
        <Sidebar role={profile.role} />

        <div className="flex min-w-0 flex-1 flex-col">
          <Header
            fullName={profile.full_name}
            role={profile.role}
          />

          <main className="flex-1 p-6 pb-24 lg:p-8 lg:pb-8">
            {children}
          </main>
        </div>
      </div>

      <MobileNav role={profile.role} />
    </div>
  );
}