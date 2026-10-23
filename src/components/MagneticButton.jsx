import { motion, useMotionValue, useSpring } from 'motion/react'
import { useRef } from 'react'

const prefersReduced = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false

export default function MagneticButton({ children, className = '', strength = 0.25, ...props }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const onMove = (e) => {
    if (prefersReduced) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  if (prefersReduced) {
    return <a ref={ref} className={className} {...props}>{children}</a>
  }

  return (
    <motion.a
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: springX, y: springY }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  )
}

export function MagneticButtonEl({ children, className = '', strength = 0.25, ...props }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })
  const onMove = (e) => {
    if (prefersReduced) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }
  const onLeave = () => { x.set(0); y.set(0) }
  if (prefersReduced) return <button ref={ref} className={className} {...props}>{children}</button>
  return (
    <motion.button ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ x: springX, y: springY }} className={className} {...props}>
      {children}
    </motion.button>
  )
}
