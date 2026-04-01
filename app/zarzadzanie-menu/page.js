"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MenuManagement() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Form state - matching /menu page schema
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    english: '',
    price: '',
    category: '',
    tag: '',
    priority: 0
  });

  const router = useRouter();

  useEffect(() => {
    // Check auth first
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const res = await fetch('/api/auth/verify', { credentials: 'include' });
      if (!res.ok) {
        router.push('/logowanie-admin');
        return;
      }
      // Auth OK, fetch data
      fetchMenuItems();
      fetchCategories();
    } catch (e) {
      router.push('/logowanie-admin');
    }
  }

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('/api/admin/menu', { credentials: 'include' });
      const data = await response.json();
      console.log('fetchMenuItems: response =', data);
      
      if (data.success) {
        console.log('fetchMenuItems: items[0].id =', data.items[0]?.id);
        setItems(data.items);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to load menu items');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/menu?categories=true', { credentials: 'include' });
      const data = await response.json();
      
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (err) {
      console.error('Failed to load categories');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    console.log('handleSubmit: editingItem =', editingItem);
    console.log('handleSubmit: formData =', formData);
    
    try {
      const url = editingItem 
        ? `/api/admin/menu/${editingItem.id}`
        : '/api/admin/menu';
      
      console.log('handleSubmit: URL =', url);
      
      const method = editingItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setShowForm(false);
        setEditingItem(null);
        resetForm();
        fetchMenuItems();
        fetchCategories();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to save menu item');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Czy na pewno chcesz usunąć tę pozycję?')) return;
    
    try {
      const response = await fetch(`/api/admin/menu/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (data.success) {
        fetchMenuItems();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to delete menu item');
    }
  };

  const handleToggleAvailability = async (item) => {
    try {
      const response = await fetch(`/api/admin/menu/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ available: !item.available })
      });
      
      const data = await response.json();
      
      if (data.success) {
        fetchMenuItems();
      }
    } catch (err) {
      setError('Failed to update availability');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description || '',
      english: item.english || '',
      price: item.price,
      category: item.category,
      tag: item.tag || '',
      priority: item.priority || 0
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      english: '',
      price: '',
      category: '',
      tag: '',
      priority: 0
    });
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      router.push('/logowanie-admin');
    } catch (e) {
      console.error('Logout failed');
      router.push('/logowanie-admin');
    }
  };

  const openNewForm = () => {
    setEditingItem(null);
    resetForm();
    setShowForm(true);
  };

  // Group items by category - matching /menu page order
  const categoryOrder = [
    'MENU SEZONOWE',
    'SAŁATY',
    'PRZEKĄSKI',
    'DANIA GŁÓWNE',
    'DESERY',
    'KAWY I HERBATY',
    'NAPOJE',
    'PROSECCO & CHAMPAGNE',
    'WINA NA KIELISZKI',
    'WINA BIAŁE',
    'WINA CZERWONE',
    'PIWA',
    'ALKOHOL',
    'WÓDKI POLSKIE',
    'KOKTAJLE',
    'ZIMNE ORZEŹWIENIE',
    'BĄBELKI',
    'LEMONIADY',
    'KOKTAJLE BEZALKOHOLOWE'
  ];

  const sortedCategories = [...new Set(items.map(item => item.category))].sort((a, b) => {
    const aIndex = categoryOrder.indexOf(a);
    const bIndex = categoryOrder.indexOf(b);
    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#b08d8d] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
              <header className="border-b border-gray-800 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href={'/panel-admin-glowny'} className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#b08d8d]/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-[#b08d8d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div>
              <h1 className="text-white text-lg font-medium" style={{ fontFamily: 'var(--font-playfair)' }}>
                Panel Administracyjny
              </h1>
              <p className="text-gray-500 text-xs">Royal Restaurant</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="px-4 py-2 cursor-pointer border border-gray-700 text-gray-300 text-sm rounded-lg hover:bg-gray-800 hover:border-gray-600 transition-colors"
            >
              Wyloguj
            </button>
          </div>
        </div>
      </header>
      <div className='pt-10'></div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl text-white font-light" style={{ fontFamily: 'var(--font-playfair)' }}>
              Zarządzanie Menu
            </h1>
            <p className="text-gray-500 text-sm mt-1">{items.length} pozycji w menu</p>
          </div>
          <button
            onClick={openNewForm}
            className="px-6 py-3 bg-[#b08d8d] text-white rounded-xl hover:bg-[#9a7a7a] transition-colors"
          >
            + Dodaj pozycję
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Menu Items by Category - matching /menu page style */}
        {sortedCategories.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">Brak pozycji w menu</p>
            <button
              onClick={openNewForm}
              className="text-[#b08d8d] hover:underline"
            >
              Dodaj pierwszą pozycję
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {sortedCategories.map((category) => {
              const categoryItems = items.filter(item => item.category === category).sort((a, b) => (b.priority || 0) - (a.priority || 0));
              return (
                <div key={category} className="bg-[#111111] border border-gray-800 rounded-2xl p-6">
                  <h2 className="text-xl text-white font-light mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
                    {category}
                    <span className="text-gray-500 text-sm ml-2">({categoryItems.length})</span>
                  </h2>
                  
                  <div className="space-y-3">
                    {categoryItems.map((item) => (
                      <div
                        key={item.id}
                        className={`flex justify-between items-center p-3 bg-[#0a0a0a] rounded-xl ${!item.available ? 'opacity-50' : ''}`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{item.name}</span>
                            {item.tag && (
                              <span className="text-[10px] px-2 py-0.5 bg-green-500/20 text-green-400 rounded">
                                {item.tag}
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-gray-500 text-xs mt-1">{item.description}</p>
                          )}
                          {item.english && (
                            <p className="text-gray-600 text-[10px] italic mt-0.5">{item.english}</p>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <span className="text-[#b08d8d] font-medium whitespace-nowrap">
                            {item.price}
                          </span>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleToggleAvailability(item)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-green-400 hover:bg-green-400/10 transition-all"
                              title={item.available ? 'Wyłącz' : 'Włącz'}
                            >
                              {item.available ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                              )}
                            </button>
                            <button
                              onClick={() => handleEdit(item)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-[#b08d8d] hover:bg-[#b08d8d]/10 transition-all"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-all"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl text-white font-light mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
                {editingItem ? 'Edytuj pozycję' : 'Dodaj nową pozycję'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-xs tracking-wider mb-2">
                    NAZWA *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-xl text-white focus:outline-none focus:border-[#b08d8d]"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-xs tracking-wider mb-2">
                    OPIS (POLSKI)
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-xl text-white focus:outline-none focus:border-[#b08d8d]"
                    placeholder="np. sos grzybowy / rukola / ser dojrzewający"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-xs tracking-wider mb-2">
                    OPIS (ANGIELSKI)
                  </label>
                  <input
                    type="text"
                    value={formData.english}
                    onChange={(e) => setFormData({ ...formData, english: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-xl text-white focus:outline-none focus:border-[#b08d8d]"
                    placeholder="np. mushroom sauce / arugula / aged cheese"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs tracking-wider mb-2">
                      CENA *
                    </label>
                    <input
                      type="text"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-xl text-white focus:outline-none focus:border-[#b08d8d]"
                      placeholder="np. 49 zł"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-xs tracking-wider mb-2">
                      KATEGORIA *
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      list="categories"
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-xl text-white focus:outline-none focus:border-[#b08d8d]"
                      required
                    />
                    <datalist id="categories">
                      {categories.map((cat) => (
                        <option key={cat} value={cat} />
                      ))}
                      <option value="MENU SEZONOWE" />
                      <option value="SAŁATY" />
                      <option value="PRZEKĄSKI" />
                      <option value="DANIA GŁÓWNE" />
                      <option value="DESERY" />
                      <option value="KAWY I HERBATY" />
                      <option value="NAPOJE" />
                      <option value="PROSECCO & CHAMPAGNE" />
                      <option value="WINA NA KIELISZKI" />
                      <option value="WINA BIAŁE" />
                      <option value="WINA CZERWONE" />
                      <option value="PIWA" />
                      <option value="ALKOHOL" />
                      <option value="WÓDKI POLSKIE" />
                      <option value="KOKTAJLE" />
                      <option value="ZIMNE ORZEŹWIENIE" />
                      <option value="BĄBELKI" />
                      <option value="LEMONIADY" />
                      <option value="KOKTAJLE BEZALKOHOLOWE" />
                    </datalist>
                  </div>
                </div>
                
                  <div>
                  <label className="block text-gray-400 text-xs tracking-wider mb-2">
                    TAG (OPCJONALNIE)
                  </label>
                  <input
                    type="text"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-xl text-white focus:outline-none focus:border-[#b08d8d]"
                    placeholder="np. vegan, gluten-free"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-xs tracking-wider mb-2">
                    PRIORYTET (KOLEJNOŚĆ WYŚWIETLANIA)
                  </label>
                  <input
                    type="number"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-xl text-white focus:outline-none focus:border-[#b08d8d]"
                    placeholder="0"
                  />
                  <p className="text-gray-500 text-xs mt-1">Większa liczba = wyżej na liście</p>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingItem(null);
                      resetForm();
                    }}
                    className="flex-1 px-6 py-3 border border-gray-700 text-gray-400 rounded-xl hover:border-gray-600 transition-colors"
                  >
                    Anuluj
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-[#b08d8d] text-white rounded-xl hover:bg-[#9a7a7a] transition-colors"
                  >
                    {editingItem ? 'Zapisz' : 'Dodaj'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
