import "./Nosotros.css";

const VALUES = [
  { icon: "⚡", name: "Velocidad", desc: "Cada minuto importa. Optimizamos cada paso del proceso." },
  { icon: "🔒", name: "Seguridad", desc: "Tu paquete está protegido desde que lo recibimos hasta la entrega." },
  { icon: "💬", name: "Transparencia", desc: "Precios claros, sin sorpresas. Siempre sabes dónde está tu envío." },
  { icon: "🤝", name: "Compromiso", desc: "Nos responsabilizamos por cada paquete como si fuera nuestro." },
];

export default function About() {
  return (
    <div className="about section-pad">
      <div className="container">
        <div className="about__grid">
          <div className="about__content">
            <div className="section-label">Nosotros</div>
            <h2 className="section-title">Más que paquetería,<br />somos confianza</h2>
            <p className="about__historia">
              AeroPaq nació en 2018 de una necesidad real: el mercado local carecía de 
              una opción de envíos ágil, accesible y confiable para pequeños negocios y 
              familias. Empezamos con una camioneta y mucha determinación.
            </p>
            <p className="about__historia">
              Hoy somos un equipo de más de 50 personas comprometidas con llevar 
              cada paquete a su destino, a tiempo y en perfecto estado.
            </p>

            <div className="about__mv">
              <div className="about__mv-item">
                <div className="about__mv-label">🎯 Misión</div>
                <p>Conectar personas y negocios a través de soluciones de envío rápidas, seguras y accesibles, superando las expectativas en cada entrega.</p>
              </div>
              <div className="about__mv-item">
                <div className="about__mv-label">🔭 Visión</div>
                <p>Ser la empresa de paquetería de referencia en Centroamérica, reconocida por nuestra tecnología, servicio excepcional y alcance internacional.</p>
              </div>
            </div>
          </div>

          <div className="about__right">
            <div className="about__values-title">Nuestros valores</div>
            <div className="about__values">
              {VALUES.map((v, i) => (
                <div key={i} className="about__value">
                  <div className="about__value-icon">{v.icon}</div>
                  <div>
                    <strong>{v.name}</strong>
                    <p>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="about__numbers">
              <div className="about__num">
                <strong>2018</strong><span>Año de fundación</span>
              </div>
              <div className="about__num">
                <strong>50+</strong><span>Colaboradores</span>
              </div>
              <div className="about__num">
                <strong>22</strong><span>Departamentos cubiertos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
