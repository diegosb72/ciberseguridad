# Changelog — Rediseño MacBook Neo / Apple.com

Fecha: 2026-10-21 · Rama `arena/469fc97d-ciberseguridad` · Commit base `fd72ea2`

## Filosofía aplicada (5 principios extraídos de apple.com + HIG)
1. Vende experiencia > specs — Hero con claim “Tu familia, protegida. Sin ruido.” + fondo sutil, no lista técnica al abrir.
2. Scroll controla historia — `whileInView` + `stagger` spring (`type:"spring"`) en cada capítulo; Parallax + ScrollProgress en timeline.
3. Jerarquía despiadada — un foco por pantalla, titulares SF Pro Display 300/600, base 17px, Action Blue #0066cc único acento, mucho blanco.
4. Un capítulo = una idea — 5 capítulos Apple: Plan (Bento), Protocolo (diagrama flujo), Riesgos (tilt), Familia (constructor), Recursos (cards).
5. UI invisible — sin bordes >1px, sin sombras pesadas, sin fondos saturados; glass `blur(15px) rgba(255,255,255,.25) 1px rgba(255,255,255,.3)` solo sobre rich bg.

## Verificación REGLA CERO
- `npm view @vrugd/ui` → 0.1.8 OK (no instalado, tokens replicados a mano)
- `npm view @smart-coder-labs/apple-design-system` → 1.5.0 OK (no instalado, tokens manuales)
- `npm view apple-motion-lite` → 1.0.0 OK (fallback: Motion spring)
- `npm view usefluxui` → 1.0.0 OK (fallback: Motion)
- `npm view @phosphor-icons/react` → 2.1.10 OK ✅ instalado
- `npm view @phosphor-icons/web` → 2.1.2 OK
- `npm view lottie-react` → 3.1.2 OK (instalado, TODO: integrar LottieFiles en Quiz/Phishing — fallback animación CSS)
- `npm view gsap` → 3.15.0 OK (instalado, TODO: scatter MatrizRiesgos con ScrollTrigger — fallback Motion)
- `https://shadcn.io/design/apple` → SSL_ERROR_SYSCALL (no cargó) → fallback tokens manuales: Action Blue #0066cc, near-black #1d1d1f, canvas #f5f5f7, radii 12/18/28, blur 15px.

## Tokens centralizados
- `src/index.css` reescrito: `@theme` con 21 colores Apple, 16 tipografías SF Pro Display/Text vía `-apple-system, BlinkMacSystemFont, SF Pro Display`, pesos 300/400/600/700 (nunca 500), base 17px, radii Apple, glass utilities `.apple-glass`, `.apple-glass-card`, `.apple-nav-glass`, `.bento-grid`, `.apple-chapter-title`, `snap-x-mandatory`, `encrypt-text`, `tilt-card`.

## Tipografía
- Titulares: SF Pro Display ` -apple-system, BlinkMacSystemFont, "SF Pro Display", Inter` weight 600/300, tight `-0.03em`.
- Cuerpo/UI: SF Pro Text 17px base, line-height 1.47059. Fallback Inter.
- Verificado WCAG AA y `prefers-reduced-motion`.

## Iconografía
- Instalado `@phosphor-icons/react@2.1.10` (MIT). Reemplaza Lucide en nuevos componentes: Header (List, X, MagnifyingGlass, Moon, Sun), BentoGrid (ShieldCheck, Copy, LockKey, FolderLock, Broadcast), Protocolo (Eye, Shield, Trash, ArrowsClockwise, Megaphone, GraduationCap), Riesgos (Bug, EnvelopeSimple, UsersThree, EyeSlash, Newspaper, GameController), Familia (DeviceMobile, Clock, YoutubeLogo, Warning, ShieldCheck, House), Recursos (FilePdf, Video, Globe, GameController, DownloadSimple, Funnel), Dispositivos (WindowsLogo, AppleLogo, DeviceMobile, AndroidLogo).
- Lucide se mantiene instalado para compatibilidad, pero nuevos capítulos usan Phosphor Regular/Bold/Fill.

## Animaciones (Motion spring, no duration fija)
- `src/components/AnimatedGroup.jsx` — nuevo, beUI AnimatedGroup equivalente, spring `stiffness:300 damping:30`.
- `src/components/MagneticButton.jsx` — botón magnético con `useSpring(stiffness:300 damping:20)` strength 0.25.
- `src/components/EncryptButton.jsx` — texto que se desencripta al hover (CHARS scramble 28ms).
- `src/components/TiltCard.jsx` — tilt 3D + glare gradient, `maxTilt 8`, spring, preserve-3d.
- `src/components/HeroBackground.jsx` — canvas network nodes (48 nodos, conexiones <140px, alpha 0.09) + matrix rain fallback variant; respeta `prefers-reduced-motion` → null; vence a video loop Coverr (TODO: reemplazar por Coverr loop si se aporta URL local para evitar CORS).
- `src/components/Reveal.jsx` existente potenciado con spring en PlanCentro timeline items.

## Imágenes — coherencia
- Eliminado concepto tabla densa / tabs redundantes. Imágenes existentes `hero-classroom-apple.jpg` (aula luminosa) se mantiene por encajar Apple luminous; `family-apple.jpg` se mantiene; 6 `riesgos-*.jpg` se reutilizan dentro de glass cards con overlay y badge, mismo tratamiento visual.
- `abstract-apple.jpg` no referenciada → queda en `public/assets` sin precache (no bloquea, TODO borrar si se confirma no coherente).
- Mockups Dispositivos: bezels CSS inspirados en Apple Design Resources (`developer.apple.com/design/resources`) — ventana macOS 3 dots, iPhone notch pill.
- TODO: sustituir por ilustraciones Storyset/unDraw/Icons8 Ouch! coherentes todo plano o todo 3D cuando se aporten (comentado en Recursos).

## Reestructuración por capítulos
1. Hero — `src/sections/Hero.jsx` reescrito: HeroBackground + claim MacBook Neo + MagneticButton (Comprueba) + EncryptButton (Simulacro) + glass card piloto Win+L + KPIs Counter spring.
2. Plan — `src/sections/PlanCentro.jsx` reescrito: BentoGrid 5 prioridades (con icono Phosphor Bold, stat), timeline horizontal desktop + snap mobile con progress Motion, 9 riesgos tilt glass filter, 22 medidas acordeón por 5 grupos + select estado persistido localStorage + tabla accesible fallback.
3. Protocolo — `src/sections/Protocolo.jsx` reescrito: diagrama flujo 6 fases con icono + ArrowRight, segmented iOS style, color fase, snap mobile, motion AnimatePresence, contact cards Phosphor.
4. Riesgos — `src/sections/Riesgos.jsx` reescrito: elimina 6 tabs, grid 3 cols desktop / snap 88% mobile, TiltCard glass con imagen + badge stat, expand sheet sin tabs, huella 3 filtros AnimatedGroup.
5. Familia — `src/sections/Familia.jsx` reescrito: 3 cards Tilt Phosphor, constructor interactivo checkboxes 10 reglas predefinidas (toggle + select 4-6), textarea extra, preview, PDF genera con selected labels + horas/apps, DNS 2min + tabla comparativa collapsible.
6. Recursos — `src/sections/Recursos.jsx` reescrito: filtros pills All/PDF/Guía/Vídeo/Interactivo/Test con AnimatePresence, cards con thumbnail gradient + icono Phosphor duotone + type badge, vídeos tutoría, glosario tooltip hover, descargas centralizadas dark card (evita CTAs duplicados).
7. Dispositivos — `src/sections/Dispositivos.jsx` reescrito: 4 sistemas TiltCard + mockup bezel (macOS dots, iPhone notch) con checklist overlay.
8. Header — `src/components/Header.jsx` reescrito: ribbon 017/112/DPD omnipresente, floating glass nav `apple-nav-glass` al elevar scroll, Phosphor icons, CTA Action Blue.
9. Footer — `src/components/Footer.jsx` minimal sin fondo color, 1 línea crédito.

## Componentes nuevos reutilizables
- AnimatedGroup / AnimatedItem
- MagneticButton (+ MagneticButtonEl)
- EncryptButton
- TiltCard
- HeroBackground
- Chapter + BentoGrid
- Familia constructor, Recursos filtrados

## Dependencias instaladas
- `@phosphor-icons/react@2.1.10`
- `lottie-react@3.1.2` (reservado, TODO integrar)
- `gsap@3.15.0` (reservado, TODO scatter)

## Fallbacks / TODO
- Coverr video loop → canvas nodes (ligero, sin CORS, respeta reduced-motion)
- lottie-react → CSS check/cross por ahora; LottieFiles ciberseguridad pendiente de selección de animaciones (ej: Quiz success)
- GSAP ScrollTrigger scatter → Motion whileInView (si se necesita más control, migrar MatrizRiesgos a GSAP)
- Storyset/unDraw illustrations → placeholders gradient + Phosphor por ahora; unificar estilo cuando se elijan (todo plano o todo 3D)
- apple-motion-lite / usefluxui → no instalados, replicado con Motion spring para no romper build

## Archivos tocados
- src/index.css (tokens + glass + bento + chapter)
- src/components/Header.jsx, Footer.jsx, Reveal.jsx (intacto), AnimatedGroup.jsx (nuevo), MagneticButton.jsx (nuevo), EncryptButton.jsx (nuevo), TiltCard.jsx (nuevo), HeroBackground.jsx (nuevo), Chapter.jsx (nuevo), BentoGrid.jsx (nuevo), Reveal.jsx (existente)
- src/sections/Hero.jsx, PlanCentro.jsx, Protocolo.jsx, Riesgos.jsx, Familia.jsx, Recursos.jsx, Dispositivos.jsx
- src/App.jsx (orden capítulos, elimina duplicado Protocolo)
- package.json (+3 deps)
- vite.config.js intacto, index.html intacto (favicon ya)
- public/assets sin borrados (abstract-apple.jpg pendiente)

## Build
- `npm run build` 8.2s 6813 modules 57.5kB CSS gzip 10.3kB 668kB JS gzip 197kB PWA 50 entries 5152 KiB OK
- WCAG AA ≥95 preservado, prefers-reduced-motion en todos los nuevos componentes, focus-visible, tablist aria.

## Deploy
- `npx gh-pages -d dist` Publicado → https://diegosb72.github.io/ciberseguridad/

