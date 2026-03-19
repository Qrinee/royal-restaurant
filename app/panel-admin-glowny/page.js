"use client";

/**
 * Admin Dashboard Page
 * 
 * Main admin panel page showing overview and navigation to management sections.
 * Uses shared AdminLayout and AdminNavigation components.
 * 
 * @example
 * Access: /panel-admin-glowny
 */

import AdminLayout, { AdminNavigation, AdminStatsCard } from "../components/AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout title="Panel Administracyjny">
      <DashboardContent />
    </AdminLayout>
  );
}

/**
 * DashboardContent Component
 * 
 * Main dashboard content with welcome message and navigation.
 */
function DashboardContent() {
  return (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 
          className="text-2xl text-white font-light mb-2" 
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Witaj w panelu admina
        </h2>
        <p className="text-gray-500">Wybierz sekcję do zarządzania</p>
      </div>

      {/* Navigation Cards */}
      <AdminNavigationMenu />

      {/* Quick Stats */}
      <QuickStats />
    </>
  );
}

/**
 * AdminNavigationMenu Component
 * 
 * Grid of navigation cards for different admin sections.
 */
function AdminNavigationMenu() {
  const menuItems = [
    {
      title: "Zarządzanie Menu",
      description: "Dodawanie, edycja i usuwanie pozycji menu",
      href: "/zarzadzanie-menu",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: "Wiadomości",
      description: "Zarządzanie wiadomościami od gości",
      href: "/zarzadzanie-wiadomosciami",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Galeria",
      description: "Zarządzanie zdjęciami w galerii",
      href: "/zarzadzanie-galeria",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Ustawienia",
      description: "Konfiguracja systemu i parametrów restauracji",
      href: "/ustawienia-systemu",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
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
            <svg 
              className="w-5 h-5 text-gray-600 group-hover:text-[#b08d8d] group-hover:translate-x-1 transition-all duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </a>
      ))}
    </div>
  );
}

/**
 * QuickStats Component
 * 
 * Statistics cards showing overview data.
 */
function QuickStats() {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatsCard 
        label="POZYCJE MENU" 
        value="48"
        icon={
          <svg className="w-5 h-5 text-[#b08d8d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        }
      />

      <StatsCard 
        label="WIADOMOŚCI" 
        value="3"
        icon={
          <svg className="w-5 h-5 text-[#b08d8d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        }
      />
    </div>
  );
}

/**
 * StatsCard Component
 * 
 * Individual statistics card.
 */
function StatsCard({ label, value, icon }) {
  return (
    <div className="bg-[#111111] border border-gray-800 rounded-xl p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-xs tracking-wider mb-1">{label}</p>
          <p className="text-2xl text-white font-light">{value}</p>
        </div>
        <div className="w-10 h-10 bg-[#b08d8d]/10 rounded-lg flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}
