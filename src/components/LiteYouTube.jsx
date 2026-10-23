import { useState } from 'react'
import { Play } from '@phosphor-icons/react'

export default function LiteYouTube({ id, title = 'Vídeo de YouTube' }) {
  const [play, setPlay] = useState(false)

  if (play) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full aspect-video rounded-[16px] border border-black/5 dark:border-white/10"
        loading="lazy"
      />
    )
  }

  return (
    <button
      onClick={() => setPlay(true)}
      aria-label={`Reproducir vídeo: ${title}`}
      className="relative group w-full aspect-video rounded-[16px] overflow-hidden border border-black/5 dark:border-white/10 bg-black"
    >
      <img
        src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
        alt={`Miniatura del vídeo: ${title}`}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
        <span className="w-16 h-16 rounded-full bg-paper/90 group-hover:bg-paper flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
          <Play size={28} weight="fill" className="text-primary-ink ml-1" aria-hidden="true" />
        </span>
      </div>
      <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/70 text-white text-[11px] font-medium backdrop-blur">▶ Reproducir</span>
    </button>
  )
}
