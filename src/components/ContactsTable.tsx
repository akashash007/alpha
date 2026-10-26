import { avatarTone, getInitials } from '../lib/contacts'
import type { Contact } from '../types/contact'
import { MissingValue } from './MissingValue'
import { StageBadge } from './StageBadge'

type ContactsTableProps = {
  contacts: Contact[]
  selectedId: string | null
  onOpenContact: (contactId: string, trigger: HTMLElement) => void
}

export function ContactsTable({
  contacts,
  selectedId,
  onOpenContact,
}: ContactsTableProps) {
  if (contacts.length === 0) {
    return (
      <div className="flex h-full items-center justify-center px-6 text-[13px] text-muted">
        No contacts match this search.
      </div>
    )
  }

  return (
    <div className="h-full overflow-auto">
      <table className="min-w-[860px] w-full border-collapse text-left text-[13px]">
        <thead className="sticky top-0 z-10 bg-[#efece3]">
          <tr className="border-b border-line text-[11px] font-semibold tracking-wide text-muted uppercase">
            <th className="px-4 py-2.5 font-semibold">Name</th>
            <th className="px-3 py-2.5 font-semibold">Email</th>
            <th className="px-3 py-2.5 font-semibold">Company</th>
            <th className="px-3 py-2.5 font-semibold">Role</th>
            <th className="px-3 py-2.5 font-semibold">Owner</th>
            <th className="px-3 py-2.5 font-semibold">Labels</th>
            <th className="px-4 py-2.5 font-semibold">Stage</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => {
            const selected = selectedId === contact.id
            return (
              <tr
                key={contact.id}
                tabIndex={0}
                aria-selected={selected}
                onClick={(event) => onOpenContact(contact.id, event.currentTarget)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    onOpenContact(contact.id, event.currentTarget)
                  }
                }}
                className={`cursor-pointer border-b border-line last:border-b-0 hover:bg-[#f7f4ec] ${
                  selected ? 'bg-accent-muted' : 'bg-paper'
                }`}
              >
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-medium ${avatarTone(contact.id)}`}
                    >
                      {getInitials(contact.name)}
                    </span>
                    <span className="font-medium text-ink">{contact.name}</span>
                  </div>
                </td>
                <td className="px-3 py-2.5 text-ink-soft">
                  {contact.email ?? <MissingValue />}
                </td>
                <td className="px-3 py-2.5 text-ink-soft">{contact.company}</td>
                <td className="px-3 py-2.5 text-ink-soft">
                  {contact.role ?? <MissingValue />}
                </td>
                <td className="px-3 py-2.5 text-ink-soft">{contact.owner}</td>
                <td className="px-3 py-2.5">
                  {contact.labels.length === 0 ? (
                    <MissingValue />
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {contact.labels.map((label) => (
                        <span
                          key={label}
                          className="rounded border border-line bg-canvas px-1.5 py-0.5 text-[11px] text-ink-soft"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  )}
                </td>
                <td className="px-4 py-2.5">
                  <StageBadge stage={contact.stage} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
