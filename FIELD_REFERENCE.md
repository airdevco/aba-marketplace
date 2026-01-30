# Behavoya Field Reference

This document serves as the source of truth for all form fields used in job postings and worker profiles across the Behavoya platform.

## Job Posting Fields

### Conditional Logic Rules

#### Role Requirements
- **License Requirement** determines which candidates are eligible
- BCBA-only fields are shown only if `License Requirement = BCBA`

#### Telehealth vs Physical Roles
- **Telehealth Only** toggle determines work location type
- If `Telehealth Only = YES`:
  - Position is treated as Telehealth-exclusive
  - Physical work settings are ignored
  - Travel and geographic radius are hidden and ignored
  - Schedule preferences remain applicable
- If `Telehealth Only = NO`:
  - Physical work setting selections are required
  - Travel and geographic considerations apply

#### Schedule Preferences
- **Schedule Preference** captures high-level intent
- Detailed schedule selections are collected only if the role is non-standard or flexible

---

### Basic Job Information

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Job Title | text | Yes | Max 100 characters |
| ZIP Code | text | Yes | 5 digits, within 100 miles of Atlanta |

---

### Role & Credential Requirements

| Field | Type | Required | Options/Notes |
|-------|------|----------|---------------|
| License Requirement | dropdown | Yes | `RBT`, `BCBA` |
| Minimum Years of Experience Required | number | No | 0-20 |

---

### Job Intent & Structure

| Field | Type | Required | Options/Notes |
|-------|------|----------|---------------|
| Employment Type | multi-select | Yes | `W2 – Full Time`, `W2 – Part Time`, `1099 Contractor` |
| Telehealth Only | yes/no | Yes | Toggle |
| Work Setting | multi-select | Conditional | Required if `Telehealth Only = NO`. Options: `Center-based`, `In-home`, `School-based` |

---

### Schedule & Availability

Applies to all roles, including Telehealth.

| Field | Type | Required | Options/Notes |
|-------|------|----------|---------------|
| Schedule Preference | single select | Yes | `Standard Full-Time (Weekday daytime hours)`, `Non-Standard / Flexible Schedule` |
| Schedule Details | multi-select | Conditional | Shown only if `Schedule Preference = NON-STANDARD / FLEXIBLE`. Options: `Weekdays`, `Weekends`, `Mornings`, `Afternoons`, `Evenings` |

---

### Location & Travel

Shown only if `Telehealth Only = NO`

| Field | Type | Required | Options/Notes |
|-------|------|----------|---------------|
| Travel Between Locations Required | dropdown | Yes | `Single site only`, `Limited travel`, `Multi-site travel required` |

---

### Compensation

| Field | Type | Required | Options/Notes |
|-------|------|----------|---------------|
| Compensation Preference | single select | Yes | `Hourly only`, `Salary only`, `Open to hourly or salary` |
| Minimum Hourly Rate | number | Conditional | Required if `Compensation Preference = HOURLY ONLY` or `OPEN TO HOURLY OR SALARY`. Format: $/hour |
| Minimum Annual Salary | number | Conditional | Required if `Compensation Preference = SALARY ONLY` or `OPEN TO HOURLY OR SALARY`. Format: $/year |

---

### BCBA Workload Expectations

Shown only if `License Requirement = BCBA`

| Field | Type | Required | Options/Notes |
|-------|------|----------|---------------|
| Billable Expectation | dropdown | No | `Under 20 hours`, `21–25 hours`, `26–30 hours`, `30+ hours` |
| Work From Home Flexibility | yes/no | No | Toggle |

---

### Client Population & Experience Requirements

| Field | Type | Required | Options/Notes |
|-------|------|----------|---------------|
| Client Age Groups Served | multi-select | No | `Early Intervention (0–5)`, `School Age (6–12)`, `Adolescents (13–17)`, `Adults (18+)` |
| Client Needs / Case Mix | multi-select | No | `Verbal`, `Non-verbal`, `AAC (Augmentative & Alternative Communication)`, `Severe behaviors`, `Mild / moderate behaviors`, `Early learner programs`, `School-based / IEP experience`, `Parent / caregiver training required` |

---

### Job Details

| Field | Type | Required | Options/Notes |
|-------|------|----------|---------------|
| Job Description | rich text | Yes | Rich text editor |

---

### Benefits & Incentives

| Field | Type | Required | Options/Notes |
|-------|------|----------|---------------|
| Paid Client Cancellations / No-Shows | yes/no | No | Toggle |
| Sign-on or Retention Bonus | yes/no | No | Toggle |
| Relocation Assistance | yes/no | No | Toggle |
| Benefits Offered | multi-select | No | `Medical / Dental / Vision`, `401(k) with Matching`, `Paid Time Off (PTO)`, `CEU Stipend`, `Paid Indirect Time`, `Mileage Reimbursement`, `Laptop / Tablet Provided`, `Life / Disability Insurance`, `Professional Liability Insurance` |

---

## Worker Profile Fields

### Basic Information

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Profile Photo | file upload | No | Image files (JPG, PNG), max 5MB |
| First Name | text | Yes | Max 50 characters |
| Last Name | text | Yes | Max 50 characters |
| Email | email | Yes | Valid email format |
| Phone | tel | No | US phone format |
| ZIP Code | text | Yes | 5 digits, within 100 miles of Atlanta |
| Bio/Description | textarea | No | Max 500 characters |
| Resume | file upload | No | PDF or DOC, max 5MB |

---

### Professional Credentials

| Field | Type | Required | Options/Notes |
|-------|------|----------|---------------|
| Role Type | radio | Yes | `RBT (Registered Behavior Technician)`, `BCBA (Board Certified Behavior Analyst)` |
| Years of Experience | number | No | 0-30 |
| License Attestation | checkbox | Yes | "I attest that I hold an active [RBT/BCBA] credential" |
| License Number | text | No | Optional for verification, triggers "Verified Professional" badge after admin approval |

---

### Work Preferences

| Field | Type | Required | Options/Notes |
|-------|------|----------|---------------|
| Compensation Preference | single select | Yes | `Hourly only`, `Salary only`, `Open to hourly or salary` |
| Minimum Hourly Rate | number | Conditional | Required if `Compensation Preference = HOURLY ONLY` or `OPEN TO HOURLY OR SALARY`. Format: $/hour |
| Minimum Annual Salary | number | Conditional | Required if `Compensation Preference = SALARY ONLY` or `OPEN TO HOURLY OR SALARY`. Format: $/year |
| Employment Type | multi-select | Yes | `W2 – Full Time`, `W2 – Part Time`, `1099 Contractor`, `Weekends` |
| Work Setting | dropdown | Yes | `In-person`, `Hybrid`, `Remote`, `Telehealth` |
| Geographic Radius | number | Yes | Miles from ZIP code, 5-100 |
| Open to Telehealth | yes/no | No | Toggle |

---

### Schedule Preferences

| Field | Type | Required | Options/Notes |
|-------|------|----------|---------------|
| Schedule Preference | single select | Yes | `Standard Full-Time (Weekday daytime hours)`, `Flexible Schedule` |
| Schedule Availability | multi-select | Conditional | Shown if `Schedule Preference = FLEXIBLE`. Options: `Weekdays`, `Weekends`, `Mornings`, `Afternoons`, `Evenings` |

---

### Client Population Preferences

| Field | Type | Required | Options/Notes |
|-------|------|----------|---------------|
| Preferred Age Groups | multi-select | No | `Early Intervention (0–5)`, `School Age (6–12)`, `Adolescents (13–17)`, `Adults (18+)` |
| Experience with Client Needs | multi-select | No | `Verbal`, `Non-verbal`, `AAC`, `Severe behaviors`, `Mild / moderate behaviors`, `Early learner programs`, `School-based / IEP experience`, `Parent / caregiver training` |

---

### Travel Preferences

| Field | Type | Required | Options/Notes |
|-------|------|----------|---------------|
| Willing to Travel Between Locations | dropdown | Yes | `Single site only`, `Limited travel`, `Multi-site travel acceptable` |

---

## Field Mapping

### From Existing to New

#### Job Posting Existing → New
| Old Field | New Field | Notes |
|-----------|-----------|-------|
| Position Type | License Requirement | Same values (RBT/BCBA) |
| Location (ZIP) | ZIP Code | Same |
| Employment Type (radio) | Employment Type (multi-select) | Now allows multiple selections |
| Schedule (checkboxes) | Schedule Preference + Schedule Details | Simplified with conditional logic |
| Hourly Rate Range (min/max) | Compensation Preference + rates | More flexible compensation model |
| Job Description | Job Description | Same |

#### New Fields (Job Posting)
- Minimum Years of Experience
- Telehealth Only toggle
- Work Setting (center/home/school)
- Travel Between Locations
- Compensation Preference selector
- Minimum Annual Salary
- BCBA-specific fields (Billable Expectation, WFH Flexibility)
- Client Age Groups
- Client Needs / Case Mix
- All Benefits & Incentives fields

#### Worker Profile Existing → New
| Old Field | New Field | Notes |
|-----------|-----------|-------|
| Role Type | Role Type | Same |
| Photo | Profile Photo | Same |
| First/Last Name | First/Last Name | Same |
| Email | Email | Same |
| Phone | Phone | Same |
| ZIP Code | ZIP Code | Same |
| License Checkbox | License Attestation | Same |
| License Number | License Number | Same |
| Min Hourly Rate | Min Hourly Rate + Compensation Preference | Now conditional |
| Employment Type | Employment Type | Expanded options |
| Work Setting | Work Setting | Expanded options |
| Geographic Radius | Geographic Radius | Same |

#### New Fields (Worker Profile)
- Bio/Description
- Resume upload
- Years of Experience
- Compensation Preference
- Minimum Annual Salary
- Schedule Preference + Availability
- Open to Telehealth
- Preferred Age Groups
- Experience with Client Needs
- Willing to Travel Between Locations

---

## Validation Rules

### ZIP Code Validation
```typescript
// Check if ZIP is within 100 miles of Atlanta
// Atlanta center: 33.7490° N, 84.3880° W
// Atlanta ZIP codes: 30301-30322, 30324-30334, 30336-30350, 30353-30364, 30366, 30368-30369, 30374-30375, 30377-30380, 30384-30385, 30388, 30392, 30394, 30396, 30398

const isValidAtlantaArea = (zipCode: string): boolean => {
  // For MVP: Accept any ZIP starting with 303XX
  // For production: Use Google Maps Distance Matrix API
  return zipCode.startsWith('303');
};
```

### Conditional Field Display Rules
```typescript
// Show BCBA-only fields
if (licenseRequirement === 'BCBA') {
  showField('billableExpectation');
  showField('workFromHomeFlexibility');
}

// Show/hide based on Telehealth
if (telehealthOnly === true) {
  hideField('workSetting');
  hideField('travelBetweenLocations');
} else {
  showField('workSetting');
  showField('travelBetweenLocations');
}

// Show schedule details
if (schedulePreference === 'Non-Standard / Flexible Schedule') {
  showField('scheduleDetails');
}

// Show compensation fields
if (compensationPreference === 'Hourly only') {
  showField('minimumHourlyRate');
  hideField('minimumAnnualSalary');
} else if (compensationPreference === 'Salary only') {
  hideField('minimumHourlyRate');
  showField('minimumAnnualSalary');
} else if (compensationPreference === 'Open to hourly or salary') {
  showField('minimumHourlyRate');
  showField('minimumAnnualSalary');
}
```

---

## Status Values

### Job Status
- `Active` - Job is currently accepting applications
- `Paused` - Job is temporarily not accepting applications
- `Closed` - Job is no longer accepting applications

### Application Status
- `Active` - Application is under review
- `Accepted` - Employer marked candidate as selected
- `Declined by Employer` - Employer declined the application
- `Declined by Candidate` - Candidate withdrew or declined offer

---

## Notes for Implementation

1. **Progressive Disclosure**: Use conditional logic to show/hide fields based on user selections to avoid overwhelming users
2. **Field Grouping**: Group related fields into collapsible sections or steps
3. **Validation**: All required fields must be validated before form submission
4. **Help Text**: Provide contextual help text for complex fields
5. **Mobile Optimization**: Ensure all forms work well on mobile devices
6. **Autosave**: Consider implementing autosave for long forms (especially job posting creation)
7. **Default Values**: Provide sensible defaults where applicable (e.g., Geographic Radius = 25 miles)
