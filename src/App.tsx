import { useMemo, useRef, useState } from 'react'
import { ContactDetailsPanel } from './components/ContactDetailsPanel'
import { ContactsBoard } from './components/ContactsBoard'
import { ContactsTable } from './components/ContactsTable'
import { Sidebar } from './components/Sidebar'
import { WorkspaceHeader } from './components/WorkspaceHeader'
import { INITIAL_CONTACTS } from './data/contacts'
import { filterContacts } from './lib/contacts'
import type { AppView, Contact, ContactPatch } from './types/contact'

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS)
  const [view, setView] = useState<AppView>('table')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const visibleContacts = useMemo(
    () => filterContacts(contacts, query),
    [contacts, query],
  )

  const selectedContact =
    contacts.find((contact) => contact.id === selectedId) ?? null

  function openContact(contactId: string, trigger: HTMLElement) {
    triggerRef.current = trigger
    setSelectedId(contactId)
  }

  function closePanel() {
    setSelectedId(null)
    const trigger = triggerRef.current
    window.requestAnimationFrame(() => trigger?.focus())
  }

  function saveContact(contactId: string, patch: ContactPatch) {
    const nextNotes = patch.notes.trim()
    setContacts((current) =>
      current.map((contact) =>
        contact.id === contactId
          ? {
              ...contact,
              stage: patch.stage,
              notes: nextNotes.length > 0 ? nextNotes : undefined,
            }
          : contact,
      ),
    )
  }

  return (
    <div className="flex h-full min-h-0 bg-canvas text-ink">
      <Sidebar />
      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <WorkspaceHeader
          view={view}
          onViewChange={setView}
          query={query}
          onQueryChange={setQuery}
          totalCount={contacts.length}
          visibleCount={visibleContacts.length}
        />
        <main id="contacts" className="min-h-0 flex-1">
          {view === 'table' ? (
            <ContactsTable
              contacts={visibleContacts}
              selectedId={selectedId}
              onOpenContact={openContact}
            />
          ) : (
            <ContactsBoard
              contacts={visibleContacts}
              selectedId={selectedId}
              onOpenContact={openContact}
            />
          )}
        </main>
        {selectedContact ? (
          <ContactDetailsPanel
            key={selectedContact.id}
            contact={selectedContact}
            onClose={closePanel}
            onSave={saveContact}
          />
        ) : null}
      </div>
    </div>
  )
}
