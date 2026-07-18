/**
 * NEEDLEDROP's pin mark — a soft, rounded teardrop with a hollow core,
 * used anywhere a location needs a friendly, brand-consistent glyph.
 */
export default function NeedleIcon({ className = '', active = false, size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={[active ? 'drop-shadow-[0_0_10px_rgba(127,224,242,0.55)]' : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      <path
        d="M12 2C7.6 2 4 5.5 4 9.8C4 15.4 12 22 12 22C12 22 20 15.4 20 9.8C20 5.5 16.4 2 12 2Z"
        fill="currentColor"
      />
      <circle cx="12" cy="9.6" r="3" fill="var(--color-hud-bg)" />
    </svg>
  );
}
