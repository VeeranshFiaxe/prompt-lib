'use client';

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';
import { useFavorites } from '../context/FavoritesContext';
import { categoryGroups, allPrompts } from '../data/prompts';
import { IconCopy, IconCheck, IconX } from './Icons';

// Build subcategoryId -> name lookup once
const subcategoryNameMap = {};
categoryGroups.forEach((g) =>
  g.subcategories.forEach((s) => { subcategoryNameMap[s.id] = s.name; })
);

function FavoriteCard({ prompt, onRemove, onClick }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation(); // Stop click from opening the modal
    try {
      await navigator.clipboard.writeText(prompt.fullPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* silent */ }
  };

  const handleRemove = (e) => {
    e.stopPropagation(); // Stop click from opening the modal
    onRemove();
  };

  return (
    <div 
      onClick={onClick}
      className="group relative flex min-w-[220px] max-w-[260px] flex-shrink-0 flex-col rounded-xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:shadow-md overflow-hidden cursor-pointer hover:bg-slate-50/40 hover:-translate-y-0.5 active:scale-[0.98]"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-300 to-amber-500 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="pl-2">
        <p className="text-xs font-bold leading-snug text-slate-800 line-clamp-2">
          {prompt.title}
        </p>
        {subcategoryNameMap[prompt.subcategoryId] && (
          <p className="mt-0.5 text-xs text-slate-400">
            {subcategoryNameMap[prompt.subcategoryId]}
          </p>
        )}

        <div className="mt-3 flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all bg-gradient-to-b from-amber-50 to-orange-50 text-amber-700 ring-1 ring-amber-200/70 hover:from-amber-100 hover:to-orange-100 hover:shadow-sm cursor-pointer"
          >
            {copied ? <IconCheck className="w-3 h-3" /> : <IconCopy className="w-3 h-3" />}
            {copied ? 'Copied' : 'Copy'}
          </button>

          <button
            onClick={handleRemove}
            aria-label="Remove from saved"
            className="rounded-lg p-1.5 text-slate-300 transition-colors hover:text-red-500 hover:bg-slate-50 cursor-pointer"
          >
            <IconX className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FavoritesRow() {
  const { favorites, toggleFavorite } = useFavorites();
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const favoritePrompts = allPrompts.filter((p) => favorites.includes(p.id));

  // Lock body scroll while modal is active
  useEffect(() => {
    document.body.style.overflow = selectedPrompt ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedPrompt]);

  // Close modal on Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setSelectedPrompt(null);
    };
    if (selectedPrompt) window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedPrompt]);

  // Auto-close modal if active prompt is removed from favorites
  const handleRemove = (id) => {
    toggleFavorite(id);
    if (selectedPrompt?.id === id) {
      setSelectedPrompt(null);
    }
  };

  if (favoritePrompts.length === 0) return null;

  return (
    <section className="border-b border-slate-100 px-4 py-5 sm:px-6 lg:px-10">
      <div className="mb-3 flex items-center gap-2">
        <h2 className="text-sm font-semibold text-slate-700">Saved prompts</h2>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
          {favoritePrompts.length}
        </span>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-thin">
        {favoritePrompts.map((prompt) => (
          <FavoriteCard
            key={prompt.id}
            prompt={prompt}
            onClick={() => setSelectedPrompt(prompt)}
            onRemove={() => handleRemove(prompt.id)}
          />
        ))}
      </div>

      {/* Detail Modal overlay for full PromptCard experience */}
      {selectedPrompt && (
        <>
          {/* Backdrop overlay */}
          <div
            onClick={() => setSelectedPrompt(null)}
            aria-hidden="true"
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto opacity-100"
          />

          {/* Modal Centering block */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="relative flex flex-col w-full max-w-xl mx-auto bg-slate-50 rounded-2xl shadow-2xl border border-slate-200/80 ring-1 ring-black/5 pointer-events-auto transition-all duration-300 scale-100 max-h-[85vh] sm:max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200/60 bg-white px-5 py-3 rounded-t-2xl shadow-sm z-10 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-50 text-amber-600 shadow-sm ring-1 ring-amber-100">
                    ❤️
                  </span>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Saved Prompt</span>
                </div>
                <button
                  onClick={() => setSelectedPrompt(null)}
                  aria-label="Close"
                  className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <IconX className="w-3.5 h-3.5" />
                  Close
                </button>
              </div>

              {/* Scrollable content body */}
              <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
                <PromptCard prompt={selectedPrompt} />
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
