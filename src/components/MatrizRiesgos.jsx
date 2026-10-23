import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { riesgos } from '../data/content'
import { Reveal } from './Reveal'

const probOrder = { 'Baja': 0, 'Media': 1, 'Alta': 2 }
const impactoOrder = { 'Medio': 0, 'Alto': 1, 'Crítico': 2 }
const probLabels = ['Baja', 'Media', 'Alta']
const impactoLabels = ['Medio', 'Alto', 'Crítico']

function cellColor(count){
  if(count===0) return 'bg-canvas border-hairline/30'
  if(count===1) return 'bg-starlight border-[#e6c9a0]'
  if(count===2) return 'bg-[#ffe0d0] border-[#e6a8a0]'
  return 'bg-[#ffd0c0] border-[#c4281c]/30'
}

export default function MatrizRiesgos(){
  const [sel, setSel] = useState(null) // {prob, impacto} or null
  const filtered = sel ? riesgos.filter(r=> r.prob===sel.prob && r.impacto===sel.impacto) : riesgos

  // build 3x3 grid: rows impacto (Crítico top), cols prob (Alta right)
  // spec wants probabilidad x impacto, 9 cards fall with spring
  return (
    <section className="bg-paper" aria-labelledby="matriz-title">
      <div className="apple-shell apple-section">
        <Reveal>
          <div className="text-center">
            <div className="text-[12px] font-semibold tracking-[0.06em] text-ember">MATRIZ DEL PLAN</div>
            <h2 id="matriz-title" className="mt-2 text-[32px] md:text-[44px] font-semibold tracking-[-0.02em] leading-none text-primary-ink">Probabilidad × Impacto</h2>
            <p className="mx-auto mt-3 max-w-[640px] text-[14px] leading-5 text-deep-gray">La del Plan p.6. Toca una celda para filtrar. Animación de resorte.</p>
          </div>
        </Reveal>

        <div className="mt-8 overflow-x-auto no-scrollbar">
          <div className="min-w-[560px]">
            <div className="grid grid-cols-[80px_1fr_1fr_1fr] gap-2 text-[11px] text-mid-gray text-center mb-2">
              <div></div>
              {probLabels.map(p=> <div key={p} className="font-medium">{p}</div>)}
            </div>
            <div className="grid grid-cols-[80px_1fr_1fr_1fr] gap-2">
              {[...impactoLabels].reverse().map(imp => (
                <>
                  <div key={`label-${imp}`} className="flex items-center justify-center text-[11px] font-medium text-mid-gray">{imp}</div>
                  {probLabels.map(prob=>{
                    const items = riesgos.filter(r=> r.prob===prob && r.impacto===imp)
                    const isActive = sel?.prob===prob && sel?.impacto===imp
                    return (
                      <motion.button
                        key={`${prob}-${imp}`}
                        onClick={()=> setSel(isActive? null : {prob, impacto: imp})}
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: (probOrder[prob]+impactoOrder[imp])*0.04 }}
                        className={`min-h-[96px] rounded-[16px] border p-3 flex flex-col items-center justify-center text-center gap-1 transition-all ${cellColor(items.length)} ${isActive ? 'ring-2 ring-[#0071e3] ring-offset-1' : 'hover:scale-[1.02]'}`}
                        aria-pressed={isActive}
                        aria-label={`Celda ${prob} × ${imp}, ${items.length} riesgos`}
                      >
                        <span className="text-[11px] font-semibold text-primary-ink">{items.length} riesgo{items.length!==1?'s':''}</span>
                        <span className="text-[10px] leading-3 text-deep-gray line-clamp-2">{items.map(r=> r.title).join(' · ') || '—'}</span>
                        {isActive && <span className="mt-1 w-1.5 h-1.5 rounded-full bg-electric-blue" aria-hidden="true"/>}
                      </motion.button>
                    )
                  })}
                </>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[11px] text-mid-gray"><span>← Impacto</span><span>Probabilidad →</span></div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={sel? `${sel.prob}-${sel.impacto}` : 'all'} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }} className="mt-6 rounded-[20px] bg-canvas p-4 md:p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-semibold text-primary-ink">{sel ? `${sel.prob} × ${sel.impacto} — ${filtered.length} caso${filtered.length!==1?'s':''}` : `Los 9 riesgos`}</h3>
              {sel && <button onClick={()=> setSel(null)} className="text-[12px] text-link-blue hover:underline">Ver todos</button>}
            </div>
            <ul className="mt-4 grid md:grid-cols-2 gap-3" role="list">
              {filtered.map(r=> (
                <li key={r.id} className="rounded-[16px] bg-paper p-4 border border-hairline/60">
                  <div className="flex justify-between items-start gap-2"><span className="w-6 h-6 rounded-full bg-primary-ink text-white flex items-center justify-center text-[11px] font-semibold">{r.id}</span><span className="text-[11px] text-mid-gray">{r.prob} · {r.impacto}</span></div>
                  <div className="mt-2 text-[13px] font-semibold text-primary-ink">{r.title}</div>
                  <div className="mt-1 text-[12px] leading-4 text-deep-gray">{r.desc}</div>
                  <div className="mt-2 text-[11px] font-medium text-electric-blue">→ {r.medida}</div>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
