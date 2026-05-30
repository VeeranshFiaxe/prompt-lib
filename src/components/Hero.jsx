'use client';

import { allPrompts } from '@/data/prompts';

export default function Hero() {
  const handleScrollToCategories = () => {
    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-transparent px-6 pt-20 pb-16 sm:px-10 lg:px-16">
      <div className="relative mx-auto max-w-3xl text-center flex flex-col items-center">
        {/* Brand chip */}
        <div className="mb-8 inline-flex items-center justify-center rounded-full border border-amber-200/60 bg-amber-50/50 px-4 py-1.5 shadow-sm ring-1 ring-amber-100/50">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-2 shadow-sm" />
          <span className="text-[10px] font-bold tracking-[0.2em] text-amber-700 uppercase">
            Fiaxe · Professional AI Toolkit
          </span>
        </div>

        {/* Heading: Serif Typography */}
        <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-[4.5rem] text-slate-800 pb-2 font-serif">
          Your AI Prompt <br className="hidden sm:block" />
          <span className="italic font-medium text-amber-700/90 tracking-normal">Library</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base text-slate-500 leading-relaxed max-w-lg mx-auto">
          {allPrompts.length} ready-to-use prompts for insurance professionals. Copy, paste into Claude or ChatGPT, and get polished professional output in seconds.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleScrollToCategories}
            className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-[#1e293b] px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-slate-900/10 active:scale-[0.98]"
          >
            Browse All Prompts
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
          
          <button
            onClick={() => document.querySelector('input[type="search"]')?.focus()}
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-slate-700 border border-slate-200 transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-100 active:scale-[0.98]"
          >
            Search Prompts
          </button>
        </div>
      </div>
    </section>
  );
}
