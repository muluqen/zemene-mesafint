export default function EmperorCard({ emperor, onClick, isHighlighted, isDimmed }) {
  const isKilled = emperor.death?.cause === "Murdered" || emperor.death?.cause === "Poisoned" || emperor.death?.cause?.includes("Strangled");
  const isNonSolomonic = emperor.id === "yostos";

  return (
    <div
      onClick={() => onClick(emperor)}
      className={`
        dossier-paper rounded-sm p-2 cursor-pointer 
        transition-all duration-200 relative burnt-edge
        ${isKilled 
          ? "border-2 border-string murdered-glow murder-shake" 
          : "border-2 border-olive-light"
        }
        ${isHighlighted ? "ring-2 ring-gold scale-105 z-30" : ""}
        ${isDimmed ? "opacity-30" : "hover:-translate-y-1 hover:shadow-dossier"}
      `}
      style={{ width: '150px', minHeight: '90px' }}
    >
      {/* Push pin */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 push-pin z-10"></div>

      {/* KILLED stamp */}
      {isKilled && (
        <div className="absolute -top-1 -right-1 text-[6px] font-display font-bold text-dossier bg-string px-1 py-0.5 transform rotate-12 z-10">
          KILLED
        </div>
      )}

      {/* Non-Solomonic marker */}
      {isNonSolomonic && (
        <div className="absolute -top-1 -left-1 text-[10px] z-10" title="Non-Solomonic usurper">
          ⚜️
        </div>
      )}

      {/* LAYER 1: Name - LARGEST, BOLD */}
      <div className="font-display text-[11px] font-bold mt-1 leading-tight text-olive-dark">
        {emperor.name}
      </div>

      {/* Ge'ez script */}
      {emperor.amharic && (
        <div className="text-[9px] text-olive mt-0.5 font-body">{emperor.amharic}</div>
      )}

      {/* LAYER 2: Dates - SMALL, GREY */}
      {emperor.reign && (
        <div className="text-[8px] text-olive/60 mt-1 font-courier">
          {emperor.reign.start}–{emperor.reign.end}
          {emperor.reign.note && <span className="text-string ml-0.5">*</span>}
        </div>
      )}

      {/* LAYER 3: Nickname - GOLD ITALIC, SMALLEST */}
      {emperor.nickname && (
        <div className="text-[7px] text-gold italic font-body mt-1 truncate">
          "{emperor.nickname}"
        </div>
      )}
    </div>
  );
}
