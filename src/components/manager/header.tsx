export function Header() {
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
          O
        </div>

        <div className="hidden sm:block">
          <p className="text-sm font-medium">
            OWNER
          </p>

          <p className="text-xs text-white/40">
            GANK SERVICE
          </p>
        </div>
      </div>
    </header>
  );
}