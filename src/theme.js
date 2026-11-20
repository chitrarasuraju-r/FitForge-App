// theme.js
// Shared design tokens for FitForge — import this into every screen
// so colors, type, spacing, and shadows stay consistent app-wide.

export const colors = {
  // Base
  bg: "#FAFAF7",
  bgAlt: "#F1EFE9",
  surface: "#FFFFFF",

  // Text
  text: "#1C1E1B",
  textMuted: "#6B6F68",
  textFaint: "#A3A79E",

  // Accent — deep sage (health / calm / growth)
  accent: "#3D5A4A",
  accentSoft: "#DCE6DF",

  // Secondary accent — soft coral (energy / progress)
  energy: "#E8927C",
  energySoft: "#FBE6DF",

  // Utility
  border: "#E7E5DD",
  success: "#3D5A4A",
  warning: "#D9A441",
  danger: "#C0564A",
};

export const type = {
  heading: "'Manrope', system-ui, fontfamily",
  body: "'Inter', system-ui, fontfamily",
  mono: "'JetBrains Mono', monospace", // for stats/numbers

  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  scale: {
    display: "40px",
    h1: "28px",
    h2: "22px",
    h3: "18px",
    body: "15px",
    small: "13px",
    caption: "11px",
  },
};

export const space = (n) => `${n * 4}px`; // usage: space(4) => 16px

export const radius = {
  sm: "8px",
  md: "16px",
  lg: "24px",
  pill: "999px",
};

export const shadow = {
  sm: "0 1px 2px rgba(28,30,27,0.04)",
  md: "0 4px 16px rgba(28,30,27,0.06)",
  lg: "0 8px 32px rgba(28,30,27,0.08)",
};

// Reusable style fragments
export const card = {
  background: colors.surface,
  borderRadius: radius.lg,
  border: `1px solid ${colors.border}`,
  boxShadow: shadow.md,
  padding: space(6),
};

export const pageContainer = {
  minHeight: "100vh",
  background: colors.bg,
  fontFamily: type.body,
  color: colors.text,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: space(5),
};

export const heading = {
  fontFamily: type.heading,
  fontWeight: type.weight.bold,
  color: colors.text,
  letterSpacing: "-0.02em",
};

export const buttonPrimary = {
  background: colors.accent,
  color: "#FFFFFF",
  border: "none",
  borderRadius: radius.pill,
  padding: `${space(3)} ${space(6)}`,
  fontFamily: type.body,
  fontWeight: type.weight.semibold,
  fontSize: type.scale.body,
  cursor: "pointer",
  transition: "opacity 0.15s ease, transform 0.15s ease",
};

export const buttonSecondary = {
  ...buttonPrimary,
  background: "transparent",
  color: colors.accent,
  border: `1px solid ${colors.accent}`,
};

// Progress ring — the signature element, reused across
// Onboarding steps, Dashboard rings, Nutrition macros, Workout completion
export const ringSize = {
  sm: 48,
  md: 80,
  lg: 140,
};