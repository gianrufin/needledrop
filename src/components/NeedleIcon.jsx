/**
 * NEEDLEDROP's mark — a turntable tonearm swinging down to a stylus tip,
 * used anywhere a location/target needs a brand-consistent glyph.
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
      {/* pivot */}
      <circle cx="6" cy="5.2" r="2.4" fill="currentColor" />
      {/* tonearm */}
      <line
        x1="6"
        y1="5.2"
        x2="14.5"
        y2="13.7"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      {/* headshell + stylus */}
      <g transform="translate(14.5 13.7) rotate(45)">
        <rect x="-1.7" y="-1.2" width="3.4" height="8.6" rx="1.5" fill="currentColor" />
      </g>
      <circle cx="20" cy="19.2" r="1.15" fill="currentColor" />
    </svg>
  );
}
