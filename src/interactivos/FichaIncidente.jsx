import { useState, useEffect } from 'react'

const defaultData = {
  fecha: '', hora:'', informante:'', equipo:'', descripcion:'', datos:'no', gravedad:'Media', acciones:'', firmas:''
}

export default function FichaIncidente(){
  const [data, setData] = useState(()=> {
    try{ const raw = localStorage.getItem('ficha-incidente'); if(raw) return JSON.parse(raw); return defaultData } catch{ return defaultData }
  })
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  useEffect(()=>{
    try { localStorage.setItem('ficha-incidente', JSON.stringify(data)) } catch {}
    setSaved(true); const t=setTimeout(()=> setSaved(false), 1200); return ()=> clearTimeout(t)
  }, [data])

  const update = (k,v)=> setData(s=> ({...s, [k]:v}))

  const exportPDF = async()=>{
    setError('')
    try {
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF({ unit:'mm', format:'a4' })
      doc.setFillColor(0,51,120); doc.rect(0,0,210,16,'F')
      doc.setTextColor(255,255,255); doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.text('FICHA DE INCIDENTE — ANEXO B',10,10)
      doc.setTextColor(29,29,31)
      const fields = [
        ['Fecha', data.fecha], ['Hora', data.hora], ['Informante', data.informante],
        ['Equipo / Cuenta', data.equipo], ['Descripción', data.descripcion],
        ['¿Datos personales?', data.datos], ['Gravedad', data.gravedad],
        ['Acciones tomadas', data.acciones], ['Firmas / Contactos', data.firmas]
      ]
      let y=24
      doc.setFontSize(7); doc.setTextColor(112,112,112); doc.text('Rellena a mano o desde este formulario. No se envía a servidores.',10,y); y+=6
      fields.forEach(([label, val])=>{
        doc.setDrawColor(214,214,214); doc.setFillColor(245,245,247); doc.roundedRect(10,y,190,14,2,2,'FD')
        doc.setFont('helvetica','bold'); doc.setFontSize(7); doc.setTextColor(29,29,31); doc.text(label.toUpperCase()+':',12,y+6)
        doc.setFont('helvetica','normal'); doc.text(String(val||'—').slice(0,90), 42, y+6)
        doc.setFontSize(6); doc.setTextColor(112,112,112); doc.text(val? '' : 'Escríbelo aquí',14, y+11)
        y+=18
        if(y>270){ doc.addPage(); y=20 }
      })
      doc.setFontSize(6); doc.text('INCIBE 017 · 112 · DPD protecciondatos.educacion@madrid.org · Plantilla Anexo B',10,285)
      doc.save('ficha-incidente.pdf')
    } catch (e) {
      console.error('Error cargando jsPDF', e)
      setError('No se pudo generar el PDF. Comprueba tu conexión o recarga la página.')
    }
  }

  // ¿Estás seguro de borrar los datos guardados en este navegador?
  const borrarDatos = () => {
    if (!window.confirm('¿Borrar todos los datos guardados de la ficha? Esta acción no se puede deshacer.')) return
    try { localStorage.removeItem('ficha-incidente') } catch {}
    setData(defaultData)
    setError('')
  }

  return (
    <div className="rounded-[28px] bg-paper border border-hairline p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[15px] font-semibold text-primary-ink">Ficha de incidente (rellenable)</h3>
        <span className={`text-[11px] px-2 py-1 rounded-full border ${saved ? 'bg-[#e8f5e0] border-[#a8c9a0] text-[#1a5c1a]':'bg-canvas border-transparent text-mid-gray'}`}>{saved ? 'Guardado ✓' : 'Borrador local'}</span>
      </div>
      <div className="mt-3 rounded-[12px] bg-[#fff8e1] border border-[#ffe082] px-3 py-2 flex gap-2">
        <span aria-hidden="true">⚠️</span>
        <p className="text-[11px] leading-4 text-[#5d4037]">⚠️ Modo privado: Estos datos se guardan solo en este navegador. Usa un dispositivo personal o bórralos al terminar.</p>
      </div>
      <p className="mt-2 text-[12px] leading-5 text-deep-gray">Se guarda en tu navegador. Exporta el PDF del Anexo B o descarga la plantilla en blanco.</p>
      {error && <div role="alert" className="mt-3 rounded-[12px] bg-[#fff0f0] border border-[#ffb3b1] text-[#a01a19] text-[12px] p-3">{error}</div>}
      <div className="mt-4 grid md:grid-cols-2 gap-3">
        <label htmlFor="ficha-fecha" className="block"><span className="text-[11px] font-medium text-primary-ink">Fecha</span><input id="ficha-fecha" value={data.fecha} onChange={e=> update('fecha', e.target.value)} type="date" aria-label="Fecha del incidente" className="mt-1 w-full rounded-[10px] border border-hairline bg-paper px-3 py-2 text-[13px]"/></label>
        <label htmlFor="ficha-hora" className="block"><span className="text-[11px] font-medium text-primary-ink">Hora</span><input id="ficha-hora" value={data.hora} onChange={e=> update('hora', e.target.value)} type="time" aria-label="Hora del incidente" className="mt-1 w-full rounded-[10px] border border-hairline bg-paper px-3 py-2 text-[13px]"/></label>
        <label htmlFor="ficha-informante" className="block"><span className="text-[11px] font-medium text-primary-ink">Quién informa</span><input id="ficha-informante" value={data.informante} onChange={e=> update('informante', e.target.value)} placeholder="Nombre, curso/rol" aria-label="Nombre de quien informa" className="mt-1 w-full rounded-[10px] border border-hairline bg-paper px-3 py-2 text-[13px] placeholder:text-mid-gray"/></label>
        <label htmlFor="ficha-equipo" className="block"><span className="text-[11px] font-medium text-primary-ink">Equipo / Cuenta</span><input id="ficha-equipo" value={data.equipo} onChange={e=> update('equipo', e.target.value)} placeholder="PC Aula 2B, @educa.madrid.org" aria-label="Equipo o cuenta afectada" className="mt-1 w-full rounded-[10px] border border-hairline bg-paper px-3 py-2 text-[13px]"/></label>
        <label htmlFor="ficha-desc" className="block md:col-span-2"><span className="text-[11px] font-medium text-primary-ink">Qué pasó (no toques evidencias)</span><textarea id="ficha-desc" value={data.descripcion} onChange={e=> update('descripcion', e.target.value)} rows={3} placeholder="¿Qué pasó, cuándo y qué afecta? Anota todo." aria-label="Descripción del incidente" className="mt-1 w-full rounded-[12px] border border-hairline bg-paper px-3 py-2 text-[13px] resize-none"/></label>
        <label htmlFor="ficha-datos" className="block"><span className="text-[11px] font-medium text-primary-ink">¿Datos personales?</span>
          <select id="ficha-datos" value={data.datos} onChange={e=> update('datos', e.target.value)} aria-label="¿Hay datos personales afectados?" className="mt-1 w-full rounded-[10px] border border-hairline bg-paper px-3 py-2 text-[13px]"><option>no</option><option>posible</option><option>sí — notificar AEPD 72h</option></select>
        </label>
        <label htmlFor="ficha-gravedad" className="block"><span className="text-[11px] font-medium text-primary-ink">Gravedad</span>
          <select id="ficha-gravedad" value={data.gravedad} onChange={e=> update('gravedad', e.target.value)} aria-label="Gravedad del incidente" className="mt-1 w-full rounded-[10px] border border-hairline bg-paper px-3 py-2 text-[13px]"><option>Baja</option><option>Media</option><option>Alta</option><option>Crítica</option></select>
        </label>
        <label htmlFor="ficha-acciones" className="block md:col-span-2"><span className="text-[11px] font-medium text-primary-ink">Acciones ya tomadas</span><textarea id="ficha-acciones" value={data.acciones} onChange={e=> update('acciones', e.target.value)} rows={2} placeholder="Aislado red, fotos, avisado TIC..." aria-label="Acciones ya tomadas" className="mt-1 w-full rounded-[12px] border border-hairline bg-paper px-3 py-2 text-[13px] resize-none"/></label>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={exportPDF} className="apple-pill bg-electric-blue text-white text-[13px]">Exportar PDF (Anexo B) ↓</button>
        <a href={import.meta.env.BASE_URL + 'pdfs/plantilla-ficha-incidente.pdf'} download className="apple-pill bg-paper border border-hairline text-primary-ink text-[13px]">Plantilla en blanco</a>
        <button onClick={borrarDatos} className="apple-pill bg-canvas text-primary-ink text-[13px]" aria-label="Borrar todos los datos locales de la ficha">🗑️ Borrar datos locales</button>
      </div>
    </div>
  )
}
