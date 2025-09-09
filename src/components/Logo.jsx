import siteConfig from "../siteConfig";

/**
 * Modern initials monogram as SVG.
 * - Outer accent ring
 * - Inner neutral background
 * - Centered initials (Manrope loaded via index.html)
 */
export default function Logo({
  size = 72,
  strokeWidth = 2,
  initials = siteConfig.initials || "AM",
  title = `Logo: ${siteConfig.initials || "AM"}`,
}) {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  return (
    <svg
      width={size}
      height={size}
      role="img"
      aria-label={title}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: "block" }}
    >
      <title>{title}</title>
      {/* Outer accent ring */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth={strokeWidth}
      />
      {/* Inner circle */}
      <circle
        cx={center}
        cy={center}
        r={radius - strokeWidth}
        fill="var(--color-neutral-50)"
      />
      {/* Initials */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="var(--color-primary)"
        style={{
          fontFamily:
            'Manrope, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
          fontWeight: 800,
          fontSize: `${Math.round(size * 0.36)}px`,
          letterSpacing: "-0.02em",
        }}
      >
        {initials}
      </text>
    </svg>
  );
}
