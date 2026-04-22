export function Squiggle({
  className = "",
  width = 120,
}: {
  className?: string;
  width?: number;
}) {
  return (
    <svg
      width={width}
      height="24"
      viewBox="0 0 120 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M2 12 C12 4, 22 20, 32 12 C42 4, 52 20, 62 12 C72 4, 82 20, 92 12 C102 4, 112 20, 118 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function BlobLeft({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Rubber hose character — abstract figure reading/thinking */}
      <path
        d="M60 180 C40 160, 30 130, 50 110 C30 95, 35 70, 55 65 C50 45, 65 30, 85 38 C95 20, 120 22, 128 42 C150 38, 162 58, 150 78 C168 90, 165 115, 148 126 C160 148, 148 172, 128 178 C118 196, 90 200, 72 188 C68 184, 64 182, 60 180Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Stars/sparkles */}
      <path d="M20 40 L22 36 L24 40 L28 42 L24 44 L22 48 L20 44 L16 42 Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      <path d="M170 30 L172 26 L174 30 L178 32 L174 34 L172 38 L170 34 L166 32 Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      <circle cx="170" cy="170" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="30" cy="155" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M140 160 L142 156 L144 160 L140 160Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      {/* Wavy line underneath */}
      <path d="M30 205 C50 200, 70 210, 90 205 C110 200, 130 210, 150 205" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4"/>
    </svg>
  );
}

export function BlobRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Abstract geometric rubber hose shape */}
      <circle cx="90" cy="70" r="38" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      {/* Eyes */}
      <circle cx="78" cy="65" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="102" cy="65" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="79" cy="66" r="2" stroke="currentColor" strokeWidth="1" fill="currentColor"/>
      <circle cx="103" cy="66" r="2" stroke="currentColor" strokeWidth="1" fill="currentColor"/>
      {/* Smile */}
      <path d="M78 80 C84 88, 96 88, 102 80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Rubber hose arms */}
      <path d="M52 65 C36 55, 28 70, 38 82 C48 94, 60 85, 58 72" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M128 65 C144 55, 152 70, 142 82 C132 94, 120 85, 122 72" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Body */}
      <path d="M62 105 C58 130, 65 155, 90 160 C115 155, 122 130, 118 105 C112 100, 68 100, 62 105Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Legs */}
      <path d="M75 158 C72 175, 68 188, 72 195" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M105 158 C108 175, 112 188, 108 195" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Shoes */}
      <ellipse cx="68" cy="197" rx="12" ry="5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <ellipse cx="112" cy="197" rx="12" ry="5" stroke="currentColor" strokeWidth="2" fill="none"/>
      {/* Decorative dots */}
      <circle cx="20" cy="30" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="160" cy="20" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M155 150 L157 146 L159 150 L155 150Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

export function DotGrid({ className = "" }: { className?: string }) {
  const dots = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 6; c++) {
      dots.push(<circle key={`${r}-${c}`} cx={c * 16} cy={r * 16} r="1.5" fill="currentColor" />);
    }
  }
  return (
    <svg viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      {dots}
    </svg>
  );
}
