"use client";

import { useState } from "react";

/**
 * MenuCategory Component
 * 
 * Reusable component for displaying a menu category with collapsible items.
 * 
 * @param {Object} props
 * @param {string} props.title - Polish category title
 * @param {string} props.subtitle - English category subtitle (optional)
 * @param {Array} props.items - Array of menu items
 * @param {boolean} props.isOpen - Whether category is expanded by default
 * @param {Function} props.onToggle - Callback when category is toggled
 */
export default function MenuCategory({ 
  title, 
  subtitle, 
  items, 
  isOpen = true,
  onToggle 
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(isOpen);
  
  // Use internal state if no onToggle provided
  const isExpanded = onToggle ? isOpen : internalIsOpen;
  
  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  return (
    <div className="border-b border-[var(--secondary)]/30 last:border-b-0">
      <button 
        onClick={handleToggle}
        className="w-full flex items-center justify-between py-3 text-left hover:text-[var(--accent)] transition-colors group"
        aria-expanded={isExpanded}
      >
        <div>
          <h3 
            className="text-xl md:text-2xl text-[#1a1a1a]" 
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs tracking-[0.2em] text-[var(--accent)]">
              {subtitle}
            </p>
          )}
        </div>
        
        <div 
          className={`transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <svg 
            className="w-5 h-5 text-[var(--accent)]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M19 9l-7 7-7-7" 
            />
          </svg>
        </div>
      </button>

      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pb-4 space-y-3">
          {items.map((item, index) => (
            <MenuItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * MenuItem Component
 * 
 * Individual menu item display.
 * 
 * @param {Object} props
 * @param {Object} props.item - Menu item data
 */
function MenuItem({ item }) {
  return (
    <div className="group hover:pl-2 transition-all duration-200">
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1 min-w-0">
          {/* Item name and optional tag */}
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-base text-[#1a1a1a]">{item.name}</h4>
            {item.tag && (
              <span className="text-[9px] px-1.5 py-0.5 bg-[var(--accent)]/10 text-[var(--accent)] uppercase tracking-wider">
                {item.tag}
              </span>
            )}
          </div>
          
          {/* Polish description */}
          {item.description && (
            <p className="text-xs text-[#4a4a4a] leading-snug">
              {item.description}
            </p>
          )}
          
          {/* English translation */}
          {item.english && (
            <p className="text-[10px] text-[#888888] italic leading-snug">
              {item.english}
            </p>
          )}
        </div>
        
        {/* Price */}
        <span className="text-sm text-[#1a1a1a] font-medium whitespace-nowrap ml-2">
          {item.price}
        </span>
      </div>
    </div>
  );
}

/**
 * ServiceChargeNotice Component
 * 
 * Displays the service charge notice at the bottom of the menu.
 */
export function ServiceChargeNotice() {
  return (
    <div className="text-center pt-8 border-t border-[var(--secondary)]/20">
      <p className="text-md text-[var(--foreground-muted)]">
        Do rachunku doliczamy 10% opłaty serwisowej.<br />
        A 10% service charge will be added to your bill.
      </p>
    </div>
  );
}

export { MenuCategory, MenuItem, ServiceChargeNotice };
