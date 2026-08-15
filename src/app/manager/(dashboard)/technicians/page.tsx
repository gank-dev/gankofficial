import { requireManagerRole } from "@/lib/manager/auth";

export default async function TechniciansPage() {
  await requireManagerRole(["OWNER"]);

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm uppercase tracking-[0.25em] text-white/30">
          GANK SERVICE
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Teknisi
        </h1>

        <p className="mt-2 text-sm text-white/40">
          Kelola teknisi dan akses internal GANK SERVICE.
        </p>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <p className="text-sm text-white/50">
          Modul Teknisi sedang dalam pengembangan.
        </p>
      </section>
    </div>
  );
}