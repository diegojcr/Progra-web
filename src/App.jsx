import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Inicio from "./components/Inicio";
import Services from "./components/Services";
import HowItWorks from "./components/como-funciona";
import Cobertura from "./components/Cobertura";
import Cotizador from "./components/Cotizador";
import Nosotros from "./components/Nosotros";
import FAQ from "./components/Faq";
import Contacto from "./components/Contacto";
import "./styles/global.css";

export default function App(){
  const [activeSection, setActiveSection] = useState("inicio");
  return (
    <div className="app">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>
        <section id="inicio">
          <Inicio />
        </section>
        <section id="servicios">
          <Services />
        </section>
        <section id="como-funciona">
          <HowItWorks />
        </section>
        <section id="cobertura">
          <Cobertura />
        </section>
        <section id="cotizador">
          <Cotizador />
        </section>
        <section id="nosotros">
          <Nosotros />
        </section>
        <section id="faq">
          <FAQ />
        </section>
        <section id="contacto">
          <Contacto />
        </section>

      </main>
      
      <Footer />
    </div>
  );
}