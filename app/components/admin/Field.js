"use client";

export function TextField({ label, name, defaultValue = '', type = 'text', className }) {
  return (
    <div className={className}>
      <label className="block text-gray-400 text-xs mb-1 uppercase">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
      />
    </div>
  );
}

export function TextAreaField({ label, name, defaultValue = '', className, style }) {
  return (
    <div className={className}>
      <label className="block text-gray-400 text-xs mb-1 uppercase">{label}</label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        style={style}
        className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white min-h-[80px]"
      />
    </div>
  );
}

export function HiddenField({ name, value }) {
  return <input type="hidden" name={name} value={value} />;
}

export function SubmitButton({ saving, label = 'Zapisz zmiany' }) {
  return (
    <button
      type="submit"
      disabled={saving}
      className="px-6 py-3 bg-[#b08d8d] text-white rounded-lg hover:opacity-90 disabled:opacity-50"
    >
      {saving ? 'Zapisywanie...' : label}
    </button>
  );
}