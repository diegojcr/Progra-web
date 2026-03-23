import "./como-funciona.css";

const STEPS = [
  {
    num: "01",
    icon: "📋",
    title: "Solicitud",
    desc: "Completa el formulario en línea o contáctanos por WhatsApp. Indícanos origen, destino, peso y tipo de servicio.",
  },
  {
    num: "02",
    icon: "🚚",
    title: "Recolección",
    desc: "Nuestro equipo va a tu ubicación o te esperamos en nuestros puntos físicos. Rápido, puntual y sin complicaciones.",
  },
  {
    num: "03",
    icon: "🏭",
    title: "Despacho",
    desc: "El paquete es procesado, etiquetado y despachado desde nuestro centro de operaciones con máxima prioridad.",
  },
  {
    num: "04",
    icon: "✅",
    title: "Entrega",
    desc: "Tu destinatario recibe el paquete y tú obtienes confirmación. Todo rastreable en tiempo real desde tu teléfono.",
  },
];

export default function HowItWorks() {
  return (
    <div className="hiw section-pad">
      <div className="container">
        <div className="hiw__header">
          <div className="section-label">Proceso</div>
          <h2 className="section-title">¿Cómo funciona?</h2>
          <p className="section-subtitle">
            Enviar con AeroPaq es sencillo. Cuatro pasos y tu paquete está en camino.
          </p>
        </div>

        <div className="hiw__steps">
          {STEPS.map((s, i) => (
            <div key={i} className="hiw__step">
              <div className="hiw__step-num">{s.num}</div>
              <div className="hiw__step-card">
                <div className="hiw__step-icon">{s.icon}</div>
                <h3 className="hiw__step-title">{s.title}</h3>
                <p className="hiw__step-desc">{s.desc}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="hiw__connector">
                  <div className="hiw__connector-line" />
                  <div className="hiw__connector-arrow">→</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="hiw__cta-row">
          <div className="hiw__cta-text">
            <strong>¿Listo para enviar?</strong>
            <span> Obtén tu cotización en menos de 60 segundos.</span>
          </div>
          <button
            className="btn-primary"
            onClick={() => document.getElementById("cotizador")?.scrollIntoView({ behavior: "smooth" })}
          >
            ✈ Cotizar ahora
          </button>
        </div>
      </div>
    </div>
  );
}