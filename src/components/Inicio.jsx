import "./Inicio.css";

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="hero">
      <div className="hero__bg">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__grid" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            Servicio activo · Nacional e Internacional
          </div>

          <h1 className="hero__title">
            Tu paquete,<br />
            <span className="hero__title-accent">donde necesites.</span>
          </h1>

          <p className="hero__desc">
            AeroPaq es la solución de paquetería rápida, segura y confiable. 
            Enviamos desde tu puerta hasta cualquier destino — con seguimiento 
            en tiempo real y tarifas transparentes.
          </p>

          <div className="hero__actions">
            <button className="btn-primary hero__btn-main" onClick={() => scrollTo("cotizador")}>
              <span>✈</span> Cotizar envío
            </button>
            <button className="btn-ghost" onClick={() => scrollTo("servicios")}>
              Ver servicios →
            </button>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <strong>+15K</strong>
              <span>Envíos realizados</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <strong>48h</strong>
              <span>Tiempo promedio</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <strong>99.2%</strong>
              <span>Entregas exitosas</span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__card hero__card--main">
            <div className="hero__card-header">
              <span className="hero__card-dot hero__card-dot--green" />
              <span className="hero__card-dot hero__card-dot--yellow" />
              <span>Envío en curso</span>
            </div>
            <div className="hero__tracking">
              <div className="hero__track-line" />
              {[
                { label: "Solicitud recibida", done: true, icon: "📦" },
                { label: "Recolección en camino", done: true, icon: "🚚" },
                { label: "En despacho", done: true, icon: "🏭" },
                { label: "En entrega", done: false, icon: "✈", active: true },
                { label: "Entregado", done: false, icon: "✅" },
              ].map((step, i) => (
                <div key={i} className={`hero__track-step${step.done ? " hero__track-step--done" : ""}${step.active ? " hero__track-step--active" : ""}`}>
                  <div className="hero__track-icon">{step.icon}</div>
                  <span>{step.label}</span>
                  {step.done && <span className="hero__track-check">✓</span>}
                  {step.active && <span className="hero__track-badge">Activo</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="hero__card hero__card--small hero__card--float1">
            <span className="hero__float-icon">📍</span>
            <div>
              <strong>Destino</strong>
              <span>Ciudad de Guatemala → Miami</span>
            </div>
          </div>

          <div className="hero__card hero__card--small hero__card--float2">
            <span className="hero__float-icon">⚡</span>
            <div>
              <strong>Exprés</strong>
              <span>Entrega en 24h</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll-hint" onClick={() => scrollTo("servicios")}>
        <span>Desplázate</span>
        <div className="hero__scroll-arrow">↓</div>
      </div>
    </div>
  );
}
