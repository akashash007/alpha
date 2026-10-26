import { CONTACT_STAGES } from '../types/contact'
import type { Contact } from '../types/contact'
import { groupContactsByStage } from '../lib/contacts'
import { ContactCard } from './ContactCard'

type ContactsBoardProps = {
  contacts: Contact[]
  selectedId: string | null
  onOpenContact: (contactId: string, trigger: HTMLElement) => void
}

export function ContactsBoard({
  contacts,
  selectedId,
  onOpenContact,
}: ContactsBoardProps) {
  const grouped = groupContactsByStage(contacts)

  if (contacts.length === 0) {
    return (
      <div className="flex h-full items-center justify-center px-6 text-[13px] text-muted">
        No contacts match this search.
      </div>
    )
  }

  return (
    <div className="h-full overflow-x-auto">
      <div className="grid h-full min-w-[920px] grid-cols-4 gap-3 p-4">
        {CONTACT_STAGES.map((stage) => {
          const columnContacts = grouped[stage]
          return (
            <section
              key={stage}
              className="flex min-h-0 flex-col rounded-xl border border-line bg-[#efece3]"
              aria-label={`${stage} column`}
            >
              <header className="flex items-center justify-between px-3 py-2.5">
                <h2 className="text-[13px] font-semibold text-ink">{stage}</h2>
                <span className="rounded-full bg-paper px-1.5 text-[11px] font-medium text-muted tabular-nums">
                  {columnContacts.length}
                </span>
              </header>
              <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-2 pb-3">
                {columnContacts.length === 0 ? (
                  <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-line-strong px-3 py-8 text-center text-[12px] text-muted">
                    No contacts in this stage
                  </div>
                ) : (
                  columnContacts.map((contact) => (
                    <ContactCard
                      key={contact.id}
                      contact={contact}
                      selected={selectedId === contact.id}
                      onOpen={onOpenContact}
                    />
                  ))
                )}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
