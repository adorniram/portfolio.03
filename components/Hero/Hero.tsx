"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // Clip-path image reveal
      tl.from(imgRef.current, {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1.4,
        ease: "power4.inOut",
      });

      // Title reveal line by line
      const lines = titleRef.current?.querySelectorAll(".line-inner");
      if (lines) {
        tl.from(lines, {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.12,
          ease: "power4.out",
        }, "-=0.8");
      }

      tl.from(subtitleRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.5");

      tl.from(scrollRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.3");

      // Parallax on scroll
      gsap.to(imgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        height: "100vh",
        minHeight: "700px",
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        background: "#0a0a0a",
      }}
    >
      {/* Full-bleed background image */}
      <div
        ref={imgRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        {/* Gradient placeholder — replace with your photo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)",
          }}
        />
        {/* Noise + dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.5) 40%, rgba(10,10,10,0.2) 100%)",
            zIndex: 1,
          }}
        />
        {/* Decorative grid */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, zIndex: 2 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#f5f5f5" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          padding: "0 48px 80px",
          maxWidth: "1600px",
          margin: "0 auto",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div style={{ width: "40px", height: "1px", background: "#c8a96e" }} />
          <span
            className="font-mono"
            style={{ fontSize: "11px", letterSpacing: "0.3em", color: "#c8a96e", textTransform: "uppercase" }}
          >
            Portfolio 2025
          </span>
        </div>

        {/* Giant title */}
        <div ref={titleRef}>
          {["Adoram"].map((word, i) => (
            <div
              key={i}
              className="text-mask-line"
              style={{ overflow: "hidden", lineHeight: 0.9 }}
            >
              <span
                className="line-inner font-display"
                style={{
                  display: "block",
                  fontSize: "clamp(72px, 16vw, 220px)",
                  fontWeight: 900,
                  color: "#f5f5f5",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.9,
                }}
              >
                {word}
              </span>
            </div>
          ))}
        </div>

        {/* Subtitle row */}
        <div
          ref={subtitleRef}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "32px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: "clamp(12px, 2vw, 18px)",
              letterSpacing: "0.05em",
              color: "#888",
              textTransform: "uppercase",
            }}
          >
            Cyber Activist &amp; Full Stack Developer
          </span>

          <div style={{ display: "flex", gap: "12px" }}>
            <span className="tag">Cybersécurité</span>
            <span className="tag">Réseaux</span>
            <span className="tag">Web</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        style={{
          position: "absolute",
          bottom: "40px",
          right: "48px",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span
          className="font-mono"
          style={{
            fontSize: "10px",
            letterSpacing: "0.3em",
            color: "#555",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "60px",
            background: "linear-gradient(to bottom, #555, transparent)",
            animation: "scrollLine 1.5s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes scrollLine {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(0.5); }
        }
        @media (max-width: 768px) {
          section#hero > div { padding: 0 24px 64px !important; }
        }
      `}</style>
    </section>
  );
}
