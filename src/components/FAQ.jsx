'use client';

import { useState } from 'react';
import { IconChevronDown } from './Icons';

const FAQ_ITEMS = [
  {
    question: 'What is this Prompt Library?',
    answer:
      'A curated collection of ready-to-use AI prompts for Tata AIA partner office professionals. Instead of figuring out what to ask the AI, you copy a prompt, paste it into ChatGPT or Claude, and get a polished output in seconds.',
  },
  {
    question: 'What is the PET Framework?',
    answer:
      "PET stands for Persona, Environment, and Task. Each prompt tells the AI three things: who to act as (e.g., a senior insurance advisor), the context and background it needs, and exactly what to produce for you. This structure gives you accurate, relevant, professional results every time.",
  },
  {
    question: 'How do I use these prompts?',
    answer:
      "It takes about 30 seconds. Open any subcategory, click Copy on a prompt, then open ChatGPT (chat.openai.com) or Claude (claude.ai) and paste it. The AI will ask you a few short questions. Answer them naturally and you will receive a polished, ready-to-use output. You can then refine it by saying 'make it shorter' or 'change the tone to formal'.",
  },
  {
    question: 'Do I need technical knowledge?',
    answer:
      'None at all. If you can copy and paste text, you can use this library. Every prompt is written so you do not need to understand how AI works.',
  },
  {
    question: 'What are Claude and ChatGPT?',
    answer:
      'Claude (by Anthropic) and ChatGPT (by OpenAI) are AI assistants you access in your browser. Think of them as a knowledgeable colleague who can write emails, summarise documents, prepare reports, and more through simple conversation. Both are free to start using.',
  },
  {
    question: 'Will my saved prompts be lost?',
    answer:
      'Your saved prompts are stored in your browser storage. They persist as long as you use the same browser and do not clear your browsing data. They are private to your device and never shared.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section className="border-t border-slate-100 bg-white px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-slate-400">
          Frequently asked questions
        </h2>

        <div className="divide-y divide-slate-100 rounded-xl border border-slate-200">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className={`relative overflow-hidden transition-colors duration-300 ${isOpen ? 'bg-amber-50/40' : 'bg-transparent'}`}>
                {isOpen && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-amber-400" />}
                <button
                  onClick={() => toggle(i)}
                  className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold transition-colors ${isOpen ? 'text-amber-900' : 'text-slate-700 hover:bg-slate-50'}`}
                >
                  <span>{item.question}</span>
                  <IconChevronDown
                    className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-amber-500' : 'text-slate-400'}`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-250 ease-in-out ${
                    isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed text-slate-500">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
