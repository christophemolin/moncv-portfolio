export default function Icon({ name, size = 16, stroke = "var(--color-primary)" }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    focusable: "false",
    style: { display: "block" },
  };

  switch (name) {
    case "phone":
      return (
        <svg {...common}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.74 19.74 0 0 1-8.59-3.07 19.5 19.5 0 0 1-6-6A19.74 19.74 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.64 2.63a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.45-1.16a2 2 0 0 1 2.11-.45c.85.31 1.73.52 2.63.64A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "map":
      return (
        <svg {...common}>
          <path d="M9 18 2 22V6l7-4 6 4 7-4v16l-7 4-6-4z" />
          <path d="M9 4v14" />
          <path d="M15 8v14" />
        </svg>
      );
    case "flag":
      return (
        <svg {...common}>
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10" />
        </svg>
      );
    case "user":
      return (
        <svg {...common}>
          <path d="M20 21a8 8 0 1 0-16 0" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 8h6M9 12h6M9 16h6M7 21V3M17 21V3" />
        </svg>
      );
    default:
      return null;
  }
}
