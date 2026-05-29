'use client';

import { useFavorites } from '../context/FavoritesContext';
import { allPrompts, categoryGroups } from '../data/prompts';
import { IconCopy, IconCheck, IconX } from './Icons';
import { useState } from 'react';

// Build subcategoryId -> name lookup once
const subcategoryNameMap = {};
categoryGroups.forEach((g) =>
  g.subcategories.forEach((s) => { subcategoryNameMap[s.id] = s.name; })
);

function FavoriteCard({ prompt, onRemove }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.fullPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* silent */ }
  };

  return (
    <div className="group relative flex min-w-[220px] max-w-[260px] flex-shrink-0 flex-col rounded-xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:shadow-md overflow-hidden">
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
          className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all ${
            copied
              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
              : 'bg-gradient-to-b from-amber-50 to-orange-50 text-amber-700 ring-1 ring-amber-200/70 hover:from-amber-100 hover:to-orange-100 hover:shadow-sm'
          }`}
        >
          {copied ? <IconCheck className="w-3 h-3" /> : <IconCopy className="w-3 h-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>

        <button
          onClick={onRemove}
          aria-label="Remove from saved"
          className="rounded-lg p-1.5 text-slate-300 transition-colors hover:text-red-500 hover:bg-slate-50"
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
  const favoritePrompts = allPrompts.filter((p) => favorites.includes(p.id));

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
            onRemove={() => toggleFavorite(prompt.id)}
          />
        ))}
      </div>
    </section>
  );
}
