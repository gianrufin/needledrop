import { Compass, Trash2 } from 'lucide-react';
import NeedleIcon from './NeedleIcon';
import { formatCoord } from '../utils/geo';

export default function NeedleVault({ needles, activeId, open, onToggle, onEngage, onDelete }) {
  return (
    <>
      {open && (
        <div className="fixed inset-x-0 bottom-24 top-24 z-20 flex flex-col rounded-t-3xl border-t border-hud-teal-light/30 bg-hud-panel px-4 pt-4 shadow-[0_-16px_40px_rgba(0,0,0,0.4)]">
          <p className="mb-3 px-1 text-lg font-semibold text-white">
            Needle Vault <span className="text-hud-muted">({needles.length})</span>
          </p>

          <div className="flex-1 overflow-y-auto pb-4">
            {needles.length === 0 && (
              <p className="mt-8 text-center text-sm text-hud-muted">
                No needles dropped yet.
              </p>
            )}

            <ul className="flex flex-col gap-2">
              {needles.map((n) => {
                const isActive = n.id === activeId;
                return (
                  <li
                    key={n.id}
                    className={`flex items-center gap-3 rounded-2xl px-3 py-3 ${
                      isActive ? 'bg-hud-teal/40' : 'bg-hud-bg/60'
                    }`}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hud-teal-deep">
                      <NeedleIcon size={18} active={isActive} className="text-hud-cyan" />
                    </span>
                    <button
                      type="button"
                      onClick={() => onEngage(n.id)}
                      className="min-w-0 flex-1 text-left"
                    >
                      <span className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium text-white">{n.label}</p>
                        {n.level && (
                          <span className="shrink-0 rounded-full bg-hud-bg px-2 py-0.5 text-[10px] font-semibold text-hud-cyan">
                            {n.level}
                          </span>
                        )}
                      </span>
                      <p className="truncate text-xs text-hud-muted">
                        {formatCoord(n.lat)}, {formatCoord(n.lon)}
                      </p>
                    </button>
                    {!isActive && (
                      <button
                        type="button"
                        onClick={() => onEngage(n.id)}
                        aria-label="Engage target"
                        className="shrink-0 rounded-full bg-hud-teal-deep p-2.5 text-hud-cyan active:opacity-70"
                      >
                        <Compass size={16} />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onDelete(n.id)}
                      aria-label="Delete needle"
                      className="shrink-0 rounded-full bg-hud-warn/10 p-2.5 text-hud-warn active:bg-hud-warn/20"
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      <nav className="fixed inset-x-0 bottom-6 z-30 flex justify-center">
        <div className="flex items-center gap-2 rounded-full bg-hud-teal-deep p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
          <button
            type="button"
            aria-label="Radar view"
            onClick={() => open && onToggle()}
            className={`flex h-12 w-12 items-center justify-center rounded-full transition ${
              !open ? 'bg-hud-cyan text-hud-cyan-ink' : 'text-hud-muted'
            }`}
          >
            <NeedleIcon size={20} />
          </button>
          <button
            type="button"
            aria-label="Needle vault"
            onClick={() => !open && onToggle()}
            className={`flex h-12 w-12 items-center justify-center rounded-full transition ${
              open ? 'bg-hud-cyan text-hud-cyan-ink' : 'text-hud-muted'
            }`}
          >
            <Compass size={20} />
          </button>
        </div>
      </nav>
    </>
  );
}
