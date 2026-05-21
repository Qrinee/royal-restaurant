"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "../../lib/translations"


export default function Footer({ content }) {
  const [footerContent, setFooterContent] = useState(content)
  const currentYear = new Date().getFullYear()
  const { t } = useLanguage()

  useEffect(() => {
    if (content) {
      setFooterContent(content)
    }
    async function fetchFooter() {
      try {
        const res = await fetch('/api/site-content?type=footer')
        const data = await res.json()
        if (data.success && data.content) {
          setFooterContent(data.content)
        }
      } catch (e) {
        console.error('Błąd pobierania stopki:', e)
      }
    }
    // Always fetch from footer type (not settings) to avoid stale data
    fetchFooter()
  }, [content])

  const address = footerContent?.address || 'Marszałkowska 138, 00-001 Warszawa'
  const phone = footerContent?.phone || '+48 696 566 633'
  const restaurantName = footerContent?.restaurantName || 'Royal Restaurant'
  const fbLink = footerContent?.socialLinks?.facebook || footerContent?.facebook || 'https://www.facebook.com/RoyalRestaurantWarsaw/'
  const igLink = footerContent?.socialLinks?.instagram || footerContent?.instagram || 'https://www.instagram.com/royalrestaurant_warsaw'
  const mondayFridayHours = footerContent?.mondayFriday || footerContent?.openingHours?.[0]?.hours || '12:00 - 22:00'
  const saturdayHours = footerContent?.saturday || footerContent?.openingHours?.[1]?.hours || '9:00 - 22:00'
  const sundayHours = footerContent?.sunday || footerContent?.openingHours?.[2]?.hours || '9:00 - 22:00'

  return (
    <footer className="relative bg-[#1a1a1a] text-white pt-16 pb-8 overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      {/* Główna treść stopki */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
                <img src={'logo2.webp'} alt="Royal Restaurant" className="h-10 w-auto" />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {t('footer.description') || 'Wyjątkowe miejsce, gdzie tradycyjna polska kuchnia spotyka domową atmosferę.'}
            </p>
            <div className="flex gap-4">
              <a 
                href={fbLink} 
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href={igLink} 
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300"
                aria-label
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-sm tracking-[0.2em] text-[var(--accent)] mb-6 font-medium">{t('footer.openingHours')}</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-white/70 text-sm">{t('footer.mondayFriday')}</span>
                <span className="text-white font-medium">{mondayFridayHours}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-white/70 text-sm">{t('footer.saturday')}</span>
                <span className="text-white font-medium">{saturdayHours}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-white/70 text-sm">{t('footer.sunday')}</span>
                <span className="text-white font-medium">{sundayHours}</span>
              </div>
            </div>
          </div>

          {/* Pyszne.pl & Uber Eats */}
          <div>
            <h4 className="text-sm tracking-[0.2em] text-[var(--accent)] mb-6 font-medium">{t('footer.orderOnline')}</h4>
            <div className="space-y-4">
              <a 
                href="https://www.pyszne.pl/en/menu/royal-restaurant-warszawa"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="bg-white/5 p-4 rounded-sm border border-white/10 group-hover:border-orange-500/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-500 rounded-sm flex items-center justify-center">
                      <img src="/channels4_profile.webp" alt="Pyszne.pl" className="w-full h-full " />
                    </div>
                    <div>
                      <p className="text-white/90 font-medium">{t('footer.orderPyszne')}</p>
                      <p className="text-white/50 text-xs">{t('footer.orderSubtext')}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-white/60 text-xs group-hover:text-orange-400 transition-colors">{t('footer.orderOnline')}</span>
                    <svg className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </a>

              <a 
                href="https://www.ubereats.com/pl-en/store/royal-restaurant/NhxUTfseVmOP6E3QsI3-SQ?srsltid=AfmBOoq8blmCjJToPlg3ZH5ifx9Y3n-YcMM6Py2i6gX249kMCDb-xJT2"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="bg-white/5 p-4 rounded-sm border border-white/10 group-hover:border-[#06C167]/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#06C167] rounded-sm flex items-center justify-center p-2.5 flex-shrink-0">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="text-white w-full h-full">
                        <path d="M0 2.75V7.84C0 9.76 1.34 11.03 3.08 11.03C3.93 11.03 4.69 10.7 5.23 10.13V10.89H6.44V2.75H5.22V7.77C5.22 9.06 4.35 9.93 3.22 9.93C2.08 9.93 1.22 9.08 1.22 7.77V2.75H0M7.35 2.75V10.89H8.5V10.14A2.96 2.96 0 0 0 10.63 11.03A3.09 3.09 0 0 0 13.74 7.93A3.09 3.09 0 0 0 10.63 4.83C9.8 4.83 9.06 5.17 8.5 5.71V2.75H7.35M17.26 4.84C15.5 4.84 14.21 6.25 14.21 7.92C14.21 9.69 15.58 11 17.36 11C18.44 11 19.33 10.54 19.92 9.75L19.07 9.12C18.63 9.71 18.05 10 17.36 10C16.36 10 15.56 9.27 15.4 8.31H20.22V7.92C20.22 6.16 18.97 4.84 17.26 4.84M23.45 4.91C22.8 4.91 22.33 5.21 22.04 5.69V4.96H20.87V10.89H22.05V7.5C22.05 6.6 22.61 6 23.37 6H23.86V4.91H23.45M17.23 5.86C18.11 5.86 18.84 6.47 19.04 7.38H15.42C15.63 6.47 16.36 5.86 17.23 5.86M10.55 5.88C11.66 5.88 12.58 6.78 12.58 7.93C12.58 9.07 11.66 10 10.55 10A2.04 2.04 0 0 1 8.5 7.93C8.5 6.78 9.42 5.88 10.55 5.88M0 12.96V21.1H5.72V19.71H1.55V17.69H5.61V16.34H1.55V14.35H5.72V12.96H0M14.56 13.38V15.09H13.4V16.45H14.56V19.65C14.56 20.46 15.13 21.1 16.16 21.1H17.8V19.74H16.66C16.31 19.74 16.09 19.58 16.09 19.26V16.45H17.8V15.09H16.09V13.38H14.56M9.32 14.94C7.53 14.94 6.12 16.34 6.12 18.1C6.12 19.85 7.53 21.25 9.32 21.25C10.04 21.25 10.71 21 11.24 20.56V21.1H12.76V15.09H11.24V15.63A2.96 2.96 0 0 0 9.32 14.94M21.04 14.94C19.45 14.94 18.34 15.59 18.34 16.86C18.34 17.73 18.95 18.3 20.27 18.58L21.72 18.92C22.29 19.03 22.44 19.18 22.44 19.42C22.44 19.79 22 20.03 21.31 20.03C20.44 20.03 19.94 19.83 19.74 19.17H18.21C18.43 20.42 19.36 21.25 21.26 21.25C23 21.25 24 20.42 24 19.26C24 18.44 23.42 17.83 22.19 17.57L20.9 17.3C20.15 17.16 19.91 17 19.91 16.74C19.91 16.38 20.27 16.16 20.94 16.16C21.66 16.16 22.19 16.36 22.34 17H23.86C23.78 15.77 22.87 14.94 21.04 14.94M9.45 16.26C10.46 16.26 11.27 17.07 11.27 18.1S10.46 19.93 9.45 19.93A1.82 1.82 0 0 1 7.62 18.1C7.62 17.07 8.45 16.26 9.45 16.26Z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-white/90 font-medium">{t('footer.orderUberEats')}</p>
                      <p className="text-white/50 text-xs">{t('footer.orderSubtext')}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-white/60 text-xs group-hover:text-[#06C167] transition-colors">{t('footer.orderOnline')}</span>
                    <svg className="w-4 h-4 text-[#06C167] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm tracking-[0.2em] text-[var(--accent)] mb-6 font-medium">{t('footer.contact')}</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white/90 text-sm"></p>
                  <p className="text-white/60 text-sm">{address.split(',')[1] || address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div>
                  <a href={`tel:${phone}`} className="text-white/90 text-sm hover:text-[var(--accent)] transition-colors">
                    {phone}
                  </a>
                </div>
              </div>

            </div>
          </div>

 
        </div>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-full h-px bg-gradient-to-r from-transparent to-white/20"></div>
          <div className="w-2 h-2 rotate-45 bg-[var(--accent)]"></div>
          <div className="w-full h-px bg-gradient-to-l from-transparent to-white/20"></div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40 ">
          <p className="text-center w-full">{footerContent?.description || `© ${currentYear} Royal Restaurant. Wszystkie prawa zastrzeżone.`}</p>
        </div>
      </div>
    </footer>
  )
}

