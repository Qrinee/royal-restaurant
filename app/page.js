"use client"
import './globals.css'
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import MenuSection from "./components/MenuSection"
import InstagramSection from './components/InstagramSection'
import Footer from './components/Footer'
import AboutSection from './components/AboutSection'
import EventsSection from './components/EventsSection'

export default function Home() {
  const [mobileMenuOpen,setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Obsługa scroll - zoptymalizowana
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50)
  }, [])

  // Ukrycie linku w widgetach Elfsight (tylko raz po zamontowaniu)
  useEffect(() => {
    const hideElfsightLinks = () => {
      // Szukamy linków w widgetach Google Reviews
      const elfsightLinks = document.querySelectorAll('.eapps-google-reviews-f2b5c943-5ddf-4d51-b347-de8723102d4f a')
      elfsightLinks.forEach(link => {
        if (link.textContent?.includes('Google') || link.textContent?.includes('Reviews')) {
          link.style.display = 'none'
        }
      })
    }
    
    // Wykonaj od razu
    hideElfsightLinks()
    
    // I po załadowaniu widgetu
    const observer = new MutationObserver(hideElfsightLinks)
    observer.observe(document.body, { childList: true, subtree: true })
    
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <>
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-20 flex flex-col">
        {/* SUBTLE BACKGROUND PATTERN */}
        <div className="inset-0 pointer-events-none opacity-15">
          <div className="inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--secondary) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* HEADER - STICKY */}
        <header className={`fixed w-full top-0 z-50 flex-shrink-0 transition-all duration-300 ${
          scrolled 
            ? 'bg-white' 
            : 'bg-[var(--background)]/95 backdrop-blur-sm border-b border-[var(--secondary)]/20'
        }`}>
          <nav className="flex items-center justify-center px-4 md:px-6 py-3 md:py-4 max-w-7xl mx-auto w-full relative">
            {/* Mobile menu button - always visible */}
            <button
              onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}
              className="cursor-pointer text-xl md:hidden text-[var(--foreground)] hover:text-[var(--accent)] transition-colors absolute left-0 p-2"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>

            {/* Desktop menu - left */}
            <div className="hidden md:flex items-center gap-6 text-xs tracking-[0.15em] absolute left-0">
              <Link href="/menu" className="hover:text-[var(--accent)] transition-colors">MENU</Link>
              <Link href="#o-nas" className="hover:text-[var(--accent)] transition-colors">O NAS</Link>
            </div>

            {/* Logo */}
            <div className="flex justify-center">
              <Link href="/">
                <img src="/logo.webp" alt="Royal Restaurant" className="h-8 md:h-10" style={{width: '80px'}} />
              </Link>
            </div>

            {/* Desktop menu - right */}
            <div className="hidden md:flex items-center gap-6 text-xs tracking-[0.15em] absolute right-0">
              <Link href="#eventy" className="hover:text-[var(--accent)] transition-colors">EVENTY</Link>
              <Link href="https://dineout.pl/en/restaurants/27968bce8-volla-bar-restaurant-leonardo-royal-hotel-warsaw" className="px-4 py-2 border border-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-white transition-colors text-[10px]">
                REZERWACJA
              </Link>
            </div>
          </nav>
        </header>

        {/* MOBILE MENU OVERLAY */}
        <div className={`fixed inset-0 z-40 bg-[var(--background)] transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
            <Link href="/menu" className="text-2xl tracking-[0.2em] text-[var(--foreground)] hover:text-[var(--accent)] transition-colors" onClick={() => setMobileMenuOpen(false)}>MENU</Link>
            <Link href="#o-nas" className="text-2xl tracking-[0.2em] text-[var(--foreground)] hover:text-[var(--accent)] transition-colors" onClick={() => setMobileMenuOpen(false)}>O NAS</Link>
            <Link href="#eventy" className="text-2xl tracking-[0.2em] text-[var(--foreground)] hover:text-[var(--accent)] transition-colors" onClick={() => setMobileMenuOpen(false)}>EVENTY</Link>
            <Link href="#kontakt" className="text-2xl tracking-[0.2em] text-[var(--foreground)] hover:text-[var(--accent)] transition-colors" onClick={() => setMobileMenuOpen(false)}>KONTAKT</Link>
            <button className="mt-8 px-8 py-3 border-2 border-[var(--foreground)] text-[var(--foreground)] tracking-[0.2em] hover:bg-[var(--foreground)] hover:text-white transition-all" onClick={() => setMobileMenuOpen(false)}>REZERWACJA</button>
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="relative flex items-center min-h-[calc(100vh-80px)] overflow-hidden">
          {/* Tekstura tła - siatka */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(176, 141, 141, 0.12) 1px, transparent 1px),
                linear-gradient(90deg, rgba(176, 141, 141, 0.12) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          {/* Tekstura diagonalnych linii */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              var(--accent) 10px,
              var(--accent) 11px
            )`
          }}></div>

          {/* Tekstura punktowa w rogu */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--accent) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>

          {/* Ambient Glows - ograniczone do sekcji */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[var(--accent)]/5 rounded-full blur-[180px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[var(--secondary)]/10 rounded-full blur-[150px] pointer-events-none"></div>

          {/* Główna treść sekcji */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-6 order-2 lg:order-1">

                <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 border border-[var(--accent)]/50 bg-[var(--accent)]/8 mb-8">
                  <span className="text-xs tracking-[0.3em] text-[var(--accent)] uppercase font-medium">ROYAL RESTAURANT</span>
                </div>

                <div className="animate-fade-up mb-8" style={{animationDelay: '0.1s'}}>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl text-[var(--foreground)] leading-[1.05]" style={{fontFamily: 'var(--font-playfair)'}}>
                    Miejsce codziennych{' '}
                    <span className="relative inline-block">
                      <span className="relative z-10 text-[var(--accent)]">spotkań</span>
                      <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
                        <path d="M0,8 Q50,2 100,8 T200,8" stroke="var(--accent)" strokeWidth="3" fill="none"/>
                      </svg>
                    </span>
                    <br/>przy polskim stole
                  </h1>
                </div>

                {/* Decorative Line */}
                <div className="animate-fade-up flex items-center gap-4 mb-8" style={{animationDelay: '0.15s'}}>
                  <div className="w-20 h-px bg-gradient-to-r from-transparent to-[var(--accent)]"></div>
                  <div className="w-2.5 h-2.5 rotate-45 bg-[var(--accent)]"></div>
                  <div className="w-20 h-px bg-gradient-to-l from-transparent to-[var(--accent)]"></div>
                </div>

                {/* Description - Elegant */}
                <p className="animate-fade-up text-lg md:text-xl text-[var(--foreground-secondary)] max-w-lg mb-6 leading-relaxed" style={{animationDelay: '0.2s'}}>
                  Czekamy na Was od poniedziałku do piątku od 12:00 do 22:00,
                  a w weekendowe poranki zapraszamy już od 9:00 na spokojne śniadania
                </p>

                {/* Pyszne.pl info */}


                {/* CTAs */}
                <div className="animate-fade-up flex flex-col sm:flex-row gap-4 mb-12" style={{animationDelay: '0.25s'}}>
                  <Link href="/menu" className="cursor-pointer group relative px-10 py-5 bg-[var(--foreground)] text-white text-sm tracking-[0.2em] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                    <span className="relative z-10 text-center flex justify-center">ZOBACZ MENU</span>
                    <div className="absolute inset-0 bg-[var(--accent)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                  </Link>
                  <a href='https://dineout.pl/en/restaurants/27968bce8-volla-bar-restaurant-leonardo-royal-hotel-warsaw' className="cursor-pointer px-10 py-5 border-2 border-[var(--foreground)] text-[var(--foreground)] text-sm tracking-[0.2em] hover:bg-[var(--foreground)] hover:text-white transition-all duration-300">
                    ZAREZERWUJ
                  </a>
                </div>
              </div>

              {/* RIGHT: Editorial Bento Grid - Best 2026 Design */}
              <div className="lg:col-span-6 order-1 lg:order-2">
                <div className="relative">
                  {/* Main Bento Grid */}
                  <div className="grid grid-cols-6 grid-rows-6 gap-3 h-[500px]">
                    
                    {/* Large Main Image - Spans 4x4 */}
                    <div className="col-span-6 row-span-4 relative   overflow-hidden shadow-2xl group cursor-pointer">
                      <img 
                        src="/680A9843-Edit.webp" 
                        fetchPriority='high'
                        alt="Restaurant Interior" 
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            
                    </div>



                    {/* Small Square 1 - Spans 2x2 */}
                    <div className="col-span-2 row-span-2 relative  overflow-hidden shadow-lg group cursor-pointer">
                      <img 
                        src="/20260309_1554_Image Generation_remix_01kk9her3sfy686518tepp89zj.webp" 
                        alt="Dish" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                    </div>

                    {/* Info Card - Spans 2x2 */}
                    <div className="col-span-2 row-span-2  bg-white shadow-lg p-4 flex flex-col justify-between">
                      <div>
                        <p className="text-xs tracking-widest text-[var(--accent)] mb-1">GODZINY</p>
                        <p className="text-sm font-medium text-[var(--foreground)]">Pn-Pt: 12:00-22:00</p>
                        <p className="text-sm font-medium text-[var(--foreground)]">Sob-Nd: 9:00-22:00</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[var(--accent)]/10 flex items-center justify-center">
                          <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Small decorative element */}
                    <div className="col-span-2 row-span-2  bg-gradient-to-br from-[var(--accent)]/20 to-[var(--secondary)]/20 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, var(--accent)/30 1px, transparent 0)`,
                        backgroundSize: '8px 8px'
                      }}></div>
                      <div className="w-12 h-12 rounded-full border border-[var(--accent)]/30 flex items-center justify-center">
                        <span className="text-xl text-[var(--accent)]">★</span>
                      </div>
                    </div>
                  </div>

                  {/* Floating decorative circles - ograniczone do kontenera */}
                  <div className="absolute -top-8 -right-8 w-24 h-24 border border-[var(--accent)]/20 rounded-full pointer-events-none"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[var(--secondary)]/20 rounded-full blur-xl pointer-events-none"></div>
                </div>
              </div>

            </div>
          </div>

          {/* Scroll Indicator - wewnątrz sekcji */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
            <span className="text-[10px] tracking-[0.2em] text-[var(--foreground-muted)]">PRZEWIŃ</span>
            <div className="w-5 h-8 border border-[var(--secondary)] rounded-full flex justify-center pt-1.5">
              <div className="w-1 h-1.5 bg-[var(--accent)] rounded-full animate-bounce"></div>
            </div>
          </div>
        </section>

        <AboutSection />


        {/* OPINIE SECTION - z tłem jak Hero */}
        <section className="relative py-20 bg-[var(--white)]">
          {/* Tło jak w Hero - siatka */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(176, 141, 141, 0.12) 1px, transparent 1px),
                linear-gradient(90deg, rgba(176, 141, 141, 0.12) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          {/* Tekstura diagonalnych linii */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              var(--accent) 10px,
              var(--accent) 11px
            )`
          }}></div>

          {/* Ambient Glows */}
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[var(--accent)]/5 rounded-full blur-[150px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[var(--secondary)]/10 rounded-full blur-[120px] pointer-events-none"></div>

          {/* Treść sekcji */}
          <div className="relative z-10  mx-auto px-6">
       <div className="text-center">
          <span className="text-xs tracking-[0.3em] text-[var(--accent)] uppercase font-medium">
            Naszych gości
          </span>
          <h2 className="text-4xl md:text-5xl text-[var(--foreground)] mt-4" >
            OPINIE
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[var(--accent)]"></div>
            <div className="w-2 h-2 rotate-45 bg-[var(--accent)]"></div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[var(--accent)]"></div>
          </div>
        </div>
<iframe id="reviews-iframe" src={"https://f2b5c9435ddf4d51b347de8723102d4f.elf.site"} style={{border: 'none', width: '100%', minHeight: '600px', marginTop: '30px'}}></iframe>
   
          </div>
        </section>
      <EventsSection />
        <InstagramSection/>
      </main>

      <Footer />
    </>
  )
}
