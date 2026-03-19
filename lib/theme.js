/**
 * THEME CONFIGURATION - Royal Restaurant
 * 
 * This file contains theme configuration for the restaurant website.
 * It should be kept in sync with app/globals.css CSS variables.
 * 
 * @format
 * 
 * IMPORTANT: When updating colors here, also update app/globals.css
 * to maintain consistency between JavaScript and CSS.
 */

// ============================================================================
// THEME COLORS
// These values should match the CSS variables in app/globals.css
// ============================================================================
export const theme = {
  // Main colors
  colors: {
    // Background colors
    background: "#eaf5ff",
    
    // Text colors
    foreground: "#1a1a1a",
    foregroundSecondary: "#5a5a5a",
    foregroundMuted: "#9a9a9a",
    footerText: "#6b6b6b",
    
    // Accent colors
    accent: "#323179",
    accentLight: "#e8d4d4",
    
    // Secondary color
    secondary: "#d4c5a9",
    
    // Base colors
    white: "#ffffff",
    black: "#000000"
  },
  
  // Typography
  fonts: {
    sans: "var(--font-geist-sans)",
    mono: "var(--font-geist-mono)",
    display: "var(--font-playfair)"
  },
  
  // Spacing (matching Tailwind defaults)
  spacing: {
    xs: "0.25rem",   // 4px
    sm: "0.5rem",    // 8px
    md: "1rem",      // 16px
    lg: "1.5rem",    // 24px
    xl: "2rem",      // 32px
    "2xl": "3rem",   // 48px
    "3xl": "4rem"    // 64px
  },
  
  // Border radius
  borderRadius: {
    sm: "0.125rem",   // 2px
    md: "0.375rem",   // 6px
    lg: "0.5rem",     // 8px
    xl: "0.75rem",    // 12px
    "2xl": "1rem",    // 16px
    full: "9999px"
  },
  
  // Shadows
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)"
  }
};

// ============================================================================
// COLOR PALETTE
// Additional color definitions for specific use cases
// ============================================================================
export const colorPalette = {
  // Status colors
  status: {
    success: "#22c55e",
    warning: "#eab308",
    error: "#ef4444",
    info: "#3b82f6"
  },
  
  // Admin panel colors
  admin: {
    background: "#0a0a0a",
    surface: "#111111",
    border: "#27272a",
    text: "#fafafa",
    textMuted: "#a1a1aa",
    accent: "#b08d8d"
  }
};

// ============================================================================
// EXPORTS
// ============================================================================
export default theme;

// Named exports for tree-shaking
export const {
  colors,
  fonts,
  spacing,
  borderRadius,
  shadows
} = theme;
