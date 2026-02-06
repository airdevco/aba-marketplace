# Scope: ABA Marketplace

## Branch

`initial_build`

## Summary

ABA Marketplace is a job platform connecting ABA (Applied Behavior Analysis) professionals with employers in the Atlanta metro area. Workers (RBTs and BCBAs) create anonymous profiles and receive automated job matches based on their preferences. Employers post positions and search for qualified candidates. The platform features intelligent matching that notifies workers when jobs align with their role type, location, pay requirements, and employment preferences. All profiles remain anonymous until a worker applies or accepts an employer's outreach. Built-in messaging facilitates communication between employers and workers, with all threads organized by specific job postings. An admin portal manages organization approvals, license verifications, and platform oversight. The platform is free to use initially, with subscription features deferred to a future release.

## Users

| Role | Description | What Changes |
|------|-------------|--------------|
| Worker | An ABA professional (RBT or BCBA) seeking employment opportunities | New role – creates profile, receives job matches, applies to positions |
| Employer | A user within an Organization who posts jobs and searches for candidates | New role – posts jobs, searches workers, manages applications |
| Organization | A clinic or company hiring ABA professionals; can have multiple employer users | New entity – employers belong to organizations |
| Admin | Platform administrator | New role – approves organizations, verifies licenses, monitors platform |

## Features

### Marketing Page

- Public-facing landing page accessible without login
- Communicates value proposition for both workers and employers
- Includes "Sign Up as a Professional" call-to-action linking to worker registration
- Includes "Post Jobs as an Employer" button linking to the employer request form
- Mentions Atlanta-only service area prominently
- Mobile responsive

### Worker Registration & Onboarding

- Worker navigates to signup from marketing page or direct link
- Initial screen presents role selection: "ABA Professional" or "Employer" (employer redirects to request-access form)
- **Step 1: Account creation** – worker enters name, email, and password to create account
- After account creation, system checks if the email matches a pending employer organization invitation
  - If yes, worker sees the pending invitation page (see Organization Invitation Flow below)
  - If no, worker proceeds directly to onboarding
- Onboarding is a 6-phase wizard with progress indicator (Start → Privacy → Goals → Experience → Preferences → Profile):
  - **Phase 1: Let's Get Started** – worker selects credential type (RBT or BCBA), enters first name, last name, phone number (optional), and ZIP code
    - ZIP code entry triggers Atlanta area validation
    - If ZIP code is outside Atlanta area, worker sees error: "We currently only service the Atlanta area (within 100 miles). Please enter a ZIP code near Atlanta."
    - Valid ZIP shows "Location verified" confirmation with checkmark
  - **Phase 2: Your Privacy Matters** – informational screen (no form fields) explaining anonymity model:
    - "Anonymous by Default" – employers see qualifications but not personal information
    - "You Choose When to Share" – identity revealed only on application
    - "Browse Freely" – explore opportunities without pressure
  - **Phase 3: What Are You Looking For?** – worker completes job search preferences (see Forms: Worker Job Search Preferences)
  - **Phase 4: Tell Us About Your Experience** – worker completes experience form (see Forms: Worker Experience)
  - **Phase 5: Tell Us What's Important To You** – worker completes compensation, work setting, location/travel, and target role preferences (see Forms: Worker Work Preferences)
  - **Phase 6: Make Your Profile Shine** – worker uploads photo, writes bio, uploads resume, adds LinkedIn URL, and completes license attestation (see Forms: Worker Profile & License)
- After completing all phases, worker is taken to their dashboard

### Worker Dashboard & Profile Management

- Worker dashboard displays at-a-glance information:
  - Profile completion status
  - Number of new job matches
  - Number of active applications
  - Recent messages
  - Quick access to all major sections
- Dashboard organized into tabs:
  - **Home** – overview with metrics cards (new opportunities count, recent messages count, active applications count) and two-column layout:
    - Left column: "New Opportunities" showing recent employer invites and job recommendations (limit 5 most recent)
    - Right column: "Recent Messages" showing message previews from active threads (limit 5 most recent)
  - **Jobs** – dedicated tab for job management:
    - Section 1: "Invites & Recommendations" showing all pending employer outreach and system-matched jobs
    - Section 2: Prominent "Find More Jobs" button linking to full job listings page
    - Filter and sort options for recommendations
  - **My Jobs** – shows active applications with statuses (Active, Closed, Offered)
  - **Profile** – view and edit profile information, toggle profile active/inactive status
- Workers can edit their profile information at any time
- Workers can make their profile inactive (hidden from all searches) without deleting their account

### Employer Request & Organization Setup

- Employer navigates to request form from marketing page
- Employer completes request form (see Forms: Employer Access Request)
- Form submission creates a pending organization record and sends notification to admins (see Emails: New Organization Request)
- Admin reviews request in admin portal under Organizations tab
- Admin can:
  - Approve – creates organization, sends activation email to employer (see Emails: Organization Approved)
  - Reject – marks organization as rejected (no email sent; admin follows up manually if needed)
- When approved, employer receives email with signup link
- Employer clicks link, creates account with email and password
- System recognizes email is tied to approved organization
- Employer is taken directly to organization setup form (see Forms: Organization Profile Setup)
- After completing org profile, employer is taken to their employer dashboard

### Organization Invitation Flow

- Applies when someone creates an account (worker or employer) and their email matches a pending invitation to join an organization
- After initial account creation, user sees invitation page showing:
  - Organization name
  - Name of person who sent the invitation
  - Invitation message: "You've been invited to join [Organization Name] as an employer user"
  - Two options: "Accept Invitation" or "Decline and Create My Own Profile"
- If user accepts:
  - User is linked to the organization as an employer
  - User is taken directly to employer dashboard (skips worker onboarding)
- If user declines:
  - Invitation status is updated to "declined"
  - User proceeds to worker onboarding flow

### Organization & Team Management

- Organization profile includes company logo, name, location (ZIP code), and description
  - Location entry triggers Atlanta area validation
  - If organization ZIP is outside the Atlanta area, system shows alert: "Note: Your organization appears to be outside our primary service area (Atlanta > 100 miles). You can proceed, but please note our candidate pool is currently focused in Georgia."
  - Organization can proceed with signup
- All employer users within an organization have equal access to:
  - View and post jobs on behalf of the organization
  - Search and message workers
  - View all applications and manage all conversations
- Organization admin (creator) can:
  - Invite new users to join the organization via email (see Forms: Invite Team Member)
  - View list of all organization members with statuses (Pending, Active)
  - Remove users from the organization
- When a team member is invited:
  - System sends invitation email (see Emails: Team Member Invitation)
  - If recipient already has an account, they see the invitation on next login (see Organization Invitation Flow)
  - If recipient doesn't have an account, they click the link, create account, and see the invitation immediately
  - Invitation remains pending until accepted or declined
- Team member list shows:
  - Name
  - Email
  - Status (Pending, Active)
  - Date invited
  - Remove button (for admin only)

### Job Posting

- Employer navigates to "Post a Job" from their dashboard
- Employer completes job posting form (see Forms: Job Posting) on a single page with card-based sections
- Form includes conditional sections:
  - BCBA-specific fields appear only when Position Type is BCBA
  - Work setting and travel fields are hidden when Telehealth Only is selected
  - Compensation fields change based on Hourly/Salary/Both selection
  - Bonus details textarea appears when bonuses are selected
- After completing form, employer can:
  - "Post Job" – publishes immediately
  - "Save as Draft" – saves without publishing
- On posting, job is set to Active
- System immediately runs automated matching (see Automated Job Matching below)
- Employer sees success message: "Your job has been posted! We're notifying matching candidates now. In the meantime, feel free to browse and reach out to candidates directly."
- Employer is redirected to worker search page
- Job posting location validation:
  - ZIP code should be within 100 miles of Atlanta
  - Helper text: "Jobs should be within 100 miles of Atlanta, GA. You can proceed if outside this radius."

### Automated Job Matching

- Runs immediately when a job is posted
- System searches all active worker profiles and filters based on:
  - **Role type match** – job position type (RBT or BCBA) must exactly match worker's credential type
  - **Location match** – job ZIP code must be within worker's specified geographic radius
  - **Pay match** – job's compensation (hourly rate or salary, based on compensation preference) must meet or exceed worker's minimum rate
  - **Employment type match** – job's employment type must be compatible with worker's employment type preferences (e.g., if job is Full-time and worker wants Full-time or Part-time, it matches)
  - **Work setting match** – job's telehealth/in-person setting and work settings (Center-based, In-home, School-based, Community-based) should be compatible with worker's preferences
  - **Schedule match** – job's schedule preference (Standard weekday vs Non-standard/flexible) and schedule details should be compatible with worker's preferences
- For each matching worker, system sends job match notification email (see Emails: New Job Match)
- Matching jobs also appear in worker's "Jobs" tab under "Invites & Recommendations"
- If zero workers match, no notification is sent to employer (they just see the success message and can browse manually)

### Job Listings & Search (Worker View)

- Worker navigates to "Find Jobs" from dashboard
- Worker sees list of all active job postings with filter sidebar
- Available filters:
  - Position type (RBT, BCBA)
  - Location / radius from worker's ZIP code
  - Compensation range (hourly rate or salary)
  - Employment type (Full-time, Part-time, Contract)
  - Schedule (Standard weekday, Non-standard/flexible; Weekdays, Weekends, Mornings, Afternoons, Evenings)
  - Work setting (Telehealth, Center-based, In-home, School-based, Community-based)
- Each job listing card displays:
  - Job title
  - Organization name and logo
  - Location (city or ZIP)
  - Hourly rate or salary range
  - Employment type
  - Brief description excerpt
  - "View Details" button
- Worker clicks "View Details" to see full job posting page with:
  - All job details
  - Full description
  - Organization information section (name, logo, location, description)
  - "Apply to Job" button
- When worker clicks "Apply to Job":
  - Modal opens with text area: "Send a message with your application (optional)"
  - Worker can write introductory message or leave blank
  - On submit:
    - Worker's full profile is revealed to this employer only
    - Message thread is created attached to this job posting
    - Employer receives application notification email (see Emails: New Application Received)
    - Connection status is set to "Active"
  - Worker sees confirmation: "Your application has been sent! The employer can now view your full profile."

### Worker Directory & Search (Employer View)

- Employer navigates to "Search Candidates" from dashboard
- Employer sees list of all active worker profiles (anonymous) with filter sidebar
- Available filters:
  - Role type (RBT, BCBA)
  - Location / radius from employer's location or job location
  - Compensation preference and minimum rate
  - Years of experience
  - Schedule preferences (Standard weekday, Non-standard/flexible)
  - Employment type preferences (Full-time, Part-time, Contract)
  - Work setting preferences (Telehealth, Center-based, In-home, School-based, Community-based)
  - Travel preference (Single site only, Some travel required, Multi-site travel)
  - Verification status (Verified Professional badge)
- Anonymous profile cards display:
  - Generic avatar (color-coded by role type – one color for BCBA, different color for RBT)
  - Role type (RBT or BCBA)
  - Years of experience
  - General location (ZIP code or area)
  - Minimum rate expectation and compensation preference
  - Employment type preferences
  - Work setting preferences (telehealth or in-person settings)
  - Schedule preferences
  - Brief bio/description (if provided)
  - Client needs experience and age groups served
  - Target roles of interest
  - Languages spoken
  - "Verified Professional" badge (if applicable)
  - "Message Candidate" button
- Employer clicks "View Profile" to see full anonymous profile page with all above details expanded
- When employer clicks "Message Candidate":
  - Modal opens (see Forms: Employer Outreach to Worker)
  - Employer selects which job posting to attach the conversation to (dropdown of active jobs)
  - Employer writes initial message
  - On submit:
    - System creates message thread attached to selected job
    - Worker receives employer outreach notification email (see Emails: Employer Outreach)
    - Worker sees message in their dashboard under "New Opportunities" with status "Employer Interest"
    - Worker can accept (reveals profile to employer, sets connection to Active) or decline (closes connection)

### Messaging System

- All message threads are attached to a specific job posting
- Threads are displayed in a right-side drawer interface that overlays the current page
- Drawer can be opened from:
  - Worker dashboard Home tab (clicking recent message preview)
  - Worker Jobs tab (clicking on a job with messages)
  - Employer job management page (clicking applicant name or message icon)
  - Unread message badge in header navigation
- Drawer displays:
  - Job title at top
  - Thread participant names (worker name + organization name)
  - Chronological message history
  - Each message shows sender name, timestamp, and content
  - Message input field at bottom
  - Close drawer button
- One thread exists per worker-job combination (employer can have multiple threads with same worker if for different jobs)
- Messages are sent with sender's name attribution:
  - From employer side: shows as "Andrew from Airdev"
  - From worker side: shows as worker's name
- Email notification sent when new message is received (see Emails: New Message Notification)
- Unread message count appears as badge on:
  - Header navigation
  - Dashboard Home tab "Recent Messages" section
  - Jobs tab (for workers)
  - Job listings (for employers)

### Job & Application Management (Employer View)

- Employer dashboard displays:
  - Metrics cards: active jobs count, total applications count, unread messages count
  - "My Jobs" tab showing all job postings in a list
- Each job listing shows:
  - Job title
  - Position type
  - Location
  - Status (Active, Closed)
  - Number of applicants/connections
  - Posted date
  - Actions: View Applicants, Edit Job, Close Job
- Clicking "View Applicants" opens applicant list for that job showing:
  - Worker name (if profile revealed)
  - Role type
  - Application/connection status (Active, Offered, Closed)
  - Last message timestamp
  - Actions: View Profile, Open Message Thread, Update Status
- Employer can update connection status:
  - Mark as "Offered" – indicates offer extended
  - Mark as "Closed" – indicates not moving forward (requires confirmation, closes thread)
- Employer can close entire job posting:
  - Requires confirmation: "Are you sure you want to close this job? All active connections will be closed."
  - On confirm: job status changes to Closed, all connections for this job are closed
  - Closed jobs are hidden from search and matching but remain in employer's job list

### Admin Portal

- Admin logs in with admin credentials (created manually in database)
- Admin sees dashboard with tabs:
  - **Dashboard** – overview with metrics:
    - Total organizations (Active, Pending, Inactive counts)
    - Total jobs posted
    - Total workers (Active, Pending Verification counts)
    - Total connections/applications
  - **Organizations** – data table showing all organizations:
    - Pending organizations shown at top (highlighted)
    - Then Active organizations
    - Then Inactive organizations
    - Columns: Name, Admin Email, Status, Member Count, Active Jobs Count, Date Created
    - Actions: View Details, Approve (for pending), Deactivate/Reactivate
    - "Create New Organization" button at top
  - **Jobs** – data table showing all job postings:
    - Columns: Job Title, Organization, Position Type, Location, Status, Application Count, Posted Date
    - Actions: View Job Page
    - Can filter by status, organization, position type
  - **ABA Professionals** – data table showing all worker accounts:
    - Pending license verifications shown at top (highlighted)
    - Then Active workers
    - Then Inactive workers
    - Columns: Name, Role Type, Location, Verification Status, Date Registered
    - Actions: View Profile, Approve Verification (for pending), Deactivate/Reactivate
  - **Connections** – data table showing all worker-job connections:
    - Columns: Worker Name, Organization, Job Title, Status, Last Activity Date
    - Can filter by status, organization, worker
- Creating a new organization (admin initiated):
  - Admin clicks "Create New Organization"
  - Admin completes form (see Forms: Admin Create Organization)
  - On submit, organization is created and invitation email is sent to specified email address
  - Organization appears as Pending until that person completes signup and org profile setup
- Approving a pending organization:
  - Admin views organization details
  - Admin clicks "Approve Organization"
  - Organization status changes to Active
  - Activation email is sent to organization admin (see Emails: Organization Approved)
- Verifying worker licenses:
  - When worker submits license number during signup, verification status is "Pending"
  - Admin views worker profile showing license number and any other submitted details
  - Admin manually verifies license against state registry (external process)
  - Admin clicks "Approve Verification" or "Deny Verification"
  - If approved: worker receives "Verified Professional" badge on profile, receives confirmation email (see Emails: License Verified)
  - If denied: verification status remains blank (no badge), no email sent (admin follows up manually if needed)

### Integrations

| Service | Purpose | What's New |
|---------|---------|------------|
| Google Maps API | ZIP code validation and distance calculations for Atlanta radius | New integration for geographic validation |
| Email Service (Resend or similar) | Transactional email delivery | New integration for all platform emails |

## Designs

### Marketing Page (new)

Public landing page communicating value proposition. Hero section with dual CTAs: "Sign Up as a Professional" (worker registration) and "Post Jobs as an Employer" (employer request form). Features section highlighting key benefits for workers and employers. Mentions Atlanta-only service area. Footer with links and contact info.

Notable design guidance:
- Clear distinction between worker and employer signup flows
- Atlanta service area mentioned prominently but not as first thing user sees
- Mobile-first responsive design

### Worker Registration Flow (new)

Multi-step onboarding wizard guiding workers through account creation and profile setup. Progress indicator showing current step with labels (Start, Privacy, Goals, Experience, Preferences, Profile). Each step is a single focused form or informational screen. Initial screen presents "ABA Professional" vs "Employer" selection. Steps: Account Creation → Let's Get Started (role + basic info) → Privacy Explainer → Job Search Preferences → Experience → Work Preferences → Profile & License.

Notable design guidance:
- Use color and visual interest to make forms engaging (not just black/white forms)
- ZIP code validation shows helpful error message if outside Atlanta area, success checkmark if valid
- Privacy explainer phase uses card-based layout with icons to explain anonymity model
- Preference step should feel exciting (leading with benefits, not bureaucracy)
- Step navigation shows checkmarks for completed phases

### Worker Dashboard (new)

Primary workspace for workers. Tab navigation: Home, Jobs, My Jobs, Profile. Home tab features metrics cards at top and two-column layout below (left: new opportunities, right: recent messages). Clean card-based design. Header shows unread message badge.

Notable design guidance:
- "New Opportunities" section shows both employer invites and system recommendations
- Message previews are concise (one line of text, timestamp, unread indicator)
- "Find More Jobs" button should be prominent on Jobs tab

### Job Listings Page (new)

Search and browse interface for workers. Filter sidebar on left with collapsible sections. Job cards in grid layout. Each card shows key info at a glance. Clicking opens full job detail page with organization info section and apply button.

Notable design guidance:
- Filters should be easy to use without being overwhelming
- Job cards should have consistent layout and sizing
- Organization logo and name prominent but not distracting
- Full job page includes organization description section separate from job description

### Job Detail Page & Application Modal (new)

Full-page job view with hero section showing key details. Job description in main content area. Organization info sidebar or section below. "Apply to Job" button triggers modal overlay with optional message text area. Modal has simple, focused design.

Notable design guidance:
- Make it clear the message is optional
- Show confirmation feedback when application is submitted
- Organization section should give enough context without requiring separate org profile page

### Worker Directory (Employer View) (new)

Search and browse interface for employers. Filter sidebar on left. Anonymous worker profile cards in grid layout. Each card shows generic avatar (color-coded by role type), key qualifications, and "Message Candidate" button.

Notable design guidance:
- Generic avatars should be professional and gender-neutral
- Use different colors for RBT vs BCBA to provide visual distinction without being too playful
- Bio text should be visible but truncated with "View Profile" to expand
- "Verified Professional" badge should be clear and prominent

### Anonymous Worker Profile Page (new)

Full profile view showing all available anonymous information. Clean layout with sections for experience, preferences, qualifications, and bio. "Message Candidate" button prominent. No personally identifying information visible.

Notable design guidance:
- Should feel comprehensive enough for employer to determine fit
- Clearly anonymous (no name/photo) but professional
- Badge for verification should stand out

### Employer Outreach Modal (new)

Modal overlay triggered when employer clicks "Message Candidate." Dropdown to select job posting (required). Text area for message. Send and cancel buttons. Simple, focused design.

Notable design guidance:
- Make it clear they're selecting which job to discuss
- Message field should have reasonable character limit indicated
- Show loading state on send

### Employer Request Form (new)

Simple public form for employers to request access. Fields: Company Name, Your Name, Work Email, optional message. Submit button. Confirmation page after submission.

Notable design guidance:
- Should feel professional and trustworthy
- Confirmation message explains next steps (admin review and approval)
- No account creation at this stage

### Organization Profile Setup (new)

Form shown to employer after admin approval when they first log in. Fields for company logo upload, company name, location (ZIP code), and description. Submit button. Shows Atlanta radius warning if applicable.

Notable design guidance:
- Logo upload should have preview
- Alert about out-of-area location should be informational, not blocking
- After submit, goes directly to employer dashboard

### Employer Dashboard (new)

Primary workspace for employers. Metrics cards showing jobs, applications, messages. "My Jobs" tab showing job list with applicant counts and statuses. "Search Candidates" link in navigation. "Post a Job" button prominent.

Notable design guidance:
- Quick access to key actions (post job, search candidates)
- Job list should show enough detail to be useful without being cluttered
- Unread message counts on relevant jobs

### Job Posting Form (new)

Single-page form with card-based sections: Basic Information, Employment Details, Work Structure, Requirements, Benefits & Incentives, Additional Information. ZIP code field with validation. Compensation fields with conditional logic (Hourly/Salary/Both). BCBA-specific section appears conditionally. Telehealth toggle gates work setting and travel fields.

Notable design guidance:
- Clear section headings in card format
- Conditional fields appear smoothly (e.g., BCBA-specific questions, work setting when not telehealth)
- Validation helper text for ZIP should be informational, not blocking
- Save as Draft and Post Job buttons at bottom

### Job Management & Applicant List (new)

Employer view of specific job showing applicant list. Each applicant row shows name (if revealed), status, last activity. Actions to view profile, message, or update status. Status change confirms before executing.

Notable design guidance:
- Clear visual distinction between connection statuses
- Confirmation modal for closing connections or jobs
- Quick access to message drawer from this page

### Team Management Page (new)

Organization settings page showing team member list. Each row shows name, email, status (Pending/Active), and remove action. "Invite New Member" button opens simple modal with email field.

Notable design guidance:
- Pending invitations clearly marked
- Remove action requires confirmation
- Invite modal is simple and quick

### Message Drawer (new)

Right-side overlay drawer showing message thread. Job title header. Message history (chronological). Message input at bottom. Close button. Opens from various locations in app.

Notable design guidance:
- Drawer slides in from right, overlays current page
- Sender names shown clearly (with company name for employers)
- Timestamps for each message
- Unread messages highlighted
- Input field always visible at bottom
- Responsive design for mobile (full screen on small screens)

### Admin Portal Dashboard (new)

Admin workspace with tab navigation: Dashboard, Organizations, Jobs, ABA Professionals, Connections. Dashboard tab shows metrics cards. Other tabs show data tables with filters and actions.

Notable design guidance:
- Pending items (orgs, verifications) highlighted at top of lists
- Data tables sortable and filterable
- Actions contextual to each row
- Clear visual hierarchy

### Admin Organization Management (new)

Data table of all organizations with actions. "Create New Organization" button opens modal. Approving pending orgs updates status and triggers email. Viewing org details shows members, jobs, and activity.

Notable design guidance:
- Pending organizations visually distinct
- Create org modal simple (name and admin email only)
- Org details page shows comprehensive info without being overwhelming

### Admin License Verification (new)

Worker profile view in admin portal showing license details submitted by worker. Admin sees license number and submission date. Actions: Approve or Deny. Approval gives worker badge and sends email.

Notable design guidance:
- License details clearly displayed
- Approve/deny actions should require confirmation
- Show verification status history (when submitted, who approved, when)

## Forms

### Worker Account Creation

| Field | Prompt | Type | Required | Options/Validation | Notes |
|-------|--------|------|----------|-------------------|-------|
| First Name | "First name" | Text | Yes | Max 100 characters | |
| Last Name | "Last name" | Text | Yes | Max 100 characters | |
| Email | "Email address" | Email | Yes | Valid email format, unique | |
| Password | "Create a password" | Password | Yes | Min 8 characters | |

### Worker Basic Information (Phase 1: Let's Get Started)

| Field | Prompt | Type | Required | Options/Validation | Notes |
|-------|--------|------|----------|-------------------|-------|
| Role Type | "Are you an active BCBA or RBT?" | Radio | Yes | RBT (Registered Behavior Technician), BCBA (Board Certified Behavior Analyst) | Defaults to RBT |
| First Name | "First Name" | Text | Yes | | |
| Last Name | "Last Name" | Text | Yes | | |
| Phone Number | "Phone Number" | Tel | No | Valid US phone format | Marked as optional |
| ZIP Code | "ZIP Code" | Text | Yes | 5 digits, validated against Atlanta area | Shows error if outside Atlanta area; shows "Location verified" with checkmark if valid |

### Worker Job Search Preferences (Phase 3: What Are You Looking For?)

| Field | Prompt | Type | Required | Options/Validation | Notes |
|-------|--------|------|----------|-------------------|-------|
| Primary Goal | "Primary Goal" | Radio | Yes | Career Move (new primary role), Supplemental / Side Hustle | |
| Job Search Status | "Job Search Status" | Select | Yes | Actively looking, Open to opportunities, Just browsing | |
| Employment Type | "Employment Type" | Multi-select checkbox | No | Full-time, Part-time, Contract | |
| Schedule Preference | "Schedule Preference" | Radio | Yes | Standard weekday, Non-standard / flexible | Defaults to Standard weekday |
| Schedule Availability | "Schedule Availability" | Multi-select checkbox | No | Weekdays, Weekends, Mornings, Afternoons, Evenings | Shows only if Schedule Preference is "Non-standard / flexible" |
| Required Notice Period | "Required Notice Period" | Select | Yes | Immediate, 2 Weeks, 30 Days, 60+ Days | |

### Worker Experience (Phase 4: Tell Us About Your Experience)

| Field | Prompt | Type | Required | Options/Validation | Notes |
|-------|--------|------|----------|-------------------|-------|
| Years of Experience | "Years of Experience" | Select | Yes | 0-2 years, 2-5 years, 5-8 years, 8+ years | |
| Age Groups Served | "Age Groups Served" | Multi-select checkbox | No | Early Intervention (0-5), School Age (6-12), Adolescents (13-17), Adults (18+) | |
| Languages Spoken | "Languages Spoken" | Multi-select checkbox | No | English, Spanish, Mandarin, Vietnamese, Korean, Tagalog, Arabic, French, Portuguese, Other | |

### Worker Work Preferences (Phase 5: Tell Us What's Important To You)

| Field | Prompt | Type | Required | Options/Validation | Notes |
|-------|--------|------|----------|-------------------|-------|
| **Compensation** | | | | | |
| Compensation Preference | "Compensation Preference" | Radio | Yes | Hourly only, Salary only, Open to hourly or salary | Defaults to Hourly only |
| Minimum Hourly Rate | "Minimum Hourly Rate" | Number | Conditional | Dollar amount | Shows if compensation preference includes hourly |
| Minimum Annual Salary | "Minimum Annual Salary" | Number | Conditional | Dollar amount | Shows if compensation preference includes salary |
| **Work Setting** | | | | | |
| Telehealth Only | "Telehealth Only?" | Radio | Yes | Yes, telehealth only; No, open to in-person | |
| Work Setting Preference | "Work Setting Preference" | Multi-select checkbox | No | Center-based, In-home, School-based, Community-based | Shows only if Telehealth Only is "No" |
| **Location & Travel** | | | | | |
| Geographic Radius | "Geographic Radius" | Select | No | 5 miles, 10 miles, 15 miles, 25 miles, 50 miles | Shows only if Telehealth Only is "No" |
| Willing to Relocate | "Willing to Relocate?" | Radio | Yes | Yes, No | |
| Travel / Multi-Site Preference | "Travel / Multi-Site Preference" | Select | Yes | Single site only, Some travel required, Multi-site travel | |
| **Target Roles** | | | | | |
| Roles of Interest | "Roles of Interest" | Multi-select checkbox | No | RBT: RBT, Senior RBT, Lead / Supervisor, Other; BCBA: BCBA, Lead BCBA, Clinic Supervisor, Clinical Director, Other | Options change based on role type selected in Phase 1 |
| Maximum Weekly Billable Requirement | "Maximum Weekly Billable Requirement" | Select | No | Under 20 hours, 21-25 hours, 26-30 hours, 30+ hours | Shows only if role type is BCBA |

### Worker Profile & License (Phase 6: Make Your Profile Shine)

| Field | Prompt | Type | Required | Options/Validation | Notes |
|-------|--------|------|----------|-------------------|-------|
| Profile Photo | "Profile Photo" | Image upload | No | Image files (JPG, PNG) | Circular preview; helper text: "Optional — adds a personal touch to your profile" |
| Professional Bio / Description | "Professional Bio / Description" | Textarea | No | Max 500 characters | Character counter shown; visible in anonymous profile |
| Resume | "Resume" | File upload | No | PDF/DOC/DOCX, max 5MB | Only visible after profile revealed |
| LinkedIn Profile URL | "LinkedIn Profile URL" | URL | No | Valid URL format | Placeholder: "https://linkedin.com/in/yourprofile" |
| Active Credential Attestation | "I attest that I hold an active [RBT/BCBA] credential" | Checkbox | No | | Role type populated from Phase 1 |
| License Number | "License Number" | Text | No | | Shows only if attestation checkbox is checked; helper text: "Enter your license number to receive a 'Verified Professional' badge after we verify your license" |

### Employer Access Request

| Field | Prompt | Type | Required | Options/Validation | Notes |
|-------|--------|------|----------|-------------------|-------|
| Company Name | "Company name" | Text | Yes | | |
| Your Name | "Your name" | Text | Yes | | |
| Work Email | "Work email" | Email | Yes | Valid email format | Helper text: "Please use your work email address" |
| Brief Message | "Brief message (Optional)" | Textarea | No | | Placeholder: "Tell us about your hiring needs, team size, or any questions you have..." |

### Organization Profile Setup

| Field | Prompt | Type | Required | Options/Validation | Notes |
|-------|--------|------|----------|-------------------|-------|
| Company Logo | Upload area | Image upload | No | Image files | Click to upload with preview |
| Company Name | "Company Name" | Text | Yes | | |
| Location (ZIP Code) | "Location (ZIP Code)" | Text | Yes | 5 digits, validated against Atlanta area | Shows warning if outside service area (informational, not blocking) |
| Description | "Description" | Textarea | Yes | | Placeholder: "Tell us about your organization..." |

### Invite Team Member

| Field | Prompt | Type | Required | Options/Validation | Notes |
|-------|--------|------|----------|-------------------|-------|
| Email Address | "Team member's email address" | Email | Yes | Valid email format | |

### Job Posting

| Field | Prompt | Type | Required | Options/Validation | Notes |
|-------|--------|------|----------|-------------------|-------|
| **Basic Information** | | | | | |
| Job Title | "Job Title" | Text | Yes | Max 100 characters | Placeholder: "e.g., Registered Behavior Technician - Full Time" |
| Position Type | "Position Type" | Select | Yes | RBT, BCBA | |
| ZIP Code | "ZIP Code" | Text | Yes | 5 digits | Helper text: "Jobs should be within 100 miles of Atlanta, GA. You can proceed if outside this radius." |
| Clinic/Location Name | "Clinic/Location Name" | Text | No | | Placeholder: "e.g., Bright Future ABA - Sandy Springs" |
| **Employment Details** | | | | | |
| Employment Type | "Employment Type" | Multi-select checkbox | Yes | Full-time, Part-time, Contract | |
| Schedule Expectation | "Schedule Expectation" | Radio | Yes | Standard weekday, Non-standard / flexible | Defaults to Standard weekday |
| Schedule Availability | "Schedule Availability" | Multi-select checkbox | No | Weekdays, Weekends, Mornings, Afternoons, Evenings | Shows only if Schedule Expectation is "Non-standard / flexible" |
| Compensation Type | "Compensation Type" | Radio | Yes | Hourly, Salary, Open to hourly or salary | Defaults to Hourly |
| Min Rate | "Min Rate ($/hr)" or "Min Salary ($)" | Number | Yes | Dollar amount | Label changes based on compensation type |
| Max Rate | "Max Rate ($/hr)" or "Max Salary ($)" | Number | Yes | Dollar amount | Label changes based on compensation type |
| Expected Weekly Hours | "Expected Weekly Hours" | Select | No | Under 20 hours, 20-29 hours, 30-35 hours, 36-40 hours, 40+ hours | Shows only if compensation type includes hourly |
| Guaranteed Hours/Pay | "Guaranteed Hours/Pay?" | Radio | Yes | Yes, No | |
| Start Date | "Start Date" | Date | No | | |
| **Work Structure** | | | | | |
| Telehealth Only | "Telehealth Only?" | Radio | Yes | Yes, telehealth only; No, in-person work required | |
| Work Setting | "Work Setting" | Multi-select checkbox | No | Center-based, In-home, School-based, Community-based | Shows only if Telehealth Only is "No" |
| Travel Between Locations | "Travel Between Locations" | Select | No | Single site only, Some travel required, Multi-site travel | Shows only if Telehealth Only is "No" |
| **BCBA-Specific Fields** | | | | | Shows only if Position Type is BCBA |
| Weekly Billable Expectation | "Weekly Billable Expectation" | Select | No | Under 20 hours, 21-25 hours, 26-30 hours, 30+ hours | |
| Non-Billable/Admin Work Included | "Non-Billable/Admin Work Included?" | Radio | No | Yes, No | |
| Work From Home/Hybrid Flexibility | "Work From Home/Hybrid Flexibility?" | Radio | No | Yes, No | |
| **Requirements** | | | | | |
| Required Years of Experience | "Required Years of Experience" | Number | No | Min 0, max 30 | |
| Preferred Years of Experience | "Preferred Years of Experience" | Number | No | Min 0, max 30 | |
| Required/Preferred Specializations | "Required/Preferred Specializations" | Multi-select checkbox | No | Verbal, Non-verbal, AAC, Severe behaviors, Mild / moderate behaviors, Early learner programs, School-based / IEP experience, Parent / caregiver training required | |
| Caseload Size | "Caseload Size" | Text | No | | Placeholder: "e.g., 8-12 clients" |
| Client Age Groups | "Client Age Groups" | Multi-select checkbox | No | Early Intervention (0-5), School Age (6-12), Adolescents (13-17), Adults (18+) | |
| **Benefits & Incentives** | | | | | |
| Benefits Offered | "Benefits Offered" | Multi-select checkbox | No | Medical/Dental/Vision, 401(k) with Matching, Paid Time Off (PTO), CEU Stipend, Paid Indirect/Admin Time, Mileage Reimbursement, Laptop/Tablet Provided, Life/Disability Insurance, Professional Liability Insurance, Tuition Assistance, Exam/Certification Support | |
| Bonuses & Incentives | "Bonuses & Incentives" | Multi-select checkbox | No | Performance-based bonuses, Sign-on bonus, Retention bonus, Referral bonus, Leadership incentive, Relocation assistance | |
| Bonus Details | "Bonus Details" | Textarea | No | | Shows only if any bonuses are selected; placeholder: "Provide details about bonuses (e.g., sign-on bonus amount, performance bonus structure)" |
| **Additional Information** | | | | | |
| Job Description | "Job Description" | Textarea | Yes | | Rich text area |
| Benefits Overview | "Benefits Overview" | Textarea | No | | Placeholder: "Describe benefits, PTO, insurance, CEU support, etc." |

### Employer Outreach to Worker

| Field | Prompt | Type | Required | Options/Validation | Notes |
|-------|--------|------|----------|-------------------|-------|
| Select Job | "Which position are you reaching out about?" | Select | Yes | Dropdown of employer's active job postings | Shows job title |
| Message | "Your message" | Textarea | Yes | Max 2000 characters | |

### Admin Create Organization

| Field | Prompt | Type | Required | Options/Validation | Notes |
|-------|--------|------|----------|-------------------|-------|
| Organization Name | "Organization name" | Text | Yes | Max 200 characters | |
| Admin Email | "Email address for organization admin" | Email | Yes | Valid email format | |

## Emails

### New Job Match

- **Sent when:** Worker's profile matches a newly posted job based on automated matching criteria
- **To:** The worker's email
- **Subject:** New job opportunity: {{job_title}} at {{organization_name}}

**Body:**

> Hi {{worker_name}},
>
> We found a new job that matches your preferences!
>
> **{{job_title}}** at **{{organization_name}}**
> - **Location:** {{job_location}}
> - **Rate:** {{rate_range}}
> - **Employment type:** {{employment_type}}
>
> [View Job & Apply →]({{job_url}})
>
> This job matches your preferences for role type, location, pay, and employment type. If you're interested, apply now to reveal your profile to the employer.

### Employer Outreach

- **Sent when:** Employer sends initial message to worker from directory
- **To:** The worker's email
- **Subject:** {{employer_name}} from {{organization_name}} is interested in you for a position

**Body:**

> Hi {{worker_name}},
>
> {{employer_name}} from **{{organization_name}}** has reached out to you about their **{{job_title}}** position.
>
> **Their message:**
>
> {{employer_message}}
>
> [View Message & Respond →]({{message_url}})
>
> Accepting this message will reveal your full profile to {{organization_name}} and start a conversation.

### New Application Received

- **Sent when:** Worker applies to an employer's job posting
- **To:** All employer users in the organization
- **Subject:** New application for {{job_title}}

**Body:**

> Hi {{employer_name}},
>
> {{worker_name}} has applied to your **{{job_title}}** position.
>
> **Worker profile:**
> - **Role:** {{role_type}}
> - **Experience:** {{years_experience}}
> - **Location:** {{worker_location}}
>
> **Their message:**
>
> {{application_message}}
>
> [View Profile & Respond →]({{profile_url}})

### New Message Notification

- **Sent when:** A message is received in an active thread
- **To:** The recipient's email
- **Subject:** New message from {{sender_name}} about {{job_title}}

**Body:**

> Hi {{recipient_name}},
>
> You have a new message from **{{sender_name}}** {{sender_context}} about the **{{job_title}}** position.
>
> {{message_preview}}
>
> [View Message & Reply →]({{message_url}})

**Notes:**
- `{{sender_context}}` shows "from {{organization_name}}" if sender is employer, otherwise blank
- `{{message_preview}}` shows first 200 characters of message

### Team Member Invitation

- **Sent when:** Organization admin invites someone to join their organization
- **To:** The invited email address
- **Subject:** You've been invited to join {{organization_name}} on ABA Marketplace

**Body:**

> Hi there,
>
> {{inviter_name}} has invited you to join **{{organization_name}}** as an employer user on ABA Marketplace.
>
> As a team member, you'll be able to:
> - Post jobs on behalf of {{organization_name}}
> - Search and message candidates
> - Manage applications and connections
>
> [Accept Invitation →]({{signup_url}})
>
> If you already have an account, just log in and you'll see the invitation.

### New Organization Request

- **Sent when:** Employer submits access request form
- **To:** All admin users
- **Subject:** New employer organization request: {{organization_name}}

**Body:**

> Hi {{admin_name}},
>
> A new organization has requested access to post jobs on ABA Marketplace.
>
> **Organization:** {{organization_name}}
> **Contact:** {{contact_name}}
> **Email:** {{contact_email}}
>
> **Message:**
> {{request_message}}
>
> [Review Request →]({{admin_review_url}})

### Organization Approved

- **Sent when:** Admin approves a pending organization
- **To:** The organization admin email from the request
- **Subject:** Welcome to ABA Marketplace – Your organization has been approved!

**Body:**

> Hi {{contact_name}},
>
> Great news! Your organization **{{organization_name}}** has been approved to post jobs on ABA Marketplace.
>
> [Create Your Account →]({{signup_url}})
>
> Once you create your account, you'll be able to complete your organization profile, post jobs, and start connecting with qualified ABA professionals in the Atlanta area.

### License Verified

- **Sent when:** Admin approves a worker's license verification
- **To:** The worker's email
- **Subject:** Your license has been verified!

**Body:**

> Hi {{worker_name}},
>
> Your {{credential_type}} license has been verified! Your profile now displays the "Verified Professional" badge, which helps you stand out to employers.
>
> [View Your Profile →]({{profile_url}})

### Worker Welcome Email

- **Sent when:** Worker completes registration and onboarding
- **To:** The worker's email
- **Subject:** Welcome to ABA Marketplace!

**Body:**

> Hi {{worker_name}},
>
> Welcome to ABA Marketplace! Your profile is ready and you'll start receiving job matches that fit your preferences.
>
> **What's next:**
> - We'll email you when jobs match your criteria
> - You can browse all available jobs anytime
> - Employers can view your anonymous profile and reach out
>
> [Go to Dashboard →]({{dashboard_url}})

### Employer Welcome Email

- **Sent when:** Employer completes organization setup
- **To:** The employer's email
- **Subject:** Welcome to ABA Marketplace!

**Body:**

> Hi {{employer_name}},
>
> Welcome to ABA Marketplace! Your organization **{{organization_name}}** is all set up.
>
> **What's next:**
> - Post your first job to start receiving applications
> - Browse our directory of qualified ABA professionals
> - Invite your team members to collaborate
>
> [Go to Dashboard →]({{dashboard_url}})

### Connection Status Changed to Offered

- **Sent when:** Employer marks a connection as "Offered"
- **To:** The worker's email
- **Subject:** {{organization_name}} has extended an offer for {{job_title}}

**Body:**

> Hi {{worker_name}},
>
> Good news! {{organization_name}} has marked your application for **{{job_title}}** as "Offered."
>
> [View Message Thread →]({{message_url}})
>
> Continue your conversation with {{employer_name}} to finalize the details. Congratulations!
