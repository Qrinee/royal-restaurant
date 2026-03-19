"use client"

import { useEffect, useState } from "react"

/**
 * MenuSection - Pełne menu restauracji
 */
export default function MenuSection() {


  return (
    <section className="relative py-24 bg-[var(--background)]">
      {/* Teksturowane jasne tło z ikonami */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--secondary) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, var(--accent) 20px, var(--accent) 21px)`
        }}></div>
        <img src="/5.png" alt="" className="absolute top-10 left-[5%] w-20 h-20 opacity-8 rotate-12" style={{filter: 'blur(0.5px)'}} />
        <img src="/5.png" alt="" className="absolute top-40 right-[10%] w-28 h-28 opacity-8 -rotate-12" style={{filter: 'blur(0.5px)'}} />
        <img src="/5.png" alt="" className="absolute bottom-40 left-[15%] w-24 h-24 opacity-8 rotate-45" style={{filter: 'blur(0.5px)'}} />
        <img src="/5.png" alt="" className="absolute bottom-20 right-[20%] w-20 h-20 opacity-8 -rotate-6" style={{filter: 'blur(0.5px)'}} />
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
              <MenuCategory title="MENU SEZONOWE" subtitle="SEASONAL MENU" items={[
                {name: "Pierogi z dzikiem", description: "chipsy z topinamburu / sos jałowcowo-rozmarynowy", english: "Wild boar dumplings / juniper and rosemary sauce / Jerusalem artichoke chips", price: "49 zł"},
                {name: "Gulasz z sarny", description: "aromatyzowany trawą żubrową / kiszka ziemniaczana / surówka z ogórka kiszonego z chrzanem", english: "Venison goulash scented with bison grass / potato sausage / pickled cucumber and horseradish salad", price: "89 zł"},
                {name: "Seler a' la kaczka", description: "sos z owoców leśnych / chips z jarmużu / opiekane ziemniaki z ziołami / mus z modrej kapusty", english: "Celeriac à la duck / forest fruit sauce / kale chips / herb-roasted potatoes / red cabbage purée", price: "52 zł", tag: "vegan"},
                {name: "Pstrąg łososiowy", description: "kopytka z rukolą / julienne marchewkowo-cukiniowe / ikra z pstrąga", english: "Salmon trout / potato dumplings with arugula / carrot and zucchini julienne / trout roe", price: "73 zł"},
                {name: "Crème Brûlée", description: "owoce leśne / pszczeli pyłek", english: "Crème brûlée / forest berries / bee pollen", price: "33 zł"}
              ]} />

              <MenuCategory title="SAŁATY" subtitle="SALADS" items={[
                {name: "Cezar", description: "kurczak lub krewetki* / chips bekon / pomidorki cherry / ser dojrzewający / grzanki ziołowe", english: "Caesar salad / chicken or shrimps* / bacon chips / cherry tomatoes / ripening cheese / herb croutons", price: "45 / 51* zł"}
              ]} />

              <MenuCategory title="PRZEKĄSKI" subtitle="APPETIZERS" items={[
                {name: "Tatar wołowy", description: "żółtko / szalotka / grzyby / korniszony / gorczyca", english: "Beef tartare / egg yolk / shallots / mushrooms / pickles / mustard", price: "56 zł"},
                {name: "Śledź po warszawsku", description: "cebula / śmietana / ziemniak", english: "Warsaw-style herring / onion / sour cream / potato", price: "36 zł"},
                {name: "Śledź tradycyjny", description: "cebula / pieczywo", english: "Traditional herring / onions / bread", price: "36 zł"},
                {name: "Nóżki wieprzowe", description: "ocet / cytryna", english: "Pork trotters / vinegar / lemon", price: "26 zł"},
                {name: "Pierogi z cielęciną", description: "duszona cebula", english: "Veal dumplings / braised onions", price: "52 zł"},
                {name: "Krewetki", description: "pomidorki cherry / emulsja winno-maślana / grzanki ziołowe", english: "Shrimps / cherry tomatoes / wine-butter emulsion / herb croutons", price: "52 zł"}
              ]} />

              <MenuCategory title="DANIA GŁÓWNE" subtitle="MAIN COURSES" items={[
                {name: "Żurek na wędzonce", description: "jajko / biała kiełbasa", english: "Sour rye soup with smoked meat / egg / white sausage", price: "31 zł"},
                {name: "Schabowy z kością", description: "kapusta zasmażana / ziemniaki", english: "Pork chop / braised cabbage / potatoes", price: "58 zł"},
                {name: "Udko z kaczki confit", description: "sos wiśniowy / buraczki balsamiczne / kopytka", english: "Duck leg confit / cherry sauce / balsamic beets / potato dumplings", price: "68 zł"},
                {name: "Sandacz smażony", description: "sos rakowy / puree ziemniaczane / szpinak na maśle", english: "Pan-fried pike-perch / tarragon sauce / mashed potatoes / buttered spinach", price: "69 zł"},
                {name: "Kopytka", description: "sos grzybowy / rukola / ser dojrzewający", english: "Vegetarian potato dumplings / mushroom sauce / arugula / aged cheese", price: "48 zł"},
                {name: "Makaron z krewetkami", description: "sepia / pomidorki cherry / czosnek", english: "Pasta with shrimp / sepia / cherry tomatoes / garlic", price: "51 zł"}
              ]} />

              <MenuCategory title="DESERY" subtitle="DESSERT" items={[
                {name: "Naleśniki z serem", description: "naleśniki z serem", english: "Pancakes with sweet cheese filling", price: "26 zł"},
                {name: "Domowe ciasto", description: "ciasto domowe", english: "Homemade cake", price: "29 zł"}
              ]} />

              <MenuCategory title="KAWY I HERBATY" subtitle="COFFEES & TEA" items={[
                {name: "Espresso", price: "14 zł"},
                {name: "Espresso Doppio", price: "18 zł"},
                {name: "Americano", price: "18 zł"},
                {name: "Latte", price: "20 zł"},
                {name: "Flat White", price: "22 zł"},
                {name: "Cappuccino", price: "18 zł"},
                {name: "Herbata w imbryku", english: "Tea in a Teapot", price: "18 zł"}
              ]} />

              <MenuCategory title="NAPOJE" subtitle="DRINKS" items={[
                {name: "Cola / Cola zero / Fanta / Sprite", price: "13 zł"},
                {name: "Sok: pomarańcza / jabłko / czarna porzeczka / pomidor", english: "Juice: orange / apple / blackcurrant / tomato", price: "13 zł"},
                {name: "Sok z cytrusów świeżo wyciskany", english: "Freshly Squeezed Citrus Juice", price: "22 zł"},
                {name: "Woda Cisowianka gaz. / niegaz.", english: "Cisowianka Water Sparkling / Still 0.3/0.7l", price: "11/18 zł"},
                {name: "Kwas chlebowy", english: "Bread drink", price: "18 zł"}
              ]} />

              <MenuCategory title="PROSECCO & CHAMPAGNE" items={[
                {name: "Casabianca Prosecco Superiore DOCG", price: "25/130 zł"},
                {name: "Pommery Brut Apanage, Champagne AOC", price: "390 zł"},
                {name: "Moët & Chandon Ice Imperial", price: "449 zł"}
              ]} />

              <MenuCategory title="WINA NA KIELISZKI" subtitle="WINES BY THE GLASS" items={[
                {name: "Sombrilla Paraiso Macabeo / Sauvignon Blanc", english: "D.O. Utiel", price: "21/105 zł"},
                {name: "Equus Passage, Chardonnay / Solaris", english: "(PL)", price: "27/135 zł"},
                {name: "Sombrilla Paraiso Tempranillo / Bobal", english: "D.O. Utiel", price: "21/105 zł"},
                {name: "Equus Pinot Noir", english: "(PL)", price: "27/135 zł"}
              ]} />

              <MenuCategory title="WINA BIAŁE" subtitle="WHITE WINE" items={[
                {name: "Magnolia Pinot Grigio, Colline Pescaresi I.G.P.", price: "107 zł"},
                {name: "Mount Riley Sauvignon Blanc, Marlborough", price: "126 zł"},
                {name: "Olivier Tricon Petit Chablis AOC", price: "159 zł"}
              ]} />

              <MenuCategory title="WINA CZERWONE" subtitle="RED WINE" items={[
                {name: "Dominio de Fontana Crainza, D.O. Ucles-Castilla", price: "107 zł"},
                {name: "Viberti La Gemella, Barbera d'Alba D.O.C.", price: "125 zł"}
              ]} />

              <MenuCategory title="PIWA" subtitle="BEERS" items={[
                {name: "Grimbergen Blonde / Double Ambrée / Blanche", price: "19 zł"},
                {name: "Okocim jasne 0,5l", price: "18 zł"},
                {name: "Kasztelan 0,5l", price: "18 zł"},
                {name: "Garage 0,4l", price: "22 zł"},
                {name: "Somersby 0,4l", price: "22 zł"},
                {name: "Kronenbourg 1664 Blanc 0,33l", price: "17 zł"}
              ]} />

              <MenuCategory title="ALKOHOL" subtitle="SPIRITS" items={[
                {name: "Hennessy V.S. Cognac 40ml", price: "39 zł"},
                {name: "Hennessy V.S.O.P Cognac 40ml", price: "47 zł"},
                {name: "Woodford Reserve Kentucky Straight Bourbon 40ml", price: "38 zł"},
                {name: "Glenlivet 15 YO Single Malt Whisky 40ml", price: "34 zł"},
                {name: "Chivas Regal 12 YO Blend Whisky 40ml", price: "25 zł"},
                {name: "Jameson Irish Whiskey 40ml", price: "24 zł"},
                {name: "Jack Daniel's Tennessee Old No.7 40ml", price: "24 zł"},
                {name: "Olmeca Tequila 40ml", price: "26 zł"},
                {name: "Bombay Sapphire London Dry Gin 40ml", price: "22 zł"},
                {name: "Bacardi Carta Blanca Rum 40ml", price: "18 zł"},
                {name: "Jägermeister 40ml", price: "18 zł"}
              ]} />

              <MenuCategory title="WÓDKI POLSKIE" subtitle="POLISH VODKA" items={[
                {name: "Polska brandy XO 40ml", price: "24 zł"},
                {name: "Śliwowica 40ml", price: "20 zł"},
                {name: "Żubrówka 40ml", price: "10 zł"},
                {name: "Ostoya 40ml", price: "17 zł"},
                {name: "Chopin 40ml", price: "19 zł"},
                {name: "Belvedere 40ml", price: "23 zł"},
                {name: "J.A. Baczewski 40ml", price: "13 zł"},
                {name: "J.A. Baczewski smakowe 40ml", price: "15 zł"},
                {name: "Nalewki 40ml", price: "18 zł"}
              ]} />

              <MenuCategory title="KOKTAJLE" subtitle="COCKTAILS" items={[
                {name: "Tatanka", price: "26 zł"},
                {name: "Negroni", price: "32 zł"},
                {name: "Mojito klasyczne", english: "Classic Mojito", price: "34 zł"},
                {name: "Whisky sour", price: "34 zł"},
                {name: "Pornstar Martini", price: "36 zł"},
                {name: "Old Fashion", price: "45 zł"}
              ]} />

              <MenuCategory title="ZIMNE ORZEŹWIENIE" subtitle="COLD REFRESHMENTS" items={[
                {name: "Ice Mango Matcha", price: "20 zł"},
                {name: "Ice Coffee", price: "20 zł"},
                {name: "Espresso Tonic", price: "18 zł"},
                {name: "Cherry Espresso Tonic", price: "20 zł"}
              ]} />

              <MenuCategory title="BĄBELKI" subtitle="BUBBLES" items={[
                {name: "Aperol Spritz", price: "39 zł"},
                {name: "Sarti Spritz", price: "36 zł"},
                {name: "Campari Spritz", price: "38 zł"},
                {name: "French 75", price: "34 zł"},
                {name: "Moët & Chandon Ice Imperial", price: "449 zł"}
              ]} />

              <MenuCategory title="LEMONIADY" subtitle="LEMONADES" items={[
                {name: "Lemoniada klasyczna", english: "Classic lemonade", price: "16 zł"},
                {name: "Lemoniada owocowa", english: "Fruit lemonade", price: "18 zł"}
              ]} />

              <MenuCategory title="KOKTAJLE BEZALKOHOLOWE" subtitle="MOCKTAILS" items={[
                {name: "Virgin Mojito", price: "22 zł"},
                {name: "Aperol Spritz 0%", price: "32 zł"},
                {name: "Crodino Spritz 0%", price: "32 zł"}
              ]} />

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
          {items.map((item, index) => (
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
