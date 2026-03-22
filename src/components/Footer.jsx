import "./Footer.css";

const LINKS = {
  Servicios: [
    "Envíos Nacionales",
    "Envíos Internacionales",
    "Recolección a Domicilio",
    "Servicio Exprés",
  ],
  Empresa: ["Sobre Nosotros", "Cómo Funciona", "Cobertura", "Preguntas Frecuentes"],
  Legal: ["Términos y Condiciones", "Política de Privacidad", "Política de Envíos"],
};

const SECTIONS = {
  Servicios: "servicios",
  Empresa: "nosotros",
  Legal: null,
};

export default function Footer() {
  const scrollTo = (id) => {
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer__top container">
        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-icon">✈</span>
            <span>Aero<strong>Paq</strong></span>
          </div>
          <p className="footer__tagline">
            Tu paquete, donde necesites.<br />
            Envíos nacionales e internacionales con seguimiento en tiempo real.
          </p>
          <div className="footer__social">
            {[
              { label: "FB", href: "#" },
              { label: "IG", href: "#" },
              { label: "WA", href: "https://wa.me/50255557777" },
              { label: "TT", href: "#" },
            ].map((s) => (
              <a key={s.label} href={s.href} className="footer__social-btn" target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        {Object.entries(LINKS).map(([group, items]) => (
          <div key={group} className="footer__col">
            <div className="footer__col-title">{group}</div>
            <ul>
              {items.map((item, i) => (
                <li key={i}>
                  <button onClick={() => scrollTo(SECTIONS[group])}>{item}</button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact mini */}
        <div className="footer__col">
          <div className="footer__col-title">Contacto</div>
          <div className="footer__contact-list">
            <a href="tel:+50222223333">📞 +502 2222-3333</a>
            <a href="https://wa.me/50255557777" target="_blank" rel="noreferrer">💬 +502 5555-7777</a>
            <a href="mailto:hola@aeropaq.gt">📧 hola@aeropaq.gt</a>
            <span>🏢 Zona 10, Guatemala City</span>
          </div>
        </div>
      </div>

      <div className="footer__bottom container">
        <span>© {new Date().getFullYear()} AeroPaq. Todos los derechos reservados.</span>
        <div className="footer__bottom-links">
          <button>Privacidad</button>
          <button>Términos</button>
          <button>Cookies</button>
        </div>
      </div>
    </footer>
  );
}
