# CRM Kanban MVP - Design Spec

## Overview

Standalone CRM page at `/crm` within the existing Homologa Plus landing page project. Kanban board for managing commercial leads through a sales pipeline. Frontend-only MVP with localStorage persistence, prepared for future backend integration.

## Architecture

### File Structure

```
src/pages/CRM/
├── CRMPage.tsx              # Page layout orchestrator
├── components/
│   ├── KanbanBoard.tsx      # Board with columns, manages drag & drop
│   ├── KanbanColumn.tsx     # Individual column (title, counter, drop zone)
│   ├── LeadCard.tsx         # Lead card (name, phone, temp, action)
│   ├── LeadModal.tsx        # Modal for create/edit lead
│   └── CRMHeader.tsx        # Header with title, search, "New Lead" button
├── hooks/
│   └── useDragAndDrop.ts    # Hook encapsulating HTML5 DnD logic
├── store/
│   └── crmStore.ts          # Zustand store with persist middleware
└── types/
    └── crm.ts               # TypeScript types
```

### Isolation Guarantees

- **Code**: `/src/pages/CRM/` is fully independent, no imports from landing components
- **State**: Dedicated Zustand store, own localStorage key (`homologa-crm-leads`)
- **Style**: Only Tailwind utility classes from existing theme
- **Bundle**: Separate chunk via `lazy()` import
- **SEO**: No Helmet meta tags (internal page, not indexable)
- **Only change to existing files**: 2 lines in `App.tsx` (lazy import + Route)

## Data Model

### Types

```typescript
type Temperature = 'cold' | 'warm' | 'hot';

type ColumnId =
  | 'new_lead'
  | 'message_sent'
  | 'replied'
  | 'light_interest'
  | 'strong_interest'
  | 'negotiation'
  | 'client';

interface Lead {
  id: string;
  name: string;
  phone: string;
  origin: string;
  observation: string;
  nextAction: string;
  temperature: Temperature;
  columnId: ColumnId;
  createdAt: string;
  updatedAt: string;
}
```

### Zustand Store

```typescript
interface CRMStore {
  leads: Lead[];
  searchTerm: string;
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateLead: (id: string, data: Partial<Lead>) => void;
  moveLead: (id: string, toColumn: ColumnId) => void;
  deleteLead: (id: string) => void;
  setSearchTerm: (term: string) => void;
}
```

- `persist` middleware with key `homologa-crm-leads`
- IDs via `crypto.randomUUID()`

### Columns (static constant)

| ID | Label |
|---|---|
| `new_lead` | Novo Lead |
| `message_sent` | Mensagem Enviada |
| `replied` | Respondeu |
| `light_interest` | Interessado Leve |
| `strong_interest` | Interessado Forte |
| `negotiation` | Em Negociacao |
| `client` | Cliente |

### Temperature Visual Mapping

| Temperature | Label | Color |
|---|---|---|
| `cold` | Frio | `slate-300` (gray) |
| `warm` | Morno | `amber-400` (yellow) |
| `hot` | Quente | `red-500` (red) |

## Components

### CRMPage.tsx
- Full-screen layout: `min-h-screen bg-slate-50`
- Composed of `CRMHeader` + `KanbanBoard`
- No landing page Navbar (isolated page)

### CRMHeader.tsx
- Title "CRM" with Outfit font
- Search field (filters leads by name/phone in real time)
- "Novo Lead" button opens LeadModal
- Total lead counter

### KanbanBoard.tsx
- Horizontal container with `overflow-x-auto`
- Renders 7 KanbanColumn side by side
- `flex gap-4 p-6`, min-width per column `min-w-[280px]`

### KanbanColumn.tsx
- Header: column name + badge with card count
- Drop zone: `onDragOver` + `onDrop`
- Visual feedback on drag (dashed blue border)
- Vertical list of LeadCard with `gap-3`

### LeadCard.tsx
- `draggable="true"`, `onDragStart` sets lead ID
- Shows: name, phone, next action
- Temperature indicator: colored left border (gray/yellow/red)
- Click opens LeadModal in edit mode
- White card with `rounded-xl shadow-sm hover:shadow-md transition`

### LeadModal.tsx
- Modal with backdrop blur (existing project pattern)
- Create mode: empty fields, default column `new_lead`
- Edit mode: pre-filled fields, can change column
- Fields: Name, Phone, Origin, Observation, Next Action, Temperature (select), Column (select)
- Buttons: Save / Cancel / Delete (edit only, with confirmation)
- Entry animation with `motion`

### useDragAndDrop.ts
- `handleDragStart(e, leadId)` -> `e.dataTransfer.setData('leadId', id)`
- `handleDragOver(e)` -> `e.preventDefault()` + visual feedback
- `handleDrop(e, columnId)` -> reads leadId, calls `moveLead(id, columnId)`
- `handleDragLeave(e)` -> removes visual feedback

## Drag & Drop Flow

```
User drags card -> DragStart (sets ID)
  -> Hovers over column -> DragOver (highlight)
  -> Drops on column -> Drop (moveLead in store)
  -> Store updates -> React re-renders -> Card in new column
```

## Routing

Add to existing `App.tsx`:
```typescript
const CRMPage = lazy(() => import('./pages/CRM/CRMPage'));
// Inside routes:
<Route path="/crm" element={<CRMPage />} />
```

## Dependencies

- **New**: `zustand` (~1.5kb gzipped)
- **Existing**: react, react-router-dom, tailwindcss, motion, lucide-react

## Design System Usage

- Colors: primary (`#2563EB`), slate palette, amber, red, emerald
- Fonts: Inter (body), Outfit (headings)
- Patterns: rounded-xl/2xl cards, shadow-sm, hover transitions
- Icons: lucide-react
- Animations: motion/react for modal

## Future Preparation

- Store interface ready for API migration (swap persist middleware for async fetch)
- Clear TypeScript types for backend contract
- Separation of concerns (store / components / types)
