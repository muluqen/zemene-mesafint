export default function Legend() {
  const items = [
    { color: "bg-dossier", label: "Emperor" },
    { color: "bg-string", label: "Murdered/Killed" },
    { color: "bg-string/50", label: "Tewodros II (ends era)" },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-4 relative z-30">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2 text-xs text-dossier/60 bg-olive-dark border border-string/30 px-3 py-1 rounded"
        >
          <div className={`w-2.5 h-2.5 rounded-sm ${item.color}`}></div>
          {item.label}
        </div>
      ))}
      <div className="flex items-center gap-2 text-xs text-dossier/60 bg-olive-dark border border-string/30 px-3 py-1 rounded">
        <span>⚔️</span> = Murdered
      </div>
      <div className="flex items-center gap-2 text-xs text-dossier/60 bg-olive-dark border border-string/30 px-3 py-1 rounded">
        <span>👑</span> = Emperor
      </div>
    </div>
  );
}
