"use client";

import { useState } from 'react';
import FieldTooltip from './FieldTooltip';

export function TextField({ label, name, defaultValue = '', type = 'text', className, tooltip, required, pattern, errorMessage, validateAs }) {
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  function handleBlur(e) {
    setTouched(true);
    const val = e.target.value.trim();
    if (required && !val) {
      setError('To pole jest wymagane');
    } else if (validateAs === 'url' && val && !/^https?:\/\/.+/.test(val) && !val.startsWith('/')) {
      setError('Wprowadź poprawny URL (np. https://...) lub ścieżkę (np. /menu)');
    } else {
      setError('');
    }
  }

  function handleChange(e) {
    if (touched) {
      const val = e.target.value.trim();
      if (required && !val) {
        setError('To pole jest wymagane');
      } else if (validateAs === 'url' && val && !/^https?:\/\/.+/.test(val) && !val.startsWith('/')) {
        setError('Wprowadź poprawny URL');
      } else {
        setError('');
      }
    }
  }

  return (
    <div className={className}>
      <label className="block text-gray-400 text-xs mb-1 uppercase">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
        {tooltip && <FieldTooltip text={tooltip} />}
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`w-full bg-[#0a0a0a] border rounded-lg p-2 text-white transition-colors ${
          error ? 'border-red-500 focus:border-red-400' : 'border-gray-800 focus:border-[#b08d8d]'
        }`}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

export function TextAreaField({ label, name, defaultValue = '', className, style, tooltip, required }) {
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  function handleBlur(e) {
    setTouched(true);
    if (required && !e.target.value.trim()) {
      setError('To pole jest wymagane');
    } else {
      setError('');
    }
  }

  function handleChange(e) {
    if (touched) {
      if (required && !e.target.value.trim()) {
        setError('To pole jest wymagane');
      } else {
        setError('');
      }
    }
  }

  return (
    <div className={className}>
      <label className="block text-gray-400 text-xs mb-1 uppercase">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
        {tooltip && <FieldTooltip text={tooltip} />}
      </label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        onChange={handleChange}
        onBlur={handleBlur}
        style={style}
        className={`w-full bg-[#0a0a0a] border rounded-lg p-2 text-white transition-colors min-h-[80px] ${
          error ? 'border-red-500 focus:border-red-400' : 'border-gray-800 focus:border-[#b08d8d]'
        }`}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
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
      className="px-6 py-3 bg-[#b08d8d] text-white rounded-lg hover:opacity-90 disabled:opacity-50 transition-colors"
    >
      {saving ? 'Zapisywanie...' : label}
    </button>
  );
}