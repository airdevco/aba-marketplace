# Skill: update_scope_doc

## Purpose

Create or update the scope document for the current branch. The scope doc is the central planning artifact – it defines what should be built, gives direction to the prototyping process, and provides the developer with clear requirements for implementation.

The scope doc serves three audiences:

- **The client** – who reviews it to confirm we're building the right thing
- **The PM** – who uses it alongside prototypes to align on design and functionality
- **The developer** – who uses it (with the finalized prototypes) as the blueprint for the build

The PM may update the scope doc before or after updating the prototype. Either direction is valid – sometimes the scope drives the prototype, sometimes the prototype drives scope revisions. The PM is responsible for keeping them in sync.

## When to Use

- At the start of a new project or branch, after running `initialize`
- When refining requirements based on client feedback
- When updating scope to match changes made in the prototype
- When adding, removing, or modifying features mid-project

## Inputs

Before writing or updating the scope doc, you need:

1. **Current app context** – Read `documentation.md` to understand the existing app state, features, design patterns, and technical architecture. This is essential context for writing scope that builds on what already exists.
2. **PM direction** – The PM will provide requirements, context, and priorities through conversation.
3. **Existing scope doc** (if updating) – Read the current `scope.md` to understand what's already defined.

## Process

1. **Read `documentation.md`** to understand the current state of the app. Never skip this step – the scope must be written in context of what already exists.

2. **Ask clarifying questions** if the PM's direction is ambiguous or incomplete. It's better to confirm assumptions upfront than to write scope that needs significant revision. Focus questions on:
   - Unclear user flows or edge cases
   - Ambiguous business logic (calculations, conditions, sequencing)
   - Which user roles are affected and how
   - Whether features replace, extend, or coexist with existing functionality

3. **Write or update the scope doc** following the structure below.

4. **After making updates, flag important assumptions** for the PM to validate. Call these out explicitly – don't bury them in the document. For example: "I assumed that only admins can approve listings – can you confirm?"

## Scope Document Structure

The scope doc (`scope.md`) should follow this structure:

---

### Branch

The branch name (e.g., `feature_notifications`, `initial_build`).

### Summary

A brief overview (2 – 4 sentences) of what this branch delivers. What is being added, changed, or removed? Why?

### Users

A table of user types/roles that are relevant to this scope. Include roles that are new, being removed/merged, or that gain new capabilities.

| Role | Description | What Changes |
|------|-------------|--------------|
| Admin | Platform administrator | New: can approve/reject listings |
| Host | Property owner | New role – can create and manage listings |
| Guest | End user browsing listings | New: can save favorites and book |

Only include roles that are affected by this scope. If a role exists but has no changes, omit it.

### Features

A list of discrete features, each representing a single process or workflow. Features should be:

- **Specific enough to build from** – include steps, logic, conditions, calculations, and sequencing
- **Readable by the client** – avoid code-level detail, but don't be vague
- **Scoped to a single process** – e.g., "Creating a Listing" is one feature; "Listings" is too broad

Each feature has a title and a bullet-point description of its requirements.

**Example:**

#### Creating a Listing

- Host navigates to "My Listings" and clicks "Create Listing"
- Host completes the listing form (see Forms: Create Listing below)
- Listing is saved in draft state – not visible to guests
- Host can preview the listing as it would appear to guests
- Host submits the listing for review
- Admin receives an email notification (see Emails: New Listing Submitted)
- Admin reviews and approves or rejects with optional feedback
- On approval, listing becomes visible in search results
- On rejection, host receives email with feedback and can edit and resubmit

**Guidance:**

- Include specific logical detail: what happens at each step, what conditions apply, what math is involved
- Reference forms and emails by name (defined in their own sections) rather than defining them inline
- Note what is NOT in scope if it could cause confusion (e.g., "Bulk listing upload is not in scope")
- Each feature should make sense on its own – a reader shouldn't need to cross-reference other features to understand the basic flow

### Integrations

A table of third-party services (that require API keys or external accounts) relevant to this scope. These are services like Stripe, Google Maps, or Twilio – not JavaScript libraries.

| Service | Purpose | What's New |
|---------|---------|------------|
| Stripe | Payment processing | New: connected accounts for host payouts |
| Google Maps | Map display and geocoding | New integration for listing locations |
| Resend | Transactional email | Existing – new email templates added |

Only include integrations that are new or have new functionality as part of this scope.

### Designs

A list of pages and views that are created or modified. Each entry should describe what's on the page and what it does, along with notable design guidance. Do not duplicate the feature logic – reference the feature by name if needed.

Be descriptive but not overly prescriptive. Provide enough guidance for prototyping without defining things at the pixel level.

**Example:**

#### Listing Detail Page (new)

Displays a single listing with all its details. Hero image at the top with a gallery below. Listing title, description, price, and host info in the main content area. Booking widget fixed on the right side (desktop) or bottom (mobile). Map showing listing location below the description. Reviews section at the bottom.

Notable design guidance:
- Gallery uses a lightbox pattern for full-screen image viewing
- Booking widget should feel prominent but not intrusive
- Price displayed per night with estimated total shown on date selection

#### My Listings Page (modified)

Add a tab bar at the top: "Active", "Draft", "Under Review", "Rejected". Each tab shows the relevant listings in a card grid. Add a "Create Listing" button in the top right.

### Forms

A list of forms referenced in the features section. Defining them here keeps the features section readable while providing the detail needed for implementation.

Each form is a table:

#### Create Listing Form

| Field | Prompt | Type | Required | Options/Validation | Notes |
|-------|--------|------|----------|-------------------|-------|
| Title | "Give your listing a title" | Text | Yes | Max 100 characters | |
| Description | "Describe your space" | Textarea | Yes | Max 2000 characters | |
| Property Type | "What type of property?" | Select | Yes | Apartment, House, Condo, Townhouse | |
| Price per Night | "Set your nightly price" | Number | Yes | Min $10, max $10,000 | Displayed in USD |
| Photos | "Add photos of your space" | File upload | Yes | Min 3, max 20; JPEG/PNG; max 10MB each | First photo is the cover |
| Address | "Where is your property?" | Address autocomplete | Yes | Must resolve to a valid geocode | Uses Google Maps autocomplete |
| Check-in Time | "Earliest check-in time" | Time select | No | Default: 3:00 PM | 30-minute increments |

### Emails

A list of transactional emails referenced in the features section. Each email includes when it's sent, who receives it, and draft content including dynamic fields and links.

#### New Listing Submitted

- **Sent when:** Host submits a listing for review
- **To:** All users with Admin role
- **Subject:** New listing submitted for review: {{listing_title}}

**Body:**

> Hi {{admin_name}},
>
> {{host_name}} has submitted a new listing for review: **{{listing_title}}**.
>
> **Property type:** {{property_type}}
> **Location:** {{city}}, {{state}}
> **Price:** ${{price_per_night}}/night
>
> [Review Listing →]({{review_url}})

---

## Style Guidance

- **Be specific but don't boil the ocean.** The doc should give the client confidence that we understand what they want, and give the developer enough detail to build without guessing. But it doesn't need to cover every edge case – use good judgment about what level of detail matters.

- **Keep it internally consistent.** If a feature references a form, that form should exist in the Forms section. If a design references a feature, that feature should exist. User roles mentioned in features should appear in the Users table. Cross-check sections before finishing.

- **Use plain language.** Avoid technical jargon (no "mutations", "queries", "schemas"). Write in terms of what users see and do. The client should be able to read and understand every section.

- **Note exclusions when helpful.** If something could reasonably be assumed in-scope but isn't, call it out at the feature level (e.g., "Guest messaging is not included in this scope – hosts are contacted via email only").

- **Keep features at the right granularity.** Each feature should be a single discrete process. "User onboarding" is a feature. "User management" is probably too broad. "Email validation" is probably too narrow (unless it's a standalone flow).

## Output

The scope doc is saved as `scope.md` inside the `/[branch_name]/` folder at the repository root (e.g., `/feature_notifications/scope.md`). This folder is created by the `initialize` skill and also contains `progress-tracker.md`.
