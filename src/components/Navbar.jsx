import { useState, useEffect } from "react";
import "./Navbar.css";

const NAV_LINKS = [
  { id: "inicio", label: "Inicio" },
  { id: "servicios", label: "Servicios" },
  { id: "cobertura", label: "Cobertura" },
  { id: "cotizador", label: "Cotizador" },
  { id: "nosotros", label: "Nosotros" },
  { id: "faq", label: "FAQ" },
  { id: "contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV_LINKS.map(l => document.getElementById(l.id));
      let current = "inicio";
      sections.forEach(sec => {
        if (sec && window.scrollY >= sec.offsetTop - 120) current = sec.id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
      <div className="navbar__inner container">
        <button className="navbar__logo" onClick={() => scrollTo("inicio")}>
          <span className="logo-icon">✈</span>
          <span className="logo-text">Aero<strong>Paq</strong></span>
        </button>

        <ul className={`navbar__links${menuOpen ? " navbar__links--open" : ""}`}>
          {NAV_LINKS.map(link => (
            <li key={link.id}>
              <button
                className={`navbar__link${active === link.id ? " navbar__link--active" : ""}`}
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </button>
            </li>
          ))}
          <li>
            <button className="btn-primary navbar__cta" onClick={() => scrollTo("cotizador")}>
              Cotizar ahora
            </button>
          </li>
        </ul>

        <button
          className={`navbar__burger${menuOpen ? " navbar__burger--open" : ""}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menú"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
