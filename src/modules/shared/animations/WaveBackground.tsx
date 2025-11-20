"use client";

export function WaveBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <svg
        className="absolute bottom-0 left-0 w-full h-64 text-primary/10"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C300,50 600,100 900,60 C1050,40 1150,20 1200,0 L1200,120 L0,120 Z"
          className="fill-current animate-wave"
        />
      </svg>
      <svg
        className="absolute bottom-0 left-0 w-full h-64 text-primary/5"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 C300,80 600,20 900,50 C1050,65 1150,55 1200,40 L1200,120 L0,120 Z"
          className="fill-current animate-wave-slow"
        />
      </svg>
    </div>
  );
}

