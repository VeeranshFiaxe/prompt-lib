'use client';

import { SubcategoryIcon } from './Icons';

const CARD_THEMES = {
  blue: {
    iconBg: 'bg-blue-50 text-blue-500',
    iconHover: 'group-hover:bg-blue-100 group-hover:text-blue-600',
    pill: 'bg-blue-50 text-blue-600',
    arrowHover: 'group-hover:text-blue-500',
  },
  amber: {
    iconBg: 'bg-amber-50 text-amber-500',
    iconHover: 'group-hover:bg-amber-100 group-hover:text-amber-600',
    pill: 'bg-amber-50 text-amber-600',
    arrowHover: 'group-hover:text-amber-500',
  },
  rose: {
    iconBg: 'bg-rose-50 text-rose-500',
    iconHover: 'group-hover:bg-rose-100 group-hover:text-rose-600',
    pill: 'bg-rose-50 text-rose-600',
    arrowHover: 'group-hover:text-rose-500',
  },
  violet: {
    iconBg: 'bg-violet-50 text-violet-500',
    iconHover: 'group-hover:bg-violet-100 group-hover:text-violet-600',
    pill: 'bg-violet-50 text-violet-600',
    arrowHover: 'group-hover:text-violet-500',
  },
  teal: {
    iconBg: 'bg-teal-50 text-teal-500',
    iconHover: 'group-hover:bg-teal-100 group-hover:text-teal-600',
    pill: 'bg-teal-50 text-teal-600',
    arrowHover: 'group-hover:text-teal-500',
  },
  emerald: {
    iconBg: 'bg-emerald-50 text-emerald-500',
    iconHover: 'group-hover:bg-emerald-100 group-hover:text-emerald-600',
    pill: 'bg-emerald-50 text-emerald-600',
    arrowHover: 'group-hover:text-emerald-500',
  },
};

export default function SubcategoryCard({ subcategory, theme, onClick }) {
  const count = subcategory.promptCount ?? 0;
  
  const currentTheme = CARD_THEMES[theme] || {
    iconBg: 'text-slate-400',
    iconHover: 'group-hover:text-slate-600',
    pill: 'bg-slate-50 text-slate-600',
    arrowHover: 'group-hover:text-amber-500',
  };

  return (
    <button
      onClick={onClick}
      className="group flex min-w-[240px] max-w-[280px] flex-shrink-0 flex-col rounded-xl border border-slate-200/80 bg-white p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
    >
      {/* Icon */}
      <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300 ${currentTheme.iconBg} ${currentTheme.iconHover}`}>
        <SubcategoryIcon id={subcategory.id} className="w-5 h-5" />
      </div>

      {/* Name */}
      <p className="text-sm font-bold leading-snug text-slate-800">
        {subcategory.name}
      </p>

      {/* Description */}
      {subcategory.description && (
        <p className="mt-1.5 text-xs leading-relaxed text-slate-500 line-clamp-2">
          {subcategory.description}
        </p>
      )}

      {/* Spacer to push count to bottom */}
      <div className="flex-1" />

      {/* Bottom row: count & arrow */}
      <div className="mt-5 flex w-full items-center justify-between border-t border-slate-100 pt-3">
        {count > 0 ? (
          <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold ${currentTheme.pill}`}>
            {count} {count === 1 ? 'prompt' : 'prompts'}
          </span>
        ) : (
          <span />
        )}
        <svg className={`w-4 h-4 text-slate-300 transition-transform duration-300 group-hover:translate-x-1 ${currentTheme.arrowHover}`} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </button>
  );
}
