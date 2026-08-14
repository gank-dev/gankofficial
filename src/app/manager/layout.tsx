import type { Metadata } from "next";
import { Sidebar } from "@/components/manager/sidebar";
import { Header } from "@/components/manager/header";
import { MobileNav } from "@/components/manager/mobile-nav";

export const metadata: Metadata = {
  title: {
    default: "Manager",
    template: "%s | GANK OFFICIAL Manager",
  },
  description: "Internal management system for GANK SERVICE.",
};

export default function ManagerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen bg-black text-white">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Header />

          <main className="flex-1 p-6 pb-24 lg:p-8">
            {children}
          </main>
        </div>
      </div>

      <MobileNav />
    </section>
  );
}