'use client';

import { useEffect } from 'react';
import PromptCard from './PromptCard';
import { SubcategoryIcon, IconChevronLeft, IconX } from './Icons';

export default function SubcategoryDrawer({ subcategory, prompts = [], isOpen, onClose }) {
  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose?.(); };
    if (isOpen) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Drawer panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={subcategory?.name ?? 'Prompts'}
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-xl flex-col bg-[#f8f9fa] shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 z-10" />
        
        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-slate-200/80 bg-white/95 backdrop-blur-md px-5 py-4">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
          >
            <IconChevronLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex items-center gap-2 max-w-[50%] min-w-0">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 shadow-sm ring-1 ring-amber-100 flex-shrink-0">
              <SubcategoryIcon id={subcategory?.id} className="w-4 h-4" />
            </span>
            <h2 className="text-sm font-bold text-slate-800 truncate" title={subcategory?.name}>
              {subcategory?.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-800"
          >
            <IconX className="w-4 h-4" />
          </button>
        </div>

        {/* Prompt list */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {prompts.length === 0 ? (
            <p className="py-16 text-center text-sm text-slate-400">No prompts in this section yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {prompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
