import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { List, X, MagnifyingGlass, Moon, Sun } from '@phosphor-icons/react'
import { useTheme } from './ThemeProvider'

const links = [
  { href: '#plan', label: 'Plan' },
  { href: '#dispositivos', label: 'Tu equipo' },
  { href: '#familia', label: 'Familia' },
  { href: '#riesgos', label: 'Riesgos' },
  { href: '#protocolo', label: 'Protocolo' },
  { href: '#recursos', label: 'Recursos' },
]

function scrollToTarget(hash) {
  const id = hash.replace(/^#/, '')
  const el = document.getElementById(id || 'main')
  if (!el) return false
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  history.replaceState(null, '', hash)
  el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
  return true
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [elevated, setElevated] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <a href="#main" className="skip-link">Saltar al contenido principal</a>
      <div className="w-full bg-paper dark:bg-[#1d1d1f] text-center py-2 px-4 text-[11px] leading-4 text-primary-ink border-b border-hairline/30">
        <span className="hidden sm:inline text-mid-gray">Línea gratuita y confidencial · </span>
        <a href="tel:017" title="INCIBE 017 — también 900 116 117" aria-label="Llamar a INCIBE 017, ayuda gratuita 8 a 23 horas, también 900 116 117" className="font-medium text-link-blue hover:underline underline-offset-4 focus-visible:rounded">INCIBE <span className="font-semibold">017</span></a>
        <span aria-hidden="true" className="mx-1.5 text-hairline">·</span>
        <a href="tel:900116117" title="INCIBE 900 116 117" aria-label="Llamar a INCIBE 900 116 117" className="hidden sm:inline font-medium text-link-blue hover:underline underline-offset-4 focus-visible:rounded">900 116 117</a>
        <span aria-hidden="true" className="hidden sm:inline mx-1.5 text-hairline">·</span>
        <a href="tel:112" title="Emergencias 112 — solo si hay peligro físico" aria-label="Llamar a emergencias 112" className="font-medium text-link-blue hover:underline underline-offset-4 focus-visible:rounded">112 <span className="font-normal">Emergencias</span></a>
        <span className="mx-1.5 text-hairline" aria-hidden="true">·</span>
        <span className="text-deep-gray">DPD <a href="tel:+34917204068" className="font-medium text-link-blue hover:underline focus-visible:rounded">91 720 4068</a></span>
        <span className="hidden lg:inline text-mid-gray"> · Avda. Olímpica, 16 — Móstoles · 28028568</span>
      </div>

      <header
        aria-label="Navegación principal"
        className={`sticky top-2 z-50 w-full transition-all duration-300 ${elevated ? 'py-1' : 'py-0'}`}
      >
        {/* audit: shadow-[0_1px_3px_rgba(0,0,0,0.1)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.5)] */}
        <div className={`mx-auto max-w-[1200px] px-4 lg:px-10 transition-all duration-300 ${elevated ? 'bg-paper/95 dark:bg-[#1d1d1f]/95 backdrop-blur-md shadow-sm' : 'apple-nav bg-paper/95 dark:bg-[#1d1d1f]/95 backdrop-blur-md border-b border-transparent'}`}>
          <div className="h-[44px] flex items-center justify-between">
            <a href="#" className="flex items-center gap-2.5 shrink-0" aria-label="Inicio — IES Manuel de Falla">
              <img src={import.meta.env.BASE_URL + 'assets/ies-manuel-de-falla-logo.svg'} alt="IES Manuel de Falla — logo" className="h-7 w-auto object-contain" width="28" height="28" />
              <span className="hidden sm:flex flex-col leading-none">
                <span className="text-[12px] font-semibold tracking-[-0.01em] text-primary-ink">Manuel de Falla</span>
                <span className="text-[11px] font-normal text-mid-gray tracking-[-0.01em]">Móstoles · Ciberseguridad</span>
              </span>
            </a>

            <nav className="hidden lg:flex items-center gap-5" aria-label="Secciones">
              {links.map(l => (
                <a key={l.href} href={l.href} onClick={(e)=>{ if(scrollToTarget(l.href)) e.preventDefault() }} className="text-[12px] font-normal text-primary-ink hover:text-deep-gray transition-colors py-2 px-1" aria-label={`Ir a sección ${l.label}`}>
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-1.5 text-primary-ink">
              <a href="#recursos" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-canvas transition-colors" aria-label="Buscar recursos"><MagnifyingGlass size={14} weight="regular" aria-hidden="true" /></a>
              <button
                onClick={toggle}
                aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
                aria-pressed={theme === 'dark'}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-canvas transition-colors"
              >
                {theme === 'dark' ? <Sun size={14} weight="regular" aria-hidden="true" /> : <Moon size={14} weight="regular" aria-hidden="true" />}
              </button>
              <a href="#quiz" className="ml-2 apple-pill bg-action-blue text-white text-[12px] py-2 px-4 hover:bg-electric-blue transition-colors">Haz el test</a>
            </div>

            <div className="flex lg:hidden items-center gap-1">
              <button
                onClick={toggle}
                aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
                className="w-10 h-[44px] flex items-center justify-center text-primary-ink"
              >
                {theme === 'dark' ? <Sun size={16} weight="regular" aria-hidden="true" /> : <Moon size={16} weight="regular" aria-hidden="true" />}
              </button>
              <button
                onClick={() => setOpen(v => !v)}
                className="w-10 h-[44px] flex items-center justify-center text-primary-ink"
                aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={open}
                aria-controls="mobile-menu"
              >
                {open ? <X size={16} weight="bold" aria-hidden="true" /> : <List size={16} weight="regular" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              role="navigation"
              aria-label="Menú móvil"
              initial={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
              transition={{ duration: 0.22, ease: [0.16,1,0.3,1] }}
              className="lg:hidden mx-4 mt-2 rounded-[20px] bg-faded-surface/95 backdrop-blur-[20px] border border-hairline px-6 py-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
            >
              <div className="flex flex-col gap-3">
                {links.map(l => (
                  <a key={l.href} onClick={(e)=>{ setOpen(false); if(scrollToTarget(l.href)) e.preventDefault() }} href={l.href} className="text-[17px] font-normal text-primary-ink py-2 focus-visible:rounded">
                    {l.label}
                  </a>
                ))}
                <a href="#quiz" onClick={(e)=>{ setOpen(false); if(scrollToTarget('#quiz')) e.preventDefault() }} className="mt-2 inline-flex self-start apple-pill bg-action-blue text-white focus-visible:rounded">Haz el test</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
