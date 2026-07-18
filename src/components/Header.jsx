export default function Header({ online, gpsError }) {
  return (
    <header className="flex items-center justify-between px-5 pb-2 pt-6">
      <div className="flex items-center gap-1">
        <span className="text-2xl font-semibold tracking-tight text-white">NEEDLE</span>
        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" className="mx-0.5">
          <path d="M8 0L15.5 17H0.5L8 0Z" fill="#f2643f" />
        </svg>
        <span className="text-2xl font-semibold tracking-tight text-white">DROP</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span
          className={`h-2 w-2 rounded-full ${
            gpsError ? 'bg-hud-warn' : 'bg-hud-cyan'
          } animate-blink`}
        />
        <span className="text-xs font-medium text-hud-muted">
          {gpsError ? 'Degraded' : online ? 'Online' : 'Offline'}
        </span>
      </div>
    </header>
  );
}
