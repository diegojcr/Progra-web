import { useState } from "react";
import "./Cotizador.css";

const INITIAL = {
  origen: "",
  destino: "",
  ruta: "",
  peso: "",
  largo: "",
  ancho: "",
  alto: "",
  nivel: "estandar",
  recoleccion: false,
  seguro: false,
};

const ERRORS_INITIAL = {};

const RUTA_OPTS = [
  { value: "misma_ciudad", label: "Misma ciudad" },
  { value: "otro_departamento", label: "Otro departamento" },
  { value: "internacional", label: "Internacional" },
];

const PRECIOS = {
  misma_ciudad:       { base: 30, porKg: 5,  rangoDias: "24–48h" },
  otro_departamento:  { base: 60, porKg: 8,  rangoDias: "48–72h" },
  internacional:      { base: 150, porKg: 18, rangoDias: "5–10 días" },
};

const EXPRESS_MULT   = 1.8;
const RECOL_PRICE    = 25;
const SEGURO_PCT     = 0.03;
const SEGURO_MIN     = 15;

function calcVolWeight(l, w, h) {
  const vol = parseFloat(l) * parseFloat(w) * parseFloat(h);
  return isNaN(vol) ? 0 : vol / 5000;
}

export default function Quoter() {
  const [form, setForm]     = useState(INITIAL);
  const [errors, setErrors] = useState(ERRORS_INITIAL);
  const [result, setResult] = useState(null);

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.origen.trim())  e.origen  = "Ingresa el origen del envío.";
    if (!form.destino.trim()) e.destino = "Ingresa el destino del envío.";
    if (!form.ruta)           e.ruta    = "Selecciona el tipo de ruta.";
    if (!form.peso || isNaN(form.peso) || parseFloat(form.peso) <= 0)
      e.peso = "Ingresa un peso válido (mayor a 0).";
    const hasDim = form.largo || form.ancho || form.alto;
    if (hasDim) {
      if (!form.largo || isNaN(form.largo) || parseFloat(form.largo) <= 0) e.largo = "Dimensión inválida.";
      if (!form.ancho || isNaN(form.ancho) || parseFloat(form.ancho) <= 0) e.ancho = "Dimensión inválida.";
      if (!form.alto  || isNaN(form.alto)  || parseFloat(form.alto)  <= 0) e.alto  = "Dimensión inválida.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const calcular = () => {
    if (!validate()) return;

    const precios  = PRECIOS[form.ruta];
    const pesoReal = parseFloat(form.peso);
    const hasDim   = form.largo && form.ancho && form.alto;
    const pesoVol  = hasDim ? calcVolWeight(form.largo, form.ancho, form.alto) : 0;
    const pesoFact = Math.max(pesoReal, pesoVol);

    const base       = precios.base;
    const costoPeso  = pesoFact * precios.porKg;
    let total        = base + costoPeso;

    if (form.nivel === "expres") total *= EXPRESS_MULT;
    const costoRecol = form.recoleccion ? RECOL_PRICE : 0;
    const costoSeg   = form.seguro ? Math.max(total * SEGURO_PCT, SEGURO_MIN) : 0;
    total += costoRecol + costoSeg;

    let tiempo = precios.rangoDias;
    if (form.nivel === "expres") {
      tiempo = form.ruta === "misma_ciudad" ? "Mismo día / 24h" : "48–72h";
    }

    setResult({
      base,
      costoPeso: parseFloat(costoPeso.toFixed(2)),
      costoExpres: form.nivel === "expres" ? parseFloat(((base + costoPeso) * (EXPRESS_MULT - 1)).toFixed(2)) : 0,
      costoRecol,
      costoSeg: parseFloat(costoSeg.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      tiempo,
      pesoFacturado: parseFloat(pesoFact.toFixed(2)),
      usaVolWeight: hasDim && pesoVol > pesoReal,
    });
  };

  const reset = () => { setForm(INITIAL); setResult(null); setErrors({}); };

  return (
    <div className="quoter section-pad">
      <div className="container">
        <div className="quoter__header">
          <div className="section-label">Cotizador</div>
          <h2 className="section-title">Calcula tu envío al instante</h2>
          <p className="section-subtitle">
            Obtén un estimado de costo y tiempo de entrega sin compromiso.
          </p>
        </div>

        <div className="quoter__layout">
          {/* FORM */}
          <div className="quoter__form">

            <div className="quoter__section-title">Detalles del envío</div>

            <div className="quoter__row quoter__row--2">
              <div className={`quoter__field${errors.origen ? " quoter__field--error" : ""}`}>
                <label>Ciudad de origen *</label>
                <input
                  type="text"
                  placeholder="Ej. Ciudad de Guatemala"
                  value={form.origen}
                  onChange={e => set("origen", e.target.value)}
                />
                {errors.origen && <span className="quoter__error">{errors.origen}</span>}
              </div>
              <div className={`quoter__field${errors.destino ? " quoter__field--error" : ""}`}>
                <label>Ciudad de destino *</label>
                <input
                  type="text"
                  placeholder="Ej. Miami, Florida"
                  value={form.destino}
                  onChange={e => set("destino", e.target.value)}
                />
                {errors.destino && <span className="quoter__error">{errors.destino}</span>}
              </div>
            </div>

            <div className={`quoter__field${errors.ruta ? " quoter__field--error" : ""}`}>
              <label>Tipo de ruta *</label>
              <div className="quoter__radio-group">
                {RUTA_OPTS.map(opt => (
                  <label key={opt.value} className={`quoter__radio${form.ruta === opt.value ? " quoter__radio--active" : ""}`}>
                    <input
                      type="radio"
                      name="ruta"
                      value={opt.value}
                      checked={form.ruta === opt.value}
                      onChange={() => set("ruta", opt.value)}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
              {errors.ruta && <span className="quoter__error">{errors.ruta}</span>}
            </div>

            <div className="quoter__row quoter__row--2">
              <div className={`quoter__field${errors.peso ? " quoter__field--error" : ""}`}>
                <label>Peso (kg) *</label>
                <input
                  type="number" min="0.1" step="0.1"
                  placeholder="Ej. 2.5"
                  value={form.peso}
                  onChange={e => set("peso", e.target.value)}
                />
                {errors.peso && <span className="quoter__error">{errors.peso}</span>}
              </div>
              <div className="quoter__field">
                <label>Nivel de servicio *</label>
                <select value={form.nivel} onChange={e => set("nivel", e.target.value)}>
                  <option value="estandar">Estándar</option>
                  <option value="expres">Exprés ⚡</option>
                </select>
              </div>
            </div>

            <div className="quoter__section-title quoter__section-title--sm">
              Dimensiones (opcional)
            </div>
            <div className="quoter__row quoter__row--3">
              {["largo", "ancho", "alto"].map(dim => (
                <div key={dim} className={`quoter__field${errors[dim] ? " quoter__field--error" : ""}`}>
                  <label>{dim.charAt(0).toUpperCase() + dim.slice(1)} (cm)</label>
                  <input
                    type="number" min="1" step="1"
                    placeholder="cm"
                    value={form[dim]}
                    onChange={e => set(dim, e.target.value)}
                  />
                  {errors[dim] && <span className="quoter__error">{errors[dim]}</span>}
                </div>
              ))}
            </div>

            <div className="quoter__section-title quoter__section-title--sm">Servicios adicionales</div>
            <div className="quoter__extras">
              <label className={`quoter__extra${form.recoleccion ? " quoter__extra--active" : ""}`}>
                <input type="checkbox" checked={form.recoleccion} onChange={e => set("recoleccion", e.target.checked)} />
                <span className="quoter__extra-icon">🚪</span>
                <div>
                  <strong>Recolección a domicilio</strong>
                  <span>+Q25.00 — Recogemos en tu ubicación</span>
                </div>
              </label>
              <label className={`quoter__extra${form.seguro ? " quoter__extra--active" : ""}`}>
                <input type="checkbox" checked={form.seguro} onChange={e => set("seguro", e.target.checked)} />
                <span className="quoter__extra-icon">🛡</span>
                <div>
                  <strong>Seguro contra pérdida y accidentes</strong>
                  <span>3% del valor del envío (mín. Q15.00)</span>
                </div>
              </label>
            </div>

            <div className="quoter__actions">
              <button className="btn-primary quoter__btn-calc" onClick={calcular}>
                ⚡ Calcular cotización
              </button>
              {result && (
                <button className="btn-ghost" onClick={reset}>Limpiar</button>
              )}
            </div>
          </div>

          {/* RESULT */}
          <div className={`quoter__result${result ? " quoter__result--show" : ""}`}>
            {!result ? (
              <div className="quoter__placeholder">
                <div className="quoter__placeholder-icon">📦</div>
                <p>Completa el formulario y haz clic en <strong>"Calcular cotización"</strong> para ver el desglose de tu envío.</p>
              </div>
            ) : (
              <div className="quoter__breakdown">
                <div className="quoter__result-header">
                  <span>📋 Cotización estimada</span>
                  <div className="quoter__result-badge">
                    {form.nivel === "expres" ? "⚡ Exprés" : "📦 Estándar"}
                  </div>
                </div>

                <div className="quoter__route-summary">
                  <span>📍 {form.origen}</span>
                  <span className="quoter__route-arrow">→</span>
                  <span>📍 {form.destino}</span>
                </div>

                {result.usaVolWeight && (
                  <div className="quoter__notice">
                    ⚠ Se aplica peso volumétrico ({result.pesoFacturado} kg) por ser mayor al peso real.
                  </div>
                )}

                <div className="quoter__lines">
                  <div className="quoter__line">
                    <span>Costo base ({RUTA_OPTS.find(r => r.value === form.ruta)?.label})</span>
                    <strong>Q {result.base.toFixed(2)}</strong>
                  </div>
                  <div className="quoter__line">
                    <span>Costo por peso ({result.pesoFacturado} kg)</span>
                    <strong>Q {result.costoPeso.toFixed(2)}</strong>
                  </div>
                  {result.costoExpres > 0 && (
                    <div className="quoter__line quoter__line--accent">
                      <span>⚡ Suplemento exprés</span>
                      <strong>Q {result.costoExpres.toFixed(2)}</strong>
                    </div>
                  )}
                  {result.costoRecol > 0 && (
                    <div className="quoter__line">
                      <span>🚪 Recolección a domicilio</span>
                      <strong>Q {result.costoRecol.toFixed(2)}</strong>
                    </div>
                  )}
                  {result.costoSeg > 0 && (
                    <div className="quoter__line">
                      <span>🛡 Seguro</span>
                      <strong>Q {result.costoSeg.toFixed(2)}</strong>
                    </div>
                  )}
                </div>

                <div className="quoter__total-row">
                  <div>
                    <span className="quoter__total-label">Total estimado</span>
                    <span className="quoter__total-note">Precios en Quetzales (GTQ). Incluye IVA estimado.</span>
                  </div>
                  <div className="quoter__total-amount">Q {result.total.toFixed(2)}</div>
                </div>

                <div className="quoter__tiempo">
                  <span>⏱ Tiempo de entrega estimado:</span>
                  <strong>{result.tiempo}</strong>
                </div>

                <p className="quoter__disclaimer">
                  * Esta cotización es referencial. El precio final puede variar según condiciones 
                  específicas del envío. Contáctanos para una cotización oficial.
                </p>

                <button
                  className="btn-primary quoter__contact-btn"
                  onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Solicitar este envío →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
