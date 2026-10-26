import { ChevronRight, Search } from 'lucide-react'
import { ViewSwitcher } from './ViewSwitcher'
import type { AppView } from '../types/contact'

type WorkspaceHeaderProps = {
  view: AppView
  onViewChange: (view: AppView) => void
  query: string
  onQueryChange: (query: string) => void
  totalCount: number
  visibleCount: number
}

export function WorkspaceHeader({
  view,
  onViewChange,
  query,
  onQueryChange,
  totalCount,
  visibleCount,
}: WorkspaceHeaderProps) {
  const countLabel =
    query.trim() && visibleCount !== totalCount
      ? `${visibleCount} of ${totalCount}`
      : `${totalCount}`

  return (
    <header className="border-b border-line bg-paper">
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
        <div className="min-w-0">
          <nav
            className="mb-1 flex items-center gap-1 text-[12px] text-muted"
            aria-label="Breadcrumb"
          >
            <span>Workspace</span>
            <ChevronRight className="size-3" />
            <span className="text-ink-soft">Directory</span>
          </nav>
          <div className="flex items-baseline gap-2.5">
            <h1 className="text-[22px] font-semibold tracking-tight text-ink">
              Contacts
            </h1>
            <p className="text-[13px] text-muted">{countLabel}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="relative">
            <span className="sr-only">Search contacts</span>
            <Search
              className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-faint"
              strokeWidth={1.75}
            />
            <input
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search"
              className="h-8 w-44 rounded-md border border-line bg-paper pr-3 pl-8 text-[13px] text-ink placeholder:text-faint hover:border-line-strong focus-visible:border-accent"
            />
          </label>
          <ViewSwitcher view={view} onChange={onViewChange} />
        </div>
      </div>
    </header>
  )
}
