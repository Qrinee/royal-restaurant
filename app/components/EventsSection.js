"use client"

import { useState, useEffect } from "react"
import { useLanguage } from '../../lib/translations'

export default function EventsSection() {
  const [downloadLoading, setDownloadLoading] = useState(null)
  const [eventsData, setEventsData] = useState(null)
  const { t, language } = useLanguage()

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const timestamp = Date.now()
        const url = `/api/site-content?type=events&lang=${language}&_t=${timestamp}`
        const res = await fetch(url, { credentials: 'include' })
        const data = await res.json()
        
        if (data.success && data.items && data.items.length > 0) {
          // Assuming we want the first event item
          setEventsData(data.items[0])
        }
      } catch (error) {
        console.error('Failed to fetch events data:', error)
      }
    }

    fetchEventsData()
  }, [language])

  const handleDownload = (linkType) => {
    setDownloadLoading(linkType)
    
    // Redirect to the appropriate link
    let link = ''
    if (linkType === 'spotkania' && eventsData?.ctaLink) {
      link = eventsData.ctaLink
    } else if (linkType === 'eventy' && eventsData?.ctaLink2) {
      link = eventsData.ctaLink2
    }
    
    if (link) {
      // Open in same tab
      window.location.href = link
    } else {
      // Fallback to simulation if no link is available
      setTimeout(() => {
        setDownloadLoading(null)
        alert(`Pobieranie oferty: ${linkType}`)
      }, 1000)
    }
  }

  const description = t('events.description')
  const paragraphs = description.split('\n\n')

  return (
    <section id="eventy" className="relative py-24 bg-[var(--background)] overflow-hidden">
      {/* Subtelne tło */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--secondary) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Ambient glows - ograniczone do sekcji */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[var(--accent)]/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-[var(--secondary)]/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Główna treść sekcji */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[var(--foreground)] mt-4" style={{fontFamily: 'var(--font-playfair)'}}>
            {t('events.title')}
          </h2>
          <svg className="mx-auto block w-[150px] h-3 mb-2" viewBox="0 0 200 12" preserveAspectRatio="none">
            <path d="M0,8 Q50,2 100,8 T200,8" stroke="var(--accent)" strokeWidth="3" fill="none"/>
          </svg>
          <span className="text-xs tracking-[0.3em] text-[var(--accent)] uppercase font-medium">
            {t('events.sectionTitle')}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Tekst po lewej - teraz */}
          <div className="space-y-8 order-2 lg:order-1">
            {paragraphs.map((paragraph, index) => (
              <div className="animate-fade-in" key={index} style={{animationDelay: `${index * 0.1}s`}}>
                <p className="text-xl text-[var(--foreground-secondary)] leading-relaxed">
                  {paragraph}
                </p>
              </div>
            ))}

            {/* Przyciski pobierania */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => handleDownload('spotkania')}
                disabled={downloadLoading === 'spotkania'}
                className="cursor-pointer px-6 py-3 border-2 border-[var(--foreground)] text-[var(--foreground)] text-sm tracking-[0.15em] hover:bg-[var(--foreground)] hover:text-white transition-all duration-300 disabled:opacity-50"
              >
                {downloadLoading === 'spotkania' ? 'Pobieranie...' : t('events.ctaText').toUpperCase()}
              </button>
              <button 
                onClick={() => handleDownload('eventy')}
                disabled={downloadLoading === 'eventy'}
                className="cursor-pointer px-6 py-3 bg-[var(--foreground)] text-white text-sm tracking-[0.15em] hover:bg-[var(--accent)] transition-all duration-300 disabled:opacity-50"
              >
                {downloadLoading === 'eventy' ? 'Pobieranie...' : t('events.ctaText2').toUpperCase()}
              </button>
            </div>
          </div>

          {/* Obrazek po prawej */}
          <div className="relative order-1 lg:order-2">
            <div className="relative overflow-hidden shadow-2xl">
              <img 
                src="/680A9843-Edit.webp" 
                alt="Eventy w Royal Restaurant" 
                className="w-full h-[500px] md:h-[600px] object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>
            
            
            
            <img src="/6.webp" alt="Decor" className="absolute -top-13 -right-13 w-34 h-34 object-cover  pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[var(--secondary)]/20 rounded-full blur-xl pointer-events-none"></div>
            
            <div className="absolute bottom-8 right-[-20px] bg-[var(--white)] shadow-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--accent)]/10 flex items-center justify-center">
                  <span className="text-lg text-[var(--accent)]">★</span>
                </div>
                <div>
                  <p className="text-xs tracking-widest text-[var(--accent)] mb-0.5">EVENTS</p>
                  <p className="text-sm font-medium text-[var(--foreground)]">For every occasion</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
