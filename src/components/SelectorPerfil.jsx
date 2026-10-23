import { useState, useEffect } from 'react'

const PERFILES = [
  { id:'alumnado', label:'Alumnado', desc:'Riesgos, quiz y equipo' },
  { id:'familias', label:'Familias', desc:'Acuerdo, DNS, YouTube' },
  { id:'profesorado', label:'Profesorado', desc:'Plan, protocolo, 22 medidas' },
]

export default function SelectorPerfil({ onChange }){
  const [sel, setSel] = useState(()=> localStorage.getItem('perfil') || 'alumnado')
  useEffect(()=> { localStorage.setItem('perfil', sel); onChange?.(sel) }, [sel])

  return (
    <div className="apple-shell py-3">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[11px] font-semibold tracking-[0.06em] text-mid-gray dark:text-[#a1a1a6]">PERFIL:</span>
        <div className="inline-flex p-1 rounded-full bg-canvas dark:bg-[#1c1c1e] border border-hairline/60 dark:border-[#38383a]" role="radiogroup" aria-label="Selector de perfil">
          {PERFILES.map(p=> (
            <button key={p.id} role="radio" aria-checked={sel===p.id} onClick={()=> setSel(p.id)} className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${sel===p.id ? 'bg-primary-ink dark:bg-paper text-white dark:text-black' : 'text-deep-gray dark:text-[#a1a1a6] hover:bg-paper dark:hover:bg-[#2c2c2e]'}`} title={p.desc}>{p.label}</button>
          ))}
        </div>
        <span className="hidden md:inline text-[11px] text-mid-gray dark:text-[#a1a1a6] ml-2">{PERFILES.find(p=> p.id===sel)?.desc}</span>
      </div>
    </div>
  )
}
