export default function GondarDivider() {
  return (
    <div className="w-full py-6 flex justify-center">
      <svg width="400" height="60" viewBox="0 0 400 60" className="opacity-20">
        {/* Fasil Ghebbi castle silhouette */}
        <g fill="#f5f0e1">
          {/* Main tower */}
          <rect x="180" y="10" width="40" height="50"/>
          <rect x="175" y="5" width="50" height="8"/>
          
          {/* Left tower */}
          <rect x="120" y="25" width="30" height="35"/>
          <rect x="115" y="20" width="40" height="8"/>
          
          {/* Right tower */}
          <rect x="250" y="25" width="30" height="35"/>
          <rect x="245" y="20" width="40" height="8"/>
          
          {/* Connecting walls */}
          <rect x="150" y="35" width="30" height="25"/>
          <rect x="220" y="35" width="30" height="25"/>
          
          {/* Battlements */}
          <rect x="175" y="0" width="8" height="8"/>
          <rect x="190" y="0" width="8" height="8"/>
          <rect x="205" y="0" width="8" height="8"/>
          
          {/* Windows */}
          <rect x="195" y="20" width="10" height="15" fill="#2d3a2d"/>
          <rect x="130" y="35" width="8" height="12" fill="#2d3a2d"/>
          <rect x="260" y="35" width="8" height="12" fill="#2d3a2d"/>
          
          {/* Gate */}
          <rect x="190" y="45" width="20" height="15" fill="#2d3a2d"/>
          <path d="M190 45 Q200 35 210 45" fill="#2d3a2d"/>
        </g>
      </svg>
    </div>
  );
}
