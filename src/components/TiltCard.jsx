import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'

const prefersReduced = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false

export default function TiltCard({ children, className = '', maxTilt = 8, scale = 1.02, glare = true, ...props }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt])
  const rotateY = useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt])
  const springRX = useSpring(rotateX, { stiffness: 300, damping: 20 })
  const springRY = useSpring(rotateY, { stiffness: 300, damping: 20 })

  const glareX = useTransform(x, [-0.5, 0.5], ['0%', '100%'])
  const glareOpacity = useTransform(x, [-0.5, 0, 0.5], [0, 0, 0.15])

  const onMove = (e) => {
    if (prefersReduced) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    x.set(px)
    y.set(py)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  if (prefersReduced) {
    return <div ref={ref} className={className} {...props}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: springRX, rotateY: springRY, transformStyle: 'preserve-3d' }}
      whileHover={{ scale }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`tilt-card ${className}`}
      {...props}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[28px] overflow-hidden"
          style={{ opacity: glareOpacity }}
        >
          <motion.div style={{ left: glareX }} className="absolute inset-y-0 w-[40%] bg-gradient-to-r from-transparent via-white/30 to-transparent blur-[12px] -skew-x-12" />
        </motion.div>
      )}
    </motion.div>
  )
}
