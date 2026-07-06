import { emperors } from "../data/emperors";

export default function Timeline() {
  const events = [
    {
      year: "1682",
      title: "Iyasu I 'The Great' takes throne",
      description: "Last emperor who truly ran Ethiopia himself. Reformed the church, expanded the empire, made peace with the Oromo.",
      type: "normal",
      worldEvent: "Isaac Newton publishes his laws of gravity (1687)"
    },
    {
      year: "1706",
      title: "Iyasu I is murdered by his own son",
      description: "Tekle Haymanot I ambushed and killed his own father. The rot begins.",
      type: "murder",
      worldEvent: "Benjamin Franklin is born in Boston"
    },
    {
      year: "1721",
      title: "Bakaffa takes the throne",
      description: "The Spy Emperor. Traveled in disguise. His first wife died at the coronation banquet.",
      type: "normal",
      worldEvent: "J.S. Bach is composing his greatest works"
    },
    {
      year: "1730",
      title: "Bakaffa dies. Mentewab gets herself CROWNED.",
      description: "First woman crowned co-monarch in Ethiopian history. Ran the empire for 25 years.",
      type: "normal",
      worldEvent: "Ottoman Empire at its last peak"
    },
    {
      year: "1742",
      title: "Melmal Iyasu pushed off a cliff",
      description: "Ordered by Emperor Iyasu II. Melmal was Mentewab's secret lover.",
      type: "murder",
      worldEvent: "Handel premieres the Messiah in Dublin"
    },
    {
      year: "1755",
      title: "Iyasu II dies — poisoned in revenge",
      description: "By Melmal Iyasu's sister. Treasury had only a few dinars.",
      type: "murder",
      worldEvent: "Great Lisbon Earthquake kills 60,000"
    },
    {
      year: "1755",
      title: "Iyoas I takes throne at ~10 years old",
      description: "Mentewab vs Wubit — the power struggle that started everything.",
      type: "normal",
      worldEvent: null
    },
    {
      year: "1769",
      title: "Ras Mikael Sehul strangles Emperor Iyoas I",
      description: "May 7, 1769. Zemene Mesafint begins.",
      type: "murder",
      worldEvent: "Napoleon Bonaparte is born. James Watt patents the steam engine."
    },
    {
      year: "1769",
      title: "Yohannes II — the one-handed emperor",
      description: "Poisoned by Mikael Sehul after 5 months. James Bruce witnessed his reign.",
      type: "murder",
      worldEvent: null
    },
    {
      year: "1769–1777",
      title: "Tekle Haymanot II — the boy emperor",
      description: "Placed on throne at 15. Born in Mount Wehni prison. Became a monk and died.",
      type: "normal",
      worldEvent: null
    },
    {
      year: "1779–1800",
      title: "Tekle Giyorgis I — emperor SIX times",
      description: "Enthroned and deposed 6 times in 11 years. Called 'Fitame Mengist' — End of the Monarchy.",
      type: "normal",
      worldEvent: "French Revolution (1789), USA founded (1776)"
    },
    {
      year: "1801–1818",
      title: "Egwale Seyon — longest reign",
      description: "17 years in power. Never left Gondar after his first campaign.",
      type: "normal",
      worldEvent: "Napoleon conquers Europe"
    },
    {
      year: "1855",
      title: "Tewodros II ends the chaos",
      description: "Kassa Hailu defeats Ras Ali II. Zemene Mesafint is over. Modern Ethiopia begins.",
      type: "victory",
      worldEvent: "Crimean War ending. Abraham Lincoln is a lawyer."
    }
  ];

  return (
    <div>
      <div className="font-display text-lg text-dossier mb-5 text-center">Key Moments</div>
      <div className="space-y-5">
        {events.map((event, i) => (
          <div key={i} className="flex gap-4 items-start">
            <div className="font-courier text-xs text-dossier min-w-[60px] text-right pt-1">
              {event.year}
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-3 h-3 rounded-full border-2 flex-shrink-0 mt-1 ${
                  event.type === "murder"
                    ? "border-string bg-string/20"
                    : event.type === "victory"
                    ? "border-dossier bg-dossier/20"
                    : "border-string/50 bg-olive"
                }`}
              ></div>
              <div className="red-string-vertical min-h-[20px] mt-1"></div>
            </div>
            <div>
              <div className="text-sm text-dossier leading-relaxed font-body">
                <strong className="text-dossier">{event.title}</strong> — {event.description}
              </div>
              {event.worldEvent && (
                <div className="inline-block bg-olive-dark border border-string/30 rounded px-3 py-0.5 text-[11px] text-dossier/50 mt-1 font-typewriter">
                  {event.worldEvent}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
