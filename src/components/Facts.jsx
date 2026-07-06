import { facts } from "../data/facts";

export default function Facts() {
  return (
    <div>
      <div className="font-display text-lg text-dossier mb-5 text-center">Wild Facts You Won't Forget</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {facts.map((fact, i) => (
          <div
            key={i}
            className="dossier-paper rounded-sm p-5 transition-colors hover:shadow-dossier relative burnt-edge border border-olive-light/30"
          >
            {/* Push pin */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 push-pin"></div>

            <div className="text-3xl mb-3 mt-2">{fact.icon}</div>
            <div className="font-display text-xs text-olive-dark tracking-wider mb-2">
              {fact.title}
            </div>
            <div className="text-sm text-olive-dark leading-relaxed font-body">
              {fact.body}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
