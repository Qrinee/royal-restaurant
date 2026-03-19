"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check URL for demo mode
    const urlParams = new URLSearchParams(window.location.search);
    const isDemo = urlParams.get('demo') === 'true';
    
    if (isDemo) {
      setDemoMode(true);
      setUser({ username: 'demo' });
      setLoading(false);
      return;
    }

    // Check if user is logged in - the middleware handles protection
    // Just verify we have a valid session
    const checkAuth = async () => {
      try {
        // Try to fetch a protected resource to verify session
        const response = await fetch('/api/auth/verify', {
          method: 'GET',
          credentials: 'include'
        });
        
        if (!response.ok) {
          router.push('/logowanie-admin');
        } else {
          const data = await response.json();
          setUser({ username: data.username || 'admin' });
        }
      } catch (e) {
        router.push('/logowanie-admin');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    if (demoMode) {
      router.push('/logowanie-admin');
      return;
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#b08d8d] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const menuItems = [
    {
      title: 'Zarządzanie Menu',
      description: 'Dodawanie, edycja i usuwanie pozycji menu',
      href: '/zarzadzanie-menu',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: 'Ustawienia',
      description: 'Konfiguracja systemu i parametrów restauracji',
      href: '/ustawienia-systemu',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
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
          </div>
          
          <div className="flex items-center gap-4">
            {demoMode && (
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                TRYBIK DEMO
              </span>
            )}
            <span className="text-gray-400 text-sm">{user?.username}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-gray-700 text-gray-300 text-sm rounded-lg hover:bg-gray-800 hover:border-gray-600 transition-colors"
            >
              {demoMode ? 'Wyjdź z demo' : 'Wyloguj'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl text-white font-light mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
            Witaj w panelu admina
          </h2>
          <p className="text-gray-500">Wybierz sekcję do zarządzania</p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="group bg-[#111111] border border-gray-800 rounded-2xl p-6 hover:border-[#b08d8d]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#b08d8d]/5"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#b08d8d]/10 rounded-xl flex items-center justify-center text-[#b08d8d] group-hover:bg-[#b08d8d] group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-white text-lg font-medium mb-1 group-hover:text-[#b08d8d] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
                <svg className="w-5 h-5 text-gray-600 group-hover:text-[#b08d8d] group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">


        </div>
      </main>
    </div>
  );
}
