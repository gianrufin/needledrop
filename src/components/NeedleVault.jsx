import { useState } from 'react';
import { ChevronUp, Crosshair, Trash2 } from 'lucide-react';
import NeedleIcon from './NeedleIcon';
import { formatCoord } from '../utils/geo';

export default function NeedleVault({ needles, activeId, onEngage, onDelete }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-20 border-t border-emerald-500/30 bg-hud-panel/95 backdrop-blur-md transition-[height] duration-300 ${
        open ? 'h-[60vh]' : 'h-14'
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-4 text-xs font-bold tracking-widest text-hud-green"
      >
        <span>NEEDLE VAULT ({needles.length})</span>
        <ChevronUp
          size={18}
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="h-[calc(60vh-3.5rem)] overflow-y-auto px-3 pb-6">
          {needles.length === 0 && (
            <p className="mt-6 text-center text-xs tracking-widest text-hud-green/40">
              VAULT EMPTY — NO NEEDLES DROPPED
            </p>
          )}

          <ul className="flex flex-col gap-2">
            {needles.map((n) => {
              const isActive = n.id === activeId;
              return (
                <li
                  key={n.id}
                  className={`flex items-center gap-3 border px-3 py-3 ${
                    isActive
                      ? 'border-hud-green bg-hud-green/10'
                      : 'border-emerald-500/20 bg-hud-bg/40'
                  }`}
                >
                  <NeedleIcon size={20} active={isActive} className="shrink-0 text-hud-green" />
                  <button
                    type="button"
                    onClick={() => onEngage(n.id)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <p className="truncate text-sm tracking-wide text-hud-green">{n.label}</p>
                    <p className="truncate text-[10px] tracking-widest text-hud-green/50">
                      {formatCoord(n.lat)}, {formatCoord(n.lon)}
                    </p>
                  </button>
                  {!isActive && (
                    <button
                      type="button"
                      onClick={() => onEngage(n.id)}
                      aria-label="Engage target"
                      className="shrink-0 border border-emerald-500/40 p-2 text-hud-green active:bg-hud-green/20"
                    >
                      <Crosshair size={16} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onDelete(n.id)}
                    aria-label="Delete needle"
                    className="shrink-0 border border-hud-amber/40 p-2 text-hud-amber active:bg-hud-amber/20"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
