"use client";

const LANGUAGES = [
  { key: 'pl', label: '🇵🇱 Polski' },
  { key: 'en', label: '🇬🇧 English' },
];

export default function LanguageSwitcher({ selected, onChange }) {
  return (
    <div className="flex gap-2">
      {LANGUAGES.map(({ key, label }) => (
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