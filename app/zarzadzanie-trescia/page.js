"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from '../components/ImageUploader';

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
  
  const isMulti = selectedType === 'events' || selectedType === 'instagram';

  useEffect(() => {
    checkAuth();
  }, [selectedType, selectedLang]);

  async function checkAuth() {
    try {
      const res = await fetch('/api/auth/verify', { credentials: 'include' });
      if (!res.ok) {
        router.push('/logowanie-admin');
        return;
      }
      // Auth OK, fetch content
      fetchContent();
    } catch (e) {
      router.push('/logowanie-admin');
    }
  }

  async function fetchContent() {
    setLoading(true);
    try {
      const url = `/api/site-content?type=${selectedType}&lang=${selectedLang}`;
      const res = await fetch(url, { credentials: 'include' });
      const data = await res.json();
      
      if (data.success) {
        if (isMulti) {
          setItems(data.items || []);
        } else {
          setContent(data.content || null);
        }
      }
    } catch (e) {
      setError('Błąd pobierania danych');
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');
    
    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);
      
      const processedData = {};
      for (const key of Object.keys(data)) {
        if (key.startsWith('image1_') || key.startsWith('image2_')) {
          const field = key.split('_')[0];
          if (!processedData[field] && data[key]) {
            processedData[field] = data[key];
          }
        } else if (data[key] !== '') {
          processedData[key] = data[key];
        }
      }
      
      const res = await fetch(`/api/admin/site-content?upsert=true`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: selectedType, lang: selectedLang, ...processedData }),
        credentials: 'include'
      });
      
      const result = await res.json();
      if (result.success) {
        setMessage('Zapisano pomyślnie!');
        fetchContent();
      } else {
        setError(result.error || 'Błąd zapisywania');
      }
    } catch (e) {
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
        credentials: 'include'
      });
      const result = await res.json();
      if (result.success) {
        fetchContent();
      } else {
        setError(result.error || 'Błąd usuwania');
      }
    } catch (e) {
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
        credentials: 'include'
      });
      
      const result = await res.json();
      if (result.success) {
        setMessage('Dodano nową pozycję');
        fetchContent();
      } else {
        setError(result.error || 'Błąd dodawania');
      }
    } catch (e) {
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
        credentials: 'include'
      });
      
      const result = await res.json();
      if (result.success) {
        setMessage('Zaszczepiono domyślne teksty w obu językach!');
        fetchContent();
      } else {
        setError(result.error || 'Błąd szczepienia');
      }
    } catch (e) {
      setError('Błąd szczepienia');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="border-b border-gray-800 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/panel-admin-glowny" className="text-gray-400 hover:text-white">← Powrót</a>
            <h1 className="text-white text-lg font-medium">Zarządzanie Treścią</h1>
          </div>
          <button
            onClick={handleSeed}
            disabled={saving}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm"
          >
            📥 Zaszczep domyślne teksty
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Type Selector */}
        <div className="mb-8">
          <label className="block text-gray-400 text-sm mb-2">Wybierz sekcję do edycji:</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedType('hero')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                selectedType === 'hero'
                  ? 'bg-[#b08d8d] text-white' 
                  : 'bg-[#111111] text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              Sekcja Hero
            </button>
            <button
              onClick={() => setSelectedType('about')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                selectedType === 'about'
                  ? 'bg-[#b08d8d] text-white' 
                  : 'bg-[#111111] text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              O Nas
            </button>
            <button
              onClick={() => setSelectedType('events')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                selectedType === 'events'
                  ? 'bg-[#b08d8d] text-white' 
                  : 'bg-[#111111] text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              Eventy
            </button>
            <button
              onClick={() => setSelectedType('instagram')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                selectedType === 'instagram'
                  ? 'bg-[#b08d8d] text-white' 
                  : 'bg-[#111111] text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              Instagram
            </button>
            <button
              onClick={() => setSelectedType('settings')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                selectedType === 'settings'
                  ? 'bg-[#b08d8d] text-white' 
                  : 'bg-[#111111] text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              Ustawienia
            </button>
            <button
              onClick={() => setSelectedType('footer')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                selectedType === 'footer'
                  ? 'bg-[#b08d8d] text-white' 
                  : 'bg-[#111111] text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              Stopka
            </button>
          </div>
        </div>

        {/* Language Selector */}
        <div className="mb-8">
          <label className="block text-gray-400 text-sm mb-2">Wybierz język:</label>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedLang('pl')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                selectedLang === 'pl'
                  ? 'bg-[#b08d8d] text-white' 
                  : 'bg-[#111111] text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              🇵🇱 Polski
            </button>
            <button
              onClick={() => setSelectedLang('en')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                selectedLang === 'en'
                  ? 'bg-[#b08d8d] text-white' 
                  : 'bg-[#111111] text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              🇬🇧 English
            </button>
          </div>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-green-500/20 text-green-400 rounded-lg">{message}</div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 text-red-400 rounded-lg">{error}</div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-2 border-[#b08d8d] border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : isMulti ? (
          /* Multi-item editing */
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-xl">{selectedType === 'events' ? 'Eventy' : 'Instagram'}</h2>
              <button
                onClick={handleAddNew}
                disabled={saving}
                className="px-4 py-2 bg-[#b08d8d] text-white rounded-lg hover:opacity-90 disabled:opacity-50"
              >
                + Dodaj nowe
              </button>
            </div>
            
            {items.length === 0 ? (
              <p className="text-gray-500">Brak pozycji. Dodaj nową.</p>
            ) : (
              <div className="space-y-4">
                {items.map((item, idx) => (
                  <div key={item.id} className="bg-[#111111] border border-gray-800 rounded-xl p-4">
                    <form onSubmit={handleSave}>
                      <input type="hidden" name="id" value={item.id} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedType === 'events' ? (
                          <>
                            <div className="md:col-span-2">
                              <label className="block text-gray-400 text-xs mb-1 uppercase">Tytuł</label>
                              <input
                                type="text"
                                name="title"
                                defaultValue={item.title}
                                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-gray-400 text-xs mb-1 uppercase">Podtytuł</label>
                              <input
                                type="text"
                                name="subtitle"
                                defaultValue={item.subtitle}
                                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-gray-400 text-xs mb-1 uppercase">Opis</label>
                              <input
                                type="text"
                                name="description"
                                defaultValue={item.description}
                                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-gray-400 text-xs mb-1 uppercase">Przycisk 1</label>
                              <input
                                type="text"
                                name="ctaText"
                                defaultValue={item.ctaText}
                                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-gray-400 text-xs mb-1 uppercase">Link 1</label>
                              <input
                                type="text"
                                name="ctaLink"
                                defaultValue={item.ctaLink}
                                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-gray-400 text-xs mb-1 uppercase">Przycisk 2</label>
                              <input
                                type="text"
                                name="ctaText2"
                                defaultValue={item.ctaText2}
                                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-gray-400 text-xs mb-1 uppercase">Link 2</label>
                              <input
                                type="text"
                                name="ctaLink2"
                                defaultValue={item.ctaLink2}
                                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <ImageUploader name={`image1_${item.id}`} defaultValue={item.image1} label="Zdjęcie 1" />
                            </div>
                            <div>
                              <label className="block text-gray-400 text-xs mb-1 uppercase">URL 1</label>
                              <input
                                type="text"
                                name="link1"
                                defaultValue={item.link1}
                                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
                              />
                            </div>
                            <div>
                              <ImageUploader name={`image2_${item.id}`} defaultValue={item.image2} label="Zdjęcie 2" />
                            </div>
                            <div>
                              <label className="block text-gray-400 text-xs mb-1 uppercase">URL 2</label>
                              <input
                                type="text"
                                name="link2"
                                defaultValue={item.link2}
                                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
                              />
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button
                          type="submit"
                          disabled={saving}
                          className="px-4 py-2 bg-[#b08d8d] text-white rounded-lg hover:opacity-90 disabled:opacity-50"
                        >
                          {saving ? 'Zapisywanie...' : 'Zapisz'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500/20"
                        >
                          Usuń
                        </button>
                      </div>
                    </form>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Single-item editing */
          <div className="bg-[#111111] border border-gray-800 rounded-xl p-6">
            <h2 className="text-white text-xl mb-6">{selectedType === 'hero' ? 'Sekcja Hero' : selectedType === 'about' ? 'O Nas' : selectedType === 'settings' ? 'Ustawienia' : 'Stopka'}</h2>
            
            <form onSubmit={handleSave}>
              <input type="hidden" name="id" value={content?.id || ''} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedType === 'hero' ? (
                  <>
                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-xs mb-1 uppercase">BADGE (np. ROYAL RESTAURANT)</label>
                      <input
                        type="text"
                        name="badge"
                        defaultValue={content?.badge || ''}
                        className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-xs mb-1 uppercase">Tytuł</label>
                      <input
                        type="text"
                        name="title"
                        defaultValue={content?.title || ''}
                        className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-xs mb-1 uppercase">Podtytuł</label>
                      <input
                        type="text"
                        name="subtitle"
                        defaultValue={content?.subtitle || ''}
                        className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-xs mb-1 uppercase">Przyrostka (np. "przy polskim stole")</label>
                      <input
                        type="text"
                        name="suffix"
                        defaultValue={content?.suffix || ''}
                        className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-xs mb-1 uppercase">Opis</label>
                      <textarea
                        name="description"
                        defaultValue={content?.description || ''}
                        className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white min-h-[80px]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1 uppercase">Przycisk 1</label>
                      <input
                        type="text"
                        name="ctaText"
                        defaultValue={content?.ctaText || ''}
                        className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1 uppercase">Link 1</label>
                      <input
                        type="text"
                        name="ctaLink"
                        defaultValue={content?.ctaLink || ''}
                        className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1 uppercase">Przycisk 2</label>
                      <input
                        type="text"
                        name="ctaText2"
                        defaultValue={content?.ctaText2 || ''}
                        className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1 uppercase">Link 2</label>
                      <input
                        type="text"
                        name="ctaLink2"
                        defaultValue={content?.ctaLink2 || ''}
                        className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
                      />
                    </div>
                    <div>
                      <ImageUploader name="image1" defaultValue={content?.image1 || ''} label="Zdjęcie 1" />
                    </div>
                    <div>
                      <ImageUploader name="image2" defaultValue={content?.image2 || ''} label="Zdjęcie 2" />
                    </div>
                  </>
                ) : selectedType === 'about' ? (
                  <>
                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-xs mb-1 uppercase">Tytuł sekcji</label>
                      <input
                        type="text"
                        name="title"
                        defaultValue={content?.title || ''}
                        className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-xs mb-1 uppercase">Podtytuł</label>
                      <input
                        type="text"
                        name="sectionTitle"
                        defaultValue={content?.sectionTitle || ''}
                        className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-xs mb-1 uppercase">Opis (użyj \n\n do nowych akapitów)</label>
                      <textarea
                        name="description"
                        defaultValue={content?.description || ''}
                        className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white min-h-[200px]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1 uppercase">Zdjęcie</label>
                      <input
                        type="text"
                        name="image1"
                        defaultValue={content?.image1 || ''}
                        className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
                      />
                    </div>
<div>
                      <ImageUploader name="image1" defaultValue={content?.image1 || ''} label="Zdjęcie" />
                    </div>
                  </>
                ) : selectedType === 'settings' ? (
                  <>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1 uppercase">Nazwa restauracji</label>
                      <input
                        type="text"
                        name="restaurantName"
                        defaultValue={content?.restaurantName || ''}
                        className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1 uppercase">Adres</label>
                      <input
                        type="text"
                        name="address"
                        defaultValue={content?.address || ''}
                        className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1 uppercase">Telefon</label>
                      <input
                        type="text"
                        name="phone"
                        defaultValue={content?.phone || ''}
                        className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1 uppercase">Email</label>
                      <input
                        type="text"
                        name="email"
                        defaultValue={content?.email || ''}
                        className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1 uppercase">Instagram</label>
                      <input
                        type="text"
                        name="instagram"
                        defaultValue={content?.socialLinks?.instagram || ''}
                        className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1 uppercase">Facebook</label>
                      <input
                        type="text"
                        name="facebook"
                        defaultValue={content?.socialLinks?.facebook || ''}
                        className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
                      />
                    </div>
                  </>
                ) : (
                  <div className="md:col-span-2">
                    <label className="block text-gray-400 text-xs mb-1 uppercase">Copyright tekst</label>
                    <input
                      type="text"
                      name="description"
                      defaultValue={content?.description || ''}
                      className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
                    />
                  </div>
                )}
              </div>
              
              <button
                type="submit"
                disabled={saving}
                className="mt-6 px-6 py-3 bg-[#b08d8d] text-white rounded-lg hover:opacity-90 disabled:opacity-50"
              >
                {saving ? 'Zapisywanie...' : 'Zapisz zmiany'}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
