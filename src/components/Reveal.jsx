import { motion, useInView, useScroll, useTransform } from 'motion/react'
import { useRef, useState, useEffect } from 'react'

// Respeta prefers-reduced-motion
const prefersReduced = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false

export function Reveal({ children, delay = 0, y = 18, className = '', duration = 0.7 }) {
  if (prefersReduced) return <div className={className}>{children}</div>
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function Stagger({ children, stagger = 0.07, className = '' }) {
  if (prefersReduced) return <div className={className}>{children}</div>
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '' }) {
  if (prefersReduced) return <div className={className}>{children}</div>
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 18, scale: 0.98, filter: 'blur(6px)' },
        show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Apple-like parallax + scale on scroll (MacBook page effect)
export function Parallax({ children, className = '', yRange = [-20, 20], scaleRange = [0.98, 1] }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], yRange)
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange)
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])
  if (prefersReduced) return <div ref={ref} className={className}>{children}</div>
  return (
    <motion.div ref={ref} style={{ y, scale, opacity }} className={className}>
      {children}
    </motion.div>
  )
}

// Sticky scrollytelling — pins content while scrolling
export function StickyReveal({ children, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94])
  const y = useTransform(scrollYProgress, [0, 1], [0, -40])
  const blur = useTransform(scrollYProgress, [0, 0.7], ['blur(0px)', 'blur(4px)'])
  if (prefersReduced) return <div className={className}>{children}</div>
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ scale, y, filter: blur }} className="sticky top-[72px]">
        {children}
      </motion.div>
    </div>
  )
}

// Counter animado (para 017, 9 riesgos, 6 meses) — FIX: fallback si inView no dispara, nunca deja 0
export function Counter({ value, className = '' }) {
  const str = String(value)
  const is017 = str === '017'
  if (prefersReduced) return <span className={className} aria-label={str}>{str}</span>
  return <AnimatedNumber n={value} className={className} />
}

function AnimatedNumber({ n, className = '' }) {
  const str = String(n)
  const is017 = str === '017'
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const target = parseInt(str.replace(/\D/g, '')) || 0
  const [display, setDisplay] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(()=>{
    // Fallback máx 900ms: si IntersectionObserver no dispara (transform parent, etc.), muestra valor real
    if (hasAnimated) return
    const fallback = setTimeout(()=> {
      if (!hasAnimated) {
        if (is017) setDisplay(17) // se renderiza como '017' abajo
        else setDisplay(target)
        setHasAnimated(true)
      }
    }, 900)
    return ()=> clearTimeout(fallback)
  }, [hasAnimated, is017, target])

  useEffect(()=>{
    if(!inView || hasAnimated) return
    if(is017){ setDisplay(17); setHasAnimated(true); return }
    let raf, start
    const duration = 900
    const animate = (t)=>{
      if(!start) start = t
      const p = Math.min((t-start)/duration, 1)
      const eased = 1 - Math.pow(1-p, 3)
      setDisplay(Math.round(eased * target))
      if(p<1) raf = requestAnimationFrame(animate)
      else setHasAnimated(true)
    }
    raf = requestAnimationFrame(animate)
    return ()=> cancelAnimationFrame(raf)
  }, [inView, target, is017, hasAnimated])

  return <span ref={ref} className={className} aria-live="polite">{is017 ? '017' : display}</span>
}

// Progress line que se llena al hacer scroll (para hoja de ruta)
export function ScrollProgress({ className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  if (prefersReduced) return null
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ scaleX, transformOrigin: 'left' }} className="h-full bg-electric-blue" />
    </div>
  )
}
