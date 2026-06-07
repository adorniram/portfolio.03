"use client";

import { useState, useEffect } from "react";
import Loader from "@/components/Loader/Loader";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Skills from "@/components/Skills/Skills";
import Projects from "@/components/Projects/Projects";
import Timeline from "@/components/Timeline/Timeline";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}
      <main
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.6s ease",
          pointerEvents: isLoaded ? "auto" : "none",
        }}
      >
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
