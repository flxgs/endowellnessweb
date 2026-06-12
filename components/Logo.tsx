export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="endo-grad" x1="32" y1="2" x2="32" y2="62" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5DA9E2" />
          <stop offset="1" stopColor="#11437D" />
        </linearGradient>
      </defs>
      <path
        d="M32 3.5 L55.5 17 a4 4 0 0 1 2 3.46 v23.08 a4 4 0 0 1 -2 3.46 L32 60.5 8.5 47 a4 4 0 0 1 -2 -3.46 V20.46 a4 4 0 0 1 2 -3.46 Z"
        stroke="url(#endo-grad)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M14 35h8l3-12 5 19 5-13 2.5 6H50"
        stroke="url(#endo-grad)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LogoLockup({
  className,
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark className="h-9 w-9 shrink-0" />
      <span className="leading-none">
        <span
          className={`block text-[1.05rem] font-extrabold tracking-[0.18em] ${
            dark ? "text-white" : "text-brand"
          }`}
        >
          ENDO
        </span>
        <span
          className={`block text-[0.6rem] font-semibold tracking-[0.32em] ${
            dark ? "text-white/70" : "text-brand/70"
          }`}
        >
          WELLNESS&nbsp;CLUB
        </span>
      </span>
    </span>
  );
}
