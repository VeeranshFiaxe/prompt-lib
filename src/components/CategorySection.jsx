'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import SubcategoryCard from './SubcategoryCard';
import { GroupIcon, IconChevronLeft, IconChevronRight } from './Icons';

const SCROLL_STEP = 280;

const THEME_CLASSES = {
  blue: {
    line: 'bg-blue-500',
    pillText: 'text-blue-600',
    pillBorder: 'border-blue-100',
  },
  amber: {
    line: 'bg-amber-500',
    pillText: 'text-amber-600',
    pillBorder: 'border-amber-100',
  },
  rose: {
    line: 'bg-rose-500',
    pillText: 'text-rose-600',
    pillBorder: 'border-rose-100',
  },
  violet: {
    line: 'bg-violet-500',
    pillText: 'text-violet-600',
    pillBorder: 'border-violet-100',
  },
  teal: {
    line: 'bg-teal-500',
    pillText: 'text-teal-600',
    pillBorder: 'border-teal-100',
  },
};

export default function CategorySection({ group, onSubcategoryClick }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [updateArrows]);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir === 'left' ? -SCROLL_STEP : SCROLL_STEP,
      behavior: 'smooth',
    });
  };

  // Fallback to slate if theme not found
  const theme = THEME_CLASSES[group.theme] || {
    line: 'bg-[#1e293b]',
    pillText: 'text-slate-500',
    pillBorder: 'border-slate-200',
  };

  return (
    <section className="group/row px-4 py-6 sm:px-6 lg:px-10">
      {/* Section heading */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Vertical accent line */}
          <div className={`h-6 w-1 rounded-full ${theme.line}`} />
          
          <h2 className="text-xl font-bold text-slate-800">
            {group.name}
          </h2>
          
          {/* Subtle pill for prompt count */}
          <span className={`ml-3 rounded-full border bg-white px-2.5 py-0.5 text-[10px] font-bold ${theme.pillBorder} ${theme.pillText}`}>
            {group.subcategories.reduce((acc, sub) => acc + (sub.promptCount || 0), 0)} prompts
          </span>
        </div>

        {/* Arrow controls — visible when rows overflow */}
        <div className="flex items-center gap-1">
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-800"
            >
              <IconChevronLeft className="w-3.5 h-3.5" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-800"
            >
              <IconChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pt-4 pb-6 -mt-4 px-1 -mx-1 scrollbar-thin"
      >
        {group.subcategories.map((sub) => (
          <SubcategoryCard
            key={sub.id}
            subcategory={sub}
            theme={group.theme}
            onClick={() => onSubcategoryClick?.(sub)}
          />
        ))}
      </div>
    </section>
  );
}
