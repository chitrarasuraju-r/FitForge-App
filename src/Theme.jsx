// theme.js
// Shared design tokens for FitFuture — dark, premium fitness aesthetic.
// Import these into every screen so colors, type, and spacing stay consistent.

export const colors = {
  // Base
  bg: "#0E0E13",
  bgElevated: "#17171F",
  surface: "#1E1E28",
  surfaceAlt: "#26262F",

  // Text
  text: "#F5F5F7",
  textMuted: "#9C9CA8",
  textFaint: "#5E5E6B",

  // Accent — electric violet (primary brand action)
  accent: "#8B5CF6",
  accentSoft: "rgba(139,92,246,0.15)",
  accentGradientFrom: "#8B5CF6",
  accentGradientTo: "#6D28D9",

  // Ring stats — each metric gets its own identity color
  ringCalories: "#8B5CF6",
  ringWorkouts: "#F5B93D",
  ringMinutes: "#EF4A6D",
  ringHeartRate: "#3B9EFF",

  // Utility
  border: "rgba(255,255,255,0.08)",
  success: "#3ECF8E",
  warning: "#F5B93D",
  danger: "#EF4A6D",
  overlay: "rgba(0,0,0,0.5)",
};

export const type = {
  heading: "'Manrope', system-ui, fontfamily",
  body: "'Inter', system-ui, fontfamily",
  mono: "'JetBrains Mono', monospace",

  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  scale: {
    display: "34px",
    h1: "26px",
    h2: "20px",
    h3: "16px",
    body: "15px",
    small: "13px",
    caption: "11px",
  },
};

export const space = (n) => `${n * 4}px`;

export const radius = {
  sm: "10px",
  md: "18px",
  lg: "26px",
  pill: "999px",
};

export const shadow = {
  sm: "0 2px 8px rgba(0,0,0,0.3)",
  md: "0 8px 24px rgba(0,0,0,0.4)",
  lg: "0 16px 48px rgba(0,0,0,0.5)",
  glow: "0 0 32px rgba(139,92,246,0.35)",
};

// Reusable style fragments
export const pageContainer = {
  minHeight: "100vh",
  background: colors.bg,
  fontFamily: type.body,
  color: colors.text,
  padding: space(5),
  boxSizing: "border-box",
};

export const card = {
  background: colors.surface,
  borderRadius: radius.lg,
  border: `1px solid ${colors.border}`,
  boxShadow: shadow.md,
  padding: space(5),
};

export const heading = {
  fontFamily: type.heading,
  fontWeight: type.weight.bold,
  color: colors.text,
  letterSpacing: "-0.02em",
  margin: 0,
};

export const buttonPrimary = {
  background: `linear-gradient(135deg, ${colors.accentGradientFrom}, ${colors.accentGradientTo})`,
  color: "#FFFFFF",
  border: "none",
  borderRadius: radius.pill,
  padding: `${space(3)} ${space(6)}`,
  fontFamily: type.body,
  fontWeight: type.weight.semibold,
  fontSize: type.scale.body,
  cursor: "pointer",
  boxShadow: shadow.glow,
};

export const buttonSecondary = {
  background: colors.surfaceAlt,
  color: colors.text,
  border: `1px solid ${colors.border}`,
  borderRadius: radius.pill,
  padding: `${space(3)} ${space(6)}`,
  fontFamily: type.body,
  fontWeight: type.weight.semibold,
  fontSize: type.scale.body,
  cursor: "pointer",
};

export const ringSize = {
  sm: 56,
  md: 96,
  lg: 168,
};

export const navBar = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  background: colors.bgElevated,
  borderTop: `1px solid ${colors.border}`,
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  padding: `${space(3)} 0`,
};