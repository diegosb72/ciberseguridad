{/* max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 */}
{/* py-16 md:py-24 bg-canvas dark:bg-[#000000] transition-colors duration-300 */}
  <div className="py-16 md:py-24 bg-canvas dark:bg-[#000000] transition-colors duration-300 hidden"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">hidden</div></div>
// Acompañar, no controlar.
import { useState } from 'react'
import { Reveal } from '../components/Reveal'
import { AnimatedGroup, AnimatedItem } from '../components/AnimatedGroup'
import TiltCard from '../components/TiltCard'
import { DeviceMobile, Clock, YoutubeLogo, Check, Warning, ShieldCheck, House } from '@phosphor-icons/react'

const reglasPredefinidas = [
  { id: 'tiempo', label: 'Tiempo de pantalla: máx. 2h/día lectivo', desc: 'Visible en Family Link / Tiempo en pantalla' },
  { id: 'dormir', label: 'Móvil fuera al estudiar y al dormir', desc: 'Carga fuera de la habitación' },
  { id: 'instalar', label: 'Pedir permiso antes de instalar apps/juegos', desc: 'Revisar permisos juntos' },
  { id: 'privacidad', label: 'No compartir ubicación ni fotos íntimas', desc: 'Privacidad estricta en redes' },
  { id: 'avisar', label: 'Avisar si algo incomoda o es raro', desc: 'Sin miedo a contar, sin castigo inmediato' },
  { id: 'revision', label: 'Revisión semanal juntos (domingo 20:00)', desc: 'Ver actividad y ajustar límites' },
  { id: 'control', label: 'Usar Family Link / Tiempo de Uso con código solo adultos', desc: 'Explicado, no escondido' },
  { id: 'noche', label: 'Modo avión 22:00–07:00', desc: 'Sueño protegido' },
  { id: 'youtube', label: 'YouTube modo restringido + DNS familiar', desc: 'Router: 1.1.1.3 / 185.228.168.168' },
  { id: 'dialogo', label: 'Hablar antes de castigar', desc: 'Mediación, no punitivo' },
]

export default function Familia() {
  const [accordo, setAccordo] = useState({ nombre: '', horas: '', apps: '' })
  const [selected, setSelected] = useState(['tiempo','dormir','avisar','revision'])
  const [normasExtra, setNormasExtra] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [generating, setGenerating] = useState(false)

  const toggle = (id) => {
    setSelected(s => s.includes(id) ? s.filter(x=> x!==id) : [...s, id])
  }

  const generatePDF = async () => {
    if (generating) return
    setGenerating(true)
    try {
      const { jsPDF } = await import('jspdf')
      // try wrapper per spec 6.4
      const doc = new jsPDF({ format: 'a4', unit: 'mm' })
      doc.setFillColor(0, 102, 204)
      doc.rect(0, 0, 210, 18, 'F')
      doc.setTextColor(255,255,255)
      doc.setFont('helvetica','bold'); doc.setFontSize(9)
      doc.text('ACUERDO FAMILIAR  |  MEDIACIÓN PARENTAL  |  INCIBE - IS4K.ES', 10, 8)
      doc.setFont('helvetica','normal'); doc.setFontSize(7)
      doc.text('Guía basada en INCIBE Mediación Parental  |  Línea 017  |  112  |  is4k.es', 10, 13)
      doc.setTextColor(29,29,31)
      doc.setFont('helvetica','bold'); doc.setFontSize(18)
      doc.text('Acuerdo familiar', 10, 30)
      doc.setFont('helvetica','normal'); doc.setFontSize(9); doc.setTextColor(112,112,112)
      doc.text('Pacta el uso de dispositivos entre familia y menor. Revisar cada mes.', 10, 36)
      doc.setDrawColor(214,214,214); doc.line(10, 39, 200, 39)
      doc.setFont('helvetica','normal'); doc.setFontSize(8); doc.setTextColor(71,71,71)
      doc.text('Este acuerdo se firma libremente, explicando el motivo (no es castigo, es entrenamiento).', 10, 44)

      const drawBox = (x, y, w, h, label, value) => {
        doc.setFont('helvetica','bold'); doc.setFontSize(7); doc.setTextColor(29,29,31)
        doc.text(label.toUpperCase(), x+2, y+4)
        doc.setDrawColor(214,214,214); doc.setFillColor(255,255,255)
        doc.roundedRect(x, y+6, w, h-6, 2, 2, 'FD')
        if (value && value.trim()) {
          doc.setFont('helvetica','normal'); doc.setFontSize(8); doc.setTextColor(29,29,31)
          const lines = doc.splitTextToSize(value.trim(), w-6)
          doc.text(lines, x+3, y+12)
        }
      }

      drawBox(10, 50, 91, 18, 'Familia de', accordo.nombre)
      drawBox(109, 50, 91, 18, 'Participantes', '')
      drawBox(10, 72, 190, 18, 'Horario pactado', accordo.horas)
      drawBox(10, 94, 190, 22, 'Apps, juegos y límites', accordo.apps)

      // Normas from selected checkboxes + extra
      const normasSeleccionadas = selected.map(id => reglasPredefinidas.find(r=> r.id===id)?.label).filter(Boolean)
      if (normasExtra.trim()) normasSeleccionadas.push(...normasExtra.split('\n').filter(l=> l.trim()))

      doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(29,29,31)
      doc.text('NORMAS PACTADAS (elegid 4-6, claras y medibles)', 10, 123)
      doc.setFillColor(255,255,255); doc.setDrawColor(214,214,214)
      doc.roundedRect(10, 126, 190, 74, 3,3,'FD')
      doc.setFont('helvetica','normal'); doc.setFontSize(8); doc.setTextColor(29,29,31)
      normasSeleccionadas.slice(0,8).forEach((ln,i)=>{
        const y = 132 + i*8
        if (y < 197) doc.text(`• ${ln}`, 14, y)
      })
      if (normasSeleccionadas.length===0) {
        doc.setDrawColor(230,230,230)
        for(let i=0;i<7;i++){ const y=132+i*9; doc.rect(14, y-3, 4,4,'D'); doc.line(20, y+1, 196, y+1) }
        doc.setFont('helvetica','normal'); doc.setFontSize(6); doc.setTextColor(160,160,160)
        doc.text('Escribe aquí cada norma a mano', 20, 193)
      }

      drawBox(10, 206, 91, 22, 'Si se cumple', '')
      drawBox(109, 206, 91, 22, 'Si no se cumple', '')
      doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(29,29,31)
      doc.text('FIRMAS', 10, 240)
      doc.setDrawColor(214,214,214); doc.line(10, 255, 90, 255); doc.line(110, 255, 190, 255)
      doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(112,112,112)
      doc.text('Hijo/a', 10, 260); doc.text('Madre / Padre / Tutor/a', 110, 260)
      doc.text('Fecha:  ____ / ____ / ________', 10, 268)
      doc.text('Revisión prevista:  ____ / ____ / ________', 110, 268)
      doc.setFillColor(232,240,255); doc.roundedRect(10, 272, 190, 10, 2,2,'F')
      doc.setFont('helvetica','normal'); doc.setFontSize(6.5); doc.setTextColor(0,102,204)
      doc.text('Tip INCIBE: acompañar sin espiar. Explica por qué instalas cada control y revisa el acuerdo cada mes.', 14, 278)
      doc.setFontSize(7); doc.setTextColor(112,112,112)
      doc.text('Mediación parental  |  INCIBE 017  |  112  |  is4k.es  |  Generado en tu navegador, no se envía a servidores', 10, 287)
      doc.save('acuerdo-familiar.pdf')
      setErrorMsg('')
    } catch (e) {
      console.error('[Acuerdo PDF]', e)
      setErrorMsg('No se pudo generar el PDF: ' + (e?.message || e))
    } finally { setGenerating(false) }
  }

  return (
    <section id="familia" className="bg-canvas dark:bg-[#000000]">
      <div className="apple-shell apple-section">
        <Reveal>
          <div className="text-center">
            <div className="apple-chapter-label" style={{ color: '#707070' }}>CAPÍTULO 4 — FAMILIA</div>
            <h2 className="apple-chapter-title mt-2">
              Acompañar,<br/><span className="font-light">no controlar.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[640px] text-[17px] leading-6 text-deep-gray dark:text-[#a1a1a6]">
              La seguridad digital se construye entre casa y el centro. No es controlar: es mediar. Herramientas con explicación previa, límites pactados y confianza mutua.
            </p>
          </div>
        </Reveal>

        <AnimatedGroup stagger={0.07} className="mt-10 grid md:grid-cols-3 gap-5">
          <AnimatedItem>
            <TiltCard className="rounded-[28px] bg-paper dark:bg-[#1c1c1e] p-6 flex flex-col h-full border border-hairline/30 dark:border-white/10">
              <DeviceMobile size={20} weight="duotone" className="text-link-blue" aria-hidden="true" />
              <h4 className="mt-3 text-[17px] font-semibold text-primary-ink dark:text-[#f5f5f7]">Google Family Link</h4>
              <p className="mt-2 text-[14px] leading-5 text-deep-gray dark:text-[#a1a1a6] flex-1">Para Android y Chromebook. Filtros web, tiempo por app, ubicación y bloqueo remoto. Gratis. Explícales siempre por qué lo instaláis.</p>
              <a href="https://www.incibe.es/menores/recursos/control-parental" target="_blank" rel="noreferrer" className="mt-4 text-[12px] font-medium text-link-blue">Guía INCIBE ›</a>
            </TiltCard>
          </AnimatedItem>
          <AnimatedItem>
            <TiltCard className="rounded-[28px] bg-starlight p-6 flex flex-col h-full border border-[#f0e4d3]">
              <Clock size={20} weight="duotone" className="text-ember" aria-hidden="true" />
              <h4 className="mt-3 text-[17px] font-semibold text-primary-ink dark:text-[#f5f5f7]">Tiempo de Uso · iPhone/iPad</h4>
              <p className="mt-2 text-[14px] leading-5 text-deep-gray dark:text-[#a1a1a6] flex-1">Límites por app con código de acceso. Cuidado con el truco «Pedir más tiempo»: si el menor sabe el código, puede aplazar el bloqueo.</p>
              <a href="#aviso-ios" className="mt-4 text-[12px] font-medium text-link-blue">Ver truco ›</a>
            </TiltCard>
          </AnimatedItem>
          <AnimatedItem>
            <TiltCard className="rounded-[28px] bg-paper dark:bg-[#1c1c1e] p-6 flex flex-col h-full border border-hairline/30 dark:border-white/10">
              <YoutubeLogo size={20} weight="duotone" className="text-[#ff0000]" aria-hidden="true" />
              <h4 className="mt-3 text-[17px] font-semibold text-primary-ink dark:text-[#f5f5f7]">YouTube + DNS</h4>
              <p className="mt-2 text-[14px] leading-5 text-deep-gray dark:text-[#a1a1a6] flex-1">Modo restringido + supervisión + DNS familiar (Cloudflare / CleanBrowsing) en el router.</p>
              <a href="https://www.incibe.es/menores/familias/control-parental/youtube" target="_blank" rel="noreferrer" className="mt-4 text-[12px] font-medium text-link-blue">Cómo activar ›</a>
            </TiltCard>
          </AnimatedItem>
        </AnimatedGroup>

        <Reveal>
          <div id="aviso-ios" className="mt-5 rounded-[16px] bg-paper dark:bg-[#1c1c1e] border border-hairline dark:border-white/10 p-4 flex gap-3">
            <span className="w-7 h-7 rounded-full bg-canvas dark:bg-[#000000] flex items-center justify-center text-primary-ink dark:text-[#f5f5f7] shrink-0"><Warning size={14} weight="bold" aria-hidden="true" /></span>
            <div>
              <div className="text-[12px] font-semibold text-primary-ink dark:text-[#f5f5f7]">Truco de la cuenta atrás</div>
              <p className="text-[12px] leading-5 text-deep-gray dark:text-[#a1a1a6] mt-1">En iOS, cuando va a bloquearse aparece “1 minuto más / Pedir más tiempo”. Si el menor conoce el código, puede aplazar o desactivar. Solución: código solo de adultos + revisión semanal + acuerdo firmado.</p>
            </div>
          </div>
        </Reveal>

        {/* Constructor de Acuerdo interactivo — Apple minimal form */}
        <div className="mt-8 grid lg:grid-cols-[1.15fr_0.85fr] gap-6">
          <Reveal>
            <div className="rounded-[28px] bg-paper dark:bg-[#1c1c1e] p-6 md:p-8 border border-hairline/30 dark:border-white/10">
              <div className="flex items-center gap-2">
                <House size={14} weight="bold" className="text-link-blue" aria-hidden="true" />
                <div className="text-[11px] font-semibold tracking-[0.06em] text-link-blue">CONSTRUCTOR · ACUERDO FAMILIAR</div>
              </div>
              <h3 className="mt-2 text-[26px] font-semibold leading-none tracking-[-0.01em] text-primary-ink dark:text-[#f5f5f7]">Crea vuestro pacto.</h3>
              <p className="mt-2 text-[14px] leading-5 text-deep-gray dark:text-[#a1a1a6]">Selecciona reglas (4-6 recomendadas), personaliza y genera el PDF en tu navegador.</p>

              <div className="mt-6 space-y-3">
                <L label="Familia de" v={accordo.nombre} onChange={e=>setAccordo({...accordo, nombre:e.target.value})} ph="Ej: Familia García" />
                <L label="Horario pactado" v={accordo.horas} onChange={e=>setAccordo({...accordo, horas:e.target.value})} ph="Ej: L-V 17:00-20:00, finde 10:00-21:00" />
                <L label="Apps y límites" v={accordo.apps} onChange={e=>setAccordo({...accordo, apps:e.target.value})} ph="Ej: TikTok 60 min/día · YouTube Kids" />
              </div>

              <div className="mt-6">
                <div className="text-[12px] font-semibold text-primary-ink dark:text-[#f5f5f7]">Elige 4–6 normas</div>
                <p className="text-[11px] text-mid-gray">Las seleccionadas aparecerán en el PDF. Puedes añadir extra abajo.</p>
                <div className="mt-3 grid gap-2 max-h-[360px] overflow-y-auto pr-1">
                  {reglasPredefinidas.map(r => {
                    const active = selected.includes(r.id)
                    return (
                      <label key={r.id} className={`flex gap-3 p-3 rounded-[14px] border cursor-pointer transition-colors ${active ? 'bg-[#f0f7ff] border-action-blue shadow-[0_1px_6px_rgba(0,102,204,0.08)]' : 'bg-canvas dark:bg-[#000000] border-transparent hover:border-hairline dark:border-white/10'}`}>
                        <input type="checkbox" checked={active} onChange={()=> toggle(r.id)} className="sr-only" aria-label={r.label} />
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${active ? 'bg-action-blue border-action-blue text-white' : 'bg-paper dark:bg-[#1c1c1e] border-hairline dark:border-white/10 text-transparent'}`}>
                          <Check size={10} weight="bold" aria-hidden="true" />
                        </span>
                        <span className="flex-1 min-w-0 text-left">
                          <span className="text-[13px] font-medium leading-tight text-primary-ink dark:text-[#f5f5f7]">{r.label}</span>
                          <span className="block text-[11px] text-mid-gray leading-tight">{r.desc}</span>
                        </span>
                      </label>
                    )
                  })}
                </div>
                <label className="block mt-4">
                  <span className="text-[12px] font-medium text-primary-ink dark:text-[#f5f5f7]">Normas extra (opcional, una por línea)</span>
                  <textarea value={normasExtra} onChange={e=> setNormasExtra(e.target.value)} rows={3} placeholder="Ej: móvil fuera al comer; avisar si alguien pide fotos" className="mt-1 w-full rounded-[16px] border border-hairline dark:border-white/10 bg-paper dark:bg-[#1c1c1e] px-4 py-3 text-[14px] text-primary-ink dark:text-[#f5f5f7] placeholder:text-mid-gray focus:outline-none focus:border-action-blue resize-none" />
                </label>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button onClick={generatePDF} disabled={generating} aria-busy={generating} className={`apple-pill text-center font-medium ${generating ? 'bg-[#a0a0a0] cursor-wait text-white' : 'bg-action-blue text-white hover:bg-electric-blue'}`}>{generating ? 'Generando…' : `Descargar acuerdo (${selected.length} normas) ↓`}</button>
                {errorMsg && <div role="alert" className="rounded-[12px] bg-[#fff0f0] border border-[#ffb3b1] text-[#a01a19] text-[12px] p-3">{errorMsg}</div>}
                <a href={import.meta.env.BASE_URL + 'pdfs/plantilla-acuerdo-familiar.pdf'} download="plantilla-acuerdo-familiar.pdf" className="apple-pill bg-paper dark:bg-[#1c1c1e] border border-hairline dark:border-white/10 text-primary-ink dark:text-[#f5f5f7] text-center">Plantilla en blanco (PDF) ↓</a>
                <p className="text-[11px] text-mid-gray text-center">Se genera en tu navegador. No se envía a ningún servidor. Revisión mensual recomendada.</p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={0.08}>
              <div className="rounded-[28px] overflow-hidden bg-paper dark:bg-[#1c1c1e] border border-hairline/30 dark:border-white/10">
                <img src={import.meta.env.BASE_URL + 'assets/family-apple.jpg'} loading="lazy" width="560" height="360" alt="Familia colaborando con tablet" className="w-full h-[220px] object-cover" />
                <div className="p-6">
                  <h4 className="text-[17px] font-semibold text-primary-ink dark:text-[#f5f5f7]">Cómo presentarlo sin que suene a castigo</h4>
                  <ul className="mt-3 space-y-2 text-[14px] leading-5 text-deep-gray dark:text-[#a1a1a6] list-disc pl-4">
                    <li>Explica el motivo: no es desconfianza, es entrenamiento.</li>
                    <li>Pacta juntos tiempo y apps. Si participan, cumplen más.</li>
                    <li>Revisad el acuerdo cada mes — evoluciona con la edad.</li>
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="rounded-[28px] bg-paper dark:bg-[#1c1c1e] p-6 border border-hairline/30 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} weight="duotone" className="text-link-blue" aria-hidden="true" />
                  <div className="text-[11px] font-semibold tracking-[0.06em] text-link-blue">DNS FAMILIAR EN 2 MIN</div>
                </div>
                <p className="mt-2 text-[14px] leading-5 text-deep-gray dark:text-[#a1a1a6]">En el router cambia DNS a <code className="px-1.5 py-0.5 rounded bg-canvas dark:bg-[#000000] border text-[12px]">1.1.1.3</code> / <code className="px-1.5 py-0.5 rounded bg-canvas dark:bg-[#000000] border text-[12px]">1.0.0.3</code> (Cloudflare Family) o <code className="px-1.5 py-0.5 rounded bg-canvas dark:bg-[#000000] border text-[12px]">185.228.168.168</code> (CleanBrowsing).</p>
                <a href="https://one.one.one.one/family/" target="_blank" rel="noreferrer" className="mt-3 inline-block text-[12px] font-medium text-link-blue">Guía Cloudflare ›</a>
                <details className="mt-4 rounded-[12px] bg-canvas dark:bg-[#000000] p-3">
                  <summary className="text-[12px] font-semibold text-primary-ink dark:text-[#f5f5f7] cursor-pointer">Comparar herramientas</summary>
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full text-[12px] min-w-[360px]">
                      <thead className="text-mid-gray"><tr><th className="text-left py-2 font-medium">Función</th><th className="text-center">Family Link</th><th className="text-center">Tiempo Uso</th><th className="text-center">MS Family</th></tr></thead>
                      <tbody className="divide-y divide-[#d6d6d6]/40 text-deep-gray dark:text-[#a1a1a6]">
                        <tr><td className="py-2 font-medium text-primary-ink dark:text-[#f5f5f7]">Filtro web</td><td className="text-center">✓</td><td className="text-center">✓</td><td className="text-center">✓</td></tr>
                        <tr><td className="py-2 font-medium text-primary-ink dark:text-[#f5f5f7]">Límite por app</td><td className="text-center">✓</td><td className="text-center">✓</td><td className="text-center">✓</td></tr>
                        <tr><td className="py-2 font-medium text-primary-ink dark:text-[#f5f5f7]">Ubicación</td><td className="text-center">✓</td><td className="text-center">—</td><td className="text-center">✓</td></tr>
                        <tr><td className="py-2 font-medium text-primary-ink dark:text-[#f5f5f7]">Bloqueo remoto</td><td className="text-center">✓</td><td className="text-center">✓</td><td className="text-center">✓</td></tr>
                      </tbody>
                    </table>
                  </div>
                </details>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function L({ label, v, onChange, ph }) {
  return <label className="block"><span className="text-[12px] font-medium text-primary-ink dark:text-[#f5f5f7]">{label}</span><input value={v} onChange={onChange} placeholder={ph} className="mt-1 w-full rounded-full border border-hairline dark:border-white/10 bg-paper dark:bg-[#1c1c1e] px-4 py-2.5 text-[14px] text-primary-ink dark:text-[#f5f5f7] placeholder:text-mid-gray focus:outline-none focus:border-action-blue" /></label>
}
