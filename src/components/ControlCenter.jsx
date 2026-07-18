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
      <form onSubmit={submit} className="flex items-center gap-2 px-5">
        <input
          autoFocus
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Label (e.g. Car, Tent)"
          className="flex-1 rounded-full border-2 border-hud-teal-light/60 bg-hud-panel px-5 py-4 text-sm text-white placeholder:text-hud-muted focus:border-hud-cyan focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-full bg-hud-cyan px-5 py-4 text-sm font-semibold text-hud-cyan-ink active:opacity-80"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => setPromptOpen(false)}
          className="rounded-full border-2 border-hud-warn/50 px-4 py-4 text-sm font-semibold text-hud-warn active:bg-hud-warn/10"
        >
          ✕
        </button>
      </form>
    );
  }

  return (
    <div className="px-5">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setPromptOpen(true)}
        className="flex w-full items-center justify-center gap-3 rounded-full bg-hud-cyan py-4 text-lg font-semibold text-hud-cyan-ink shadow-[0_8px_24px_rgba(127,224,242,0.25)] transition active:scale-[0.98] active:opacity-90 disabled:cursor-not-allowed disabled:bg-hud-panel disabled:text-hud-muted disabled:shadow-none"
      >
        <NeedleIcon size={20} />
        Drop Needle
      </button>
    </div>
  );
}
