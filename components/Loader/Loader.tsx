"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "power3.inOut",
          delay: 0.3,
          onComplete,
        });
      },
    });

    tl.from(nameRef.current, {
      yPercent: 120,
      duration: 1,
      ease: "power4.out",
    })
      .from(subtitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.4")
      .to(progressRef.current, {
        scaleX: 1,
        duration: 1.8,
        ease: "power3.inOut",
      }, "-=0.2");

    const obj = { val: 0 };
    gsap.to(obj, {
      val: 100,
      duration: 2,
      ease: "power3.inOut",
      onUpdate: () => {
        if (percentRef.current) {
          percentRef.current.textContent = Math.round(obj.val).toString();
        }
      },
    });
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
      }}
    >
      {/* Vertical grid lines */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.04 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "1px",
              background: "#f5f5f5",
              left: `${(i + 1) * (100 / 7)}%`,
            }}
          />
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
        <div style={{ overflow: "hidden", marginBottom: "10px" }}>
          <div ref={nameRef}>
            <span
              className="font-display"
              style={{
                fontSize: "clamp(56px, 12vw, 140px)",
                fontWeight: 700,
                color: "#f5f5f5",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                display: "block",
              }}
            >
              Adoram
            </span>
          </div>
        </div>

        <div
          ref={subtitleRef}
          className="font-mono"
          style={{
            fontSize: "11px",
            letterSpacing: "0.35em",
            color: "#555",
            textTransform: "uppercase",
            marginBottom: "64px",
          }}
        >
          Portfolio — 2026
        </div>

        <div style={{ width: "320px", position: "relative" }}>
          <div style={{ height: "1px", background: "rgba(245,245,245,0.08)" }}>
            <div
              ref={progressRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "1px",
                background: "#f5f5f5",
                transformOrigin: "left center",
                transform: "scaleX(0)",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "14px",
            }}
          >
            <span
              className="font-mono"
              style={{ fontSize: "10px", color: "#444", letterSpacing: "0.15em", textTransform: "uppercase" }}
            >
              Loading
            </span>
            <span
              className="font-mono"
              style={{ fontSize: "10px", color: "#444", letterSpacing: "0.1em" }}
            >
              <span ref={percentRef}>0</span>%
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "32px",
          fontFamily: "'DM Mono', monospace",
          fontSize: "10px",
          color: "#333",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        Etudiant Reseau 
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          right: "32px",
          fontFamily: "'DM Mono', monospace",
          fontSize: "10px",
          color: "#333",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        securité informatique
      </div>
    </div>
  );
}
