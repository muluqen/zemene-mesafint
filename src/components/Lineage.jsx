import { emperors } from "../data/emperors";

export default function Lineage({ onSelectEmperor }) {
  // Family tree data based on Claude's verified information
  const familyTree = {
    id: "iyasuI",
    name: "Iyasu I",
    amharic: "ኢያሱ",
    reign: "1682–1706",
    isEmperor: true,
    children: [
      {
        id: "tekleHaymanotI",
        name: "Tekle Haymanot I",
        amharic: "ተክለ ሃይማኖት",
        reign: "1706–1708",
        isEmperor: true,
        killedFather: true,
        children: []
      },
      {
        id: "dawitIII",
        name: "Dawit III",
        amharic: "ዳዊት",
        reign: "1716–1721",
        isEmperor: true,
        children: []
      },
      {
        id: "bakaffa",
        name: "Bakaffa",
        amharic: "በካፋ",
        reign: "1721–1730",
        isEmperor: true,
        children: [
          {
            id: "iyasuII",
            name: "Iyasu II",
            amharic: "ኢያሱ",
            reign: "1730–1755",
            isEmperor: true,
            children: [
              {
                id: "iyoasI",
                name: "Iyoas I",
                amharic: "ኢዮአስ",
                reign: "1755–1769",
                isEmperor: true,
                isEnd: true,
                children: []
              },
              {
                id: "adigo",
                name: "Adigo",
                amharic: "አዲጎ",
                reign: "Not emperor",
                isEmperor: false,
                children: [
                  {
                    id: "salomonII",
                    name: "Salomon II",
                    amharic: "ሰሎሞን",
                    reign: "1777–1779",
                    isEmperor: true,
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "yohannesII",
        name: "Yohannes II",
        amharic: "ዮሐንስ",
        reign: "1769",
        isEmperor: true,
        isOneHanded: true,
        children: [
          {
            id: "tekleHaymanotII",
            name: "Tekle Haymanot II",
            amharic: "ተክለ ሃይማኖት",
            reign: "1769–1777",
            isEmperor: true,
            children: []
          },
          {
            id: "tekleGiyorgisI",
            name: "Tekle Giyorgis I",
            amharic: "ተክለ ጊዮርጊስ",
            reign: "1779–1800 (6 times)",
            isEmperor: true,
            children: [
              {
                id: "yohannesIII",
                name: "Yohannes III",
                amharic: "ዮሐንስ",
                reign: "1840–1851",
                isEmperor: true,
                children: []
              }
            ]
          }
        ]
      }
    ]
  };

  // Render a node in the family tree
  const renderNode = (person, isChild = false) => {
    const emperor = emperors.find(e => e.id === person.id);
    return (
      <div className="flex flex-col items-center relative">
        {/* Card */}
        <div
          onClick={() => emperor && onSelectEmperor(emperor)}
          className={`dossier-paper rounded-sm p-2 min-w-[100px] max-w-[130px] text-center cursor-pointer transition-all hover:-translate-y-1 hover:shadow-dossier relative burnt-edge ${person.isEmperor
              ? person.killedFather
                ? "border-2 border-string"
                : "border border-olive-light/50"
              : "border border-dashed border-olive-light/30 opacity-70"
            }`}
        >
          {/* Push pin */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 push-pin"></div>

          {/* Emperor badge */}
          {person.isEmperor && (
            <div className="absolute -top-0.5 -right-0.5 text-[6px] font-display font-bold text-olive-dark bg-dossier border border-olive-light/50 px-0.5 rounded">
              👑
            </div>
          )}

          {/* Killed father badge */}
          {person.killedFather && (
            <div className="absolute -top-0.5 -left-0.5 text-[6px] font-display font-bold text-string border border-string px-0.5 rounded transform -rotate-12">
              PATRICIDE
            </div>
          )}

          {/* Name */}
          <div className="font-display text-[8px] font-bold mt-1 leading-tight text-olive-dark">
            {person.name}
          </div>

          {person.amharic && (
            <div className="text-[7px] text-olive mt-0 font-body">{person.amharic}</div>
          )}

          {/* Reign */}
          <div className={`text-[7px] mt-0 font-courier ${person.isEmperor ? "text-olive-dark" : "text-olive"}`}>
            {person.reign}
          </div>

          {/* Special notes */}
          {person.isOneHanded && (
            <div className="text-[6px] text-string mt-0 italic">One hand</div>
          )}
          {person.isEnd && (
            <div className="text-[6px] text-string mt-0 italic">Zemene begins</div>
          )}
        </div>

        {/* Children */}
        {person.children && person.children.length > 0 && (
          <div className="flex flex-col items-center mt-2">
            {/* Vertical string down */}
            <div className="red-string-vertical h-3"></div>

            {/* Children row */}
            <div className="flex items-start gap-2 relative">
              {/* Horizontal string connecting children */}
              {person.children.length > 1 && (
                <div
                  className="absolute top-0 h-0.5 bg-string/60"
                  style={{
                    left: '10%',
                    right: '10%',
                    boxShadow: '0 0 3px rgba(204,0,0,0.3)'
                  }}
                ></div>
              )}

              {person.children.map((child, i) => (
                <div key={child.id} className="flex flex-col items-center">
                  {/* Vertical string to child */}
                  <div className="red-string-vertical h-3"></div>
                  {renderNode(child, true)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="overflow-auto pb-5">
      <div className="relative" style={{ minWidth: '1000px', minHeight: '800px' }}>

        {/* Cork board background */}
        <div className="absolute inset-0 bg-cork-card rounded-lg border-2 border-olive-light/30"></div>

        {/* Title */}
        <div className="text-center font-display text-[10px] tracking-[3px] text-dossier/50 uppercase pt-3 pb-2 relative z-30">
          Royal Lineage — Who Fathered Whom
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-2 justify-center mb-4 relative z-30">
          <div className="flex items-center gap-2 text-[9px] text-dossier/60 bg-olive-dark border border-string/30 px-2 py-0.5 rounded">
            <span>👑</span> = Emperor
          </div>
          <div className="flex items-center gap-2 text-[9px] text-dossier/60 bg-olive-dark border border-string/30 px-2 py-0.5 rounded">
            <span className="text-string">PATRICIDE</span> = Killed father
          </div>
          <div className="flex items-center gap-2 text-[9px] text-dossier/60 bg-olive-dark border border-string/30 px-2 py-0.5 rounded">
            <div className="w-3 h-0.5 bg-string/60"></div> = Parent-child
          </div>
        </div>

        {/* Family tree */}
        <div className="relative z-20 flex justify-center px-8 pb-8">
          {renderNode(familyTree)}
        </div>

        {/* Notes */}
        <div className="absolute bottom-4 left-4 right-4 z-30">
          <div className="bg-olive-dark/80 border border-string/20 rounded p-2 text-[8px] text-dossier/40 font-typewriter">
            <strong className="text-dossier/60">Notes:</strong> Only showing direct family connections between emperors. Some emperors (Salomon III, Yonas, Dewetros, Baeda Maryam II/III, Iyasu IV, Gabra Krestos, Sahela Dengel) had unclear or unknown parentage and are not shown in this tree. Real power was held by warlords, not by bloodline.
          </div>
        </div>

      </div>
    </div>
  );
}
