'use client';

import SearchBar from './SearchBar';
import { IconFiaxe } from './Icons';

export default function TopNav({ searchQuery, setSearchQuery }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
        {/* Left: Brand / Logo Area */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/20">
            <IconFiaxe className="w-5 h-5 text-white" />
          </div>
          <span className="font-sans text-lg font-extrabold tracking-tight text-slate-800">
            Fiaxe
          </span>
          <span className="font-sans text-xs font-normal text-slate-400 pl-2 border-l border-slate-200 ml-1 hidden sm:inline">
            Prompt Library
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
