import { useState, useRef } from 'react'
import { motion } from 'motion/react'
import { Reveal } from '../components/Reveal'
import { AnimatedGroup, AnimatedItem } from '../components/AnimatedGroup'
import TiltCard from '../components/TiltCard'
import { Bug, EnvelopeSimple, UsersThree, EyeSlash, Newspaper, GameController, ShieldCheck } from '@phosphor-icons/react'

const riesgosDeep = [
  {
    id: 'malware',
    label: 'Malware',
    icon: Bug,
    color: '#0066cc',
    title: 'Malware no es solo “virus”',
    desc: 'Cualquier programa para dañar, espiar o colarse. El Plan distingue 6 tipos.',
    img: 'assets/riesgos-malware.jpg',
    imgAlt: 'MacBook con escudo protector',
    stat: '6 tipos',
  },
  {
    id: 'phishing',
    label: 'Phishing',
    icon: EnvelopeSimple,
    color: '#b64400',
    title: '¿Sabrías cazar un phishing?',
    desc: 'Urgencia + dominio raro = trampa. Verifica siempre el remitente.',
    img: 'assets/riesgos-phishing.jpg',
    imgAlt: 'iPhone mostrando email',
    stat: '017 verifica',
  },
  {
    id: 'ciberacoso',
    label: 'Ciberacoso',
    icon: UsersThree,
    color: '#5e17a8',
    title: 'Parar, asegurar, pedir ayuda',
    desc: 'Stickers burlescos, rumores o excluir de grupo es acoso.',
    img: 'assets/riesgos-ciberacoso.jpg',
    imgAlt: 'Adolescentes apoyándose en aula',
    stat: 'Parar · Asegurar',
  },
  {
    id: 'grooming',
    label: 'Grooming',
    icon: EyeSlash,
    color: '#b00020',
    title: 'Grooming: confianza fingida',
    desc: 'Adulto con perfil falso que finge tu edad. Si no le conoces en persona, no es amigo.',
    img: 'assets/riesgos-grooming.jpg',
    imgAlt: 'iPad con escudo de privacidad',
    stat: 'Privacidad estricta',
  },
  {
    id: 'fakenews',
    label: 'Fake news',
    icon: Newspaper,
    color: '#1d1d1f',
    title: '¿Quién lo firma?',
    desc: 'Titular alarmista = clickbait. Verifica fuente, busca inversa.',
    img: 'assets/riesgos-fakenews.jpg',
    imgAlt: 'iPad con noticias y lupa',
    stat: 'Verifica fuente',
  },
  {
    id: 'loot',
    label: 'Loot boxes',
    icon: GameController,
    color: '#0071e3',
    title: 'Loot boxes: azar + dinero',
    desc: 'Cajas aleatorias con dopamina del like. Si hay azar + dinero, engancha.',
    img: 'assets/riesgos-lootboxes.jpg',
    imgAlt: 'iPad con juego y control parental',
    stat: 'Sin tarjeta vinculada',
  },
]

export default function Riesgos() {
  const [expanded, setExpanded] = useState(null)
  const scrollRef = useRef(null)

  return (
    <section id="riesgos" className="bg-paper">
      <div className="apple-shell apple-section">
        <Reveal>
          <div className="text-center">
            <div className="apple-chapter-label">CAPÍTULO 3 — RIESGOS</div>
            <h2 className="apple-chapter-title mt-2">
              Lo que pasa de verdad.<br/><span className="font-light">Señales y frenos.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[640px] text-[17px] leading-6 text-deep-gray">Casos que llegan a orientación y al 017 cada semana. No tabs, no clics infinitos: scroll fluido, una tarjeta = una idea.</p>
          </div>
        </Reveal>

        {/* Desktop: grid 3 cols, Mobile: horizontal snap */}
        <div className="hidden lg:block mt-8">
          <AnimatedGroup stagger={0.06} className="grid lg:grid-cols-3 gap-5">
            {riesgosDeep.map(r => (
              <AnimatedItem key={r.id}>
                <TiltCard maxTilt={6} className="rounded-[28px] overflow-hidden bg-canvas border border-hairline/30 h-full flex flex-col">
                  <RiskCardContent r={r} expanded={expanded} setExpanded={setExpanded} />
                </TiltCard>
              </AnimatedItem>
            ))}
          </AnimatedGroup>
        </div>

        <div className="lg:hidden mt-8">
          <div ref={scrollRef} className="flex gap-4 overflow-x-auto snap-x-mandatory pb-4 px-1 -mx-1 timeline-track">
            {riesgosDeep.map(r => (
              <div key={r.id} className="snap-center shrink-0 w-[88%] sm:w-[72%]">
                <TiltCard maxTilt={4} className="rounded-[28px] overflow-hidden bg-canvas border border-hairline/30 h-full flex flex-col">
                  <RiskCardContent r={r} expanded={expanded} setExpanded={setExpanded} />
                </TiltCard>
              </div>
            ))}
          </div>
          <p className="text-center text-[11px] text-mid-gray mt-2">← Desliza →</p>
        </div>

        {/* Legacy detailed panels — now as expandable sheets, not tabs */}
        {expanded && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-[28px] bg-canvas p-6 md:p-8 border border-hairline/30">
            {expanded==='malware' && <Malware />}
            {expanded==='phishing' && <Phishing />}
            {expanded==='ciberacoso' && <Ciberacoso />}
            {expanded==='grooming' && <Grooming />}
            {expanded==='fakenews' && <FakeNews />}
            {expanded==='loot' && <Loot />}
            <button onClick={()=> setExpanded(null)} className="mt-6 apple-pill bg-paper border border-hairline text-primary-ink text-[12px]">Cerrar detalle</button>
          </motion.div>
        )}

        {/* Huella digital — 3 filtros */}
        <Reveal>
          <div className="mt-10 rounded-[28px] bg-paper border border-hairline/40 p-6 md:p-8">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} weight="duotone" className="text-link-blue" aria-hidden="true" />
              <div className="text-[11px] font-semibold tracking-[0.06em] text-link-blue">TU HUELLA DIGITAL · EFECTO BUMERÁN</div>
            </div>
            <h3 className="mt-2 text-[21px] font-semibold tracking-[-0.01em] text-primary-ink">Antes de publicar, pásalo por 3 filtros.</h3>
            <p className="mt-2 text-[14px] leading-5 text-deep-gray max-w-[720px]">Todo lo que compartes crea una identidad pública imborrable. Hoy es una broma; dentro de 3 años, una beca o entrevista.</p>
            <AnimatedGroup stagger={0.07} className="mt-6 grid md:grid-cols-3 gap-4">
              <AnimatedItem><Filtro n="1" t="¿Es verdad?" d="Si no puedes verificarlo, no lo compartas. Busca fuente oficial." /></AnimatedItem>
              <AnimatedItem><Filtro n="2" t="¿Aporta o hace daño?" d="Burlas, memes y exclusiones dejan rastro (IP, hora, cuenta)." /></AnimatedItem>
              <AnimatedItem><Filtro n="3" t="¿Lo vería Dirección o tu familia?" d="Si te da vergüenza que lo vean, no lo publiques." /></AnimatedItem>
            </AnimatedGroup>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function RiskCardContent({ r, expanded, setExpanded }) {
  const Icon = r.icon
  const isOpen = expanded === r.id
  return (
    <>
      <div className="relative h-[180px] overflow-hidden">
        <img src={import.meta.env.BASE_URL + r.img} loading="lazy" width="560" height="320" alt={r.imgAlt} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" aria-hidden="true" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-paper flex items-center justify-center shadow-sm" aria-hidden="true"><Icon size={14} weight="bold" className="text-primary-ink" /></span>
          <span className="px-2.5 py-1 rounded-full bg-paper/90 backdrop-blur text-[11px] font-semibold text-primary-ink border border-white/50">{r.label}</span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex justify-start items-end">
          <span className="apple-glass-dark px-3 py-1 text-white text-[11px] font-medium">{r.stat}</span>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="text-[18px] font-semibold leading-tight text-primary-ink">{r.title}</h3>
        <p className="text-[13px] leading-5 text-deep-gray flex-1">{r.desc}</p>
        <button
          onClick={()=> setExpanded(isOpen ? null : r.id)}
          aria-expanded={isOpen}
          className={`self-start apple-pill text-[12px] font-medium border ${isOpen ? 'bg-primary-ink text-white border-primary-ink' : 'bg-paper text-primary-ink border-hairline hover:border-primary-ink'}`}
        >
          {isOpen ? 'Cerrar ↑' : 'Ver señales y frenos ›'}
        </button>
      </div>
    </>
  )
}

// Details (preserved content, now without tab chrome)
function Malware() {
  return (
    <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
      <div>
        <h3 className="text-[22px] font-semibold text-primary-ink">Malware no es solo “virus”</h3>
        <p className="text-[14px] leading-5 text-deep-gray mt-2">Cualquier programa para dañar, espiar o colarse. El Plan distingue 6 tipos:</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Mal t="Virus" d="Se pega a archivos y se propaga al abrirlos." />
          <Mal t="Ransomware" d="Cifra todo y pide pago. Sin copia, pierdes." />
          <Mal t="Gusano" d="Se copia solo por la red, sin abrir nada." />
          <Mal t="Spyware" d="Espía lo que escribes y ves." />
          <Mal t="Adware" d="Llena de anuncios y webs falsas." />
          <Mal t="Troyano" d="Parece útil pero abre puerta trasera." />
        </div>
        <div className="mt-4 rounded-[16px] bg-paper p-4 border border-hairline">
          <p className="text-[12px] leading-5 text-deep-gray"><span className="font-semibold text-primary-ink">Señal:</span> si un juego pide desactivar antivirus/firewall para instalarse, cancela — es malware (PDF p.13).</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="rounded-[16px] bg-paper p-4 border border-hairline/40">
          <div className="text-[11px] font-semibold tracking-[0.06em] text-primary-ink">CÓMO TE PROTEGES</div>
          <ul className="mt-2 space-y-1.5 text-[14px] text-deep-gray list-disc pl-4">
            <li>Un antivirus activo y actualizado.</li>
            <li>Actualizaciones al día.</li>
            <li>Copia aislada y verificada.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
function Phishing() {
  const [picked, setPicked] = useState(null)
  const [guess, setGuess] = useState(null)
  const mails = [
    { id:1, from:'Banco Santander <no-reply@santander.es>', displayFrom:'no-reply@santander.es', subj:'Movimiento inusual: revisa tu acceso', bad:false, verdict:'Legítimo', hint:'Remitente verificable: dominio oficial santander.es, sin urgencia falsa.', domainReal:'santander.es' },
    { id:2, from:'Secretaría IES <secretaria@ies-manuel-falla-madrid-support.com>', displayFrom:'secretaria@ies-manuel-falla-madrid-support.com', subj:'URGENTE: verifica hoy o cierre de cuenta', bad:true, verdict:'¡Phishing!', hint:'Dominio falso con guiones y urgencia. El oficial termina en ', domainReal:'@educa.madrid.org', fakeDomain:'ies-manuel-falla-madrid-support.com' },
    { id:3, from:'Microsoft <no-reply@microsoft.com>', displayFrom:'no-reply@microsoft.com', subj:'Código de verificación solicitado', bad:false, verdict:'Legítimo (si lo pediste)', hint:'Si no lo pediste, ignora y no reenvíes el código.', domainReal:'microsoft.com' },
  ]
  return (
    <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
      <div>
        <h3 className="text-[22px] font-semibold text-primary-ink">¿Sabrías cazar un phishing?</h3>
        <p className="text-[12px] text-mid-gray mt-1">Toca un correo, elige veredicto y comprueba. Marca oficial termina en <span className="font-mono bg-paper px-1 py-0.5 rounded border">@educa.madrid.org</span></p>
        <div className="mt-4 space-y-2">
          {mails.map(m=>{
            const isActive = picked===m.id
            const showReveal = isActive && Boolean(guess)
            return (
              <div key={m.id} className={`p-4 rounded-[16px] border ${isActive ? 'bg-paper border-primary-ink shadow-sm' : 'bg-paper border-hairline hover:border-primary-ink/30'}`}>
                <button onClick={()=>{setPicked(m.id); setGuess(null)}} className="w-full text-left">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${showReveal ? (m.bad ? 'bg-[#c4281c]' : 'bg-[#1a7a2e]') : 'bg-[#777779]'}`} />
                    <span className="text-[12px] text-mid-gray truncate font-mono">{m.from}</span>
                  </div>
                  <div className="text-[14px] font-medium text-primary-ink truncate mt-0.5">{m.subj}</div>
                </button>
                {isActive && (
                  <div className="mt-3 space-y-3">
                    {!guess ? (
                      <div className="flex gap-2">
                        <button onClick={()=>setGuess('phishing')} className="flex-1 py-2 rounded-full text-[12px] font-medium border bg-paper border-hairline hover:border-primary-ink">Es phishing</button>
                        <button onClick={()=>setGuess('legit')} className="flex-1 py-2 rounded-full text-[12px] font-medium border bg-paper border-hairline hover:border-primary-ink">Es legítimo</button>
                      </div>
                    ) : (
                      <>
                        <div className={`rounded-[12px] p-3 border ${m.bad ? 'bg-[#fef2f0] border-[#e6a8a4]' : 'bg-[#eef6ee] border-[#9ec99e]'}`}>
                          <span className={`px-2 py-1 rounded-full text-[11px] font-semibold ${m.bad ? 'bg-[#c4281c] text-white' : 'bg-[#1a7a2e] text-white'}`}>{m.verdict}</span>
                          <p className="mt-2 text-[12px] text-primary-ink">{m.hint}{m.id===2 && <><span className="font-mono font-semibold bg-paper px-1 rounded">{m.domainReal}</span> vs <span className="font-mono line-through text-[#c4281c]">{m.fakeDomain}</span></>}</p>
                        </div>
                        <div className={`rounded-[12px] p-3 text-[12px] border ${(guess==='phishing')===m.bad ? 'bg-[#eef6ee] border-[#9ec99e] text-[#145623]' : 'bg-[#fef2f0] border-[#e6a8a4] text-[#7a1a14]'}`}>
                          {(guess==='phishing')===m.bad ? '¡Correcto! ' : 'Casi. '}{m.bad ? 'Urgencia + dominio con guiones = trampa.' : 'Remitente coincide y sin urgencia. Entra siempre desde la app.'}
                        </div>
                        <button onClick={()=>setGuess(null)} className="w-full py-2 rounded-full text-[12px] bg-canvas border">Probar otro</button>
                      </>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
      <div className="rounded-[16px] bg-paper p-4 border border-hairline/40">
        <div className="text-[11px] font-semibold tracking-[0.06em]">3 PISTAS RÁPIDAS</div>
        <ol className="mt-2 space-y-1.5 text-[14px] text-primary-ink list-decimal pl-4">
          <li>Urgencia + premio</li>
          <li>Remitente raro → verifica @educa.madrid.org</li>
          <li>Enlace no coincide (hover)</li>
        </ol>
      </div>
    </div>
  )
}
function Ciberacoso() {
  return (
    <div>
      <h3 className="text-[22px] font-semibold text-primary-ink">Parar, asegurar, pedir ayuda</h3>
      <p className="text-[14px] text-deep-gray mt-2">Stickers burlescos, rumores o excluir de un grupo es ciberacoso. Deja rastro y tiene consecuencias.</p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Step n="1" t="PARAR" d="No respondas." />
        <Step n="2" t="ASEGURAR" d="Captura todo." />
        <Step n="3" t="PEDIR AYUDA" d="Tutoría / familia." />
      </div>
    </div>
  )
}
function Grooming() {
  return (
    <div>
      <h3 className="text-[22px] font-semibold text-primary-ink">Grooming: suplantación para confianza</h3>
      <p className="text-[14px] text-deep-gray mt-2">Adulto con perfil falso que finge tu edad y gustos, pide fotos o quedar. <span className="font-semibold text-primary-ink">Si no le conoces en persona, no es tu amigo.</span></p>
      <div className="mt-4 grid sm:grid-cols-3 gap-3">
        <G t="Perfil falso" d="Foto robada, edad mentida." />
        <G t="Aislamiento" d="«Que no se enteren tus padres»" />
        <G t="Chantaje" d="Con una foto pide más o dinero." />
      </div>
      <div className="mt-4 rounded-[16px] bg-paper p-4 border">
        <p className="text-[12px] text-deep-gray">Privacidad estricta, no compartir ubicación/fotos íntimas. Bloquea, guarda prueba y habla con un adulto. <a href="tel:017" className="text-link-blue">017</a>.</p>
      </div>
    </div>
  )
}
function FakeNews() {
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-3">
        <div className="flex gap-3 p-4 rounded-[16px] bg-paper border"><span className="w-7 h-7 rounded-full bg-primary-ink text-white flex items-center justify-center text-[12px] font-semibold shrink-0">1</span><div><div className="text-[14px] font-medium">¿Quién lo firma?</div><div className="text-[12px] text-deep-gray">Medio acreditado vs cuenta anónima.</div></div></div>
        <div className="flex gap-3 p-4 rounded-[16px] bg-paper border"><span className="w-7 h-7 rounded-full bg-primary-ink text-white flex items-center justify-center text-[12px] font-semibold shrink-0">2</span><div><div className="text-[14px] font-medium">¿Busca indignarte?</div><div className="text-[12px] text-deep-gray">Titular alarmista = clickbait.</div></div></div>
        <div className="flex gap-3 p-4 rounded-[16px] bg-paper border"><span className="w-7 h-7 rounded-full bg-primary-ink text-white flex items-center justify-center text-[12px] font-semibold shrink-0">3</span><div><div className="text-[14px] font-medium">¿Imagen real?</div><div className="text-[12px] text-deep-gray">Búsqueda inversa.</div></div></div>
      </div>
      <div className="mt-4 rounded-[16px] bg-paper p-4 border"><div className="text-[12px] font-semibold">Ejercicio</div><p className="text-[14px] mt-1">“Cierran el instituto mañana por ciberataque, comparte” — sin firma, con mayúsculas.</p><p className="text-[12px] text-deep-gray mt-2">No compartir → Verificar en web oficial / tutoría.</p></div>
    </div>
  )
}
function Loot() {
  return (
    <div>
      <h3 className="text-[22px] font-semibold text-primary-ink">Loot boxes</h3>
      <p className="text-[14px] text-deep-gray mt-2">Cajas aleatorias con la misma dopamina del like. Si se mezcla azar + dinero real, el enganche se multiplica.</p>
      <div className="mt-4 grid md:grid-cols-2 gap-3">
        <div className="rounded-[16px] bg-paper p-4 border"><div className="text-[12px] font-semibold">Señales</div><ul className="mt-2 text-[12px] list-disc pl-4 text-deep-gray"><li>Jugar para escapar</li><li>Mentir sobre tiempo/dinero</li><li>Perseguir pérdidas</li></ul></div>
        <div className="rounded-[16px] bg-paper p-4 border"><div className="text-[12px] font-semibold">Prevención</div><ul className="mt-2 space-y-1 text-[13px]"><li>✓ Sin tarjeta vinculada</li><li>✓ Tiempo pactado</li><li>✓ Habla de probabilidad</li></ul></div>
      </div>
    </div>
  )
}

function Mal({t,d}){ return <div className="rounded-[16px] bg-paper p-4 border"><div className="text-[14px] font-semibold text-primary-ink">{t}</div><div className="text-[12px] text-deep-gray mt-1">{d}</div></div> }
function Step({n,t,d}){ return <div className="rounded-[16px] bg-paper p-3 text-center border"><div className="w-6 h-6 rounded-full bg-primary-ink text-white flex items-center justify-center text-[12px] font-semibold mx-auto">{n}</div><div className="text-[11px] font-semibold tracking-[0.06em] mt-2">{t}</div><div className="text-[12px] text-deep-gray mt-1">{d}</div></div> }
function G({t,d}){ return <div className="rounded-[16px] bg-paper p-4 border"><div className="text-[14px] font-semibold">{t}</div><div className="text-[12px] text-deep-gray mt-1">{d}</div></div> }
function Filtro({n,t,d}){ return <div className="rounded-[16px] bg-canvas p-4 border border-hairline/30"><div className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-primary-ink text-white flex items-center justify-center text-[12px] font-semibold">{n}</span><span className="text-[14px] font-medium text-primary-ink">{t}</span></div><p className="text-[12px] leading-5 text-deep-gray mt-2">{d}</p></div> }
