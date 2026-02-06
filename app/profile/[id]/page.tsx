"use client";

import { useState, use } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, MapPin, Briefcase, MessageSquare, CheckCircle2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { GenericAvatarByRole } from "@/components/GenericAvatar";
import HeaderWithProfile from "@/components/HeaderWithProfile";
import { InviteToApplyModal } from "@/components/InviteToApplyModal";
import { useEmployerMessageDrawer } from "@/components/EmployerMessageDrawerContext";
import { getUnlockedEmployerIds, addInvite } from "@/lib/invite-store";

// Mock worker data that matches employer portal applicants (full profile: bio, resume when filled in onboarding)
const allMockApplicants = [
  { id: "EF454GR", name: "Sarah Williams", email: "sarah.w@example.com", phone: "(555) 123-4567", role: "RBT", location: "Atlanta, GA", zipCode: "30308", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", experience: "3 years", licenseNumber: "RBT-12345678", minRate: "24", employmentType: ["Full-time", "Weekends"], workSetting: "In-person", radius: "25", bio: "I have three years of experience as an RBT in center-based and in-home ABA. I've worked with children ages 2–10 on verbal behavior, daily living skills, and reduction of challenging behaviors. I'm passionate about family-centered care and helping parents generalize strategies at home. I'm looking for a full-time role where I can grow under strong BCBA supervision.", resumeUrl: "/resumes/sarah-williams-rbt.pdf" },
  { id: "AB123CD", name: "Michael Chen", email: "m.chen@example.com", phone: "(555) 234-5678", role: "RBT", location: "Decatur, GA", zipCode: "30030", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", experience: "1 year", licenseNumber: "RBT-23456789", minRate: "22", employmentType: ["Part-time"], workSetting: "Hybrid", radius: "15", bio: "RBT with one year of experience in school-based and in-home settings. Background in special education. Seeking part-time opportunities to balance graduate coursework in ABA. Reliable, detail-oriented, and committed to data-driven practice.", resumeUrl: "" },
  { id: "XY987ZW", name: "Jessica Davis", email: "jess.davis@example.com", phone: "(555) 345-6789", role: "BCBA", location: "Marietta, GA", zipCode: "30060", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop", experience: "5 years", licenseNumber: "BCBA-34567890", minRate: "75", employmentType: ["Full-time"], workSetting: "In-person", radius: "30", bio: "Board Certified Behavior Analyst with five years in clinical supervision and program design. Specializing in school-based consultation, parent training, and severe behavior reduction. Committed to ethical practice, staff development, and data-driven decision making. Open to full-time positions that offer a mix of direct care and supervision.", resumeUrl: "/resumes/jessica-davis-bcba.pdf" },
  { id: "LM456OP", name: "David Wilson", email: "david.w@example.com", phone: "(555) 456-7890", role: "RBT", location: "Alpharetta, GA", zipCode: "30009", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop", experience: "2 years", licenseNumber: "RBT-45678901", minRate: "26", employmentType: ["Full-time", "Part-time"], workSetting: "In-person", radius: "20", bio: "RBT with two years of experience in center-based and in-home ABA. I've supported clients across early learner programs and verbal behavior. I value clear communication with families and strong BCBA support. Open to full-time or part-time roles.", resumeUrl: "/resumes/david-wilson-rbt.pdf" },
  { id: "QR789ST", name: "Emily Johnson", email: "emily.j@example.com", phone: "(555) 567-8901", role: "BCBA", location: "Atlanta, GA", zipCode: "30305", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop", experience: "4 years", licenseNumber: "BCBA-56789012", minRate: "80", employmentType: ["Full-time"], workSetting: "Hybrid", radius: "25", bio: "BCBA with four years of post-certification experience in clinic and telehealth settings. Focus on quality outcomes, sustainable caseloads, and family-centered care. Seeking a full-time role with opportunities for mentorship and professional development.", resumeUrl: "" },
  { id: "UV321WX", name: "Robert Taylor", email: "robert.t@example.com", phone: "(555) 678-9012", role: "RBT", location: "Roswell, GA", zipCode: "30076", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop", experience: "6 months", licenseNumber: "RBT-67890123", minRate: "20", employmentType: ["Weekends"], workSetting: "In-person", radius: "10", bio: "New RBT with six months of experience in center-based ABA. Eager to grow under strong supervision. Weekend availability. Reliable and committed to following behavior plans and collecting accurate data.", resumeUrl: "" },
];

// Mock: employer id when viewing as employer (in real app from auth/session)
const CURRENT_EMPLOYER_ID = "E1";

// Directory workers (anonymous until they apply or accept message from this employer)
type DirectoryWorker = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  location: string;
  zipCode: string;
  image: string;
  experience: string;
  licenseNumber: string;
  minRate: string;
  employmentType: string[];
  workSetting: string;
  radius: string;
  compensationPreference?: "hourly" | "salary" | "both";
  telehealthOnly?: boolean | null;
  workSettings?: string[];
  schedulePreference?: "standard" | "flexible";
  scheduleDetails?: string[];
  bio?: string;
  jobIntent?: "primary" | "supplemental";
  jobSearchStatus?: string;
  yearsExperience?: string;
  ageGroups?: string[];
  languages?: string[];
  earliestStart?: string;
  openToRelocation?: boolean | null;
  multiSiteComfort?: string;
  preferredWeeklyHours?: string;
  targetRoles?: string[];
  weeklyBillable?: string;
  linkedinUrl?: string;
  /** Verified Professional badge (license verified by admin) */
  isVerified?: boolean;
  unlockedForEmployerIds?: string[];
  realName?: string;
  realImage?: string;
  realEmail?: string;
  realPhone?: string;
  realBio?: string;
};

const directoryWorkers: DirectoryWorker[] = [
  { id: "W101", name: "Anonymous RBT", email: "", phone: "", role: "RBT", location: "Atlanta, GA", zipCode: "30301", image: "", experience: "3 years", licenseNumber: "RBT-W101", minRate: "24", employmentType: ["Full-time"], workSetting: "In-person", radius: "25", compensationPreference: "hourly", telehealthOnly: false, workSettings: ["Center-based", "In-home"], schedulePreference: "flexible", scheduleDetails: ["Weekdays", "Evenings"], bio: "I have three years of experience as an RBT, primarily in early intervention and center-based ABA. I've worked with children ages 2–8 across verbal behavior, daily living skills, and reduction of challenging behaviors. I'm passionate about family-centered care and helping parents generalize strategies at home. I'm looking for a full-time role where I can grow under strong BCBA supervision and contribute to a collaborative team.", isVerified: true, jobIntent: "primary", jobSearchStatus: "Actively looking", yearsExperience: "2-5 years", ageGroups: ["Early Intervention (0-5)", "School Age (6-12)"], languages: ["English", "Spanish"], earliestStart: "2 weeks", openToRelocation: false, multiSiteComfort: "Some travel required", preferredWeeklyHours: "36-40 hours", targetRoles: ["RBT", "Senior RBT"] },
  { id: "W102", name: "Anonymous BCBA", email: "", phone: "", role: "BCBA", location: "Marietta, GA", zipCode: "30060", image: "", experience: "5 years", licenseNumber: "BCBA-W102", minRate: "82", employmentType: ["Full-time"], workSetting: "In-person", radius: "30", compensationPreference: "both", telehealthOnly: true, workSettings: [], schedulePreference: "standard", scheduleDetails: [], bio: "Board Certified Behavior Analyst with over five years in clinical supervision and program design. My background includes school-based consultation, parent training, and telehealth service delivery. I specialize in verbal behavior and severe behavior reduction. I'm committed to ethical practice, staff development, and data-driven decision making. Open to full-time positions that offer a mix of direct care and supervision.", isVerified: true, jobIntent: "primary", jobSearchStatus: "Open to opportunities", yearsExperience: "5-8 years", ageGroups: ["School Age (6-12)", "Adolescents (13-17)"], languages: ["English"], earliestStart: "30 days", openToRelocation: true, multiSiteComfort: "Multi-site travel", targetRoles: ["BCBA", "Clinical Director"], weeklyBillable: "21-25 hours", linkedinUrl: "https://linkedin.com/in/example-bcba" },
  { id: "W103", name: "Anonymous RBT", email: "", phone: "", role: "RBT", location: "Decatur, GA", zipCode: "30030", image: "", experience: "1 year", licenseNumber: "RBT-W103", minRate: "22", employmentType: ["Part-time"], workSetting: "Hybrid", radius: "15", compensationPreference: "hourly", telehealthOnly: false, workSettings: ["School-based"], schedulePreference: "flexible", scheduleDetails: ["Weekends"], bio: "I'm an RBT with one year of experience and a background in special education. I've worked in school-based settings supporting students with autism and related disabilities. I'm seeking part-time opportunities that allow me to balance graduate coursework in ABA. I'm reliable, detail-oriented, and comfortable with data collection and behavior plans. Weekend and afternoon availability preferred.", isVerified: false },
  { id: "W104", name: "Anonymous RBT", email: "", phone: "", role: "RBT", location: "Alpharetta, GA", zipCode: "30009", image: "", experience: "4 years", licenseNumber: "RBT-W104", minRate: "26", employmentType: ["Full-time", "Contractor"], workSetting: "In-person", radius: "20", compensationPreference: "hourly", telehealthOnly: false, workSettings: ["Center-based", "In-home"], schedulePreference: "standard", scheduleDetails: [], bio: "Senior RBT with four years of experience in center-based and in-home ABA. I've supported clients across early learner programs, verbal behavior, and mild to moderate challenging behaviors. I'm skilled at building rapport with families and maintaining treatment integrity. Open to full-time or 1099 contract roles. I value clear communication, ongoing training, and a supportive clinical culture.", isVerified: true },
  { id: "W105", name: "Anonymous BCBA", email: "", phone: "", role: "BCBA", location: "Sandy Springs, GA", zipCode: "30328", image: "", experience: "7 years", licenseNumber: "BCBA-W105", minRate: "90", employmentType: ["Full-time"], workSetting: "Hybrid", radius: "35", compensationPreference: "salary", telehealthOnly: true, workSettings: [], schedulePreference: "flexible", scheduleDetails: ["Weekdays", "Mornings", "Afternoons"], bio: "BCBA with seven years of experience in clinic leadership, telehealth, and hybrid service delivery. I've led clinical teams, developed training programs, and maintained high-quality outcomes across center and remote settings. My focus is on sustainable caseloads, ethical supervision, and family-centered care. I'm looking for a leadership or senior clinical role that supports work-life balance and professional growth.", isVerified: true },
  { id: "W106", name: "Anonymous RBT", email: "", phone: "", role: "RBT", location: "Smyrna, GA", zipCode: "30080", image: "", experience: "2 years", licenseNumber: "RBT-W106", minRate: "23", employmentType: ["Part-time"], workSetting: "In-person", radius: "15", compensationPreference: "hourly", telehealthOnly: false, workSettings: ["In-home"], schedulePreference: "flexible", scheduleDetails: ["Weekdays", "Afternoons"], bio: "RBT with two years of in-home experience. I've worked with children and adolescents on communication, social skills, and daily living skills. I'm comfortable with parent training and naturalistic teaching. Seeking part-time afternoon and weekday hours. I'm organized, punctual, and committed to following behavior plans and collecting accurate data.", isVerified: false },
  { id: "W107", name: "Anonymous RBT", email: "", phone: "", role: "RBT", location: "Atlanta, GA", zipCode: "30303", image: "", experience: "< 1 year", licenseNumber: "RBT-W107", minRate: "20", employmentType: ["Part-time"], workSetting: "In-person", radius: "10", compensationPreference: "hourly", telehealthOnly: null, workSettings: ["Center-based"], schedulePreference: "flexible", scheduleDetails: ["Weekends"], bio: "New RBT with recent certification and a strong desire to grow in center-based ABA. I completed my 40-hour training and fieldwork in a clinic setting and I'm eager to apply my skills with supportive supervision. I'm available weekends and some weeknights. I learn quickly, take feedback well, and am committed to ethical and effective service delivery.", isVerified: false },
  { id: "W108", name: "Anonymous BCBA", email: "", phone: "", role: "BCBA", location: "Roswell, GA", zipCode: "30076", image: "", experience: "3 years", licenseNumber: "BCBA-W108", minRate: "77", employmentType: ["Full-time"], workSetting: "In-person", radius: "25", compensationPreference: "both", telehealthOnly: false, workSettings: ["Center-based", "In-home"], schedulePreference: "standard", scheduleDetails: [], bio: "BCBA with three years of post-certification experience in supervision and direct care. I've worked in center-based and in-home settings with clients ages 2–18. My areas of focus include functional assessment, behavior reduction, and caregiver training. I'm looking for a full-time role with a manageable caseload and opportunities for mentorship and continuing education.", isVerified: true },
];

// Mock active jobs for employer (same as directory invite modal)
const mockActiveJobs = [
  { id: 1, title: "RBT - Full Time", location: "Atlanta, GA" },
  { id: 2, title: "BCBA - Clinic Director", location: "Marietta, GA" },
  { id: 3, title: "RBT - Part Time", location: "Decatur, GA" },
];

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id: workerId } = use(params);
  const searchParams = useSearchParams();
  const fromAdmin = searchParams.get("from") === "admin";

  // Find worker from applicants or directory
  let foundWorker = allMockApplicants.find(a => a.id === workerId);
  if (!foundWorker) {
    const dirWorker = directoryWorkers.find(w => w.id === workerId);
    if (dirWorker) {
      foundWorker = dirWorker;
    }
  }
  
  // Default data fallback
  const worker = foundWorker || {
    id: workerId,
    name: "Sarah Williams",
    role: "RBT",
    location: "Atlanta, GA",
    zipCode: "30308",
    email: "sarah.w@example.com",
    phone: "(555) 123-4567",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    experience: "3 years",
    licenseNumber: "RBT-12345678",
    minRate: "24",
    employmentType: ["Full-time", "Weekends"],
    workSetting: "In-person",
    radius: "25"
  };

  const isVerifiedApplicant = worker.id === "XY987ZW";
  const isDirectoryWorker = worker.id.startsWith("W");
  const dirWorker = directoryWorkers.find(w => w.id === worker.id);
  const unlockedByInvite = getUnlockedEmployerIds(worker.id).includes(CURRENT_EMPLOYER_ID);
  const isUnlockedForThisEmployer = isDirectoryWorker && (unlockedByInvite || (dirWorker?.unlockedForEmployerIds?.includes(CURRENT_EMPLOYER_ID) ?? false));
  const showFullProfile = !isDirectoryWorker || isUnlockedForThisEmployer;
  const displayName = showFullProfile
    ? (dirWorker?.realName ?? (worker as { name?: string }).name ?? "Unknown")
    : (worker.role === "RBT" ? "Anonymous RBT" : "Anonymous BCBA");
  const displayImage = showFullProfile
    ? (dirWorker?.realImage ?? (worker as { image?: string }).image ?? "")
    : "";
  const displayBio = showFullProfile
    ? (dirWorker?.realBio ?? (worker as { bio?: string }).bio ?? "")
    : (dirWorker?.bio ?? (worker as { bio?: string }).bio ?? "");
  const resumeUrl = (worker as { resumeUrl?: string }).resumeUrl;
  const showVerifiedBadge = showFullProfile ? isVerifiedApplicant : (dirWorker?.isVerified ?? false);
  const workSettingsDisplay = (dirWorker?.workSettings?.length ? dirWorker.workSettings : [worker.workSetting].filter(Boolean)) as string[];
  const compensationPreference = dirWorker?.compensationPreference ?? (worker as { compensationPreference?: string }).compensationPreference;
  const telehealthOnly = dirWorker?.telehealthOnly ?? (worker as { telehealthOnly?: boolean | null }).telehealthOnly;
  const schedulePreference = dirWorker?.schedulePreference ?? (worker as { schedulePreference?: string }).schedulePreference;
  const scheduleDetails = dirWorker?.scheduleDetails ?? (worker as { scheduleDetails?: string[] }).scheduleDetails ?? [];
  const jobIntent = dirWorker?.jobIntent ?? (worker as { jobIntent?: string }).jobIntent;
  const jobSearchStatus = dirWorker?.jobSearchStatus ?? (worker as { jobSearchStatus?: string }).jobSearchStatus;
  const yearsExperience = dirWorker?.yearsExperience ?? (worker as { yearsExperience?: string }).yearsExperience;
  const ageGroups = dirWorker?.ageGroups ?? (worker as { ageGroups?: string[] }).ageGroups ?? [];
  const workerLanguages = dirWorker?.languages ?? (worker as { languages?: string[] }).languages ?? [];
  const earliestStart = dirWorker?.earliestStart ?? (worker as { earliestStart?: string }).earliestStart;
  const openToRelocation = dirWorker?.openToRelocation ?? (worker as { openToRelocation?: boolean | null }).openToRelocation;
  const multiSiteComfort = dirWorker?.multiSiteComfort ?? (worker as { multiSiteComfort?: string }).multiSiteComfort;
  const preferredWeeklyHours = dirWorker?.preferredWeeklyHours ?? (worker as { preferredWeeklyHours?: string }).preferredWeeklyHours;
  const targetRoles = dirWorker?.targetRoles ?? (worker as { targetRoles?: string[] }).targetRoles ?? [];
  const weeklyBillable = dirWorker?.weeklyBillable ?? (worker as { weeklyBillable?: string }).weeklyBillable;
  const linkedinUrl = dirWorker?.linkedinUrl ?? (worker as { linkedinUrl?: string }).linkedinUrl;

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const employerMessageDrawer = useEmployerMessageDrawer();

  const handleSendInvite = (jobId: string | number, message: string) => {
    const job = mockActiveJobs.find((j) => j.id === jobId || String(j.id) === String(jobId));
    const jobTitle = job?.title ?? "Job";
    const candidateLabel = worker.role === "RBT" ? "RBT Candidate" : "BCBA Candidate";
    addInvite(CURRENT_EMPLOYER_ID, worker.id, jobId, jobTitle, message, candidateLabel);
  };

  const pageTitle = isDirectoryWorker && !showFullProfile
    ? <>{worker.role} Candidate <span className="text-muted-foreground font-normal">#{worker.id}</span></>
    : displayName;

  return (
    <div className="min-h-screen bg-gray-50/30">
      <HeaderWithProfile />

      <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
        {/* Navigation - hide Back to Dashboard when viewing from directory or as admin */}
        <div className="space-y-2">
          {!isDirectoryWorker && !fromAdmin && (
            <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary" asChild>
              <Link href="/employer-portal?tab=jobs">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Dashboard
              </Link>
            </Button>
          )}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              {pageTitle}
            </h1>
            {!fromAdmin && (
              <>
                {/* Directory worker, anonymous: same Invite to Apply modal as directory */}
                {isDirectoryWorker && !showFullProfile && (
                  <Button onClick={() => setIsInviteModalOpen(true)}>
                    <MessageSquare className="w-4 h-4" />
                    Invite to Apply
                  </Button>
                )}
                {/* Directory worker, profile revealed: open message drawer (stay on profile) */}
                {isDirectoryWorker && showFullProfile && (
                  <Button onClick={() => employerMessageDrawer?.openDrawer(worker.id)}>
                    <MessageSquare className="w-4 h-4" />
                    Message
                  </Button>
                )}
                {/* Applicant (non-directory): open message drawer (stay on profile) */}
                {!isDirectoryWorker && (
                  <Button onClick={() => employerMessageDrawer?.openDrawer(worker.id)}>
                    <MessageSquare className="w-4 h-4" />
                    Message Candidate
                  </Button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Anonymous Profile Alert */}
        {isDirectoryWorker && !showFullProfile && (
          <Alert className="rounded-lg border-amber-200/80 bg-gradient-to-r from-amber-50 to-amber-50/80 shadow-sm">
            <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <AlertDescription className="text-amber-900 text-sm leading-relaxed">
              Anonymous profile. You are viewing qualification and preference details only. Candidate name and photo will be visible to you once this candidate applies to your job or accepts your message.
            </AlertDescription>
          </Alert>
        )}

        {/* Content - match live job listing format: CardHeader, Separators, uppercase labels, section divisions */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 1. About the candidate - same pattern as "About the Employer" on listing */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">About the Candidate</h3>
              <div className="flex items-start gap-4 p-4 bg-muted/40 rounded-lg border">
                <div className="relative shrink-0">
                  {showFullProfile && displayImage ? (
                    <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
                      <AvatarImage src={displayImage} alt={displayName} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xl">
                        {displayName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <GenericAvatarByRole roleType={worker.role as "RBT" | "BCBA"} size="xl" className="h-16 w-16" />
                  )}
                  {showVerifiedBadge && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                        <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 rounded-full p-0.5 border-2 border-white shadow-sm cursor-pointer">
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" align="start">
                        <p>Verified Professional</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-base">
                    {isDirectoryWorker && !showFullProfile ? (
                      <>{worker.role} Candidate <span className="text-muted-foreground font-normal">#{worker.id}</span></>
                    ) : (
                      displayName
                    )}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {worker.role === "RBT" ? "Registered Behavior Technician (RBT)" : "Board Certified Behavior Analyst (BCBA)"} · {worker.experience} experience
                  </p>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    {worker.location}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* 2. Key details grid - same label style as live job listing */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Position Type</Label>
                <div className="font-medium flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  {worker.role === "RBT" ? "RBT" : "BCBA"}
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Location</Label>
                <div className="font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  {worker.location}
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Employment Type</Label>
                <div className="font-medium">{worker.employmentType.join(", ")}</div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Compensation</Label>
                <div className="font-medium">${worker.minRate}/hr min</div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">License</Label>
                <div className="font-medium">{worker.licenseNumber ? worker.licenseNumber : "—"}</div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Experience</Label>
                <div className="font-medium">{worker.experience}</div>
              </div>
            </div>

            {/* Job Intent & Status */}
            {(jobIntent || jobSearchStatus || earliestStart) && (
              <>
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm">Job Intent</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {jobIntent && (
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Goal</Label>
                        <div className="font-medium">{jobIntent === "primary" ? "Primary role" : "Supplemental / additional work"}</div>
                      </div>
                    )}
                    {jobSearchStatus && (
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Search Status</Label>
                        <div className="font-medium">{jobSearchStatus}</div>
                      </div>
                    )}
                    {earliestStart && (
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Earliest Start</Label>
                        <div className="font-medium">{earliestStart}</div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Experience & Background */}
            {(yearsExperience || ageGroups.length > 0 || workerLanguages.length > 0) && (
              <>
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm">Experience & Background</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {yearsExperience && (
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Years of Experience</Label>
                        <div className="font-medium">{yearsExperience}</div>
                      </div>
                    )}
                  </div>
                  {ageGroups.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Age Groups Served</Label>
                      <div className="flex flex-wrap gap-2">
                        {ageGroups.map((g: string, i: number) => (
                          <span key={i} className="px-2.5 py-1 bg-muted rounded-full text-sm font-medium">{g}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {workerLanguages.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Languages Spoken</Label>
                      <div className="flex flex-wrap gap-2">
                        {workerLanguages.map((l: string, i: number) => (
                          <span key={i} className="px-2.5 py-1 bg-muted rounded-full text-sm font-medium">{l}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {(compensationPreference != null || telehealthOnly !== null || workSettingsDisplay.length > 0 || worker.radius || schedulePreference || scheduleDetails.length > 0) && (
              <>
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm">Preferences</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {compensationPreference != null && (
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Compensation</Label>
                        <div className="font-medium capitalize">{compensationPreference === "both" ? "Hourly or salary" : compensationPreference}</div>
                      </div>
                    )}
                    {telehealthOnly !== null && (
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Telehealth Only</Label>
                        <div className="font-medium">{telehealthOnly ? "Yes" : "No"}</div>
                      </div>
                    )}
                    {worker.radius && (
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Geographic Radius</Label>
                        <div className="font-medium">{worker.radius} miles</div>
                      </div>
                    )}
                    {schedulePreference && (
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Schedule Preference</Label>
                        <div className="font-medium">{schedulePreference === "standard" ? "Standard weekday" : schedulePreference === "flexible" ? "Non-standard / flexible" : schedulePreference}</div>
                      </div>
                    )}
                    {openToRelocation !== null && openToRelocation !== undefined && (
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Open to Relocation</Label>
                        <div className="font-medium">{openToRelocation ? "Yes" : "No"}</div>
                      </div>
                    )}
                    {multiSiteComfort && (
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Multi-Site Comfort</Label>
                        <div className="font-medium">{multiSiteComfort}</div>
                      </div>
                    )}
                    {preferredWeeklyHours && (
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Preferred Weekly Hours</Label>
                        <div className="font-medium">{preferredWeeklyHours}</div>
                      </div>
                    )}
                  </div>
                  {workSettingsDisplay.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Work Setting</Label>
                      <div className="flex flex-wrap gap-2">
                        {workSettingsDisplay.map((s: string, i: number) => (
                          <span key={i} className="px-2.5 py-1 bg-muted rounded-full text-sm font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {scheduleDetails.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Schedule Availability</Label>
                      <div className="flex flex-wrap gap-2">
                        {scheduleDetails.map((d: string, i: number) => (
                          <span key={i} className="px-2.5 py-1 bg-muted rounded-full text-sm font-medium">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {targetRoles.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Target Roles</Label>
                      <div className="flex flex-wrap gap-2">
                        {targetRoles.map((r: string, i: number) => (
                          <span key={i} className="px-2.5 py-1 bg-muted rounded-full text-sm font-medium">{r}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {weeklyBillable && worker.role === "BCBA" && (
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground font-normal uppercase tracking-wide">Weekly Billable Preference</Label>
                      <div className="font-medium">{weeklyBillable}</div>
                    </div>
                  )}
                </div>
              </>
            )}

            {(displayBio || (showFullProfile && resumeUrl)) && (
              <>
                <Separator />
                {displayBio && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm">About</h3>
                    <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {displayBio}
                    </div>
                  </div>
                )}
                {(showFullProfile && resumeUrl) && (
                  <>
                    {displayBio && <Separator />}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm">Resume</h3>
                      <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        <FileText className="h-4 w-4 shrink-0" />
                        View resume
                      </a>
                    </div>
                  </>
                )}
                {showFullProfile && linkedinUrl && (
                  <>
                    <Separator />
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm">LinkedIn</h3>
                      <a
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        View LinkedIn profile
                      </a>
                    </div>
                  </>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Same Invite to Apply modal as directory (anonymous directory worker only) */}
      {isDirectoryWorker && (
        <InviteToApplyModal
          isOpen={isInviteModalOpen}
          onClose={() => setIsInviteModalOpen(false)}
          candidateLabel={worker.role === "RBT" ? "RBT Candidate" : "BCBA Candidate"}
          candidateId={worker.id}
          jobs={mockActiveJobs}
          onSend={handleSendInvite}
        />
      )}
    </div>
  );
}
