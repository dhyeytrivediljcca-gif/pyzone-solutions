
interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  animate?: boolean;
}

export const PyzoneIcon = ({ size = 32, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pz-logo-svg ${className}`}
    aria-label="Pyzone-Solutions Logo Icon"
  >
    <defs>
      <linearGradient id="pz-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#090d16" />
      </linearGradient>
      <linearGradient id="pz-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
      <linearGradient id="pz-yellow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fde047" />
        <stop offset="100%" stopColor="#eab308" />
      </linearGradient>
    </defs>

    {/* Modern Rounded Container with subtle border glow */}
    <rect
      x="1.5"
      y="1.5"
      width="37"
      height="37"
      rx="10"
      fill="url(#pz-bg-grad)"
      stroke="rgba(56, 189, 248, 0.28)"
      strokeWidth="1.5"
    />

    {/* Subtle code bracket on left */}
    <path
      d="M10 14L6 20L10 26"
      stroke="#38bdf8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.65"
    />

    {/* Subtle code bracket on right */}
    <path
      d="M30 14L34 20L30 26"
      stroke="#facc15"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.65"
    />

    {/* PZ Monogram */}
    {/* P glyph in electric blue */}
    <path
      d="M13 13H19C21.2 13 22.5 14.3 22.5 16.5C22.5 18.7 21.2 20 19 20H15.5V27H13V13ZM15.5 15.2V17.8H18.7C19.8 17.8 20.3 17.3 20.3 16.5C20.3 15.7 19.8 15.2 18.7 15.2H15.5Z"
      fill="url(#pz-blue-grad)"
    />

    {/* Z glyph in Python-inspired gold */}
    <path
      d="M21 21H27V22.8L23.4 25.4H27V27H20.8V25.2L24.4 22.6H21V21Z"
      fill="url(#pz-yellow-grad)"
    />

    {/* Bottom active dot accent */}
    <circle cx="20" cy="32.5" r="1.5" fill="#38bdf8" opacity="0.9" />
  </svg>
);

export default function Logo({ size = 32, showText = true, className = "" }: LogoProps) {
  return (
    <div className={`logo-container ${className}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem" }}>
      <PyzoneIcon size={size} />
      {showText && (
        <span className="logo-brand-text">
          <span className="logo-brand-pyzone">Pyzone</span>
          <span className="logo-brand-dash">-</span>
          <span className="logo-brand-solutions">Solutions</span>
        </span>
      )}
    </div>
  );
}
