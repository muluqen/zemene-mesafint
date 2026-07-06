export default function About() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="font-display text-lg text-dossier mb-5 text-center">About This Project</div>

      <div className="dossier-paper rounded-sm p-6 space-y-4 text-sm text-olive-dark leading-relaxed burnt-edge border border-olive-light/30 relative">
        {/* Push pin */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 push-pin"></div>

        {/* Classification stamp */}
        <div className="stamp stamp-declassified" style={{ top: '8px', right: '16px' }}>
          DECLASSIFIED
        </div>

        <p className="font-body mt-4">
          <strong className="text-string">Crown & Chaos</strong> tells the story of Ethiopia's Zemene Mesafint
          (Era of the Princes) — a period of 86 years (1769–1855) where 23 emperors sat on the throne,
          most as puppets of powerful warlords.
        </p>

        <p className="font-body">
          This project documents every emperor of the Zemene Mesafint period with:
        </p>

        <ul className="space-y-1 text-olive font-body">
          <li>• Reign dates and how they came to power</li>
          <li>• Parentage and family connections</li>
          <li>• Wars, achievements, and notable acts</li>
          <li>• How they died (and by whom)</li>
          <li>• Plots, conspiracies, and weird stories</li>
          <li>• References to credible sources</li>
        </ul>

        <p className="font-body">
          The Zemene Mesafint began when <strong className="text-string">Ras Mikael Sehul strangled Emperor Iyoas I</strong> on May 7, 1769,
          and ended when <strong className="text-olive-dark">Kassa Hailu defeated Ras Ali II</strong> and crowned himself Emperor Tewodros II in 1855.
        </p>

        <p className="font-body">
          During this era, the real power lay not with the emperors but with regional warlords —
          the Yejju dynasty, Ras Wolde Selassie of Tigray, and others — who installed and deposed
          emperors at will. One emperor, Tekle Giyorgis I, was enthroned and deposed <strong className="text-string">six times</strong>.
        </p>

        <div className="border-t border-olive-light/30 pt-4 mt-4">
          <div className="font-display text-xs text-olive tracking-wider mb-2">TECH STACK</div>
          <div className="flex flex-wrap gap-2">
            {["React", "Vite", "Tailwind CSS", "JavaScript"].map((tech) => (
              <span
                key={tech}
                className="bg-olive-dark border border-string/30 rounded px-3 py-1 text-xs text-dossier/60 font-courier"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-olive-light/30 pt-4 mt-4">
          <div className="font-display text-xs text-olive tracking-wider mb-2">SOURCES</div>
          <div className="text-xs text-olive space-y-1 font-typewriter">
            <div>• Wikipedia — Ethiopian Royal Chronologies</div>
            <div>• Britannica — Emperor Biographies</div>
            <div>• DACB — Dictionary of African Christian Biography</div>
            <div>• James Bruce — Travels to Discover the Source of the Nile (1790)</div>
            <div>• E.A. Wallis Budge — A History of Ethiopia (1928)</div>
            <div>• Henry Salt — A Voyage to Abyssinia (1814)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
