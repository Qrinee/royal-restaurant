"use client";

import { useState } from 'react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (loading) return;
    
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log('Login result:', response.status, data);

      if (response.ok && data.success) {
        // Direct redirect - stop everything
        window.location.replace('/panel-admin-glowny');
        return;
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
    
    return false;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(176, 141, 141, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(176, 141, 141, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#b08d8d]/10 rounded-full mb-4">
            <svg className="w-8 h-8 text-[#b08d8d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl text-white font-light tracking-wide" style={{ fontFamily: 'var(--font-playfair)' }}>
            Panel Administracyjny
          </h1>
          <p className="text-gray-500 text-sm mt-2">Zaloguj się aby zarządzać restauracją</p>
        </div>


        <form onSubmit={handleSubmit} className="bg-[#111111] border border-gray-800 rounded-2xl p-8 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-gray-400 text-xs tracking-wider mb-2">
                NAZWA UŻYTKOWNIKA
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#b08d8d] transition-colors"
                placeholder="Wprowadź nazwę użytkownika"
                required
                autoComplete="username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-400 text-xs tracking-wider mb-2">
                HASŁO
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#b08d8d] transition-colors"
                placeholder="Wprowadź hasło"
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 px-6 py-4 bg-[#b08d8d] text-white text-sm tracking-[0.15em] rounded-xl hover:bg-[#9a7a7a] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'LOGOWANIE...' : 'ZALOGUJ SIĘ'}
          </button>

          <div className="mt-6 text-center">
            <a href="/" className="text-gray-500 text-sm hover:text-[#b08d8d] transition-colors">
              ← Wróć do strony głównej
            </a>
          </div>
        </form>

        <p className="text-center text-gray-600 text-xs mt-6">
          🔒 HTTP-only cookies • Dostęp wyłącznie dla administratorów
        </p>
      </div>
    </div>
  );
}
