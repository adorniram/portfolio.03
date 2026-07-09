"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal
      gsap.from(imgRef.current, {
        clipPath: "inset(0% 100% 0% 0%)",
        duration: 1.4,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Text fade up
      const els = textRef.current?.querySelectorAll(".fade-item");
      if (els) {
        gsap.from(els, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: "160px 48px",
        background: "#0a0a0a",
        borderTop: "1px solid rgba(245,245,245,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }}
        className="about-grid"
      >
        {/* Image */}
        <div
          ref={imgRef}
          className="img-hover-zoom"
          style={{
            position: "relative",
            aspectRatio: "3/4",
            maxHeight: "680px",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          {/* Placeholder portrait */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(160deg, #1c1c2e 0%, #2d2d44 50%, #1a1a2e 100%)",
            }}
          />
          {/* Abstract portrait shape */}
          <svg
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }}
            viewBox="0 0 400 600"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="200" cy="180" r="80" fill="#c8a96e" />
            <ellipse cx="200" cy="420" rx="120" ry="160" fill="#c8a96e" />
          </svg>
          {/* Overlay gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 60%)",
            }}
          />
          {/* Label */}
          <div
            style={{
              position: "absolute",
              bottom: "24px",
              left: "24px",
            }}
          >
            <span
              className="font-mono"
              style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#888", textTransform: "uppercase" }}
            >
              Adoram — 2025
            </span>
          </div>
        </div>

        {/* Text */}
        <div ref={textRef} style={{ paddingLeft: "20px" }}>
          <div
            className="fade-item"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "40px",
            }}
          >
            <div style={{ width: "40px", height: "1px", background: "#c8a96e" }} />
            <span
              className="font-mono"
              style={{ fontSize: "11px", letterSpacing: "0.3em", color: "#c8a96e", textTransform: "uppercase" }}
            >
              À propos
            </span>
          </div>

          <h2
            className="fade-item font-display"
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 700,
              color: "#f5f5f5",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "32px",
            }}
          >
            Passionné par le
            <br />
            <em style={{ color: "#c8a96e", fontStyle: "italic" }}>numérique</em> &
            <br />
            la sécurité
          </h2>

          <p
            className="fade-item"
            style={{
              fontSize: "16px",
              lineHeight: 1.8,
              color: "#888",
              marginBottom: "32px",
              maxWidth: "480px",
            }}
          >
            Je suis un étudiant passionné par la cybersécurité, les réseaux, le développement web
            moderne et la création d&apos;expériences numériques immersives. J&apos;explore la
            frontière entre la technique et le design pour construire des solutions qui allient
            performance et esthétique.
          </p>

          <p
            className="fade-item"
            style={{
              fontSize: "16px",
              lineHeight: 1.8,
              color: "#666",
              marginBottom: "48px",
              maxWidth: "480px",
            }}
          >
            Mon approche combine une rigueur analytique héritée du monde des réseaux avec une
            sensibilité créative pour produire des projets qui font la différence.
          </p>

          {/* Stats */}
          <div
            className="fade-item"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "32px",
              paddingTop: "40px",
              borderTop: "1px solid rgba(245,245,245,0.08)",
            }}
          >
            {[
              { num: "2+", label: "Années d'étude" },
              { num: "5+", label: "Projets réalisés" },
              { num: "∞", label: "Curiosité" },
            ].map((stat) => (
              <div key={stat.label}>
                <span
                  className="font-display"
                  style={{
                    fontSize: "clamp(28px, 4vw, 48px)",
                    fontWeight: 700,
                    color: "#f5f5f5",
                    display: "block",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {stat.num}
                </span>
                <span
                  className="font-mono"
                  style={{ fontSize: "10px", letterSpacing: "0.15em", color: "#555", textTransform: "uppercase" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          section#about { padding: 100px 24px !important; }
          .about-grid > div:first-child {
            max-height: 520px !important;
          }
          .about-grid > div:last-child {
            padding-left: 0 !important;
          }
          .about-grid h2 {
            font-size: clamp(32px, 6vw, 48px) !important;
          }
          .about-grid p {
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
