"use client"
import './globals.css'
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Header from "./components/Header"
import MenuSection from "./components/MenuSection"
import InstagramSection from './components/InstagramSection'
import Footer from './components/Footer'
import AboutSection from './components/AboutSection'
import EventsSection from './components/EventsSection'
import GoogleReviews from './components/GoogleReviews'
import { useLanguage } from '../lib/translations'

export default function Home() {
  const { t, language } = useLanguage()
  const [heroContent, setHeroContent] = useState(null)
  const [aboutContent, setAboutContent] = useState(null)
  const [eventsContent, setEventsContent] = useState(null)
  const [settings, setSettings] = useState(null)
  const [instagramItems, setInstagramItems] = useState([])
  const [lightboxImage, setLightboxImage] = useState(null)

  // Pobierz treści z MongoDB
  useEffect(() => {
    async function fetchContent() {
      try {
        const [heroRes, aboutRes, eventsRes, settingsRes, instagramRes] = await Promise.all([
          fetch(`/api/site-content?type=hero&lang=${language}`),
          fetch(`/api/site-content?type=about&lang=${language}`),
          fetch(`/api/site-content?type=events&lang=${language}`),
          fetch(`/api/site-content?type=settings&lang=${language}`),
          fetch(`/api/site-content?type=instagram&lang=${language}`)
        ]);
        const heroData = await heroRes.json();
        const aboutData = await aboutRes.json();
        const eventsData = await eventsRes.json();
        const settingsData = await settingsRes.json();
        const instagramData = await instagramRes.json();
        
        if (heroData.success) setHeroContent(heroData.content);
        if (aboutData.success) setAboutContent(aboutData.content);
        if (eventsData.success) setEventsContent(eventsData.content);
        if (settingsData.success) setSettings(settingsData.content);
        if (instagramData.success) setInstagramItems(instagramData.content || null);
      } catch (e) {
        console.error('Błąd pobierania treści:', e);
      }
    }
    fetchContent();
  }, [language]);

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



  return (
    <>
       <Header 
         desktopLeftLinks={[
           { href: "/menu", label: t('nav.menu') },
           { href: "#o-nas", label: t('nav.about') }
         ]}
         desktopRightLinks={[
           { href: "#eventy", label: t('nav.events') }
         ]}
         reservationLink={{
           href: "https://dineout.pl/en/restaurants/27968bce8-volla-bar-restaurant-leonardo-royal-hotel-warsaw",
           label: t('nav.reservation')
         }}
         mobileMenuLinks={[
           { href: "/menu", label: t('nav.menu') },
           { href: "#o-nas", label: t('nav.about') },
           { href: "#eventy", label: t('nav.events') },
           { href: "#kontakt", label: t('nav.contact') }
         ]}
       />
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-20 flex flex-col">
        {/* SUBTLE BACKGROUND PATTERN */}
        <div className="inset-0 pointer-events-none opacity-15">
          <div className="inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--secondary) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* HERO SECTION */}
        <section className="relative flex items-center min-h-[calc(100vh-80px)] overflow-hidden">
          {/* Tekstura tła - siatka */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `
              linear-gradient(rgba(176, 141, 141, 0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(176, 141, 141, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}></div>

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
                  <span className="text-xs tracking-[0.3em] text-[var(--accent)] uppercase font-medium">{heroContent?.badge || t('hero.badge')}</span>
                </div>

                <div className="animate-fade-up mb-8" style={{animationDelay: '0.1s'}}>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl text-[var(--foreground)] leading-[1.05]" style={{fontFamily: 'var(--font-playfair)'}}>
                    {heroContent?.title || t('hero.title')}{' '}
                    <span className="relative inline-block">
                      <span className="relative z-10 text-[var(--accent)]">{heroContent?.subtitle || t('hero.subtitle')}</span>
                      <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
                        <path d="M0,8 Q50,2 100,8 T200,8" stroke="var(--accent)" strokeWidth="3" fill="none"/>
                      </svg>
                    </span>
                    <br/>{heroContent?.suffix || t('hero.suffix')}
                  </h1>
                </div>



                {/* Description - Elegant */}
                <p className="animate-fade-up text-lg md:text-xl text-[var(--foreground-secondary)] max-w-lg mb-6 leading-relaxed" style={{animationDelay: '0.2s'}}>
                  {heroContent?.description || t('hero.description')}
                </p>

                <div className="animate-fade-up flex flex-col sm:flex-row gap-4 mb-12" style={{animationDelay: '0.25s'}}>
                  <Link href={heroContent?.ctaLink || '/menu'} className="cursor-pointer group relative px-10 py-5 bg-[var(--foreground)] text-white text-sm tracking-[0.2em] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                    <span className="relative z-10 text-center flex justify-center">{heroContent?.ctaText || t('hero.ctaText')}</span>
                    <div className="absolute inset-0 bg-[var(--accent)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                  </Link>
                  <a href={heroContent?.ctaLink2 || 'https://mojstolik.pl/restauracja/Royal%20Restuarant/66ad3368e8b621c81fe8a4cc6d86c6e2'} className="cursor-pointer px-10 py-5 border-2 border-[var(--foreground)] text-[var(--foreground)] text-sm tracking-[0.2em] hover:bg-[var(--foreground)] hover:text-white transition-all duration-300 flex items-center justify-center text-center">
                    {heroContent?.ctaText2 || t('hero.ctaText2')}
                  </a>
                </div>
              </div>

              {/* RIGHT: Editorial Bento Grid - Best 2026 Design */}
              <div className="lg:col-span-6 order-1 lg:order-2">
                <div className="relative">
                  {/* Main Bento Grid */}
                  <div className="grid grid-cols-6 grid-rows-6 gap-3 h-[500px]">
                    
                     {/* Large Main Image - Spans 4x4 */}
                     <div className="col-span-6 row-span-4 relative overflow-hidden shadow-2xl group cursor-pointer" onClick={() => heroContent?.image1 && setLightboxImage(heroContent.image1)}>
                       {heroContent?.image1 ? (
                         <img 
                           src={`${heroContent.image1}?t=${Date.now()}`} 
                           fetchPriority='high'
                           alt="Restaurant Interior" 
                           className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                         />
                       ) : (
                         <div className="w-full h-full bg-gray-800 animate-pulse"></div>
                       )}
                       <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
             
                     </div>



                     {/* Small Square 1 - Spans 2x2 */}
                     <div className="col-span-2 row-span-2 relative overflow-hidden shadow-lg group cursor-pointer" onClick={() => heroContent?.image2 && setLightboxImage(heroContent.image2)}>
                       {heroContent?.image2 ? (
                         <img 
                           src={`${heroContent.image2}?t=${Date.now()}`} 
                           alt="Dish" 
                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                         />
                       ) : (
                         <div className="w-full h-full bg-gray-800 animate-pulse"></div>
                       )}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                      </div>

                     {/* Small Square 2 - Spans 2x2 - image3 */}
                     <div className="col-span-2 row-span-2 relative overflow-hidden shadow-lg group cursor-pointer" onClick={() => {
                       if (heroContent) {
                         const imgUrl = heroContent.image3 || '/ig/2.webp';
                         setLightboxImage(imgUrl);
                       }
                     }}>
                       {!heroContent ? (
                         <div className="w-full h-full bg-gray-800 animate-pulse"></div>
                       ) : heroContent.image3 ? (
                         <img 
                           src={`${heroContent.image3}?t=${Date.now()}`} 
                           alt="Restaurant View" 
                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                         />
                       ) : (
                         <img 
                           src="/ig/2.webp" 
                           alt="Restaurant View" 
                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                         />
                       )}
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                     </div>

                     {/* Small Square 3 - Spans 2x2 - image4 */}
                     <div className="col-span-2 row-span-2 relative overflow-hidden shadow-lg group cursor-pointer" onClick={() => {
                       if (heroContent) {
                         const imgUrl = heroContent.image4 || '/ig/3.webp';
                         setLightboxImage(imgUrl);
                       }
                     }}>
                       {!heroContent ? (
                         <div className="w-full h-full bg-gray-800 animate-pulse"></div>
                       ) : heroContent.image4 ? (
                         <img 
                           src={`${heroContent.image4}?t=${Date.now()}`} 
                           alt="Dish Detail" 
                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                         />
                       ) : (
                         <img 
                           src="/ig/3.webp" 
                           alt="Dish Detail" 
                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                         />
                       )}
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                     </div>
                  </div>

                  {/* Floating decorative image - top right */}
                  <img 
                    src="/5.webp" 
                    alt="Decorative" 
                    style={{transform: "rotate(-90deg)"}}
                    className="absolute -top-18 -right-8 w-28 object-cover pointer-events-none"
                  />
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[var(--secondary)]/20 rounded-full blur-xl pointer-events-none"></div>
                </div>
              </div>

            </div>
          </div>

          {/* Scroll Indicator - wewnątrz sekcji */}
        </section>

        <AboutSection content={aboutContent} />


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
           <h2 className="text-4xl md:text-5xl text-[var(--foreground)] mt-4" style={{fontFamily: 'var(--font-playfair)'}}>
             {t('reviews.title')}
           </h2>
           <svg className="mx-auto block w-[150px] h-3 mb-2" viewBox="0 0 200 12" preserveAspectRatio="none">
             <path d="M0,8 Q50,2 100,8 T200,8" stroke="var(--accent)" strokeWidth="3" fill="none"/>
           </svg>
           <span className="text-xs tracking-[0.3em] text-[var(--accent)] uppercase font-medium">
             {t('reviews.subtitle')}
           </span>
        </div>
          <GoogleReviews/>

          </div>
        </section>
      <EventsSection content={eventsContent} />
        <InstagramSection items={instagramItems}/>
      </main>

      <Footer content={settings} />

      {/* Lightbox for hero images */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center cursor-pointer animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white text-4xl w-12 h-12 flex items-center justify-center hover:text-[var(--accent)] transition-colors animate-scale-in"
            onClick={(e) => { e.stopPropagation(); setLightboxImage(null); }}
          >
            ×
          </button>
          <img 
            src={lightboxImage} 
            alt="Fullscreen" 
            className="max-w-[90vw] max-h-[90vh] object-contain animate-zoom-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
