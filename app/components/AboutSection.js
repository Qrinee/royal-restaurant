export default function AboutSection() {
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
            O NAS
          </h2>
        <div className="text-center mb-16">
   

          <svg className="mx-auto block w-[150px] h-3 mb-2" viewBox="0 0 200 12" preserveAspectRatio="none">
                        <path d="M0,8 Q50,2 100,8 T200,8" stroke="var(--accent)" strokeWidth="3" fill="none"/>
                      </svg>

                             <span className="text-xs tracking-[0.3em] text-[var(--accent)] uppercase font-medium">
            Poznaj nas
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
  return (
    <div className="space-y-8">
      <div className="animate-fade-in">
        <p className="text-xl text-[var(--foreground-secondary)] leading-relaxed">
          W Royal Restaurant lubimy, kiedy przy stole dzieje się życie. Kiedy rozmowy płyną 
          swobodnie, a dania krążą między Gośćmi. Kiedy ktoś mówi „weź spróbuj" i przesuwa 
          talerz bliżej środka. Lubimy momenty, w których nikt się nie spieszy. Kiedy szybki 
          obiad zamienia się w długie spotkanie, a kolacja w fascynujący wieczór, który chce 
          się przedłużać bez końca.
        </p>
      </div>

      <div className="animate-fade-in" style={{animationDelay: '0.1s'}}>
        <p className="text-xl text-[var(--foreground-secondary)] leading-relaxed">
          Lubimy tradycyjne polskie smaki, które wszyscy dobrze znamy - takie, do których 
          wraca się z przyjemnością i które najlepiej smakują razem. Dlatego nasze stoły 
          często wypełniają się dokładkami zamawianymi pod hasłem „jeszcze raz dla 
          wszystkich".
        </p>
      </div>

      <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
        <p className="text-xl text-[var(--foreground-secondary)] leading-relaxed">
          Cieszy nas stukot sztućców, rozmowy ponad talerzami i cisza, która zapada, kiedy 
          jedzenie naprawdę smakuje. Bo Royal Restaurant to miejsce, w którym 
          najważniejsze jest wspólne bycie przy stole - swobodnie, serdecznie i po polsku.
        </p>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <div className="w-20 h-px bg-gradient-to-r from-transparent to-[var(--accent)]"></div>
        <div className="w-2.5 h-2.5 rotate-45 bg-[var(--accent)]"></div>
        <div className="w-20 h-px bg-gradient-to-l from-transparent to-[var(--accent)]"></div>
      </div>

      <p className="text-xs tracking-[0.2em] text-[var(--accent)] italic" style={{fontFamily: 'var(--font-playfair)'}}>
        — Zespół Royal Restaurant
      </p>
    </div>
  )
}
