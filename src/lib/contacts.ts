import { CONTACT_STAGES } from '../types/contact'
import type { Contact, ContactStage } from '../types/contact'

export function filterContacts(contacts: Contact[], query: string): Contact[] {
  const needle = query.trim().toLowerCase()
  if (!needle) return contacts

  return contacts.filter((contact) => {
    const haystack = [
      contact.name,
      contact.company,
      contact.owner,
      contact.email ?? '',
      contact.role ?? '',
      ...contact.labels,
    ]
      .join(' ')
      .toLowerCase()

    return haystack.includes(needle)
  })
}

export function groupContactsByStage(
  contacts: Contact[],
): Record<ContactStage, Contact[]> {
  const grouped = Object.fromEntries(
    CONTACT_STAGES.map((stage) => [stage, [] as Contact[]]),
  ) as Record<ContactStage, Contact[]>

  for (const contact of contacts) {
    grouped[contact.stage].push(contact)
  }

  return grouped
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
}

const AVATAR_TONES = [
  'bg-[#dbe6df] text-[#2c4a3e]',
  'bg-[#efe4d4] text-[#6b4a24]',
  'bg-[#e4e0f0] text-[#433a63]',
  'bg-[#dde6ee] text-[#2d4a5c]',
  'bg-[#eee0dc] text-[#6a3b32]',
] as const

export function avatarTone(id: string): string {
  let hash = 0
  for (const char of id) hash = (hash + char.charCodeAt(0)) % AVATAR_TONES.length
  return AVATAR_TONES[hash]
}
