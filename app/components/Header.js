"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"

export default function Header({ 
  mobileMenuLinks = [],
  desktopLeftLinks = [],
  desktopRightLinks = [],
  reservationLink = null,
  scrolled = false,
  onScrolledChange = null,
  logoSrc = "/fdsa.webp"
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [localScrolled, setLocalScrolled] = useState(scrolled)

  // Scroll handler - defined at top level
  const handleScroll = useCallback(() => {
    if (!onScrolledChange) {
      setLocalScrolled(window.scrollY > 50)
    }
  }, [onScrolledChange])

  // Use external scrolled state if provided, otherwise manage locally
  useEffect(() => {
    if (onScrolledChange) {
      setLocalScrolled(scrolled)
    }
  }, [scrolled, onScrolledChange])

  // Handle scroll event
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Default values for main page
  const defaultDesktopLeftLinks = [
    { href: "/menu", label: "MENU", isActive: false },
    { href: "#o-nas", label: "O NAS", isActive: false }
  ]

  const defaultDesktopRightLinks = [
    { href: "#eventy", label: "EVENTY", isActive: false }
  ]

  const defaultMobileMenuLinks = [
    { href: "/menu", label: "MENU" },
    { href: "#o-nas", label: "O NAS" },
    { href: "#eventy", label: "EVENTY" },
    { href: "#kontakt", label: "KONTAKT" }
  ]

  const leftLinks = desktopLeftLinks.length > 0 ? desktopLeftLinks : defaultDesktopLeftLinks
  const rightLinks = desktopRightLinks.length > 0 ? desktopRightLinks : defaultDesktopRightLinks
  const mobileLinks = mobileMenuLinks.length > 0 ? mobileMenuLinks : defaultMobileMenuLinks

  return (
    <>
      <header 
        className={`fixed w-full top-0 z-50 flex-shrink-0 transition-all duration-300 ${
          localScrolled 
            ? 'bg-white shadow-md' 
            : 'bg-[var(--background)]/95 backdrop-blur-sm border-b border-[var(--secondary)]/20'
        }`}
      >
        <nav className="flex items-center justify-center px-4 md:px-6 py-3 md:py-4 max-w-7xl mx-auto w-full relative">
          {/* Mobile menu button - always visible */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="cursor-pointer text-xl md:hidden text-[var(--foreground)] hover:text-[var(--accent)] transition-colors absolute left-0 p-2"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          {/* Desktop menu - left */}
          <div className="hidden md:flex items-center gap-6 text-xs tracking-[0.15em] absolute left-0">
            {leftLinks.map((link, index) => (
              <Link 
                key={index} 
                href={link.href} 
                className={`hover:text-[var(--accent)] transition-colors ${link.isActive ? 'text-[var(--accent)]' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Logo - Clickable to home */}
          <div className="flex justify-center">
            <Link href="/">
              <img src={logoSrc} alt="Royal Restaurant" className="h-12 md:h-14 w-auto max-w-[120px] md:max-w-[140px]" />
            </Link>
          </div>

          {/* Desktop menu - right */}
          <div className="hidden md:flex items-center gap-6 text-xs tracking-[0.15em] absolute right-0">
            {rightLinks.map((link, index) => (
              <Link 
                key={index} 
                href={link.href} 
                className={`hover:text-[var(--accent)] transition-colors ${link.isActive ? 'text-[var(--accent)]' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            {reservationLink && (
              <Link 
                href={reservationLink.href} 
                className="px-4 py-2 border border-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-white transition-colors text-[10px]"
              >
                {reservationLink.label}
              </Link>
            )}
          </div>
        </nav>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 z-40 bg-[var(--background)] transition-transform duration-300 md:hidden ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
          {mobileLinks.map((link, index) => (
            <Link 
              key={index} 
              href={link.href} 
              className="text-2xl tracking-[0.2em] text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {reservationLink && (
            <button 
              className="mt-8 px-8 py-3 border-2 border-[var(--foreground)] text-[var(--foreground)] tracking-[0.2em] hover:bg-[var(--foreground)] hover:text-white transition-all"
              onClick={() => {
                if (reservationLink.onClick) {
                  reservationLink.onClick()
                }
                setMobileMenuOpen(false)
              }}
            >
              {reservationLink.label}
            </button>
          )}
        </div>
      </div>
    </>
  )
}