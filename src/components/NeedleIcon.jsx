/**
 * Custom tactical needle icon — a sleek compass-needle / syringe-tip shape
 * pointing straight down, used in place of the standard map-pin teardrop.
 */
export default function NeedleIcon({ className = '', active = false, size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={[active ? 'drop-shadow-[0_0_8px_rgba(0,255,102,0.5)]' : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      <path
        d="M12 1.5L14.5 4V13.5L12 22.5L9.5 13.5V4L12 1.5Z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M12 1.5V13.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
      <circle cx="12" cy="4.6" r="1.15" fill="currentColor" />
      <path d="M9.5 4L14.5 4" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
    </svg>
  );
}
