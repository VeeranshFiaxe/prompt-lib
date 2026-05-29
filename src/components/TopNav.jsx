'use client';

import SearchBar from './SearchBar';
import Image from 'next/image';

export default function TopNav({ searchQuery, setSearchQuery }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
        {/* Left: Brand / Logo Area */}
        <div className="flex items-center gap-3">
          <Image 
            src="/tata-aia-logo.png" 
            alt="Tata AIA Life Insurance" 
            width={120} 
            height={32}
            className="h-7 w-auto object-contain"
          />
          <span className="font-sans text-sm font-normal text-slate-400 pl-2 border-l border-slate-200">
            AI Prompt Library
          </span>
        </div>

        {/* Right: Search Bar */}
        <div className="w-full max-w-sm ml-4">
          <SearchBar onSearch={setSearchQuery} />
        </div>
      </div>
    </header>
  );
}
