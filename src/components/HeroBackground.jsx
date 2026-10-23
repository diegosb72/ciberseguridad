import { useEffect, useRef } from 'react'

const prefersReduced = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false

// Option A: lightweight canvas — matrix rain very subtle + nodes network
export default function HeroBackground({ variant = 'nodes' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (prefersReduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let raf = 0
    let w = 0, h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    // Network nodes — lightweight
    const N = Math.min(48, Math.floor((w * h) / 18000))
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1.2 + Math.random() * 1.8,
    }))

    // Matrix columns for variant matrix
    const cols = variant === 'matrix' ? Math.floor(w / 14) : 0
    const drops = Array.from({ length: cols }, () => Math.random() * -h)
    const chars = '01'

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      if (variant === 'matrix') {
        ctx.font = '11px ui-monospace, monospace'
        drops.forEach((y, i) => {
          const x = i * 14
          const ch = chars[Math.floor(Math.random() * chars.length)]
          ctx.fillStyle = 'rgba(0,102,204,0.07)'
          ctx.fillText(ch, x, y)
          drops[i] = y > h ? Math.random() * -100 : y + 6 + Math.random() * 8
        })
        // subtle vignette
        const g = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.7)
        g.addColorStop(0, 'rgba(255,255,255,0)')
        g.addColorStop(1, 'rgba(255,255,255,0.85)')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, w, h)
      } else {
        // nodes variant — Apple-like: soft, desaturated, not cyberpunk heavy
        // connections
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x
            const dy = nodes[i].y - nodes[j].y
            const dist = Math.hypot(dx, dy)
            if (dist < 140) {
              const alpha = (1 - dist / 140) * 0.09
              ctx.strokeStyle = `rgba(0,102,204,${alpha})`
              ctx.lineWidth = 0.7
              ctx.beginPath()
              ctx.moveTo(nodes[i].x, nodes[i].y)
              ctx.lineTo(nodes[j].x, nodes[j].y)
              ctx.stroke()
            }
          }
        }
        // nodes
        nodes.forEach(n => {
          n.x += n.vx
          n.y += n.vy
          if (n.x < 0 || n.x > w) n.vx *= -1
          if (n.y < 0 || n.y > h) n.vy *= -1
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(0,102,204,0.14)'
          ctx.fill()
          // outer glow very subtle
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r * 2.2, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(0,102,204,0.04)'
          ctx.fill()
        })
        // wash
        const grad = ctx.createLinearGradient(0, 0, 0, h)
        grad.addColorStop(0, 'rgba(255,255,255,0.0)')
        grad.addColorStop(1, 'rgba(255,255,255,0.55)')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, w, h)
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [variant])

  if (prefersReduced) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: variant === 'matrix' ? 0.35 : 0.55 }}
    />
  )
}
