// No inventamos la rueda.
// Recursos oficiales, verificados y gratuitos.
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Reveal } from '../components/Reveal'
import { AnimatedGroup, AnimatedItem } from '../components/AnimatedGroup'
import TiltCard from '../components/TiltCard'
import { glosario } from '../data/content'
import { FilePdf, Video, Globe, GameController, ShieldCheck, DownloadSimple, Funnel, Play, GraduationCap, Trophy, Bug, Key, FileText, LockKey, Link as LinkIcon } from '@phosphor-icons/react'
import LiteYouTube from '../components/LiteYouTube'

const recursos = [
  { title: 'Guía Herramientas Control Parental', desc: 'PDF oficial con fichas por sistema. Qué filtra cada herramienta y cómo activarla.', href: 'https://www.incibe.es/sites/default/files/contenidos/is4k_guia_controles_parentales.pdf', tag: 'PDF', icon: FilePdf, color: '#b00020' },
  { title: 'Guía Mediación Parental — INCIBE', desc: 'Normas pactadas y qué hacer si hay problema. El acuerdo que usamos como base.', href: 'https://www.incibe.es/sites/default/files/contenidos/materiales/Campanas/is4k-guiamediaci%C3%B3nparental.pdf', tag: 'Guía', icon: ShieldCheck, color: '#0066cc' },
  { title: 'Actividades interactivas INCIBE', desc: '7 casos de ingeniería social y camino seguro. Ideal para tutoría 10′.', href: 'https://www.incibe.es/ciudadania/formacion/actividades', tag: 'Interactivo', icon: GameController, color: '#0071e3' },
  { title: 'Tests IS4K', desc: 'Ciberseguridad en plataformas educativas. Ponte a prueba después del simulacro.', href: 'https://www.incibe.es/menores/juegos/tests/', tag: 'Test', icon: ShieldCheck, color: '#b64400' },
  { title: 'IS4K YouTube', desc: 'Canal con vídeos de grooming, sexting y más. Lista lista para tutoría.', href: 'https://www.youtube.com/c/InternetSeguraforKids/videos', tag: 'Vídeo', icon: Video, color: '#ff0000' },
  { title: 'Catálogo Control Parental', desc: 'Todas las herramientas por dispositivo, comparadas. Family Link, Tiempo de Uso, MS Family.', href: 'https://www.incibe.es/menores/recursos/control-parental', tag: 'Web', icon: Globe, color: '#1d1d1f' },
  { title: 'Have I Been Pwned', desc: 'Comprueba si tu correo o contraseñas han sido comprometidos en brechas de seguridad. Oficial y gratuito.', href: 'https://haveibeenpwned.com/', icon: ShieldCheck, color: '#0066cc', tipo: 'Herramienta', tiempo: '1 min', nuevo: true },
  { title: 'VirusTotal', desc: 'Analiza archivos sospechosos o URLs con más de 70 antivirus. Gratis y sin registro.', href: 'https://www.virustotal.com/', icon: Bug, color: '#1d1d1f', tipo: 'Herramienta', tiempo: '2 min', nuevo: true },
  { title: 'Mozilla Observatory', desc: 'Analiza la seguridad de cualquier página web. Ideal para verificar sitios sospechosos.', href: 'https://observatory.mozilla.org/', icon: Globe, color: '#0066cc', tipo: 'Herramienta', tiempo: '2 min', nuevo: true },
  { title: 'Password Monster', desc: 'Comprueba cuánto tardaría en crackearse tu contraseña. Educativo y sin guardar datos.', href: 'https://www.passwordmonster.com/', icon: Key, color: '#b64400', tipo: 'Herramienta', tiempo: '1 min', nuevo: true },
  { title: 'INCIBE - Guía de contraseñas seguras', desc: 'Cómo crear y gestionar contraseñas fuertes. Guía oficial con ejemplos prácticos.', href: 'https://www.incibe.es/empresas/fichas/contrasenas-seguras', icon: FileText, color: '#0071e3', tipo: 'Guía', tiempo: '5 min' },
  { title: 'Phishing Quiz de Google', desc: 'Pon a prueba tu capacidad para detectar phishing con este quiz interactivo oficial de Google.', href: 'https://phishingquiz.withgoogle.com/', icon: GameController, color: '#0066cc', tipo: 'Interactivo', tiempo: '5 min', nuevo: true },
  { title: '2FA Directory', desc: 'Directorio de servicios que soportan autenticación en dos pasos. Comprueba los tuyos.', href: 'https://2fa.directory/', icon: LockKey, color: '#1d1d1f', tipo: 'Herramienta', tiempo: '2 min', nuevo: true },
  { title: 'URLScan.io', desc: 'Analiza URLs sospechosas sin visitarlas. Te dice a dónde redirigen y si son maliciosas.', href: 'https://urlscan.io/', icon: LinkIcon, color: '#0066cc', tipo: 'Herramienta', tiempo: '2 min', nuevo: true },
]
const videos = [
  { title: 'PantallasAmigas — ¿Sabes con quién chatean?', from: 'PantallasAmigas · 2:08', href: 'https://www.youtube.com/watch?v=hC6-wHlHMnQ', embed: 'hC6-wHlHMnQ' },
  { title: 'Internet Segura for Kids — Canal oficial', from: 'INCIBE · IS4K', href: 'https://www.youtube.com/c/InternetSeguraforKids/videos', embed: null },
  { title: 'INCIBE — Controles parentales en el hogar', from: 'INCIBE · Guía', href: 'https://www.incibe.es/menores/recursos/control-parental', embed: null },
]

const juegos = [
  { title: 'Gana al Hacker', desc: 'Generalitat de Catalunya — 12 retos para mejorar ciber-capacidades 12-16 años. Muy valorado por docentes.', href: 'https://www.cyber-secure.cat/', tag: 'Juego · 12-16', color: '#0066cc', icon: Trophy },
  { title: 'Interland de Google', desc: '4 mini-juegos visuales: Sé inteligente, Alerta, Fortaleza, Amabilidad. 8-12 años, sin cuenta.', href: 'https://beinternetawesome.withgoogle.com/es_es/interland', tag: 'Juego · 8-12', color: '#0071e3', icon: GameController },
  { title: 'Digi Guardians', desc: 'Protege una casa virtual de ciberataques respondiendo sobre contraseñas y privacidad. Inmersivo.', href: 'https://www.incibe.es/menores/juegos', tag: 'Simulador', color: '#1d1d1f', icon: ShieldCheck },
]

const filtros = ['Todos', 'PDF', 'Guía', 'Vídeo', 'Interactivo', 'Test', 'Herramienta']

export default function Recursos() {
  const [filtro, setFiltro] = useState('Todos')
  const [glossaryHover, setGlossaryHover] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const recursosFiltrados = recursos.filter(r => r.titulo.toLowerCase().includes(busqueda.toLowerCase()) || r.desc.toLowerCase().includes(busqueda.toLowerCase()))
  const filtrados = filtro === 'Todos' ? recursosFiltrados : recursosFiltrados.filter(r => r.tag === filtro || r.tipo === filtro || (filtro==='Vídeo' && r.tag==='Vídeo'))

  return (
    <section id="recursos" className="bg-paper">
      <div className="apple-shell apple-section">
        <Reveal>
          <div className="text-center">
            <div className="apple-chapter-label">CAPÍTULO 5 — RECURSOS</div>
            <h2 className="apple-chapter-title mt-2">
              Recursos oficiales,<br/><span className="font-light">verificados y gratuitos.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[640px] text-[17px] leading-6 text-deep-gray">Todo verificado y oficial: INCIBE, IS4K, AEPD, EducaMadrid. Herramientas gratuitas para usar ahora mismo.</p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filtrar por tipo">
            <span className="flex items-center gap-1 text-[11px] font-semibold tracking-wide text-mid-gray mr-1"><Funnel size={12} weight="bold" aria-hidden="true" /> FILTRAR:</span>
            {filtros.map(f => (
              <button key={f} onClick={()=> setFiltro(f)} aria-pressed={filtro===f} className={`apple-pill text-[12px] font-medium border transition-colors ${filtro===f ? 'bg-primary-ink text-white border-primary-ink' : 'bg-paper text-primary-ink border-hairline hover:border-primary-ink'}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <input type="search" value={busqueda} onChange={e=> setBusqueda(e.target.value)} placeholder="Buscar recursos..." aria-label="Buscar recursos" className="w-full max-w-[480px] rounded-full border border-hairline bg-paper px-4 py-2 text-[13px] text-primary-ink placeholder:text-quiet-dot focus:outline-none focus:border-action-blue" />
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div key={filtro} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <AnimatedGroup stagger={0.05} className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtrados.map(r => {
                const Icon = r.icon
                return (
                  <AnimatedItem key={r.title}>
                    <a href={r.href} target="_blank" rel="noreferrer" className="group block h-full">
                      <TiltCard maxTilt={5} className="rounded-[28px] bg-canvas overflow-hidden border border-hairline/30 h-full flex flex-col hover:bg-paper transition-colors">
                        <div className="h-[120px] relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${r.color}14, #f5f5f7)` }}>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Icon size={36} weight="duotone" style={{ color: r.color }} aria-hidden="true" />
                          </div>
                          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-paper border border-hairline/50 text-[11px] font-semibold text-primary-ink flex items-center gap-1.5">
                            <Icon size={12} weight="bold" aria-hidden="true" /> {r.tag}
                          </span>
                          {r.nuevo && (
                            <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#00c950] text-white text-[10px] font-semibold">NUEVO</span>
                          )}
                          <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-primary-ink text-white flex items-center justify-center text-[11px] opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <h3 className="text-[16px] font-semibold leading-tight text-primary-ink">{r.title}</h3>
                          <p className="mt-1.5 text-[13px] leading-5 text-deep-gray flex-1">{r.desc}</p>
                          <span className="mt-3 text-[12px] font-medium text-link-blue">Abrir ›</span>
                        </div>
                      </TiltCard>
                    </a>
                  </AnimatedItem>
                )
              })}
            </AnimatedGroup>
          </motion.div>
        </AnimatePresence>

        {/* Video embed — IS4K oficial */}
        <Reveal>
          <div className="mt-10 rounded-[28px] bg-canvas p-6 md:p-8 border border-hairline/20">
            <div className="flex items-center gap-2">
              <Video size={14} weight="duotone" className="text-[#ff0000]" aria-hidden="true" />
              <div className="text-[11px] font-semibold tracking-[0.06em] text-primary-ink">VÍDEO DESTACADO · IS4K</div>
              <span className="ml-auto px-2.5 py-1 rounded-full bg-primary-ink text-white text-[11px] font-medium">2:08</span>
            </div>
            <div className="mt-4 grid lg:grid-cols-[1.4fr_0.8fr] gap-6 items-start">
              <LiteYouTube id="hC6-wHlHMnQ" title="PantallasAmigas — ¿Sabes con quién chatean? (IS4K)" />
              <div>
                <h3 className="text-[16px] font-semibold text-primary-ink leading-tight">¿Sabes con quién chatean tus hij@s?</h3>
                <p className="mt-2 text-[13px] leading-5 text-deep-gray">PantallasAmigas + IS4K — 2 min para tutoría. Identidad digital y grooming sin alarmismo, perfecto para abrir debate en clase.</p>
                <div className="mt-4 space-y-2">
                  {videos.slice(0,3).map(v=>(
                    <a key={v.href} href={v.href} target="_blank" rel="noreferrer" className="flex justify-between items-center p-3 rounded-[12px] bg-paper border border-hairline/30 hover:border-action-blue/30 transition-colors group">
                      <div><div className="text-[13px] font-medium text-primary-ink group-hover:text-link-blue">{v.title}</div><div className="text-[11px] text-mid-gray">{v.from}</div></div>
                      <span className="w-7 h-7 rounded-full bg-primary-ink text-white flex items-center justify-center text-[10px] group-hover:bg-action-blue">▶</span>
                    </a>
                  ))}
                </div>
                <p className="mt-3 text-[11px] text-mid-gray">Todos los vídeos abren en nueva pestaña con <code className="bg-paper px-1 py-0.5 rounded border">youtube-nocookie.com</code> para privacidad. Sin cookies hasta reproducir.</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Juegos — Practica */}
        <Reveal>
          <div className="mt-8 rounded-[28px] bg-paper border border-hairline/30 p-6 md:p-8">
            <div className="flex items-center gap-2">
              <GraduationCap size={14} weight="duotone" className="text-link-blue" aria-hidden="true" />
              <div className="text-[11px] font-semibold tracking-[0.06em] text-link-blue">PRACTICA — JUEGOS Y SIMULADORES</div>
            </div>
            <h3 className="mt-2 text-[20px] font-semibold tracking-[-0.01em] text-primary-ink">Aprende jugando, sin instalar nada.</h3>
            <p className="mt-1 text-[13px] leading-5 text-deep-gray max-w-[640px]">Para Familia o aula: 10 min por juego. Refuerza contraseñas, phishing y ciberacoso de forma lúdica.</p>
            <AnimatedGroup stagger={0.06} className="mt-6 grid md:grid-cols-3 gap-4">
              {juegos.map(j=>{
                const Icon = j.icon
                return (
                  <AnimatedItem key={j.title}>
                    <a href={j.href} target="_blank" rel="noreferrer" className="group block h-full">
                      <TiltCard maxTilt={5} className="rounded-[20px] bg-canvas p-5 border border-hairline/30 h-full flex flex-col hover:bg-paper transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-paper border border-hairline flex items-center justify-center"><Icon size={14} weight="duotone" style={{ color: j.color }} aria-hidden="true"/></span>
                          <span className="px-2 py-1 rounded-full bg-paper border border-hairline text-[10px] font-semibold text-primary-ink">{j.tag}</span>
                        </div>
                        <h4 className="mt-3 text-[14px] font-semibold text-primary-ink leading-tight">{j.title}</h4>
                        <p className="mt-1 text-[12px] leading-5 text-deep-gray flex-1">{j.desc}</p>
                        <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-link-blue group-hover:underline">Jugar <Play size={10} weight="fill" aria-hidden="true"/></span>
                      </TiltCard>
                    </a>
                  </AnimatedItem>
                )
              })}
            </AnimatedGroup>
            <p className="mt-4 text-[11px] text-mid-gray">Fuentes oficiales: <a href="https://beinternetawesome.withgoogle.com/es_es/interland" target="_blank" rel="noreferrer" className="text-link-blue hover:underline">Interland (Google)</a> · <a href="https://www.incibe.es/menores/" target="_blank" rel="noreferrer" className="text-link-blue hover:underline">IS4K</a> · Gana al Hacker (GenCat). Sin registro, sin datos.</p>
          </div>
        </Reveal>

        <div className="mt-8 grid lg:grid-cols-[1.2fr_0.8fr] gap-5">
          <Reveal>
            <div className="rounded-[28px] bg-canvas p-6 md:p-8 border border-hairline/20">
              <div className="flex items-center gap-2">
                <FilePdf size={14} weight="duotone" className="text-primary-ink" aria-hidden="true" />
                <div className="text-[11px] font-semibold tracking-[0.06em] text-primary-ink">KIT DE CONCIENCIACIÓN · INCIBE</div>
              </div>
              <ul className="mt-3 space-y-2 text-[13px] leading-5 text-deep-gray list-disc pl-4">
                <li><a href="https://www.incibe.es/menores/materiales" target="_blank" rel="noreferrer" className="text-link-blue hover:underline">Materiales didácticos IS4K</a> — unidades, CyberTasks, fichas imprimibles</li>
                <li><a href="https://www.incibe.es/ciudadania/formacion/actividades" target="_blank" rel="noreferrer" className="text-link-blue hover:underline">Talleres online grabados</a> — Internet Seguro 2025, etc.</li>
                <li><a href="https://www.aepd.es/" target="_blank" rel="noreferrer" className="text-link-blue hover:underline">Plantillas AEPD brechas</a> para Protocolo 72h</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-[28px] bg-paper p-6 md:p-8 border border-hairline/30">
              <div className="text-[11px] font-semibold tracking-[0.06em] text-primary-ink">GLOSARIO EN 1 LÍNEA — HOVER PARA DEFINICIÓN</div>
              <div className="mt-4 space-y-2">
                {glosario.map(g=>(
                  <div
                    key={g.k}
                    className="glossary-term relative flex gap-3 p-3 rounded-[12px] bg-canvas hover:bg-cool-wash cursor-help transition-colors overflow-visible"
                    onMouseEnter={()=> setGlossaryHover(g.k)}
                    onMouseLeave={()=> setGlossaryHover(null)}
                    tabIndex={0}
                    onFocus={()=> setGlossaryHover(g.k)}
                    onBlur={()=> setGlossaryHover(null)}
                    aria-describedby={`gloss-${g.k}`}
                  >
                    <span className="px-2.5 py-1 rounded-full bg-primary-ink text-white text-[11px] font-semibold h-fit shrink-0">{g.k}</span>
                    <span className="text-[12px] leading-5 text-deep-gray truncate">{g.d}</span>
                    {glossaryHover === g.k && (
                      <motion.div id={`gloss-${g.k}`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="glossary-tooltip absolute top-[calc(100%+8px)] left-0 z-[1000] bg-primary-ink text-white px-3 py-2 rounded-[8px] text-[12px] leading-5 shadow-[0_4px_12px_rgba(0,0,0,0.15)] max-w-[280px] whitespace-normal pointer-events-none">
                        <span className="font-semibold">{g.k}:</span> {g.d}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-8 rounded-[28px] bg-primary-ink p-6 md:p-8 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0066cc]/20 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
            <div className="relative">
              <h3 className="text-[20px] font-semibold tracking-[-0.01em]">Descargas centralizadas</h3>
              <p className="text-[13px] leading-5 text-white/70 mt-1 max-w-[640px]">Un solo lugar para todos los PDF. No más botones duplicados por sección. Plantillas en blanco con líneas tenues para escribir a mano.</p>
              <div className="mt-5 grid md:grid-cols-3 gap-3">
                <a href={import.meta.env.BASE_URL + 'pdfs/plantilla-ficha-incidente.pdf'} download="plantilla-ficha-incidente.pdf" className="rounded-[16px] bg-paper/10 backdrop-blur p-4 hover:bg-paper/15 border border-white/10 transition-colors">
                  <div className="text-[13px] font-semibold">Ficha de incidente</div>
                  <div className="text-[11px] text-white/60">Anexo B — gravedad + checklist</div>
                  <span className="mt-3 inline-flex items-center gap-1 apple-pill bg-paper text-primary-ink text-[12px] py-2"><DownloadSimple size={12} weight="bold" aria-hidden="true" /> PDF</span>
                </a>
                <a href={import.meta.env.BASE_URL + 'pdfs/plantilla-acuerdo-familiar.pdf'} download="plantilla-acuerdo-familiar.pdf" className="rounded-[16px] bg-paper/10 backdrop-blur p-4 hover:bg-paper/15 border border-white/10 transition-colors">
                  <div className="text-[13px] font-semibold">Acuerdo familiar</div>
                  <div className="text-[11px] text-white/60">Genérico INCIBE — sin IES</div>
                  <span className="mt-3 inline-flex items-center gap-1 apple-pill bg-electric-blue text-white text-[12px] py-2"><DownloadSimple size={12} weight="bold" aria-hidden="true" /> PDF</span>
                </a>
                <a href={import.meta.env.BASE_URL + 'pdfs/plantilla-inventario.pdf'} download="plantilla-inventario.pdf" className="rounded-[16px] bg-paper/10 backdrop-blur p-4 hover:bg-paper/15 border border-white/10 transition-colors">
                  <div className="text-[13px] font-semibold">Inventario</div>
                  <div className="text-[11px] text-white/60">Anexo C — horizontal + costes</div>
                  <span className="mt-3 inline-flex items-center gap-1 apple-pill bg-paper/20 text-white border border-white/20 text-[12px] py-2">PDF</span>
                </a>
              </div>
              <div className="mt-4 flex gap-2 flex-wrap">
                <a href={import.meta.env.BASE_URL + 'pdfs/Plan_Seguridad_Digital_IES_Manuel_de_Falla-4.pdf'} download="Plan_Seguridad_Digital_IES_Manuel_de_Falla.pdf" className="apple-pill bg-paper text-primary-ink text-[12px]">Plan completo (PDF) ↓</a>
                <a href={import.meta.env.BASE_URL + 'pdfs/CONTROL_PARENTAL_compressed.pdf'} download="CONTROL_PARENTAL.pdf" className="apple-pill bg-paper/10 text-white border border-white/20 text-[12px]">Control Parental ↓</a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
