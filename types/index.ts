/**
 * Behavoya Platform Type Definitions
 * 
 * Source of truth for all data models across the platform.
 * Based on FIELD_REFERENCE.md specifications.
 */

// ============================================================================
// ENUMS & CONSTANTS
// ============================================================================

export type LicenseType = 'RBT' | 'BCBA';

export type JobStatus = 'Active' | 'Paused' | 'Closed';

export type ApplicationStatus = 
  | 'Active'
  | 'Accepted'
  | 'Declined by Employer'
  | 'Declined by Candidate';

export type EmploymentType = 
  | 'W2 – Full Time'
  | 'W2 – Part Time'
  | '1099 Contractor'
  | 'Weekends';

export type WorkSetting = 
  | 'Center-based'
  | 'In-home'
  | 'School-based'
  | 'In-person'
  | 'Hybrid'
  | 'Remote'
  | 'Telehealth';

export type SchedulePreference = 
  | 'Standard Full-Time (Weekday daytime hours)'
  | 'Non-Standard / Flexible Schedule'
  | 'Flexible Schedule';

export type ScheduleDetail = 
  | 'Weekdays'
  | 'Weekends'
  | 'Mornings'
  | 'Afternoons'
  | 'Evenings';

export type TravelRequirement = 
  | 'Single site only'
  | 'Limited travel'
  | 'Multi-site travel required'
  | 'Multi-site travel acceptable';

export type CompensationPreference = 
  | 'Hourly only'
  | 'Salary only'
  | 'Open to hourly or salary';

export type BillableExpectation = 
  | 'Under 20 hours'
  | '21–25 hours'
  | '26–30 hours'
  | '30+ hours';

export type ClientAgeGroup = 
  | 'Early Intervention (0–5)'
  | 'School Age (6–12)'
  | 'Adolescents (13–17)'
  | 'Adults (18+)';

export type ClientNeed = 
  | 'Verbal'
  | 'Non-verbal'
  | 'AAC (Augmentative & Alternative Communication)'
  | 'Severe behaviors'
  | 'Mild / moderate behaviors'
  | 'Early learner programs'
  | 'School-based / IEP experience'
  | 'Parent / caregiver training required';

export type BenefitType = 
  | 'Medical / Dental / Vision'
  | '401(k) with Matching'
  | 'Paid Time Off (PTO)'
  | 'CEU Stipend'
  | 'Paid Indirect Time'
  | 'Mileage Reimbursement'
  | 'Laptop / Tablet Provided'
  | 'Life / Disability Insurance'
  | 'Professional Liability Insurance';

export type UserRole = 'worker' | 'employer' | 'admin';

export type OrganizationStatus = 'Active' | 'Inactive';

// ============================================================================
// JOB POSTING
// ============================================================================

export interface JobPosting {
  id: string;
  organizationId: string;
  
  // Basic Information
  jobTitle: string;
  zipCode: string;
  
  // Role & Requirements
  licenseRequirement: LicenseType;
  minimumYearsExperience?: number;
  
  // Job Structure
  employmentTypes: EmploymentType[];
  telehealthOnly: boolean;
  workSettings?: WorkSetting[]; // Required if telehealthOnly = false
  schedulePreference: SchedulePreference;
  scheduleDetails?: ScheduleDetail[]; // Shown if non-standard schedule
  
  // Location & Travel (hidden if telehealthOnly = true)
  travelRequirement?: TravelRequirement;
  
  // Compensation
  compensationPreference: CompensationPreference;
  minimumHourlyRate?: number; // Conditional based on compensationPreference
  minimumAnnualSalary?: number; // Conditional based on compensationPreference
  
  // BCBA-Specific (conditional if licenseRequirement = BCBA)
  billableExpectation?: BillableExpectation;
  workFromHomeFlexibility?: boolean;
  
  // Client Population
  clientAgeGroups?: ClientAgeGroup[];
  clientNeeds?: ClientNeed[];
  
  // Job Details
  jobDescription: string;
  
  // Benefits & Incentives
  paidCancellations?: boolean;
  signOnBonus?: boolean;
  relocationAssistance?: boolean;
  benefitsOffered?: BenefitType[];
  
  // Metadata
  status: JobStatus;
  createdAt: Date;
  updatedAt: Date;
  postedAt?: Date;
  closedAt?: Date;
  applicantCount: number;
}

// ============================================================================
// WORKER PROFILE
// ============================================================================

export interface WorkerProfile {
  id: string;
  
  // Basic Information
  profilePhotoUrl?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  zipCode: string;
  bio?: string;
  resumeUrl?: string;
  
  // Professional Credentials
  roleType: LicenseType;
  yearsExperience?: number;
  licenseAttestation: boolean; // Required checkbox
  licenseNumber?: string; // Optional, triggers verification
  isVerified: boolean; // Set by admin after review
  
  // Work Preferences
  compensationPreference: CompensationPreference;
  minimumHourlyRate?: number; // Conditional
  minimumAnnualSalary?: number; // Conditional
  employmentTypes: EmploymentType[];
  workSetting: WorkSetting;
  geographicRadius: number; // Miles from ZIP code
  openToTelehealth?: boolean;
  
  // Schedule Preferences
  schedulePreference: SchedulePreference;
  scheduleAvailability?: ScheduleDetail[]; // Conditional if flexible
  
  // Client Population Preferences
  preferredAgeGroups?: ClientAgeGroup[];
  experienceWithClientNeeds?: ClientNeed[];
  
  // Travel Preferences
  willingToTravel: TravelRequirement;
  
  // Privacy & Reveal
  profileRevealed: { [employerId: string]: boolean }; // Track which employers can see full profile
  
  // Metadata
  status: 'Active' | 'Inactive';
  createdAt: Date;
  updatedAt: Date;
  lastActiveAt: Date;
  profileViews: number;
}

// ============================================================================
// APPLICATION
// ============================================================================

export interface Application {
  id: string;
  jobId: string;
  workerId: string;
  employerId: string;
  organizationId: string;
  
  // Application Details
  status: ApplicationStatus;
  applicationMessage?: string; // Worker's initial message when applying
  
  // Metadata
  appliedAt: Date;
  lastActivityAt: Date;
  statusChangedAt?: Date;
  statusChangedBy?: string; // User ID who changed status
}

// ============================================================================
// ORGANIZATION (EMPLOYER)
// ============================================================================

export interface Organization {
  id: string;
  
  // Company Information
  companyName: string;
  logoUrl?: string;
  location: string; // ZIP code
  description: string;
  
  // Admin & Team
  adminUserId: string; // Primary admin
  teamMemberIds: string[]; // All users including admin
  
  // Status
  status: OrganizationStatus;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  activeJobCount: number;
}

// ============================================================================
// USER
// ============================================================================

export interface User {
  id: string;
  email: string;
  role: UserRole;
  
  // Profile References
  workerProfileId?: string; // If role = worker
  organizationId?: string; // If role = employer
  
  // Auth
  passwordHash: string;
  emailVerified: boolean;
  
  // Metadata
  createdAt: Date;
  lastLoginAt?: Date;
  status: 'Active' | 'Inactive' | 'Pending';
}

// ============================================================================
// MESSAGING
// ============================================================================

export interface Message {
  id: string;
  threadId: string;
  
  // Sender Information
  senderType: 'employer' | 'worker';
  senderId: string; // User ID
  senderName: string; // Full name for display
  senderCompany?: string; // For employer messages
  senderCompanyLogoUrl?: string; // For employer messages
  senderRole?: string; // For employer messages (e.g., "Hiring Manager")
  
  // Content
  content: string;
  
  // Metadata
  timestamp: Date;
  read: boolean;
  readAt?: Date;
}

export interface MessageThread {
  id: string;
  jobId: string;
  workerId: string;
  employerId: string;
  organizationId: string;
  
  // Thread Details
  jobTitle: string; // Cached for display
  companyName: string; // Cached for display
  companyLogoUrl?: string; // Cached for display
  workerName?: string; // Cached for display (may be anonymous)
  
  // Status
  lastMessageAt: Date;
  lastMessagePreview: string; // First 100 chars of last message
  unreadCount: { worker: number; employer: number };
  
  // Metadata
  createdAt: Date;
}

// ============================================================================
// EMPLOYER ACCESS REQUEST (NEW)
// ============================================================================

export interface EmployerAccessRequest {
  id: string;
  
  // Request Information
  companyName: string;
  yourName: string;
  workEmail: string;
  message?: string;
  
  // Status
  status: 'Pending' | 'Approved' | 'Denied';
  reviewedBy?: string; // Admin user ID
  reviewedAt?: Date;
  reviewNotes?: string;
  
  // Account Creation
  organizationId?: string; // Set when approved and org created
  userId?: string; // Set when approved and account created
  
  // Metadata
  submittedAt: Date;
}

// ============================================================================
// ADMIN DATA TYPES
// ============================================================================

export interface AdminDashboardMetrics {
  totalCompanies: number;
  totalJobsPosted: number;
  totalABAProfessionals: number;
  pendingVerifications: number;
  pendingAccessRequests: number;
  recentActivity: AdminActivity[];
}

export interface AdminActivity {
  id: string;
  type: 'job_posted' | 'worker_registered' | 'application_submitted' | 'verification_requested' | 'access_requested';
  description: string;
  timestamp: Date;
  relatedId?: string; // ID of job, worker, etc.
}

export interface LicenseVerificationRequest {
  workerId: string;
  workerName: string;
  roleType: LicenseType;
  licenseNumber: string;
  submittedAt: Date;
  status: 'Pending' | 'Approved' | 'Denied';
  reviewedBy?: string;
  reviewedAt?: Date;
  reviewNotes?: string;
}

// ============================================================================
// MATCHING & RECOMMENDATIONS
// ============================================================================

export interface JobMatch {
  jobId: string;
  workerId: string;
  matchScore: number; // 0-100 percentage
  matchReasons: string[]; // List of why it's a match
  recommendedAt: Date;
  viewed: boolean;
  viewedAt?: Date;
}

export interface EmployerInvite {
  id: string;
  jobId: string;
  workerId: string;
  employerId: string;
  organizationId: string;
  
  // Invite Details
  message: string;
  
  // Status
  status: 'Pending' | 'Accepted' | 'Declined';
  respondedAt?: Date;
  
  // Metadata
  sentAt: Date;
}

// ============================================================================
// HELPER TYPES
// ============================================================================

export interface ValidationError {
  field: string;
  message: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ============================================================================
// FORM DATA TYPES (for UI state management)
// ============================================================================

export interface JobPostingFormData extends Omit<JobPosting, 'id' | 'organizationId' | 'createdAt' | 'updatedAt' | 'applicantCount'> {
  // Form-specific fields
}

export interface WorkerProfileFormData extends Omit<WorkerProfile, 'id' | 'createdAt' | 'updatedAt' | 'lastActiveAt' | 'profileViews' | 'profileRevealed' | 'isVerified'> {
  // Form-specific fields
  profilePhoto?: File;
  resume?: File;
}

// ============================================================================
// EXPORT ALL
// ============================================================================

export type {
  JobPosting,
  WorkerProfile,
  Application,
  Organization,
  User,
  Message,
  MessageThread,
  EmployerAccessRequest,
  AdminDashboardMetrics,
  AdminActivity,
  LicenseVerificationRequest,
  JobMatch,
  EmployerInvite,
  ValidationError,
  PaginationParams,
  PaginatedResponse,
  JobPostingFormData,
  WorkerProfileFormData,
};
