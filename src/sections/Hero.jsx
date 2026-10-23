// Tu familia, protegida. Sin complicaciones.
import { Reveal, Counter } from '../components/Reveal'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import HeroBackground from '../components/HeroBackground'
import MagneticButton from '../components/MagneticButton'
import EncryptButton from '../components/EncryptButton'

const HERO_BY_PERFIL = {
  alumnado: {
    h1a: 'Tu móvil,',
    h1b: 'a salvo.',
    h1c: 'Sin sustos.',
    desc: 'Tu cuenta, tus fotos, tu grupo. Aprende a protegerlos en 3 minutos — sin tecnicismos, con ejemplos reales.',
    cta1: 'Revisa tu equipo en 3 minutos',
    cta2: 'Pon a prueba tus conocimientos →',
    cta2href: '#simulacro',
    cardKicker: 'PARA TI · ALUMNADO',
    cardTitle: 'Tu cuenta vale más que un like.',
    cardDesc: 'Tu perfil, tu privacidad. Si tu cuenta es pública, cualquiera ve lo que subes. Pon tu cuenta en privado y piensa antes de darle like.',
    badge2: 'CUENTA PRIVADA',
    img: 'assets/hero-alumnado-cuenta.jpg',
    imgAlt: 'Ajustes de privacidad de cuenta en Instagram: cuenta privada y seguridad adolescente',
    imgCaption: 'Tu cuenta · En privado',
  },
  familias: {
    h1a: 'Tu familia,',
    h1b: 'protegida.',
    h1c: 'Sin complicaciones.',
    desc: 'El plan de ciberseguridad del centro, explicado claro. Todo lo que necesitas saber en un solo lugar, para alumnado, familias y profesorado.',
    cta1: 'Crea el acuerdo familiar',
    cta2: 'DNS familiar en 2 min →',
    cta2href: '#familia',
    cardKicker: 'PARA FAMILIAS',
    cardTitle: 'Una sesión abierta es una puerta abierta.',
    cardDesc: 'El riesgo nº1 del Plan: dejar el ordenador desbloqueado en el aula. Cualquiera puede leer tu correo, tus notas o tus exámenes. Solución: Win+L al levantarte.',
    badge2: 'FAMILIA',
    img: 'assets/family-apple.jpg',
    imgAlt: 'Familia colaborando con tablet en casa',
    imgCaption: 'Hogar · Acuerdo familiar',
  },
  profesorado: {
    h1a: 'Tu clase,',
    h1b: 'segura.',
    h1c: 'Sin improvisar.',
    desc: 'Plan, protocolo y ficha listos para actuar. 22 medidas, 6 fases y contacto 017 siempre a mano — sin rodeos, solo lo necesario.',
    cta1: 'Ver protocolo 6 fases',
    cta2: 'Ficha Anexo B ↓',
    cta2href: '#protocolo',
    cardKicker: 'PARA PROFESORADO',
    cardTitle: 'Si pasa algo, así se actúa.',
    cardDesc: 'Detectar, contener, erradicar, recuperar, comunicar y aprender. Aísla el equipo, no destruyas evidencias y avisa a TIC/017.',
    badge2: 'PROTOCOLO',
    img: 'assets/abstract-apple.jpg',
    imgAlt: 'Abstracto de seguridad digital, tonos Apple',
    imgCaption: 'Centro · Protocolo',
  },
}

export default function Hero({ perfil = 'alumnado' }) {
  const cfg = HERO_BY_PERFIL[perfil] || HERO_BY_PERFIL.alumnado
  const imgRef = useRef(null)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [-12, 12])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1])
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(heroProgress, [0, 0.7], [1, 0.92])
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.98])
  return (
    <section ref={heroRef} className="relative bg-paper dark:bg-[#1d1d1f] overflow-hidden" aria-labelledby="hero-title">
      <HeroBackground variant="nodes" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white dark:from-[#1d1d1f]/70 dark:via-[#1d1d1f]/50 dark:to-[#1d1d1f] pointer-events-none" aria-hidden="true" />

      <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="relative apple-shell apple-section">
        <div className="text-center">
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="text-[12px] font-semibold tracking-[0.06em] text-ember dark:text-[#ff8a33]">
            IES MANUEL DE FALLA · MÓSTOLES · PLAN 2026/27 · {perfil.toUpperCase()}
          </motion.p>
        </div>

        <div className="mt-6 text-center">
          <h1 id="hero-title" className="font-semibold tracking-[-0.03em] leading-[0.92] text-primary-ink dark:text-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif', fontSize: 'clamp(44px, 9vw, 96px)', lineHeight: 0.95, letterSpacing: '-0.03em', fontWeight: 600 }}>
            {cfg.h1a}<br />
            <motion.span initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} style={{ color: 'var(--color-link-blue)', display: 'inline-block' }} className="text-link-blue dark:text-[#409cff]">{cfg.h1b}</motion.span>
            <br />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.45 }} className="text-primary-ink dark:text-white font-light" style={{ fontWeight: 300, letterSpacing: '-0.04em' }}>{cfg.h1c}</motion.span>
          </h1>
          <Reveal delay={0.3}>
            <p className="mx-auto mt-6 max-w-[560px] text-[17px] md:text-[19px] leading-7 text-deep-gray dark:text-[#a1a1a6]" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", Inter, sans-serif' }}>{cfg.desc}</p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <MagneticButton href={cfg.cta2href === '#simulacro' ? '#dispositivos' : cfg.cta2href} className="apple-pill bg-action-blue text-white hover:bg-electric-blue shadow-[0_1px_8px_rgba(0,102,204,0.25)]" aria-label={cfg.cta1}>{cfg.cta1}</MagneticButton>
              <EncryptButton text={cfg.cta2} href={cfg.cta2href} className="apple-pill bg-canvas dark:bg-[#1c1c1e] text-primary-ink dark:text-white border border-hairline/60 dark:border-[#38383a] hover:bg-paper dark:hover:bg-[#2c2c2e]" />
            </div>
          </Reveal>
          <div className="mt-4 text-center">
            <a href={import.meta.env.BASE_URL + 'pdfs/Plan_Seguridad_Digital_IES_Manuel_de_Falla-4.pdf'} download="Plan_Seguridad_Digital_IES_Manuel_de_Falla.pdf" className="text-[13px] text-link-blue dark:text-[#409cff] hover:underline underline-offset-4 focus-visible:rounded">Plan oficial (PDF) ↓</a>
            <span className="mx-2 text-hairline" aria-hidden="true">·</span>
            <a href="#plan" className="text-[13px] text-link-blue dark:text-[#409cff] hover:underline underline-offset-4">Ver resumen en 2 min ›</a>
          </div>
          <p className="mt-3 text-[11px] tracking-wide text-mid-gray dark:text-[#a1a1a6]" aria-label="Resumen del plan">5 PRIORIDADES · 22 MEDIDAS · 6 FASES · 9 RIESGOS · 017 SIEMPRE A MANO</p>
        </div>

        <Reveal y={24} delay={0.15}>
          <div className="mt-12 md:mt-16 rounded-[28px] bg-canvas/80 dark:bg-[#1c1c1e]/80 backdrop-blur-[12px] p-4 sm:p-6 md:p-8 overflow-hidden border border-hairline/30 dark:border-[#38383a]">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-paper dark:bg-[#2c2c2e] text-primary-ink dark:text-white text-[11px] font-semibold tracking-[0.04em] border border-hairline dark:border-[#38383a]">{cfg.cardKicker}</span>
                  <span className="px-3 py-1 rounded-full bg-action-blue text-white text-[11px] font-semibold">{cfg.badge2}</span>
                </div>
                <h2 className="mt-4 text-[28px] sm:text-[32px] md:text-[40px] font-semibold leading-none tracking-[-0.02em] text-primary-ink dark:text-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif', fontWeight: 600 }}>
                  {cfg.cardTitle}
                </h2>
                <p className="mt-4 text-[15px] sm:text-[17px] leading-6 text-deep-gray dark:text-[#a1a1a6] max-w-[520px]">{cfg.cardDesc}</p>
                <div className="mt-6 flex flex-wrap gap-2 text-[12px]">
                  <span className="px-3 py-1.5 rounded-full bg-paper dark:bg-[#2c2c2e] border border-hairline dark:border-[#38383a] text-primary-ink dark:text-white font-medium">Phishing · bloqueado</span>
                  <span className="px-3 py-1.5 rounded-full bg-paper dark:bg-[#2c2c2e] border border-hairline dark:border-[#38383a] text-primary-ink dark:text-white font-medium">Ransomware · copias OK</span>
                  <span className="px-3 py-1.5 rounded-full bg-paper dark:bg-[#2c2c2e] border border-hairline dark:border-[#38383a] text-primary-ink dark:text-white font-medium">Cuentas · revisadas</span>
                </div>
                <a href="#dispositivos" className="mt-6 inline-flex text-[14px] font-medium text-link-blue dark:text-[#409cff] hover:underline underline-offset-4 focus-visible:rounded">Tu equipo a punto ›</a>
              </div>

              <div ref={imgRef} className="order-1 lg:order-2">
                <motion.div style={{ y: imgY, scale: imgScale }} className="relative w-full max-w-[560px] mx-auto aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-[28px] bg-paper dark:bg-[#1c1c1e] border border-black/5 dark:border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-none">
                  <img src={import.meta.env.BASE_URL + cfg.img} alt={cfg.imgAlt} className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]" width="600" height="380" loading="eager" fetchPriority="high" />
                  <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white via-white/70 to-transparent dark:from-black dark:via-black/60 dark:to-transparent" aria-hidden="true" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-start items-center">
                    <span className="apple-glass-dark px-3 py-1.5 text-white text-[12px] font-medium">{cfg.imgCaption}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-3 max-w-[640px] mx-auto" role="list" aria-label="Estadísticas del plan">
            <div className="text-center py-4" role="listitem">
              <div className="text-[32px] sm:text-[40px] font-semibold tracking-[-0.02em] text-primary-ink dark:text-white leading-none" style={{ fontWeight: 600 }}><Counter value="9" /></div>
              <div className="mt-1 text-[11px] sm:text-[12px] font-medium tracking-[0.04em] text-mid-gray dark:text-[#a1a1a6] leading-tight uppercase">riesgos<br/>mapeados</div>
            </div>
            <div className="text-center py-4 border-x border-hairline/50 dark:border-[#38383a]" role="listitem">
              <div className="text-[32px] sm:text-[40px] font-semibold tracking-[-0.02em] text-primary-ink dark:text-white leading-none" style={{ fontWeight: 600 }}><Counter value="6" /></div>
              <div className="mt-1 text-[11px] sm:text-[12px] font-medium tracking-[0.04em] text-mid-gray dark:text-[#a1a1a6] leading-tight uppercase">meses<br/>hoja de ruta</div>
            </div>
            <div className="text-center py-4" role="listitem">
              <div className="text-[32px] sm:text-[40px] font-semibold tracking-[-0.02em] text-primary-ink dark:text-white leading-none" style={{ fontWeight: 600 }}><Counter value="017" /></div>
              <div className="mt-1 text-[11px] sm:text-[12px] font-medium tracking-[0.04em] text-mid-gray dark:text-[#a1a1a6] leading-tight uppercase">INCIBE<br/>8-23h</div>
            </div>
          </div>
        </Reveal>
      </motion.div>
    </section>
  )
}
