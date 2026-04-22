"use client"
import { useLanguage } from '../../lib/translations'

export default function AboutSection() {
  const { t } = useLanguage()
  
  return (
    <section className="relative py-24 bg-[var(--white)] overflow-hidden" id="o-nas">
      {/* Subtelne tło */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--secondary) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Ambient glows - ograniczone do sekcji */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[var(--accent)]/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[var(--secondary)]/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Główna treść sekcji */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h2 className="text-4xl text-center md:text-5xl text-[var(--foreground)] mt-4" style={{fontFamily: 'var(--font-playfair)'}}>
            {t('about.title')}
          </h2>
        <div className="text-center mb-16">
   

          <svg className="mx-auto block w-[150px] h-3 mb-2" viewBox="0 0 200 12" preserveAspectRatio="none">
                        <path d="M0,8 Q50,2 100,8 T200,8" stroke="var(--accent)" strokeWidth="3" fill="none"/>
                      </svg>

                             <span className="text-xs tracking-[0.3em] text-[var(--accent)] uppercase font-medium">
            {t('about.sectionTitle')}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <AboutImage />
          
          <AboutText />
          
        </div>
      </div>
    </section>
  )
}

function AboutImage() {
  return (
    <div className="relative">
      <div className="relative overflow-hidden shadow-2xl">
        <img 
          src="/680A0006.webp" 
          alt="Wnętrze restauracji Royal" 
          className="w-full h-[500px] md:h-[600px] object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
      </div>

      
      <img src="/6.webp" alt="Decor" className="absolute -top-10 -left-10 w-30 h-30 object-cover  pointer-events-none" />
      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--secondary)]/20 rounded-full blur-xl pointer-events-none"></div>
      
      <div className="absolute bottom-8 left-[-20px] bg-[var(--white)] shadow-lg p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--accent)]/10 flex items-center justify-center">
            <span className="text-lg text-[var(--accent)]">★</span>
          </div>
          <div>
            <p className="text-xs tracking-widest text-[var(--accent)] mb-0.5">TRADYCJA</p>
            <p className="text-sm font-medium text-[var(--foreground)]">Polskie smaki</p>
          </div>
        </div>
      </div>
    </div>
  )
}


function AboutText() {
  const { t } = useLanguage()
  const description = t('about.description')
  const paragraphs = description.split('\n\n')
  
  return (
    <div className="space-y-8">
      {paragraphs.map((paragraph, index) => (
        <div className="animate-fade-in" key={index} style={{animationDelay: `${index * 0.1}s`}}>
          <p className="text-xl text-[var(--foreground-secondary)] leading-relaxed">
            {paragraph}
          </p>
        </div>
      ))}



      <p className="text-xs tracking-[0.2em] text-[var(--accent)] italic" style={{fontFamily: 'var(--font-playfair)'}}>
        — Royal Restaurant Team
      </p>
    </div>
  )
}
