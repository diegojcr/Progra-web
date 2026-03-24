# AeroPaq — Sitio Web Estático

Landing page completa para la empresa de paquetería **AeroPaq**. Comunica la propuesta de valor, servicios, cobertura y canales de contacto, e incluye un cotizador de envíos con lógica de cálculo en el cliente.

---



## Tecnologías y versiones

| Tecnología | Versión | Rol |
|---|---|---|
| [React](https://react.dev) | 18.3.1 | Framework de UI (SPA) |
| [Vite](https://vitejs.dev) | 5.4.2 | Bundler y servidor de desarrollo |
| [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) | 4.3.1 | Soporte JSX + Fast Refresh |
| CSS puro | — | Estilos (sin frameworks) |
| Node.js | ≥ 18.0.0 | Entorno de ejecución |
| npm | ≥ 9.0.0 | Gestión de dependencias |

> No se utiliza ninguna librería de componentes externa (Material UI, Chakra, etc.). Todos los componentes son escritos desde cero con CSS propio.


---

## Cómo ejecutar el proyecto

### 1. Clonar o descomprimir el proyecto

```bash
# Si viene desde un repositorio Git:
git clone https://github.com/diegojcr/Progra-web
cd aeropaq

# Si viene desde el ZIP descargado:
unzip aeropaq.zip
cd aeropaq
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abre el navegador en `http://localhost:5173`. Los cambios en los archivos se reflejan en tiempo real gracias a Vite HMR (Hot Module Replacement).

### 4. Generar build de producción

```bash
npm run build
```

### 5. Previsualizar el build de producción localmente

```bash
npm run preview
```

Levanta un servidor estático apuntando a `dist/` en `http://localhost:4173`.

---


Cada componente tiene su archivo `.css` colocado junto al `.jsx`. Esto sigue el patrón de **co-locación**: los estilos viven junto al componente que los consume, facilitando el mantenimiento.

---

## Componentes y responsabilidades

| Componente | Descripción | Estado interno |
|---|---|---|
| `App` | Orquesta todas las secciones dentro de `<main>`. Asigna `id` a cada `<section>` para el scroll de la navbar. | No |
| `Navbar` | Barra de navegación fija. Detecta sección activa vía scroll y controla el menú hamburguesa en mobile. | `scrolled`, `menuOpen`, `active` |
| `Inicio` | Sección inicial con CTA, estadísticas y tarjeta de tracking animada. | No |
| `Services` | Grid de 4 servicios. Datos declarados como constante interna (`SERVICES`). | No |
| `como-funciona` | Proceso en 4 pasos con conectores visuales. | No |
| `Cobertura` | Tabla de cobertura con tabs (Nacional / Centroamérica / Internacional). | `active` (tab seleccionado) |
| `Cotizador` | Formulario de cotización con validaciones y cálculo de costo/tiempo. | `form`, `errors`, `result` |
| `Nosotros` | Historia, misión, visión, valores y métricas de la empresa. | No |
| `FAQ` | Acordeón de preguntas frecuentes. Solo una pregunta abierta a la vez. | `open` (índice abierto) |
| `Contact0` | Formulario de contacto con validaciones y envío a Google Sheets. | `form`, `errors`, `status` |
| `Footer` | Links, redes sociales, datos de contacto y copyright. | No |

---

## Decisiones técnicas relevantes

### Arquitectura: SPA de una sola página con scroll

El sitio es una **Single Page Application sin rutas**. No se utiliza React Router porque todo el contenido es accesible mediante scroll vertical desde una única URL. La "navegación" es simplemente un `scrollIntoView` hacia el `id` de cada sección.

```jsx
// Navegación entre secciones — sin cambio de ruta
const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
```

Esta decisión responde al objetivo del cliente: lanzar rápido un sitio estático. No hay back-end, sin autenticación, sin rutas dinámicas.

### CSS propio sin frameworks

Se eligió **CSS puro** (sin Tailwind, Bootstrap ni CSS Modules) por dos razones:

1. El sitio tiene un diseño muy particular con variables propias; un framework de utilidades hubiera requerido configuración extensa para obtener el mismo resultado.
2. Facilita la entrega al cliente: un desarrollador puede leer y modificar los estilos sin conocer ningún framework adicional.

Los tokens de diseño (colores, radios, sombras, tipografías) están centralizados en `src/styles/global.css` como variables CSS:

```css
:root {
  --c-accent1:  #ff4d1c;
  --c-accent2:  #ffb800;
  --c-bg:       #0a0a0f;
  --c-card:     #1c1c28;
  --font-head:  'Syne', sans-serif;
  --font-body:  'DM Sans', sans-serif;
  /* ... */
}
```

### Estado local con `useState` — sin gestión global

Ningún componente comparte estado con otro. Cada componente maneja exclusivamente su propio estado interno con `useState`. Esto es suficiente para un sitio estático donde no existe comunicación entre secciones.

No se implementó Context API ni Zustand/Redux porque no hay necesidad: el flujo de datos más complejo es el cotizador, que vive completamente dentro de `Cotizador.jsx`.

### Datos como constantes declarativas

Los datos que podrían eventualmente venir de una API (servicios, cobertura, FAQ, valores) están declarados como **constantes JavaScript** dentro de cada componente:

```js
// Ejemplo en Services.jsx
const SERVICES = [
  { icon: "🏠", title: "Envíos Nacionales", ... },
  { icon: "✈", title: "Envíos Internacionales", ... },
  // ...
];
```

Esta estructura permite migrar fácilmente a una API externa en el futuro: solo hay que cambiar la fuente del dato sin tocar el JSX de renderizado.

### Validaciones sin librerías externas

El cotizador y el formulario de contacto implementan sus propias validaciones con funciones JavaScript puras, sin React Hook Form ni Yup. Esto mantiene el bundle pequeño y evita dependencias para una funcionalidad acotada.

```js
// Validación en Contact.jsx
function validate(form) {
  const e = {};
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(form.correo)) e.correo = "Correo no válido.";
  // ...
  return e;
}
```

### Cotizador: lógica de negocio aislada en constantes

Las tarifas del cotizador están declaradas como una tabla de objetos `PRECIOS`, separada de la lógica de cálculo. Esto permite actualizar precios sin revisar el código de la función:

```js
const PRECIOS = {
  misma_ciudad:      { base: 30,  porKg: 5,  rangoDias: "24–48h" },
  otro_departamento: { base: 60,  porKg: 8,  rangoDias: "48–72h" },
  internacional:     { base: 150, porKg: 18, rangoDias: "5–10 días" },
};
```

### Formulario de contacto: modo `no-cors`

El formulario envía datos a Google Apps Script usando `fetch` con `mode: "no-cors"`. Esto implica que la respuesta siempre es opaca (no se puede leer el body), por lo que el sitio asume éxito si la promesa no lanza error. Es el comportamiento esperado y documentado para esta integración.

---

## Integración con Google Sheets

El formulario de contacto almacena los datos en una hoja de Google Sheets mediante un **Google Apps Script publicado como Web App**.

### Paso 1 — Preparar la hoja

1. Crear un nuevo Google Sheet en [sheets.google.com](https://sheets.google.com).
2. En la **Fila 1**, agregar estos encabezados exactos (en ese orden):

```
Timestamp | Nombre | Correo | Teléfono | Mensaje
```

### Paso 2 — Crear el Apps Script

1. En el Sheet: **Extensiones → Apps Script**.
2. Reemplazar todo el código con lo siguiente:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data  = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.nombre    || "",
      data.correo    || "",
      data.telefono  || "",
      data.mensaje   || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Paso 3 — Publicar como Web App

1. Clic en **Implementar → Nueva implementación**.
2. Tipo: **Aplicación web**.
3. Ejecutar como: **Yo (mi cuenta de Google)**.
4. Quién tiene acceso: **Cualquier persona**.
5. Clic en **Implementar** → autorizar permisos → copiar la **URL de la aplicación web**.

### Paso 4 — Conectar con el sitio

Abrir `src/components/Contacto.jsx` y reemplazar el placeholder:

```js
// Antes:
const GOOGLE_SCRIPT_URL = "TU_GOOGLE_APPS_SCRIPT_URL_AQUI";

// Después (ejemplo):
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycb.../exec";
```

---

## Lógica del cotizador

### Tarifas base

| Ruta | Base (Q) | Por kg (Q) | Tiempo estándar |
|---|---|---|---|
| Misma ciudad | 30 | 5 | 24–48h |
| Otro departamento | 60 | 8 | 48–72h |
| Internacional | 150 | 18 | 5–10 días |

### Modificadores

| Concepto | Cálculo |
|---|---|
| Nivel exprés | Subtotal (base + peso) × 1.8 |
| Recolección a domicilio | +Q25.00 fijo |
| Seguro | 3% del total acumulado (mínimo Q15.00) |

### Peso volumétrico

Si el usuario ingresa dimensiones, se calcula el **peso volumétrico** con la fórmula estándar de paquetería:

```
Peso volumétrico = (Largo × Ancho × Alto) / 5000
```

Se factura el **mayor** entre el peso real y el peso volumétrico.

### Fórmula completa

```
subtotal     = base + (max(pesoReal, pesoVol) × porKg)
subtotal     = subtotal × 1.8          → si nivel === "expres"
total        = subtotal + recolección + seguro
```

---

## Sistema de diseño

Todas las variables están en `src/styles/global.css`.

### Paleta de colores

| Variable | Valor | Uso |
|---|---|---|
| `--c-accent1` | `#ff4d1c` | Color primario (naranja-rojo) |
| `--c-accent2` | `#ffb800` | Acento secundario (ámbar) |
| `--c-accent3` | `#00e5ff` | Acento terciario (cian) |
| `--c-bg` | `#0a0a0f` | Fondo principal |
| `--c-surface` | `#13131a` | Superficies secundarias |
| `--c-card` | `#1c1c28` | Fondo de cards |
| `--c-border` | `#2a2a3d` | Bordes y separadores |
| `--c-text` | `#f0f0f5` | Texto principal |
| `--c-muted` | `#8888a8` | Texto secundario / subtítulos |

### Tipografía

| Variable | Fuente | Uso |
|---|---|---|
| `--font-head` | Syne (700, 800) | Títulos, CTAs, logo, labels de sección |
| `--font-body` | DM Sans (400, 500) | Cuerpo de texto, inputs, descripciones |

Ambas fuentes se cargan desde Google Fonts en `global.css`.

### Radios de borde

| Variable | Valor | Uso |
|---|---|---|
| `--radius-sm` | 6px | Inputs, badges pequeños |
| `--radius-md` | 12px | Cards medianas, botones |
| `--radius-lg` | 20px | Cards grandes, paneles |
| `--radius-xl` | 32px | Contenedores hero |

---

## Responsive y breakpoints

El sitio es **mobile-first** en su comportamiento: los layouts de escritorio se construyen sobre la base mobile.

| Breakpoint | Ancho máximo | Cambios principales |
|---|---|---|
| Mobile | `480px` | CTAs al 100% de ancho, títulos reducidos |
| Tablet portrait | `768px` | Grid de servicios 2×2, padding reducido |
| Tablet landscape | `900px` | Navbar cambia a hamburguesa, cotizador apilado, columnas a 1 col |
| Desktop small | `1100px` | Grid de servicios 2×2, footer 3 cols |
| Desktop full | `> 1100px` | Layout completo de 2 columnas en todas las secciones |

Los breakpoints están definidos directamente en el CSS de cada componente con `@media (max-width: Xpx)`.

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con HMR en `localhost:5173` |
| `npm run build` | Build de producción optimizado en `dist/` |
| `npm run preview` | Previsualización del build en `localhost:4173` |