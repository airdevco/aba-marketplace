# Behavoya Field Requirements

This document captures all field requirements from the client for review and comparison against the current prototype. Use this to identify gaps, inconsistencies, and implementation priorities.

---

## Table of Contents

1. [Professional Onboarding Flow](#1-professional-onboarding-flow)
2. [Worker Profile Fields (Account/Settings)](#2-worker-profile-fields-accountsettings)
3. [Job Posting Fields (Employer)](#3-job-posting-fields-employer)
4. [Candidate Search Filters (Employer Directory)](#4-candidate-search-filters-employer-directory)
5. [Job Search Filters (Professional Search)](#5-job-search-filters-professional-search)
6. [Cross-Reference Matrix](#6-cross-reference-matrix)
7. [Gap Analysis](#7-gap-analysis)

---

## 1. Professional Onboarding Flow

### Phase 1: "Let's Get Started"
> Create your profile in just a few minutes! Your identifiable information stays private and is only shared when you choose to apply to a role or accept a message from an employer.

| Field | Type | Required | Privacy | Notes |
|-------|------|----------|---------|-------|
| Name | text | Yes | Private | |
| Phone Number | text | No | Private | |
| Zip Code | text | Yes | Public | |
| Are You an Active BCBA or RBT | radio | Yes | Public | |

### Phase 1.5: Privacy Explainer
> Your profile is private by default. Employers can't see your name or details unless you choose to apply to a role or accept a message.

**Employers CAN see:** BCBA or RBT, Years of Experience, etc.
**Employers CAN'T see:** Name, Email, About Me, Profile Picture, etc.

### Phase 2: "What Are You Looking For?"
> Tell us what kind of opportunity you're hoping to find right now. This helps us show roles that match with what you need.

| Field | Type | Required | Options | Conditional |
|-------|------|----------|---------|-------------|
| Primary Goal | radio | Yes | Career Move (new primary role), Supplemental / Side Hustle | |
| Job Search Status | dropdown | Yes | Actively looking, Open to opportunities, Just browsing | |
| Employment Type | multi-select | Yes | Full-time, Part-time, Contract | |
| Schedule Preference | single select | Yes | Standard weekday, Non-standard / flexible | |
| Schedule Details | multi-select | No | Weekdays, Weekends, Mornings, Afternoons, Evenings | Only if Schedule Preference = Non-Standard |
| Required Notice Period | dropdown | Yes | Immediate, 2 Weeks, 30 Days, 60+ Days | |

### Phase 3: "Tell Us About Your Experience"
> Share a bit about your background and the types of clients you've worked with.

| Field | Type | Required | Options |
|-------|------|----------|---------|
| Years of Experience (Post-Certification) | dropdown | Yes | 0-2 years, 2-5 years, 5-8 years, 8+ years |
| Age Groups Served | multi-select | No | Early Intervention (0-5), School Age (6-12), Adolescents (13-17), Adults (18+) |
| Languages Spoken | dropdown (multi-select) | No | Predefined list (managed separately) |

### Phase 4: "Tell Us What's Important To You"
> Set your non-negotiables, like pay, location, and work setting.

#### Compensation

| Field | Type | Required | Options | Conditional |
|-------|------|----------|---------|-------------|
| Compensation Preference | single select | Yes | Hourly only, Salary only, Open to hourly or salary | |
| Minimum Hourly Rate | number ($/hour) | Yes | | If Comp Pref = Hourly Only OR Open |
| Minimum Annual Salary | number ($/year) | Yes | | If Comp Pref = Salary Only OR Open |

#### Location
*(Shown only if Telehealth Only = NO)*

| Field | Type | Required | Options |
|-------|------|----------|---------|
| Geographic Radius | dropdown | Yes | 5 miles, 10 miles, 15 miles, 25 miles, 50 miles |
| Willing to Relocate | yes/no | No | |
| Willingness to Travel Between Locations | dropdown | No | Single site only, Some travel required, Multi-site travel |

#### Work Setting

| Field | Type | Required | Options | Conditional |
|-------|------|----------|---------|-------------|
| Telehealth Only | yes/no | Yes | | |
| Work Setting Preference | multi-select | Yes | Center-based, In-home, School-based, Community-based | Required if Telehealth Only = NO |

#### BCBA-Only Fields

| Field | Type | Required | Options |
|-------|------|----------|---------|
| Maximum Weekly Billable Requirement | dropdown | No | Under 20 hours, 21-25 hours, 26-30 hours, 30+ hours |
| Target Roles | multi-select | No | BCBA, Lead BCBA, Clinic Supervisor, Clinical Director, Other |

#### RBT-Only Fields

| Field | Type | Required | Options |
|-------|------|----------|---------|
| Target Roles | multi-select | No | RBT, Senior RBT, Lead / Supervisor, Other |

### Phase 5: "Make Your Profile Shine"
> Add optional details to strengthen your profile and stand out.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Professional Bio / Description | long text | No | |
| Resume Upload | file | No | |
| LinkedIn Profile URL | link | No | |
| Verification Badge | action | No | |

---

## 2. Worker Profile Fields (Account/Settings)

### Account & Basic Information

| Field | Type | Required | Privacy |
|-------|------|----------|---------|
| Email Address | text | Yes | Private |
| Full Name | text | Yes | Private |
| Phone Number | text | No | Private |
| Profile Photo | image upload | No | Private |

### Role & Credential Attestation

| Field | Type | Required | Options |
|-------|------|----------|---------|
| Role Type | dropdown | Yes | RBT, BCBA |
| Active Credential Attestation | checkbox | Yes | "I attest that I currently hold an active RBT or BCBA credential." |
| License / Certification Number | text | No | Profiles with verified credentials may receive higher visibility |

### Job Intent

| Field | Type | Required | Options |
|-------|------|----------|---------|
| Job Intent | radio | Yes | Primary role, Supplemental / additional work |
| Job Search Status | dropdown | Yes | Actively looking, Open to opportunities, Just browsing |

### Work Structure Preferences

| Field | Type | Required | Options | Conditional |
|-------|------|----------|---------|-------------|
| Employment Type | multi-select | Yes | Full-time, Part-time, Contract | |
| Work Setting Preference | multi-select | Conditional | Center-based, In-home, School-based, Community-based | Required if Telehealth Only = NO |
| Telehealth Only | yes/no | Yes | | |

### Location (Always Collected)

| Field | Type | Required |
|-------|------|----------|
| ZIP Code | text (5 digits) | Yes |

### Schedule & Availability

| Field | Type | Required | Options | Conditional |
|-------|------|----------|---------|-------------|
| Schedule Preference | single select | Yes | Standard weekday, Non-standard / flexible | |
| Schedule Availability | multi-select | No | Weekdays, Weekends, Mornings, Afternoons, Evenings | If Schedule Preference = Non-Standard |
| Earliest Start Availability | dropdown | Yes | Immediate, 2 weeks, 30 days, 60+ days | |

### Location & Travel
*(Shown only if Telehealth Only = NO)*

| Field | Type | Required | Options |
|-------|------|----------|---------|
| Preferred Commute Radius | dropdown | Yes | 5 miles, 10 miles, 15 miles, 25 miles, 50 miles |
| Open to Relocation | yes/no | No | |
| Comfort with Multi-Site Work | dropdown | No | Single site only, Some travel required, Multi-site travel |

### Compensation Preferences

| Field | Type | Required | Options | Conditional |
|-------|------|----------|---------|-------------|
| Compensation Type Openness | single select | Yes | Hourly only, Salary only, Open to hourly or salary | |
| Minimum Hourly Rate | number ($/hour) | Yes | | If Hourly selected |
| Preferred Weekly Hours | dropdown | No | Under 20 hours, 20-29 hours, 30-35 hours, 36-40 hours, 40+ hours | If Hourly selected |
| Minimum Annual Salary | number ($/year) | Yes | | If Salary selected |

### Experience

| Field | Type | Required | Options |
|-------|------|----------|---------|
| Years of Experience (Post-Certification) | dropdown | Yes | 0-2 years, 2-5 years, 5-8 years, 8+ years |
| Age Groups Served | multi-select | No | Early Intervention (0-5), School Age (6-12), Adolescents (13-17), Adults (18+) |
| Languages Spoken | dropdown (multi-select) | No | Predefined list (managed separately) |

### BCBA-Only Fields

| Field | Type | Required | Options |
|-------|------|----------|---------|
| Roles of Interest | multi-select | No | BCBA, Lead BCBA, Clinic Supervisor, Clinical Director, Other |
| Weekly Billable Preference | single select | No | Under 20 hours, 21-25 hours, 26-30 hours, 30+ hours |

### RBT-Only Fields

| Field | Type | Required | Options |
|-------|------|----------|---------|
| Roles of Interest | multi-select | No | RBT, Senior RBT, Lead / Supervisor, Other |

### Profile Details & Visibility

| Field | Type | Required |
|-------|------|----------|
| Professional Bio / Summary | long text | No |
| Resume Upload | file | No |
| LinkedIn Profile URL | link | No |

---

## 3. Job Posting Fields (Employer)

### Basic Job Information

| Field | Type | Required |
|-------|------|----------|
| Job Title | text | Yes |
| Primary Job Location ZIP Code | text (5 digits) | Yes |

### Role & Credential Requirements

| Field | Type | Required | Options |
|-------|------|----------|---------|
| License Requirement | dropdown | Yes | RBT, BCBA |
| Minimum Years of Experience Required | number | No | Free number entry |

### Job Intent & Work Structure

| Field | Type | Required | Options |
|-------|------|----------|---------|
| Employment Type | multi-select | Yes | Full-time, Part-time, Contract |
| Telehealth Only | yes/no | Yes | |

### Schedule & Availability

| Field | Type | Required | Options | Conditional |
|-------|------|----------|---------|-------------|
| Schedule Expectation | single select | Yes | Standard weekday, Non-standard / flexible | |
| Schedule Details | multi-select | No | Weekdays, Weekends, Mornings, Afternoons, Evenings | If Schedule Expectation = Non-Standard |

### Location & Travel
*(Shown only if Telehealth Only = NO)*

| Field | Type | Required | Options |
|-------|------|----------|---------|
| Work Setting | multi-select | Yes | Center-based, In-home, School-based, Community-based |
| Travel Between Locations Required | dropdown | No | Single site only, Some travel required, Multi-site travel |

### Compensation & Pay Structure

| Field | Type | Required | Options | Conditional |
|-------|------|----------|---------|-------------|
| Compensation Type Offered | single select | Yes | Hourly only, Salary only, Open to hourly or salary | |
| Hourly Pay Range - Minimum | number ($/hour) | Yes | | If Hourly offered |
| Hourly Pay Range - Maximum | number ($/hour) | No | | If Hourly offered |
| Expected Weekly Hours | dropdown | No | Under 20 hours, 20-29 hours, 30-35 hours, 36-40 hours, 40+ hours | If Hourly offered |
| Guaranteed Hours or Guaranteed Pay | yes/no | No | | If Hourly offered |
| Annual Salary Range - Minimum | number ($/year) | Yes | | If Salary offered |
| Annual Salary Range - Maximum | number ($/year) | No | | If Salary offered |

### BCBA Workload Expectations
*(Shown only if License Requirement = BCBA)*

| Field | Type | Required | Options |
|-------|------|----------|---------|
| Weekly Billable Expectation | dropdown | No | Under 20 hours, 21-25 hours, 26-30 hours, 30+ hours |
| Non-Billable / Administrative Work Included in Pay | yes/no | No | |
| Work From Home / Hybrid Flexibility | yes/no | No | |

### Client Population

| Field | Type | Required | Options |
|-------|------|----------|---------|
| Client Age Groups Served | multi-select | No | Early Intervention (0-5), School Age (6-12), Adolescents (13-17), Adults (18+) |

### Job Details

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Job Description | rich text | Yes | Role overview, Caseload expectations, Supervision responsibilities, Growth opportunities |

### Benefits & Incentives

| Field | Type | Required | Options |
|-------|------|----------|---------|
| Benefits Offered | multi-select | No | Medical / Dental / Vision, 401(k) with Matching, Paid Time Off (PTO), CEU Stipend, Paid Indirect / Admin Time, Mileage Reimbursement, Laptop / Tablet Provided, Life / Disability Insurance, Professional Liability Insurance, Tuition Assistance, Exam / Certification Support Assistance |
| Bonuses & Incentives | multi-select | No | Performance-based bonuses available, Sign-on bonus, Retention or longevity bonus, Referral bonus, Leadership or promotion-based incentive, Relocation assistance |
| Bonus & Incentive Details | free text | No | Clarify amounts, timing, or eligibility |

---

## 4. Candidate Search Filters (Employer Directory)

| Filter | Source Field | Type | Options | Conditional Logic |
|--------|--------------|------|---------|-------------------|
| Role / Credential | Candidate Primary Certification | single select | BCBA, RBT | |
| Location - Radius from job | Candidate ZIP code | number | | If job is Telehealth only -> hide location filters |
| Telehealth-capable only | Telehealth preference | toggle | | |
| Employment Type Preference | Candidate Employment Type Preference | multi-select | Full-time, Part-time, Contract | |
| Compensation - Hourly Range | Minimum acceptable hourly rate | slider/range | | Choose hourly or salary first |
| Compensation - Salary Range | Minimum acceptable salary | slider/range | | Choose hourly or salary first |
| Years of Experience | Years of Experience (Post-cert) | dropdown | 0-2, 2-5, 5-8, 8+ | |
| Schedule Compatibility | Candidate Schedule Preference | single select | Standard weekday, Non-standard / flexible | |
| Job Search Status | Candidate Job Search Status | dropdown | Actively looking, Open to opportunities, Just browsing | |

---

## 5. Job Search Filters (Professional Search)

| Filter | Source Field | Type | Options | Conditional Logic |
|--------|--------------|------|---------|-------------------|
| Role Type | License Requirement | single select | BCBA, RBT | |
| Location - ZIP Code | Primary Job Location ZIP | text | | |
| Location - Radius | | dropdown | 5 / 10 / 25 / 50 miles | |
| Telehealth only | Telehealth Only | toggle | | |
| Employment Type | Employment Type | multi-select | Full-time, Part-time, Contract | |
| Compensation - Min Hourly | Hourly Pay Range | number | | If hourly is offered |
| Compensation - Min Salary | Annual Salary Range | number | | If salary is offered |
| Schedule Type | Schedule Expectation | single select | Standard weekday, Non-standard / flexible | |
| Work Setting | Work Setting | multi-select | Center-based, In-home, School-based, Community-based | Hidden if Telehealth only is ON |

---

## 6. Cross-Reference Matrix

This matrix shows where each field concept appears across different areas of the app.

| Field Concept | Onboarding | Profile/Account | Job Posting | Candidate Search | Job Search |
|---------------|------------|-----------------|-------------|------------------|------------|
| **Role Type (BCBA/RBT)** | Phase 1 | Role Type | License Requirement | Role / Credential | Role Type |
| **ZIP Code** | Phase 1 | ZIP Code | Primary Job Location ZIP | Radius from job | ZIP + Radius |
| **Employment Type** | Phase 2 | Employment Type | Employment Type | Employment Type Pref | Employment Type |
| **Schedule Preference** | Phase 2 | Schedule Preference | Schedule Expectation | Schedule Compat | Schedule Type |
| **Schedule Details** | Phase 2 (cond) | Schedule Availability (cond) | Schedule Details (cond) | - | - |
| **Job Search Status** | Phase 2 | Job Search Status | - | Job Search Status | - |
| **Primary Goal / Job Intent** | Phase 2 | Job Intent | - | - | - |
| **Notice Period / Start Date** | Phase 2 | Earliest Start Availability | - | - | - |
| **Years of Experience** | Phase 3 | Years of Experience | Min Years Required | Years of Experience | - |
| **Age Groups Served** | Phase 3 | Age Groups Served | Client Age Groups | - | - |
| **Languages** | Phase 3 | Languages Spoken | - | - | - |
| **Compensation Type** | Phase 4 | Compensation Type Openness | Compensation Type Offered | Hourly/Salary selector | Hourly/Salary selector |
| **Min Hourly Rate** | Phase 4 (cond) | Min Hourly Rate (cond) | Hourly Pay Range | Hourly Range | Min Hourly |
| **Min Salary** | Phase 4 (cond) | Min Annual Salary (cond) | Annual Salary Range | Salary Range | Min Salary |
| **Geographic Radius** | Phase 4 (cond) | Preferred Commute Radius (cond) | - | Radius from job | Radius |
| **Willing to Relocate** | Phase 4 (cond) | Open to Relocation (cond) | - | - | - |
| **Travel Between Locations** | Phase 4 (cond) | Comfort with Multi-Site Work (cond) | Travel Between Locations | - | - |
| **Telehealth Only** | Phase 4 | Telehealth Only | Telehealth Only | Telehealth-capable | Telehealth only |
| **Work Setting** | Phase 4 (cond) | Work Setting Preference (cond) | Work Setting (cond) | - | Work Setting |
| **Weekly Billable (BCBA)** | Phase 4 (BCBA) | Weekly Billable Pref (BCBA) | Weekly Billable Expect (BCBA) | - | - |
| **Target Roles** | Phase 4 (role-specific) | Roles of Interest (role-specific) | - | - | - |
| **Bio** | Phase 5 | Professional Bio | Job Description | - | - |
| **Resume** | Phase 5 | Resume Upload | - | - | - |
| **LinkedIn** | Phase 5 | LinkedIn Profile URL | - | - | - |
| **Benefits** | - | - | Benefits Offered | - | - |
| **Bonuses** | - | - | Bonuses & Incentives | - | - |
| **Preferred Weekly Hours** | - | Preferred Weekly Hours | Expected Weekly Hours | - | - |
| **Guaranteed Hours/Pay** | - | - | Guaranteed Hours/Pay | - | - |
| **Admin Work Included** | - | - | Non-Billable Included (BCBA) | - | - |
| **WFH/Hybrid** | - | - | WFH/Hybrid Flex (BCBA) | - | - |

---

## 7. Review Findings

*All issues below have been RESOLVED. The standardized values are captured in the "Approved Standardizations" section above, and the field definitions throughout this document have been updated to use the standardized values.*

### A. Clarity Issues - ✅ ALL RESOLVED

| Issue | Resolution |
|-------|------------|
| Languages Spoken field type | ✅ Dropdown with predefined list (managed separately) |
| Geographic Radius options | ✅ Predefined levels: 5, 10, 15, 25, 50 miles |
| Certification status for non-certified | ✅ Platform is for certified professionals only - no "not certified" option needed |
| Min Years Experience (job posting) | ✅ Free number entry |
| Telehealth + in-person combo | ✅ Telehealth Only checkbox stays - meaning differs by context |

### B. Internal Consistency Issues - ✅ ALL RESOLVED

| Issue | Resolution |
|-------|------------|
| Employment Type wording | ✅ Standardized: "Full-time", "Part-time", "Contract" |
| Job Search Status wording | ✅ Standardized: "Actively looking", "Open to opportunities", "Just browsing" |
| Schedule Preference wording | ✅ Standardized: "Standard weekday", "Non-standard / flexible" |
| Travel/Multi-Site wording | ✅ Standardized: "Single site only", "Some travel required", "Multi-site travel" |
| Weekly Hours options | ✅ Already matched - no change needed |
| Weekly Billable Hours options | ✅ Already matched - no change needed |
| RBT Target Roles | ✅ Standardized: "RBT", "Senior RBT", "Lead / Supervisor", "Other" |
| BCBA Target Roles | ✅ Standardized: "BCBA", "Lead BCBA", "Clinic Supervisor", "Clinical Director", "Other" |
| Work Setting wording | ✅ Standardized: "Center-based", "In-home", "School-based", "Community-based" |

### C. Search Filter vs Captured Data Alignment - ✅ ALL ALIGNED

#### Candidate Search Filters
| Filter | Maps To | Status |
|--------|---------|--------|
| Role / Credential | Role Type (Profile) | ✅ Aligned |
| Location Radius | ZIP Code + Preferred Commute Radius (Profile) | ✅ Aligned |
| Telehealth-capable | Telehealth Only (Profile) | ✅ Aligned |
| Employment Type | Employment Type (Profile) | ✅ Aligned (standardized) |
| Compensation | Min Hourly Rate / Min Annual Salary (Profile) | ✅ Aligned |
| Years of Experience | Years of Experience (Profile) | ✅ Aligned |
| Schedule Compatibility | Schedule Preference (Profile) | ✅ Aligned (standardized) |
| Job Search Status | Job Search Status (Profile) | ✅ Aligned (standardized) |

#### Job Search Filters
| Filter | Maps To | Status |
|--------|---------|--------|
| Role Type | License Requirement (Job) | ✅ Aligned |
| Location ZIP + Radius | Primary Job Location ZIP (Job) | ✅ Aligned |
| Telehealth only | Telehealth Only (Job) | ✅ Aligned |
| Employment Type | Employment Type (Job) | ✅ Aligned (standardized) |
| Compensation | Hourly Pay Range / Annual Salary Range (Job) | ✅ Aligned |
| Schedule Type | Schedule Expectation (Job) | ✅ Aligned (standardized) |
| Work Setting | Work Setting (Job) | ✅ Aligned |

---

### D. Missing Search Filters (Potential Gaps)

#### Fields Captured But Not Searchable

**In Candidate Search (Employer Directory):**
- Age Groups Served - captured in profile, not filterable
- Languages Spoken - captured in profile, not filterable
- Work Setting Preference - captured in profile, not filterable ⚠️
- Travel/Multi-Site Comfort - captured in profile, not filterable
- Target Roles of Interest - captured in profile, not filterable

**In Job Search (Professional):**
- Client Age Groups - captured in job posting, not filterable
- Benefits Offered - captured in job posting, not filterable
- Travel Requirements - captured in job posting, not filterable
- BCBA: Weekly Billable Expectation - captured in job posting, not filterable
- BCBA: WFH/Hybrid Flexibility - captured in job posting, not filterable
- Guaranteed Hours/Pay - captured in job posting, not filterable

---

## Approved Standardizations

*The following decisions were made during the review session to ensure clarity and consistency across all areas of the app.*

### Clarity Decisions

| Issue | Decision |
|-------|----------|
| **Languages Spoken** | Dropdown with predefined list (managed separately from this spec) |
| **Geographic Radius** | Predefined levels: 5 / 10 / 15 / 25 / 50 miles |
| **Certification Status** | Platform is for certified professionals only (RBT or BCBA). No "not yet certified" option needed. |
| **Min Years Experience** | Free number entry for both candidate profiles and job postings |
| **Telehealth Only checkbox** | Keep as checkbox for both workers and jobs - meaning differs appropriately for each context |

### Standardized Option Values

#### Employment Type
**Use everywhere:** "Full-time", "Part-time", "Contract"

#### Job Search Status
**Use everywhere:** "Actively looking", "Open to opportunities", "Just browsing"

#### Schedule Preference
**Use everywhere:** "Standard weekday", "Non-standard / flexible"

#### Travel / Multi-Site
**Use everywhere:** "Single site only", "Some travel required", "Multi-site travel"

#### RBT Target Roles
**Use everywhere:** "RBT", "Senior RBT", "Lead / Supervisor", "Other"

#### BCBA Target Roles
**Use everywhere:** "BCBA", "Lead BCBA", "Clinic Supervisor", "Clinical Director", "Other"

#### Work Setting
**Use everywhere:** "Center-based", "In-home", "School-based", "Community-based"

---

## Implementation Priority

*To be determined after gap analysis*

| Priority | Area | Description |
|----------|------|-------------|
| P1 | | |
| P2 | | |
| P3 | | |
