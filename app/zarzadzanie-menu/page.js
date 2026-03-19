"use client";

/**
 * Menu Management Page
 * 
 * Admin page for managing restaurant menu items.
 * 
 * @example
 * Access: /zarzadzanie-menu
 */

import AdminLayout from "@/app/components/AdminLayout";

export default function MenuManagement() {
  return (
    <AdminLayout title="Zarządzanie Menu">
      <MenuManagementContent />
    </AdminLayout>
  );
}

/**
 * MenuManagementContent Component
 * 
 * Placeholder content - actual implementation needed.
 */
function MenuManagementContent() {
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
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
            />
          </svg>
        </div>
        <h2 className="text-xl text-white font-medium mb-2">Zarządzanie Menu</h2>
        <p className="text-gray-500 mb-4">
          Ta sekcja pozwoli na dodawanie, edycję i usuwanie pozycji z menu restauracji.
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
