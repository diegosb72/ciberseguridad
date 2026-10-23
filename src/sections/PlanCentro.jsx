{/* max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 */}
{/* py-16 md:py-24 bg-canvas dark:bg-[#000000] transition-colors duration-300 */}
  <div className="py-16 md:py-24 bg-canvas dark:bg-[#000000] transition-colors duration-300 hidden"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">hidden</div></div>
// El Plan del centro, explicado fácil.
import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Reveal, Counter } from '../components/Reveal'
import { AnimatedGroup, AnimatedItem } from '../components/AnimatedGroup'
import { BentoGrid } from '../components/BentoGrid'
import TiltCard from '../components/TiltCard'

const prioridades = [
  { n: '01', title: 'Cuentas blindadas', desc: 'MFA en dirección y administración. Bajas revisadas. Cuentas nominales, no compartidas.', colorClass: 'pri-color-sky', icon: 'ShieldCheck', stat: { value: '100%', label: 'MFA dirección' } },
  { n: '02', title: 'Copias verificadas', desc: 'Una copia verificada y una prueba de restauración cada trimestre. No hay copia sin prueba.', colorClass: 'pri-color-citrus', icon: 'Copy', stat: { value: '1/trim', label: 'prueba restauración' } },
  { n: '03', title: 'Sesiones siempre bloqueadas', desc: 'Bloqueo automático en aulas y despachos. Empieza con piloto, escala a todo el centro.', colorClass: 'pri-color-starlight', icon: 'LockKey' },
  { n: '04', title: 'Datos con acceso controlado', desc: 'Carpetas por función, proveedores revisados y política clara de IA generativa.', colorClass: 'pri-color-blush', icon: 'FolderLock' },
  { n: '05', title: 'Respuesta inmediata', desc: 'Procedimiento, contactos y ficha impresa y a mano. Lo ensayado se hace bien.', colorClass: 'pri-color-silver', icon: 'Broadcast' },
]

import { riesgos, medidas22 } from '../data/content'

const gruposMedidas = [
  { title: 'Identidad y acceso', medidas: [2,3,17,22] },
  { title: 'Resiliencia y copias', medidas: [4,1,5,12] },
  { title: 'Datos y proveedores', medidas: [7,8,9,19,20] },
  { title: 'Red y correo', medidas: [10,13,14,15,16] },
  { title: 'Concienciación', medidas: [6,11,18,21] },
]

export default function PlanCentro() {
  const [exp, setExp] = useState(null)
  const [filter, setFilter] = useState('all')
  const [grupoOpen, setGrupoOpen] = useState(null)
  const [estadoFiltro, setEstadoFiltro] = useState('all')
  const [estados, setEstados] = useState(() => {
    try { return JSON.parse(localStorage.getItem('medidas-estados') || '{}') } catch { return {} }
  })
  const updateEstado = (n, val) => {
    const next = { ...estados, [n]: val }
    setEstados(next)
    localStorage.setItem('medidas-estados', JSON.stringify(next))
  }

  const timelineRef = useRef(null)
  const { scrollYProgress: timelineProgress } = useScroll({ target: timelineRef, offset: ['start end', 'end center'] })
  const timelineWidth = useTransform(timelineProgress, [0, 1], ['0%', '100%'])

  const medidasFiltradas = medidas22.filter(m => {
    if (estadoFiltro === 'all') return true
    const e = estados[m.n] || 'pendiente'
    return e === estadoFiltro
  })

  return (
    <section id="plan" className="bg-canvas dark:bg-[#000000]" aria-labelledby="plan-title">
      <div className="apple-shell apple-section">
        {/* Chapter header — one idea per screen */}
        <Reveal>
          <div className="text-center">
            <div className="apple-chapter-label">CAPÍTULO 1 — EL PLAN</div>
            <h2 id="plan-title" className="apple-chapter-title mt-2 mx-auto max-w-[760px]">
              El Plan del centro,<br/><span className="font-light">explicado fácil.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[640px] text-[17px] leading-6 text-deep-gray dark:text-[#a1a1a6]">
              Protege los datos de alumnado, familias y personal: notas, exámenes, actas, correo y equipos. Basado en RGPD, LOPDGDD, ENS RD 311/2022 y guías oficiales de INCIBE y CISA. Este es el resumen práctico.
            </p>
          </div>
        </Reveal>

        {/* Bento Grid — 5 prioridades */}
        <BentoGrid items={prioridades} />

        {/* Timeline horizontal con scroll progress — Apple stepping */}
        <Reveal>
          <div ref={timelineRef} className="mt-10 rounded-[28px] bg-paper dark:bg-[#1c1c1e] overflow-hidden border border-hairline/30 dark:border-white/10">
            <div className="px-6 md:px-8 py-6 flex flex-wrap justify-between items-center gap-3">
              <h3 className="text-[22px] md:text-[24px] font-semibold tracking-[-0.01em] text-primary-ink dark:text-[#f5f5f7]">Hoja de ruta — 6 meses</h3>
              <span className="px-4 py-1.5 rounded-full bg-primary-ink text-white text-[12px] font-semibold tracking-wide">MES 1 → MES 6</span>
            </div>
            <div className="h-[2px] bg-canvas dark:bg-[#000000] relative" aria-hidden="true">
              <motion.div style={{ width: timelineWidth }} className="absolute inset-y-0 left-0 bg-action-blue" />
            </div>
            {/* Horizontal on desktop, stacked on mobile */}
            <div className="hidden lg:grid grid-cols-3 divide-x divide-[#d6d6d6]/60">
              <TimelineCol k="Mes 1" t="Base y mayor riesgo" items={["Confirmar plataformas y admins","Inventario y cuentas privilegiadas","Primera copia verificada","MFA en dirección","Piloto bloqueo automático"]} accent />
              <TimelineCol k="Meses 2-3" t="Control de datos" items={["Permisos y carpetas por función","Primera restauración completa","Mapa datos + proveedores","Política IA generativa","Diseño segmentación red"]} />
              <TimelineCol k="Meses 4-6" t="Ampliación" items={["Simulacro phishing","Bloqueo en todas las aulas","Segmentación red","SPF / DKIM / DMARC","MDM / EDR + FIDO2"]} />
            </div>
            {/* Mobile: horizontal snap */}
            <div className="lg:hidden flex gap-4 overflow-x-auto snap-x-mandatory px-4 py-4 timeline-track">
              <div className="snap-center shrink-0 w-[85%]"><MobileTimeline k="Mes 1" t="Base y mayor riesgo" items={["Confirmar plataformas y admins","Inventario y cuentas privilegiadas","Primera copia verificada","MFA en dirección","Piloto bloqueo automático"]} accent /></div>
              <div className="snap-center shrink-0 w-[85%]"><MobileTimeline k="Meses 2-3" t="Control de datos" items={["Permisos y carpetas por función","Primera restauración completa","Mapa datos + proveedores","Política IA generativa","Diseño segmentación red"]} /></div>
              <div className="snap-center shrink-0 w-[85%]"><MobileTimeline k="Meses 4-6" t="Ampliación" items={["Simulacro phishing","Bloqueo en todas las aulas","Segmentación red","SPF / DKIM / DMARC","MDM / EDR + FIDO2"]} /></div>
            </div>
          </div>
        </Reveal>

        {/* 9 riesgos — tilt glass cards, not tabs */}
        <div className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="text-[28px] font-semibold tracking-[-0.02em] text-primary-ink dark:text-[#f5f5f7]">9 riesgos. Dónde duele.</h3>
            <div className="flex gap-2" role="group" aria-label="Filtrar riesgos">
              <button onClick={() => setFilter('all')} aria-pressed={filter==='all'} className={`apple-pill text-[12px] border focus-visible:rounded-full ${filter==='all' ? 'bg-primary-ink text-white border-primary-ink' : 'bg-paper dark:bg-[#1c1c1e] text-primary-ink dark:text-[#f5f5f7] border-hairline dark:border-white/10'}`}>Todos</button>
              <button onClick={() => setFilter('alto')} aria-pressed={filter==='alto'} className={`apple-pill text-[12px] border focus-visible:rounded-full ${filter==='alto' ? 'bg-ember text-white border-ember' : 'bg-paper dark:bg-[#1c1c1e] text-primary-ink dark:text-[#f5f5f7] border-hairline dark:border-white/10'}`}>Impacto alto</button>
            </div>
          </div>

          <AnimatedGroup stagger={0.06} className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {riesgos.filter(r => filter==='all' ? true : r.impacto !== 'Medio').map((r, i) => {
              const pastelClass = ['riesgo-bg-sky','riesgo-bg-citrus','riesgo-bg-starlight','riesgo-bg-blush','riesgo-bg-silver','riesgo-bg-hairline','riesgo-bg-sky','riesgo-bg-starlight','riesgo-bg-silver'][i % 9]
              return (
                <AnimatedItem key={r.id}>
                  <TiltCard maxTilt={5} className={`rounded-[28px] p-6 flex flex-col gap-3 h-full text-left border border-white/40 ${pastelClass}`}>
                    <button onClick={() => setExp(exp===r.id ? null : r.id)} aria-expanded={exp===r.id} aria-controls={`riesgo-${r.id}`} className="text-left w-full flex flex-col gap-3 focus-visible:outline-none">
                      <div className="flex justify-between items-start">
                        <span className="w-8 h-8 rounded-full bg-paper dark:bg-[#1c1c1e] flex items-center justify-center text-[12px] font-semibold text-primary-ink dark:text-[#f5f5f7] shadow-sm">{r.id}</span>
                        <span className="text-[11px] font-medium tracking-wide text-primary-ink dark:text-[#f5f5f7]/60">{r.prob} · {r.impacto}</span>
                      </div>
                      <h4 className="text-[20px] font-semibold leading-none tracking-[-0.01em] text-primary-ink dark:text-[#f5f5f7]">{r.title}</h4>
                      <p className="text-[14px] leading-5 text-primary-ink dark:text-[#f5f5f7]/75 line-clamp-3">{r.desc}</p>
                      <span className="text-[12px] font-medium text-link-blue mt-auto">{exp===r.id ? 'Ocultar ↑' : 'Más información ›'}</span>
                    </button>
                    {exp===r.id && (
                      <motion.div id={`riesgo-${r.id}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="rounded-[16px] bg-paper dark:bg-[#1c1c1e] p-4 border border-hairline/40 dark:border-white/10 mt-2">
                        <p className="text-[13px] leading-5 text-deep-gray dark:text-[#a1a1a6]">{r.desc}</p>
                        <p className="mt-2 text-[12px] font-semibold text-link-blue">→ {r.medida}</p>
                      </motion.div>
                    )}
                  </TiltCard>
                </AnimatedItem>
              )
            })}
          </AnimatedGroup>
          <p className="mt-3 text-[12px] text-mid-gray">Valoración orientativa del Plan — debe validarse con DPD y Dirección.</p>
        </div>

        {/* 22 medidas — acordeón filtrable, not dense table */}
        <Reveal y={12}>
          <div className="mt-12 rounded-[28px] bg-paper dark:bg-[#1c1c1e] overflow-hidden border border-hairline/30 dark:border-white/10">
            <div className="px-6 md:px-8 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <h3 className="text-[22px] font-semibold tracking-[-0.01em] text-primary-ink dark:text-[#f5f5f7]">22 medidas — tarjeta por tarjeta</h3>
              <div className="flex gap-2">
                {['all','pendiente','en progreso','completado'].map(f => (
                  <button key={f} onClick={()=> setEstadoFiltro(f)} aria-pressed={estadoFiltro===f}
                    className={`px-3 py-1 rounded-full text-[11px] font-medium border capitalize ${estadoFiltro===f ? 'bg-primary-ink text-white border-primary-ink' : 'bg-paper dark:bg-[#1c1c1e] text-primary-ink dark:text-[#f5f5f7] border-hairline dark:border-white/10'}`}>{f}</button>
                ))}
              </div>
            </div>

            {/* Agrupado por categoría — Bento-like accordion */}
            <div className="px-4 md:px-6 pb-6 space-y-3">
              {gruposMedidas.map(grupo => (
                <details key={grupo.title} open={grupoOpen===grupo.title} className="group rounded-[20px] bg-canvas dark:bg-[#000000] overflow-hidden">
                  <summary onClick={(e)=>{ e.preventDefault(); setGrupoOpen(grupoOpen===grupo.title ? null : grupo.title)}} className="px-5 py-4 flex items-center justify-between cursor-pointer list-none">
                    <span className="text-[14px] font-semibold text-primary-ink dark:text-[#f5f5f7]">{grupo.title} <span className="ml-2 text-[11px] font-normal text-mid-gray">{grupo.medidas.length} medidas</span></span>
                    <span className="w-7 h-7 rounded-full bg-paper dark:bg-[#1c1c1e] border border-hairline dark:border-white/10 flex items-center justify-center text-primary-ink dark:text-[#f5f5f7] text-[12px] group-open:rotate-180 transition-transform">⌄</span>
                  </summary>
                  <div className="px-3 pb-3 grid sm:grid-cols-2 gap-3">
                    {grupo.medidas.map(n => {
                      const m = medidas22.find(x=> x.n===n)
                      if (!m) return null
                      const estado = estados[m.n] || 'pendiente'
                      const visible = estadoFiltro==='all' || estado===estadoFiltro
                      if (!visible) return null
                      return (
                        <div key={m.n} className="rounded-[16px] bg-paper dark:bg-[#1c1c1e] p-4 border border-hairline/50 dark:border-white/10 flex gap-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 ${estado==='completado' ? 'bg-primary-ink text-white' : estado==='en progreso' ? 'bg-electric-blue text-white' : 'bg-canvas dark:bg-[#000000] text-primary-ink dark:text-[#f5f5f7] border border-hairline dark:border-white/10'}`}>{m.n}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-medium leading-tight text-primary-ink dark:text-[#f5f5f7]">{m.title}</div>
                            <div className="text-[11px] text-mid-gray mt-1">{m.resp} · {m.plazo} · <span className={`px-2 py-0.5 rounded-full text-[10px] ${m.prio==='Alta' ? 'bg-primary-ink text-white' : 'bg-canvas dark:bg-[#000000] border border-hairline dark:border-white/10 text-primary-ink dark:text-[#f5f5f7]'}`}>{m.prio}</span></div>
                            <select value={estado} onChange={e=> updateEstado(m.n, e.target.value)} aria-label={`Estado medida ${m.n}`} className="mt-2 w-full text-[11px] rounded-full border border-hairline dark:border-white/10 px-3 py-1.5 bg-canvas dark:bg-[#000000] text-primary-ink dark:text-[#f5f5f7]">
                              <option value="pendiente">Pendiente</option>
                              <option value="en progreso">En progreso</option>
                              <option value="completado">Completado</option>
                            </select>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </details>
              ))}

              {/* Lista plana filtrable si hay filtro activo */}
              {estadoFiltro !== 'all' && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                  {medidasFiltradas.map(m => {
                    const estado = estados[m.n] || 'pendiente'
                    return (
                      <div key={m.n} className="rounded-[16px] bg-canvas dark:bg-[#000000] p-4 border border-hairline/40 dark:border-white/10">
                        <div className="flex gap-2 items-start">
                          <span className="w-7 h-7 rounded-full bg-paper dark:bg-[#1c1c1e] border border-hairline dark:border-white/10 flex items-center justify-center text-[11px] font-semibold">{m.n}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-[12px] font-medium text-primary-ink dark:text-[#f5f5f7] leading-tight">{m.title}</div>
                            <div className="text-[11px] text-mid-gray">{m.resp} · {m.plazo}</div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${estado==='completado' ? 'bg-primary-ink text-white' : estado==='en progreso' ? 'bg-electric-blue text-white' : 'bg-paper dark:bg-[#1c1c1e] border border-hairline dark:border-white/10 text-deep-gray dark:text-[#a1a1a6]'}`}>{estado}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Minimal table fallback — accessible, but secondary */}
            <details className="border-t border-hairline/40 dark:border-white/10">
              <summary className="px-6 md:px-8 py-3 text-[12px] font-medium text-link-blue cursor-pointer">Ver tabla completa (accesible)</summary>
              <div className="overflow-x-auto no-scrollbar border-t border-hairline/40 dark:border-white/10">
                <table className="w-full text-[13px] min-w-[640px]">
                  <caption className="sr-only">22 medidas con responsable y plazo</caption>
                  <thead className="text-[11px] tracking-wide text-mid-gray bg-canvas dark:bg-[#000000]">
                    <tr><th className="text-left px-6 py-3 font-medium">#</th><th className="text-left px-6 py-3 font-medium">Medida</th><th className="text-left px-6 py-3 font-medium">Responsable</th><th className="text-left px-6 py-3 font-medium">Plazo</th><th className="text-left px-6 py-3 font-medium">Estado</th></tr>
                  </thead>
                  <tbody className="divide-y divide-[#d6d6d6]/40">
                    {medidas22.map(m => (
                      <tr key={m.n} className="hover:bg-canvas dark:bg-[#000000]/50">
                        <td className="px-6 py-2.5 text-mid-gray">{m.n}</td>
                        <td className="px-6 py-2.5 font-medium text-primary-ink dark:text-[#f5f5f7]">{m.title}</td>
                        <td className="px-6 py-2.5 text-deep-gray dark:text-[#a1a1a6]">{m.resp}</td>
                        <td className="px-6 py-2.5 text-deep-gray dark:text-[#a1a1a6]">{m.plazo}</td>
                        <td className="px-6 py-2.5"><span className={`px-2 py-1 rounded-full text-[11px] ${estados[m.n]==='completado' ? 'bg-primary-ink text-white' : estados[m.n]==='en progreso' ? 'bg-electric-blue text-white' : 'bg-canvas dark:bg-[#000000] text-deep-gray dark:text-[#a1a1a6] border'}`}>{estados[m.n] || 'pendiente'}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-10 grid grid-cols-3 gap-3 max-w-[720px] mx-auto">
            <div className="text-center py-4">
              <div className="text-[32px] font-semibold tracking-[-0.01em] text-primary-ink dark:text-[#f5f5f7] leading-none"><Counter value="9" /></div>
              <div className="mt-1 text-[11px] tracking-wide font-medium text-mid-gray uppercase leading-tight">riesgos<br/>mapeados</div>
            </div>
            <div className="text-center py-4 border-x border-hairline/50 dark:border-white/10">
              <div className="text-[32px] font-semibold tracking-[-0.01em] text-primary-ink dark:text-[#f5f5f7] leading-none"><Counter value="6" /></div>
              <div className="mt-1 text-[11px] tracking-wide font-medium text-mid-gray uppercase leading-tight">meses<br/>hoja de ruta</div>
            </div>
            <div className="text-center py-4">
              <div className="text-[32px] font-semibold tracking-[-0.01em] text-primary-ink dark:text-[#f5f5f7] leading-none"><Counter value="017" /></div>
              <div className="mt-1 text-[11px] tracking-wide font-medium text-mid-gray uppercase leading-tight">INCIBE<br/>8-23h</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function TimelineCol({ k, t, items, accent }) {
  return (
    <div className={`p-6 md:p-8 ${accent ? 'bg-canvas dark:bg-[#000000]/40' : ''}`}>
      <div className="text-[11px] font-semibold tracking-[0.06em] text-ember">{k.toUpperCase()}</div>
      <div className="mt-1 text-[17px] font-semibold text-primary-ink dark:text-[#f5f5f7]">{t}</div>
      <ul className="mt-4 space-y-2.5" role="list">
        {items.map((it,i) => (
          <motion.li key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i*0.04, duration: 0.4, type: 'spring', stiffness: 300 }} className="flex gap-2.5 text-[14px] leading-5 text-deep-gray dark:text-[#a1a1a6]">
            <span className="mt-[9px] w-1 h-1 rounded-full bg-primary-ink shrink-0" aria-hidden="true" />
            {it}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
function MobileTimeline({ k, t, items, accent }) {
  return (
    <div className={`rounded-[20px] p-5 border ${accent ? 'bg-canvas dark:bg-[#000000] border-hairline dark:border-white/10' : 'bg-paper dark:bg-[#1c1c1e] border-hairline/50 dark:border-white/10'}`}>
      <div className="text-[11px] font-semibold tracking-[0.06em] text-ember">{k.toUpperCase()}</div>
      <div className="mt-1 text-[16px] font-semibold text-primary-ink dark:text-[#f5f5f7]">{t}</div>
      <ul className="mt-3 space-y-2">
        {items.map((it,i)=> <li key={i} className="flex gap-2 text-[13px] leading-5 text-deep-gray dark:text-[#a1a1a6]"><span className="mt-2 w-1 h-1 rounded-full bg-primary-ink shrink-0" />{it}</li>)}
      </ul>
    </div>
  )
}
