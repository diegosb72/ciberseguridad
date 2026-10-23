import { ThemeProvider } from './components/ThemeProvider'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import PlanCentro from './sections/PlanCentro'
import Dispositivos from './sections/Dispositivos'
import Familia from './sections/Familia'
import Riesgos from './sections/Riesgos'
import Protocolo from './sections/Protocolo'
import Quiz from './sections/Quiz'
import Recursos from './sections/Recursos'
import FortalezaPass from './interactivos/FortalezaPass'
import MatrizRiesgos from './components/MatrizRiesgos'
import ProgresoPlan from './components/ProgresoPlan'
import SelectorPerfil from './components/SelectorPerfil'
import Simulacro from './interactivos/Simulacro'
import Diceware from './interactivos/Diceware'
import EquipoProgreso from './interactivos/EquipoProgreso'
import FichaIncidente from './interactivos/FichaIncidente'
import CommandPalette from './components/CommandPalette'
import ModoProyector from './components/ModoProyector'
import { useState } from 'react'

const SECTION_ORDER = {
  alumnado: ['dispositivos','riesgos','plan','protocolo','familia'],
  familias: ['familia','dispositivos','riesgos','plan','protocolo'],
  profesorado: ['plan','protocolo','dispositivos','riesgos','familia'],
}
const ATAJOS_BY_PERFIL = {
  alumnado: [
    { href: '#dispositivos', label: 'Revisar equipo' },
    { href: '#riesgos', label: 'Riesgos reales' },
    { href: '#simulacro', label: 'Simulacro' },
    { href: '#quiz', label: 'Test', primary: true },
  ],
  familias: [
    { href: '#familia', label: 'Acuerdo familiar' },
    { href: '#dispositivos', label: 'Tu equipo' },
    { href: '#recursos', label: 'Control parental' },
    { href: '#quiz', label: 'Test en familia', primary: true },
  ],
  profesorado: [
    { href: '#plan', label: 'El Plan 22 medidas' },
    { href: '#protocolo', label: 'Protocolo 6 fases' },
    { href: '#ficha', label: 'Ficha Anexo B' },
    { href: '#recursos', label: 'Recursos', primary: true },
  ],
}

export default function App() {
  const [perfil, setPerfil] = useState(()=> localStorage.getItem('perfil') || 'alumnado')
  const [sistema, setSistema] = useState('windows')

  const orden = SECTION_ORDER[perfil] || SECTION_ORDER.alumnado
  const atajos = ATAJOS_BY_PERFIL[perfil] || ATAJOS_BY_PERFIL.alumnado
  const showMatriz = perfil !== 'familias'
  const showProgresoPlan = perfil === 'profesorado'

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <Header />
        <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)]/40">
          <div className="apple-shell flex flex-wrap items-center justify-between gap-2 py-2">
            <SelectorPerfil onChange={setPerfil} />
            <CommandPalette />
          </div>
        </div>
        <main id="main" tabIndex={-1} className="focus:outline-none">
          <Hero perfil={perfil} />

          <nav aria-label="Atajos" className="bg-[var(--bg-primary)] border-y border-[var(--border-color)] dark:border-[#38383a]">
            <div className="apple-shell py-3 flex gap-2 overflow-x-auto no-scrollbar text-[12px]">
              <span className="text-mid-gray dark:text-[#a1a1a6] shrink-0" aria-hidden="true">Atajos {perfil}:</span>
              {atajos.map(a=> (
                <a key={a.href} href={a.href} className={`px-3 py-1 rounded-full shrink-0 focus-visible:rounded-full ${a.primary ? 'bg-action-blue text-white' : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)]'}`}>{a.label}</a>
              ))}
            </div>
          </nav>

          <div className="bg-canvas dark:bg-[#1c1c1e] border-b border-hairline/30 dark:border-[#38383a]">
            <div className="apple-shell py-3 flex flex-wrap items-center gap-2 text-[12px]">
              <span className="px-2.5 py-1 rounded-full bg-primary-ink dark:bg-paper text-white dark:text-black text-[11px] font-semibold">Viendo como {perfil}</span>
              <span className="text-deep-gray dark:text-[#a1a1a6]">
                {perfil==='alumnado' && 'Contenido directo, ejemplos de tu día a día. Usa el simulacro y el test.'}
                {perfil==='familias' && 'Enfocado en casa: acuerdo, límites, DNS y control parental explicado.'}
                {perfil==='profesorado' && 'Vista completa: plan, protocolo y ficha oficial. Para aplicar en el centro.'}
              </span>
            </div>
          </div>

          {orden.map(id=>{
            if(id==='plan') return <PlanCentro key="plan" perfil={perfil} />
            if(id==='dispositivos') return <Dispositivos key="dispositivos" perfil={perfil} />
            if(id==='familia') return <Familia key="familia" perfil={perfil} />
            if(id==='riesgos') return <Riesgos key="riesgos" perfil={perfil} />
            if(id==='protocolo') return <Protocolo key="protocolo" perfil={perfil} />
            return null
          })}

          {showMatriz && <MatrizRiesgos />}

          <section className="bg-[var(--bg-primary)]" aria-labelledby="pass-heading">
            <div className="apple-shell apple-section">
              <div className="grid lg:grid-cols-2 gap-6 items-start">
                <div>
                  <h3 id="pass-heading" className="text-[32px] font-semibold tracking-[-0.02em] text-primary-ink dark:text-white leading-none">Tu contraseña,<br/>¿aguanta?</h3>
                  <p className="mt-3 text-[17px] leading-6 text-deep-gray dark:text-[#a1a1a6] max-w-[520px]">Frases largas + MFA. El medidor viejo valoraba <code className="bg-canvas dark:bg-[#2c2c2e] px-1 rounded">IES-Mostoles-2026!</code> como “Muy fuerte” — ahora usamos Diceware.</p>
                  <div className="mt-6"><Diceware /></div>
                  <details className="mt-4 rounded-[16px] bg-canvas dark:bg-[#1c1c1e] p-4">
                    <summary className="text-[12px] font-semibold text-primary-ink dark:text-white cursor-pointer">Ver medidor clásico (compatibilidad)</summary>
                    <div className="mt-3"><FortalezaPass /></div>
                  </details>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex gap-2 mb-3">
                      {['windows','macos','ios','android'].map(s=> <button key={s} onClick={()=> setSistema(s)} className={`px-3 py-1.5 rounded-full text-[11px] font-medium border capitalize ${sistema===s?'bg-primary-ink dark:bg-paper text-white dark:text-black border-primary-ink dark:border-white':'bg-paper dark:bg-[#1c1c1e] border-hairline dark:border-[#38383a] text-primary-ink dark:text-white'}`}>{s}</button>)}
                    </div>
                    <EquipoProgreso system={sistema} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div id="simulacro"><Simulacro /></div>
          <div className="bg-[var(--bg-primary)] py-6">
            <div className="apple-shell flex justify-center gap-3">
              <ModoProyector>
                <div>“Recibes un correo de soporte@educa-madrid-urgente.com — ¿Qué haces?”</div>
                <div>“Te llega un DM: ¡Has ganado un iPhone! Paga 1€”</div>
                <div>“La profe deja su sesión abierta — ¿Usas su cuenta?”</div>
                <div>“¿Cómo actúas? Parar, asegurar, pedir ayuda”</div>
                <div>“Recuerda: Win+L, MFA y 017”</div>
              </ModoProyector>
              <span className="text-[11px] text-mid-gray dark:text-[#a1a1a6] self-center">Modo proyector para tutoría — flechas ← → y pantalla completa</span>
            </div>
          </div>

          <section id="ficha" className="bg-canvas dark:bg-[#1c1c1e]" aria-labelledby="ficha-title">
            <div className="apple-shell apple-section">
              <h2 id="ficha-title" className="text-[24px] font-semibold text-primary-ink dark:text-white">Ficha de incidente rellenable</h2>
              <p className="mt-2 text-[13px] text-deep-gray dark:text-[#a1a1a6] max-w-[640px]">Guarda borrador en tu navegador y exporta el Anexo B. También disponible plantilla en blanco.</p>
              {perfil==='profesorado' && <p className="mt-2 text-[12px] font-medium text-link-blue dark:text-[#409cff]">→ Recomendado para tu perfil: completa un ejemplo en tutoría.</p>}
              <div className="mt-6 max-w-[720px]"><FichaIncidente /></div>
            </div>
          </section>

          {showProgresoPlan && <ProgresoPlan />}

          <Quiz />
          <Recursos perfil={perfil} />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
