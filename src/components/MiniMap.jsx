import { useState } from "react";

const regions = [
  { 
    id: "tigray", 
    name: "Tigray", 
    path: "M120 20 L180 25 L190 70 L160 100 L110 80 Z",
    color: "#4a6741",
    hoverColor: "#6b8a5e",
    activeColor: "#cc0000",
    warlords: ["Ras Mikael Sehul", "Sabagadis Woldu", "Dejazmach Wube"],
    labelPos: { x: 150, y: 55 }
  },
  { 
    id: "begemder", 
    name: "Gondar/Begemder", 
    path: "M50 50 L110 80 L160 100 L140 150 L80 160 L30 120 Z",
    color: "#5a7a4f",
    hoverColor: "#7a9a6e",
    activeColor: "#cc0000",
    warlords: ["Ras Hailu Yosadiq", "Kenfu Hailu"],
    labelPos: { x: 90, y: 105 }
  },
  { 
    id: "gojjam", 
    name: "Gojjam", 
    path: "M20 100 L80 160 L80 220 L40 250 L10 200 Z",
    color: "#4a7a5a",
    hoverColor: "#6a9a7a",
    activeColor: "#cc0000",
    warlords: ["Ras Hailu Yosedeq"],
    labelPos: { x: 45, y: 175 }
  },
  { 
    id: "wollo", 
    name: "Wollo", 
    path: "M140 150 L190 130 L240 150 L230 210 L180 220 Z",
    color: "#6a7a4a",
    hoverColor: "#8a9a6a",
    activeColor: "#cc0000",
    warlords: ["Ras Ali I", "Ras Ali II", "Ras Gugsa", "Ras Dori"],
    labelPos: { x: 185, y: 175 }
  },
  { 
    id: "shewa", 
    name: "Shewa", 
    path: "M60 220 L120 210 L160 240 L140 290 L80 300 Z",
    color: "#5a8a5a",
    hoverColor: "#7aaa7a",
    activeColor: "#cc0000",
    warlords: ["Sahle Selassie"],
    labelPos: { x: 110, y: 260 }
  },
];

export default function MiniMap({ activeRegion }) {
  const [hoveredRegion, setHoveredRegion] = useState(null);

  const getRegionColor = (region) => {
    if (activeRegion === region.id) return region.activeColor;
    if (hoveredRegion === region.id) return region.hoverColor;
    return region.color;
  };

  const getRegionStroke = (region) => {
    if (activeRegion === region.id) return "#ff3333";
    if (hoveredRegion === region.id) return "#d4b85c";
    return "#2d3a2d";
  };

  const displayRegion = hoveredRegion ? regions.find(r => r.id === hoveredRegion) : 
                        activeRegion ? regions.find(r => r.id === activeRegion) : null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-olive-dark border-2 border-olive-light/50 rounded-lg p-3 shadow-dossier">
        {/* Title */}
        <div className="text-[10px] text-dossier/70 font-display tracking-wider text-center mb-2 uppercase">
          Ethiopian Regions
        </div>
        
        {/* Map */}
        <svg width="250" height="320" viewBox="0 0 260 310" className="rounded">
          {/* Background */}
          <rect width="260" height="310" fill="#1a241a" rx="4"/>
          
          {/* Grid lines for reference */}
          <line x1="0" y1="75" x2="260" y2="75" stroke="#2d3a2d" strokeWidth="0.5" strokeDasharray="4 4"/>
          <line x1="0" y1="150" x2="260" y2="150" stroke="#2d3a2d" strokeWidth="0.5" strokeDasharray="4 4"/>
          <line x1="0" y1="225" x2="260" y2="225" stroke="#2d3a2d" strokeWidth="0.5" strokeDasharray="4 4"/>
          <line x1="65" y1="0" x2="65" y2="310" stroke="#2d3a2d" strokeWidth="0.5" strokeDasharray="4 4"/>
          <line x1="130" y1="0" x2="130" y2="310" stroke="#2d3a2d" strokeWidth="0.5" strokeDasharray="4 4"/>
          <line x1="195" y1="0" x2="195" y2="310" stroke="#2d3a2d" strokeWidth="0.5" strokeDasharray="4 4"/>
          
          {/* Regions */}
          {regions.map(region => (
            <g key={region.id}>
              {/* Region shape */}
              <path
                d={region.path}
                fill={getRegionColor(region)}
                stroke={getRegionStroke(region)}
                strokeWidth={activeRegion === region.id ? 3 : 2}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredRegion(region.id)}
                onMouseLeave={() => setHoveredRegion(null)}
                style={{
                  filter: activeRegion === region.id ? 'drop-shadow(0 0 8px rgba(204,0,0,0.6))' : 'none'
                }}
              />
              
              {/* Region label */}
              <text
                x={region.labelPos.x}
                y={region.labelPos.y}
                fill="#f5f0e1"
                fontSize="11"
                fontFamily="Cinzel"
                fontWeight="bold"
                textAnchor="middle"
                className="pointer-events-none"
                style={{
                  textShadow: '1px 1px 2px #000'
                }}
              >
                {region.name.split("/")[0]}
              </text>
            </g>
          ))}
        </svg>

        {/* Region info tooltip */}
        {displayRegion && (
          <div className="mt-2 p-2 bg-olive-dark border border-olive-light/30 rounded text-center">
            <div className="text-[10px] text-dossier font-display tracking-wider">
              {displayRegion.name}
            </div>
            <div className="text-[9px] text-string font-typewriter mt-1">
              {displayRegion.warlords.join(" • ")}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="text-[8px] text-dossier/30 font-typewriter text-center mt-2">
          Hover regions to see warlords
        </div>
      </div>
    </div>
  );
}
