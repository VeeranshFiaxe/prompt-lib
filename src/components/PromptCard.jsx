'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useFavorites } from '../context/FavoritesContext';
import { IconCopy, IconCheck, IconHeart, IconChevronDown } from './Icons';

export default function PromptCard({ prompt }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const liked = isFavorite(prompt.id);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.fullPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable in insecure context */
    }
  };

  const handleChatGPT = () => {
    const encodedPrompt = encodeURIComponent(prompt.fullPrompt);
    window.open(`https://chatgpt.com/?q=${encodedPrompt}`, '_blank');
  };

  const [claudeCopied, setClaudeCopied] = useState(false);
  const handleClaude = async () => {
    try {
      await navigator.clipboard.writeText(prompt.fullPrompt);
      setClaudeCopied(true);
      setTimeout(() => {
        setClaudeCopied(false);
        window.open('https://claude.ai/new', '_blank');
      }, 1000);
    } catch {
      window.open('https://claude.ai/new', '_blank');
    }
  };

  const formatPromptText = (text) => {
    return text.split('\n').map((line, i) => {
      // Handle section labels
      const sectionMatch = line.match(/^(PERSONA|ENVIRONMENT|TASK|OUTPUT RULES|OUTPUT)(:)(.*)/i);
      
      if (sectionMatch) {
        return (
          <span key={i} className="block mb-1.5">
            <span className="text-amber-400 font-bold">{sectionMatch[1]}{sectionMatch[2]}</span>
            <span className="text-slate-300">{sectionMatch[3]}</span>
          </span>
        );
      }

      // Handle variables like [YOUR NAME] inside regular lines
      if (line.trim() === '') return <span key={i} className="block h-3" />;
      
      const parts = line.split(/(\[[^\]]+\])/g);
      return (
        <span key={i} className="block mb-1.5 text-slate-300">
          {parts.map((part, j) => 
            part.startsWith('[') && part.endsWith(']') ? (
              <span key={j} className="text-sky-400 font-semibold tracking-wide">{part}</span>
            ) : (
              part
            )
          )}
        </span>
      );
    });
  };

  return (
    <div className={`relative rounded-xl border transition-all duration-300 overflow-hidden ${
      isExpanded 
        ? 'bg-amber-50/30 border-amber-200/60 shadow-md ring-1 ring-amber-100' 
        : 'bg-white border-slate-200 hover:shadow-md hover:border-slate-300'
    }`}>
      {/* Left accent strip */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 transition-colors duration-300 ${
        isExpanded ? 'bg-amber-400' : 'bg-transparent group-hover:bg-slate-200'
      }`} />

      {/* Top bar: title + actions */}
      <div className="flex items-start justify-between gap-4 pl-6 pr-5 pt-5 pb-3">
        <h3 className={`text-base font-bold leading-snug transition-colors duration-300 ${
          isExpanded ? 'text-amber-900' : 'text-slate-800'
        }`}>
          {prompt.title}
        </h3>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Use in ChatGPT */}
          <button
            onClick={handleChatGPT}
            className="group hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 active:scale-95"
          >
            <Image src="/chatgpt-logo.png" alt="ChatGPT" width={14} height={14} className="opacity-70 group-hover:opacity-100" />
            Use in ChatGPT
          </button>

          {/* Use in Claude */}
          <button
            onClick={handleClaude}
            className={`group hidden sm:flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold transition-all duration-200 active:scale-95 ${
              claudeCopied
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            <Image src="/claude-logo.png" alt="Claude" width={14} height={14} className="opacity-70 group-hover:opacity-100" />
            {claudeCopied ? 'Copied! Opening...' : 'Use in Claude'}
          </button>

          {/* Copy Prompt */}
          <button
            onClick={handleCopy}
            title={copied ? 'Copied' : 'Copy prompt'}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all duration-200 active:scale-95 ${
              copied
                ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                : 'bg-gradient-to-b from-amber-50 to-orange-50 text-amber-700 ring-1 ring-amber-200/70 hover:from-amber-100 hover:to-orange-100 hover:shadow-sm'
            }`}
          >
            {copied ? (
              <IconCheck className="w-3.5 h-3.5" />
            ) : (
              <IconCopy className="w-3.5 h-3.5" />
            )}
            {copied ? 'Copied' : 'Copy'}
          </button>

          <button
            onClick={() => toggleFavorite(prompt.id)}
            aria-label={liked ? 'Remove from saved' : 'Save prompt'}
            className={`rounded-lg p-1.5 transition-colors hover:bg-slate-100 ${
              liked
                ? 'text-red-500 hover:text-red-600'
                : 'text-slate-300 hover:text-red-400'
            }`}
          >
            <IconHeart className="w-4 h-4" filled={liked} />
          </button>
        </div>
      </div>

      {/* Use-case line */}
      {prompt.useCase && (
        <p className="pl-6 pr-5 pb-4 text-sm leading-relaxed text-slate-500">
          {prompt.useCase}
        </p>
      )}

      {/* View / hide toggle */}
      <div className={`border-t px-6 transition-colors duration-300 ${
        isExpanded ? 'border-amber-100' : 'border-slate-100'
      }`}>
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex w-full items-center justify-between py-3 text-xs font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-slate-600"
        >
          <span className={isExpanded ? 'text-amber-600' : ''}>{isExpanded ? 'Hide prompt' : 'View full prompt'}</span>
          <IconChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-300 ${
              isExpanded ? 'rotate-180 text-amber-600' : ''
            }`}
          />
        </button>
      </div>

      {/* Expandable prompt text */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-5 mb-5 rounded-xl bg-[#0f172a] shadow-inner ring-1 ring-slate-900/50">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-700/50 bg-slate-800/50 rounded-t-xl">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
            </div>
            <span className="text-[10px] font-mono text-slate-500 ml-2">PROMPT_ENGINE</span>
          </div>
          {/* Terminal body */}
          <div className="px-5 py-4 font-mono text-[13px] leading-relaxed overflow-x-auto scrollbar-thin">
            {formatPromptText(prompt.fullPrompt)}
          </div>
        </div>
      </div>
    </div>
  );
}
