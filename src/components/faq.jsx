import { useState } from "react";
import "./Faq.css";

const FAQS = [
  {
    q: "¿Cuánto tiempo tarda un envío nacional?",
    a: "Los envíos nacionales dentro de la ciudad capital se entregan en 24–48 horas. A otros departamentos entre 48 y 96 horas dependiendo de la zona. Con servicio exprés, reducimos estos tiempos significativamente.",
  },
  {
    q: "¿Cómo puedo rastrear mi paquete?",
    a: "Al confirmar tu envío recibirás un número de guía por WhatsApp o correo electrónico. Con ese número puedes consultar el estado en tiempo real desde nuestra plataforma o directamente con nuestro equipo.",
  },
  {
    q: "¿Qué pasa si mi paquete se pierde o daña?",
    a: "Contamos con seguro opcional contra pérdida y accidentes. Si contratas el seguro y ocurre algún incidente, iniciaremos un proceso de reclamo para compensarte según el valor declarado del paquete.",
  },
  {
    q: "¿Cuáles son los métodos de pago aceptados?",
    a: "Aceptamos efectivo, transferencia bancaria, tarjeta de crédito/débito y pago por Visa Cuotas. Para clientes frecuentes también ofrecemos facturación mensual.",
  },
  {
    q: "¿Puedo cancelar o reprogramar un envío?",
    a: "Sí, puedes cancelar o reprogramar hasta 2 horas antes de la recolección sin costo adicional. Contáctanos por WhatsApp o teléfono para gestionar el cambio.",
  },
  {
    q: "¿Qué artículos no pueden enviarse?",
    a: "No podemos transportar materiales peligrosos, sustancias inflamables, artículos ilegales, dinero en efectivo ni artículos perecederos. Para envíos especiales (medicamentos, electrónicos de alto valor), contáctanos para asesoramiento.",
  },
  {
    q: "¿Hacen recolección en áreas fuera de la capital?",
    a: "Actualmente ofrecemos recolección a domicilio en la Ciudad de Guatemala y área metropolitana. Para otros departamentos, el cliente debe traer el paquete a uno de nuestros puntos físicos.",
  },
  {
    q: "¿Emiten facturas o recibos?",
    a: "Sí, emitimos factura electrónica con cada envío. Para personas jurídicas que requieran factura con datos fiscales específicos, indícanoslo al momento de solicitar el servicio.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <div className="faq section-pad">
      <div className="container">
        <div className="faq__layout">
          <div className="faq__sidebar">
            <div className="section-label">FAQ</div>
            <h2 className="section-title">Preguntas <br /> frecuentes</h2>
            <p className="section-subtitle">
              ¿No encontraste lo que buscas? Escríbenos directamente.
            </p>
            <button
              className="btn-primary faq__contact-btn"
              onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
            >
              💬 Contactar soporte
            </button>
          </div>

          <div className="faq__list" style={{ maxWidth: "600px", width: "100%", marginLeft: "auto" }}>
            {FAQS.map((item, i) => (
              <div
                key={i}
                className={`faq__item${open === i ? " faq__item--open" : ""}`}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <div className="faq__question">
                  <span>{item.q}</span>
                  <div className="faq__icon">{open === i ? "−" : "+"}</div>
                </div>
                {open === i && (
                  <div className="faq__answer">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
