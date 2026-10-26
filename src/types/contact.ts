export const CONTACT_STAGES = [
  'Lead',
  'Prospect',
  'Qualified',
  'Customer',
] as const

export type ContactStage = (typeof CONTACT_STAGES)[number]

export type AppView = 'table' | 'board'

export type Contact = {
  id: string
  name: string
  email?: string
  company: string
  role?: string
  owner: string
  labels: string[]
  stage: ContactStage
  notes?: string
}

export type ContactPatch = {
  stage: ContactStage
  notes: string
}
