import { useState, useEffect, useMemo, useRef } from 'react'
import Fuse from 'fuse.js'
import { MagnifyingGlass, X, ArrowRight } from '@phosphor-icons/react'

const INDEX = [
  { id:'plan', title:'El Plan — 5 prioridades', desc:'Resumen útil RGPD/ENS', href:'#plan', k:'plan prioridades' },
  { id:'dispositivos', title:'Tu equipo — Checklist', desc:'Windows/macOS/iOS/Android', href:'#dispositivos', k:'equipo windows mac ios android' },
  { id:'familia', title:'Familia — Acuerdo', desc:'Mediación DNS familiar', href:'#familia', k:'familia acuerdo dns' },
  { id:'riesgos', title:'Riesgos — Phishing trainer', desc:'Malware, grooming, fake news', href:'#riesgos', k:'riesgos phishing malware' },
  { id:'protocolo', title:'Protocolo — 6 fases', desc:'Si pasa algo, así se actúa', href:'#protocolo', k:'protocolo incidente 017 112' },
  { id:'quiz', title:'Test — ¿Te hackean?', desc:'6 preguntas phishing', href:'#quiz', k:'quiz test' },
  { id:'recursos', title:'Recursos — Guías INCIBE', desc:'Vídeos IS4K, glosario', href:'#recursos', k:'recursos incibe is4k' },
  { id:'tel-017', title:'Llamar 017', desc:'INCIBE ayuda 8-23h — 900 116 117', href:'tel:017', k:'017 incibe ayuda' },
  { id:'tel-112', title:'Llamar 112', desc:'Emergencias', href:'tel:112', k:'112 emergencias' },
]
const fuse = new Fuse(INDEX, { keys:['title','desc','k'], threshold:0.35, includeScore:true })

export default function CommandPalette(){
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const inputRef = useRef(null)
  const triggerRef = useRef(null)
  const dialogRef = useRef(null)
  const results = useMemo(()=> q.trim() ? fuse.search(q).slice(0,6).map(r=>r.item) : INDEX.slice(0,6), [q])

  // Abre/cierra con ⌘K / /
  useEffect(()=>{
    const h = (e)=>{
      if((e.key==='k' && (e.metaKey||e.ctrlKey)) || e.key==='/'){
        if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA') return
        e.preventDefault(); setOpen(v=>!v)
      }
    }
    window.addEventListener('keydown', h); return ()=> window.removeEventListener('keydown', h)
  },[])

  // Focus trap + restaurar foco + Esc
  useEffect(()=>{
    if(!open) return
    const prev = document.activeElement
    // mueve foco al input
    setTimeout(()=> inputRef.current?.focus(), 20)
    // bloquea scroll body
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e)=>{
      if(e.key==='Escape'){ e.preventDefault(); setOpen(false); return }
      if(e.key==='Tab' && dialogRef.current){
        const focusable = dialogRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        const list = Array.from(focusable).filter(el=> !el.hasAttribute('disabled') && el.getAttribute('aria-hidden')!=='true')
        if(list.length===0) return
        const first = list[0], last = list[list.length-1]
        if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus() }
        else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return ()=>{
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      // restaura foco al trigger
      if(prev && prev.focus) prev.focus()
      else triggerRef.current?.focus()
    }
  }, [open])

  const go = (href)=>{
    setOpen(false); setQ('')
    if(href.startsWith('#')) document.querySelector(href)?.scrollIntoView({ behavior:'smooth', block:'start'})
    else window.location.href=href
  }

  return (
    <>
      <button ref={triggerRef} onClick={()=> setOpen(true)} aria-label="Abrir paleta de comandos (⌘K o /)" aria-haspopup="dialog" aria-expanded={open} className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-paper border border-hairline text-[12px] text-mid-gray hover:border-primary-ink/30">
        <MagnifyingGlass size={12} aria-hidden="true"/> Buscar <span className="ml-2 px-1.5 py-0.5 rounded bg-canvas border border-hairline text-[10px]">⌘K</span>
      </button>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[18vh] p-4">
          <div onClick={()=> setOpen(false)} className="absolute inset-0 bg-primary-ink/30 backdrop-blur-[2px]" aria-hidden="true"/>
          <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Paleta de comandos" className="relative w-full max-w-[560px] rounded-[20px] bg-paper border border-hairline shadow-[0_20px_60px_rgba(0,0,0,0.2)] overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-hairline/60">
              <MagnifyingGlass size={14} className="text-mid-gray" aria-hidden="true"/>
              <input ref={inputRef} value={q} onChange={e=> setQ(e.target.value)} placeholder="Salta a Plan, Equipo, 017…" className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-mid-gray" aria-label="Buscar sección"/>
              <button onClick={()=> setOpen(false)} aria-label="Cerrar paleta" className="w-7 h-7 rounded-full bg-canvas flex items-center justify-center hover:bg-cool-wash"><X size={12} weight="bold"/></button>
            </div>
            <ul className="max-h-[320px] overflow-auto p-2" role="listbox" aria-label="Resultados">
              {results.map(r=> (
                <li key={r.id} role="option" aria-selected="false">
                  <button onClick={()=> go(r.href)} className="w-full flex items-center justify-between gap-3 p-3 rounded-[12px] hover:bg-canvas text-left focus-visible:outline-2 focus-visible:outline-action-blue">
                    <div><div className="text-[13px] font-medium text-primary-ink">{r.title}</div><div className="text-[11px] text-mid-gray">{r.desc}</div></div>
                    <ArrowRight size={14} className="text-mid-gray shrink-0" aria-hidden="true"/>
                  </button>
                </li>
              ))}
              {results.length===0 && <li className="p-6 text-center text-[12px] text-mid-gray">Sin resultados — prueba “phishing” o “017”.</li>}
            </ul>
            <div className="px-4 py-2 bg-canvas text-[11px] text-mid-gray flex justify-between"><span>/ o ⌘K para abrir · Esc para cerrar</span><span>↵ para saltar</span></div>
          </div>
        </div>
      )}
    </>
  )
}
