import { requireManagerRole } from "@/lib/manager/auth";

export default async function SettingsPage() {
  await requireManagerRole(["OWNER"]);

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm uppercase tracking-[0.25em] text-white/30">
          GANK SERVICE
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Pengaturan
        </h1>

        <p className="mt-2 text-sm text-white/40">
          Pengaturan sistem dan operasional GANK SERVICE.
        </p>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <p className="text-sm text-white/50">
          Modul Pengaturan sedang dalam pengembangan.
        </p>
      </section>
    </div>
  );
}