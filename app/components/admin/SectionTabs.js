"use client";

const SECTION_TYPES = [
  { key: 'hero', label: 'Sekcja Hero' },
  { key: 'about', label: 'O Nas' },
  { key: 'events', label: 'Eventy' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'settings', label: 'Ustawienia' },
  { key: 'footer', label: 'Stopka' },
];

export default function SectionTabs({ selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {SECTION_TYPES.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            selected === key
              ? 'bg-[#b08d8d] text-white'
              : 'bg-[#111111] text-gray-400 hover:text-white border border-gray-800'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}