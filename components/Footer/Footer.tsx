"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(bigTextRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      style={{
        background: "#080808",
        borderTop: "1px solid rgba(245,245,245,0.06)",
        overflow: "hidden",
      }}
    >
      {/* Big CTA text */}
      <div
        style={{
          padding: "100px 48px 80px",
          borderBottom: "1px solid rgba(245,245,245,0.06)",
        }}
      >
        <div ref={bigTextRef} style={{ maxWidth: "1400px", margin: "0 auto", textAlign: "center" }}>
          <p className="font-mono" style={{ fontSize: "11px", letterSpacing: "0.3em", color: "#555", textTransform: "uppercase", marginBottom: "24px" }}>
            Disponible pour des opportunités
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(48px, 10vw, 140px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
              color: "#f5f5f5",
            }}
          >
            Let&apos;s{" "}
            <em style={{ fontStyle: "italic", color: "#c8a96e" }}>Connect</em>
          </h2>

          <a
            href="mailto:adoram@email.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "48px",
              padding: "18px 40px",
              border: "1px solid rgba(245,245,245,0.15)",
              color: "#f5f5f5",
              textDecoration: "none",
              fontFamily: "'DM Mono', monospace",
              fontSize: "12px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              transition: "all 0.4s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#f5f5f5";
              (e.currentTarget as HTMLAnchorElement).style.color = "#0a0a0a";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color = "#f5f5f5";
            }}
          >
            <FiMail size={14} />
            adoram@email.com
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          padding: "32px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1400px",
          margin: "0 auto",
          flexWrap: "wrap",
          gap: "24px",
        }}
      >
        {/* Logo + copyright */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <span
            className="font-display"
            style={{ fontSize: "20px", fontWeight: 700, color: "#f5f5f5", letterSpacing: "-0.02em" }}
          >
            A.
          </span>
          <span
            className="font-mono"
            style={{ fontSize: "11px", color: "#444", letterSpacing: "0.1em" }}
          >
            © 2025 Adoram — Tous droits réservés
          </span>
        </div>

        {/* Social icons */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {[
            { icon: <FiGithub size={18} />, href: "#", label: "GitHub" },
            { icon: <FiLinkedin size={18} />, href: "#", label: "LinkedIn" },
            { icon: <FiMail size={18} />, href: "mailto:adoram@email.com", label: "Email" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              style={{
                color: "#444",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#f5f5f5";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#444";
              }}
            >
              {s.icon}
            </a>
          ))}

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            style={{
              width: "40px",
              height: "40px",
              border: "1px solid rgba(245,245,245,0.1)",
              borderRadius: "50%",
              background: "transparent",
              cursor: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#444",
              marginLeft: "8px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#c8a96e";
              (e.currentTarget as HTMLButtonElement).style.color = "#c8a96e";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(245,245,245,0.1)";
              (e.currentTarget as HTMLButtonElement).style.color = "#444";
            }}
            aria-label="Retour en haut"
          >
            <FiArrowUp size={16} />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer > div:first-child { padding: 80px 24px 60px !important; }
          footer > div:last-child { padding: 24px !important; }
        }
      `}</style>
    </footer>
  );
}
