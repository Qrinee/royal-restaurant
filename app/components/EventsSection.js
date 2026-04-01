"use client"

import { useState } from "react"

export default function EventsSection() {
  const [downloadLoading, setDownloadLoading] = useState(null)

  const handleDownload = (type) => {
    setDownloadLoading(type)
    // Symulacja pobierania - w rzeczywistości tutaj byłby kod do pobierania PDF
    setTimeout(() => {
      setDownloadLoading(null)
      alert(`Pobieranie oferty: ${type}`)
    }, 1000)
  }

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
            EVENTY
          </h2>
          <svg className="mx-auto block w-[150px] h-3 mb-2" viewBox="0 0 200 12" preserveAspectRatio="none">
            <path d="M0,8 Q50,2 100,8 T200,8" stroke="var(--accent)" strokeWidth="3" fill="none"/>
          </svg>
          <span className="text-xs tracking-[0.3em] text-[var(--accent)] uppercase font-medium">
            Celebruj z nami
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Tekst po lewej - teraz */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="animate-fade-in">
              <p className="text-xl text-[var(--foreground-secondary)] leading-relaxed">
                W Royal Restaurant lubimy świętować razem z Gośćmi. Lubimy stoły, przy których 
                zbiera się rodzina, przyjaciele albo współpracownicy i kiedy pojawiają się toasty i 
                śmiech.
              </p>
            </div>

            <div className="animate-fade-in" style={{animationDelay: '0.1s'}}>
              <p className="text-xl text-[var(--foreground-secondary)] leading-relaxed">
                Organizujemy spotkania biznesowe i przyjęcia rodzinne, które mają być po prostu 
                miłe i bez pośpiechu. Można u nas zarezerwować część sali albo całą restaurację na 
                zamknięte wydarzenie - tak, żeby mieć przestrzeń tylko dla siebie i Gości.
              </p>
            </div>

            <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
              <p className="text-xl text-[var(--foreground-secondary)] leading-relaxed">
                Mamy własną cukiernię, więc torty i słodkości przygotowujemy od podstaw i według 
                ustaleń - takie, jakie pasują do okazji i osób, które świętują.
              </p>
            </div>

            <div className="animate-fade-in" style={{animationDelay: '0.3s'}}>
              <p className="text-xl text-[var(--foreground-secondary)] leading-relaxed">
                Lubimy też wieczory, które łączą w sobie teatr i naszą kuchnię. Jesteśmy tuż obok 
                Teatru Kwadrat, więc wielu Gości łączy spektakl z późniejszym spotkaniem przy stole 
                - na wieczorną ucztę, deser lub lampkę wina po przedstawieniu.
              </p>
            </div>

            <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
              <p className="text-xl text-[var(--foreground-secondary)] leading-relaxed">
                Jeśli planujecie większe wydarzenie, istnieje także możliwość organizacji przyjęcia w 
                przestrzeniach teatru z obsługą naszego cateringu Royal Catering. Dzięki temu 
                możemy przygotować kolację lub event dla większej liczby Gości, zachowując ten 
                sam styl i smaki naszej kuchni.
              </p>
            </div>

            {/* Przyciski pobierania */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => handleDownload('spotkania')}
                disabled={downloadLoading === 'spotkania'}
                className="cursor-pointer px-6 py-3 border-2 border-[var(--foreground)] text-[var(--foreground)] text-sm tracking-[0.15em] hover:bg-[var(--foreground)] hover:text-white transition-all duration-300 disabled:opacity-50"
              >
                {downloadLoading === 'spotkania' ? 'Pobieranie...' : 'POBIERZ OFERTĘ SPOTKAŃ'}
              </button>
              <button 
                onClick={() => handleDownload('eventy')}
                disabled={downloadLoading === 'eventy'}
                className="cursor-pointer px-6 py-3 bg-[var(--foreground)] text-white text-sm tracking-[0.15em] hover:bg-[var(--accent)] transition-all duration-300 disabled:opacity-50"
              >
                {downloadLoading === 'eventy' ? 'Pobieranie...' : 'POBIERZ OFERTĘ EVENTÓW'}
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
                  <p className="text-xs tracking-widest text-[var(--accent)] mb-0.5">EVENTY</p>
                  <p className="text-sm font-medium text-[var(--foreground)]">Na każdą okazję</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
