import { ArrowUp, TriangleAlert } from 'lucide-react';
import { formatCoord, formatDistance } from '../utils/geo';
import NeedleIcon from './NeedleIcon';

const LOCK_THRESHOLD_M = 5;

export default function RadarDisplay({ activeNeedle, position, heading, distance, bearing }) {
  const locked = distance != null && distance <= LOCK_THRESHOLD_M;
  const needsCalibration = activeNeedle && position && heading == null && !locked;
  const rotation = bearing != null ? bearing - (heading ?? 0) : 0;

  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center">
      {/* outer ring */}
      <div
        className={`radar-grid absolute inset-0 rounded-full border ${
          locked ? 'border-hud-green' : 'border-emerald-500/30'
        }`}
      />
      <div className="absolute inset-6 rounded-full border border-emerald-500/20" />
      <div className="absolute inset-14 rounded-full border border-emerald-500/10" />

      {/* rotating sweep */}
      {!locked && (
        <div className="animate-radar-sweep absolute inset-0 rounded-full">
          <div className="absolute left-1/2 top-1/2 h-1/2 w-px origin-top bg-gradient-to-b from-hud-green/40 to-transparent" />
        </div>
      )}

      {locked && (
        <div className="animate-lock-pulse absolute inset-6 rounded-full border-2 border-hud-green" />
      )}

      {/* center content */}
      <div className="relative z-10 flex flex-col items-center gap-2 text-center">
        {!activeNeedle && (
          <>
            <NeedleIcon size={56} className="text-hud-green/40" />
            <p className="max-w-[12rem] text-xs tracking-widest text-hud-green/50">
              NO ACTIVE TARGET — DROP A NEEDLE TO BEGIN TRACKING
            </p>
          </>
        )}

        {activeNeedle && !position && (
          <>
            <TriangleAlert size={40} className="text-hud-amber" />
            <p className="text-xs tracking-widest text-hud-amber">ACQUIRING GPS SIGNAL...</p>
          </>
        )}

        {activeNeedle && position && locked && (
          <>
            <div className="text-hud-green">
              <NeedleIcon size={48} active className="text-hud-green" />
            </div>
            <p className="text-sm font-bold tracking-widest text-hud-green">TARGET REACHED</p>
            <p className="text-xs tracking-widest text-hud-green/70">LOCK CONFIRMED</p>
          </>
        )}

        {activeNeedle && position && !locked && (
          <>
            <ArrowUp
              size={72}
              className="text-hud-green drop-shadow-[0_0_10px_rgba(0,255,102,0.6)] transition-transform duration-300 ease-out"
              style={{ transform: `rotate(${rotation}deg)` }}
              strokeWidth={2.5}
            />
            <p className="mt-1 text-2xl font-bold tracking-wider text-hud-green">
              DIST: {distance != null ? formatDistance(distance) : '--'}
            </p>
            <p className="text-[10px] tracking-widest text-hud-green/60">
              {formatCoord(activeNeedle.lat)}, {formatCoord(activeNeedle.lon)}
            </p>
          </>
        )}
      </div>

      {needsCalibration && (
        <div className="absolute inset-x-2 bottom-2 flex items-center gap-2 rounded border border-hud-amber/50 bg-hud-bg/90 px-3 py-2 text-[10px] tracking-widest text-hud-amber backdrop-blur-sm">
          <TriangleAlert size={16} className="shrink-0" />
          SYSTEM CALIBRATION: WALK TO ENGAGE RADAR VECTOR
        </div>
      )}
    </div>
  );
}
