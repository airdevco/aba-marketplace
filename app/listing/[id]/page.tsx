"use client";

import { useState, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, AlertTriangle, Check, MapPin, DollarSign, Eye, Edit, Calendar, Briefcase, Building } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import HeaderWithProfile from "@/components/HeaderWithProfile";

// Full job data for view (aligned with listing/new and employer JobsView)
type JobViewData = {
  jobTitle: string;
  positionType: "RBT" | "BCBA";
  zipCode: string;
  clinicLocationName: string;
  employmentTypes: string[];
  scheduleOptions: string[];
  compensationType: "hourly" | "salary" | "both";
  rateMin: string;
  rateMax: string;
  startDate: string;
  requiredYearsExperience: string;
  preferredYearsExperience: string;
  specializations: string[];
  caseloadSize: string;
  treatmentSetting: string;
  jobDescription: string;
  benefitsOverview: string;
  postedDate?: string;
  // New fields from spec
  telehealthOnly?: boolean;
  scheduleExpectation?: string;
  travelRequirement?: string;
  expectedWeeklyHours?: string;
  guaranteedHours?: boolean;
  weeklyBillableExpectation?: string;
  nonBillableAdminIncluded?: boolean;
  wfhFlexibility?: boolean;
  clientAgeGroups?: string[];
  workSettings?: string[];
  benefitsOffered?: string[];
  bonusesIncentives?: string[];
  bonusDetails?: string;
};

// Employer data for company info display
type EmployerData = {
  name: string;
  logoUrl: string;
  description: string;
};

const EMPLOYER_INFO: EmployerData = {
  name: "Bright Future ABA",
  logoUrl: "https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769804890523x838539645913488600/favicon.png",
  description: "Bright Future ABA is a leading provider of Applied Behavior Analysis services throughout the Greater Atlanta metropolitan area. Founded in 2015, we have grown to serve over 500 families across Georgia with a team of 120+ dedicated professionals. Our mission is to empower individuals with autism and developmental disabilities to reach their fullest potential through evidence-based, compassionate care. We pride ourselves on maintaining a collaborative, supportive work environment where clinical excellence and professional growth go hand in hand.",
};

function getJobForView(id: string): JobViewData | null {
  const jobs: Record<string, JobViewData> = {
    "1": {
      jobTitle: "RBT - Full Time",
      positionType: "RBT",
      zipCode: "30308",
      clinicLocationName: "Midtown Atlanta Clinic",
      employmentTypes: ["Full-time"],
      scheduleOptions: ["Weekdays", "Mornings", "Afternoons"],
      compensationType: "hourly",
      rateMin: "24",
      rateMax: "32",
      startDate: "2026-02-17",
      requiredYearsExperience: "1",
      preferredYearsExperience: "2",
      specializations: ["Verbal", "Mild / moderate behaviors", "Early learner programs"],
      caseloadSize: "4-6 clients",
      treatmentSetting: "clinic",
      telehealthOnly: false,
      scheduleExpectation: "Standard weekday",
      travelRequirement: "Single site only",
      expectedWeeklyHours: "36-40 hours",
      guaranteedHours: true,
      clientAgeGroups: ["Early Intervention (0-5)", "School Age (6-12)"],
      workSettings: ["Center-based"],
      benefitsOffered: ["Medical/Dental/Vision", "401(k) with Matching", "Paid Time Off (PTO)", "CEU Stipend", "Mileage Reimbursement"],
      bonusesIncentives: ["Performance-based bonuses", "Referral bonus"],
      jobDescription: `We are seeking a compassionate and dedicated Registered Behavior Technician (RBT) to join our growing clinical team at our Midtown Atlanta location. This is a full-time position offering the opportunity to make a meaningful difference in the lives of children with autism spectrum disorder and their families.

As an RBT at Bright Future ABA, you will work directly with clients ages 2-12, implementing individualized behavior intervention plans under the supervision of a Board Certified Behavior Analyst (BCBA). You'll be part of a supportive team environment where collaboration, ongoing training, and professional development are prioritized.

Key Responsibilities:
• Provide 1:1 Applied Behavior Analysis therapy to clients in a center-based setting
• Implement behavior intervention plans (BIPs) as designed by the supervising BCBA
• Collect accurate data on client progress and behavior using our electronic data collection system
• Participate in regular team meetings and training sessions
• Communicate professionally with families, providing updates on session activities
• Maintain a clean, organized, and safe therapy environment
• Complete required documentation in a timely manner

What We're Looking For:
• Active RBT certification in good standing with the BACB
• Genuine passion for working with children with developmental disabilities
• Strong communication and interpersonal skills
• Ability to implement behavior protocols consistently and accurately
• Physical ability to keep up with active children (sitting on floor, light lifting, etc.)
• Reliable transportation and punctuality`,
      benefitsOverview: `• Competitive hourly rate of $24-$32 based on experience
• Comprehensive health insurance (medical, dental, vision) after 60 days
• 401(k) retirement plan with 4% company match after 1 year
• Paid time off (15 days PTO + 8 paid holidays)
• Annual CEU stipend of $500 for professional development
• Paid RBT certification renewal fees
• Mileage reimbursement at IRS rate for any off-site work
• Monthly team appreciation events and quarterly bonuses
• Clear career advancement pathway to Lead RBT and Clinical Coordinator roles
• Supportive supervision with weekly 1:1 meetings with your BCBA`,
      postedDate: "2026-01-15",
    },
    "2": {
      jobTitle: "BCBA - Clinic Director",
      positionType: "BCBA",
      zipCode: "30060",
      clinicLocationName: "Marietta Regional Center",
      employmentTypes: ["Full-time"],
      scheduleOptions: ["Weekdays", "Mornings", "Afternoons"],
      compensationType: "salary",
      rateMin: "85000",
      rateMax: "105000",
      startDate: "2026-03-03",
      requiredYearsExperience: "3",
      preferredYearsExperience: "5",
      specializations: ["Severe behaviors", "School-based / IEP experience", "Parent / caregiver training required"],
      caseloadSize: "12-15 clients",
      treatmentSetting: "clinic",
      telehealthOnly: false,
      scheduleExpectation: "Standard weekday",
      travelRequirement: "Some travel required",
      guaranteedHours: true,
      weeklyBillableExpectation: "26-30 hours",
      nonBillableAdminIncluded: true,
      wfhFlexibility: true,
      clientAgeGroups: ["School Age (6-12)", "Adolescents (13-17)", "Adults (18+)"],
      workSettings: ["Center-based", "School-based"],
      benefitsOffered: ["Medical/Dental/Vision", "401(k) with Matching", "Paid Time Off (PTO)", "CEU Stipend", "Laptop/Tablet Provided", "Professional Liability Insurance"],
      bonusesIncentives: ["Performance-based bonuses", "Sign-on bonus", "Relocation assistance"],
      bonusDetails: "Sign-on bonus of $3,000 paid over first 6 months. Annual performance bonus up to 15% of base salary.",
      jobDescription: `Bright Future ABA is expanding and we're looking for an experienced BCBA to lead our new Marietta Regional Center as Clinic Director. This is a unique opportunity to shape the culture and clinical practices of a brand-new location while leveraging the resources and support of an established organization.

As Clinic Director, you will oversee all clinical operations, manage a team of 8-12 RBTs, and maintain a reduced personal caseload while focusing on leadership, quality assurance, and program development. You'll report directly to our Clinical VP and participate in organizational strategy discussions.

Leadership Responsibilities:
• Hire, train, mentor, and supervise a team of RBTs and BCBAs
• Conduct performance evaluations and provide ongoing feedback
• Ensure all clinical services meet quality standards and ethical guidelines
• Develop and implement clinic policies and procedures
• Manage scheduling, staffing, and resource allocation
• Build relationships with referral sources and community partners
• Represent Bright Future ABA at community events and conferences

Clinical Responsibilities:
• Maintain a caseload of 12-15 clients
• Conduct functional behavior assessments (FBAs) and develop behavior intervention plans
• Provide parent and caregiver training
• Oversee treatment integrity and fidelity across all cases
• Review and approve all clinical documentation
• Collaborate with schools, pediatricians, and other service providers

Ideal Candidate:
• BCBA certification with 3+ years post-certification experience
• Previous supervisory or leadership experience strongly preferred
• Experience with severe problem behaviors and crisis management
• Strong organizational and time management skills
• Excellent written and verbal communication abilities
• Commitment to ethical practice and continuous improvement`,
      benefitsOverview: `• Competitive salary range of $85,000-$105,000 based on experience
• Annual performance bonus up to 15% of base salary
• Comprehensive benefits package (medical, dental, vision, life insurance)
• 401(k) with 6% company match, immediate vesting
• Generous PTO (20 days + 10 paid holidays)
• $2,000 annual CEU/conference budget
• BCBA certification renewal and liability insurance covered
• Company laptop and phone
• Flexible scheduling with work-from-home options for administrative tasks
• Relocation assistance available for qualified candidates`,
      postedDate: "2026-01-12",
    },
    "3": {
      jobTitle: "RBT - Part Time Afternoons",
      positionType: "RBT",
      zipCode: "30030",
      clinicLocationName: "Decatur Family Center",
      employmentTypes: ["Part-time"],
      scheduleOptions: ["Weekdays", "Afternoons", "Evenings"],
      compensationType: "hourly",
      rateMin: "23",
      rateMax: "29",
      startDate: "2026-02-03",
      requiredYearsExperience: "0",
      preferredYearsExperience: "1",
      specializations: ["Early learner programs", "Verbal"],
      caseloadSize: "3-4 clients",
      treatmentSetting: "multiple",
      jobDescription: `Looking for a flexible part-time opportunity in ABA therapy? Join our Decatur team for afternoon and early evening sessions, perfect for students, those with morning commitments, or anyone seeking work-life balance.

This part-time RBT position offers 20-25 hours per week, primarily Monday through Friday from 2:00 PM to 7:00 PM. You'll work with clients ranging from 3-10 years old in both our center-based clinic and in-home settings within a 15-mile radius of Decatur.

What You'll Do:
• Provide direct 1:1 ABA therapy under BCBA supervision
• Work with early learners on communication, social skills, and daily living skills
• Collect session data and maintain accurate records
• Travel to 1-2 in-home clients per week (mileage reimbursed)
• Participate in monthly team trainings and case consultations

This Is a Great Fit If You:
• Have (or are working toward) your RBT certification
• Are a college student in psychology, education, or related field
• Want hands-on experience before pursuing a graduate degree
• Need a flexible schedule that works around other commitments
• Enjoy working with young children in a dynamic environment

We welcome new RBTs! If you have your 40-hour training but haven't yet passed the exam, we offer paid study time and exam preparation support.`,
      benefitsOverview: `• Competitive hourly rate of $23-$29 based on experience
• Flexible scheduling within afternoon/evening hours
• Paid drive time and mileage reimbursement for in-home sessions
• Free monthly CEU trainings
• Paid sick leave (1 hour per 30 hours worked)
• Employee assistance program (EAP)
• Pathway to full-time employment as positions become available
• Mentorship from experienced BCBAs
• Fun, collaborative team environment with regular social events`,
      postedDate: "2026-01-10",
    },
    "4": {
      jobTitle: "Clinical Supervisor (BCBA)",
      positionType: "BCBA",
      zipCode: "30004",
      clinicLocationName: "Alpharetta North Clinic",
      employmentTypes: ["Full-time"],
      scheduleOptions: ["Weekdays", "Mornings", "Afternoons"],
      compensationType: "salary",
      rateMin: "72000",
      rateMax: "88000",
      startDate: "2026-02-24",
      requiredYearsExperience: "2",
      preferredYearsExperience: "4",
      specializations: ["Non-verbal", "AAC", "Parent / caregiver training required", "Severe behaviors"],
      caseloadSize: "10-12 clients",
      treatmentSetting: "multiple",
      jobDescription: `We're seeking a skilled Clinical Supervisor to join our Alpharetta team. In this role, you'll balance a manageable caseload with supervisory responsibilities, making it ideal for BCBAs looking to develop their leadership skills while maintaining strong clinical involvement.

As Clinical Supervisor, you will oversee 4-5 RBTs while managing your own caseload of clients across clinic, home, and school settings. You'll have the opportunity to specialize in AAC implementation and support for non-verbal clients, an area of growing expertise at our Alpharetta location.

Clinical Duties:
• Conduct comprehensive assessments (VB-MAPP, ABLLS-R, FBA)
• Develop and monitor individualized treatment plans
• Provide direct therapy for complex cases as needed
• Train parents and caregivers on behavior management strategies
• Collaborate with schools on IEP goals and classroom supports
• Coordinate care with speech therapists, OTs, and other providers

Supervisory Duties:
• Provide weekly supervision to 4-5 RBTs
• Conduct treatment integrity observations and provide feedback
• Review session notes and data for accuracy
• Support RBT professional development and career growth
• Assist with RBT onboarding and training

We Value:
• Experience with augmentative and alternative communication (AAC) devices
• Training in verbal behavior approach
• Comfort working with children who exhibit severe problem behaviors
• Strong parent training and family collaboration skills
• Willingness to travel to schools and homes (up to 40% of time)`,
      benefitsOverview: `• Salary range of $72,000-$88,000 commensurate with experience
• Sign-on bonus of $3,000 (paid over first 6 months)
• Full medical, dental, and vision coverage (employee + family options)
• 401(k) with employer match
• 18 days PTO + 9 paid holidays
• $1,500 annual professional development budget
• BCBA supervision hours available for those pursuing BCBA-D
• Company vehicle for work-related travel OR mileage reimbursement
• Quarterly team outings and annual retreat`,
      postedDate: "2025-12-20",
    },
    "5": {
      jobTitle: "RBT - Weekend Specialist",
      positionType: "RBT",
      zipCode: "30328",
      clinicLocationName: "Sandy Springs Therapy Center",
      employmentTypes: ["Part-time", "Weekends"],
      scheduleOptions: ["Weekends", "Mornings", "Afternoons"],
      compensationType: "hourly",
      rateMin: "28",
      rateMax: "34",
      startDate: "2026-02-01",
      requiredYearsExperience: "0",
      preferredYearsExperience: "1",
      specializations: ["Mild / moderate behaviors", "Early learner programs"],
      caseloadSize: "3-5 clients",
      treatmentSetting: "clinic",
      jobDescription: `Earn premium weekend rates while helping families who can't access weekday services! Our Saturday and Sunday clinic sessions are in high demand, and we're looking for dedicated RBTs to join our weekend team.

As a Weekend Specialist, you'll work 12-20 hours per week (Saturday and/or Sunday, 8:00 AM - 4:00 PM) at our Sandy Springs clinic. This position is perfect for those who have weekday commitments or simply prefer a weekend schedule. Our weekend team is small but mighty—you'll develop close relationships with your clients and colleagues.

Position Highlights:
• Premium pay rate: $28-$34/hour (20% above our weekday rate)
• Consistent schedule: Same clients each weekend for continuity of care
• Center-based only: No driving to multiple locations
• Supportive environment: BCBA on-site during all weekend hours
• Growth opportunity: First consideration for weekday openings

What You'll Do:
• Provide 1:1 ABA therapy to children ages 2-8
• Implement early learner curricula focused on language, play, and social skills
• Take accurate data and communicate with weekday team
• Participate in monthly Saturday training sessions (paid)

Requirements:
• Active RBT certification (or completion of 40-hour training with exam scheduled)
• Availability for at least one full weekend day (8-hour shift)
• Commitment to a consistent weekend schedule
• Reliable transportation to Sandy Springs location`,
      benefitsOverview: `• Premium hourly rate of $28-$34/hour
• Weekend differential pay (20% above standard rate)
• Paid sick leave
• Free monthly CEU training (Saturday mornings)
• Employee referral bonus ($500)
• Paid holidays when they fall on weekends
• First consideration for full-time weekday positions
• Annual appreciation bonus for weekend team members`,
      postedDate: "2026-01-20",
    },
    SDWER3: {
      jobTitle: "RBT - Full Time",
      positionType: "RBT",
      zipCode: "30308",
      clinicLocationName: "Midtown Atlanta Clinic",
      employmentTypes: ["Full-time"],
      scheduleOptions: ["Weekdays", "Mornings", "Afternoons"],
      compensationType: "hourly",
      rateMin: "24",
      rateMax: "32",
      startDate: "2026-02-17",
      requiredYearsExperience: "1",
      preferredYearsExperience: "2",
      specializations: ["Verbal", "Mild / moderate behaviors", "Early learner programs"],
      caseloadSize: "4-6 clients",
      treatmentSetting: "clinic",
      jobDescription: `We are seeking a compassionate and dedicated Registered Behavior Technician (RBT) to join our growing clinical team at our Midtown Atlanta location. This is a full-time position offering the opportunity to make a meaningful difference in the lives of children with autism spectrum disorder and their families.

As an RBT at Bright Future ABA, you will work directly with clients ages 2-12, implementing individualized behavior intervention plans under the supervision of a Board Certified Behavior Analyst (BCBA). You'll be part of a supportive team environment where collaboration, ongoing training, and professional development are prioritized.

Key Responsibilities:
• Provide 1:1 Applied Behavior Analysis therapy to clients in a center-based setting
• Implement behavior intervention plans (BIPs) as designed by the supervising BCBA
• Collect accurate data on client progress and behavior using our electronic data collection system
• Participate in regular team meetings and training sessions
• Communicate professionally with families, providing updates on session activities
• Maintain a clean, organized, and safe therapy environment
• Complete required documentation in a timely manner

What We're Looking For:
• Active RBT certification in good standing with the BACB
• Genuine passion for working with children with developmental disabilities
• Strong communication and interpersonal skills
• Ability to implement behavior protocols consistently and accurately
• Physical ability to keep up with active children (sitting on floor, light lifting, etc.)
• Reliable transportation and punctuality`,
      benefitsOverview: `• Competitive hourly rate of $24-$32 based on experience
• Comprehensive health insurance (medical, dental, vision) after 60 days
• 401(k) retirement plan with 4% company match after 1 year
• Paid time off (15 days PTO + 8 paid holidays)
• Annual CEU stipend of $500 for professional development
• Paid RBT certification renewal fees
• Mileage reimbursement at IRS rate for any off-site work
• Monthly team appreciation events and quarterly bonuses
• Clear career advancement pathway to Lead RBT and Clinical Coordinator roles
• Supportive supervision with weekly 1:1 meetings with your BCBA`,
      postedDate: "2026-01-15",
    },
  };
  return jobs[id] ?? null;
}

const TREATMENT_SETTING_LABELS: Record<string, string> = {
  clinic: "Clinic",
  home: "Home",
  school: "School",
  community: "Community",
  multiple: "Multiple",
};

function formatPostedDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function JobListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "view"; // Default to view if no mode
  const viewType = searchParams.get("view"); // "professional" for professional view
  const fromSearch = searchParams.get("from") === "search"; // opened from search page (new tab)
  const isViewMode = mode === "view";
  const isProfessionalView = viewType === "professional";

  const job = getJobForView(id);

  const [positionType, setPositionType] = useState<string>(job?.positionType?.toLowerCase() ?? "rbt");
  const [zipCode, setZipCode] = useState<string>(job?.zipCode ?? "30308");
  const [isValidatingLocation, setIsValidatingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [locationValid, setLocationValid] = useState(true);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState("");
  
  // Mock validation for ZIP code
  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setZipCode(value);
    setLocationValid(false);
    setLocationError(null);

    if (value.length === 5) {
      setIsValidatingLocation(true);
      setTimeout(() => {
        setIsValidatingLocation(false);
        if (value.startsWith("9")) {
          setLocationError("Location is more than 100 miles from Atlanta. We currently only support the Greater Atlanta area.");
        } else {
          setLocationValid(true);
        }
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <HeaderWithProfile />
      
      {isViewMode && !isProfessionalView && job && (
        <div className="bg-blue-50 border-b border-blue-100 py-3 px-4 text-center">
          <p className="text-sm text-blue-800 flex items-center justify-center gap-2">
            <Eye className="w-4 h-4" />
            <span className="font-medium">You are viewing your live job listing: {job.jobTitle}</span>
          </p>
        </div>
      )}

      <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
        {/* Navigation */}
        <div className="space-y-4">
          {!fromSearch && (
            <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary" asChild>
              <Link href={isProfessionalView ? "/professional-portal?tab=dashboard" : "/employer-portal?tab=jobs"}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Dashboard
              </Link>
            </Button>
          )}
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                {isViewMode 
                  ? (job?.jobTitle ?? (positionType === "rbt" ? "RBT - Full Time" : "BCBA - Full Time")) 
                  : "Edit job listing"
                }
                {!isViewMode && (
                   <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200 font-normal">
                     Active
                   </span>
                )}
              </h1>
              {isViewMode && isProfessionalView && (
                <Button onClick={() => setIsApplyDialogOpen(true)}>
                  Apply to job
                </Button>
              )}
              {isViewMode && !isProfessionalView && (
                 <Button asChild className="gap-1">
                   <Link href={`/listing/new?id=${id}`}>
                     <Edit className="w-4 h-4" />
                     Edit job
                   </Link>
                 </Button>
              )}
            </div>
            <p className="text-muted-foreground">
              {isViewMode 
                ? (job?.postedDate ? `Posted on ${formatPostedDate(job.postedDate)}` : "Posted on Jan 15, 2026")
                : `Manage your listing details for ${positionType === "rbt" ? "Registered Behavior Technician" : "Board Certified Behavior Analyst"}`
              }
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {isViewMode ? (
            <>
              {/* VIEW MODE - Single card with all fields */}
              {!job ? (
                <Card>
                  <CardContent className="py-8">
                    <p className="text-muted-foreground text-center">Job not found.</p>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Job Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* About the Employer - always shown at top */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm">About the Employer</h3>
                      <div className="flex items-start gap-4 p-4 bg-muted/40 rounded-lg border">
                        <Avatar className="h-16 w-16 border-2 border-white shadow-sm shrink-0">
                          <AvatarImage src={EMPLOYER_INFO.logoUrl} alt={EMPLOYER_INFO.name} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            <Building className="h-7 w-7" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-base">{EMPLOYER_INFO.name}</h4>
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5">
                            <MapPin className="w-3.5 h-3.5 shrink-0" />
                            {job.clinicLocationName} ({job.zipCode})
                          </div>
                          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                            {EMPLOYER_INFO.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Key details grid - most important info at a glance */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Compensation</Label>
                        <div className="font-semibold text-foreground text-lg">
                          {job.compensationType === "hourly"
                            ? `$${job.rateMin} - $${job.rateMax}/hr`
                            : `$${Number(job.rateMin).toLocaleString()} - $${Number(job.rateMax).toLocaleString()}`}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Employment Type</Label>
                        <div className="font-medium">{job.employmentTypes.length ? job.employmentTypes.join(", ") : "—"}</div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Position Type</Label>
                        <div className="font-medium flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          {job.positionType === "RBT" ? "Registered Behavior Technician (RBT)" : "Board Certified Behavior Analyst (BCBA)"}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Schedule</Label>
                        <div className="font-medium flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          {job.scheduleOptions.length ? job.scheduleOptions.join(", ") : "—"}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Treatment Setting</Label>
                        <div className="font-medium">{TREATMENT_SETTING_LABELS[job.treatmentSetting] ?? job.treatmentSetting ?? "—"}</div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Start Date</Label>
                        <div className="font-medium">{job.startDate ? formatPostedDate(job.startDate) : "Flexible"}</div>
                      </div>
                      {job.telehealthOnly !== undefined && (
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Telehealth Only</Label>
                          <div className="font-medium">{job.telehealthOnly ? "Yes" : "No"}</div>
                        </div>
                      )}
                      {job.scheduleExpectation && (
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Schedule Expectation</Label>
                          <div className="font-medium">{job.scheduleExpectation}</div>
                        </div>
                      )}
                      {job.travelRequirement && (
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Travel</Label>
                          <div className="font-medium">{job.travelRequirement}</div>
                        </div>
                      )}
                      {job.expectedWeeklyHours && (
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Expected Weekly Hours</Label>
                          <div className="font-medium">{job.expectedWeeklyHours}</div>
                        </div>
                      )}
                      {job.guaranteedHours !== undefined && (
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Guaranteed Hours/Pay</Label>
                          <div className="font-medium">{job.guaranteedHours ? "Yes" : "No"}</div>
                        </div>
                      )}
                    </div>

                    <Separator />

                    {/* About This Role - moved above requirements */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm">About This Role</h3>
                      <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {job.jobDescription || "—"}
                      </div>
                    </div>

                    <Separator />

                    {/* Requirements section */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-sm">Requirements</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Experience Required</Label>
                          <div className="font-medium">{job.requiredYearsExperience ? `${job.requiredYearsExperience}+ years` : "None required"}</div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Experience Preferred</Label>
                          <div className="font-medium">{job.preferredYearsExperience ? `${job.preferredYearsExperience}+ years` : "—"}</div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Caseload Size</Label>
                          <div className="font-medium">{job.caseloadSize || "—"}</div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Location</Label>
                          <div className="font-medium">{job.clinicLocationName || job.zipCode}</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Specializations</Label>
                        <div className="flex flex-wrap gap-2">
                          {job.specializations.length > 0 ? (
                            job.specializations.map((spec) => (
                              <span key={spec} className="px-2.5 py-1 bg-muted rounded-full text-sm font-medium">
                                {spec}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm text-muted-foreground">No specific specializations required</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* BCBA-Specific Fields */}
                    {job.positionType === "BCBA" && (job.weeklyBillableExpectation || job.nonBillableAdminIncluded !== undefined || job.wfhFlexibility !== undefined) && (
                      <>
                        <Separator />
                        <div className="space-y-4">
                          <h3 className="font-semibold text-sm">BCBA Details</h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {job.weeklyBillableExpectation && (
                              <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Weekly Billable Expectation</Label>
                                <div className="font-medium">{job.weeklyBillableExpectation}</div>
                              </div>
                            )}
                            {job.nonBillableAdminIncluded !== undefined && (
                              <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Non-Billable/Admin Included</Label>
                                <div className="font-medium">{job.nonBillableAdminIncluded ? "Yes" : "No"}</div>
                              </div>
                            )}
                            {job.wfhFlexibility !== undefined && (
                              <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">WFH/Hybrid Flexibility</Label>
                                <div className="font-medium">{job.wfhFlexibility ? "Yes" : "No"}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    {/* Work Settings */}
                    {job.workSettings && job.workSettings.length > 0 && (
                      <>
                        <Separator />
                        <div className="space-y-3">
                          <h3 className="font-semibold text-sm">Work Settings</h3>
                          <div className="flex flex-wrap gap-2">
                            {job.workSettings.map((s) => (
                              <span key={s} className="px-2.5 py-1 bg-muted rounded-full text-sm font-medium">{s}</span>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {/* Client Age Groups */}
                    {job.clientAgeGroups && job.clientAgeGroups.length > 0 && (
                      <>
                        <Separator />
                        <div className="space-y-3">
                          <h3 className="font-semibold text-sm">Client Population</h3>
                          <div className="flex flex-wrap gap-2">
                            {job.clientAgeGroups.map((g) => (
                              <span key={g} className="px-2.5 py-1 bg-muted rounded-full text-sm font-medium">{g}</span>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    <Separator />

                    {/* Benefits & Incentives */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-sm">Benefits & Compensation Details</h3>
                      {job.benefitsOffered && job.benefitsOffered.length > 0 && (
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Benefits Offered</Label>
                          <div className="flex flex-wrap gap-2">
                            {job.benefitsOffered.map((b) => (
                              <span key={b} className="px-2.5 py-1 bg-green-50 text-green-800 rounded-full text-sm font-medium border border-green-200">{b}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {job.bonusesIncentives && job.bonusesIncentives.length > 0 && (
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Bonuses & Incentives</Label>
                          <div className="flex flex-wrap gap-2">
                            {job.bonusesIncentives.map((b) => (
                              <span key={b} className="px-2.5 py-1 bg-blue-50 text-blue-800 rounded-full text-sm font-medium border border-blue-200">{b}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {job.bonusDetails && (
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Bonus Details</Label>
                          <div className="text-sm text-gray-700 leading-relaxed">{job.bonusDetails}</div>
                        </div>
                      )}
                      {job.benefitsOverview && (
                        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                          {job.benefitsOverview}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Apply Dialog */}
              {isProfessionalView && (
                <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
                  <DialogContent overlayClassName="bg-black/30">
                    <DialogHeader>
                      <DialogTitle>Apply for Position</DialogTitle>
                      <DialogDescription>
                        Send a message to the employer along with your application.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="application-message">Message</Label>
                        <Textarea
                          id="application-message"
                          placeholder="Tell the employer why you're interested in this position..."
                          value={applicationMessage}
                          onChange={(e) => setApplicationMessage(e.target.value)}
                          className="min-h-[120px]"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsApplyDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => {
                        // TODO: Submit application
                        console.log("Submitting application", { message: applicationMessage });
                        setIsApplyDialogOpen(false);
                        setApplicationMessage("");
                      }}>
                        Send Application
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </>
          ) : (
            /* EDIT MODE - Original Forms */
            <>
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Position Details</CardTitle>
                  <CardDescription>Basic information about the role.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="position-type">Position Type</Label>
                    <Select value={positionType} onValueChange={setPositionType}>
                      <SelectTrigger id="position-type">
                        <SelectValue placeholder="Select position type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rbt">Registered Behavior Technician (RBT)</SelectItem>
                        <SelectItem value="bcba">Board Certified Behavior Analyst (BCBA)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location (ZIP Code)</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="location" 
                        placeholder="Enter ZIP code" 
                        className="pl-9" 
                        maxLength={5}
                        value={zipCode}
                        onChange={handleZipCodeChange}
                      />
                      {locationValid && (
                        <Check className="absolute right-3 top-2.5 h-4 w-4 text-green-600" />
                      )}
                    </div>
                    {isValidatingLocation && <p className="text-xs text-muted-foreground">Checking distance from Atlanta...</p>}
                    {locationError && (
                      <Alert variant="destructive" className="mt-2">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Location Unavailable</AlertTitle>
                        <AlertDescription>{locationError}</AlertDescription>
                      </Alert>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Jobs must be located within 100 miles of Atlanta, GA.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Employment Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Employment Details</CardTitle>
                  <CardDescription>Schedule and compensation.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Type */}
                  <div className="space-y-3">
                    <Label>Employment Type</Label>
                    <RadioGroup defaultValue="full-time" className="flex gap-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="full-time" id="full-time" />
                        <Label htmlFor="full-time" className="font-normal">Full-time</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="part-time" id="part-time" />
                        <Label htmlFor="part-time" className="font-normal">Part-time</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="contract" id="contract" />
                        <Label htmlFor="contract" className="font-normal">Contract</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />

                  {/* Schedule */}
                  <div className="space-y-3">
                    <Label>Schedule Preferences</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="weekdays" defaultChecked />
                        <Label htmlFor="weekdays" className="font-normal">Weekdays</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="weekends" />
                        <Label htmlFor="weekends" className="font-normal">Weekends</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="evenings" />
                        <Label htmlFor="evenings" className="font-normal">Evenings</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="school-hours" />
                        <Label htmlFor="school-hours" className="font-normal">School Hours</Label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Rate */}
                  <div className="space-y-3">
                    <Label>Hourly Rate Range</Label>
                    <div className="flex items-center gap-4">
                      <div className="relative flex-1">
                        <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Min" className="pl-9" type="number" defaultValue="25" />
                      </div>
                      <span className="text-muted-foreground">-</span>
                      <div className="relative flex-1">
                        <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Max" className="pl-9" type="number" defaultValue="35" />
                      </div>
                      <span className="text-sm text-muted-foreground">/hr</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                  <CardDescription>Detailed overview of the role and responsibilities.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    placeholder="Enter full job description here..." 
                    className="min-h-[300px] leading-relaxed"
                    defaultValue="We are looking for a dedicated RBT to join our team..."
                  />
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => router.push("/employer-portal?tab=jobs")}>Cancel</Button>
                <Button onClick={() => router.push("/employer-portal?tab=jobs")}>Save Changes</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}