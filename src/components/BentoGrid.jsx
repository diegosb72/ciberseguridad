import TiltCard from './TiltCard'
import { ShieldCheck, Copy, LockKey, FolderLock, Broadcast } from '@phosphor-icons/react'

const ICONS = {
  ShieldCheck, Copy, LockKey, FolderLock, Broadcast
}

export function BentoGrid({ items }) {
  return (
    <div className="bento-grid mt-10">
      {items.map((item, i) => {
        const Icon = item.icon ? ICONS[item.icon] : null
        const sizeClass =
          i === 0 ? 'bento-card--large' :
          i === 1 || i === 2 ? 'bento-card--medium' :
          'bento-card--small'
        return (
          <TiltCard key={item.n} className={`bento-card ${sizeClass} border border-hairline/50`}>
            <div className={`w-full h-3 rounded-full mb-4 ${item.colorClass}`} aria-hidden="true" />
            <div className="flex items-start justify-between gap-3">
              <div className="text-[12px] font-semibold tracking-[0.08em] text-mid-gray">{item.n}</div>
              {Icon && <Icon size={20} weight="bold" className="text-primary-ink shrink-0" aria-hidden="true" />}
            </div>
            <h3 className="mt-2 text-[21px] font-semibold leading-tight tracking-[0.011em] text-primary-ink">{item.title}</h3>
            <p className="mt-2 text-[14px] leading-5 text-deep-gray flex-1">{item.desc}</p>
            {item.stat && (
              <div className="mt-4 pt-4 border-t border-hairline/40">
                <div className="text-[28px] font-semibold tracking-[-0.02em] leading-none text-primary-ink">{item.stat.value}</div>
                <div className="text-[11px] text-mid-gray mt-1">{item.stat.label}</div>
              </div>
            )}
          </TiltCard>
        )
      })}
    </div>
  )
}
