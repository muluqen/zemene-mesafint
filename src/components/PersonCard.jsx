export default function PersonCard({ person, onClick }) {
  const getCardStyle = () => {
    if (person.isVillain) return "border-killed bg-killed/10";
    if (person.isTrigger) return "border-killed";
    if (person.murdered) return "border-killed";
    if (person.title === "Emperor") return "border-gold-bright";
    if (person.isOromo) return "border-oromo";
    if (person.isRegent) return "border-gold";
    if (person.role?.includes("Princess") || person.role?.includes("Wife") || person.role?.includes("Empress") || person.title === "Princess" || person.title === "Wife" || person.title === "Empress") return "border-female";
    return "border-navy-lighter";
  };

  const getNameStyle = () => {
    if (person.title === "Emperor") return "text-gold-bright";
    if (person.isOromo) return "text-oromo";
    if (person.role?.includes("Princess") || person.role?.includes("Wife") || person.role?.includes("Empress") || person.title === "Princess" || person.title === "Wife" || person.title === "Empress") return "text-female";
    return "text-male";
  };

  return (
    <div
      onClick={() => onClick(person)}
      className={`bg-navy border-2 ${getCardStyle()} rounded-xl p-3 min-w-[130px] max-w-[160px] text-center cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-black/40 relative`}
    >
      {person.title === "Emperor" && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-lg">👑</div>
      )}
      {person.murdered && (
        <div className="absolute -top-2 -right-2 text-sm">⚔️</div>
      )}

      <div className={`font-display text-xs font-bold mt-2 leading-tight ${getNameStyle()}`}>
        {person.name}
      </div>

      {person.amharic && (
        <div className="text-[10px] text-gold-dim mt-1">{person.amharic}</div>
      )}

      {person.years && (
        <div className="text-[10px] text-gold mt-1">{person.years}</div>
      )}

      {person.role && (
        <div className="text-[10px] text-parchment-muted mt-1 italic">{person.role}</div>
      )}
    </div>
  );
}
