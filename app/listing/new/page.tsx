"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Check, MapPin, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import HeaderWithProfile from "@/components/HeaderWithProfile";

// Full job data for edit-mode prefill (aligned with employer JobsView listings)
function getJobForEdit(id: string) {
  const jobs: Record<string, {
    jobTitle: string;
    positionType: "RBT" | "BCBA";
    zipCode: string;
    clinicLocationName: string;
    employmentTypes: string[];
    scheduleOptions: string[];
    compensationType: "hourly" | "salary";
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
  }> = {
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
    },
  };
  return jobs[id] ?? null;
}

function CreateJobPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const isEditMode = Boolean(editId);

  // Basic Information
  const [jobTitle, setJobTitle] = useState("");
  const [positionType, setPositionType] = useState<"RBT" | "BCBA" | "">("");
  const [zipCode, setZipCode] = useState("");
  const [clinicLocationName, setClinicLocationName] = useState("");

  // Employment Details
  const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);
  const [scheduleOptions, setScheduleOptions] = useState<string[]>([]);
  const [compensationType, setCompensationType] = useState<"hourly" | "salary" | "both">("hourly");
  const [rateMin, setRateMin] = useState("");
  const [rateMax, setRateMax] = useState("");
  const [startDate, setStartDate] = useState("");

  // Work Structure
  const [telehealthOnly, setTelehealthOnly] = useState<boolean>(false);
  const [workSettings, setWorkSettings] = useState<string[]>([]);
  const [scheduleExpectation, setScheduleExpectation] = useState<"standard" | "flexible">("standard");
  const [travelBetweenLocations, setTravelBetweenLocations] = useState("");
  const [expectedWeeklyHours, setExpectedWeeklyHours] = useState("");
  const [guaranteedHours, setGuaranteedHours] = useState<boolean | null>(null);

  // BCBA-specific fields
  const [weeklyBillableExpectation, setWeeklyBillableExpectation] = useState("");
  const [nonBillableAdminIncluded, setNonBillableAdminIncluded] = useState<boolean | null>(null);
  const [workFromHomeFlexibility, setWorkFromHomeFlexibility] = useState<boolean | null>(null);

  // Requirements
  const [requiredYearsExperience, setRequiredYearsExperience] = useState("");
  const [preferredYearsExperience, setPreferredYearsExperience] = useState("");
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [caseloadSize, setCaseloadSize] = useState("");
  const [clientAgeGroups, setClientAgeGroups] = useState<string[]>([]);

  // Benefits & Incentives
  const [benefitsOffered, setBenefitsOffered] = useState<string[]>([]);
  const [bonusesIncentives, setBonusesIncentives] = useState<string[]>([]);
  const [bonusDetails, setBonusDetails] = useState("");

  // Additional Information
  const [jobDescription, setJobDescription] = useState("");
  const [benefitsOverview, setBenefitsOverview] = useState("");

  // Prefill form when editing (id in URL)
  useEffect(() => {
    if (!editId) return;
    const job = getJobForEdit(editId);
    if (!job) return;
    setJobTitle(job.jobTitle);
    setPositionType(job.positionType);
    setZipCode(job.zipCode);
    setClinicLocationName(job.clinicLocationName);
    setEmploymentTypes(job.employmentTypes);
    setScheduleOptions(job.scheduleOptions);
    setCompensationType(job.compensationType);
    setRateMin(job.rateMin);
    setRateMax(job.rateMax);
    setStartDate(job.startDate);
    setRequiredYearsExperience(job.requiredYearsExperience);
    setPreferredYearsExperience(job.preferredYearsExperience);
    setSpecializations(job.specializations);
    setCaseloadSize(job.caseloadSize);
    setTreatmentSetting(job.treatmentSetting);
    setJobDescription(job.jobDescription);
    setBenefitsOverview(job.benefitsOverview);
  }, [editId]);

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 5);
    setZipCode(value);
  };

  const handleCheckboxArrayChange = (
    value: string,
    checked: boolean,
    currentArray: string[],
    setter: (arr: string[]) => void
  ) => {
    if (checked) {
      setter([...currentArray, value]);
    } else {
      setter(currentArray.filter((item) => item !== value));
    }
  };

  const handlePostJob = () => {
    if (isEditMode && editId) {
      // TODO: API call to update job
      router.push(`/listing/${editId}?mode=view`);
    } else {
      // TODO: API call to create and post job (Active)
      router.push("/listing/SDWER3?mode=view");
    }
  };

  const handleSaveDraft = () => {
    // TODO: API call to save draft
    alert("Draft saved!");
  };

  const employmentTypeOptions = ["Full-time", "Part-time", "Contract"];
  const scheduleOptionsList = ["Weekdays", "Weekends", "Mornings", "Afternoons", "Evenings"];
  const specializationOptions = [
    "Verbal",
    "Non-verbal",
    "AAC",
    "Severe behaviors",
    "Mild / moderate behaviors",
    "Early learner programs",
    "School-based / IEP experience",
    "Parent / caregiver training required",
  ];

  return (
    <div className="min-h-screen bg-gray-50/30">
      <HeaderWithProfile />

      <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
        {/* Navigation */}
        <div className="space-y-4">
          <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary" asChild>
            <Link href="/employer-portal?tab=jobs">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {isEditMode ? "Edit Job Listing" : "Post a New Job"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isEditMode ? "Update your listing details below." : "Create a listing to find an ABA professional."}
            </p>
          </div>
        </div>

        {/* Main Form */}
        <div className="space-y-8">
          {/* 1. Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Core details about the position</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="job-title">
                  Job Title
                </Label>
                <Input
                  id="job-title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., Registered Behavior Technician - Full Time"
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position-type">
                  Position Type
                </Label>
                <Select value={positionType} onValueChange={(v) => setPositionType(v as "RBT" | "BCBA")}>
                  <SelectTrigger id="position-type">
                    <SelectValue placeholder="Select position type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RBT">RBT</SelectItem>
                    <SelectItem value="BCBA">BCBA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="zip-code">
                  ZIP Code
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="zip-code"
                    placeholder="Enter ZIP code"
                    className="pl-9"
                    maxLength={5}
                    value={zipCode}
                    onChange={handleZipCodeChange}
                  />
                  {zipCode.length === 5 && (
                    <Check className="absolute right-3 top-2.5 h-4 w-4 text-green-600" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Jobs should be within 100 miles of Atlanta, GA. You can proceed if outside this radius.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clinic-name">Clinic/Location Name <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                <Input
                  id="clinic-name"
                  value={clinicLocationName}
                  onChange={(e) => setClinicLocationName(e.target.value)}
                  placeholder="e.g., Bright Future ABA - Sandy Springs"
                />
              </div>
            </CardContent>
          </Card>

          {/* 2. Employment Details */}
          <Card>
            <CardHeader>
              <CardTitle>Employment Details</CardTitle>
              <CardDescription>Type, schedule, and compensation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>
                  Employment Type
                </Label>
                <div className="flex flex-wrap gap-3">
                  {employmentTypeOptions.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`emp-${type}`}
                        checked={employmentTypes.includes(type)}
                        onCheckedChange={(checked) =>
                          handleCheckboxArrayChange(type, checked as boolean, employmentTypes, setEmploymentTypes)
                        }
                      />
                      <Label htmlFor={`emp-${type}`} className="font-normal cursor-pointer">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Schedule Expectation</Label>
                <RadioGroup value={scheduleExpectation} onValueChange={(v) => setScheduleExpectation(v as "standard" | "flexible")}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="standard" id="sched-exp-standard" />
                    <Label htmlFor="sched-exp-standard" className="flex-1 cursor-pointer">
                      Standard weekday
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="flexible" id="sched-exp-flexible" />
                    <Label htmlFor="sched-exp-flexible" className="flex-1 cursor-pointer">
                      Non-standard / flexible
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {scheduleExpectation === "flexible" && (
                <div className="space-y-3">
                  <Label>Schedule Availability</Label>
                  <div className="flex flex-wrap gap-3">
                    {scheduleOptionsList.map((opt) => (
                      <div key={opt} className="flex items-center space-x-2">
                        <Checkbox
                          id={`sched-${opt}`}
                          checked={scheduleOptions.includes(opt)}
                          onCheckedChange={(checked) =>
                            handleCheckboxArrayChange(opt, checked as boolean, scheduleOptions, setScheduleOptions)
                          }
                        />
                        <Label htmlFor={`sched-${opt}`} className="font-normal cursor-pointer">
                          {opt}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Label>Compensation Type</Label>
                <RadioGroup value={compensationType} onValueChange={(v) => setCompensationType(v as "hourly" | "salary" | "both")}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="hourly" id="comp-hourly" />
                    <Label htmlFor="comp-hourly" className="flex-1 cursor-pointer">
                      Hourly
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="salary" id="comp-salary" />
                    <Label htmlFor="comp-salary" className="flex-1 cursor-pointer">
                      Salary
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="both" id="comp-both" />
                    <Label htmlFor="comp-both" className="flex-1 cursor-pointer">
                      Open to hourly or salary
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rate-min">
                    {compensationType === "salary" ? "Min Salary ($)" : "Min Rate ($/hr)"}
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="rate-min"
                      type="number"
                      placeholder={compensationType === "salary" ? "e.g., 45000" : "e.g., 24"}
                      className="pl-9"
                      value={rateMin}
                      onChange={(e) => setRateMin(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rate-max">
                    {compensationType === "salary" ? "Max Salary ($)" : "Max Rate ($/hr)"}
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="rate-max"
                      type="number"
                      placeholder={compensationType === "salary" ? "e.g., 65000" : "e.g., 32"}
                      className="pl-9"
                      value={rateMax}
                      onChange={(e) => setRateMax(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {(compensationType === "hourly" || compensationType === "both") && (
                <div className="space-y-2">
                  <Label>Expected Weekly Hours</Label>
                  <Select value={expectedWeeklyHours} onValueChange={setExpectedWeeklyHours}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select expected hours" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-20">Under 20 hours</SelectItem>
                      <SelectItem value="20-29">20-29 hours</SelectItem>
                      <SelectItem value="30-35">30-35 hours</SelectItem>
                      <SelectItem value="36-40">36-40 hours</SelectItem>
                      <SelectItem value="40+">40+ hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-3">
                <Label>Guaranteed Hours/Pay?</Label>
                <RadioGroup
                  value={guaranteedHours === null ? "" : guaranteedHours ? "yes" : "no"}
                  onValueChange={(v) => setGuaranteedHours(v === "yes")}
                >
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="yes" id="guaranteed-yes" />
                    <Label htmlFor="guaranteed-yes" className="flex-1 cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="no" id="guaranteed-no" />
                    <Label htmlFor="guaranteed-no" className="flex-1 cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* 3. Work Structure */}
          <Card>
            <CardHeader>
              <CardTitle>Work Structure</CardTitle>
              <CardDescription>Work setting and travel requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Telehealth Only?</Label>
                <RadioGroup
                  value={telehealthOnly ? "yes" : "no"}
                  onValueChange={(v) => setTelehealthOnly(v === "yes")}
                >
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="yes" id="telehealth-yes" />
                    <Label htmlFor="telehealth-yes" className="flex-1 cursor-pointer">Yes, telehealth only</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="no" id="telehealth-no" />
                    <Label htmlFor="telehealth-no" className="flex-1 cursor-pointer">No, in-person work required</Label>
                  </div>
                </RadioGroup>
              </div>

              {!telehealthOnly && (
                <>
                  <div className="space-y-3">
                    <Label>Work Setting</Label>
                    <div className="space-y-2">
                      {["Center-based", "In-home", "School-based", "Community-based"].map((setting) => (
                        <div key={setting} className="flex items-center space-x-2 p-3 border rounded-lg">
                          <Checkbox
                            id={`setting-${setting}`}
                            checked={workSettings.includes(setting)}
                            onCheckedChange={(checked) =>
                              handleCheckboxArrayChange(setting, checked as boolean, workSettings, setWorkSettings)
                            }
                          />
                          <Label htmlFor={`setting-${setting}`} className="font-normal cursor-pointer flex-1">
                            {setting}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Travel Between Locations</Label>
                    <Select value={travelBetweenLocations} onValueChange={setTravelBetweenLocations}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select travel requirement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single-site">Single site only</SelectItem>
                        <SelectItem value="some-travel">Some travel required</SelectItem>
                        <SelectItem value="multi-site">Multi-site travel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {/* BCBA-specific fields */}
              {positionType === "BCBA" && (
                <>
                  <div className="space-y-2">
                    <Label>Weekly Billable Expectation</Label>
                    <Select value={weeklyBillableExpectation} onValueChange={setWeeklyBillableExpectation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select billable hours" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-20">Under 20 hours</SelectItem>
                        <SelectItem value="21-25">21-25 hours</SelectItem>
                        <SelectItem value="26-30">26-30 hours</SelectItem>
                        <SelectItem value="30+">30+ hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Non-Billable/Admin Work Included?</Label>
                    <RadioGroup
                      value={nonBillableAdminIncluded === null ? "" : nonBillableAdminIncluded ? "yes" : "no"}
                      onValueChange={(v) => setNonBillableAdminIncluded(v === "yes")}
                    >
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="yes" id="admin-yes" />
                        <Label htmlFor="admin-yes" className="flex-1 cursor-pointer">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="no" id="admin-no" />
                        <Label htmlFor="admin-no" className="flex-1 cursor-pointer">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label>Work From Home/Hybrid Flexibility?</Label>
                    <RadioGroup
                      value={workFromHomeFlexibility === null ? "" : workFromHomeFlexibility ? "yes" : "no"}
                      onValueChange={(v) => setWorkFromHomeFlexibility(v === "yes")}
                    >
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="yes" id="wfh-yes" />
                        <Label htmlFor="wfh-yes" className="flex-1 cursor-pointer">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="no" id="wfh-no" />
                        <Label htmlFor="wfh-no" className="flex-1 cursor-pointer">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* 4. Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
              <CardDescription>Experience and client population</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="req-years">Required Years of Experience <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                  <Input
                    id="req-years"
                    type="number"
                    value={requiredYearsExperience}
                    onChange={(e) => setRequiredYearsExperience(e.target.value)}
                    placeholder="0"
                    min={0}
                    max={30}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pref-years">Preferred Years of Experience <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                  <Input
                    id="pref-years"
                    type="number"
                    value={preferredYearsExperience}
                    onChange={(e) => setPreferredYearsExperience(e.target.value)}
                    placeholder="0"
                    min={0}
                    max={30}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Required/Preferred Specializations <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                <div className="flex flex-wrap gap-3">
                  {specializationOptions.map((opt) => (
                    <div key={opt} className="flex items-center space-x-2">
                      <Checkbox
                        id={`spec-${opt}`}
                        checked={specializations.includes(opt)}
                        onCheckedChange={(checked) =>
                          handleCheckboxArrayChange(opt, checked as boolean, specializations, setSpecializations)
                        }
                      />
                      <Label htmlFor={`spec-${opt}`} className="font-normal cursor-pointer text-sm">
                        {opt}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="caseload">Caseload Size <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                <Input
                  id="caseload"
                  type="text"
                  value={caseloadSize}
                  onChange={(e) => setCaseloadSize(e.target.value)}
                  placeholder="e.g., 8-12 clients"
                />
              </div>

              <div className="space-y-3">
                <Label>Client Age Groups</Label>
                <div className="space-y-2">
                  {[
                    { value: "early-intervention", label: "Early Intervention (0-5)" },
                    { value: "school-age", label: "School Age (6-12)" },
                    { value: "adolescents", label: "Adolescents (13-17)" },
                    { value: "adults", label: "Adults (18+)" }
                  ].map((group) => (
                    <div key={group.value} className="flex items-center space-x-2 p-3 border rounded-lg">
                      <Checkbox
                        id={`age-${group.value}`}
                        checked={clientAgeGroups.includes(group.value)}
                        onCheckedChange={(checked) =>
                          handleCheckboxArrayChange(group.value, checked as boolean, clientAgeGroups, setClientAgeGroups)
                        }
                      />
                      <Label htmlFor={`age-${group.value}`} className="font-normal cursor-pointer flex-1">
                        {group.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 5. Benefits & Incentives */}
          <Card>
            <CardHeader>
              <CardTitle>Benefits & Incentives</CardTitle>
              <CardDescription>What you offer to candidates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Benefits Offered <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                <div className="space-y-2">
                  {[
                    "Medical/Dental/Vision",
                    "401(k) with Matching",
                    "Paid Time Off (PTO)",
                    "CEU Stipend",
                    "Paid Indirect/Admin Time",
                    "Mileage Reimbursement",
                    "Laptop/Tablet Provided",
                    "Life/Disability Insurance",
                    "Professional Liability Insurance",
                    "Tuition Assistance",
                    "Exam/Certification Support"
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-center space-x-2 p-3 border rounded-lg">
                      <Checkbox
                        id={`benefit-${benefit}`}
                        checked={benefitsOffered.includes(benefit)}
                        onCheckedChange={(checked) =>
                          handleCheckboxArrayChange(benefit, checked as boolean, benefitsOffered, setBenefitsOffered)
                        }
                      />
                      <Label htmlFor={`benefit-${benefit}`} className="font-normal cursor-pointer flex-1">
                        {benefit}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Bonuses & Incentives <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                <div className="space-y-2">
                  {[
                    "Performance-based bonuses",
                    "Sign-on bonus",
                    "Retention bonus",
                    "Referral bonus",
                    "Leadership incentive",
                    "Relocation assistance"
                  ].map((bonus) => (
                    <div key={bonus} className="flex items-center space-x-2 p-3 border rounded-lg">
                      <Checkbox
                        id={`bonus-${bonus}`}
                        checked={bonusesIncentives.includes(bonus)}
                        onCheckedChange={(checked) =>
                          handleCheckboxArrayChange(bonus, checked as boolean, bonusesIncentives, setBonusesIncentives)
                        }
                      />
                      <Label htmlFor={`bonus-${bonus}`} className="font-normal cursor-pointer flex-1">
                        {bonus}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {bonusesIncentives.length > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="bonus-details">Bonus Details <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                  <Textarea
                    id="bonus-details"
                    placeholder="Provide details about bonuses (e.g., sign-on bonus amount, performance bonus structure)"
                    className="min-h-[80px]"
                    value={bonusDetails}
                    onChange={(e) => setBonusDetails(e.target.value)}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* 6. Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Describe the role and benefits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="description">
                  Job Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Enter full job description here... Include responsibilities, qualifications, and what makes this role unique."
                  className="min-h-[200px] leading-relaxed"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="benefits">Benefits Overview <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                <Textarea
                  id="benefits"
                  placeholder="Describe benefits, PTO, insurance, CEU support, etc."
                  className="min-h-[100px]"
                  value={benefitsOverview}
                  onChange={(e) => setBenefitsOverview(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions at bottom */}
        <div className="flex justify-end gap-3 pt-0 pb-8">
          <Button variant="outline" onClick={handleSaveDraft}>
            Save as Draft
          </Button>
          <Button onClick={handlePostJob}>
            {isEditMode ? "Update Job" : "Post Job"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CreateJobPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    }>
      <CreateJobPageContent />
    </Suspense>
  );
}
