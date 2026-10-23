import { useState, useEffect } from 'react'

const SYSTEMS = {
  windows: ["Windows Update al día","Antivirus activo","Firewall activado","BitLocker si datos sensibles","Inicio limpio (sin apps raras)"],
  macos: ["macOS actualizado","FileVault activado","Firewall macOS","Permisos revisados","Coordinación TIC"],
  android: ["Play Protect activo","Permisos revisados","Actualizaciones auto","Family Link si menor","Sin sideload"],
  ios: ["iOS actualizado","Comprobación seguridad","Tiempo de Uso pactado","Código solo adultos","FaceID/código activo"]
}

export default function EquipoProgreso({ system='windows' }){
  const [checks, setChecks] = useState(()=> {
    try{ return JSON.parse(localStorage.getItem('equipo-'+system) || '{}')}catch{ return {}}
  })
  const [error, setError] = useState('')
  useEffect(()=> { try{ localStorage.setItem('equipo-'+system, JSON.stringify(checks))} catch{} }, [checks, system])
  // Cambia de sistema → carga su localStorage
  useEffect(()=> {
    try{ const raw = localStorage.getItem('equipo-'+system); setChecks(raw ? JSON.parse(raw) : {}) } catch{ setChecks({}) }
  }, [system])
  const items = SYSTEMS[system] || SYSTEMS.windows
  const done = Object.values(checks).filter(Boolean).length
  const pct = Math.round((done/items.length)*100)
  const toggle = (i)=> setChecks(s=> ({...s, [i]: !s[i]}))

  const exportPDF = async()=>{
    setError('')
    try {
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF({ unit:'mm', format:'a4' })
      doc.setFillColor(0,113,227); doc.rect(0,0,210,18,'F')
      doc.setTextColor(255,255,255); doc.setFont('helvetica','bold'); doc.setFontSize(10); doc.text(`CERTIFICADO DE REVISIÓN — ${system.toUpperCase()}`,10,11)
      doc.setTextColor(29,29,31); doc.setFontSize(16); doc.text('Equipo revisado',10,32)
      doc.setFontSize(9); doc.setTextColor(112,112,112); doc.text(`${done}/${items.length} puntos completados — ${pct}% — ${new Date().toLocaleDateString('es-ES')}`,10,38)
      items.forEach((t,i)=>{
        const y=48+i*10
        doc.setDrawColor(214,214,214); doc.rect(10,y,6,6)
        if(checks[i]){ doc.setFillColor(0,113,227); doc.rect(11,y+1,4,4,'F') }
        doc.setFontSize(8); doc.setTextColor(29,29,31); doc.text(`${checks[i]?'✓':'○'} ${t}`,20,y+5)
      })
      doc.setFontSize(7); doc.setTextColor(112,112,112); doc.text('Generado en tu navegador — no se envía. IES Manuel de Falla — INCIBE 017',10,285)
      doc.save(`certificado-${system}.pdf`)
    } catch (e) {
      console.error('Error cargando jsPDF', e)
      setError('No se pudo generar el PDF. Comprueba tu conexión o recarga la página.')
    }
  }

  // ¿Estás seguro de borrar los datos guardados en este navegador?
  const borrarDatos = () => {
    if(!window.confirm(`¿Borrar progreso de ${system}?`)) return
    try{ localStorage.removeItem('equipo-'+system) } catch{}
    setChecks({})
  }

  return (
    <div className="rounded-[28px] bg-paper border border-hairline p-6">
      <div className="flex items-center justify-between">
        <h4 className="text-[13px] font-semibold tracking-[0.06em] text-primary-ink">MI EQUIPO — CHECKLIST</h4>
        <div className="relative w-10 h-10">
          <svg viewBox="0 0 36 36" className="w-10 h-10 -rotate-90" aria-hidden="true">
            <circle cx="18" cy="18" r="14" fill="none" stroke="#e8e8ed" strokeWidth="3"/>
            <circle cx="18" cy="18" r="14" fill="none" stroke="#0071e3" strokeWidth="3" strokeDasharray={`${pct*0.88} 100`} strokeLinecap="round"/>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-primary-ink" aria-label={`${pct} por ciento completado`}>{pct}%</span>
        </div>
      </div>
      <div className="mt-1 text-[12px] text-deep-gray capitalize">{system} — {done}/{items.length} completados</div>
      <div className="mt-2 rounded-[10px] bg-[#fff8e1] border border-[#ffe082] px-3 py-2">
        <p className="text-[11px] leading-4 text-[#5d4037]">⚠️ Modo privado: Estos datos se guardan solo en este navegador. Usa un dispositivo personal o bórralos al terminar.</p>
      </div>
      {error && <div role="alert" className="mt-3 rounded-[12px] bg-[#fff0f0] border border-[#ffb3b1] text-[#a01a19] text-[12px] p-3">{error}</div>}
      <ul className="mt-4 space-y-2" role="list">
        {items.map((t,i)=> (
          <li key={i}>
            <label className={`flex items-center gap-3 p-3 rounded-[12px] border cursor-pointer transition-colors ${checks[i]?'bg-[#e8f1ff] border-electric-blue/30':'bg-canvas border-transparent hover:bg-paper hover:border-hairline'}`}>
              <input type="checkbox" checked={!!checks[i]} onChange={()=> toggle(i)} className="w-4 h-4 rounded border-hairline text-electric-blue focus:ring-[#0071e3]" aria-label={t}/>
              <span className={`text-[13px] leading-4 ${checks[i]?'text-primary-ink font-medium':'text-deep-gray'}`}>{t}</span>
              {checks[i] && <span className="ml-auto text-[11px] px-2 py-0.5 rounded-full bg-electric-blue text-white" aria-hidden="true">✓</span>}
            </label>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex gap-2">
        <button onClick={exportPDF} className="flex-1 apple-pill bg-primary-ink text-white text-[12px] text-center">Certificado PDF ↓</button>
        <button onClick={borrarDatos} className="apple-pill bg-paper border border-hairline text-primary-ink text-[12px]">🗑️ Borrar datos locales</button>
      </div>
      <p className="mt-2 text-[11px] text-mid-gray text-center">Guardado en <code className="bg-canvas px-1 rounded">localStorage</code> (no sale del navegador).</p>
    </div>
  )
}
