"use client";

/**
 * System Settings Page
 * 
 * Admin page for system configuration.
 * 
 * @example
 * Access: /ustawienia-systemu
 */

import AdminLayout from "@/app/components/AdminLayout";

export default function SystemSettings() {
  return (
    <AdminLayout title="Ustawienia Systemu">
      <SettingsContent />
    </AdminLayout>
  );
}

/**
 * SettingsContent Component
 * 
 * Placeholder content - actual implementation needed.
 */
function SettingsContent() {
  return (
    <div className="bg-[#111111] border border-gray-800 rounded-2xl p-8">
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#b08d8d]/10 rounded-full mb-4">
          <svg 
            className="w-8 h-8 text-[#b08d8d]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="1.5" 
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="1.5" 
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
            />
          </svg>
        </div>
        <h2 className="text-xl text-white font-medium mb-2">Ustawienia Systemu</h2>
        <p className="text-gray-500 mb-4">
          Ta sekcja pozwoli na konfigurację parametrów restauracji.
        </p>
        <div className="bg-[#0a0a0a] rounded-xl p-4 max-w-md mx-auto">
          <p className="text-gray-400 text-sm">
            <span className="text-yellow-500">🚧</span> Strona w budowie...
          </p>
        </div>
      </div>
    </div>
  );
}
