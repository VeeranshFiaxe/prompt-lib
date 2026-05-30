'use client';

import SearchBar from './SearchBar';

export default function TopNav({ searchQuery, setSearchQuery }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
        {/* Left: Brand / Logo Area */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/20">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <span className="font-sans text-lg font-bold tracking-tight text-slate-800">
            Advisor<span className="text-amber-600 font-serif italic font-medium ml-1">AI</span>
          </span>
          <span className="font-sans text-xs font-normal text-slate-400 pl-2 border-l border-slate-200 ml-1">
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
