import { Metadata } from "next";

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
            {children}
        </section>
    );
}