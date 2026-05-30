import { IconFiaxe } from './Icons';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/60 bg-gradient-to-b from-white to-[#f8f9fa] px-6 py-10 text-center relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-slate-700 to-slate-800 text-white shadow-sm opacity-60">
          <IconFiaxe className="w-4.5 h-4.5 text-white" />
        </div>
        <span className="font-sans text-base font-extrabold tracking-tight text-slate-400">
          Fiaxe
        </span>
      </div>
      <p className="mt-1.5 text-xs text-slate-500">
        AI Prompt Library · Powered by the{' '}
        <span className="font-bold text-amber-600">PET Framework</span>{' '}
        <span className="opacity-70">(Persona, Environment, Task)</span>
      </p>
      <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-300">Version 1.0 · {year}</p>
    </footer>
  );
}
