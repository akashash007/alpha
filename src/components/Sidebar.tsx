import { Building2, Kanban, Settings, Users } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'contacts', label: 'Contacts', icon: Users, current: true },
  { id: 'pipeline', label: 'Pipeline', icon: Kanban, current: false },
  { id: 'companies', label: 'Companies', icon: Building2, current: false },
] as const

export function Sidebar() {
  return (
    <aside className="flex w-[72px] shrink-0 flex-col border-r border-white/10 bg-sidebar text-stone-300 lg:w-56">
      <div className="flex h-14 items-center gap-2.5 px-3 lg:px-4">
        <div
          className="flex size-8 items-center justify-center rounded-md bg-accent-muted text-sm font-semibold text-accent"
          aria-hidden
        >
          α
        </div>
        <div className="hidden min-w-0 lg:block">
          <p className="truncate text-[13px] font-semibold tracking-wide text-paper">
            Alpha
          </p>
          <p className="truncate text-[11px] text-stone-500">Workspace</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-2 py-3" aria-label="Primary">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.id}
              href={item.current ? '#contacts' : undefined}
              aria-current={item.current ? 'page' : undefined}
              aria-disabled={!item.current}
              tabIndex={item.current ? 0 : -1}
              className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] ${
                item.current
                  ? 'bg-white/8 text-paper'
                  : 'pointer-events-none text-stone-500'
              }`}
            >
              <Icon className="size-4 shrink-0" strokeWidth={1.75} />
              <span className="hidden lg:inline">{item.label}</span>
            </a>
          )
        })}
      </nav>

      <div className="border-t border-white/10 px-2 py-3">
        <button
          type="button"
          disabled
          className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] text-stone-500"
        >
          <Settings className="size-4 shrink-0" strokeWidth={1.75} />
          <span className="hidden lg:inline">Settings</span>
        </button>
      </div>
    </aside>
  )
}
