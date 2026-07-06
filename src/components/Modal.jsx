import { useState, useEffect } from "react";
import { dossiers } from "../data/dossiers";

export default function Modal({ emperor, onClose }) {
  const [activeTab, setActiveTab] = useState("reign");
  const [sealBroken, setSealBroken] = useState(false);

  useEffect(() => {
    setActiveTab("reign");
    setSealBroken(false);
    const timer = setTimeout(() => setSealBroken(true), 300);
    return () => clearTimeout(timer);
  }, [emperor]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!emperor) return null;

  const dossier = dossiers[emperor.id] || {};

  const tabs = [
    { id: "reign", label: "REIGN" },
    { id: "rise", label: "RISE TO POWER" },
    { id: "death", label: "DEATH" },
    { id: "weird", label: "WEIRD STORIES" },
    { id: "plots", label: "PLOTS" },
    { id: "wars", label: "WARS" },
    { id: "achievements", label: "ACHIEVEMENTS" },
    { id: "children", label: "CHILDREN" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "reign":
        return (
          <div className="space-y-3">
            <div className="font-courier text-sm">
              <span className="text-olive font-bold">DATES:</span>{" "}
              <span className="text-olive-dark">
                {emperor.reign.start} – {emperor.reign.end}
              </span>
              {emperor.reign.note && (
                <span className="text-string ml-2 text-xs">({emperor.reign.note})</span>
              )}
            </div>
            {emperor.throneName && emperor.throneName !== "Unknown" && (
              <div className="font-courier text-sm">
                <span className="text-olive font-bold">THRONE NAME:</span>{" "}
                <span className="text-olive-dark italic">{emperor.throneName}</span>
              </div>
            )}
            {emperor.parents && (
              <div className="font-courier text-sm space-y-1">
                {emperor.parents.father && (
                  <div>
                    <span className="text-olive font-bold">FATHER:</span>{" "}
                    <span className="text-olive-dark">{emperor.parents.father}</span>
                    {emperor.parents.fatherStatus && (
                      <span className="text-olive/50 text-xs ml-1">({emperor.parents.fatherStatus})</span>
                    )}
                  </div>
                )}
                {emperor.parents.mother && (
                  <div>
                    <span className="text-olive font-bold">MOTHER:</span>{" "}
                    <span className="text-olive-dark">{emperor.parents.mother}</span>
                    {emperor.parents.motherStatus && (
                      <span className="text-olive/50 text-xs ml-1">({emperor.parents.motherStatus})</span>
                    )}
                  </div>
                )}
              </div>
            )}
            {emperor.spouse && emperor.spouse.length > 0 && (
              <div className="font-courier text-sm">
                <span className="text-olive font-bold">WIFE:</span>{" "}
                <span className="text-olive-dark">{emperor.spouse.join(", ")}</span>
              </div>
            )}
            {emperor.concubine && emperor.concubine.length > 0 && (
              <div className="font-courier text-sm">
                <span className="text-olive font-bold">CONCUBINE:</span>{" "}
                <span className="text-olive-dark">{emperor.concubine.join(", ")}</span>
              </div>
            )}
            {dossier.reignSummary && (
              <div className="text-sm text-olive-dark leading-relaxed font-body border-l-2 border-string pl-3">
                {dossier.reignSummary}
              </div>
            )}
            {emperor.nickname && (
              <div className="text-xs text-olive/60 font-typewriter mt-2">
                NICKNAME: "{emperor.nickname}"
              </div>
            )}
            {emperor.nicknameNote && (
              <div className="text-xs text-olive/50 font-typewriter italic">
                {emperor.nicknameNote}
              </div>
            )}
          </div>
        );
      case "rise":
        return (
          <div className="text-sm text-olive-dark leading-relaxed font-body">
            {dossier.riseToPower || emperor.riseToPower || "No records available."}
          </div>
        );
      case "death":
        return (
          <div className="space-y-3">
            {dossier.deathDetail ? (
              <div className="text-sm text-olive-dark leading-relaxed font-body">
                {dossier.deathDetail}
              </div>
            ) : emperor.death ? (
              <div className="space-y-2 font-courier text-sm">
                <div>
                  <span className="text-olive font-bold">YEAR:</span>{" "}
                  <span className="text-olive-dark">{emperor.death.year}</span>
                </div>
                <div>
                  <span className="text-olive font-bold">CAUSE:</span>{" "}
                  <span className={`text-olive-dark ${emperor.death.cause === "Murdered" || emperor.death.cause === "Poisoned" ? "text-string font-bold" : ""}`}>
                    {emperor.death.cause}
                  </span>
                </div>
                {emperor.death.byWhom && emperor.death.byWhom !== "N/A" && (
                  <div>
                    <span className="text-olive font-bold">BY WHOM:</span>{" "}
                    <span className="text-string font-bold">{emperor.death.byWhom}</span>
                  </div>
                )}
                {emperor.death.method && (
                  <div>
                    <span className="text-olive font-bold">METHOD:</span>{" "}
                    <span className="text-olive-dark">{emperor.death.method}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-sm text-olive italic font-body">No death records available.</div>
            )}
          </div>
        );
      case "weird":
        return (
          <div className="text-sm text-olive-dark leading-relaxed font-body">
            {dossier.weirdStory ? (
              <div className="border-l-2 border-gold pl-3 italic">
                {dossier.weirdStory}
              </div>
            ) : emperor.weirdStories && emperor.weirdStories.length > 0 ? (
              <ul className="space-y-2">
                {emperor.weirdStories.map((story, i) => (
                  <li key={i} className="flex items-start gap-2 border-l-2 border-gold pl-3 italic">
                    {story}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-olive italic">No weird stories recorded.</div>
            )}
          </div>
        );
      case "plots":
        return (
          <div className="text-sm text-olive-dark leading-relaxed font-body">
            {dossier.plots ? (
              <div>{dossier.plots}</div>
            ) : emperor.plots && emperor.plots.length > 0 ? (
              <ul className="space-y-2">
                {emperor.plots.map((plot, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-string mt-1">•</span> {plot}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-olive italic">No plots recorded.</div>
            )}
          </div>
        );
      case "wars":
        return (
          <div className="text-sm text-olive-dark leading-relaxed font-body">
            {dossier.wars ? (
              <div>{dossier.wars}</div>
            ) : emperor.wars && emperor.wars.length > 0 ? (
              <ul className="space-y-2">
                {emperor.wars.map((war, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-string mt-1">⚔️</span> {war}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-olive italic">No major wars recorded.</div>
            )}
          </div>
        );
      case "achievements":
        return (
          <div className="text-sm text-olive-dark leading-relaxed font-body">
            {dossier.achievements ? (
              <div>{dossier.achievements}</div>
            ) : emperor.achievements && emperor.achievements.length > 0 ? (
              <ul className="space-y-2">
                {emperor.achievements.map((ach, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-gold mt-1">🏆</span> {ach}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-olive italic">No notable achievements recorded.</div>
            )}
          </div>
        );
      case "children":
        return (
          <div className="text-sm text-olive-dark leading-relaxed font-body">
            {dossier.children ? (
              <div>{dossier.children}</div>
            ) : emperor.children && emperor.children.length > 0 ? (
              <ul className="space-y-1">
                {emperor.children.map((child, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-gold mt-1">👶</span> {child}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-olive italic">No children recorded.</div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 z-[200] flex items-end md:items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="dossier-paper rounded-sm p-0 max-w-lg w-full max-h-[85vh] overflow-hidden relative scroll-unfurl shadow-dossier">
        
        {/* Wax seal */}
        <div className={`absolute top-4 left-1/2 -translate-x-1/2 z-20 ${sealBroken ? 'seal-break' : ''}`}>
          <svg width="50" height="50" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="22" fill="#8b0000" stroke="#660000" strokeWidth="2"/>
            <circle cx="25" cy="25" r="18" fill="none" stroke="#f5f0e1" strokeWidth="1" opacity="0.3"/>
            <text x="25" y="30" textAnchor="middle" fill="#f5f0e1" fontSize="12" fontFamily="Cinzel">👑</text>
          </svg>
        </div>

        {/* Stamps */}
        <div className="stamp stamp-classified" style={{ top: '8px', right: '16px' }}>
          CLASSIFIED
        </div>
        <div className="stamp stamp-topsecret" style={{ top: '8px', left: '16px' }}>
          TOP SECRET
        </div>

        {/* Paperclip */}
        <div className="paperclip"></div>

        {/* Header */}
        <div className="dossier-header">
          <div className="flex items-center gap-3">
            <div className="push-pin"></div>
            <div className="flex-1">
              <h3 className="font-display text-lg text-dossier pr-8">
                {emperor.name}
              </h3>
              {emperor.amharic && (
                <div className="text-sm text-dossier/60 mt-1 font-typewriter">{emperor.amharic}</div>
              )}
              {dossier.controlledBy && (
                <div className="text-xs text-string/80 mt-1 font-courier">
                  CONTROLLED BY: {dossier.controlledBy}
                </div>
              )}
              {dossier.isWarlord && (
                <div className="text-xs text-gold mt-1 font-courier">
                  ⚠️ WARLORD — NOT AN EMPEROR
                </div>
              )}
              {dossier.isTheEnd && (
                <div className="text-xs text-gold mt-1 font-courier">
                  ⭐ THE END OF THE ERA
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tab buttons */}
        <div className="flex flex-wrap gap-1 p-2 border-b border-olive-light/30 bg-olive-dark/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2 py-1 rounded text-[9px] transition-colors font-display tracking-wider ${
                activeTab === tab.id
                  ? "bg-string text-dossier font-bold"
                  : "text-olive hover:text-string"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[55vh] bg-dossier/30">
          {renderContent()}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-dossier/40 text-xl hover:text-string transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
}
