import { useState } from 'react';
import { ArrowUp, Layers } from 'lucide-react';
import NeedleIcon from './NeedleIcon';

const SLIDES = [
  {
    Icon: (props) => <NeedleIcon {...props} active />,
    title: 'Drop a Needle',
    body: 'Mark any spot instantly — your car, your tent, your gate. Give it a label, or let a timestamp do the job.',
  },
  {
    Icon: ArrowUp,
    title: 'Find Your Way Back',
    body: 'A simple arrow points you home, with live distance underneath. Works fully offline — no cell service needed.',
  },
  {
    Icon: Layers,
    title: 'Track Every Level',
    body: 'Save every needle in your Vault, tag the parking level or floor, and re-engage any of them anytime.',
  },
];

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const isLast = step === SLIDES.length - 1;
  const { Icon, title, body } = SLIDES[step];

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-hud-teal-deep">
      <div className="flex justify-end px-5 pt-6">
        <button
          type="button"
          onClick={onComplete}
          className="text-sm font-medium text-hud-cyan active:opacity-70"
        >
          Skip
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-10 text-center">
        <Icon size={88} strokeWidth={2.25} className="text-hud-cyan" />
        <h1 className="text-3xl font-semibold text-hud-ink">{title}</h1>
        <p className="max-w-xs text-sm text-hud-muted">{body}</p>
      </div>

      <div className="flex flex-col items-center gap-6 px-5 pb-10">
        <div className="flex items-center gap-2">
          {SLIDES.map((slide, i) => (
            <span
              key={slide.title}
              className={`h-2 rounded-full transition-all ${
                i === step ? 'w-6 bg-hud-cyan' : 'w-2 bg-hud-muted/40'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => (isLast ? onComplete() : setStep((s) => s + 1))}
          className="w-full max-w-sm rounded-full bg-hud-accent py-4 text-lg font-semibold text-hud-accent-ink shadow-[0_8px_24px_color-mix(in_srgb,var(--color-hud-accent)_35%,transparent)] transition active:scale-[0.98] active:opacity-90"
        >
          {isLast ? 'Get Started' : 'Next'}
        </button>
      </div>
    </div>
  );
}
