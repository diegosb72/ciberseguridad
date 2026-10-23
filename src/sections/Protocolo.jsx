// Si algo va mal, sigue estos pasos.
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Reveal } from '../components/Reveal'
import { AnimatedGroup, AnimatedItem } from '../components/AnimatedGroup'
import { fases } from '../data/content'
import { Eye, Shield, Trash, ArrowsClockwise, Megaphone, GraduationCap, ArrowRight } from '@phosphor-icons/react'

const iconMap = { Eye, Shield, Trash, ArrowsClockwise, Megaphone, GraduationCap }

const phaseColor = {
  1: '#0066cc',
  2: '#b64400',
  3: '#b00020',
  4: '#0a84ff',
  5: '#5e17a8',
  6: '#1d1d1f',
}

export default function Protocolo() {
  const [step, setStep] = useState(1)
  const cur = fases.find(f=>f.n===step)

  return (
    <section id="protocolo" className="bg-canvas" aria-labelledby="protocolo-title">
      <div className="apple-shell apple-section">
        <Reveal>
          <div className="text-center">
            <div className="apple-chapter-label">CAPÍTULO 2 — PROTOCOLO</div>
            <h2 id="protocolo-title" className="apple-chapter-title mt-2">
              Si pasa algo,<br/><span className="font-light">así basta actuar.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[640px] text-[17px] leading-6 text-deep-gray">6 pasos claros del Plan. No improvises: sigue el orden y no borres nada. Cada paso tiene una sola misión.</p>
          </div>
        </Reveal>

        {/* Diagram flow — clickable segmented control style iOS */}
        <Reveal delay={0.1}>
          <div className="mt-10">
            <div className="hidden md:flex items-center justify-between gap-2 px-2 py-3 rounded-[24px] bg-paper border border-hairline/40 overflow-x-auto no-scrollbar" role="tablist" aria-label="Diagrama de flujo — 6 fases">
              {fases.map((f, idx) => {
                const active = step===f.n
                const Icon = iconMap[f.icon] || Eye
                return (
                  <div key={f.n} className="flex items-center gap-2 shrink-0">
                    <button
                      role="tab"
                      aria-selected={active}
                      aria-controls={`fase-${f.n}`}
                      id={`flow-tab-${f.n}`}
                      onClick={()=> setStep(f.n)}
                      className={`flex flex-col items-center gap-2 px-4 py-3 rounded-[16px] min-w-[96px] transition-all ${active ? 'bg-primary-ink text-white shadow-[0_4px_16px_rgba(0,0,0,0.12)]' : 'bg-canvas text-primary-ink hover:bg-paper border border-transparent hover:border-hairline'} focus-visible:outline-2 focus-visible:outline-action-blue`}
                      style={active ? { background: phaseColor[f.n] } : {}}
                    >
                      <span className={`w-9 h-9 rounded-full flex items-center justify-center ${active ? 'bg-paper/20' : 'bg-paper border border-hairline'}`}>
                        <Icon size={16} weight={active ? 'fill' : 'regular'} className={active ? 'text-white' : 'text-primary-ink'} aria-hidden="true" />
                      </span>
                      <span className="text-[11px] font-semibold tracking-wide">{f.t}</span>
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${active ? 'bg-paper text-primary-ink' : 'bg-primary-ink text-white'}`}>{f.n}</span>
                    </button>
                    {idx < fases.length - 1 && (
                      <ArrowRight size={14} weight="bold" className="text-hairline shrink-0" aria-hidden="true" />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Mobile: snap pills */}
            <div className="md:hidden flex gap-2 overflow-x-auto snap-x-mandatory pb-2 timeline-track" role="tablist" aria-label="Fases protocolo">
              {fases.map(f=>{
                const active = step===f.n
                return (
                  <button key={f.n} role="tab" aria-selected={active} onClick={()=> setStep(f.n)} className={`snap-center shrink-0 px-4 py-2.5 rounded-full text-[13px] font-medium whitespace-nowrap border ${active ? 'bg-action-blue text-white border-action-blue' : 'bg-paper text-primary-ink border-hairline'}`}>
                    <span className={`w-5 h-5 rounded-full inline-flex items-center justify-center text-[11px] font-bold mr-1.5 ${active ? 'bg-paper text-link-blue' : 'bg-canvas text-primary-ink'}`}>{f.n}</span>{f.t}
                  </button>
                )
              })}
            </div>
          </div>
        </Reveal>

        {/* Detail panel — segmented content */}
        <Reveal delay={0.12}>
          <div className="mt-6 rounded-[28px] bg-paper overflow-hidden border border-hairline/30">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }}
                className="grid lg:grid-cols-[1.2fr_0.8fr] gap-0"
              >
                <div className="p-6 md:p-8" role="tabpanel" id={`fase-${cur.n}`} aria-labelledby={`flow-tab-${cur.n} tab-${cur.n}`}>
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold" style={{ background: phaseColor[cur.n] }} aria-hidden="true">{cur.n}</span>
                    <h3 className="text-[24px] font-semibold tracking-[-0.01em] text-primary-ink">{cur.t}</h3>
                    <span className="ml-auto px-2.5 py-1 rounded-full bg-canvas text-[11px] font-medium text-mid-gray border border-hairline/50">{cur.n}/6</span>
                  </div>
                  <p className="mt-3 text-[15px] leading-6 text-deep-gray">{cur.d}</p>

                  <div className="mt-6 rounded-[16px] bg-canvas p-4 border border-hairline/30">
                    <div className="text-[11px] font-semibold tracking-[0.06em] text-primary-ink">QUÉ HACER AHORA</div>
                    <ul className="mt-2 space-y-1.5 text-[14px] text-primary-ink list-disc pl-4">
                      {step===1 && <><li>Anota fecha/hora, quién informa, equipo/cuenta</li><li>Fotos/capturas, no apagues si hay cifrado</li><li>Avisa TIC y Dirección sin difundir</li></>}
                      {step===2 && <><li>Desconecta red, bloquea cuenta</li><li>No borres logs ni formatees</li><li>Aísla copias</li></>}
                      {step===3 && <><li>Antivirus/EDR, cambia claves</li><li>Revisa reenvíos en correo</li><li>Bloquea remitente</li></>}
                      {step===4 && <><li>Restaura última copia verificada</li><li>Comprueba archivos</li><li>Reconecta por fases</li></>}
                      {step===5 && <><li>Si hay datos: AEPD 72h vía DPD 91 720 4068</li><li>Avisa familias con lenguaje claro</li><li>Contacta 017</li></>}
                      {step===6 && <><li>Rellena ficha incidente</li><li>Actualiza inventario</li><li>Programa simulacro</li></>}
                    </ul>
                  </div>

                  <div className="mt-5 flex gap-2">
                    <button onClick={()=> setStep(s=> Math.max(1,s-1))} disabled={step===1} className="apple-pill text-[13px] border border-hairline bg-paper text-primary-ink disabled:opacity-40 disabled:cursor-not-allowed">Anterior</button>
                    <button onClick={()=> setStep(s=> Math.min(6,s+1))} disabled={step===6} className="apple-pill text-[13px] bg-action-blue text-white disabled:opacity-40 disabled:cursor-not-allowed">Siguiente</button>
                  </div>

                  <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Paginación protocolo">
                    {fases.map(f=>(
                      <button key={f.n} role="tab" aria-selected={step===f.n} aria-label={`Ir a fase ${f.n} ${f.t}`} onClick={()=> setStep(f.n)} className={`w-2 h-2 rounded-full transition-all ${step===f.n ? 'bg-primary-ink w-6' : 'bg-cool-wash border border-hairline'}`} />
                    ))}
                  </div>
                </div>

                <div className="bg-canvas p-6 md:p-8 border-t lg:border-t-0 lg:border-l border-hairline/40">
                  <div className="text-[11px] font-semibold tracking-[0.06em] text-primary-ink">GRAVEDAD</div>
                  <div className="mt-3 space-y-2">
                    <G lvl="Baja" ex="Equipo aislado, sin datos personales." />
                    <G lvl="Media" ex="Varias cuentas o aula, posible dato sensible." />
                    <G lvl="Alta" ex="Ransomware, brecha o suplantación general." strong />
                    <G lvl="Crítica" ex="Datos masivos, chantaje, riesgo persona." strong />
                  </div>
                  <div className="mt-6 rounded-[16px] bg-paper p-4 border border-hairline">
                    <div className="text-[12px] font-semibold text-primary-ink">Ficha de incidente (Anexo B)</div>
                    <p className="text-[12px] leading-5 text-deep-gray mt-1">Para imprimir y rellenar a mano. Huecos blancos, con checklist y gravedad.</p>
                    <a href={import.meta.env.BASE_URL + 'pdfs/plantilla-ficha-incidente.pdf'} download="plantilla-ficha-incidente.pdf" className="mt-3 inline-flex apple-pill text-[12px] bg-primary-ink text-white">Descargar plantilla ↓</a>
                    <a href={import.meta.env.BASE_URL + 'pdfs/plantilla-inventario.pdf'} download="plantilla-inventario.pdf" className="mt-2 ml-2 inline-flex apple-pill text-[12px] bg-paper border border-hairline text-primary-ink">Inventario ↓</a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Contact cards — with phosphor icons */}
        <AnimatedGroup stagger={0.08} className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <AnimatedItem><ContactCard title="INCIBE 017" desc="Gratis, confidencial, 8-23h todos los días." phone="017 · 900 116 117" icon={Shield} /></AnimatedItem>
          <AnimatedItem><ContactCard title="112 Emergencias" desc="Si hay peligro o amenaza para persona." phone="112" icon={Megaphone} /></AnimatedItem>
          <AnimatedItem><ContactCard title="AEPD Brechas 72h" desc="Brechas de datos en 72h vía DPD." phone="91 720 4068" icon={Eye} /></AnimatedItem>
        </AnimatedGroup>
      </div>
    </section>
  )
}

function G({lvl, ex}) {
  return <div className="rounded-[12px] bg-paper px-3 py-2.5 flex gap-3 items-start border border-hairline"><span className="px-2 py-1 rounded-full bg-primary-ink text-white text-[11px] font-semibold">{lvl}</span><span className="text-[12px] leading-5 text-deep-gray">{ex}</span></div>
}
function ContactCard({title,desc,phone, icon: Icon}) {
  return (
    <div className="rounded-[28px] bg-paper p-6 text-center border border-hairline/30 hover:scale-[1.01] transition-transform">
      {Icon && <Icon size={20} weight="duotone" className="mx-auto text-link-blue" aria-hidden="true" />}
      <div className="mt-3 text-[16px] font-semibold text-primary-ink">{title}</div>
      <p className="text-[12px] leading-5 text-mid-gray mt-1">{desc}</p>
      <div className="mt-4 inline-flex px-4 py-1.5 rounded-full bg-primary-ink text-white text-[12px] font-medium">{phone}</div>
    </div>
  )
}
