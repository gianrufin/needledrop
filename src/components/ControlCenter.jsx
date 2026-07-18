import { useState } from 'react';
import NeedleIcon from './NeedleIcon';

export default function ControlCenter({ onDrop, disabled }) {
  const [promptOpen, setPromptOpen] = useState(false);
  const [label, setLabel] = useState('');
  const [level, setLevel] = useState('');

  function submit(e) {
    e.preventDefault();
    onDrop(label, level);
    setLabel('');
    setLevel('');
    setPromptOpen(false);
  }

  if (promptOpen) {
    return (
      <form
        onSubmit={submit}
        className="mx-5 flex flex-col gap-2 rounded-3xl bg-hud-panel p-3"
      >
        <input
          autoFocus
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Label (e.g. Car, Tent)"
          className="rounded-full border-2 border-hud-teal-light/60 bg-hud-bg px-5 py-4 text-sm text-hud-ink placeholder:text-hud-muted focus:border-hud-cyan focus:outline-none"
        />
        <input
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          placeholder="Level / floor (optional, e.g. P3)"
          className="rounded-full border-2 border-hud-teal-light/60 bg-hud-bg px-5 py-4 text-sm text-hud-ink placeholder:text-hud-muted focus:border-hud-cyan focus:outline-none"
        />
        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="flex-1 rounded-full bg-hud-accent py-3.5 text-sm font-semibold text-hud-accent-ink active:opacity-80"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setPromptOpen(false)}
            className="rounded-full border-2 border-hud-warn/50 px-4 py-3.5 text-sm font-semibold text-hud-warn active:bg-hud-warn/10"
          >
            ✕
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="px-5">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setPromptOpen(true)}
        className="flex w-full items-center justify-center gap-3 rounded-full bg-hud-accent py-4 text-lg font-semibold text-hud-accent-ink shadow-[0_8px_24px_color-mix(in_srgb,var(--color-hud-accent)_35%,transparent)] transition active:scale-[0.98] active:opacity-90 disabled:cursor-not-allowed disabled:bg-hud-panel disabled:text-hud-muted disabled:shadow-none"
      >
        <NeedleIcon size={20} />
        Drop Needle
      </button>
    </div>
  );
}
