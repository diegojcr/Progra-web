import "./Services.css";

const SERVICES = [
  {
    icon: "🏠",
    title: "Envíos Nacionales",
    desc: "Cobertura completa en todo el territorio nacional. Entrega segura y rápida a cualquier ciudad o municipio.",
    features: ["Seguimiento en tiempo real", "Confirmación de entrega", "Cobertura capital y departamentos"],
    accent: "accent1",
  },
  {
    icon: "✈",
    title: "Envíos Internacionales",
    desc: "Llegamos a destinos en América, Europa y el mundo. Documentación y aduanas gestionadas por nosotros.",
    features: ["Gestión de aduana", "Seguro incluido opcional", "EE.UU., México, España y más"],
    accent: "accent2",
    featured: true,
  },
  {
    icon: "🚪",
    title: "Recolección a Domicilio",
    desc: "Nosotros vamos a ti. Programa una recolección y nuestro equipo recoge tu paquete en la dirección que elijas.",
    features: ["Horarios flexibles", "Sin salir de casa", "Confirmación inmediata"],
    accent: "accent3",
  },
  {
    icon: "⚡",
    title: "Servicio Exprés",
    desc: "Cuando el tiempo no puede esperar. Entregas ultra-rápidas en el mismo día o en menos de 24 horas.",
    features: ["Entrega mismo día", "Prioridad máxima", "Disponible en ciudad principal"],
    accent: "accent1",
  },
];

export default function Services() {
  return (
    <div className="services section-pad">
      <div className="container">
        <div className="services__header">
          <div className="section-label">Servicios</div>
          <h2 className="section-title">
            Todo lo que necesitas<br />para enviar sin límites
          </h2>
          <p className="section-subtitle">
            Ofrecemos soluciones de paquetería adaptadas a cada necesidad, 
            con precios competitivos y tiempos de entrega garantizados.
          </p>
        </div>

        <div className="services__grid">
          {SERVICES.map((s, i) => (
            <div key={i} className={`service-card${s.featured ? " service-card--featured" : ""}`}>
              {s.featured && <div className="service-card__badge">Más popular</div>}
              <div className={`service-card__icon service-card__icon--${s.accent}`}>
                {s.icon}
              </div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.desc}</p>
              <ul className="service-card__features">
                {s.features.map((f, j) => (
                  <li key={j}>
                    <span className={`service-card__check service-card__check--${s.accent}`}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


 