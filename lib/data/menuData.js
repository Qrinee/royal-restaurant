/**
 * MENU DATA - Centralized menu configuration
 * 
 * This file contains all menu items data.
 * Edit here to update the menu across all pages.
 * 
 * @format
 * - title: Polish title
 * - subtitle: English translation (optional)
 * - items: Array of menu items
 *   - name: Dish name (Polish)
 *   - description: Description (Polish)
 *   - english: English translation (optional)
 *   - price: Price in PLN
 *   - tag: Special tag like "vegan", "new", etc. (optional)
 */

// ============================================================================
// SEASONAL MENU - Menu Sezonowe
// ============================================================================
export const SEASONAL_MENU = [
  { name: "Pierogi z dzikiem", description: "chipsy z topinamburu / sos jałowcowo-rozmarynowy", english: "Wild boar dumplings / juniper and rosemary sauce / Jerusalem artichoke chips", price: "49 zł" },
  { name: "Gulasz z sarny", description: "aromatyzowany trawą żubrową / kiszka ziemniaczana / surówka z ogórka kiszonego z chrzanem", english: "Venison goulash scented with bison grass / potato sausage / pickled cucumber and horseradish salad", price: "89 zł" },
  { name: "Seler a' la kaczka", description: "sos z owoców leśnych / chips z jarmużu / opiekane ziemniaki z ziołami / mus z modrej kapusty", english: "Celeriac à la duck / forest fruit sauce / kale chips / herb-roasted potatoes / red cabbage purée", price: "52 zł", tag: "vegan" },
  { name: "Pstrąg łososiowy", description: "kopytka z rukolą / julienne marchewkowo-cukiniowe / ikra z pstrąga", english: "Salmon trout / potato dumplings with arugula / carrot and zucchini julienne / trout roe", price: "73 zł" },
  { name: "Crème Brûlée", description: "owoce leśne / pszczeli pyłek", english: "Crème brûlée / forest berries / bee pollen", price: "33 zł" }
];

// ============================================================================
// SALADS - Sałaty
// ============================================================================
export const SALADS = [
  { name: "Cezar", description: "kurczak lub krewetki* / chips bekon / pomidorki cherry / ser dojrzewający / grzanki ziołowe", english: "Caesar salad / chicken or shrimps* / bacon chips / cherry tomatoes / ripening cheese / herb croutons", price: "45 / 51* zł" }
];

// ============================================================================
// APPETIZERS - Przekąski
// ============================================================================
export const APPETIZERS = [
  { name: "Tatar wołowy", description: "żółtko / szalotka / grzyby / korniszony / gorczyca", english: "Beef tartare / egg yolk / shallots / mushrooms / pickles / mustard", price: "56 zł" },
  { name: "Śledź po warszawsku", description: "cebula / śmietana / ziemniak", english: "Warsaw-style herring / onion / sour cream / potato", price: "36 zł" },
  { name: "Śledź tradycyjny", description: "cebula / pieczywo", english: "Traditional herring / onions / bread", price: "36 zł" },
  { name: "Nóżki wieprzowe", description: "ocet / cytryna", english: "Pork trotters / vinegar / lemon", price: "26 zł" },
  { name: "Pierogi z cielęciną", description: "duszona cebula", english: "Veal dumplings / braised onions", price: "52 zł" },
  { name: "Krewetki", description: "pomidorki cherry / emulsja winno-maślana / grzanki ziołowe", english: "Shrimps / cherry tomatoes / wine-butter emulsion / herb croutons", price: "52 zł" }
];

// ============================================================================
// MAIN COURSES - Dania Główne
// ============================================================================
export const MAIN_COURSES = [
  { name: "Żurek na wędzonce", description: "jajko / biała kiełbasa", english: "Sour rye soup with smoked meat / egg / white sausage", price: "31 zł" },
  { name: "Schabowy z kością", description: "kapusta zasmażana / ziemniaki", english: "Pork chop / braised cabbage / potatoes", price: "58 zł" },
  { name: "Udko z kaczki confit", description: "sos wiśniowy / buraczki balsamiczne / kopytka", english: "Duck leg confit / cherry sauce / balsamic beets / potato dumplings", price: "68 zł" },
  { name: "Sandacz smażony", description: "sos rakowy / puree ziemniaczane / szpinak na maśle", english: "Pan-fried pike-perch / tarragon sauce / mashed potatoes / buttered spinach", price: "69 zł" },
  { name: "Kopytka", description: "sos grzybowy / rukola / ser dojrzewający", english: "Vegetarian potato dumplings / mushroom sauce / arugula / aged cheese", price: "48 zł" },
  { name: "Makaron z krewetkami", description: "sepia / pomidorki cherry / czosnek", english: "Pasta with shrimp / sepia / cherry tomatoes / garlic", price: "51 zł" }
];

// ============================================================================
// DESSERTS - Desery
// ============================================================================
export const DESSERTS = [
  { name: "Naleśniki z serem", description: "naleśniki z serem", english: "Pancakes with sweet cheese filling", price: "26 zł" },
  { name: "Domowe ciasto", description: "ciasto domowe", english: "Homemade cake", price: "29 zł" }
];

// ============================================================================
// COFFEES & TEA - Kawy i Herbaty
// ============================================================================
export const COFFEES_TEA = [
  { name: "Espresso", price: "14 zł" },
  { name: "Espresso Doppio", price: "18 zł" },
  { name: "Americano", price: "18 zł" },
  { name: "Latte", price: "20 zł" },
  { name: "Flat White", price: "22 zł" },
  { name: "Cappuccino", price: "18 zł" },
  { name: "Herbata w imbryku", english: "Tea in a Teapot", price: "18 zł" }
];

// ============================================================================
// DRINKS - Napoje
// ============================================================================
export const DRINKS = [
  { name: "Cola / Cola zero / Fanta / Sprite", price: "13 zł" },
  { name: "Sok: pomarańcza / jabłko / czarna porzeczka / pomidor", english: "Juice: orange / apple / blackcurrant / tomato", price: "13 zł" },
  { name: "Sok z cytrusów świeżo wyciskany", english: "Freshly Squeezed Citrus Juice", price: "22 zł" },
  { name: "Woda Cisowianka gaz. / niegaz.", english: "Cisowianka Water Sparkling / Still 0.3/0.7l", price: "11/18 zł" },
  { name: "Kwas chlebowy", english: "Bread drink", price: "18 zł" }
];

// ============================================================================
// PROSECCO & CHAMPAGNE
// ============================================================================
export const PROSECCO_CHAMPAGNE = [
  { name: "Casabianca Prosecco Superiore DOCG", price: "25/130 zł" },
  { name: "Pommery Brut Apanage, Champagne AOC", price: "390 zł" },
  { name: "Moët & Chandon Ice Imperial", price: "449 zł" }
];

// ============================================================================
// WINES BY THE GLASS - Wina na kieliszki
// ============================================================================
export const WINES_GLASS = [
  { name: "Sombrilla Paraiso Macabeo / Sauvignon Blanc", english: "D.O. Utiel", price: "21/105 zł" },
  { name: "Equus Passage, Chardonnay / Solaris", english: "(PL)", price: "27/135 zł" },
  { name: "Sombrilla Paraiso Tempranillo / Bobal", english: "D.O. Utiel", price: "21/105 zł" },
  { name: "Equus Pinot Noir", english: "(PL)", price: "27/135 zł" }
];

// ============================================================================
// WHITE WINE - Wina Białe
// ============================================================================
export const WINES_WHITE = [
  { name: "Magnolia Pinot Grigio, Colline Pescaresi I.G.P.", price: "107 zł" },
  { name: "Mount Riley Sauvignon Blanc, Marlborough", price: "126 zł" },
  { name: "Olivier Tricon Petit Chablis AOC", price: "159 zł" }
];

// ============================================================================
// RED WINE - Wina Czerwone
// ============================================================================
export const WINES_RED = [
  { name: "Dominio de Fontana Crainza, D.O. Ucles-Castilla", price: "107 zł" },
  { name: "Viberti La Gemella, Barbera d'Alba D.O.C.", price: "125 zł" }
];

// ============================================================================
// BEERS - Piwa
// ============================================================================
export const BEERS = [
  { name: "Grimbergen Blonde / Double Ambrée / Blanche", price: "19 zł" },
  { name: "Okocim jasne 0,5l", price: "18 zł" },
  { name: "Kasztelan 0,5l", price: "18 zł" },
  { name: "Garage 0,4l", price: "22 zł" },
  { name: "Somersby 0,4l", price: "22 zł" },
  { name: "Kronenbourg 1664 Blanc 0,33l", price: "17 zł" }
];

// ============================================================================
// SPIRITS - Alkohol
// ============================================================================
export const SPIRITS = [
  { name: "Hennessy V.S. Cognac 40ml", price: "39 zł" },
  { name: "Hennessy V.S.O.P Cognac 40ml", price: "47 zł" },
  { name: "Woodford Reserve Kentucky Straight Bourbon 40ml", price: "38 zł" },
  { name: "Glenlivet 15 YO Single Malt Whisky 40ml", price: "34 zł" },
  { name: "Chivas Regal 12 YO Blend Whisky 40ml", price: "25 zł" },
  { name: "Jameson Irish Whiskey 40ml", price: "24 zł" },
  { name: "Jack Daniel's Tennessee Old No.7 40ml", price: "24 zł" },
  { name: "Olmeca Tequila 40ml", price: "26 zł" },
  { name: "Bombay Sapphire London Dry Gin 40ml", price: "22 zł" },
  { name: "Bacardi Carta Blanca Rum 40ml", price: "18 zł" },
  { name: "Jägermeister 40ml", price: "18 zł" }
];

// ============================================================================
// POLISH VODKA - Wódki Polskie
// ============================================================================
export const VODKAS = [
  { name: "Polska brandy XO 40ml", price: "24 zł" },
  { name: "Śliwowica 40ml", price: "20 zł" },
  { name: "Żubrówka 40ml", price: "10 zł" },
  { name: "Ostoya 40ml", price: "17 zł" },
  { name: "Chopin 40ml", price: "19 zł" },
  { name: "Belvedere 40ml", price: "23 zł" },
  { name: "J.A. Baczewski 40ml", price: "13 zł" },
  { name: "J.A. Baczewski smakowe 40ml", price: "15 zł" },
  { name: "Nalewki 40ml", price: "18 zł" }
];

// ============================================================================
// COCKTAILS - Koktajle
// ============================================================================
export const COCKTAILS = [
  { name: "Tatanka", price: "26 zł" },
  { name: "Negroni", price: "32 zł" },
  { name: "Mojito klasyczne", english: "Classic Mojito", price: "34 zł" },
  { name: "Whisky sour", price: "34 zł" },
  { name: "Pornstar Martini", price: "36 zł" },
  { name: "Old Fashion", price: "45 zł" }
];

// ============================================================================
// COLD REFRESHMENTS - Zimne Orzeźwienie
// ============================================================================
export const COLD_REFRESHMENTS = [
  { name: "Ice Mango Matcha", price: "20 zł" },
  { name: "Ice Coffee", price: "20 zł" },
  { name: "Espresso Tonic", price: "18 zł" },
  { name: "Cherry Espresso Tonic", price: "20 zł" }
];

// ============================================================================
// BUBBLES - Bąbelki
// ============================================================================
export const BUBBLES = [
  { name: "Aperol Spritz", price: "39 zł" },
  { name: "Sarti Spritz", price: "36 zł" },
  { name: "Campari Spritz", price: "38 zł" },
  { name: "French 75", price: "34 zł" },
  { name: "Moët & Chandon Ice Imperial", price: "449 zł" }
];

// ============================================================================
// LEMONADES - Lemoniady
// ============================================================================
export const LEMONADES = [
  { name: "Lemoniada klasyczna", english: "Classic lemonade", price: "16 zł" },
  { name: "Lemoniada owocowa", english: "Fruit lemonade", price: "18 zł" }
];

// ============================================================================
// MOCKTAILS - Koktajle Bezalkoholowe
// ============================================================================
export const MOCKTAILS = [
  { name: "Virgin Mojito", price: "22 zł" },
  { name: "Aperol Spritz 0%", price: "32 zł" },
  { name: "Crodino Spritz 0%", price: "32 zł" }
];

// ============================================================================
// COMPLETE MENU CATEGORIES
// Complete menu structure for rendering all categories
// ============================================================================
export const MENU_CATEGORIES = [
  { title: "MENU SEZONOWE", subtitle: "SEASONAL MENU", items: SEASONAL_MENU },
  { title: "SAŁATY", subtitle: "SALADS", items: SALADS },
  { title: "PRZEKĄSKI", subtitle: "APPETIZERS", items: APPETIZERS },
  { title: "DANIA GŁÓWNE", subtitle: "MAIN COURSES", items: MAIN_COURSES },
  { title: "DESERY", subtitle: "DESSERT", items: DESSERTS },
  { title: "KAWY I HERBATY", subtitle: "COFFEES & TEA", items: COFFEES_TEA },
  { title: "NAPOJE", subtitle: "DRINKS", items: DRINKS },
  { title: "PROSECCO & CHAMPAGNE", items: PROSECCO_CHAMPAGNE },
  { title: "WINA NA KIELISZKI", subtitle: "WINES BY THE GLASS", items: WINES_GLASS },
  { title: "WINA BIAŁE", subtitle: "WHITE WINE", items: WINES_WHITE },
  { title: "WINA CZERWONE", subtitle: "RED WINE", items: WINES_RED },
  { title: "PIWA", subtitle: "BEERS", items: BEERS },
  { title: "ALKOHOL", subtitle: "SPIRITS", items: SPIRITS },
  { title: "WÓDKI POLSKIE", subtitle: "POLISH VODKA", items: VODKAS },
  { title: "KOKTAJLE", subtitle: "COCKTAILS", items: COCKTAILS },
  { title: "ZIMNE ORZEŹWIENIE", subtitle: "COLD REFRESHMENTS", items: COLD_REFRESHMENTS },
  { title: "BĄBELKI", subtitle: "BUBBLES", items: BUBBLES },
  { title: "LEMONIADY", subtitle: "LEMONADES", items: LEMONADES },
  { title: "KOKTAJLE BEZALKOHOLOWE", subtitle: "MOCKTAILS", items: MOCKTAILS }
];

// ============================================================================
// SERVICE CHARGE NOTICE
// ============================================================================
export const SERVICE_CHARGE_NOTICE = {
  polish: "Do rachunku doliczamy 10% opłaty serwisowej.",
  english: "A 10% service charge will be added to your bill."
};

export default MENU_CATEGORIES;
