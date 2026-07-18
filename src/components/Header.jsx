import { WifiOff } from 'lucide-react';

export default function Header({ online, gpsError }) {
  return (
    <header className="flex items-center justify-between border-b border-emerald-500/30 bg-hud-panel/80 px-4 py-3 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            gpsError ? 'bg-hud-amber animate-blink' : 'bg-hud-green animate-blink'
          } shadow-[0_0_8px_currentColor]`}
        />
        <span className="text-xs tracking-widest text-hud-green/90">
          [ SYSTEM STATUS: {gpsError ? 'DEGRADED' : 'ONLINE'} ]
        </span>
      </div>
      <div className="flex items-center gap-2 text-[10px] tracking-widest text-hud-green/60">
        {!online && <WifiOff size={13} className="text-hud-amber" />}
        <span>NEEDLEDROP</span>
      </div>
    </header>
  );
}
