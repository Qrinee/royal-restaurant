"use client";

export default function LivePreview({ type, content, items }) {
  if (!content && (!items || items.length === 0)) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-sm">Brak danych do podglądu</p>
        <p className="text-xs mt-1 text-gray-600">Wprowadź dane i zapisz</p>
      </div>
    );
  }

  switch (type) {
    case 'hero': return <HeroPreview content={content} />;
    case 'about': return <AboutPreview content={content} />;
    case 'events': return <EventsPreview items={items} />;
    case 'instagram': return <InstagramPreview content={content} />;
    case 'footer': return <FooterPreview content={content} />;
    default: return <p className="text-gray-500 text-sm">Wybierz sekcję</p>;
  }
}

function HeroPreview({ content }) {
  const ct = content || {};
  return (
    <div className="rounded-lg overflow-hidden border border-gray-700" style={{ '--foreground': '#1a1a1a', '--foreground-secondary': '#5a5a5a', '--accent': '#b08d8d', '--secondary': '#d4c5a9', '--background': '#FDFBF7' }}>
      <section className="relative flex items-center min-h-[420px] bg-[var(--background)] overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(176,141,141,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(176,141,141,0.12) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, var(--accent) 8px, var(--accent) 9px)' }} />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[var(--accent)]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[var(--secondary)]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 w-full px-4 py-6">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-7">
              {ct.badge && (<div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[var(--accent)]/50 bg-[var(--accent)]/8 mb-4"><span className="text-[10px] tracking-[0.3em] text-[var(--accent)] uppercase font-medium">{ct.badge}</span></div>)}
              <div className="mb-4">
                <h1 className="text-2xl md:text-3xl text-[var(--foreground)] leading-[1.05]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                  {ct.title || 'Tytuł'}
                  {ct.subtitle && (<span className="relative inline-block ml-2"><span className="relative z-10 text-[var(--accent)]">{ct.subtitle}</span><svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 200 12" preserveAspectRatio="none"><path d="M0,8 Q50,2 100,8 T200,8" stroke="var(--accent)" strokeWidth="3" fill="none" /></svg></span>)}
                  {ct.suffix && (<><br /><span className="italic">{ct.suffix}</span></>)}
                </h1>
              </div>
              {ct.description && (<p className="text-xs md:text-sm text-[var(--foreground-secondary)] max-w-md mb-4 leading-relaxed">{ct.description}</p>)}
              <div className="flex gap-2 flex-wrap">
                {ct.ctaText && (<span className="cursor-pointer group relative px-5 py-2.5 bg-[var(--foreground)] text-white text-[10px] tracking-[0.2em] overflow-hidden shadow-lg"><span className="relative z-10">{ct.ctaText}</span><div className="absolute inset-0 bg-[var(--accent)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" /></span>)}
                {ct.ctaText2 && (<span className="cursor-pointer px-5 py-2.5 border-2 border-[var(--foreground)] text-[var(--foreground)] text-[10px] tracking-[0.2em]">{ct.ctaText2}</span>)}
              </div>
            </div>
            <div className="col-span-5">
              <div className="grid grid-cols-6 grid-rows-6 gap-1.5 h-[260px]">
                <div className="col-span-6 row-span-4 relative overflow-hidden shadow-lg">
                  {ct.image1 ? <img src={ct.image1} alt="" className="w-full h-full object-cover object-top" /> : <EmptySlot text="Zdjęcie główne" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                {[2,3,4].map(n => (<div key={n} className="col-span-2 row-span-2 relative overflow-hidden shadow-md">{ct['image'+n] ? <img src={ct['image'+n]} alt="" className="w-full h-full object-cover" /> : <EmptySlot text="Brak" />}</div>))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AboutPreview({ content }) {
  const ct = content || {};
  return (
    <div className="rounded-lg overflow-hidden border border-gray-300" style={{ '--foreground': '#1a1a1a', '--foreground-secondary': '#5a5a5a', '--accent': '#b08d8d', '--secondary': '#d4c5a9' }}>
      <section className="relative py-12 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10"><div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, var(--secondary) 1px, transparent 0)', backgroundSize: '30px 30px' }} /></div>
        <div className="absolute top-1/2 left-0 w-[200px] h-[200px] bg-[var(--accent)]/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[150px] h-[150px] bg-[var(--secondary)]/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="relative z-10 px-4">
          <div className="text-center mb-8">
            {ct.title && <h2 className="text-2xl text-[var(--foreground)] mt-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>{ct.title}</h2>}
            {ct.sectionTitle && (<><svg className="mx-auto block w-[120px] h-2 mb-1" viewBox="0 0 200 12" preserveAspectRatio="none"><path d="M0,8 Q50,2 100,8 T200,8" stroke="var(--accent)" strokeWidth="3" fill="none" /></svg><span className="text-[10px] tracking-[0.3em] text-[var(--accent)] uppercase font-medium">{ct.sectionTitle}</span></>)}
          </div>
          <div className="flex gap-6 items-start">
            {ct.image1 && (<div className="w-1/3 flex-shrink-0"><div className="relative overflow-hidden shadow-lg"><img src={ct.image1} alt="" className="w-full h-40 object-cover object-top" /><div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" /></div></div>)}
            <div className={ct.image1 ? 'w-2/3' : 'w-full'}>
              {ct.description?.split('\n\n').map((p, i) => (<p key={i} className="text-xs text-[var(--foreground-secondary)] leading-relaxed mb-2">{p}</p>))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function EventsPreview({ items }) {
  const item = items?.[0];
  if (!item) return <EmptyState text="Brak eventów" />;
  return (
    <div className="rounded-lg overflow-hidden border border-gray-300" style={{ '--foreground': '#1a1a1a', '--foreground-secondary': '#5a5a5a', '--accent': '#b08d8d', '--secondary': '#d4c5a9', '--background': '#FDFBF7' }}>
      <section className="relative py-12 bg-[var(--background)] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10"><div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, var(--secondary) 1px, transparent 0)', backgroundSize: '30px 30px' }} /></div>
        <div className="absolute top-1/4 right-0 w-[200px] h-[200px] bg-[var(--accent)]/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[150px] h-[150px] bg-[var(--secondary)]/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="relative z-10 px-4">
          <div className="text-center mb-8">
            {item.title && <h2 className="text-2xl text-[var(--foreground)] mt-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>{item.title}</h2>}
            <svg className="mx-auto block w-[120px] h-2 mb-1" viewBox="0 0 200 12" preserveAspectRatio="none"><path d="M0,8 Q50,2 100,8 T200,8" stroke="var(--accent)" strokeWidth="3" fill="none" /></svg>
            {item.subtitle && <span className="text-[10px] tracking-[0.3em] text-[var(--accent)] uppercase font-medium">{item.subtitle}</span>}
          </div>
          <div className="flex gap-6 items-start">
            <div className={item.image1 ? 'w-2/3' : 'w-full'}>
              {item.description?.split('\n\n').map((p, i) => (<p key={i} className="text-xs text-[var(--foreground-secondary)] leading-relaxed mb-2">{p}</p>))}
              <div className="flex gap-2 mt-3">
                {item.ctaText && <span className="cursor-pointer px-3 py-1.5 border-2 border-[var(--foreground)] text-[var(--foreground)] text-[9px] tracking-[0.15em]">{item.ctaText.toUpperCase()}</span>}
                {item.ctaText2 && <span className="cursor-pointer px-3 py-1.5 bg-[var(--foreground)] text-white text-[9px] tracking-[0.15em]">{item.ctaText2.toUpperCase()}</span>}
              </div>
            </div>
            {item.image1 && (<div className="w-1/3 flex-shrink-0"><img src={item.image1} alt="" className="w-full h-40 object-cover object-top shadow-lg" /></div>)}
          </div>
        </div>
      </section>
    </div>
  );
}

function InstagramPreview({ content }) {
  const ct = content || {};
  const images = [ct.image1, ct.image2, ct.image3, ct.image4].filter(Boolean);
  if (images.length === 0) return <EmptyState text="Brak zdjęć" />;
  const cols = images.length === 1 ? 1 : images.length === 2 ? 2 : images.length === 3 ? 3 : 4;
  return (
    <div className="rounded-lg overflow-hidden border border-gray-300" style={{ '--accent': '#b08d8d', '--secondary': '#d4c5a9', '--foreground': '#1a1a1a' }}>
      <section className="relative py-8 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10"><div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, var(--secondary) 1px, transparent 0)', backgroundSize: '30px 30px' }} /></div>
        <div className="absolute top-1/4 left-0 w-[150px] h-[150px] bg-[var(--accent)]/5 rounded-full blur-[60px] pointer-events-none" />
        <div className="relative z-10 px-4">
          <div className="text-center mb-6">
            <span className="text-[10px] tracking-[0.3em] text-[var(--accent)] uppercase font-medium">@royalrestaurant_warsaw</span>
            <h2 className="text-xl text-[var(--foreground)] mt-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>ZAOBSERWUJ NAS</h2>
          </div>
          <div className={`grid gap-2 max-w-md mx-auto ${cols===1?'grid-cols-1':cols===2?'grid-cols-2':cols===3?'grid-cols-3':'grid-cols-2'}`}>
            {images.map((img, i) => (<div key={i} className="relative aspect-square overflow-hidden group"><img src={img} alt="" className="object-cover object-top w-full h-full" /></div>))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ════════════ FOOTER PREVIEW — kompletna stopka ze strony ════════════ */
function FooterPreview({ content }) {
  const ct = content || {};
  const restaurantName = ct.restaurantName || 'Royal Restaurant';
  const phone = ct.phone || '+48 696 566 633';
  const address = ct.address || 'Marszałkowska 138, 00-001 Warszawa';
  const fbLink = ct.socialLinks?.facebook || ct.facebook || '#';
  const igLink = ct.socialLinks?.instagram || ct.instagram || '#';
  const copyrightText = ct.description || `© ${new Date().getFullYear()} Royal Restaurant. Wszelkie prawa zastrzeżone.`;
  const mondayFridayHours = ct.mondayFriday || ct.openingHours?.[0]?.hours || '12:00 - 22:00';
  const saturdayHours = ct.saturday || ct.openingHours?.[1]?.hours || '9:00 - 22:00';
  const sundayHours = ct.sunday || ct.openingHours?.[2]?.hours || '9:00 - 22:00';

  return (
    <div className="rounded-lg overflow-hidden border border-gray-800" style={{ '--accent': '#b08d8d' }}>
      <footer className="relative bg-[#1a1a1a] text-white pt-10 pb-4 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />
        <div className="absolute inset-0 opacity-5 pointer-events-none"><div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '25px 25px' }} /></div>

        <div className="relative z-10 px-3">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

            {/* Logo + Description + Social */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#b08d8d] font-serif text-sm" style={{ fontFamily: 'var(--font-playfair), serif' }}>{restaurantName}</span>
              </div>
              <p className="text-white/50 text-[10px] leading-relaxed mb-3">Wyjątkowe miejsce, gdzie tradycyjna polska kuchnia spotyka domową atmosferę.</p>
              <div className="flex gap-2">
                <span className="w-6 h-6 border border-white/20 flex items-center justify-center">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </span>
                <span className="w-6 h-6 border border-white/20 flex items-center justify-center">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </span>
              </div>
            </div>

            {/* Godziny otwarcia */}
            <div>
              <h4 className="text-[9px] tracking-[0.2em] text-[var(--accent)] mb-3 font-medium">GODZINY OTWARCIA</h4>
              <div className="space-y-2">
                {[['Poniedziałek – Piątek', mondayFridayHours],['Sobota', saturdayHours],['Niedziela', sundayHours]].map(([day,time],i) => (
                  <div key={i} className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="text-white/60 text-[10px]">{day}</span><span className="text-white font-medium text-[10px]">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pyszne.pl */}
            <div>
              <h4 className="text-[9px] tracking-[0.2em] text-[var(--accent)] mb-3 font-medium">ZAMÓW ONLINE</h4>
              <div className="bg-white/5 p-2 rounded-sm border border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-sm flex items-center justify-center text-[9px]">P</div>
                  <div><p className="text-white/80 text-[10px] font-medium">Zamów przez pyszne.pl</p><p className="text-white/40 text-[8px]">Szybko i wygodnie</p></div>
                </div>
                <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-white/50 text-[9px]">ZAMÓW ONLINE</span><span className="text-orange-500 text-[9px]">→</span>
                </div>
              </div>
            </div>

            {/* Kontakt */}
            <div>
              <h4 className="text-[9px] tracking-[0.2em] text-[var(--accent)] mb-3 font-medium">KONTAKT</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <p className="text-white/60 text-[10px]">{address}</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <p className="text-white/80 text-[10px]">{phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-full h-px bg-gradient-to-r from-transparent to-white/20" /><div className="w-1.5 h-1.5 rotate-45 bg-[var(--accent)]" /><div className="w-full h-px bg-gradient-to-l from-transparent to-white/20" />
          </div>
          <div className="text-center text-[9px] text-white/40">{copyrightText}</div>
        </div>
      </footer>
    </div>
  );
}

function EmptySlot({ text }) { return (<div className="w-full h-full bg-gray-200 flex items-center justify-center"><span className="text-gray-400 text-[9px]">{text}</span></div>); }
function EmptyState({ text }) { return (<div className="bg-[#0a0a0a] rounded-lg border border-gray-700 p-6 text-center"><p className="text-gray-500 text-sm">{text}</p></div>); }