"use client";

import Link from 'next/link';

export default function AdminPageHeader({ title, backHref = '/panel-admin-glowny', backLabel = '← Powrót', rightAction }) {
  return (
    <header className="border-b border-gray-800 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={backHref} className="text-gray-400 hover:text-white">
            {backLabel}
          </Link>
          <h1 className="text-white text-lg font-medium">{title}</h1>
        </div>
        {rightAction}
      </div>
    </header>
  );
}