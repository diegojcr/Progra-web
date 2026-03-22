import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Inicio from "./components/Inicio";
import Services from "./components/Services";
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
        
      </main>
      
      <Footer />
    </div>
  );
}