"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/**
 * Navigation Component
 * 
 * Shared navigation component for the restaurant website.
 * Handles both desktop and mobile views with sticky header behavior.
 * 
 * @param {Object} props
 * @param {string} props.currentPath - Current page path for active link highlighting
 * @param {boolean} props.isAdmin - Whether this is the admin panel navigation
 */
export default function Navigation({ currentPath = "/", isAdmin = false }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll state for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

  // Base styles
  const headerBaseClasses = "fixed w-full top-0 z-50 flex-shrink-0 transition-all duration-300";
  const headerBgClasses = scrolled 
    ? "bg-white shadow-md" 
    : "bg-[var(--background)]/95 backdrop-blur-sm border-b border-[var(--secondary)]/20";

  return (
    <header className={`${headerBaseClasses} ${headerBgClasses}`}>
      <nav className="flex items-center justify-center px-4 md:px-6 py-3 md:py-4 max-w-7xl mx-auto w-full relative">
        {/* Mobile menu button - always visible */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="cursor-pointer text-xl md:hidden text-[var(--foreground)] hover:text-[var(--accent)] transition-colors absolute left-0 p-2"
          aria-label={mobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>

        {/* Desktop menu - left */}
        <div className="hidden md:flex items-center gap-6 text-xs tracking-[0.15em] absolute left-0">
          <NavLink href="/menu" isActive={currentPath === "/menu"}>MENU</NavLink>
          <NavLink href="/#o-nas" isActive={currentPath === "/#o-nas"}>O NAS</NavLink>
        </div>

        {/* Logo */}
        <div className="flex justify-center">
          <Link href="/" aria-label="Strona główna - Royal Restaurant">
            <img 
              src="/logo.png" 
              alt="Royal Restaurant" 
              className="h-8 md:h-10" 
              style={{ width: "80px" }} 
            />
          </Link>
        </div>

        {/* Desktop menu - right */}
        <div className="hidden md:flex items-center gap-6 text-xs tracking-[0.15em] absolute right-0">
          <NavLink href="/#eventy" isActive={currentPath === "/#eventy"}>EVENTY</NavLink>
          <NavLink href="/#kontakt" isActive={currentPath === "/#kontakt"}>KONTAKT</NavLink>
          <Link 
            href="/#rezerwacja" 
            className="px-4 py-2 border border-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-white transition-colors text-[10px]"
          >
            REZERWACJA
          </Link>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)}
        currentPath={currentPath}
      />
    </header>
  );
}

/**
 * NavLink Component - Individual navigation link
 */
function NavLink({ href, children, isActive }) {
  return (
    <Link 
      href={href} 
      className={`hover:text-[var(--accent)] transition-colors ${isActive ? "text-[var(--accent)]" : ""}`}
    >
      {children}
    </Link>
  );
}

/**
 * MobileMenu Component - Mobile navigation overlay
 */
function MobileMenu({ isOpen, onClose, currentPath }) {
  const menuItems = [
    { href: "/menu", label: "MENU" },
    { href: "/#o-nas", label: "O NAS" },
    { href: "/#eventy", label: "EVENTY" },
    { href: "/#kontakt", label: "KONTAKT" },
  ];

  return (
    <div 
      className={`fixed inset-0 z-40 bg-[var(--background)] transition-transform duration-300 md:hidden ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
        {menuItems.map((item) => (
          <Link 
            key={item.href}
            href={item.href} 
            className="text-2xl tracking-[0.2em] text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
            onClick={onClose}
          >
            {item.label}
          </Link>
        ))}
        <button 
          className="mt-8 px-8 py-3 border-2 border-[var(--foreground)] text-[var(--foreground)] tracking-[0.2em] hover:bg-[var(--foreground)] hover:text-white transition-all"
          onClick={onClose}
        >
          REZERWACJA
        </button>
      </div>
    </div>
  );
}

export { Navigation, NavLink, MobileMenu };
