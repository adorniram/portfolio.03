"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timelineItems = [
  {
    year: "2025",
    type: "Formation",
    title: "Licence 2 — Réseaux & Sécurité informatique",
    institution: "Université virtuelle de Côte d'Ivoire",
    description: "Spécialisation en réseaux avancés et développement de solutions sécurisées.",
    color: "#c8a96e",
  },
  {
    year: "2026",
    type: "certification",
    title: "Certification in Google DATA Analyst ",
    institution: "Cousera",
    description: "Certification montrant les bases de l'analyse de données, SQL, visualisation et prise de décision basée sur les données.",
    color: "#6eb5c8",
  },
  {
    year: "2026",
    type: "Certification",
    title: "Cisco Networking Essentials",
    institution: "Cisco NetAcad",
    description: "Certification couvrant les fondamentaux des réseaux TCP/IP, routage et switching.",
    color: "#c86e6e",
  },
  {
    year: "2025",
    type: "certification",
    title: "Certification Google Workspace",
    institution: "Cousera",
    description: "Apprentissage des outils Google Workspace pour la productivité et la collaboration.",
    color: "#6ec8a9",
  },
  {
    year: "2025",
    type: "certification",
    title: "Certification computer Hardware Basic",
    institution: "Cisco Netcad",
    description: "Formation sur les éléments de base du matériel informatique, composants et maintenance.",
    color: "#a96ec8",
  },
  {
    year: "2025",
    type: "Certification",
    title: "Introduction to Cybersecurity",
    institution: "Cisco NetAcad",
    description: "Fondamentaux de la cybersécurité, protection des données et bonnes pratiques.",
    color: "#c8a96e",
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      document.querySelectorAll(".timeline-item").forEach((el, i) => {
        gsap.from(el, {
          x: i % 2 === 0 ? -40 : 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          delay: 0.1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      style={{
        padding: "160px 48px",
        background: "#0d0d0d",
        borderTop: "1px solid rgba(245,245,245,0.06)",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "100px", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "20px" }}>
            <div style={{ width: "40px", height: "1px", background: "#c8a96e" }} />
            <span className="font-mono" style={{ fontSize: "11px", letterSpacing: "0.3em", color: "#c8a96e", textTransform: "uppercase" }}>
              Parcours
            </span>
            <div style={{ width: "40px", height: "1px", background: "#c8a96e" }} />
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(36px, 6vw, 80px)",
              fontWeight: 700,
              color: "#f5f5f5",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            Formation &amp; <em style={{ fontStyle: "italic", color: "#c8a96e" }}>Expériences</em>
          </h2>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Center line */}
          <div
            ref={lineRef}
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "1px",
              background: "rgba(245,245,245,0.08)",
              transform: "translateX(-50%)",
            }}
          />

          {/* Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {timelineItems.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} isLeft={i % 2 === 0} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section#timeline { padding: 100px 24px !important; }
          .timeline-wrapper { padding-left: 40px !important; padding-right: 0 !important; text-align: left !important; }
          .timeline-dot { left: -32px !important; right: auto !important; }
          .center-line { left: 20px !important; }
        }
      `}</style>
    </section>
  );
}

function TimelineItem({
  item,
  index,
  isLeft,
}: {
  item: (typeof timelineItems)[0];
  index: number;
  isLeft: boolean;
}) {
  return (
    <div
      className="timeline-item"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 60px 1fr",
        alignItems: "flex-start",
        marginBottom: "60px",
      }}
    >
      {/* Left content */}
      <div
        className={`timeline-wrapper ${isLeft ? "" : "empty"}`}
        style={{
          paddingRight: isLeft ? "48px" : "0",
          textAlign: isLeft ? "right" : "left",
          opacity: isLeft ? 1 : 0,
          pointerEvents: isLeft ? "auto" : "none",
        }}
      >
        {isLeft && <TimelineCard item={item} />}
      </div>

      {/* Center dot */}
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "8px" }}>
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: item.color,
            border: "2px solid #0d0d0d",
            boxShadow: `0 0 0 4px ${item.color}20`,
            flexShrink: 0,
          }}
        />
      </div>

      {/* Right content */}
      <div
        style={{
          paddingLeft: !isLeft ? "48px" : "0",
          opacity: !isLeft ? 1 : 0,
          pointerEvents: !isLeft ? "auto" : "none",
        }}
      >
        {!isLeft && <TimelineCard item={item} />}
      </div>
    </div>
  );
}

function TimelineCard({ item }: { item: (typeof timelineItems)[0] }) {
  return (
    <div
      style={{
        padding: "28px",
        border: "1px solid rgba(245,245,245,0.06)",
        borderRadius: "4px",
        background: "rgba(245,245,245,0.01)",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${item.color}30`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(245,245,245,0.06)";
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(to right, ${item.color}, transparent)`,
        }}
      />
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        <span
          className="font-mono"
          style={{
            fontSize: "10px",
            letterSpacing: "0.15em",
            color: item.color,
            background: `${item.color}15`,
            padding: "3px 10px",
            borderRadius: "100px",
            textTransform: "uppercase",
          }}
        >
          {item.type}
        </span>
        <span
          className="font-mono"
          style={{ fontSize: "10px", letterSpacing: "0.15em", color: "#555", textTransform: "uppercase", alignSelf: "center" }}
        >
          {item.year}
        </span>
      </div>
      <h4
        className="font-display"
        style={{ fontSize: "18px", fontWeight: 700, color: "#f5f5f5", letterSpacing: "-0.01em", marginBottom: "6px", lineHeight: 1.3 }}
      >
        {item.title}
      </h4>
      <p
        className="font-mono"
        style={{ fontSize: "11px", color: "#555", letterSpacing: "0.05em", marginBottom: "10px" }}
      >
        {item.institution}
      </p>
      <p style={{ fontSize: "13px", lineHeight: 1.7, color: "#666" }}>{item.description}</p>
    </div>
  );
}
