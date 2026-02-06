# Skill: update_prototype

## Purpose

Build or update clickable prototype pages that visualize the features and designs described in the scope doc. Prototypes are UI-only (no backend, no auth, dummy data) and serve as a visual reference for the client and PM to review before the build begins.

The PM may update the prototype before or after updating the scope doc. Either direction is valid – sometimes the scope drives the prototype, sometimes prototype exploration drives scope changes. The PM is responsible for keeping them in sync.

Finalized prototypes also serve as visual reference for the developer during the build. The developer can view them in the browser while implementing the real pages.

## When to Use

- After writing or updating the scope doc, to visualize the requirements
- When iterating on designs based on client feedback
- When exploring UI approaches before finalizing the scope
- When creating a new version of an existing prototype page

## Inputs

Before building or updating prototypes, you need:

1. **Scope doc** – Read `[branch_name]/scope.md` to understand what features, pages, and designs are defined.
2. **Current app context** – Read `documentation.md` to understand existing design patterns, colors, typography, and component styles.
3. **Existing codebase** – Review the current `src/` directory to understand the app's component library, layout patterns, and visual language. Prototypes should feel like natural extensions of the existing app.
4. **PM direction** – The PM will specify which pages to prototype and any specific design direction.

## Process

1. **Read `[branch_name]/scope.md`** to understand what needs to be prototyped – specifically the Features, Designs, and Forms sections.

2. **Read `documentation.md`** and review the existing codebase to understand the current design language. Prototypes should match the app's established patterns.

3. **Create or update prototype pages** following the structure and design guidance below.

4. **Commit each version** with a `[proto]` prefix message:
   - `[proto] v1: Initial prototype for [feature/page]`
   - `[proto] v2: Updated [feature/page] based on feedback`
   - `[proto] final: Approved prototype for [feature/page]`

## Prototype Structure

### File Organization

All prototype pages and their components are **self-contained** within a `prototypes/` folder inside `src/`:

```
src/
├── prototypes/
│   ├── listing_detail_proto_v1/
│   │   ├── page.tsx
│   │   ├── ListingHero.tsx
│   │   ├── BookingWidget.tsx
│   │   └── ReviewCard.tsx
│   ├── listing_detail_proto_v2/
│   │   ├── page.tsx
│   │   ├── ListingHero.tsx        # Revised version
│   │   ├── BookingWidget.tsx
│   │   └── ReviewCard.tsx
│   └── my_listings_proto_v1/
│       ├── page.tsx
│       └── ListingCard.tsx
├── app/
│   └── ...                         # Real app code (don't modify)
└── ...
```

### Key Rules

- **All prototype files go in `src/prototypes/`** – never in `src/app/` or other production folders
- **Each prototype version gets its own folder** with the naming convention: `[page_name]_proto_v[N]`
- **Components are colocated** – any component used by a prototype page lives in that prototype's folder, not in the shared `components/` directory
- **Prototypes are self-contained** – deleting the entire `prototypes/` folder should never break any code in the codebase
- **Don't modify production code** – prototypes exist alongside the real app, not inside it
- **When modifying an existing page**, create a copy of that page's visual layout in the prototypes folder rather than editing the real page

### Prototype Page Setup

Each prototype page must be a valid Next.js page route. The folder structure under `src/prototypes/` maps to routes automatically (e.g., `src/prototypes/listing_detail_proto_v1/page.tsx` is accessible at `/prototypes/listing_detail_proto_v1`).

Every prototype page should:

- Use dummy/hardcoded data (no API calls, no database, no auth)
- Be fully clickable and navigable where relevant (tabs, modals, dropdowns should work)
- Include realistic content (real-looking names, descriptions, prices – not "Lorem ipsum")
- Handle responsive layout (desktop and mobile)

### Navigation Widget

Every prototype page must include a **navigation widget** fixed in the lower-right corner of the viewport. This widget allows reviewers to quickly switch between prototype pages and versions.

The widget should:

- Float in the lower-right corner (`fixed bottom-4 right-4`)
- Be collapsible (small icon that expands to show the full list)
- List all prototype pages grouped by feature, with version numbers
- Highlight the currently active page
- Link to each prototype page

Example collapsed state: a small floating button with a grid/navigation icon.

Example expanded state: a panel listing all available prototypes:

```
Listing Detail
  ├── v1
  └── v2 (current)
My Listings
  └── v1
Search Results
  └── v1
```

### Feedback Widget

Every prototype page must include a **feedback widget** that allows reviewers to click on any area of the page and submit comments.

The widget should:

- Be activatable via a button in the lower-right corner (near the navigation widget)
- When active, allow the user to click anywhere on the page to drop a pin
- On pin drop, show a small text input for the comment
- Store feedback in local state (no backend needed)
- Display all feedback pins on the page with numbered markers
- Allow toggling feedback visibility on/off

This is a prototype tool – it doesn't need to persist data across sessions, just provide an easy way to annotate during review sessions.

## Design Guidance

Prototypes should match the app's established design language. Follow these principles and the design system defined below.

### Design Principles

1. **Restraint** – Every element must earn its place. If it doesn't serve a clear purpose, remove it.
2. **Consistency** – Once a pattern is established, use it everywhere. Never introduce one-off styles.
3. **Intentionality** – Make deliberate choices and commit to them. The aesthetic is minimal – execute it with precision.
4. **Hierarchy** – Use spacing, size, and color to create clear visual hierarchy. The user's eye should know where to go.
5. **Polish** – The difference between good and great is in the details: alignment, spacing, transitions, hover states.

### Color System

Use these CSS variable tokens. They should already be defined in the app's `globals.css`. If not, define them in the prototype page's styles.

**Backgrounds:**

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#000000` | Page background |
| `--bg-elevated` | `#0a0a0a` | Elevated surfaces, modals |
| `--bg-card` | `#111111` | Cards, panels |
| `--bg-hover` | `#1a1a1a` | Hover states |
| `--bg-active` | `#222222` | Active/pressed states |

**Text:**

| Token | Value | Usage |
|-------|-------|-------|
| `--text-primary` | `#ededed` | Primary text (not pure white) |
| `--text-secondary` | `#888888` | Secondary text, labels |
| `--text-muted` | `#666666` | Tertiary text, placeholders |
| `--text-disabled` | `#444444` | Disabled states |

**Borders:**

| Token | Value | Usage |
|-------|-------|-------|
| `--border-default` | `#262626` | Default borders |
| `--border-subtle` | `#1a1a1a` | Subtle dividers |
| `--border-hover` | `#333333` | Hover state borders |
| `--border-focus` | `#888888` | Focus rings |

**Accents:**

| Token | Value | Usage |
|-------|-------|-------|
| `--accent-primary` | `#0070f3` | Links, primary actions |
| `--accent-success` | `#50e3c2` | Success states |
| `--accent-warning` | `#f5a623` | Warning states |
| `--accent-error` | `#ee0000` | Error states |

### Typography

- **Primary font:** Geist (fallback: Inter, then system sans-serif)
- **Monospace font:** Geist Mono (fallback: SF Mono, Fira Code)
- Page titles: 32 – 48px, weight 600, letter-spacing -0.02em
- Section headings: 20 – 24px, weight 600, letter-spacing -0.02em
- Body text: 14 – 16px, weight 400
- Labels/captions: 12 – 13px, weight 500
- Never use font-weight 700 (bold). Use 600 (semibold) for headings, 500 (medium) for labels.

### Spacing

Generous whitespace is essential. When in doubt, add more space.

- Component padding: 12 – 16px
- Card padding: 16 – 24px
- Section gaps: 32 – 48px
- Page margins: 24px (mobile) to 64px (desktop)

### Border Radius

| Usage | Value |
|-------|-------|
| Small elements (tags, badges) | 4px |
| Buttons, inputs | 6px |
| Cards, modals | 8px |
| Large containers (use sparingly) | 12px |

Never exceed 12px border radius.

### Motion

- Hover transitions: 100 – 150ms ease
- State changes: 150ms ease
- Never use bounce, elastic, or spring effects
- Prefer opacity and transform over color transitions

### Component Patterns

**Buttons:**
- Primary: white background, black text, medium weight
- Secondary: transparent with border, primary text color
- Ghost: transparent, secondary text color, no border

**Inputs:** Transparent background, default border, muted placeholder text. Focus state changes border to focus color.

**Cards:** Card background color, subtle border, 8px radius, 16px padding.

**Tables:** Subtle horizontal dividers only, no vertical borders. Header text in secondary color, uppercase, small size.

**Navigation:** Minimal, left-aligned. Active state uses primary text color, inactive uses secondary text color. No background colors on nav items.

### Patterns to Avoid

- ❌ Drop shadows (use borders instead)
- ❌ Gradients (except very subtle background gradients)
- ❌ Border radius over 12px
- ❌ Colorful accent backgrounds
- ❌ Glow effects or neon accents
- ❌ Bold (700) font weight
- ❌ Centered body text (left-align everything)
- ❌ Inconsistent spacing between similar elements
- ❌ Full-width content without max-width constraints
- ❌ Introducing colors not in the design system

### Before Finishing Any Prototype Page

- [ ] All colors come from the defined palette
- [ ] All spacing uses the defined scale
- [ ] Typography follows the type scale
- [ ] Border radius is consistent (6px default)
- [ ] Transitions are 150ms ease
- [ ] No shadows, gradients, or decorative elements
- [ ] Hover states on all interactive elements
- [ ] Focus states are visible and accessible
- [ ] Layout is left-aligned with appropriate max-widths
- [ ] Navigation widget is present and lists all prototypes
- [ ] Feedback widget is present and functional
- [ ] Dummy data looks realistic

## Output

Prototype pages are saved under `src/prototypes/` in the current branch, with each version in its own named folder. Each version is committed with a `[proto]` prefix message.
