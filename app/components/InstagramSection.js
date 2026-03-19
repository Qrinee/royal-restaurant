"use client"


export default function InstagramSection() {
    const pinIcon = "ig/pinicon.webp"
    const images = [
        {
            images: "ig/1.jpg",
            link: "https://www.instagram.com/p/DPn0STtjUYE/"
        },
        {
            images: "ig/2.jpg",
            link: "https://www.instagram.com/p/DQUGZ1rERUp/"
        },
        {
            images: "ig/3.jpg",
            link: "https://www.instagram.com/p/DVJCiYyjKR8/"
        },
        {
            images: "ig/4.jpg",
            link: "https://www.instagram.com/p/DVqw0n_DWqo/"
        }
    ]

  return (
    <section className="relative py-24 bg-pink-100">
      {/* Tekstura tła */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--secondary) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-[var(--accent)]/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[var(--secondary)]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10">
              <div className="text-center mb-16 ">
          <span className="text-xs tracking-[0.3em] text-[var(--accent)] uppercase font-medium">
            @royalrestaurant_warsaw
          </span>
          <h2 className="text-4xl md:text-5xl text-[var(--foreground)] mt-4" style={{fontFamily: 'var(--font-playfair)'}}>
            ZAOBSERWUJ NAS
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[var(--accent)]"></div>
            <div className="w-2 h-2 rotate-45 bg-[var(--accent)]"></div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[var(--accent)]"></div>
          </div>
        </div>
        <div className="flex gap-4 m-7 flex-wrap w-full justify-center">
        {
            images.map((src, index) => (
                <a href={src.link} target="_blank" key={index}>
                    <div className="h-150 w-100 cursor-pointer">
                        <img src={pinIcon} alt="Pin Icon" style={{userSelect: 'none'}} className="select-none w-7 h-7   relative top-15 -left-15  z-30 opacity-80 " />
                    <img src={src.images} alt={`Instagram ${index + 1}`} className="object-cover object-top w-full  h-full hover:grayscale transition-all"  />
                    </div>
                </a>
            ))
        }
        </div>
      </div>
    </section>
  )
}
