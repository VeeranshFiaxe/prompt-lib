'use client';

import { useState, useMemo } from 'react';
import TopNav from '@/components/TopNav';
import Hero from '@/components/Hero';
import FavoritesRow from '@/components/FavoritesRow';
import CategorySection from '@/components/CategorySection';
import SubcategoryDrawer from '@/components/SubcategoryDrawer';
import HowToUse from '@/components/HowToUse';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import PromptCard from '@/components/PromptCard';
import { categoryGroups, getPromptsBySubcategory, allPrompts } from '@/data/prompts';

export default function HomePage() {
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubcategoryClick = (sub) => {
    setActiveSubcategory(sub);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setActiveSubcategory(null), 300);
  };

  const drawerPrompts = activeSubcategory
    ? getPromptsBySubcategory(activeSubcategory.id)
    : [];

  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];
    return allPrompts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.useCase.toLowerCase().includes(q) ||
        p.subcategoryId.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <main className="min-h-screen bg-[#fcfbf9]">
      <TopNav searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <Hero />
      <HowToUse />

      {/* Search results */}
      {isSearching && (
        <section className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
            {searchResults.length > 0
              ? `${searchResults.length} result${searchResults.length === 1 ? '' : 's'} for "${searchQuery}"`
              : `No results for "${searchQuery}"`}
          </p>

          {searchResults.length > 0 ? (
            <div className="flex flex-col gap-3">
              {searchResults.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              Try{' '}
              {['email', 'LinkedIn', 'meeting', 'report'].map((term, i, arr) => (
                <span key={term}>
                  <button
                    onClick={() => setSearchQuery(term)}
                    className="font-semibold text-amber-600 hover:underline"
                  >
                    {term}
                  </button>
                  {i < arr.length - 1 ? (i === arr.length - 2 ? ', or ' : ', ') : '.'}
                </span>
              ))}
            </p>
          )}
        </section>
      )}

      {/* Normal browsing view */}
      {!isSearching && (
        <>
          <FavoritesRow />

          <div id="categories">
            <div className="px-4 pt-5 pb-1 sm:px-6 lg:px-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Browse by category
              </p>
            </div>

            {categoryGroups.map((group) => (
              <CategorySection
                key={group.name}
                group={group}
                onSubcategoryClick={handleSubcategoryClick}
              />
            ))}
          </div>

          <FAQ />
        </>
      )}

      <Footer />

      <SubcategoryDrawer
        subcategory={activeSubcategory}
        prompts={drawerPrompts}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </main>
  );
}
