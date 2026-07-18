import { useState } from 'react';
import NeedleIcon from './NeedleIcon';

export default function ControlCenter({ onDrop, disabled }) {
  const [promptOpen, setPromptOpen] = useState(false);
  const [label, setLabel] = useState('');

  function submit(e) {
    e.preventDefault();
    onDrop(label);
    setLabel('');
    setPromptOpen(false);
  }

  if (promptOpen) {
    return (
      <form
        onSubmit={submit}
        className="flex items-center gap-2 border border-emerald-500/40 bg-hud-panel/90 p-3 backdrop-blur-md"
      >
        <input
          autoFocus
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="LABEL (e.g. Car, Tent)"
          className="flex-1 border border-emerald-500/30 bg-hud-bg px-3 py-3 text-sm tracking-widest text-hud-green placeholder:text-hud-green/30 focus:border-hud-green focus:outline-none"
        />
        <button
          type="submit"
          className="border border-hud-green bg-hud-green/10 px-4 py-3 text-xs font-bold tracking-widest text-hud-green active:bg-hud-green/30"
        >
          DROP
        </button>
        <button
          type="button"
          onClick={() => setPromptOpen(false)}
          className="border border-hud-amber/50 px-4 py-3 text-xs font-bold tracking-widest text-hud-amber active:bg-hud-amber/10"
        >
          X
        </button>
      </form>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => setPromptOpen(true)}
      className="flex w-full items-center justify-center gap-3 border-2 border-hud-green bg-hud-green/10 py-5 text-lg font-bold tracking-[0.2em] text-hud-green shadow-[0_0_20px_rgba(0,255,102,0.15)] transition active:scale-[0.98] active:bg-hud-green/25 disabled:cursor-not-allowed disabled:border-emerald-500/20 disabled:text-hud-green/30 disabled:shadow-none"
    >
      <NeedleIcon size={22} active={!disabled} />
      [ DROP NEEDLE ]
    </button>
  );
}
