import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { quiz } from '../data/content'

export default function Quiz() {
  const [i,setI]=useState(0); const [ans,setAns]=useState(null); const [score,setScore]=useState(0); const [done,setDone]=useState(false)
  const [shuffled, setShuffled] = useState(()=> quiz.map(q=>{
    const idxs = q.opts.map((_,i)=>i)
    // Fisher-Yates con crypto
    const arr = new Uint32Array(idxs.length)
    try{ crypto.getRandomValues(arr) }catch{ for(let k=0;k<arr.length;k++) arr[k]=Math.floor(Math.random()*1000) }
    for(let k=idxs.length-1;k>0;k--){ const j=arr[k]% (k+1); [idxs[k], idxs[j]]=[idxs[j],idxs[k]] }
    const newOpts = idxs.map(ii=> q.opts[ii])
    const newOk = idxs.indexOf(q.ok)
    return { ...q, opts: newOpts, ok: newOk }
  }))
  const cur=shuffled[i]
  const pick=(idx)=>{ if(ans!==null) return; setAns(idx); if(idx===cur.ok) setScore(s=>s+1) }
  const next=()=>{ if(i+1===shuffled.length) setDone(true); else { setI(i+1); setAns(null)}}
  const reset=()=>{
    setShuffled(quiz.map(q=>{
      const idxs = q.opts.map((_,i)=>i)
      const arr = new Uint32Array(idxs.length)
      try{ crypto.getRandomValues(arr) }catch{ for(let k=0;k<arr.length;k++) arr[k]=Math.floor(Math.random()*1000) }
      for(let k=idxs.length-1;k>0;k--){ const j=arr[k]% (k+1); [idxs[k], idxs[j]]=[idxs[j],idxs[k]] }
      const newOpts = idxs.map(ii=> q.opts[ii])
      const newOk = idxs.indexOf(q.ok)
      return { ...q, opts: newOpts, ok: newOk }
    }))
    setI(0); setAns(null); setScore(0); setDone(false)
  }

  return (
    <section id="quiz" className="bg-paper dark:bg-[#1c1c1e]">
      <div className="apple-shell apple-section">
        <div className="text-center">
          <div className="text-[12px] font-semibold tracking-[0.06em] text-electric-blue">INTERACTIVO</div>
          <h2 className="mt-2 text-[32px] md:text-[40px] font-semibold tracking-[-0.02em] leading-none text-primary-ink dark:text-[#f5f5f7]">¿Te hackean?<br/>Ponte a prueba.</h2>
          <p className="mx-auto mt-4 max-w-[640px] text-[17px] leading-6 text-deep-gray dark:text-[#a1a1a6]">6 situaciones reales del instituto. Elige qué harías y te decimos por qué.</p>
        </div>

        <div className="mt-8 max-w-[720px] mx-auto">
          {!done ? (
            <div className="rounded-[28px] bg-canvas dark:bg-[#000000] p-2">
              <div className="rounded-[20px] bg-paper dark:bg-[#1c1c1e] overflow-hidden">
                <div className="px-6 py-4 flex justify-between items-center" role="status" aria-live="polite">
                  <span className="text-[12px] font-semibold tracking-[0.06em] text-mid-gray">PREGUNTA {i+1} / {shuffled.length}</span>
                  <span className="px-3 py-1 rounded-full bg-primary-ink text-white text-[12px] font-medium" aria-label={`${score} aciertos`}>{score} aciertos</span>
                </div>
                <div className="h-[2px] bg-hairline" role="progressbar" aria-valuenow={i} aria-valuemin={0} aria-valuemax={shuffled.length}><motion.div initial={{width:0}} animate={{width:`${(i/shuffled.length)*100}%`}} className="h-full bg-electric-blue" /></div>
                <div className="p-6 md:p-8">
                  <h3 className="text-[17px] leading-6 font-medium text-primary-ink dark:text-[#f5f5f7]" id={`q-${i}`}>{cur.q}</h3>
                  <div className="mt-6 space-y-3" role="radiogroup" aria-labelledby={`q-${i}`}>
                    {cur.opts.map((o,idx)=>{
                      const isPicked=ans===idx, isOk=idx===cur.ok
                      let cls='bg-paper dark:bg-[#1c1c1e] border-hairline dark:border-white/10 hover:border-primary-ink/30'
                      if(ans!==null){ if(isOk) cls='bg-canvas dark:bg-[#000000] border-primary-ink' ; else if(isPicked) cls='bg-paper dark:bg-[#1c1c1e] border-hairline dark:border-white/10 opacity-60' }
                      return (
                        <button key={idx} onClick={()=>pick(idx)} role="radio" aria-checked={ans===idx} aria-label={`Opción ${String.fromCharCode(65+idx)}: ${o}`} className={`w-full text-left p-4 rounded-[16px] border flex gap-3 items-center text-[14px] leading-5 text-primary-ink dark:text-[#f5f5f7] ${cls}`}>
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold shrink-0 border ${ans!==null && isOk ? 'bg-primary-ink text-white border-primary-ink' : 'bg-paper dark:bg-[#1c1c1e] border-hairline dark:border-white/10 text-primary-ink dark:text-[#f5f5f7]'}`} aria-hidden="true">{String.fromCharCode(65+idx)}</span>
                          {o}
                        </button>
                      )
                    })}
                  </div>
                  <AnimatePresence>
                    {ans!==null && (
                      <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="mt-6 rounded-[16px] bg-canvas dark:bg-[#000000] p-4" role="status" aria-live="polite">
                        <div className="text-[14px] leading-5 text-primary-ink dark:text-[#f5f5f7]"><span aria-hidden="true">{ans===cur.ok ? '✓ Bien — ' : '✕ No — '}</span>{cur.why}</div>
                        <button onClick={next} className="mt-4 apple-pill bg-electric-blue text-white text-[14px]">{i+1===shuffled.length ? 'Ver resultado' : 'Siguiente'} ›</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-[28px] bg-canvas dark:bg-[#000000] p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-electric-blue flex items-center justify-center mx-auto text-white font-semibold" aria-label={`Puntuación ${score} de ${shuffled.length}`}>{score}/{shuffled.length}</div>
              <h3 className="mt-4 text-[24px] font-semibold text-primary-ink dark:text-[#f5f5f7]">{score===shuffled.length ? 'Imparable.' : score>=4 ? 'Muy bien.' : 'Vas por buen camino.'}</h3>
              <p className="mt-2 text-[14px] leading-5 text-deep-gray dark:text-[#a1a1a6]">{score===shuffled.length ? 'Todas correctas.' : score>=4 ? 'Te faltó poco.' : 'Empieza por lo básico: bloqueo, actualizaciones y no compartir cuentas.'}</p>
              <div className="mt-6 flex justify-center gap-3">
                <button onClick={reset} className="apple-pill bg-electric-blue text-white text-[12px]">Repetir test</button>
                <a href="#dispositivos" className="apple-pill bg-paper dark:bg-[#1c1c1e] border border-hairline dark:border-white/10 text-primary-ink dark:text-[#f5f5f7] text-[12px]">Revisar equipo</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
