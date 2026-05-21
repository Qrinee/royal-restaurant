"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  pl: {
    hero: {
      badge: 'ROYAL RESTAURANT',
      title: 'Miejsce codziennych',
      subtitle: 'spotkań',
      suffix: 'przy polskim stole',
      description: 'Czekamy na Was od poniedziałku do piątku od 12:00 do 22:00, a w weekendowe poranki zapraszamy już od 9:00 na spokojne śniadania',
      ctaText: 'ZOBACZ MENU',
      ctaText2: 'ZAREZERWUJ',
    },
    nav: {
      menu: 'MENU',
      about: 'O NAS',
      events: 'EVENTY',
      contact: 'KONTAKT',
      reservation: 'REZERWACJA',
    },
    about: {
      title: 'O NAS',
      sectionTitle: 'poznaj nas',
      description: 'W Royal Restaurant lubimy, kiedy przy stole dzieje się życie. Kiedy rozmowy płyną swobodnie, a dania krążą między Gośćmi. Kiedy ktoś mówi „weź spróbuj" i przesuwa talerz bliżej środka. Lubimy momenty, w których nikt się nie spieszy. Kiedy szybki obiad zamienia się w długie spotkanie, a kolacja w fascynujący wieczór, który chce się przedłużać bez końca.\n\nLubimy tradycyjne polskie smaki, które wszyscy dobrze znamy - takie, do których wraca się z przyjemnością i które najlepiej smakują razem. Dlatego nasze stoły często wypełniają się dokładkami zamawianymi pod hasłem „jeszcze raz dla wszystkich".\n\nCieszy nas stukot sztućców, rozmowy ponad talerzami i cisza, która zapada, kiedy jedzenie naprawdę smakuje. Bo Royal Restaurant to miejsce, w którym najważniejsze jest wspólne bycie przy stole - swobodnie, serdecznie i po polsku.',
    },
    reviews: {
      title: 'OPINIE',
      subtitle: 'Naszych gości',
    },
    events: {
      title: 'EVENTY',
      sectionTitle: 'Celebruj z nami',
      description: 'W Royal Restaurant lubimy świętować razem z Gośćmi. Lubimy stoły, przy których zbiera się rodzina, przyjaciele albo współpracownicy i kiedy pojawiają się toasty i śmiech.\n\nOrganizujemy spotkania biznesowe i przyjęcia rodzinne, które mają być po prostu miłe i bez pośpiechu. Można u nas zarezerwować część sali albo całą restaurację na zamknięte wydarzenie - tak, żeby mieć przestrzeń tylko dla siebie i Gości.\n\nMamy własną cukiernię, więc torty i słodkości przygotowujemy od podstaw i według ustaleń - takie, jakie pasują do okazji i osób, które świętują.\n\nLubimy też wieczory, które łączą w sobie teatr i naszą kuchnię. Jesteśmy tuż obok Teatru Kwadrat, więc wielu Gości łączy spektakl z późniejszym spotkaniem przy stole - na wieczorną ucztę, deser lub lampkę wina po przedstawieniu.\n\nJeśli planujecie większe wydarzenie, istnieje także możliwość organizacji przyjęcia w przestrzeniach teatru z obsługą naszego cateringu Royal Catering. Dzięki temu możemy przygotować kolację lub event dla większej liczby Gości, zachowując ten sam styl i smaki naszej kuchni.',
      ctaText: 'pobierz ofertę spotkań',
      ctaText2: 'pobierz ofertę eventów',
    },
    instagram: {
      title: 'ZAOBSERWUJ NAS',
    },
    footer: {
      description: 'Wyjątkowe miejsce, gdzie tradycyjna polska kuchnia spotyka domową atmosferę.',
      openingHours: 'GODZINY OTWARCIA',
      mondayFriday: 'Poniedziałek - Piątek',
      saturday: 'Sobota',
      sunday: 'Niedziela',
      address: 'Marszałkowska 138',
      city: '00-001 Warszawa',
      orderOnline: 'ZAMÓW ONLINE',
      orderPyszne: 'Zamów przez pyszne.pl',
      orderUberEats: 'Zamów przez Uber Eats',
      orderSubtext: 'Szybko i wygodnie',
      contact: 'KONTAKT',
    },
    scroll: 'PRZEWIŃ',
  },
  en: {
    hero: {
      badge: 'ROYAL RESTAURANT',
      title: 'A place for everyday',
      subtitle: 'gatherings',
      suffix: 'at the Polish table',
      description: "We're waiting for you from Monday to Friday from 12:00 to 22:00, and on weekend mornings we invite you from 9:00 for a relaxed breakfast",
      ctaText: 'SEE THE MENU',
      ctaText2: 'MAKE A RESERVATION',
    },
    nav: {
      menu: 'MENU',
      about: 'ABOUT',
      events: 'EVENTS',
      contact: 'CONTACT',
      reservation: 'RESERVATION',
    },
    about: {
      title: 'ABOUT US',
      sectionTitle: 'Get to know us',
      description: 'At Royal Restaurant, we love when life happens around the table. When conversations flow freely and dishes are shared among guests. When someone says "try this" and moves the plate closer to the center. We love those moments when no one is in a hurry - when a quick lunch turns into a long gathering, and dinner becomes a captivating evening you don\'t want to end.\n\nWe love traditional Polish flavors that everyone knows well - those you happily come back to and that taste best when shared. That\'s why our tables are often filled with extra portions ordered under the motto "one more for everyone."\n\nWe enjoy the clatter of cutlery, conversations over plates, and the silence that falls when the food truly delights. Because Royal Restaurant is a place where what matters most is being together at the table - casually, warmly, and in the Polish way.',
    },
    reviews: {
      title: 'REVIEWS',
      subtitle: 'Our guests',
    },
    events: {
      title: 'EVENTS',
      sectionTitle: 'Celebrate with us',
      description: "At Royal Restaurant, we love celebrating together with our guests. We enjoy tables where family, friends, or colleagues gather, and where toasts and laughter fill the air.\n\nWe organize business meetings and family celebrations that are simply pleasant and unhurried. You can reserve part of the venue or the entire restaurant for a private event—so you have the space just for yourself and your guests.\n\nWe have our own pastry shop, so cakes and desserts are made from scratch and tailored to your needs - perfectly suited to the occasion and the people celebrating.\n\nWe also enjoy evenings that combine theatre and our cuisine. We are located right next to Teatr Kwadrat, so many guests pair a performance with a gathering at the table afterwards—for a dinner, dessert, or a glass of wine after the show.\n\nIf you are planning a larger event, it is also possible to host it in the theatre spaces with service provided by our Royal Catering. This allows us to prepare a dinner or event for a larger number of guests while maintaining the same style and flavors of our cuisine.",
      ctaText: 'download meeting offer',
      ctaText2: 'download event offer',
    },
    instagram: {
      title: 'FOLLOW US',
    },
    footer: {
      description: 'A unique place where traditional Polish cuisine meets a homely atmosphere.',
      openingHours: 'OPENING HOURS',
      mondayFriday: 'Monday – Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
      address: 'Marszałkowska 138',
      city: '00-001 Warsaw',
      orderOnline: 'ORDER ONLINE',
      orderPyszne: 'Order via pyszne.pl',
      orderUberEats: 'Order via Uber Eats',
      orderSubtext: 'Fast and convenient',
      contact: 'CONTACT',
    },
    scroll: 'SCROLL',
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('pl');

  useEffect(() => {
    const saved = localStorage.getItem('language');
    if (saved) {
      setLanguage(saved);
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}