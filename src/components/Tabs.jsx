export default function Tabs({ activeTab, onTabChange, darkMode, onToggleDark }) {
  const tabs = [
    { id: "power", label: "Order of Power" },
    { id: "lineage", label: "Lineage" },
    { id: "timeline", label: "Timeline" },
    { id: "facts", label: "Wild Facts" },
    { id: "search", label: "Search" },
    { id: "references", label: "References" },
    { id: "about", label: "About" },
  ];

  return (
    <nav className="flex justify-center gap-2 py-4 px-5 flex-wrap border-b border-string/20 sticky top-0 bg-olive-dark z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 rounded text-xs font-display tracking-wider transition-all border ${
            activeTab === tab.id
              ? "bg-string text-dossier border-string font-bold"
              : "border-string/30 text-dossier/60 hover:border-string hover:text-string-light"
          }`}
        >
          {tab.label}
        </button>
      ))}
      <button
        onClick={onToggleDark}
        className="px-3 py-2 rounded text-xs border border-string/30 text-dossier/60 hover:border-string hover:text-string-light transition-all"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </nav>
  );
}
