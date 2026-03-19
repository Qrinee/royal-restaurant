"use client"

export default function AboutSection() {
  return (
    <section className="relative py-24 bg-[var(--white)]" id="o-nas">
      {/* Subtelne tło */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--secondary) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[var(--accent)]/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[var(--secondary)]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] text-[var(--accent)] uppercase font-medium">
            Poznaj nas
          </span>
          <h2 className="text-4xl md:text-5xl text-[var(--foreground)] mt-4" style={{fontFamily: 'var(--font-playfair)'}}>
            O NAS
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[var(--accent)]"></div>
            <div className="w-2 h-2 rotate-45 bg-[var(--accent)]"></div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[var(--accent)]"></div>
          </div>
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
          src="/680A0006.jpg" 
          alt="Wnętrze restauracji Royal" 
          className="w-full h-[500px] md:h-[600px] object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
      </div>
      
      {/* Ikonka - prawy górny róg obrazka */}
      <div className="absolute -top-10 -right-50 w-100 pointer-events-none opacity-11" style={{transform: 'rotate(-90deg)', zIndex: -1}}>
        <img 
          src="/5.png" 
          alt="" 
          className="w-full h-full object-contain"
        />
      </div>
      
      <div className="absolute -top-4 -left-4 w-24 h-24 border border-[var(--accent)]/30 pointer-events-none"></div>
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
