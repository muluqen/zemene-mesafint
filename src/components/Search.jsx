import { useState } from "react";
import { emperors } from "../data/emperors";

export default function Search({ onSelectEmperor }) {
  const [query, setQuery] = useState("");

  const filtered = emperors.filter((e) => {
    const q = query.toLowerCase();
    return (
      e.name.toLowerCase().includes(q) ||
      (e.amharic && e.amharic.includes(q)) ||
      (e.nickname && e.nickname.toLowerCase().includes(q)) ||
      (e.throneName && e.throneName.toLowerCase().includes(q)) ||
      (e.reign?.start && e.reign.start.includes(q)) ||
      (e.reign?.end && e.reign.end.includes(q))
    );
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="font-display text-lg text-dossier mb-5 text-center">Search Emperors</div>

      <input
        type="text"
        placeholder="Search by name, Amharic, nickname, or year..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-olive-dark border border-string/30 rounded px-4 py-3 text-dossier placeholder-dossier/40 focus:outline-none focus:border-string transition-colors mb-6 font-courier"
      />

      <div className="space-y-3">
        {filtered.length === 0 && query && (
          <div className="text-center text-dossier/40 text-sm py-8 font-typewriter">
            NO RESULTS FOR "{query.toUpperCase()}"
          </div>
        )}
        {filtered.map((emperor) => (
          <div
            key={emperor.id}
            onClick={() => onSelectEmperor(emperor)}
            className="dossier-paper border border-olive-light/30 rounded-sm p-4 cursor-pointer hover:shadow-dossier transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="push-pin"></div>
              <div className="flex-1">
                <div className="font-display text-sm text-olive-dark">
                  {emperor.name}
                  {emperor.nickname && ` — "${emperor.nickname}"`}
                </div>
                <div className="text-xs text-olive font-courier">
                  {emperor.amharic} · {emperor.reign.start}–{emperor.reign.end}
                  {emperor.reign.note && ` (${emperor.reign.note})`}
                </div>
              </div>
              {emperor.death?.cause === "Murdered" || emperor.death?.cause === "Poisoned" || emperor.death?.cause?.includes("Strangled") ? (
                <span className="text-sm">⚔️</span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
