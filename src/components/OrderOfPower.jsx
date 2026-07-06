import { useState } from "react";
import { emperors } from "../data/emperors";
import CaseFileCard from "./CaseFileCard";
import Modal from "./Modal";

export default function OrderOfPower() {
  const [selectedEmperor, setSelectedEmperor] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // All emperors in chronological order of reign + warlord card
  const allEmperors = [
    "iyasuI", "tekleHaymanotI", "tewoflos", "yostos", "dawitIII", "bakaffa",
    "iyasuII", "iyoasI", "yohannesII", "tekleHaymanotII", "susenyosII",
    "salomonII", "tekleGiyorgisI", "iyasuIII", "hezqeyas", "baedaMaryamII",
    "salomonIII", "yonas", "dewetros", "egwaleSeyon", "iyoasII", "gigar",
    "baedaMaryamIII", "iyasuIV", "gabraKrestos", "sahelaDengel", "yohannesIII",
    // Special entries
    { id: "rasGugsa", name: "Ras Gugsa", amharic: "ራስ ጉግሳ", reign: { start: "~1803", end: "1825" }, nickname: "The Peak of Yejju Power", isSpecial: true },
    { id: "tewodrosII", name: "Tewodros II", amharic: "ቴዎድሮስ", reign: { start: "1855", end: "1868" }, nickname: "The End of Chaos", isSpecial: true }
  ].map(item => {
    if (item.isSpecial) return item;
    return emperors.find(e => e.id === item);
  }).filter(Boolean);

  // Snake pattern positions: 4 cards per row, alternating direction
  const CARDS_PER_ROW = 4;
  const CARD_WIDTH = 200;
  const CARD_HEIGHT = 220;
  const H_GAP = 50;
  const V_GAP = 140;
  const BOARD_PADDING = 60;

  const getCardPosition = (index) => {
    const row = Math.floor(index / CARDS_PER_ROW);
    const col = index % CARDS_PER_ROW;
    const isReversed = row % 2 === 1;
    
    const y = BOARD_PADDING + (row * (CARD_HEIGHT + V_GAP));
    const totalRowWidth = (CARDS_PER_ROW * CARD_WIDTH) + ((CARDS_PER_ROW - 1) * H_GAP);
    const startX = (1100 - totalRowWidth) / 2;
    
    let x;
    if (isReversed) {
      x = startX + ((CARDS_PER_ROW - 1 - col) * (CARD_WIDTH + H_GAP));
    } else {
      x = startX + (col * (CARD_WIDTH + H_GAP));
    }
    
    const rotation = ((index * 7 + 13) % 7) - 3;
    
    return { x, y, rotation };
  };

  const getStringColor = (emperor) => {
    const wasMurdered = emperor.death?.cause === "Murdered" || 
                        emperor.death?.cause === "Poisoned" || 
                        emperor.death?.cause?.includes("Strangled");
    if (wasMurdered) return "#ff0000";
    if (emperor.id === "yostos") return "#c9a84c";
    return "#8b0000";
  };

  const hasWarning = (emperor) => {
    return emperor.death?.cause === "Murdered" || 
           emperor.death?.cause === "Poisoned" || 
           emperor.death?.cause?.includes("Strangled");
  };

  return (
    <div>
      {/* Header with case status */}
      <div className="bg-olive-dark border-b border-string/20 py-3 px-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="font-display text-lg text-dossier tracking-wider">
            ORDER OF POWER
          </div>
          <div className="stamp stamp-classified text-[8px] static transform-none opacity-80">
            CASE STATUS: UNSOLVED — 86 YEARS
          </div>
        </div>
      </div>

      {/* Note pinned to board */}
      <div className="bg-olive-dark/50 border-b border-string/10 py-2 px-6">
        <div className="flex items-center gap-2 max-w-7xl mx-auto">
          <div className="push-pin" style={{ width: '12px', height: '12px' }}></div>
          <div className="text-[10px] text-dossier/50 font-typewriter italic">
            "23 emperors. 1 throne. Who really held the power?"
          </div>
        </div>
      </div>

      {/* Investigation board */}
      <div className="p-4 overflow-auto">
        <div className="relative bg-cork-card rounded-lg border-8 border-[#3d3025]" 
             style={{ 
               minHeight: `${BOARD_PADDING + (Math.ceil(allEmperors.length / CARDS_PER_ROW) * (CARD_HEIGHT + V_GAP)) + 80}px`,
               minWidth: '1100px',
               width: '100%'
             }}>

          {/* Red string connections */}
          <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
            {allEmperors.slice(0, -1).map((emperor, i) => {
              const from = getCardPosition(i);
              const to = getCardPosition(i + 1);
              const color = getStringColor(emperor);
              const warning = hasWarning(emperor);
              const isHighlighted = hoveredIndex === i || hoveredIndex === i + 1;
              
              const x1 = from.x + CARD_WIDTH / 2;
              const y1 = from.y + 18;
              const x2 = to.x + CARD_WIDTH / 2;
              const y2 = to.y + 18;
              
              return (
                <g key={i}>
                  <line
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={color}
                    strokeWidth={isHighlighted ? 6 : 4}
                    strokeOpacity={isHighlighted ? 0.4 : 0.2}
                  />
                  <line
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={color}
                    strokeWidth={isHighlighted ? 4 : 3}
                    strokeOpacity={isHighlighted ? 1 : 0.7}
                    className="transition-all duration-200"
                  />
                  {warning && (
                    <text
                      x={(x1 + x2) / 2}
                      y={(y1 + y2) / 2 - 10}
                      fill="#ff0000"
                      fontSize="16"
                      textAnchor="middle"
                      className={isHighlighted ? "opacity-100" : "opacity-60"}
                    >
                      ⚠️
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Case file cards */}
          {allEmperors.map((emperor, index) => {
            const pos = getCardPosition(index);
            
            return (
              <div
                key={emperor.id}
                className="absolute z-20"
                style={{
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                  transform: `rotate(${pos.rotation}deg)`,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <CaseFileCard 
                  emperor={emperor} 
                  onClick={() => setSelectedEmperor(emperor)}
                  index={index}
                />
              </div>
            );
          })}

        </div>
      </div>

      {/* Modal */}
      <Modal emperor={selectedEmperor} onClose={() => setSelectedEmperor(null)} />
    </div>
  );
}
