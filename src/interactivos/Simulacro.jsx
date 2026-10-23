import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const SCENES = [
  {
    id: 0,
    title: "1/3 — El correo sospechoso",
    text: "Llega a tu @educa.madrid.org: “Tu cuenta será bloqueada hoy. Verifica en educa-madrid-urgente.com”. El remitente no es noreply@g.educa.madrid.org.",
    choices: [
      { label: "Clic y pongo mi contraseña (rápido)", score: 0, feedback: "Has regalado tu cuenta. Dominio con guión + urgencia = phishing." },
      { label: "Paso el ratón, veo dominio raro y reporto a TIC", score: 2, feedback: "Perfecto: verificas remitente y no clicas." },
      { label: "Reenvío a compañeros para avisar", score: 1, feedback: "Buena intención, pero propagas el phish. Mejor reportar." },
    ]
  },
  {
    id: 1,
    title: "2/3 — El mensaje ganador",
    text: "DM de Instagram: “¡Has ganado un iPhone! Paga 1€ aquí: bit.ly/iphone-free-2026”.",
    choices: [
      { label: "Pago 1€, es poco", score: 0, feedback: "Tienda falsa: te suscriben a 40€/mes." },
      { label: "Cierro y bloqueo. Chollo + acortado = estafa", score: 2, feedback: "Exacto. Nunca pagar por un premio no solicitado." },
      { label: "Comparto para que otros ganen", score: 0, feedback: "Multiplicas la estafa." },
    ]
  },
  {
    id: 2,
    title: "3/3 — Sesión abierta",
    text: "En clase, la profe deja su sesión abierta y se va. Necesitas imprimir.",
    choices: [
      { label: "Uso su sesión, es más rápido", score: 0, feedback: "Riesgo 1 del Plan: Sesión abierta. Nunca uses la sesión de otra persona, aunque sea para ayudar. Pide al profesor que la bloquee (Win+L) o la cierre." },
      { label: "Bloqueo Win+L y aviso. Inicio la mía", score: 2, feedback: "Protocolo perfecto." },
      { label: "Cierro todo lo que tiene abierto", score: 1, feedback: "Cierras sin permiso. Mejor bloquear y avisar." },
    ]
  },
]

export default function Simulacro(){
  const [i, setI] = useState(0)
  const [score, setScore] = useState(0)
  const [picked, setPicked] = useState(null)
  const [done, setDone] = useState(false)
  const cur = SCENES[i]

  const choose = (idx)=>{
    if(picked!==null) return
    setPicked(idx)
    setScore(s=> s + cur.choices[idx].score)
  }
  const next = ()=>{
    if(i+1===SCENES.length) setDone(true)
    else { setI(v=> v+1); setPicked(null) }
  }
  const reset = ()=> { setI(0); setScore(0); setPicked(null); setDone(false) }

  const level = score>=5 ? "Cyber-Guardian" : score>=3 ? "Cyber-Aprueba" : "Cyber-Novato"
  const advice = score>=5 ? "Puedes enseñar a tu clase. Recuerda: MFA + Win+L + copias." : score>=3 ? "Vas bien. Repasa: remitente @educa.madrid.org y no compartir cuentas." : "Repasemos lo básico: bloqueo, remitente real y no pagar chollos."

  return (
    <section className="bg-canvas dark:bg-[#000000]" aria-labelledby="sim-title">
      <div className="apple-shell apple-section">
        <div className="text-center">
          <div className="text-[12px] font-semibold tracking-[0.06em] text-electric-blue">TUTORÍA 5′</div>
          <h2 id="sim-title" className="mt-2 text-[32px] md:text-[44px] font-semibold tracking-[-0.02em] text-primary-ink dark:text-[#f5f5f7] leading-none">Hackéame si puedes</h2>
          <p className="mx-auto mt-3 max-w-[560px] text-[14px] leading-6 text-deep-gray dark:text-[#a1a1a6]">Aventura encadenada. Tus decisiones cambian la historia. Todo en el navegador.</p>
        </div>

        <div className="mt-8 max-w-[720px] mx-auto">
          {!done ? (
            <div className="rounded-[28px] bg-paper dark:bg-[#1c1c1e] overflow-hidden border border-hairline/60 dark:border-white/10">
              <div className="px-6 py-4 flex justify-between items-center bg-canvas dark:bg-[#000000] border-b border-hairline/50 dark:border-white/10">
                <span className="text-[11px] font-semibold tracking-[0.06em] text-mid-gray">{cur.title}</span>
                <span className="px-3 py-1 rounded-full bg-primary-ink text-white text-[11px] font-medium">{score} pts</span>
              </div>
              <div className="h-[2px] bg-hairline"><motion.div initial={{width:0}} animate={{width:`${(i/SCENES.length)*100}%`}} className="h-full bg-electric-blue"/></div>
              <div className="p-6 md:p-8">
                <p className="text-[15px] leading-6 font-medium text-primary-ink dark:text-[#f5f5f7]">{cur.text}</p>
                <div className="mt-6 space-y-3">
                  {cur.choices.map((c,idx)=>{
                    const isPicked = picked===idx
                    const otherPicked = picked!==null && !isPicked
                    return (
                      <button key={idx} onClick={()=> choose(idx)} disabled={picked!==null} className={`w-full text-left p-4 rounded-[16px] border flex gap-3 text-[13px] leading-5 ${isPicked ? (c.score===2 ? 'bg-[#eef6ee] border-[#1a7a2e]':'bg-[#fef2f0] border-[#c4281c]') : otherPicked ? 'bg-paper dark:bg-[#1c1c1e] border-hairline dark:border-white/10 opacity-60':'bg-paper dark:bg-[#1c1c1e] border-hairline dark:border-white/10 hover:border-primary-ink'}`}>
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 border ${isPicked ? (c.score===2?'bg-[#1a7a2e] text-white border-[#1a7a2e]':'bg-[#c4281c] text-white border-[#c4281c]'):'bg-paper dark:bg-[#1c1c1e] border-hairline dark:border-white/10 text-primary-ink dark:text-[#f5f5f7]'}`}>{String.fromCharCode(65+idx)}</span>
                        <span className="flex-1 text-primary-ink dark:text-[#f5f5f7]">{c.label}</span>
                        {isPicked && <span className="text-[11px] font-semibold">{c.score===2?'✓':'✕'}</span>}
                      </button>
                    )
                  })}
                </div>
                <AnimatePresence>
                  {picked!==null && (
                    <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} className="mt-5 rounded-[16px] bg-canvas dark:bg-[#000000] p-4">
                      <p className="text-[13px] leading-5 text-primary-ink dark:text-[#f5f5f7]"><span className="font-semibold">{cur.choices[picked].score===2?'¡Bien!':'Atención:'}</span> {cur.choices[picked].feedback}</p>
                      <button onClick={next} className="mt-4 apple-pill bg-electric-blue text-white text-[13px]">{i+1===SCENES.length?'Ver Cyber-Score':'Siguiente escena →'}</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="rounded-[28px] bg-paper dark:bg-[#1c1c1e] border border-hairline/60 dark:border-white/10 p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-electric-blue flex items-center justify-center mx-auto text-white font-semibold">{score}/6</div>
              <h3 className="mt-4 text-[22px] font-semibold text-primary-ink dark:text-[#f5f5f7]">{level}</h3>
              <p className="mt-2 text-[13px] leading-5 text-deep-gray dark:text-[#a1a1a6] max-w-[480px] mx-auto">{advice}</p>
              <div className="mt-6 flex justify-center gap-3 flex-wrap">
                <button onClick={reset} className="apple-pill bg-electric-blue text-white text-[13px]">Repetir aventura</button>
                <a href="#quiz" className="apple-pill bg-paper dark:bg-[#1c1c1e] border border-hairline dark:border-white/10 text-primary-ink dark:text-[#f5f5f7] text-[13px]">Ir al test</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
