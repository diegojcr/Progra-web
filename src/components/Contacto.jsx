import { useState } from "react";
import "./Contacto.css";

// ─── CONFIGURACIÓN GOOGLE SHEETS ────────────────────────────────────────────
// Para activar la integración:
// 1. Crea un nuevo Google Sheet.
// 2. Ve a Extensiones → Apps Script → pega el script de doPost que devuelva JSON.
// 3. Publica como Aplicación Web (acceso: Cualquier persona).
// 4. Copia la URL generada y reemplaza el valor de GOOGLE_SCRIPT_URL abajo.
// ─────────────────────────────────────────────────────────────────────────────
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw5imwTtyo0jiYgPIJIPi63G4pLBVHgjPD08BvHJkrtIlTT_VCuxoXYyYjfDaA1On3f/exec";

const INITIAL = { nombre: "", correo: "", telefono: "", mensaje: "" };
const INITIAL_ERRORS = {};

function validate(form) {
  const e = {};
  if (!form.nombre.trim() || form.nombre.trim().length < 2)
    e.nombre = "Ingresa tu nombre completo (mín. 2 caracteres).";
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(form.correo))
    e.correo = "Ingresa un correo electrónico válido.";
  const telClean = form.telefono.replace(/\s|-/g, "");
  if (!/^\+?[0-9]{7,15}$/.test(telClean))
    e.telefono = "Ingresa un número de teléfono válido (7–15 dígitos).";
  if (!form.mensaje.trim() || form.mensaje.trim().length < 10)
    e.mensaje = "El mensaje debe tener al menos 10 caracteres.";
  return e;
}

export default function Contact() {
  const [form, setForm]       = useState(INITIAL);
  const [errors, setErrors]   = useState(INITIAL_ERRORS);
  const [status, setStatus]   = useState("idle"); // idle | loading | success | error

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: "" }));
  };

  const handleSubmit = async () => {
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus("loading");
    try {
      const payload = { ...form, timestamp: new Date().toISOString() };
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus("success");
      setForm(INITIAL);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="contact section-pad">
      <div className="container">
        <div className="contact__layout">
          {/* Left info */}
          <div className="contact__info">
            <div className="section-label">Contacto</div>
            <h2 className="section-title">Hablemos de tu envío</h2>
            <p className="section-subtitle">
              ¿Tienes dudas, necesitas una cotización personalizada o quieres conocer 
              más sobre nuestros servicios? Escríbenos.
            </p>

            <div className="contact__channels">
              {[
                { icon: "📞", label: "Teléfono", value: "+502 2222-3333", href: "tel:+50222223333" },
                { icon: "💬", label: "WhatsApp", value: "+502 5555-7777", href: "https://wa.me/50255557777" },
                { icon: "📧", label: "Email", value: "hola@aeropaq.gt", href: "mailto:hola@aeropaq.gt" },
                { icon: "🏢", label: "Oficina", value: "Zona 10, Ciudad de Guatemala", href: null },
              ].map((c, i) => (
                <div key={i} className="contact__channel">
                  <div className="contact__channel-icon">{c.icon}</div>
                  <div>
                    <span className="contact__channel-label">{c.label}</span>
                    {c.href
                      ? <a href={c.href} target="_blank" rel="noreferrer">{c.value}</a>
                      : <span>{c.value}</span>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div className="contact__hours">
              <div className="contact__hours-title">📅 Horario de atención</div>
              <div className="contact__hours-grid">
                <span>Lunes – Viernes</span><strong>8:00 – 18:00</strong>
                <span>Sábados</span><strong>8:00 – 13:00</strong>
                <span>Domingos</span><strong>Cerrado</strong>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact__form-wrap">
            {status === "success" ? (
              <div className="contact__success">
                <div className="contact__success-icon">✅</div>
                <h3>¡Mensaje enviado!</h3>
                <p>Gracias por contactarnos. Nuestro equipo te responderá en menos de 24 horas.</p>
                <button className="btn-primary" onClick={() => setStatus("idle")}>Enviar otro mensaje</button>
              </div>
            ) : (
              <div className="contact__form">
                <div className="contact__form-title">Envíanos un mensaje</div>

                <div className="contact__row">
                  <div className={`contact__field${errors.nombre ? " contact__field--error" : ""}`}>
                    <label>Nombre completo *</label>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      value={form.nombre}
                      onChange={e => set("nombre", e.target.value)}
                    />
                    {errors.nombre && <span className="contact__error">{errors.nombre}</span>}
                  </div>
                  <div className={`contact__field${errors.correo ? " contact__field--error" : ""}`}>
                    <label>Correo electrónico *</label>
                    <input
                      type="email"
                      placeholder="tu@correo.com"
                      value={form.correo}
                      onChange={e => set("correo", e.target.value)}
                    />
                    {errors.correo && <span className="contact__error">{errors.correo}</span>}
                  </div>
                </div>

                <div className={`contact__field${errors.telefono ? " contact__field--error" : ""}`}>
                  <label>Teléfono *</label>
                  <input
                    type="tel"
                    placeholder="+502 5555-0000"
                    value={form.telefono}
                    onChange={e => set("telefono", e.target.value)}
                  />
                  {errors.telefono && <span className="contact__error">{errors.telefono}</span>}
                </div>

                <div className={`contact__field${errors.mensaje ? " contact__field--error" : ""}`}>
                  <label>Mensaje *</label>
                  <textarea
                    rows={5}
                    placeholder="Cuéntanos sobre tu envío, duda o consulta..."
                    value={form.mensaje}
                    onChange={e => set("mensaje", e.target.value)}
                  />
                  <div className="contact__char-count">{form.mensaje.length} caracteres</div>
                  {errors.mensaje && <span className="contact__error">{errors.mensaje}</span>}
                </div>

                {status === "error" && (
                  <div className="contact__error-banner">
                    ⚠ Hubo un problema al enviar. Por favor intenta nuevamente o contáctanos por WhatsApp.
                  </div>
                )}

                <button
                  className="btn-primary contact__submit"
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Enviando..." : "✉ Enviar mensaje"}
                </button>

                <p className="contact__privacy">
                  Al enviar este formulario, aceptas que guardemos tus datos para 
                  darte seguimiento a tu consulta. No compartimos tu información con terceros.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
