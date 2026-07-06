import { useState, useEffect, useRef } from "react";
import { emperors } from "../data/emperors";
import EmperorCard from "./EmperorCard";

export default function FamilyTree({ onSelectEmperor }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [currentGen, setCurrentGen] = useState(0);
  const containerRef = useRef(null);

  // Family tree data organized by generation
  const generations = [
    // GEN 1: The Great Founder
    {
      label: "GEN 1 — The Founder",
      cards: ["iyasuI"]
    },
    // GEN 2: Iyasu I's Sons
    {
      label: "GEN 2 — The Sons of Iyasu I",
      cards: ["tekleHaymanotI", "dawitIII", "bakaffa", "yohannesII"]
    },
    // GEN 3: Grandsons + Installed Emperors
    {
      label: "GEN 3 — Grandsons & Puppet Kings",
      cards: ["tewoflos", "yostos", "susenyosII", "iyasuII", "tekleHaymanotII", "tekleGiyorgisI"]
    },
    // GEN 4: Great-grandsons + More Puppets
    {
      label: "GEN 4 — The Chaos Deepens",
      cards: ["iyoasI", "salomonII", "iyasuIII", "hezqeyas", "baedaMaryamII", "salomonIII", "yonas", "dewetros"]
    },
    // GEN 5: Later Emperors
    {
      label: "GEN 5 — The Decline",
      cards: ["egwaleSeyon", "iyoasII", "gigar", "baedaMaryamIII", "iyasuIV", "gabraKrestos"]
    },
    // GEN 6: Final Emperors
    {
      label: "GEN 6 — End of Era",
      cards: ["sahelaDengel", "yohannesIII"]
    }
  ];

  // Parent-child relationships with type
  const relationships = [
    // Bloodline connections
    { from: "iyasuI", to: "tekleHaymanotI", type: "killed" },
    { from: "iyasuI", to: "dawitIII", type: "bloodline" },
    { from: "iyasuI", to: "bakaffa", type: "bloodline" },
    { from: "iyasuI", to: "yohannesII", type: "bloodline" },
    { from: "bakaffa", to: "iyasuII", type: "bloodline" },
    { from: "yohannesII", to: "tekleHaymanotII", type: "bloodline" },
    { from: "yohannesII", to: "tekleGiyorgisI", type: "bloodline" },
    { from: "iyasuII", to: "iyoasI", type: "bloodline" },
    { from: "hezqeyas", to: "egwaleSeyon", type: "bloodline" },
    { from: "tekleGiyorgisI", to: "yohannesIII", type: "bloodline" },
  ];

  // Get emperor data by id
  const getEmperor = (id) => emperors.find(e => e.id === id);

  // Calculate card dimensions
  const CARD_WIDTH = 160;
  const CARD_HEIGHT = 100;
  const H_GAP = 30;
  const V_GAP = 140;
  const START_X = 100;
  const START_Y = 80;

  // Calculate position for a card
  const getCardPosition = (genIndex, cardIndex, totalCards) => {
    const totalWidth = (totalCards * CARD_WIDTH) + ((totalCards - 1) * H_GAP);
    const startX = Math.max(START_X, (1000 - totalWidth) / 2 + (cardIndex * (CARD_WIDTH + H_GAP)));
    const y = START_Y + (genIndex * (CARD_HEIGHT + V_GAP));
    return { x: startX, y: y };
  };

  // Find card position by id
  const findCardPosition = (id) => {
    for (let genIndex = 0; genIndex < generations.length; genIndex++) {
      const gen = generations[genIndex];
      const cardIndex = gen.cards.indexOf(id);
      if (cardIndex !== -1) {
        return getCardPosition(genIndex, cardIndex, gen.cards.length);
      }
    }
    return null;
  };

  // Check if two cards are connected
  const isConnected = (id1, id2) => {
    return relationships.some(r => 
      (r.from === id1 && r.to === id2) || 
      (r.from === id2 && r.to === id1)
    );
  };

  // Track scroll position for breadcrumb
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollTop = containerRef.current.scrollTop;
      const genHeight = CARD_HEIGHT + V_GAP;
      const current = Math.floor(scrollTop / genHeight);
      setCurrentGen(Math.min(current, generations.length - 1));
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* LEGEND - Fixed above tree */}
      <div className="flex flex-wrap gap-3 justify-center py-3 px-4 bg-olive-dark border-b border-string/20 sticky top-0 z-50">
        <div className="flex items-center gap-2 text-[10px] text-dossier/70 bg-olive-dark border border-olive-light/30 px-3 py-1.5 rounded">
          <svg width="24" height="12"><line x1="0" y1="6" x2="24" y2="6" stroke="#8b4513" strokeWidth="2"/></svg>
          Bloodline
        </div>
        <div className="flex items-center gap-2 text-[10px] text-dossier/70 bg-olive-dark border border-olive-light/30 px-3 py-1.5 rounded">
          <svg width="24" height="12"><line x1="0" y1="6" x2="24" y2="6" stroke="#c9a84c" strokeWidth="2" strokeDasharray="6 3"/></svg>
          Marriage
        </div>
        <div className="flex items-center gap-2 text-[10px] text-dossier/70 bg-olive-dark border border-olive-light/30 px-3 py-1.5 rounded">
          <svg width="24" height="12"><line x1="0" y1="6" x2="24" y2="6" stroke="#cc0000" strokeWidth="4"/></svg>
          Killed By
        </div>
        <div className="flex items-center gap-2 text-[10px] text-dossier/70 bg-olive-dark border border-olive-light/30 px-3 py-1.5 rounded">
          <span className="text-sm">⚜️</span>
          Non-Solomonic
        </div>
        <div className="flex items-center gap-2 text-[10px] text-dossier/70 bg-olive-dark border border-olive-light/30 px-3 py-1.5 rounded">
          <span className="text-sm">💀</span>
          Murdered
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="text-center py-2 bg-olive-dark/50 border-b border-string/10">
        <span className="text-[10px] text-dossier/50 font-courier">
          <span className="text-string">▶</span> {generations[currentGen]?.label || "GEN 1"} — Scroll to explore
        </span>
      </div>

      {/* Scrollable tree container */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto bg-cork-card rounded-lg border-2 border-olive-light/30"
      >
        <div className="relative" style={{ minWidth: '1100px', minHeight: `${START_Y + (generations.length * (CARD_HEIGHT + V_GAP)) + 100}px` }}>

          {/* Background watermarks */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
            <svg className="w-full h-full" viewBox="0 0 400 400">
              <path d="M50 200 Q100 100 200 50 Q150 150 200 200 Q250 150 300 200 Q200 250 150 350 Q100 250 50 200" fill="#f5f0e1"/>
              <circle cx="300" cy="100" r="40" fill="none" stroke="#f5f0e1" strokeWidth="2"/>
              <line x1="300" y1="60" x2="300" y2="140" stroke="#f5f0e1" strokeWidth="2"/>
              <line x1="260" y1="100" x2="340" y2="100" stroke="#f5f0e1" strokeWidth="2"/>
            </svg>
          </div>

          {/* Connection lines - SVG layer */}
          <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
            {relationships.map((rel, i) => {
              const fromPos = findCardPosition(rel.from);
              const toPos = findCardPosition(rel.to);
              if (!fromPos || !toPos) return null;

              // Line starts at bottom center of parent, ends at top center of child
              const x1 = fromPos.x + CARD_WIDTH / 2;
              const y1 = fromPos.y + CARD_HEIGHT;
              const x2 = toPos.x + CARD_WIDTH / 2;
              const y2 = toPos.y;

              const isConnHighlighted = hoveredId && (rel.from === hoveredId || rel.to === hoveredId);
              const isDimmed = hoveredId && !isConnHighlighted;

              // Line style based on type
              let strokeColor = "#8b4513"; // default bloodline
              let strokeWidth = 2;
              let strokeDasharray = "none";

              if (rel.type === "killed") {
                strokeColor = "#cc0000";
                strokeWidth = 4;
              } else if (rel.type === "marriage") {
                strokeColor = "#c9a84c";
                strokeDasharray = "8 4";
              }

              return (
                <g key={i}>
                  {/* Shadow */}
                  <line
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth + 2}
                    strokeOpacity={isDimmed ? 0.1 : 0.2}
                    strokeDasharray={strokeDasharray}
                  />
                  {/* Main line */}
                  <line
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeOpacity={isDimmed ? 0.15 : (isConnHighlighted ? 1 : 0.7)}
                    strokeDasharray={strokeDasharray}
                    className="transition-opacity duration-200"
                  />
                  {/* Start dot */}
                  <circle
                    cx={x1} cy={y1} r="4"
                    fill={strokeColor}
                    opacity={isDimmed ? 0.1 : 0.8}
                  />
                  {/* End dot */}
                  <circle
                    cx={x2} cy={y2} r="4"
                    fill={strokeColor}
                    opacity={isDimmed ? 0.1 : 0.8}
                  />
                </g>
              );
            })}
          </svg>

          {/* Generations */}
          {generations.map((gen, genIndex) => (
            <div key={genIndex}>
              {/* Generation label */}
              <div 
                className="absolute z-30 text-[10px] text-dossier/40 font-display tracking-wider bg-olive-dark/80 px-3 py-1 rounded"
                style={{ 
                  left: '20px',
                  top: `${START_Y + (genIndex * (CARD_HEIGHT + V_GAP)) - 25}px`
                }}
              >
                {gen.label}
              </div>

              {/* Cards in this generation */}
              {gen.cards.map((cardId, cardIndex) => {
                const emperor = getEmperor(cardId);
                if (!emperor) return null;

                const pos = getCardPosition(genIndex, cardIndex, gen.cards.length);
                const isHighlighted = hoveredId === cardId;
                const isDimmed = hoveredId && hoveredId !== cardId && !isConnected(hoveredId, cardId);

                return (
                  <div
                    key={cardId}
                    className="absolute z-20"
                    style={{
                      left: `${pos.x}px`,
                      top: `${pos.y}px`,
                    }}
                    onMouseEnter={() => setHoveredId(cardId)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <EmperorCard 
                      emperor={emperor} 
                      onClick={onSelectEmperor}
                      isHighlighted={isHighlighted}
                      isDimmed={isDimmed}
                    />
                  </div>
                );
              })}
            </div>
          ))}

          {/* END marker */}
          <div
            className="absolute z-30"
            style={{ 
              left: '50%', 
              top: `${START_Y + (generations.length * (CARD_HEIGHT + V_GAP)) + 20}px`,
              transform: 'translateX(-50%)'
            }}
          >
            <div className="border border-string/40 rounded px-4 py-2 bg-olive-dark relative">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 push-pin"></div>
              <div className="stamp stamp-declassified text-[9px] static transform-none opacity-100 mb-1">
                DECLASSIFIED
              </div>
              <div className="text-[10px] text-dossier/60 font-courier text-center">
                1855 — TEWODROS II ENDS THE CHAOS
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
