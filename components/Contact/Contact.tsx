"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiMail, FiGithub, FiLinkedin, FiSend } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-fade", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // EmailJS integration placeholder
    // Replace with your EmailJS service, template, and user IDs
    try {
      // await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData, "YOUR_PUBLIC_KEY");
      await new Promise((r) => setTimeout(r, 1500)); // Simulate send
      setStatus("sent");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "18px 0",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(245,245,245,0.1)",
    color: "#f5f5f5",
    fontSize: "15px",
    fontFamily: "'Space Grotesk', sans-serif",
    outline: "none",
    transition: "border-color 0.3s ease",
  };

  return (
    <section
      id="contact"
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
          gridTemplateColumns: "1fr 1.2fr",
          gap: "100px",
          alignItems: "flex-start",
        }}
        className="contact-grid"
      >
        {/* Left */}
        <div>
          <div className="contact-fade" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
            <div style={{ width: "40px", height: "1px", background: "#c8a96e" }} />
            <span className="font-mono" style={{ fontSize: "11px", letterSpacing: "0.3em", color: "#c8a96e", textTransform: "uppercase" }}>
              Contact
            </span>
          </div>

          <h2
            className="contact-fade font-display"
            style={{
              fontSize: "clamp(40px, 6vw, 80px)",
              fontWeight: 700,
              color: "#f5f5f5",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              marginBottom: "32px",
            }}
          >
            Travaillons
            <br />
            <em style={{ fontStyle: "italic", color: "#c8a96e" }}>ensemble</em>
          </h2>

          <p
            className="contact-fade"
            style={{ fontSize: "16px", lineHeight: 1.8, color: "#666", marginBottom: "56px", maxWidth: "400px" }}
          >
            Vous avez un projet, une idée ou simplement envie d&apos;échanger ? Je suis disponible pour des collaborations, des stages ou des opportunités.
          </p>

          {/* Social links */}
          <div className="contact-fade" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[
              { icon: <FiMail />, label: "adoramzerty@email.com", href: "mailto:adoramzerty@email.com" },
              { icon: <FiLinkedin />, label: "linkedin.com/in/adoram", href: "#" },
              { icon: <FiGithub />, label: "https://github.com/adorniram", href: "#" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  color: "#666",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                  fontSize: "14px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#f5f5f5";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#666";
                }}
              >
                <span
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "1px solid rgba(245,245,245,0.08)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    flexShrink: 0,
                  }}
                >
                  {link.icon}
                </span>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="contact-fade"
          style={{ display: "flex", flexDirection: "column", gap: "8px" }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 40px" }}>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Votre nom"
                value={formData.name}
                onChange={handleChange}
                required
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderBottomColor = "#c8a96e"; }}
                onBlur={(e) => { e.target.style.borderBottomColor = "rgba(245,245,245,0.1)"; }}
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Votre email"
                value={formData.email}
                onChange={handleChange}
                required
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderBottomColor = "#c8a96e"; }}
                onBlur={(e) => { e.target.style.borderBottomColor = "rgba(245,245,245,0.1)"; }}
              />
            </div>
          </div>

          <input
            type="text"
            name="subject"
            placeholder="Sujet"
            value={formData.subject}
            onChange={handleChange}
            required
            style={{ ...inputStyle, marginTop: "8px" }}
            onFocus={(e) => { e.target.style.borderBottomColor = "#c8a96e"; }}
            onBlur={(e) => { e.target.style.borderBottomColor = "rgba(245,245,245,0.1)"; }}
          />

          <textarea
            name="message"
            placeholder="Votre message..."
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            style={{
              ...inputStyle,
              resize: "none",
              marginTop: "8px",
              lineHeight: 1.7,
            }}
            onFocus={(e) => { e.target.style.borderBottomColor = "#c8a96e"; }}
            onBlur={(e) => { e.target.style.borderBottomColor = "rgba(245,245,245,0.1)"; }}
          />

          <button
            type="submit"
            disabled={status === "sending"}
            style={{
              marginTop: "32px",
              padding: "20px 48px",
              background: status === "sent" ? "#2d4a3e" : "#f5f5f5",
              color: status === "sent" ? "#6ec8a9" : "#0a0a0a",
              border: "none",
              cursor: "none",
              fontFamily: "'DM Mono', monospace",
              fontSize: "12px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              alignSelf: "flex-start",
              transition: "all 0.4s ease",
              opacity: status === "sending" ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (status === "idle") {
                (e.currentTarget as HTMLButtonElement).style.background = "#c8a96e";
              }
            }}
            onMouseLeave={(e) => {
              if (status === "idle") {
                (e.currentTarget as HTMLButtonElement).style.background = "#f5f5f5";
              }
            }}
          >
            <FiSend size={14} />
            {status === "idle" && "Envoyer le message"}
            {status === "sending" && "Envoi en cours..."}
            {status === "sent" && "Message envoyé ✓"}
            {status === "error" && "Erreur — réessayez"}
          </button>

          {status === "sent" && (
            <p style={{ fontSize: "13px", color: "#6ec8a9", marginTop: "12px" }}>
              Merci ! Je vous répondrai dans les plus brefs délais.
            </p>
          )}
        </form>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 60px !important; }
          section#contact { padding: 100px 24px !important; }
        }
      `}</style>
    </section>
  );
}
