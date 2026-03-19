/**
 * RESTAURANT CONSTANTS
 * 
 * Centralized configuration for the restaurant.
 * These values are used throughout the application.
 * 
 * @format
 */

// ============================================================================
// RESTAURANT INFORMATION
// ============================================================================
export const RESTAURANT_INFO = {
  name: "Royal Restaurant",
  tagline: "Miejsce codziennych spotkań przy polskim stole",
  description: "Wyjątkowe miejsce, gdzie tradycyjna polska kuchnia spotyka się z nowoczesną elegancją.",
  since: "2010",
  
  // Contact Information
  address: {
    street: "ul. Kwiatowa 12",
    city: "00-001 Warszawa",
    full: "ul. Kwiatowa 12, 00-001 Warszawa"
  },
  
  // Contact
  phone: "+48 696 566 633",
  email: "kontakt@royalrestaurant.pl",
  
  // Social Media
  social: {
    facebook: "#",
    instagram: "https://instagram.com/royalrestaurant_warsaw"
  },
  
  // Website
  website: {
    url: "https://royal-restaurant.pl",
    domain: "royal-restaurant.pl"
  }
};

// ============================================================================
// OPENING HOURS
// ============================================================================
export const OPENING_HOURS = {
  mondayToFriday: {
    label: "Poniedziałek - Piątek",
    hours: "12:00 - 22:00"
  },
  saturday: {
    label: "Sobota",
    hours: "9:00 - 22:00"
  },
  sunday: {
    label: "Niedziela",
    hours: "9:00 - 22:00"
  },
  
  // Array format for easy iteration
  asArray: [
    { day: "Poniedziałek - Piątek", hours: "12:00 - 22:00" },
    { day: "Sobota", hours: "9:00 - 22:00" },
    { day: "Niedziela", hours: "9:00 - 22:00" }
  ]
};

// ============================================================================
// PRICING
// ============================================================================
export const PRICING = {
  serviceCharge: {
    percentage: 10,
    label: "10% opłaty serwisowej"
  }
};

// ============================================================================
// PAGE ROUTES
// ============================================================================
export const ROUTES = {
  // Public pages
  HOME: "/",
  MENU: "/menu",
  
  // Admin pages
  ADMIN_LOGIN: "/logowanie-admin",
  ADMIN_PANEL: "/panel-admin-glowny",
  MENU_MANAGEMENT: "/zarzadzanie-menu",
  MESSAGES_MANAGEMENT: "/zarzadzanie-wiadomosciami",
  GALLERY_MANAGEMENT: "/zarzadzanie-galeria",
  SETTINGS: "/ustawienia-systemu",
  
  // API routes
  API: {
    AUTH_LOGIN: "/api/auth/login",
    AUTH_LOGOUT: "/api/auth/logout",
    AUTH_VERIFY: "/api/auth/verify"
  }
};

// ============================================================================
// ANIMATION DELAYS
// ============================================================================
export const ANIMATION_DELAYS = {
  DEFAULT: "0s",
  SHORT: "0.1s",
  MEDIUM: "0.2s",
  LONG: "0.3s",
  EXTRA_LONG: "0.4s"
};

// ============================================================================
// UI CONSTANTS
// ============================================================================
export const UI = {
  // Breakpoints (matching Tailwind defaults)
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px"
  },
  
  // Z-index layers
  zIndex: {
    base: "0",
    dropdown: "10",
    sticky: "20",
    modal: "30",
    popover: "40",
    tooltip: "50"
  },
  
  // Transition durations
  transitions: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms"
  }
};

// ============================================================================
// ACCESSIBILITY
// ============================================================================
export const A11Y = {
  // Minimum touch target size (WCAG)
  touchTarget: {
    minSize: "44px"
  },
  
  // Focus visible styles
  focus: {
    outline: "2px solid var(--accent)",
    outlineOffset: "2px"
  }
};

export default {
  RESTAURANT_INFO,
  OPENING_HOURS,
  PRICING,
  ROUTES,
  ANIMATION_DELAYS,
  UI,
  A11Y
};
