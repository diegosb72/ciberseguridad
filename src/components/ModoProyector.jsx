import { useState, useEffect, useRef } from 'react'
import { ArrowsOutSimple, CaretLeft, CaretRight, X } from '@phosphor-icons/react'

export default function ModoProyector({ children }){
  const [open, setOpen] = useState(false)
  const [idx, setIdx] = useState(0)
  const dialogRef = useRef(null)
  const triggerRef = useRef(null)
  const slides = Array.isArray(children) ? children : [children]

  useEffect(()=>{
    if(!open) return
    const prev = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // Intentar pantalla completa real como promete la UI
    try{ document.documentElement.requestFullscreen?.() }catch(e){}
    // foco inicial al diálogo
    setTimeout(()=> dialogRef.current?.focus(), 20)

    const h = (e)=>{
      if(e.key==='ArrowRight') setIdx(v=> Math.min(slides.length-1, v+1))
      if(e.key==='ArrowLeft') setIdx(v=> Math.max(0, v-1))
      if(e.key==='Escape'){ e.preventDefault(); setOpen(false) }
      // Tab trap
      if(e.key==='Tab' && dialogRef.current){
        const focusable = dialogRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        const list = Array.from(focusable).filter(el=> !el.hasAttribute('disabled'))
        if(list.length===0) return
        const first = list[0], last = list[list.length-1]
        if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus() }
        else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', h)
    return ()=>{
      window.removeEventListener('keydown', h)
      document.body.style.overflow = prevOverflow
      try{ if(document.fullscreenElement) document.exitFullscreen?.() }catch(e){}
      if(prev && prev.focus) prev.focus()
      else triggerRef.current?.focus()
    }
  }, [open, slides.length])

  return (
    <>
      <button ref={triggerRef} onClick={()=> setOpen(true)} aria-haspopup="dialog" aria-expanded={open} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-paper dark:bg-[#1c1c1e] border border-hairline dark:border-white/10 text-[12px] text-primary-ink dark:text-[#f5f5f7] hover:bg-canvas dark:bg-[#000000]">
        <ArrowsOutSimple size={12} weight="bold" aria-hidden="true"/> Modo proyector
      </button>
      {open && (
        <div className="fixed inset-0 z-[90] bg-paper dark:bg-[#1c1c1e] flex flex-col" role="dialog" aria-modal="true" aria-label="Modo proyector — tutoría" ref={dialogRef} tabIndex={-1}>
          <div className="h-11 flex items-center justify-between px-4 border-b border-hairline dark:border-white/10 bg-canvas dark:bg-[#000000]">
            <span className="text-[12px] font-medium text-primary-ink dark:text-[#f5f5f7]">Proyector — {idx+1}/{slides.length} · Flechas ← → · Esc salir</span>
            <button onClick={()=> setOpen(false)} aria-label="Salir de proyector" className="w-8 h-8 rounded-full bg-paper dark:bg-[#1c1c1e] border border-hairline dark:border-white/10 flex items-center justify-center hover:bg-canvas dark:bg-[#000000]"><X size={14} weight="bold"/></button>
          </div>
          <div className="flex-1 flex items-center justify-center p-6 md:p-10 overflow-auto">
            <div className="w-full max-w-[900px] text-[22px] leading-8 md:text-[28px] md:leading-9 text-primary-ink dark:text-[#f5f5f7]" aria-live="polite">
              {slides[idx]}
            </div>
          </div>
          <div className="h-14 flex items-center justify-between px-4 border-t border-hairline dark:border-white/10 bg-canvas dark:bg-[#000000]">
            <button onClick={()=> setIdx(v=> Math.max(0,v-1))} disabled={idx===0} aria-label="Anterior" className="apple-pill bg-paper dark:bg-[#1c1c1e] border border-hairline dark:border-white/10 text-primary-ink dark:text-[#f5f5f7] text-[13px] disabled:opacity-40 flex items-center gap-1"><CaretLeft size={14} weight="bold"/> Anterior</button>
            <div className="flex gap-1.5" aria-hidden="true">{slides.map((_,i)=> <span key={i} aria-hidden="true" className={`w-2 h-2 rounded-full ${i===idx?'bg-primary-ink':'bg-hairline'}`}/>)}</div>
            <button onClick={()=> setIdx(v=> Math.min(slides.length-1, v+1))} disabled={idx===slides.length-1} aria-label="Siguiente" className="apple-pill bg-action-blue text-white text-[13px] flex items-center gap-1 disabled:opacity-40">Siguiente <CaretRight size={14} weight="bold"/></button>
          </div>
        </div>
      )}
    </>
  )
}
