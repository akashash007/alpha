import { Columns3, Table2 } from 'lucide-react'
import type { AppView } from '../types/contact'

type ViewSwitcherProps = {
  view: AppView
  onChange: (view: AppView) => void
}

const OPTIONS: { id: AppView; label: string; icon: typeof Table2 }[] = [
  { id: 'table', label: 'Table', icon: Table2 },
  { id: 'board', label: 'Board', icon: Columns3 },
]

export function ViewSwitcher({ view, onChange }: ViewSwitcherProps) {
  return (
    <div
      className="inline-flex rounded-md border border-line bg-paper p-0.5"
      role="tablist"
      aria-label="Contact views"
    >
      {OPTIONS.map((option) => {
        const Icon = option.icon
        const selected = view === option.id
        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(option.id)}
            className={`inline-flex items-center gap-1.5 rounded-[5px] px-2.5 py-1.5 text-[13px] font-medium ${
              selected
                ? 'bg-accent text-paper shadow-sm'
                : 'text-muted hover:bg-canvas hover:text-ink'
            }`}
          >
            <Icon className="size-3.5" strokeWidth={1.75} />
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
