"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "Portfolio Personnel",
    description:
      "Portfolio immersif développé avec Next.js 15, GSAP et Framer Motion. Design cinématographique inspiré des studios créatifs haut de gamme.",
    tech: ["Next.js", "GSAP", "TypeScript", "Framer Motion"],
    accent: "#6eb5c8",
    link: "#",
  },
  {
    id: "02",
    title: "Simulateur Réseau",
    description:
      "Application Python intégrant l'API PT Anywhere pour la simulation de topologies réseau Cisco, avec monitoring SNMP et serveur Syslog.",
    tech: ["Python", "Cisco PT", "SNMP", "API REST"],
    accent: "#c8a96e",
    link: "#",
  },
  {
    id: "03",
    title: "Ninakaire E-commerce",
    description:
      "Boutique en ligne complète avec système de paiement, gestion des produits, tableau de bord admin et interface utilisateur moderne.",
    tech: ["PHP", "MySQL", "JavaScript", "CSS"],
    accent: "#c86e6e",
    link: "#",
  },
  {
    id: "04",
    title: "Dashboard Cybersécurité",
    description:
      "Interface de monitoring réseau en temps réel avec visualisation des logs, détection d'anomalies et rapports de sécurité automatisés.",
    tech: ["React", "Python", "Syslog", "Chart.js"],
    accent: "#6ec8a9",
    link: "#",
  },
];

function ProjectRow({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    gsap.from(rowRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: rowRef.current,
        start: "top 85%",
      },
      delay: index * 0.1,
    });
  }, [index]);

  return (
    <div
      ref={rowRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "48px 0",
        borderTop: "1px solid rgba(245,245,245,0.06)",
        display: "grid",
        gridTemplateColumns: "80px 1fr auto",
        gap: "40px",
        alignItems: "center",
        cursor: "none",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "0 -48px",
          background: "rgba(245,245,245,0.02)",
          transform: hovered ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "bottom",
          transition: "transform 0.4s cubic-bezier(0.77, 0, 0.175, 1)",
          borderRadius: "2px",
          pointerEvents: "none",
        }}
      />

      <span className="font-mono" style={{ fontSize: "12px", color: "#444", letterSpacing: "0.1em", position: "relative", zIndex: 1 }}>
        {project.id}
      </span>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
          <h3
            className="font-display"
            style={{
              fontSize: "clamp(22px, 3vw, 40px)",
              fontWeight: 700,
              color: hovered ? project.accent : "#f5f5f5",
              letterSpacing: "-0.02em",
              transition: "color 0.3s ease",
            }}
          >
            {project.title}
          </h3>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {project.tech.map((t) => (
              <span key={t} className="tag" style={{ borderColor: `${project.accent}30`, color: project.accent }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <p
          style={{
            fontSize: "14px",
            lineHeight: 1.7,
            color: "#666",
            marginTop: "12px",
            maxWidth: "600px",
            opacity: hovered ? 1 : 0.7,
            transition: "opacity 0.3s ease",
          }}
        >
          {project.description}
        </p>
      </div>

      <a
        href={project.link}
        onClick={(e) => e.preventDefault()}
        style={{
          width: "52px",
          height: "52px",
          border: `1px solid ${hovered ? project.accent : "rgba(245,245,245,0.1)"}`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: hovered ? project.accent : "#555",
          transition: "all 0.4s ease",
          transform: hovered ? "rotate(45deg)" : "rotate(0deg)",
          flexShrink: 0,
          position: "relative",
          zIndex: 1,
          textDecoration: "none",
        }}
      >
        <FiArrowUpRight size={20} />
      </a>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ padding: "160px 48px", background: "#0a0a0a", borderTop: "1px solid rgba(245,245,245,0.06)" }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ marginBottom: "100px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
            <div style={{ width: "40px", height: "1px", background: "#c8a96e" }} />
            <span className="font-mono" style={{ fontSize: "11px", letterSpacing: "0.3em", color: "#c8a96e", textTransform: "uppercase" }}>
              Projets Sélectionnés
            </span>
          </div>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(36px, 6vw, 80px)", fontWeight: 700, color: "#f5f5f5", letterSpacing: "-0.03em", lineHeight: 1 }}
          >
            Réalisations &amp; <br />
            <em style={{ fontStyle: "italic", color: "#c8a96e" }}>Créations</em>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {projects.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>

      <style>{`@media (max-width: 768px) { section#projects { padding: 100px 24px !important; } }`}</style>
    </section>
  );
}
