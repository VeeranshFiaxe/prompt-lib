'use client';

const STEPS = [
  { number: 1, text: 'Find your\nprompt' },
  { number: 2, text: 'Click\nCopy Prompt' },
  { number: 3, text: 'Paste into\nClaude or ChatGPT' },
  { number: 4, text: "Answer\nthe AI's\nquestions" },
  { number: 5, text: 'Use your\noutput' },
];

export default function HowToUse() {
  return (
    <section className="relative bg-transparent pb-10 overflow-hidden w-full">
      <div className="mx-auto max-w-4xl flex justify-center px-4 w-full">
        <div className="flex items-center rounded-2xl sm:rounded-full bg-white px-2 py-2 shadow-sm border border-slate-200/80 overflow-x-auto max-w-full scrollbar-none flex-nowrap shrink-0">
          {STEPS.map((step, i) => (
            <div key={step.number} className="flex items-center shrink-0">
              {/* Step indicator */}
              <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 shrink-0">
                <span className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[10px] sm:text-xs font-bold text-white">
                  {step.number}
                </span>
                <p className="text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500 whitespace-pre-line leading-tight shrink-0">
                  {step.text}
                </p>
              </div>

              {/* Separator line (don't show after last item) */}
              {i < STEPS.length - 1 && (
                <div className="h-8 w-px bg-slate-200 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
