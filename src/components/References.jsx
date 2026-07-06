import { emperors } from "../data/emperors";

export default function References() {
  // Collect all unique references
  const allRefs = [];
  const seen = new Set();

  emperors.forEach((emperor) => {
    if (emperor.references) {
      emperor.references.forEach((ref) => {
        if (!seen.has(ref.url)) {
          seen.add(ref.url);
          allRefs.push({
            ...ref,
            usedBy: [emperor.name],
          });
        } else {
          const existing = allRefs.find((r) => r.url === ref.url);
          if (existing && !existing.usedBy.includes(emperor.name)) {
            existing.usedBy.push(emperor.name);
          }
        }
      });
    }
  });

  // Group by source type
  const wikipedia = allRefs.filter((r) => r.url.includes("wikipedia"));
  const britannica = allRefs.filter((r) => r.url.includes("britannica"));
  const dacb = allRefs.filter((r) => r.url.includes("dacb"));
  const academic = allRefs.filter((r) => r.url.includes("doi.org") || r.url.includes("journals"));
  const other = allRefs.filter(
    (r) => !wikipedia.includes(r) && !britannica.includes(r) && !dacb.includes(r) && !academic.includes(r)
  );

  const renderSection = (title, refs) => {
    if (refs.length === 0) return null;
    return (
      <div className="mb-6">
        <h3 className="font-display text-sm text-dossier mb-3">{title}</h3>
        <div className="space-y-2">
          {refs.map((ref, i) => (
            <div
              key={i}
              className="dossier-paper border border-olive-light/30 rounded-sm p-3"
            >
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-string hover:text-string-light underline font-body"
              >
                {ref.text}
              </a>
              <div className="text-[10px] text-olive mt-1 font-courier">
                Used by: {ref.usedBy.join(", ")}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="font-display text-lg text-dossier mb-5 text-center">References</div>

      <div className="text-sm text-dossier/50 mb-6 text-center font-typewriter">
        All sources used in this project. Each reference is linked to the emperors it was used for.
      </div>

      {renderSection("Wikipedia", wikipedia)}
      {renderSection("Britannica", britannica)}
      {renderSection("Dictionary of African Christian Biography (DACB)", dacb)}
      {renderSection("Academic Journals", academic)}
      {renderSection("Other Sources", other)}
    </div>
  );
}
