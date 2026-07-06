export default function Header() {
  return (
    <header className="text-center py-10 px-5 border-b-2 border-string/30 relative">
      {/* Top secret tape */}
      <div className="top-secret-tape inline-block mb-4">
        TOP SECRET
      </div>

      <h1 className="font-display text-3xl md:text-5xl text-dossier tracking-widest drop-shadow-lg">
        Crown & Chaos
      </h1>
      <p className="text-dossier/70 mt-2 tracking-wide text-sm font-typewriter">
        ERA OF THE PRINCES — ETHIOPIAN ROYAL FAMILY TREE
      </p>
      <span className="inline-block mt-3 bg-olive-dark border border-string/40 rounded px-4 py-1 text-xs text-dossier/60 font-courier">
        c. 1769 – 1855 · 23 EMPERORS · 86 YEARS OF CHAOS
      </span>
      <div className="text-[9px] text-dossier/30 mt-1 font-typewriter">
        (27 unique rulers including pre-Zemene period)
      </div>
    </header>
  );
}
