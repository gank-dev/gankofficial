import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import {
  Activity,
  CheckCircle2,
  Clock3,
  Smartphone,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard",
};

const statusLabels: Record<string, string> = {
  RECEIVED: "Diterima",
  CHECKLIST_1: "Checklist Awal",
  CHECKING: "Pengecekan",
  WAITING_APPROVAL: "Menunggu Persetujuan",
  REPAIRING: "Dikerjakan",
  CHECKLIST_AFTER_SERVICE: "Checklist Akhir",
  TESTING: "Testing",
  READY: "Siap Diambil",
  COMPLETED: "Selesai",
  CANCELLED: "Dibatalkan",
};

function formatStatus(status: string) {
  return statusLabels[status] ?? status;
}

function formatCurrency(value: number | null) {
  if (value === null) return "-";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  }).format(new Date(value));
}

function statusClass(status: string) {
  switch (status) {
    case "COMPLETED":
      return "bg-white text-black";

    case "READY":
      return "border border-white/30 bg-white/10 text-white";

    case "REPAIRING":
    case "CHECKING":
    case "TESTING":
      return "border border-white/20 bg-white/5 text-white";

    case "WAITING_APPROVAL":
      return "border border-white/20 bg-white/5 text-white/70";

    case "CANCELLED":
      return "border border-red-500/30 bg-red-500/10 text-red-300";

    default:
      return "border border-white/10 bg-white/5 text-white/60";
  }
}

function getJakartaDayBounds() {
  const now = new Date();

  const jakartaDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);

  const startOfDay = new Date(`${jakartaDate}T00:00:00+07:00`);
  const startOfNextDay = new Date(
    `${jakartaDate}T00:00:00+07:00`,
  );

  startOfNextDay.setUTCDate(startOfNextDay.getUTCDate() + 1);

  return {
    startOfDayIso: startOfDay.toISOString(),
    startOfNextDayIso: startOfNextDay.toISOString(),
  };
}

export default async function ManagerDashboard() {
  const supabase = await createClient();

  const { startOfDayIso, startOfNextDayIso } =
    getJakartaDayBounds();

  const [
    totalResult,
    todayResult,
    repairingResult,
    approvalResult,
    readyResult,
    completedResult,
    recentResult,
  ] = await Promise.all([
    supabase
      .from("service_orders")
      .select("id", { count: "exact", head: true }),

    supabase
      .from("service_orders")
      .select("id", { count: "exact", head: true })
      .gte("received_at", startOfDayIso)
      .lt("received_at", startOfNextDayIso),

    supabase
      .from("service_orders")
      .select("id", { count: "exact", head: true })
      .eq("status", "REPAIRING"),

    supabase
      .from("service_orders")
      .select("id", { count: "exact", head: true })
      .eq("status", "WAITING_APPROVAL"),

    supabase
      .from("service_orders")
      .select("id", { count: "exact", head: true })
      .eq("status", "READY"),

    supabase
      .from("service_orders")
      .select("id", { count: "exact", head: true })
      .eq("status", "COMPLETED"),

    supabase
      .from("service_orders")
      .select(`
        id,
        ticket_number,
        status,
        complaint,
        estimated_cost,
        final_cost,
        received_at,
        customers (
          name,
          phone
        ),
        devices (
          brand,
          model
        )
      `)
      .order("received_at", { ascending: false })
      .limit(8),
  ]);

  const errors = [
    totalResult.error,
    todayResult.error,
    repairingResult.error,
    approvalResult.error,
    readyResult.error,
    completedResult.error,
    recentResult.error,
  ].filter(Boolean);

  if (errors.length > 0) {
    console.error("Dashboard query error:", errors);

    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
        <h1 className="text-lg font-semibold">
          Dashboard gagal memuat data
        </h1>

        <p className="mt-2 text-sm text-white/50">
          Periksa koneksi Supabase dan struktur database.
        </p>
      </div>
    );
  }

  const stats = [
    {
      label: "Total Servis",
      value: totalResult.count ?? 0,
      icon: Smartphone,
    },
    {
      label: "Masuk Hari Ini",
      value: todayResult.count ?? 0,
      icon: Clock3,
    },
    {
      label: "Sedang Dikerjakan",
      value: repairingResult.count ?? 0,
      icon: Wrench,
    },
    {
      label: "Menunggu Persetujuan",
      value: approvalResult.count ?? 0,
      icon: Activity,
    },
    {
      label: "Siap Diambil",
      value: readyResult.count ?? 0,
      icon: CheckCircle2,
    },
    {
      label: "Selesai",
      value: completedResult.count ?? 0,
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm uppercase tracking-[0.25em] text-white/30">
          GANK SERVICE
        </p>

        <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-white/40">
              Ringkasan operasional servis HP.
            </p>
          </div>

          <div className="text-sm text-white/40">
            {new Intl.DateTimeFormat("id-ID", {
              dateStyle: "full",
              timeZone: "Asia/Jakarta",
            }).format(new Date())}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs text-white/40">
                  {stat.label}
                </p>

                <Icon
                  size={17}
                  strokeWidth={1.7}
                  className="text-white/30"
                />
              </div>

              <p className="mt-5 text-3xl font-semibold">
                {stat.value}
              </p>
            </div>
          );
        })}
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.02]">
        <div className="flex flex-col gap-2 border-b border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-medium">
              Servis Terbaru
            </h2>

            <p className="mt-1 text-xs text-white/40">
              8 transaksi servis terakhir.
            </p>
          </div>

          <a
            href="/manager/services"
            className="text-sm text-white/50 transition hover:text-white"
          >
            Lihat semua →
          </a>
        </div>

        {recentResult.data && recentResult.data.length > 0 ? (
          <div className="divide-y divide-white/10">
            {recentResult.data.map((service) => {
              const customer = Array.isArray(service.customers)
                ? service.customers[0]
                : service.customers;

              const device = Array.isArray(service.devices)
                ? service.devices[0]
                : service.devices;

              return (
                <div
                  key={service.id}
                  className="flex flex-col gap-4 px-5 py-5 lg:flex-row lg:items-center lg:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-sm font-medium">
                        {service.ticket_number}
                      </span>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] ${statusClass(
                          service.status,
                        )}`}
                      >
                        {formatStatus(service.status)}
                      </span>
                    </div>

                    <p className="mt-2 truncate text-sm text-white/80">
                      {customer?.name ?? "Pelanggan"}
                    </p>

                    <p className="mt-1 text-xs text-white/40">
                      {device
                        ? `${device.brand} ${device.model}`
                        : "Perangkat tidak tersedia"}
                    </p>

                    <p className="mt-2 line-clamp-1 text-xs text-white/30">
                      {service.complaint}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center justify-between gap-8 lg:justify-end">
                    <div className="text-left lg:text-right">
                      <p className="text-xs text-white/30">
                        Nilai
                      </p>

                      <p className="mt-1 text-sm">
                        {formatCurrency(
                          service.final_cost ??
                            service.estimated_cost,
                        )}
                      </p>
                    </div>

                    <div className="text-left lg:text-right">
                      <p className="text-xs text-white/30">
                        Masuk
                      </p>

                      <p className="mt-1 text-xs text-white/50">
                        {formatDate(service.received_at)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="px-5 py-16 text-center">
            <Smartphone
              size={28}
              className="mx-auto text-white/20"
            />

            <p className="mt-4 text-sm text-white/50">
              Belum ada transaksi servis.
            </p>

            <p className="mt-1 text-xs text-white/30">
              Data servis yang masuk akan muncul di sini.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}