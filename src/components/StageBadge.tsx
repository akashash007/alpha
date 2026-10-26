import type { ContactStage } from '../types/contact'

const STAGE_STYLES: Record<ContactStage, string> = {
  Lead: 'bg-[#eceae3] text-ink-soft',
  Prospect: 'bg-[#f3e6d4] text-[#7a4e16]',
  Qualified: 'bg-[#dce8f2] text-[#2a4d63]',
  Customer: 'bg-[#dce8e1] text-[#24503d]',
}

type StageBadgeProps = {
  stage: ContactStage
}

export function StageBadge({ stage }: StageBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium tracking-wide ${STAGE_STYLES[stage]}`}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" aria-hidden />
      {stage}
    </span>
  )
}
