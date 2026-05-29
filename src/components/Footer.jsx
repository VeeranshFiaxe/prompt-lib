import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/60 bg-gradient-to-b from-white to-[#f8f9fa] px-6 py-10 text-center relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
      <div className="flex justify-center mb-4">
        <Image 
          src="/tata-aia-logo.png" 
          alt="Tata AIA Life Insurance" 
          width={120} 
          height={32}
          className="h-8 w-auto object-contain grayscale opacity-60 transition-all hover:grayscale-0 hover:opacity-100"
        />
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
