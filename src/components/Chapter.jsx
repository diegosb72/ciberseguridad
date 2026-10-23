import { Reveal } from './Reveal'

export function ChapterHeader({ kicker, title, desc, align = 'center', id }) {
  return (
    <Reveal>
      <div className={align === 'center' ? 'text-center' : 'text-left'}>
        {kicker && <div className="apple-chapter-label">{kicker}</div>}
        <h2 id={id} className="apple-chapter-title mt-2 mx-auto max-w-[760px]">
          {title}
        </h2>
        {desc && <p className="mx-auto mt-4 max-w-[640px] text-[17px] leading-6 text-deep-gray">{desc}</p>}
      </div>
    </Reveal>
  )
}

export function Chapter({ id, kicker, title, desc, children, bg = 'bg-paper', ariaLabel }) {
  return (
    <section id={id} className={bg} aria-labelledby={id ? `${id}-title` : undefined} aria-label={ariaLabel}>
      <div className="apple-shell apple-section">
        {(kicker || title || desc) && <ChapterHeader kicker={kicker} title={title} desc={desc} id={id ? `${id}-title` : undefined} />}
        {children}
      </div>
    </section>
  )
}
