import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const ICONS = { light: Sun, dark: Moon, auto: Monitor };
const LABELS = { light: 'Light', dark: 'Dark', auto: 'Auto' };

export default function ThemeToggle() {
  const { mode, cycleMode } = useTheme();
  const Icon = ICONS[mode];

  return (
    <button
      type="button"
      onClick={cycleMode}
      aria-label={`Theme: ${LABELS[mode]}. Tap to change.`}
      className="flex items-center gap-1 rounded-full bg-hud-panel px-2.5 py-1.5 text-hud-muted transition active:opacity-70"
    >
      <Icon size={14} />
      <span className="text-[10px] font-semibold uppercase tracking-wide">{LABELS[mode]}</span>
    </button>
  );
}
