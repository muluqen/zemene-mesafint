import { dossiers } from "../data/dossiers";

export default function CaseFileCard({ emperor, onClick, index }) {
  const dossier = dossiers[emperor.id] || {};
  
  const wasMurdered = emperor.death?.cause === "Murdered" || 
                      emperor.death?.cause === "Poisoned" || 
                      emperor.death?.cause?.includes("Strangled");
  
  const isWarlord = dossier.isWarlord;
  const isTheEnd = dossier.isTheEnd;

  const getAccession = () => {
    if (isWarlord) return "SEIZED POWER";
    if (isTheEnd) return "BY CONQUEST";
    if (emperor.id === "yostos") return "USURPED";
    if (emperor.reign?.start && emperor.reign.start < 1770) return "INHERITED";
    if (dossier.controlledBy) return "APPOINTED BY WARLORD";
    return "INHERITED";
  };

  const getExit = () => {
    if (isTheEnd) return "SUICIDE 1868";
    if (wasMurdered) return "ELIMINATED";
    if (emperor.death?.cause === "Deposed") return "DEPOSED";
    if (emperor.death?.cause === "Died") return "DIED NATURALLY";
    if (emperor.death?.cause === "Abdicated") return "ABDICATED";
    if (emperor.death?.cause?.includes("Natural")) return "DIED NATURALLY";
    if (emperor.death?.cause?.includes("suicide")) return "SUICIDE";
    return "UNKNOWN";
  };

  const rotation = ((index * 7 + 13) % 7) - 3;

  // Different color for warlord cards
  const cardBg = isWarlord 
    ? "bg-gradient-to-br from-[#4a3a3a] via-[#3d2d2d] to-[#2d1d1d]"
    : "bg-gradient-to-br from-[#f5e6c8] via-[#e8d5a8] to-[#d4c08a]";
  
  const cardBorder = isWarlord ? "border-[#6a4a4a]" : "border-[#b8a06a]";
  const textColor = isWarlord ? "text-[#e8d5a8]" : "text-olive-dark";
  const subtextColor = isWarlord ? "text-[#c8b898]/70" : "text-olive/70";
  const dateColor = isWarlord ? "text-[#c8b898]/50" : "text-olive/50";
  const dividerColor = isWarlord ? "border-[#c8b898]/20" : "border-olive/20";

  return (
    <div
      onClick={onClick}
      className="cursor-pointer group"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className={`relative w-[200px] h-[220px]`}>
        <div className={`absolute inset-0 ${cardBg} rounded-sm border ${cardBorder} shadow-lg`}>
          {/* Folder tab */}
          <div className={`absolute -top-3 left-2 w-16 h-6 ${isWarlord ? "bg-gradient-to-b from-[#5a4a4a] to-[#4a3a3a] border-[#6a4a4a]" : "bg-gradient-to-b from-[#f0dbb5] to-[#e0c89a] border-[#b8a06a]"} border border-b-0 rounded-t-sm flex items-center justify-center`}>
            <span className={`text-[6px] font-typewriter ${isWarlord ? "text-[#c8b898]/60" : "text-olive-dark/60"}`}>
              {isWarlord ? "WARLORD FILE" : `CASE #${String(index + 1).padStart(2, '0')}`}
            </span>
          </div>

          {/* Pushpin */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 z-20">
            <div className="w-3 h-3 bg-gradient-to-br from-red-600 to-red-900 rounded-full border border-red-950 shadow-md"></div>
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-gray-600"></div>
          </div>

          {/* Content */}
          <div className="px-3 pt-4">
            {/* Emperor name */}
            <div className={`font-display text-[11px] font-bold ${textColor} leading-tight`}>
              {emperor.name}
            </div>

            {/* Ge'ez name */}
            {emperor.amharic && (
              <div className={`text-[8px] ${subtextColor} mt-0.5 font-body`}>
                {emperor.amharic}
              </div>
            )}

            {/* Throne name */}
            {emperor.throneName && emperor.throneName !== "Unknown" && (
              <div className={`text-[7px] ${subtextColor} mt-0.5 font-typewriter italic`}>
                "{emperor.throneName}"
              </div>
            )}

            {/* Reign dates */}
            {emperor.reign && (
              <div className={`text-[8px] ${dateColor} mt-1 font-typewriter`}>
                {emperor.reign.start}–{emperor.reign.end}
              </div>
            )}

            {/* Divider */}
            <div className={`border-t ${dividerColor} my-1.5`}></div>

            {/* Father */}
            {emperor.parents?.father && (
              <div className={`text-[7px] font-typewriter ${isWarlord ? "text-[#c8b898]/70" : "text-olive-dark/70"} leading-relaxed`}>
                <span className="font-bold">FATHER:</span> {emperor.parents.father}
              </div>
            )}

            {/* Mother */}
            {emperor.parents?.mother && (
              <div className={`text-[7px] font-typewriter ${isWarlord ? "text-[#c8b898]/70" : "text-olive-dark/70"} leading-relaxed`}>
                <span className="font-bold">MOTHER:</span> {emperor.parents.mother}
              </div>
            )}

            {/* Spouse */}
            {emperor.spouse && emperor.spouse.length > 0 && (
              <div className={`text-[7px] font-typewriter ${isWarlord ? "text-[#c8b898]/70" : "text-olive-dark/70"} leading-relaxed`}>
                <span className="font-bold">WIFE:</span> {emperor.spouse.join(", ")}
              </div>
            )}

            {/* Concubine */}
            {emperor.concubine && emperor.concubine.length > 0 && (
              <div className={`text-[7px] font-typewriter ${isWarlord ? "text-[#c8b898]/70" : "text-olive-dark/70"} leading-relaxed`}>
                <span className="font-bold">CONCUBINE:</span> {emperor.concubine.join(", ")}
              </div>
            )}

            {/* Accession */}
            <div className={`text-[7px] font-typewriter ${isWarlord ? "text-[#c8b898]/70" : "text-olive-dark/70"} leading-relaxed`}>
              <span className="font-bold">ACCESS:</span> {getAccession()}
            </div>

            {/* Exit */}
            <div className={`text-[7px] font-typewriter ${isWarlord ? "text-[#c8b898]/70" : "text-olive-dark/70"} leading-relaxed`}>
              <span className="font-bold">EXIT:</span> {getExit()}
            </div>

            {/* Controlled by */}
            {dossier.controlledBy && (
              <div className={`text-[6px] font-typewriter ${isWarlord ? "text-[#c8b898]/60" : "text-string/80"} italic mt-1 leading-relaxed`}>
                CONTROLLED BY: {dossier.controlledBy}
              </div>
            )}
          </div>

          {/* Stamps */}
          {isWarlord && (
            <div className="absolute bottom-2 right-2">
              <div className="text-[7px] font-display font-bold px-1.5 py-0.5 border border-gold text-gold transform -rotate-6 opacity-80">
                ⚠️ WARLORD
              </div>
            </div>
          )}
          
          {isTheEnd && (
            <div className="absolute bottom-2 right-2">
              <div className="text-[7px] font-display font-bold px-1.5 py-0.5 border border-gold text-gold transform -rotate-6 opacity-80">
                ⭐ THE END
              </div>
            </div>
          )}

          {!isWarlord && !isTheEnd && (
            <div className="absolute bottom-2 right-2">
              <div className={`
                text-[7px] font-display font-bold px-1.5 py-0.5 border 
                ${dossier.controlledBy
                  ? "text-string border-string transform -rotate-12 opacity-80"
                  : "text-olive-dark/30 border-olive-dark/30 transform rotate-12 opacity-40"
                }
              `}>
                {dossier.controlledBy ? "PUPPET" : "CLASSIFIED"}
              </div>
            </div>
          )}

          {/* ELIMINATED stamp for murdered */}
          {wasMurdered && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <div className="text-[11px] font-display font-bold text-string bg-string/10 px-2 py-0.5 border-2 border-string transform rotate-12 opacity-70">
                ELIMINATED
              </div>
            </div>
          )}

          {/* Non-Solomonic marker */}
          {emperor.id === "yostos" && (
            <div className="absolute top-2 right-2 z-10">
              <div className="text-[8px] bg-gold/20 px-1 border border-gold/40 transform -rotate-6">
                ⚜️ USURPER
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
