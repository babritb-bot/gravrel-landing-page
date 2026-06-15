import React, { useEffect, useRef } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaglineBar from "@/components/TaglineBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

const Home = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    // Mark all reveal elements as visible immediately as a safe fallback.
    const reveals = rootRef.current?.querySelectorAll(".reveal") || [];
    reveals.forEach((el) => el.classList.add("in"));

    // Optional progressive enhancement — animate sections in as they scroll into view.
    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add("in");
          });
        },
        { threshold: 0.12 }
      );
      reveals.forEach((el) => obs.observe(el));
      return () => obs.disconnect();
    }
  }, []);

  return (
    <div ref={rootRef} className="gr-bg-glow gr-grain min-h-screen relative">
      <TaglineBar />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Stats />
        <Services />
        <Projects />
        <Team />
        <Testimonials />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#0f1419",
            border: "1px solid rgba(16,185,129,0.25)",
            color: "#e6edf0",
          },
        }}
      />
    </div>
  );
}

export default App;
