"use client"
import { useLanguage } from '../../lib/translations'

export default function InstagramSection() {
    const { t } = useLanguage()
    const pinIcon = "ig/pinicon.webp"
    const images = [
        {
            images: "ig/1.webp",
            link: "https://www.instagram.com/p/DPn0STtjUYE/"
        },
        {
            images: "ig/2.webp",
            link: "https://www.instagram.com/p/DQUGZ1rERUp/"
        },
        {
            images: "ig/3.webp",
            link: "https://www.instagram.com/p/DVJCiYyjKR8/"
        },
        {
            images: "ig/4.webp",
            link: "https://www.instagram.com/p/DVqw0n_DWqo/"
        }
    ]

  return (
    <section className="relative py-12 md:py-24 bg-white overflow-hidden">
      {/* Tekstura tła */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--secondary) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Ambient glows - ograniczone do sekcji */}
      <div className="absolute top-1/4 left-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-[var(--accent)]/5 rounded-full blur-[80px] md:blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[150px] md:w-[300px] h-[150px] md:h-[300px] bg-[var(--secondary)]/10 rounded-full blur-[60px] md:blur-[120px] pointer-events-none"></div>

      {/* Główna treść sekcji */}
      <div className="relative z-10">
        <div className="text-center mb-8 md:mb-16 px-4">
          <span className="text-xs tracking-[0.3em] text-[var(--accent)] uppercase font-medium">
            @royalrestaurant_warsaw
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-[var(--foreground)] mt-4" style={{fontFamily: 'var(--font-playfair)'}}>
            {t('instagram.title')}
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4 md:mt-6">
            <div className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent to-[var(--accent)]"></div>
            <div className="w-2 h-2 rotate-45 bg-[var(--accent)]"></div>
            <div className="w-12 md:w-16 h-px bg-gradient-to-l from-transparent to-[var(--accent)]"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 md:px-8 max-w-7xl mx-auto">
        {
            images.map((src, index) => (
                <a href={src.link} target="_blank" key={index} className="block">
                    <div className="relative aspect-square overflow-hidden cursor-pointer group">
                        <img 
                            src={pinIcon} 
                            alt="Pin Icon" 
                            className="absolute top-3 left-3 w-7 h-7 z-30 opacity-80 select-none" 
                        />
                        <img 
                            src={src.images} 
                            alt={`Instagram ${index + 1}`} 
                            className="object-cover object-top w-full h-full group-hover:grayscale transition-all" 
                        />
                    </div>
                </a>
            ))
        }
        </div>
      </div>
    </section>
  )
}
