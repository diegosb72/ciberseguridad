# Ciberseguridad — IES Manuel de Falla · Móstoles

Web interactiva del **Plan de Seguridad Digital 2026/27** + **Guía de Control Parental**. Estática para GitHub Pages. Stack: Vite + React 19 + Tailwind CSS v4 + Motion · WCAG AA · offline PWA.

## Qué contiene (real)
- **Hero** con Win+L SVG animado y KPIs animados (9 riesgos, 6 meses, 017)
- **Plan:** 5 prioridades, hoja de ruta 6 meses, 9 riesgos, matriz 3×3 probabilidad×impacto, tabla 22 medidas + progreso en vivo
- **Tu equipo:** checklist por sistema (Windows/macOS/iOS/Android) con anillo de progreso + localStorage + certificado PDF
- **Familia:** Family Link / Tiempo de Uso / MS Family + acuerdo familiar (PDF + plantilla) + DNS 1.1.1.3/1.0.0.3
- **Riesgos:** 6 pestañas + phishing trainer con veredicto oculto + matriz resorte + huella digital 3 filtros
- **Simulacro “Hackéame si puedes”:** aventura 3 escenas con Cyber-Score
- **Contraseñas:** Diceware ES 4 palabras (crypto.getRandomValues) + tiempo crackeo + medidor clásico opcional
- **Protocolo:** 6 fases con tabs a11y + gravedad + ficha incidente rellenable (borrador local + PDF Anexo B)
- **Quiz:** 6 preguntas con orden aleatorio y radios a11y + modo proyector (flechas, fullscreen)
- **Recursos:** guías INCIBE/IS4K, vídeos, glosario
- **Extra:** selector perfil (alumnado/familias/profesorado) reordena secciones, paleta comandos ⌘K/“/”, PWA offline, progreso plan, contador animado real

## Desarrollo
```bash
npm install
npm run dev      # http://localhost:5173/ciberseguridad/
npm run build    # → dist/
```

## Deploy
`base: '/ciberseguridad/'` en `vite.config.js`. `Settings → Pages → Source: GitHub Actions` + workflow `.github/workflows/deploy.yml`. Manual: `npm run build && npx gh-pages -d dist`.

## PDFs
En `public/pdfs/`: Plan 19p original (binario) + CONTROL PARENTAL + 3 plantillas en blanco (Anexo B/C + acuerdo).

## Privacidad
Fuentes: Inter vía Google Fonts con CSP `fonts.googleapis.com/gstatic.com`. Sin tracking. Todo se genera en tu navegador (jsPDF/localStorage).

## Créditos
Coord. TIC Diego Navarro · Plan 2026/27 · CC BY-SA 4.0 educativo · Ayuda: **INCIBE 017** · **112** · **DPD 91 720 4068**.
