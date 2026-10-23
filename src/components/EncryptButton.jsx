import { useState, useRef } from 'react'

const CHARS = '!<>-_\\/[]{}—=+*^?#________'
const prefersReduced = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false

export default function EncryptButton({ text = 'Empezar simulacro', className = '', href, onClick, ...props }) {
  const [display, setDisplay] = useState(text)
  const intervalRef = useRef(null)

  const scramble = () => {
    if (prefersReduced) return
    let iteration = 0
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setDisplay(prev =>
        text.split('').map((letter, idx) => {
          if (idx < iteration) return text[idx]
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')
      )
      if (iteration >= text.length) clearInterval(intervalRef.current)
      iteration += 1 / 2
    }, 28)
  }
  const reset = () => {
    clearInterval(intervalRef.current)
    setDisplay(text)
  }

  const Tag = href ? 'a' : 'button'
  return (
    <Tag
      href={href}
      onClick={onClick}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      onFocus={scramble}
      onBlur={reset}
      className={`encrypt-text inline-flex items-center justify-center ${className}`}
      {...props}
    >
      {display}
    </Tag>
  )
}
