{/* group relative rounded-[28px] bg-paper dark:bg-[#1c1c1e] border border-hairline dark:border-white/10 p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 */}
  <div className="group relative rounded-[28px] bg-paper dark:bg-[#1c1c1e] border border-hairline dark:border-white/10 p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 hidden">hidden card</div>
{/* max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 */}
{/* py-16 md:py-24 bg-canvas dark:bg-[#000000] transition-colors duration-300 */}
  <div className="py-16 md:py-24 bg-canvas dark:bg-[#000000] transition-colors duration-300 hidden"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">hidden</div></div>
import { Reveal } from '../components/Reveal'
import { AnimatedGroup, AnimatedItem } from '../components/AnimatedGroup'
import TiltCard from '../components/TiltCard'
import { WindowsLogo, AppleLogo, DeviceMobile, AndroidLogo } from '@phosphor-icons/react'

const systems = [
  {
    id: 'windows',
    label: 'Windows',
    icon: WindowsLogo,
    points: ['Actualiza todo en Windows Update', 'Seguridad de Windows: antivirus activo, firewall on', 'Si un juego pide desactivar firewall, cancela — es malware'],
    mock: 'windows',
  },
  {
    id: 'macos',
    label: 'macOS',
    icon: AppleLogo,
    points: ['Actualiza macOS + revisa permisos Cámara/Micrófono', 'Activa FileVault para cifrar el disco', 'Coordina con TIC antes de tocar seguridad'],
    mock: 'macos',
  },
  {
    id: 'ios',
    label: 'iPhone · iPad',
    icon: DeviceMobile,
    points: ['Actualiza iOS, revisa Comprobación de seguridad', 'Tiempo de Uso pactado — ojo al truco “Pedir más tiempo”', 'Código solo de adultos + revisión semanal'],
    mock: 'ios',
  },
  {
    id: 'android',
    label: 'Android',
    icon: AndroidLogo,
    points: ['Play Protect activo, revisa permisos', 'Family Link con acuerdo familiar explicado', 'Sin sideload — solo Play Store'],
    mock: 'android',
  },
]

export default function Dispositivos() {
  return (
    <section id="dispositivos" className="bg-paper dark:bg-[#1c1c1e]" aria-labelledby="equipo-title">
      <div className="apple-shell apple-section">
        <Reveal>
          <div className="text-center">
            <div className="apple-chapter-label" style={{ color: 'var(--color-mid-gray)' }}>CAPÍTULO · TU EQUIPO</div>
            <h2 id="equipo-title" className="apple-chapter-title mt-2">
              A punto,<br/><span className="font-light">en 3 minutos.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[640px] text-[17px] leading-6 text-deep-gray dark:text-[#a1a1a6]">
              Lo esencial por sistema, dentro de marcos reales de dispositivo. Sin tecnicismos. Si ves algo raro — app que no instalaste, antivirus off — avisa a TIC.
            </p>
          </div>
        </Reveal>

        <AnimatedGroup stagger={0.07} className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {systems.map(s => {
            const Icon = s.icon
            return (
              <AnimatedItem key={s.id}>
                <TiltCard maxTilt={6} className="rounded-[28px] bg-canvas dark:bg-[#000000] overflow-hidden border border-hairline/30 dark:border-white/10 h-full flex flex-col">
                  <div className="p-6 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-paper dark:bg-[#1c1c1e] border border-hairline dark:border-white/10 flex items-center justify-center">
                        <Icon size={14} weight="fill" className="text-primary-ink dark:text-[#f5f5f7]" aria-hidden="true" />
                      </span>
                      <span className="text-[13px] font-semibold text-primary-ink dark:text-[#f5f5f7]">{s.label}</span>
                    </div>
                    <ul className="mt-4 space-y-2.5" role="list">
                      {s.points.map((p,i)=>(
                        <li key={i} className="flex gap-2.5 text-[13px] leading-5 text-primary-ink dark:text-[#f5f5f7]">
                          <span className="mt-[9px] w-1 h-1 rounded-full bg-action-blue shrink-0" aria-hidden="true" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto p-3">
                    <div className={`relative bg-paper dark:bg-[#1c1c1e] rounded-[16px] border border-hairline/40 dark:border-white/10 overflow-hidden shadow-sm ${s.mock==='ios' ? 'mx-auto max-w-[160px]' : ''}`}>
                      {/* Window chrome */}
                      <div className="h-7 bg-canvas dark:bg-[#000000] border-b border-hairline/40 dark:border-white/10 flex items-center px-3 gap-1.5">
                        {s.mock !== 'ios' ? (
                          <>
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] border border-[#e0443e]" aria-hidden="true" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] border border-[#dea123]" aria-hidden="true" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] border border-[#1aab29]" aria-hidden="true" />
                            <span className="ml-2 text-[10px] font-medium text-mid-gray truncate">{s.label} · Checklist · 2/3 OK</span>
                          </>
                        ) : (
                          <>
                            <span className="mx-auto w-12 h-1 rounded-full bg-primary-ink opacity-80" aria-hidden="true" />
                          </>
                        )}
                      </div>
                      <div className="p-3 space-y-2">
                        {s.points.slice(0,2).map((p,i)=>(
                          <div key={i} className="flex items-center gap-2 rounded-[10px] bg-canvas dark:bg-[#000000] px-2.5 py-2">
                            <span className="w-4 h-4 rounded-full bg-action-blue text-white flex items-center justify-center text-[9px] font-bold">✓</span>
                            <span className="text-[11px] leading-tight text-primary-ink dark:text-[#f5f5f7] truncate">{p}</span>
                          </div>
                        ))}
                        <div className="flex gap-1.5 pt-1">
                          <span className="flex-1 h-1.5 rounded-full bg-action-blue" aria-hidden="true" />
                          <span className="flex-1 h-1.5 rounded-full bg-cool-wash" aria-hidden="true" />
                          <span className="flex-1 h-1.5 rounded-full bg-cool-wash" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </AnimatedItem>
            )
          })}
        </AnimatedGroup>

        <Reveal delay={0.1}>
          <div className="mt-6 rounded-[16px] bg-canvas dark:bg-[#000000] px-4 py-3 text-center text-[12px] leading-5 text-mid-gray border border-hairline/20 dark:border-white/10">
            Un solo antivirus activo. Dos se estorban. · Tutoriales: <a href="https://support.microsoft.com/es-es" target="_blank" rel="noreferrer" className="text-link-blue hover:underline focus-visible:rounded">Windows Update</a> · <a href="https://support.apple.com/es-es" target="_blank" rel="noreferrer" className="text-link-blue hover:underline focus-visible:rounded">Soporte Apple</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
