# Alpha Contacts

A desktop-first contacts workspace for a Frontend Design Engineer assessment. It presents ten fictional business contacts in a shared Table and Board view, with a right-hand details drawer for editing stage and notes.

## Technologies

- React 19 and TypeScript
- Vite
- Tailwind CSS v4 (`@tailwindcss/vite`)
- lucide-react

There is no backend, authentication, or persistence. All data lives in React state, seeded from mock records.

## Install and run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

Lint:

```bash
npm run lint
```

## Component structure

```
src/
  App.tsx
  main.tsx
  index.css
  types/contact.ts
  data/contacts.ts
  lib/contacts.ts
  components/
    Sidebar.tsx
    WorkspaceHeader.tsx
    ViewSwitcher.tsx
    ContactsTable.tsx
    ContactsBoard.tsx
    ContactCard.tsx
    ContactDetailsPanel.tsx
    StageBadge.tsx
    MissingValue.tsx
```

## Design decisions

- Warm paper canvas, ink sidebar, and a restrained forest accent instead of a Notion clone.
- High information density: compact rows, small badges, and a slim drawer rather than oversized cards.
- Stage color is used as a scan aid, not as decoration.
- Narrower desktops collapse the sidebar to icons and let Table/Board scroll horizontally so controls do not overlap.

## State management

`App` owns the single contacts array, the current view (`table` | `board`), search query, and selected contact id.

Table and Board both receive the same filtered list. Saving a stage or notes patch updates that array by contact id, so both views stay in sync without duplicating records.

`ContactDetailsPanel` keeps a draft of Stage and Notes. Opening a contact copies current values into the draft and does not mutate the source record until Save. Cancel and Discard restore nothing to the parent. The selected view is independent of the panel, so closing the drawer never resets Table/Board.

## Trade-offs and limitations

- Search is local substring matching only.
- Drag-and-drop on the board was skipped in favor of reliable click, keyboard, and save behavior.
- New contact creation, label editing, and persistence are out of scope.
- Sidebar destinations other than Contacts are visual placeholders.

## What I would improve next

- Board drag-and-drop with keyboard-accessible move actions.
- Inline editing for labels and owner, plus undo after save.
- Virtualized table rows and persisted view/search in `localStorage`.
- A full keyboard grid for the table (arrow keys, row actions menu).
