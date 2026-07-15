# F&I WASH Auto Services — Web Informativa

Sitio web informativo **multipage premium** para F&I WASH Auto Services (Santiago, RD),
que unifica las dos marcas del negocio: **F&I WASH** (mecánica y gomas) y
**Velocity Wash** (detailing y lavado).

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (sistema de diseño propio)
- **Framer Motion** — transiciones de página, scroll reveal, microinteracciones
- **lucide-react** — iconografía

## Cómo levantar el proyecto en local

```bash
# 1. Instalar dependencias
npm install

# 2. (Opcional) variables de entorno
cp .env.example .env.local   # edita NEXT_PUBLIC_SITE_URL si aplica

# 3. Modo desarrollo
npm run dev                  # http://localhost:3000

# Build de producción
npm run build
npm run start
```

## Estructura (App Router)

| Ruta          | Estado (Tanda 1)     | Descripción                                   |
| ------------- | -------------------- | --------------------------------------------- |
| `/`           | ✅ Completa          | Inicio: hero, divisiones, promos, por qué     |
| `/servicios`  | 🚧 Stub navegable    | Mecánica y gomas (F&I WASH)                    |
| `/detailing`  | 🚧 Stub navegable    | Detailing y lavado (Velocity Wash)            |
| `/nosotros`   | 🚧 Stub navegable    | Historia, valor, alianzas                     |
| `/contacto`   | 🚧 Stub navegable    | Dirección, teléfonos, mapa                    |

- Layout global (`src/app/layout.tsx`) con **Navbar sticky** (estado activo por ruta +
  glass al hacer scroll + menú móvil) y **Footer** reutilizables.
- Transición de página vía `src/app/template.tsx` (Framer Motion).

## Organización del código

```
src/
├─ app/                 # Rutas, layout, template, sitemap, robots, 404
├─ components/
│  ├─ Navbar.tsx
│  ├─ Footer.tsx
│  ├─ sections/         # Hero, Divisions, PromoBanner, WhyUs, PageStub
│  └─ ui/               # CTAButton, WhatsAppButton, ServiceCard, NumberTicker,
│                       #   Marquee, BorderBeam, ScrollReveal, Logo
└─ lib/
   ├─ site.ts           # Datos del negocio (fuente única de verdad)
   └─ services.ts       # Catálogo de servicios de ambas divisiones
```

## Seguridad

- Cabeceras endurecidas en `next.config.mjs`: **CSP**, **HSTS**, `X-Frame-Options: DENY`,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`.
- `.env*` ignorado en `.gitignore`; sin secretos en el repositorio.

## SEO

- Metadata única por página, Open Graph, favicon SVG, `sitemap.xml` y `robots.txt` dinámicos.

---

Desarrollado por **JM Designs Worldwide**.
