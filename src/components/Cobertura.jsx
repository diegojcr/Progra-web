import { useState } from "react";
import "./Cobertura.css";

const COVERAGE = {
  nacional: {
    label: "Nacional",
    icon: "🏠",
    color: "accent1",
    zones: [
      { name: "Ciudad de Guatemala", type: "Capital", days: "24–48h" },
      { name: "Quetzaltenango", type: "Departamento", days: "48–72h" },
      { name: "Escuintla", type: "Departamento", days: "48–72h" },
      { name: "Cobán", type: "Departamento", days: "48–72h" },
      { name: "Huehuetenango", type: "Departamento", days: "48–96h" },
      { name: "Petén", type: "Departamento", days: "72–96h" },
      { name: "Izabal", type: "Departamento", days: "48–72h" },
      { name: "Todos los departamentos", type: "Cobertura completa", days: "Según zona" },
    ],
  },
  centroamerica: {
    label: "Centroamérica",
    icon: "🌎",
    color: "accent2",
    zones: [
      { name: "México", type: "Internacional", days: "3–5 días" },
      { name: "El Salvador", type: "Internacional", days: "2–3 días" },
      { name: "Honduras", type: "Internacional", days: "2–4 días" },
      { name: "Belice", type: "Internacional", days: "3–5 días" },
      { name: "Nicaragua", type: "Internacional", days: "3–5 días" },
      { name: "Costa Rica", type: "Internacional", days: "3–5 días" },
      { name: "Panamá", type: "Internacional", days: "4–6 días" },
    ],
  },
  internacional: {
    label: "Internacional",
    icon: "✈",
    color: "accent3",
    zones: [
      { name: "Estados Unidos", type: "América del Norte", days: "5–7 días" },
      { name: "Canadá", type: "América del Norte", days: "7–10 días" },
      { name: "España", type: "Europa", days: "10–14 días" },
      { name: "Colombia", type: "Suramérica", days: "5–8 días" },
      { name: "Perú", type: "Suramérica", days: "6–9 días" },
      { name: "Chile", type: "Suramérica", days: "7–10 días" },
      { name: "Brasil", type: "Suramérica", days: "8–12 días" },
      { name: "Otros destinos", type: "Consultar", days: "Variable" },
    ],
  },
};

export default function Coverage() {
  const [active, setActive] = useState("nacional");
  const zone = COVERAGE[active];

  return (
    <div className="coverage section-pad">
      <div className="container">
        <div className="coverage__header">
          <div className="section-label">Cobertura</div>
          <h2 className="section-title">Llegamos a donde estás</h2>
          <p className="section-subtitle">
            Operamos a nivel nacional, regional e internacional. Consulta las zonas 
            disponibles y tiempos estimados de entrega.
          </p>
        </div>

        <div className="coverage__tabs">
          {Object.entries(COVERAGE).map(([key, val]) => (
            <button
              key={key}
              className={`coverage__tab${active === key ? ` coverage__tab--${val.color}` : ""}`}
              onClick={() => setActive(key)}
            >
              <span>{val.icon}</span> {val.label}
            </button>
          ))}
        </div>

        <div className="coverage__body">
          <div className="coverage__info">
            <div className={`coverage__info-icon coverage__info-icon--${zone.color}`}>{zone.icon}</div>
            <h3>{zone.label}</h3>
            <p>Cobertura {zone.label.toLowerCase()} con seguimiento incluido y entregas garantizadas en los tiempos indicados.</p>
            <div className="coverage__pills">
              <span className="coverage__pill">📦 Rastreo incluido</span>
              <span className="coverage__pill">🔒 Seguro disponible</span>
              <span className="coverage__pill">📞 Soporte 24/7</span>
            </div>
          </div>

          <div className="coverage__list">
            <div className="coverage__list-header">
              <span>Destino</span>
              <span>Tipo</span>
              <span>Tiempo estimado</span>
            </div>
            {zone.zones.map((z, i) => (
              <div key={i} className="coverage__row">
                <span className="coverage__row-name">📍 {z.name}</span>
                <span className="coverage__row-type">{z.type}</span>
                <span className={`coverage__row-days coverage__row-days--${zone.color}`}>{z.days}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}