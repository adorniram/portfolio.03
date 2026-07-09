"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiLinux, SiWireshark, SiPython, SiHtml5, SiCss, SiJavascript,
  SiReact, SiNextdotjs, SiPhp, SiGithub, SiDocker
} from "react-icons/si";
import { FaNetworkWired, FaShieldAlt, FaCode } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Cybersécurité",
    icon: <FaShieldAlt />,
    color: "#c8a96e",
    skills: [
      { name: "Linux", icon: <SiLinux />, level: 50 },
      { name: "Wireshark", icon: <SiWireshark />, level: 45 },
      { name: "Nmap", icon: <FaShieldAlt />, level: 30 },
      { name: "Metasploit", icon: <FaShieldAlt />, level: 30 },
      { name: "Python", icon: <SiPython />, level: 80 },
    ],
  },
  {
    title: "Développement",
    icon: <FaCode />,
    color: "#6eb5c8",
    skills: [
      { name: "HTML/CSS", icon: <SiHtml5 />, level: 90 },
      { name: "JavaScript", icon: <SiJavascript />, level: 75 },
      { name: "React", icon: <SiReact />, level: 70 },
      { name: "Next.js", icon: <SiNextdotjs />, level: 75 },
      { name: "PHP", icon: <SiPhp />, level: 70 },
    ],
  },
  {
    title: "Réseaux",
    icon: <FaNetworkWired />,
    color: "#c86e6e",
    skills: [
      { name: "Cisco / PT", icon: <FaNetworkWired />, level: 80 },
      { name: "TCP/IP", icon: <FaNetworkWired />, level: 85 },
      { name: "Routage", icon: <FaNetworkWired />, level: 75 },
      { name: "Switching", icon: <FaNetworkWired />, level: 65 },
      { name: "SNMP/Syslog", icon: <FaNetworkWired />, level: 60 },
    ],
  },
];

function SkillCard({ category, index }: { category: typeof skillCategories[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(cardRef.current, {
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 85%",
      },
      delay: index * 0.15,
    });
  }, [index]);

  return (
    <div
      ref={cardRef}
      style={{
        padding: "40px",
        border: "1px solid rgba(245,245,245,0.06)",
        borderRadius: "4px",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.4s ease, transform 0.4s ease",
        background: "rgba(245,245,245,0.01)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${category.color}40`;
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(245,245,245,0.06)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {/* BG accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(to right, ${category.color}, transparent)`,
        }}
      />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
        <span style={{ fontSize: "20px", color: category.color }}>{category.icon}</span>
        <h3
          className="font-display"
          style={{ fontSize: "20px", fontWeight: 700, color: "#f5f5f5", letterSpacing: "-0.02em" }}
        >
          {category.title}
        </h3>
      </div>

      {/* Skills */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {category.skills.map((skill) => (
          <div key={skill.name}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "14px", color: "#666" }}>{skill.icon}</span>
                <span
                  className="font-mono"
                  style={{ fontSize: "12px", color: "#aaa", letterSpacing: "0.05em" }}
                >
                  {skill.name}
                </span>
              </div>
              <span
                className="font-mono"
                style={{ fontSize: "10px", color: "#555", letterSpacing: "0.1em" }}
              >
                {skill.level}%
              </span>
            </div>
            {/* Progress bar */}
            <div
              style={{
                height: "2px",
                background: "rgba(245,245,245,0.06)",
                borderRadius: "1px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${skill.level}%`,
                  background: `linear-gradient(to right, ${category.color}, ${category.color}80)`,
                  borderRadius: "1px",
                  transition: "width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        padding: "160px 48px",
        background: "#0d0d0d",
        borderTop: "1px solid rgba(245,245,245,0.06)",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div className="skills-header" style={{ marginBottom: "80px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <div style={{ width: "40px", height: "1px", background: "#c8a96e" }} />
              <span className="font-mono" style={{ fontSize: "11px", letterSpacing: "0.3em", color: "#c8a96e", textTransform: "uppercase" }}>
                Compétences
              </span>
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
              Stack &amp; <em style={{ fontStyle: "italic", color: "#c8a96e" }}>Outils</em>
            </h2>
          </div>
          <p
            style={{
              maxWidth: "320px",
              fontSize: "14px",
              lineHeight: 1.8,
              color: "#666",
            }}
          >
            Un ensemble de compétences techniques forgées à travers des projets concrets et une formation continue.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
          className="skills-grid"
        >
          {skillCategories.map((cat, i) => (
            <SkillCard key={cat.title} category={cat} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .skills-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 900px) {
          .skills-header { flex-direction: column !important; align-items: flex-start !important; gap: 18px !important; }
          .skills-header p { max-width: 100% !important; }
        }
        @media (max-width: 640px) {
          .skills-grid { grid-template-columns: 1fr !important; }
          section#skills { padding: 100px 24px !important; }
        }
      `}</style>
    </section>
  );
}
