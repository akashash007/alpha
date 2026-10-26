import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { CONTACT_STAGES } from '../types/contact'
import type { Contact, ContactPatch, ContactStage } from '../types/contact'
import { avatarTone, getInitials } from '../lib/contacts'
import { MissingValue } from './MissingValue'
import { StageBadge } from './StageBadge'

type ContactDetailsPanelProps = {
  contact: Contact
  onClose: () => void
  onSave: (contactId: string, patch: ContactPatch) => void
}

const FOCUSABLE =
  'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export function ContactDetailsPanel({
  contact,
  onClose,
  onSave,
}: ContactDetailsPanelProps) {
  const titleId = useId()
  const panelRef = useRef<HTMLElement>(null)
  const [stage, setStage] = useState<ContactStage>(contact.stage)
  const [notes, setNotes] = useState(contact.notes ?? '')
  const [confirmDiscard, setConfirmDiscard] = useState(false)

  const dirty = stage !== contact.stage || notes !== (contact.notes ?? '')

  useEffect(() => {
    panelRef.current?.focus()
  }, [])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        if (confirmDiscard) {
          setConfirmDiscard(false)
          return
        }
        if (stage !== contact.stage || notes !== (contact.notes ?? '')) {
          setConfirmDiscard(true)
          return
        }
        onClose()
        return
      }

      if (event.key !== 'Tab' || !panelRef.current) return
      const nodes = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      )
      if (nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [confirmDiscard, contact, notes, onClose, stage])

  function requestClose() {
    if (dirty) {
      setConfirmDiscard(true)
      return
    }
    onClose()
  }

  function handleSave() {
    const nextNotes = notes.trim()
    setNotes(nextNotes)
    onSave(contact.id, { stage, notes: nextNotes })
  }

  return (
    <div className="absolute inset-0 z-20 flex justify-end">
      <button
        type="button"
        aria-label="Close details"
        className="h-full flex-1 bg-ink/20"
        onClick={requestClose}
      />
      <aside
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex h-full w-full max-w-[420px] flex-col border-l border-line bg-paper shadow-panel outline-none"
      >
        <header className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
          <div className="flex min-w-0 items-start gap-3">
            <span
              className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-medium ${avatarTone(contact.id)}`}
            >
              {getInitials(contact.name)}
            </span>
            <div className="min-w-0">
              <h2
                id={titleId}
                className="truncate text-[16px] font-semibold text-ink"
              >
                {contact.name}
              </h2>
              <p className="truncate text-[13px] text-muted">{contact.company}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={requestClose}
            className="rounded-md p-1 text-muted hover:bg-canvas hover:text-ink"
            aria-label="Close"
          >
            <X className="size-4" strokeWidth={1.75} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <section className="space-y-3">
            <Field label="Email">{contact.email ?? <MissingValue />}</Field>
            <Field label="Role">{contact.role ?? <MissingValue />}</Field>
            <Field label="Owner">{contact.owner}</Field>
            <Field label="Labels">
              {contact.labels.length === 0 ? (
                <MissingValue />
              ) : (
                <div className="flex flex-wrap gap-1">
                  {contact.labels.map((label) => (
                    <span
                      key={label}
                      className="rounded border border-line bg-canvas px-1.5 py-0.5 text-[12px] text-ink-soft"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}
            </Field>
            <Field label="Current stage">
              <StageBadge stage={contact.stage} />
            </Field>
          </section>

          <section className="mt-5 border-t border-line pt-4">
            <label className="block">
              <span className="mb-1.5 block text-[12px] font-medium text-muted">
                Stage
              </span>
              <select
                value={stage}
                onChange={(event) =>
                  setStage(event.target.value as ContactStage)
                }
                className="h-9 w-full rounded-md border border-line bg-paper px-2.5 text-[13px] text-ink"
              >
                {CONTACT_STAGES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="mt-4 block">
              <span className="mb-1.5 block text-[12px] font-medium text-muted">
                Notes
              </span>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={6}
                placeholder="Add context, next steps, or meeting notes"
                className="w-full resize-y rounded-md border border-line bg-paper px-2.5 py-2 text-[13px] leading-relaxed text-ink placeholder:text-faint"
              />
            </label>
          </section>
        </div>

        <footer className="flex items-center justify-end gap-2 border-t border-line px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="h-8 rounded-md px-3 text-[13px] font-medium text-ink-soft hover:bg-canvas"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!dirty}
            className="h-8 rounded-md bg-accent px-3 text-[13px] font-medium text-paper hover:bg-accent-hover disabled:cursor-not-allowed disabled:bg-line-strong disabled:text-muted"
          >
            Save
          </button>
        </footer>

        {confirmDiscard ? (
          <div className="absolute inset-0 z-10 flex items-end justify-center bg-ink/25 p-4 sm:items-center">
            <div
              role="alertdialog"
              aria-labelledby="discard-title"
              className="w-full max-w-sm rounded-lg border border-line bg-paper p-4 shadow-panel"
            >
              <h3
                id="discard-title"
                className="text-[14px] font-semibold text-ink"
              >
                Discard unsaved changes?
              </h3>
              <p className="mt-1 text-[13px] text-muted">
                Stage and notes edits will be lost.
              </p>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setConfirmDiscard(false)}
                  className="h-8 rounded-md px-3 text-[13px] font-medium text-ink-soft hover:bg-canvas"
                >
                  Keep editing
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="h-8 rounded-md bg-warn-bg px-3 text-[13px] font-medium text-warn hover:brightness-95"
                >
                  Discard
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </aside>
    </div>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[96px_minmax(0,1fr)] items-start gap-3">
      <p className="pt-0.5 text-[12px] font-medium text-muted">{label}</p>
      <div className="text-[13px] text-ink">{children}</div>
    </div>
  )
}
