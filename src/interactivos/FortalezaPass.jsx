import { useState, useMemo } from 'react'
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core'
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common'

zxcvbnOptions.setOptions({
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    words: ['IES', 'Manuel', 'Falla', 'Mostoles', '2026', 'EducaMadrid', 'contraseña', 'password']
  }
})

export default function FortalezaPass() {
  const [val, setVal] = useState('')
  const [show, setShow] = useState(false)

  const result = useMemo(() => {
    if (!val) return null
    try { 
      return zxcvbn(val) 
    } catch { 
      return null 
    }
  }, [val])

  const score = result ? result.score : 0 // 0 a 4
  const labels = ['Muy débil', 'Débil', 'Aceptable', 'Buena', 'Fuerte']
  const pct = ((score / 4) * 100)
  const label = labels[score] ?? 'Muy débil'
  
  // Tiempo de crackeo legible
  const crackTime = result?.crackTimesDisplay?.offlineSlowHashing1e4PerSecond ?? '—'

  const hasLen12 = val.length >= 12
  const hasMixed = /[A-Z]/.test(val) && /[a-z]/.test(val)
  const hasSymbol = /[^A-Za-z0-9]/.test(val)

  return (
    <div className="rounded-[28px] bg-canvas p-6 border border-hairline">
      <div className="text-[12px] font-semibold tracking-[0.06em] text-primary-ink">PRUEBA TU CONTRASEÑA</div>
      <p className="text-[12px] leading-5 text-deep-gray mt-1">Análisis real con zxcvbn. No se guarda ni se envía. Todo en tu navegador.</p>
      
      <div className="mt-4 flex gap-2">
        <div className="flex-1 relative">
          <input
            type={show ? 'text' : 'password'}
            value={val}
            onChange={e => setVal(e.target.value)}
            className="w-full rounded-full border border-hairline bg-paper px-4 py-2.5 pr-10 text-[14px] text-primary-ink focus:outline-none focus:border-action-blue"
            placeholder="Escribe una contraseña"
            aria-label="Contraseña a evaluar"
            autoComplete="new-password"
          />
          <button 
            onClick={() => setShow(!show)} 
            className="absolute right-1 top-1 bottom-1 px-3 rounded-full bg-canvas text-[12px] text-primary-ink hover:bg-hairline/30 transition-colors" 
            aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {show ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
      </div>

      <div className="mt-3 h-1.5 rounded-full bg-hairline overflow-hidden" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} aria-label={`Fortaleza: ${label}`}>
        <div 
          className={`h-full transition-all duration-500 ${score === 0 ? 'bg-red-500' : score === 1 ? 'bg-orange-500' : score === 2 ? 'bg-yellow-500' : score === 3 ? 'bg-blue-500' : 'bg-green-500'}`} 
          style={{ width: `${pct}%` }} 
        />
      </div>

      <div className="mt-2 flex justify-between items-center">
        <span className="text-[12px] font-medium text-primary-ink">{label} ({score}/4)</span>
        <span className="text-[11px] text-quiet-dot">Tiempo de crackeo: {crackTime}</span>
      </div>

      {result?.feedback?.warning && (
        <p className="mt-2 text-[11px] text-ember font-medium">{result.feedback.warning}</p>
      )}
      {result?.feedback?.suggestions?.length > 0 && (
        <p className="mt-1 text-[11px] text-deep-gray">{result.feedback.suggestions.join(' ')}</p>
      )}

      <div className="mt-3 flex gap-2 text-[12px]">
        <span className={`px-2.5 py-1 rounded-full border ${hasLen12 ? 'bg-action-blue text-white border-action-blue' : 'bg-paper border-hairline text-quiet-dot'}`}>≥12 car.</span>
        <span className={`px-2.5 py-1 rounded-full border ${hasMixed ? 'bg-action-blue text-white border-action-blue' : 'bg-paper border-hairline text-quiet-dot'}`}>May+min</span>
        <span className={`px-2.5 py-1 rounded-full border ${hasSymbol ? 'bg-action-blue text-white border-action-blue' : 'bg-paper border-hairline text-quiet-dot'}`}>Símbolo</span>
      </div>

      <div className="mt-4 rounded-[16px] bg-paper p-4 border border-hairline">
        <p className="text-[12px] leading-5 text-deep-gray">
          <span className="font-medium text-primary-ink">💡 Truco Diceware:</span> Usa 4 palabras al azar que puedas recordar (ej: <em className="text-primary-ink">correcto caballo batería grapa</em>) + activa el MFA donde sea posible. Evita patrones predecibles como <code className="bg-canvas px-1 rounded">IES-Mostoles-2026!</code>.
        </p>
      </div>
    </div>
  )
}
