'use client';

import SearchBar from './SearchBar';

export default function TopNav({ searchQuery, setSearchQuery }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
        {/* Left: Brand / Logo Area */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-900 text-white">
            {/* Simple logo placeholder icon matching the reference */}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-serif text-sm font-semibold tracking-wide text-slate-800">
            Tata AIA <span className="font-sans text-slate-400 font-normal ml-1">· AI Prompt Library</span>
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
