"use client";

/**
 * Messages Management Page
 * 
 * Admin page for managing messages/reservations from guests.
 * 
 * @example
 * Access: /zarzadzanie-wiadomosciami
 */

import AdminLayout from "@/app/components/AdminLayout";

export default function MessagesManagement() {
  return (
    <AdminLayout title="Wiadomości">
      <MessagesContent />
    </AdminLayout>
  );
}

/**
 * MessagesContent Component
 * 
 * Placeholder content - actual implementation needed.
 */
function MessagesContent() {
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
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
            />
          </svg>
        </div>
        <h2 className="text-xl text-white font-medium mb-2">Wiadomości</h2>
        <p className="text-gray-500 mb-4">
          Ta sekcja pozwoli na przeglądanie i zarządzanie wiadomościami od gości.
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
