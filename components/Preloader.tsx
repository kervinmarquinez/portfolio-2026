"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [mounted, setMounted] = useState(true);
  const [closing, setClosing] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";

    const textTimer  = setTimeout(() => setTextVisible(true), 400);
    const closeTimer = setTimeout(() => setClosing(true), 2800);
    const unmount    = setTimeout(() => {
      setMounted(false);
      document.documentElement.style.overflow = "";
    }, 3600);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(closeTimer);
      clearTimeout(unmount);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[99999] bg-paper flex flex-col items-center justify-center gap-10 px-6"
      style={{
        transform: closing ? "translateY(-100%)" : "translateY(0)",
        transition: closing ? "transform 750ms cubic-bezier(0.85, 0, 0.15, 1)" : "none",
      }}
    >
      {/* Video */}
      <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden ring-[1.5px] ring-ink/10 ring-offset-8 ring-offset-paper">
        <video
          src="/videos/preloader.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text */}
      <p
        className="font-display font-semibold italic text-center leading-tight tracking-tight text-ink
                   text-3xl sm:text-4xl md:text-5xl
                   transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          opacity: textVisible ? 1 : 0,
          transform: textVisible ? "translateY(0)" : "translateY(16px)",
        }}
      >
        ¡Bienvenido,<br className="hidden sm:block" /> te estaba esperando!
      </p>

      {/* Progress bar */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-24 h-px bg-ink/10 overflow-hidden rounded-full">
        <div
          className="h-full bg-accent origin-left"
          style={{
            animation: "preloader-bar 2.8s linear forwards",
          }}
        />
      </div>

    </div>
  );
}
