"use client";

/**
 * Gallery Management Page
 * 
 * Admin page for managing the photo gallery.
 * 
 * @example
 * Access: /zarzadzanie-galeria
 */

import AdminLayout from "@/app/components/AdminLayout";

export default function GalleryManagement() {
  return (
    <AdminLayout title="Galeria">
      <GalleryContent />
    </AdminLayout>
  );
}

/**
 * GalleryContent Component
 * 
 * Placeholder content - actual implementation needed.
 */
function GalleryContent() {
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
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
        </div>
        <h2 className="text-xl text-white font-medium mb-2">Galeria</h2>
        <p className="text-gray-500 mb-4">
          Ta sekcja pozwoli na dodawanie i usuwanie zdjęć z galerii.
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
