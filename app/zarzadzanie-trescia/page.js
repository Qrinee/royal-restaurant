"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import SectionTabs from '../components/admin/SectionTabs';
import LanguageSwitcher from '../components/admin/LanguageSwitcher';
import AdminPageHeader from '../components/admin/AdminPageHeader';
import StatusMessage from '../components/admin/StatusMessage';
import { HiddenField, SubmitButton } from '../components/admin/Field';
import HeroForm from '../components/admin/forms/HeroForm';
import AboutForm from '../components/admin/forms/AboutForm';
import EventsForm from '../components/admin/forms/EventsForm';
import InstagramSingleForm from '../components/admin/forms/InstagramSingleForm';
import SettingsForm from '../components/admin/forms/SettingsForm';
import FooterForm from '../components/admin/forms/FooterForm';

const SECTION_LABELS = {
  hero: 'Sekcja Hero',
  about: 'O Nas',
  events: 'Eventy',
  instagram: 'Instagram',
  settings: 'Ustawienia',
  footer: 'Stopka',
};

const SINGLE_TYPES = ['hero', 'about', 'settings', 'footer', 'instagram'];

export default function ContentManagementPage() {
  const [selectedType, setSelectedType] = useState('hero');
  const [selectedLang, setSelectedLang] = useState('pl');
  const [content, setContent] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const isMulti = selectedType === 'events';

  const fetchContent = useCallback(async () => {
    setLoading(true);
    try {
      const timestamp = Date.now();
      const url = `/api/site-content?type=${selectedType}&lang=${selectedLang}&_t=${timestamp}`;
      const res = await fetch(url, { credentials: 'include' });
      const data = await res.json();

      if (data.success) {
        if (isMulti) {
          setItems(data.items || []);
        } else {
          setContent(data.content || null);
        }
      }
    } catch {
      setError('Błąd pobierania danych');
    } finally {
      setLoading(false);
    }
  }, [selectedType, selectedLang, isMulti]);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/verify', { credentials: 'include' });
        if (!res.ok) {
          router.push('/logowanie-admin');
          return;
        }
        fetchContent();
      } catch {
        router.push('/logowanie-admin');
      }
    }
    checkAuth();
  }, [fetchContent, router]);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);

      const processedData = {};
      let hasImageUpdate = false;
      const imageFields = ['image1', 'image2', 'image3', 'image4'];

      for (const key of Object.keys(data)) {
        if (imageFields.includes(key) && data[key]) {
          processedData[key] = data[key];
          hasImageUpdate = true;
        } else if (imageFields.some((f) => key.startsWith(f + '_')) && data[key]) {
          const field = key.split('_')[0];
          if (!processedData[field]) {
            processedData[field] = data[key];
            hasImageUpdate = true;
          }
        } else if (data[key] !== '') {
          processedData[key] = data[key];
        }
      }

      if (hasImageUpdate) {
        processedData.updateAllLangs = true;
      }

      const res = await fetch('/api/admin/site-content?upsert=true', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: selectedType, lang: selectedLang, ...processedData }),
        credentials: 'include',
      });

      const result = await res.json();
      if (result.success) {
        setMessage('Zapisano pomyślnie!');
        if (SINGLE_TYPES.includes(selectedType) && result.content) {
          setContent(result.content);
        } else {
          fetchContent();
        }
      } else {
        setError(result.error || 'Błąd zapisywania');
      }
    } catch {
      setError('Błąd zapisywania');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Czy na pewno usunąć?')) return;

    try {
      const res = await fetch(`/api/admin/site-content?id=${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const result = await res.json();
      if (result.success) {
        fetchContent();
      } else {
        setError(result.error || 'Błąd usuwania');
      }
    } catch {
      setError('Błąd usuwania');
    }
  }

  async function handleAddNew() {
    setSaving(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch('/api/admin/site-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: selectedType, title: 'Nowa pozycja', order: items.length }),
        credentials: 'include',
      });

      const result = await res.json();
      if (result.success) {
        setMessage('Dodano nową pozycję');
        fetchContent();
      } else {
        setError(result.error || 'Błąd dodawania');
      }
    } catch {
      setError('Błąd dodawania');
    } finally {
      setSaving(false);
    }
  }

  async function handleSeed() {
    if (!confirm('To zaszczepi domyślne teksty w PL i EN. Kontynuować?')) return;

    setSaving(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch('/api/admin/site-content/seed', {
        method: 'POST',
        credentials: 'include',
      });

      const result = await res.json();
      if (result.success) {
        setMessage('Zaszczepiono domyślne teksty w obu językach!');
        fetchContent();
      } else {
        setError(result.error || 'Błąd szczepienia');
      }
    } catch {
      setError('Błąd szczepienia');
    } finally {
      setSaving(false);
    }
  }

  function renderFormFields() {
    switch (selectedType) {
      case 'hero':
        return <HeroForm content={content} />;
      case 'about':
        return <AboutForm content={content} />;
      case 'settings':
        return <SettingsForm content={content} />;
      case 'instagram':
        return <InstagramSingleForm content={content} />;
      case 'footer':
        return <FooterForm content={content} />;
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <AdminPageHeader
        title="Zarządzanie Treścią"
        rightAction={
          <button
            onClick={handleSeed}
            disabled={saving}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm"
          >
            📥 Zaszczep domyślne teksty
          </button>
        }
      />

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Type Selector */}
        <div className="mb-8">
          <label className="block text-gray-400 text-sm mb-2">Wybierz sekcję do edycji:</label>
          <SectionTabs selected={selectedType} onChange={setSelectedType} />
        </div>

        {/* Language Selector */}
        <div className="mb-8">
          <label className="block text-gray-400 text-sm mb-2">Wybierz język:</label>
          <LanguageSwitcher selected={selectedLang} onChange={setSelectedLang} />
        </div>

        <StatusMessage message={message} error={error} />

        {loading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-2 border-[#b08d8d] border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : isMulti ? (
          /* Multi-item editing (Events) */
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-xl">{SECTION_LABELS[selectedType]}</h2>
              <button
                onClick={handleAddNew}
                disabled={saving}
                className="px-4 py-2 bg-[#b08d8d] text-white rounded-lg hover:opacity-90 disabled:opacity-50"
              >
                + Dodaj nowe
              </button>
            </div>
            <EventsForm items={items} saving={saving} onSave={handleSave} onDelete={handleDelete} />
          </div>
        ) : (
          /* Single-item editing */
          <div className="bg-[#111111] border border-gray-800 rounded-xl p-6">
            <h2 className="text-white text-xl mb-6">{SECTION_LABELS[selectedType]}</h2>

            <form onSubmit={handleSave}>
              <HiddenField name="id" value={content?.id || ''} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderFormFields()}
              </div>
              <div className="mt-6">
                <SubmitButton saving={saving} />
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}