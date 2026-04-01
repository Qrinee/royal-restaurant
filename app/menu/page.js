"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Pobierz dane menu z API
  useEffect(() => {
    async function fetchMenuData() {
      try {
        const response = await fetch('/api/menu')
        const data = await response.json()
        
        if (data.success && data.items) {
          setMenuItems(data.items)
        }
      } catch (err) {
        console.error('Error fetching menu:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchMenuData()
  }, [])

  return (
    <>
      <Header 
        desktopLeftLinks={[
          { href: "/menu", label: "MENU", isActive: true },
          { href: "/#o-nas", label: "O NAS" }
        ]}
        reservationLink={{
          href: "/#rezerwacja",
          label: "REZERWACJA"
        }}
        mobileMenuLinks={[
          { href: "/menu", label: "MENU" },
          { href: "/#o-nas", label: "O NAS" },
          { href: "/#wina", label: "WINE" },
          { href: "/#kontakt", label: "KONTAKT" }
        ]}
        logoSrc="/fdsa.webp"
      />
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col pt-16">

        {/* MENU SECTION */}
        <section className="relative py-24 bg-[var(--background)] flex-1">
          {/* Teksturowane jasne tło z ikonami */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, var(--secondary) 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }}></div>
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, var(--accent) 20px, var(--accent) 21px)`
            }}></div>
            <img src="/5.webp" alt="" className="absolute top-10 left-[5%] w-20 h-20 opacity-8 rotate-12" style={{filter: 'blur(0.5px)'}} />
            <img src="/5.webp" alt="" className="absolute top-40 right-[10%] w-28 h-28 opacity-8 -rotate-12" style={{filter: 'blur(0.5px)'}} />
            <img src="/5.webp" alt="" className="absolute bottom-40 left-[15%] w-24 h-24 opacity-8 rotate-45" style={{filter: 'blur(0.5px)'}} />
            <img src="/5.webp" alt="" className="absolute bottom-20 right-[20%] w-20 h-20 opacity-8 -rotate-6" style={{filter: 'blur(0.5px)'}} />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <span className="text-xs tracking-[0.3em] text-[var(--accent)] uppercase font-medium">Wybierz</span>
              <h2 className="text-4xl md:text-5xl text-[var(--foreground)] mt-4" style={{fontFamily: 'var(--font-playfair)'}}>MENU</h2>
              <div className="flex items-center justify-center gap-4 mt-6">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-[var(--accent)]"></div>
                <div className="w-2 h-2 rotate-45 bg-[var(--accent)]"></div>
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-[var(--accent)]"></div>
              </div>
            </div>

            {/* Paper effect */}
            <div className="relative">
              <div className="absolute inset-0 bg-[var(--secondary)]/20 transform rotate-1 translate-x-1 translate-y-1 rounded-sm"></div>
              <div className="relative bg-[#FDFBF7] shadow-xl rounded-sm p-6 md:p-10">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-sm" style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 28px, var(--secondary) 28px, var(--secondary) 29px)`
                }}></div>

                <div className="relative space-y-8">
                  {loading ? (
                    <div className="text-center py-8">
                      <p className="text-[var(--foreground-muted)]">Ładowanie menu...</p>
                    </div>
                  ) : error ? (
                    <div className="text-center py-8">
                      <p className="text-red-500">Błąd: {error}</p>
                    </div>
                  ) : menuItems.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-[var(--foreground-muted)]">Brak pozycji w menu</p>
                    </div>
                  ) : (
                    Object.entries(
                      menuItems.reduce((acc, item) => {
                        const cat = item.category || 'POZYCJE'
                        if (!acc[cat]) {
                          acc[cat] = { title: cat, subtitle: '', items: [] }
                        }
                        acc[cat].items.push({
                          name: item.name,
                          description: item.description || '',
                          english: item.english || '',
                          price: item.price,
                          tag: item.tag,
                          priority: item.priority || 0
                        })
                        return acc
                      }, {})
                    )
                    .sort((a, b) => {
                      const categoryOrder = [
                        'MENU SEZONOWE',
                        'SAŁATY',
                        'PRZEKĄSKI',
                        'DANIA GŁÓWNE',
                        'DESERY',
                        'KAWY I HERBATY',
                        'NAPOJE',
                        'PROSECCO & CHAMPAGNE',
                        'WINA NA KIELISZKI',
                        'WINA BIAŁE',
                        'WINA CZERWONE',
                        'PIWA BUTELKOWE BEZALKOHOLOWE',
                        'PIWO LANE',
                        'PIWA BUTELKOWE',
                        'ALKOHOL',
                        'WÓDKI POLSKIE',
                        'KOKTAJLE',
                        'ZIMNE ORZEŹWIENIE',
                        'BĄBELKI',
                        'LEMONIADY',
                        'KOKTAJLE BEZALKOHOLOWE'
                      ]
                      const aIndex = categoryOrder.indexOf(a[0])
                      const bIndex = categoryOrder.indexOf(b[0])
                      if (aIndex === -1 && bIndex === -1) return a[0].localeCompare(b[0])
                      if (aIndex === -1) return 1
                      if (bIndex === -1) return -1
                      return aIndex - bIndex
                    })
                    .map(([cat, data], idx) => (
                      <MenuCategory key={idx} title={data.title} subtitle={data.subtitle} items={data.items} />
                    ))
                  )}

                  {/* Note at bottom */}
                  <div className="text-center pt-8 border-t border-[var(--secondary)]/20">
                    <p className="text-md text-[var(--foreground-muted)]">
                      Do rachunku doliczamy 10% opłaty serwisowej.<br/>
                      A 10% service charge will be added to your bill.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

function MenuCategory({ title, subtitle, items }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="border-b border-[var(--secondary)]/30 last:border-b-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between py-3 text-left hover:text-[var(--accent)] transition-colors group">
        <div>
          <h3 className="text-xl md:text-2xl text-[#1a1a1a]" style={{fontFamily: 'var(--font-playfair)'}}>{title}</h3>
          {subtitle && <p className="text-xs tracking-[0.2em] text-[var(--accent)]">{subtitle}</p>}
        </div>
        <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="pb-4 space-y-3">
          {items.sort((a, b) => (b.priority || 0) - (a.priority || 0)).map((item, index) => (
            <div key={index} className="group hover:pl-2 transition-all duration-200">
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-base text-[#1a1a1a]">{item.name}</h4>
                    {item.tag && <span className="text-[9px] px-1.5 py-0.5 bg-[var(--accent)]/10 text-[var(--accent)] uppercase tracking-wider">{item.tag}</span>}
                  </div>
                  {item.description && <p className="text-xs text-[#4a4a4a] leading-snug">{item.description}</p>}
                  {item.english && <p className="text-[10px] text-[#888888] italic leading-snug">{item.english}</p>}
                </div>
                <span className="text-sm text-[#1a1a1a] font-medium whitespace-nowrap ml-2">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
