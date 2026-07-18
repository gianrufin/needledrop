import { ArrowUp, TriangleAlert } from 'lucide-react';
import { formatCoord, formatDistance } from '../utils/geo';
import NeedleIcon from './NeedleIcon';

const LOCK_THRESHOLD_M = 5;

export default function RadarDisplay({ activeNeedle, position, heading, distance, bearing }) {
  const locked = distance != null && distance <= LOCK_THRESHOLD_M;
  const needsCalibration = activeNeedle && position && heading == null && !locked;
  const rotation = bearing != null ? bearing - (heading ?? 0) : 0;
  const { value, unit } = distance != null ? splitDistance(distance) : { value: null, unit: null };

  if (!activeNeedle) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
        <NeedleIcon size={72} className="text-hud-muted/50" />
        <p className="text-xl font-semibold text-white">No target set</p>
        <p className="max-w-[16rem] text-sm text-hud-muted">
          Tap the button below to drop your first needle.
        </p>
      </div>
    );
  }

  if (!position) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
        <RingBadge pulsing>
          <NeedleIcon size={40} className="text-hud-cyan" />
        </RingBadge>
        <p className="text-xl font-semibold text-white">Finding you…</p>
        <p className="text-sm text-hud-muted">Acquiring GPS signal</p>
      </div>
    );
  }

  if (locked) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
        <RingBadge locked>
          <NeedleIcon size={40} active className="text-hud-cyan" />
        </RingBadge>
        <p className="text-2xl font-semibold text-white">Target reached</p>
        <p className="text-sm text-hud-cyan">Lock confirmed</p>
        {activeNeedle.level && <LevelBadge level={activeNeedle.level} />}
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
      <ArrowUp
        size={104}
        className="text-hud-cyan drop-shadow-[0_0_16px_rgba(127,224,242,0.5)] transition-transform duration-300 ease-out"
        style={{ transform: `rotate(${rotation}deg)` }}
        strokeWidth={2.75}
      />

      <p className="mt-2 flex items-baseline gap-1.5">
        <span className="text-6xl font-semibold text-white">{value}</span>
        <span className="text-xl font-medium text-hud-muted">{unit}</span>
      </p>
      <p className="text-sm font-medium text-hud-muted">ahead</p>

      <p className="mt-4 text-lg font-semibold text-white">{activeNeedle.label}</p>
      {activeNeedle.level && <LevelBadge level={activeNeedle.level} />}
      <p className="text-xs text-hud-muted">
        {formatCoord(activeNeedle.lat)}, {formatCoord(activeNeedle.lon)}
      </p>

      {needsCalibration && (
        <div className="mt-4 flex max-w-xs items-center gap-2 rounded-2xl border border-hud-warn/40 bg-hud-warn/10 px-4 py-3 text-xs text-hud-warn">
          <TriangleAlert size={18} className="shrink-0" />
          Walk a few steps to calibrate your direction
        </div>
      )}
    </div>
  );
}

function RingBadge({ children, pulsing, locked }) {
  return (
    <div className="relative flex h-48 w-48 items-center justify-center">
      <div
        className={`absolute inset-0 rounded-full border-4 ${
          locked ? 'border-hud-cyan' : 'border-hud-teal-light/60'
        }`}
      />
      {pulsing && (
        <div className="animate-ring-pulse absolute inset-0 rounded-full border-4 border-hud-cyan" />
      )}
      {locked && <div className="animate-lock-pulse absolute inset-3 rounded-full" />}
      <div className="absolute inset-3 rounded-full border-2 border-hud-cyan/70" />
      <div
        className={`flex h-32 w-32 items-center justify-center rounded-full ${
          locked ? 'bg-hud-teal' : 'bg-hud-teal-deep'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function LevelBadge({ level }) {
  return (
    <span className="rounded-full bg-hud-teal-deep px-3 py-1 text-xs font-semibold text-hud-cyan">
      {level}
    </span>
  );
}

function splitDistance(meters) {
  const formatted = formatDistance(meters);
  const match = formatted.match(/^([\d.]+)(\D+)$/);
  if (!match) return { value: formatted, unit: '' };
  return { value: match[1], unit: match[2] };
}
