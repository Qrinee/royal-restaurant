"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import SectionTabs from '../components/admin/SectionTabs';
import LanguageSwitcher from '../components/admin/LanguageSwitcher';
import AdminPageHeader from '../components/admin/AdminPageHeader';
import StatusMessage from '../components/admin/StatusMessage';
import LivePreview from '../components/admin/LivePreview';
import { HiddenField, SubmitButton } from '../components/admin/Field';
import HeroForm from '../components/admin/forms/HeroForm';
import AboutForm from '../components/admin/forms/AboutForm';
import EventsForm from '../components/admin/forms/EventsForm';
import InstagramSingleForm from '../components/admin/forms/InstagramSingleForm';
import FooterForm from '../components/admin/forms/FooterForm';

const SECTION_LABELS = {
  hero: 'Sekcja Hero',
  about: 'O Nas',
  events: 'Eventy',
  instagram: 'Instagram',
  footer: 'Stopka',
};

const SINGLE_TYPES = ['hero', 'about', 'footer', 'instagram'];

export default function ContentManagementPage() {
  const [selectedType, setSelectedType] = useState('hero');
  const [selectedLang, setSelectedLang] = useState('pl');
  const [content, setContent] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const router = useRouter();

  const isMulti = selectedType === 'events';

  const fetchContent = useCallback(async () => {
    setLoading(true);
    try {
      const timestamp = Date.now();
      // For footer, don't filter by lang - footer data is lang-agnostic
      const langParam = selectedType === 'footer' ? '' : `&lang=${selectedLang}`;
      const url = `/api/site-content?type=${selectedType}${langParam}&_t=${timestamp}`;
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
      const pdfFields = ['ctaLink', 'ctaLink2'];

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
        } else if (pdfFields.some((f) => key.startsWith(f + '_')) && data[key]) {
          const field = key.split('_')[0];
          if (!processedData[field]) {
            processedData[field] = data[key];
          }
        } else if (data[key] !== '') {
          processedData[key] = data[key];
        }
      }

      if (hasImageUpdate) {
        processedData.updateAllLangs = true;
      }

      // For footer: nest social fields into socialLinks object, save without lang
      const body = selectedType === 'footer'
        ? (() => {
            const { instagram, facebook, ...rest } = processedData;
            const socialLinks = {};
            if (instagram) socialLinks.instagram = instagram;
            if (facebook) socialLinks.facebook = facebook;
            return { type: selectedType, ...rest, ...(Object.keys(socialLinks).length > 0 ? { socialLinks } : {}) };
          })()
        : { type: selectedType, lang: selectedLang, ...processedData };

      const res = await fetch('/api/admin/site-content?upsert=true', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
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
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className={`px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-1.5 ${
                showPreview
                  ? 'bg-[#b08d8d] text-white'
                  : 'bg-[#111111] text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {showPreview ? 'Ukryj podgląd' : 'Podgląd'}
            </button>
            <button
              onClick={handleSeed}
              disabled={saving}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm"
            >
              📥 Zaszczep domyślne teksty
            </button>
          </div>
        }
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Type + Language Selectors */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Wybierz sekcję do edycji:</label>
            <SectionTabs selected={selectedType} onChange={setSelectedType} />
          </div>
          {selectedType !== 'footer' && (
            <div>
              <label className="block text-gray-400 text-sm mb-2">Wybierz język:</label>
              <LanguageSwitcher selected={selectedLang} onChange={setSelectedLang} />
            </div>
          )}
        </div>

        <StatusMessage message={message} error={error} />

        {loading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-2 border-[#b08d8d] border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <div className={`grid ${showPreview ? 'grid-cols-1 lg:grid-cols-2 gap-6' : 'grid-cols-1'}`}>
            {/* Editor Column */}
            <div>
              {isMulti ? (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-white text-xl">{SECTION_LABELS[selectedType]}</h2>
                    <button
                      onClick={handleAddNew}
                      disabled={saving}
                      className="px-4 py-2 bg-[#b08d8d] text-white rounded-lg hover:opacity-90 disabled:opacity-50 text-sm"
                    >
                      + Dodaj nowe
                    </button>
                  </div>
                  <EventsForm items={items} saving={saving} onSave={handleSave} onDelete={handleDelete} />
                </div>
              ) : (
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
            </div>

            {/* Live Preview Column */}
            {showPreview && (
              <div>
                <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 sticky top-6">
                  <h2 className="text-white text-sm font-medium mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#b08d8d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Podgląd na żywo
                    <span className="text-gray-600 text-xs font-normal ml-auto">po zapisaniu</span>
                  </h2>
                  <div className="bg-[#0a0a0a] rounded-lg p-1">
                    <LivePreview type={selectedType} content={content} items={items} />
                  </div>
                  <p className="text-gray-600 text-xs mt-3 text-center">
                    To jest miniatura — rzeczywisty wygląd może się nieznacznie różnić
                  </p>
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block text-center text-xs text-[#b08d8d] hover:text-white transition-colors underline underline-offset-2"
                  >
                    Otwórz pełną stronę w nowej karcie →
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}