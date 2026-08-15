import type { ManagerRole } from "@/lib/manager/navigation";

type HeaderProps = {
  fullName: string;
  role: ManagerRole;
};

const roleLabels: Record<ManagerRole, string> = {
  OWNER: "Owner",
  ADMIN: "Admin",
  TECHNICIAN: "Teknisi",
};

export function Header({
  fullName,
  role,
}: HeaderProps) {
  const roleLabel = roleLabels[role];

  const initial = fullName.trim().charAt(0).toUpperCase() || "?";

  return (
    <header className="flex h-20 items-center justify-between border-b border-white/10 px-6 lg:px-8">
      <div>
        <p className="text-sm text-white/40">
          Internal Management System
        </p>

        <p className="text-base font-medium lg:hidden">
          GANK SERVICE
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-black">
          {initial}
        </div>

        <div className="hidden sm:block">
          <p className="text-sm font-medium">
            {fullName}
          </p>

          <p className="text-xs text-white/40">
            {roleLabel} · GANK SERVICE
          </p>
        </div>
      </div>
    </header>
  );
}