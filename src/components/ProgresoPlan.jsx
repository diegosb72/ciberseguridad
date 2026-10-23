import { useState, useEffect } from 'react'
import { medidas22 } from '../data/content'

const STATES = ['Pendiente','En curso','Hecha']
const stateColor = { 'Pendiente':'bg-canvas dark:bg-[#000000] text-mid-gray border-hairline dark:border-white/10', 'En curso':'bg-starlight text-[#8a4a00] border-[#e6c9a0]', 'Hecha':'bg-[#eef6ee] text-[#145623] border-[#9ec99e]' }

export default function ProgresoPlan(){
  const [state, setState] = useState(()=> {
    try{ return JSON.parse(localStorage.getItem('progreso-plan')||'null') || {} }catch{ return {} }
  })
  useEffect(()=> localStorage.setItem('progreso-plan', JSON.stringify(state)), [state])
  const total = medidas22.length
  const done = Object.values(state).filter(v=> v==='Hecha').length
  const doing = Object.values(state).filter(v=> v==='En curso').length
  const pct = Math.round(((done + doing*0.5)/total)*100)

  const cycle = (n)=>{
    const cur = state[n] || 'Pendiente'
    const idx = STATES.indexOf(cur)
    const next = STATES[(idx+1)%STATES.length]
    setState(s=> ({...s, [n]: next}))
  }

  return (
    <section className="bg-paper dark:bg-[#1c1c1e]" aria-labelledby="progreso-title">
      <div className="apple-shell apple-section">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold tracking-[0.06em] text-electric-blue">TRANSPARENCIA</div>
            <h2 id="progreso-title" className="mt-1 text-[24px] md:text-[30px] font-semibold tracking-[-0.02em] text-primary-ink dark:text-[#f5f5f7] leading-none">Progreso del Plan — 22 medidas</h2>
            <p className="mt-2 text-[13px] leading-5 text-deep-gray dark:text-[#a1a1a6] max-w-[560px]">TIC actualiza el estado por commit. Guardado local para tu seguimiento.</p>
          </div>
          <div className="text-right">
            <div className="text-[28px] font-semibold tracking-[-0.02em] text-primary-ink dark:text-[#f5f5f7] leading-none">{pct}%</div>
            <div className="text-[11px] text-mid-gray">{done} hechas · {doing} en curso · {total-done-doing} pendientes</div>
          </div>
        </div>

        <div className="mt-6 h-2 rounded-full bg-canvas dark:bg-[#000000] overflow-hidden border border-hairline/40 dark:border-white/10">
          <div className="h-full bg-electric-blue transition-all duration-700" style={{ width: `${pct}%` }}/>
        </div>

        <div className="mt-6 rounded-[20px] bg-canvas dark:bg-[#000000] p-3 overflow-hidden">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-[13px] min-w-[640px]">
              <thead className="text-[11px] text-mid-gray">
                <tr><th className="text-left px-3 py-2 font-medium">#</th><th className="text-left px-3 py-2 font-medium">Medida</th><th className="text-left px-3 py-2 font-medium">Plazo</th><th className="text-left px-3 py-2 font-medium">Estado</th></tr>
              </thead>
              <tbody className="divide-y divide-[#d6d6d6]/40">
                {medidas22.map(m=> {
                  const s = state[m.n] || 'Pendiente'
                  return (
                    <tr key={m.n} className="bg-paper dark:bg-[#1c1c1e]">
                      <td className="px-3 py-2 text-mid-gray">{m.n}</td>
                      <td className="px-3 py-2 font-medium text-primary-ink dark:text-[#f5f5f7]">{m.title} <span className="ml-2 text-[11px] text-mid-gray">{m.resp}</span></td>
                      <td className="px-3 py-2 text-deep-gray dark:text-[#a1a1a6]">{m.plazo}</td>
                      <td className="px-3 py-2"><button onClick={()=> cycle(m.n)} className={`px-3 py-1 rounded-full text-[11px] font-medium border ${stateColor[s]}`} aria-label={`Cambiar estado de ${m.title} actualmente ${s}`}>{s}</button></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
