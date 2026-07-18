import NeedleIcon from './NeedleIcon';
import ThemeToggle from './ThemeToggle';

export default function Header({ online, gpsError }) {
  return (
    <header className="flex items-center justify-between px-5 pb-2 pt-6">
      <div className="flex items-center gap-1">
        <span className="text-2xl font-semibold tracking-tight text-hud-ink">NEEDLE</span>
        <NeedleIcon size={20} className="mx-0.5 text-hud-warn" />
        <span className="text-2xl font-semibold tracking-tight text-hud-ink">DROP</span>
      </div>
      <div className="flex items-center gap-2">
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
        <ThemeToggle />
      </div>
    </header>
  );
}
