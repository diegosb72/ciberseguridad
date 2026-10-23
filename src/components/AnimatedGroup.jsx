import { motion } from 'motion/react'

const prefersReduced = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false

// beUI AnimatedGroup equivalent — staggered children with spring
export function AnimatedGroup({ children, stagger = 0.07, delay = 0, className = '', as: Tag = 'div' }) {
  if (prefersReduced) return <Tag className={className}>{children}</Tag>
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedItem({ children, className = '', y = 18 }) {
  if (prefersReduced) return <div className={className}>{children}</div>
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y, scale: 0.98, filter: 'blur(6px)' },
        show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
