import { avatarTone, getInitials } from '../lib/contacts'
import type { Contact } from '../types/contact'
import { MissingValue } from './MissingValue'
import { StageBadge } from './StageBadge'

type ContactCardProps = {
  contact: Contact
  selected: boolean
  onOpen: (contactId: string, trigger: HTMLElement) => void
}

export function ContactCard({ contact, selected, onOpen }: ContactCardProps) {
  return (
    <button
      type="button"
      onClick={(event) => onOpen(contact.id, event.currentTarget)}
      aria-pressed={selected}
      className={`w-full rounded-lg border bg-paper px-3 py-2.5 text-left shadow-[0_1px_0_rgb(28_27_24/0.04)] transition-colors hover:border-line-strong ${
        selected ? 'border-accent ring-1 ring-accent' : 'border-line'
      }`}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-medium ${avatarTone(contact.id)}`}
          >
            {getInitials(contact.name)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium text-ink">
              {contact.name}
            </p>
            <p className="truncate text-[12px] text-muted">{contact.company}</p>
          </div>
        </div>
        <StageBadge stage={contact.stage} />
      </div>

      <dl className="space-y-1 text-[12px]">
        <div className="flex justify-between gap-3">
          <dt className="text-faint">Role</dt>
          <dd className="truncate text-ink-soft">
            {contact.role ?? <MissingValue />}
          </dd>
        </div>
        {contact.email ? (
          <div className="flex justify-between gap-3">
            <dt className="text-faint">Email</dt>
            <dd className="truncate text-ink-soft">{contact.email}</dd>
          </div>
        ) : null}
        <div className="flex justify-between gap-3">
          <dt className="text-faint">Owner</dt>
          <dd className="truncate text-ink-soft">{contact.owner}</dd>
        </div>
      </dl>

      {contact.labels.length > 0 ? (
        <ul className="mt-2 flex flex-wrap gap-1">
          {contact.labels.map((label) => (
            <li
              key={label}
              className="rounded border border-line bg-canvas px-1.5 py-0.5 text-[11px] text-ink-soft"
            >
              {label}
            </li>
          ))}
        </ul>
      ) : null}
    </button>
  )
}
