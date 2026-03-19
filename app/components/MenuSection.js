"use client";

/**
 * MenuSection Component
 * 
 * Full restaurant menu section with all categories.
 * Uses centralized menu data from lib/data/menuData.js
 * 
 * @example
 * import MenuSection from './components/MenuSection';
 * 
 * <MenuSection />
 */

import { MENU_CATEGORIES } from "@/lib/data/menuData";
import { ServiceChargeNotice } from "./MenuCategory";

export default function MenuSection() {
  return (
    <section className="relative py-24 bg-[var(--background)]" id="menu">
      {/* Textured background with icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--secondary) 1px, transparent 0)`,
            backgroundSize: "20px 20px"
          }}
        />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, var(--accent) 20px, var(--accent) 21px)"
          }}
        />
        {/* Decorative food icons */}
        <img src="/5.png" alt="" className="absolute top-10 left-[5%] w-20 h-20 opacity-8 rotate-12" style={{ filter: "blur(0.5px)" }} />
        <img src="/5.png" alt="" className="absolute top-40 right-[10%] w-28 h-28 opacity-8 -rotate-12" style={{ filter: "blur(0.5px)" }} />
        <img src="/5.png" alt="" className="absolute bottom-40 left-[15%] w-24 h-24 opacity-8 rotate-45" style={{ filter: "blur(0.5px)" }} />
        <img src="/5.png" alt="" className="absolute bottom-20 right-[20%] w-20 h-20 opacity-8 -rotate-6" style={{ filter: "blur(0.5px)" }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs tracking-[0.3em] text-[var(--accent)] uppercase font-medium">
            Wybierz
          </span>
          <h2 
            className="text-4xl md:text-5xl text-[var(--foreground)] mt-4" 
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            MENU
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[var(--accent)]"></div>
            <div className="w-2 h-2 rotate-45 bg-[var(--accent)]"></div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[var(--accent)]"></div>
          </div>
        </div>

        {/* Paper effect container */}
        <div className="relative">
          <div className="absolute inset-0 bg-[var(--secondary)]/20 transform rotate-1 translate-x-1 translate-y-1 rounded-sm"></div>
          <div className="relative bg-[#FDFBF7] shadow-xl rounded-sm p-6 md:p-10">
            {/* Lined paper effect */}
            <div 
              className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-sm" 
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 28px, var(--secondary) 28px, var(--secondary) 29px)"
              }}
            />

            <div className="relative space-y-8">
              {/* Render all menu categories */}
              {MENU_CATEGORIES.map((category, index) => (
                <MenuCategoryItem
                  key={index}
                  title={category.title}
                  subtitle={category.subtitle}
                  items={category.items}
                />
              ))}

              {/* Service charge notice */}
              <ServiceChargeNotice />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * MenuCategoryItem Component
 * 
 * Internal component to render a single menu category.
 * This was previously defined inline in the page files.
 */
import MenuCategory from "./MenuCategory";

function MenuCategoryItem({ title, subtitle, items }) {
  return (
    <MenuCategory
      title={title}
      subtitle={subtitle}
      items={items}
    />
  );
}
