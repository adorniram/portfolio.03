"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "A propos de", target: "about" },
  { label: "Projet", target: "projects" },
  { label: "Parcours", target: "timeline" },
  { label: "Contacts", target: "contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.2,
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (target: string) => {
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 48px",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.5s ease, border-bottom 0.5s ease",
          background: scrolled ? "rgba(10, 10, 10, 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(245,245,245,0.06)" : "1px solid transparent",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "22px",
            fontWeight: 700,
            color: "#f5f5f5",
            letterSpacing: "-0.02em",
            background: "none",
            border: "none",
            cursor: "none",
          }}
        >
          A.
        </button>

        {/* Desktop Links */}
        <div
          style={{
            display: "flex",
            gap: "48px",
            alignItems: "center",
          }}
          className="hidden-mobile"
        >
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => scrollToSection(link.target)}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#888",
                background: "none",
                border: "none",
                cursor: "none",
                transition: "color 0.3s ease",
                padding: "4px 0",
                position: "relative",
              }}
              className="nav-link"
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.color = "#f5f5f5";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.color = "#888";
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            flexDirection: "column",
            gap: "5px",
            background: "none",
            border: "none",
            cursor: "none",
            padding: "8px",
          }}
          className="hamburger"
        >
          <span
            style={{
              width: "24px",
              height: "1px",
              background: "#f5f5f5",
              display: "block",
              transition: "transform 0.3s ease",
              transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
            }}
          />
          <span
            style={{
              width: "24px",
              height: "1px",
              background: "#f5f5f5",
              display: "block",
              opacity: menuOpen ? 0 : 1,
              transition: "opacity 0.3s ease",
            }}
          />
          <span
            style={{
              width: "24px",
              height: "1px",
              background: "#f5f5f5",
              display: "block",
              transition: "transform 0.3s ease",
              transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99,
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
          transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.6s cubic-bezier(0.77, 0, 0.175, 1)",
        }}
      >
        {navLinks.map((link, i) => (
          <button
            key={link.target}
            onClick={() => scrollToSection(link.target)}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 8vw, 64px)",
              fontWeight: 700,
              color: "#f5f5f5",
              background: "none",
              border: "none",
              cursor: "none",
              letterSpacing: "-0.02em",
              transform: menuOpen ? "translateY(0)" : "translateY(40px)",
              opacity: menuOpen ? 1 : 0,
              transition: `transform 0.5s ease ${i * 0.08}s, opacity 0.5s ease ${i * 0.08}s`,
            }}
          >
            {link.label}
          </button>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
