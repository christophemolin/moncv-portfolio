/**
 * AvatarToken
 * - Circular avatar with accent ring
 * - Shows photo if provided; falls back to initials
 * - Image URL is resolved against Vite base so it works on GitHub Pages subpaths
 */
export default function AvatarToken({
  size = 72,
  photo, // e.g., "profile.jpg" placed in /public or an imported asset path
  initials = "HF",
  title = "Portrait",
}) {
  const ring = 2; // px
  const inset = 3; // px from outer to inner
  let resolvedSrc = null;

  if (photo) {
    try {
      resolvedSrc = new URL(photo, import.meta.env.BASE_URL).toString();
    } catch {
      // Fallback if URL construction fails; use as-is
      resolvedSrc = photo;
    }
  }

  const containerStyle = {
    width: size,
    height: size,
    position: "relative",
    display: "inline-block",
  };

  const ringStyle = {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    border: `${ring}px solid var(--color-accent)`,
  };

  const innerStyle = {
    position: "absolute",
    inset: inset,
    borderRadius: "50%",
    overflow: "hidden",
    background: "var(--color-neutral-50)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const initialsStyle = {
    fontFamily:
      'Manrope, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
    fontWeight: 800,
    color: "var(--color-primary)",
    fontSize: Math.round(size * 0.36),
    letterSpacing: "-0.02em",
    lineHeight: 1,
  };

  return (
    <div style={containerStyle} role="img" aria-label={title}>
      <div style={ringStyle} aria-hidden="true" />
      <div style={innerStyle}>
        {resolvedSrc ? (
          <img
            src={resolvedSrc}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            loading="eager"
          />
        ) : (
          <span style={initialsStyle}>{initials}</span>
        )}
      </div>
    </div>
  );
}
