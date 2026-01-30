"use client";

import { useState, use } from "react";
import Link from "next/link";
import { ChevronLeft, MapPin, Mail, Phone, Briefcase, Award, Check, DollarSign, MessageSquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { GenericAvatarByRole } from "@/components/GenericAvatar";
import HeaderWithProfile from "@/components/HeaderWithProfile";

// Mock worker data that matches employer portal applicants
const allMockApplicants = [
  { id: "EF454GR", name: "Sarah Williams", email: "sarah.w@example.com", phone: "(555) 123-4567", role: "RBT", location: "Atlanta, GA", zipCode: "30308", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", experience: "3 years", licenseNumber: "RBT-12345678", minRate: "24", employmentType: ["Full-time", "Weekends"], workSetting: "In-person", radius: "25" },
  { id: "AB123CD", name: "Michael Chen", email: "m.chen@example.com", phone: "(555) 234-5678", role: "RBT", location: "Decatur, GA", zipCode: "30030", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", experience: "1 year", licenseNumber: "RBT-23456789", minRate: "22", employmentType: ["Part-time"], workSetting: "Hybrid", radius: "15" },
  { id: "XY987ZW", name: "Jessica Davis", email: "jess.davis@example.com", phone: "(555) 345-6789", role: "BCBA", location: "Marietta, GA", zipCode: "30060", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop", experience: "5 years", licenseNumber: "BCBA-34567890", minRate: "75", employmentType: ["Full-time"], workSetting: "In-person", radius: "30" },
  { id: "LM456OP", name: "David Wilson", email: "david.w@example.com", phone: "(555) 456-7890", role: "RBT", location: "Alpharetta, GA", zipCode: "30009", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop", experience: "2 years", licenseNumber: "RBT-45678901", minRate: "26", employmentType: ["Full-time", "Part-time"], workSetting: "In-person", radius: "20" },
  { id: "QR789ST", name: "Emily Johnson", email: "emily.j@example.com", phone: "(555) 567-8901", role: "BCBA", location: "Atlanta, GA", zipCode: "30305", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop", experience: "4 years", licenseNumber: "BCBA-56789012", minRate: "80", employmentType: ["Full-time"], workSetting: "Hybrid", radius: "25" },
  { id: "UV321WX", name: "Robert Taylor", email: "robert.t@example.com", phone: "(555) 678-9012", role: "RBT", location: "Roswell, GA", zipCode: "30076", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop", experience: "6 months", licenseNumber: "RBT-67890123", minRate: "20", employmentType: ["Weekends"], workSetting: "In-person", radius: "10" },
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
  { id: "W101", name: "Anonymous RBT", email: "", phone: "", role: "RBT", location: "Atlanta, GA", zipCode: "30301", image: "", experience: "3 years", licenseNumber: "RBT-W101", minRate: "24", employmentType: ["Full-time"], workSetting: "In-person", radius: "25", compensationPreference: "hourly", telehealthOnly: false, workSettings: ["Center-based", "In-home"], schedulePreference: "flexible", scheduleDetails: ["Weekdays", "Evenings"], bio: "Experienced RBT with focus on early intervention and center-based services. Passionate about supporting children and families.", isVerified: true },
  { id: "W102", name: "Anonymous BCBA", email: "", phone: "", role: "BCBA", location: "Marietta, GA", zipCode: "30060", image: "", experience: "5 years", licenseNumber: "BCBA-W102", minRate: "82", employmentType: ["Full-time"], workSetting: "In-person", radius: "30", compensationPreference: "both", telehealthOnly: true, workSettings: [], schedulePreference: "standard", scheduleDetails: [], bio: "BCBA with 5+ years in clinical supervision and program design. Specializing in school-based and telehealth services.", isVerified: true },
  { id: "W103", name: "Anonymous RBT", email: "", phone: "", role: "RBT", location: "Decatur, GA", zipCode: "30030", image: "", experience: "1 year", licenseNumber: "RBT-W103", minRate: "22", employmentType: ["Part-time"], workSetting: "Hybrid", radius: "15", compensationPreference: "hourly", telehealthOnly: false, workSettings: ["School-based"], schedulePreference: "flexible", scheduleDetails: ["Weekends"], bio: "RBT seeking part-time school-based opportunities. Background in special education.", isVerified: false },
  { id: "W104", name: "Anonymous RBT", email: "", phone: "", role: "RBT", location: "Alpharetta, GA", zipCode: "30009", image: "", experience: "4 years", licenseNumber: "RBT-W104", minRate: "26", employmentType: ["Full-time", "Contractor"], workSetting: "In-person", radius: "20", compensationPreference: "hourly", telehealthOnly: false, workSettings: ["Center-based", "In-home"], schedulePreference: "standard", scheduleDetails: [], bio: "Senior RBT with strong experience in center and in-home settings. Open to full-time or contract roles.", isVerified: true },
  { id: "W105", name: "Anonymous BCBA", email: "", phone: "", role: "BCBA", location: "Sandy Springs, GA", zipCode: "30328", image: "", experience: "7 years", licenseNumber: "BCBA-W105", minRate: "90", employmentType: ["Full-time"], workSetting: "Hybrid", radius: "35", compensationPreference: "salary", telehealthOnly: true, workSettings: [], schedulePreference: "flexible", scheduleDetails: ["Weekdays", "Mornings", "Afternoons"], bio: "BCBA with extensive experience in clinic leadership and telehealth. Focus on quality and outcomes.", isVerified: true },
  { id: "W106", name: "Anonymous RBT", email: "", phone: "", role: "RBT", location: "Smyrna, GA", zipCode: "30080", image: "", experience: "2 years", licenseNumber: "RBT-W106", minRate: "23", employmentType: ["Part-time"], workSetting: "In-person", radius: "15", compensationPreference: "hourly", telehealthOnly: false, workSettings: ["In-home"], schedulePreference: "flexible", scheduleDetails: ["Weekdays", "Afternoons"], bio: "RBT with in-home experience. Looking for part-time afternoon availability.", isVerified: false },
  { id: "W107", name: "Anonymous RBT", email: "", phone: "", role: "RBT", location: "Atlanta, GA", zipCode: "30303", image: "", experience: "< 1 year", licenseNumber: "RBT-W107", minRate: "20", employmentType: ["Part-time"], workSetting: "In-person", radius: "10", compensationPreference: "hourly", telehealthOnly: null, workSettings: ["Center-based"], schedulePreference: "flexible", scheduleDetails: ["Weekends"], bio: "New RBT eager to grow in center-based ABA. Weekend availability.", isVerified: false },
  { id: "W108", name: "Anonymous BCBA", email: "", phone: "", role: "BCBA", location: "Roswell, GA", zipCode: "30076", image: "", experience: "3 years", licenseNumber: "BCBA-W108", minRate: "77", employmentType: ["Full-time"], workSetting: "In-person", radius: "25", compensationPreference: "both", telehealthOnly: false, workSettings: ["Center-based", "In-home"], schedulePreference: "standard", scheduleDetails: [], bio: "BCBA with 3 years in supervision and direct care. Center and in-home experience.", isVerified: true },
];

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id: workerId } = use(params);
  
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
  const isUnlockedForThisEmployer = isDirectoryWorker && dirWorker?.unlockedForEmployerIds?.includes(CURRENT_EMPLOYER_ID);
  const showFullProfile = !isDirectoryWorker || isUnlockedForThisEmployer;
  const displayName = showFullProfile
    ? (dirWorker?.realName ?? (worker as { name?: string }).name ?? "Unknown")
    : (worker.role === "RBT" ? "Anonymous RBT" : "Anonymous BCBA");
  const displayImage = showFullProfile
    ? (dirWorker?.realImage ?? (worker as { image?: string }).image ?? "")
    : "";
  const displayEmail = showFullProfile ? (dirWorker?.realEmail ?? (worker as { email?: string }).email ?? "") : "";
  const displayPhone = showFullProfile ? (dirWorker?.realPhone ?? (worker as { phone?: string }).phone ?? "") : "";
  const displayBio = showFullProfile
    ? (dirWorker?.realBio ?? (worker as { bio?: string }).bio ?? "")
    : (dirWorker?.bio ?? (worker as { bio?: string }).bio ?? "");
  const showVerifiedBadge = showFullProfile ? isVerifiedApplicant : (dirWorker?.isVerified ?? false);
  const workSettingsDisplay = (dirWorker?.workSettings?.length ? dirWorker.workSettings : [worker.workSetting].filter(Boolean)) as string[];
  const compensationPreference = dirWorker?.compensationPreference ?? (worker as { compensationPreference?: string }).compensationPreference;
  const telehealthOnly = dirWorker?.telehealthOnly ?? (worker as { telehealthOnly?: boolean | null }).telehealthOnly;
  const schedulePreference = dirWorker?.schedulePreference ?? (worker as { schedulePreference?: string }).schedulePreference;
  const scheduleDetails = dirWorker?.scheduleDetails ?? (worker as { scheduleDetails?: string[] }).scheduleDetails ?? [];

  const [messageText, setMessageText] = useState("");
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  const handleSendMessage = () => {
    // In a real app, this would verify the user and send the message
    setIsMessageOpen(false);
    setMessageText("");
    // Could show a toast here
  };

  const pageTitle = isDirectoryWorker && !showFullProfile
    ? <>{worker.role} Candidate <span className="text-muted-foreground font-normal">#{worker.id}</span></>
    : displayName;

  return (
    <div className="min-h-screen bg-gray-50/30">
      <HeaderWithProfile />

      <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
        {/* Navigation - hide Back to Dashboard when viewing from directory */}
        <div className="space-y-2">
          {!isDirectoryWorker && (
            <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary" asChild>
              <Link href="/employer-portal?tab=jobs">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          )}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              {pageTitle}
            </h1>
            <Sheet open={isMessageOpen} onOpenChange={setIsMessageOpen}>
              <SheetTrigger asChild>
                <Button>
                  <MessageSquare className="w-4 h-4" />
                  Message Candidate
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Contact {displayName}</SheetTitle>
                  <SheetDescription>
                    Send a message to initiate contact. Your full company profile will be visible to them.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-4">
                  <div className="space-y-2">
                    <Label>Candidate Details</Label>
                    <div className="bg-muted p-3 rounded-md text-sm space-y-1">
                      <p><span className="font-medium">Role:</span> {worker.role}</p>
                      <p><span className="font-medium">Location:</span> {worker.location}</p>
                      <p><span className="font-medium">ID:</span> #{worker.id}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Hi, we'd like to discuss a potential opportunity..." 
                      className="min-h-[150px]"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                    />
                  </div>
                </div>
                <SheetFooter>
                  <Button variant="outline" onClick={() => setIsMessageOpen(false)}>Cancel</Button>
                  <Button onClick={handleSendMessage}>Send Message</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
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

        {/* Content - Sections: Role (with key details at top), Preferences, Personal, License removed (at top) */}
        <Card className="border-[1px] border-border">
          <CardContent className="pt-6 pb-8">
            {/* 1. Role: avatar, title (RBT Candidate #W101), key details at top, Verified badge */}
            <div className="flex flex-col items-center pb-8 border-b border-border">
              <div className="relative">
                {showFullProfile && displayImage ? (
                  <Avatar className="h-24 w-24 border border-gray-200">
                    <AvatarImage src={displayImage} alt={displayName} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xl">
                      {displayName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <GenericAvatarByRole roleType={worker.role as "RBT" | "BCBA"} size="xl" />
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
              <div className="mt-4 text-center">
                <h2 className="text-xl font-semibold">
                  {isDirectoryWorker && !showFullProfile ? (
                    <>{worker.role} Candidate <span className="text-muted-foreground font-normal">#{worker.id}</span></>
                  ) : (
                    displayName
                  )}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {worker.role === "RBT" ? "Registered Behavior Technician" : "Board Certified Behavior Analyst"} · {worker.experience} experience
                </p>
                {/* Key details at top */}
                <div className="mt-4 flex flex-col gap-1.5 text-sm">
                  <p className="font-medium text-foreground">
                    {worker.employmentType.join(", ")} · ${worker.minRate}/hr
                  </p>
                  <p className="font-medium text-muted-foreground flex items-center justify-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 shrink-0" /> {worker.location}
                  </p>
                  <p className="font-medium">
                    {worker.licenseNumber ? (
                      <span className="text-green-700 flex items-center justify-center gap-1.5">
                        <Award className="h-3.5 w-3.5 shrink-0" /> Licensed · {worker.licenseNumber}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">Not licensed</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Preferences - no employment type or rate (already at top) */}
            <section className="pt-8 pb-8 border-b border-border">
              <h3 className="text-base font-semibold mb-4">Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-muted-foreground font-normal text-sm">Compensation</Label>
                  <p className="font-medium capitalize">{compensationPreference === "both" ? "Hourly or salary" : compensationPreference ?? "—"}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground font-normal text-sm">Telehealth Only</Label>
                  <p className="font-medium">{telehealthOnly === null ? "—" : telehealthOnly ? "Yes" : "No"}</p>
                </div>
                {workSettingsDisplay.length > 0 && (
                  <div className="space-y-1 md:col-span-2">
                    <Label className="text-muted-foreground font-normal text-sm">Work Setting</Label>
                    <div className="flex flex-wrap gap-2 mt-0.5">
                      {workSettingsDisplay.map((s: string, i: number) => (
                        <Badge key={i} variant="outline" className="font-normal">{s}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div className="space-y-1">
                  <Label className="text-muted-foreground font-normal text-sm">Geographic Radius</Label>
                  <p className="font-medium">{worker.radius} miles</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground font-normal text-sm">Schedule Preference</Label>
                  <p className="font-medium">{schedulePreference === "standard" ? "Standard Full-Time" : schedulePreference === "flexible" ? "Non-Standard / Flexible" : "—"}</p>
                </div>
                {scheduleDetails.length > 0 && (
                  <div className="space-y-1 md:col-span-2">
                    <Label className="text-muted-foreground font-normal text-sm">Schedule Availability</Label>
                    <div className="flex flex-wrap gap-2 mt-0.5">
                      {scheduleDetails.map((d: string, i: number) => (
                        <Badge key={i} variant="outline" className="font-normal">{d}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* 3. Personal - no location/ZIP (at top); email/phone when full, bio */}
            <section className="pt-8">
              <h3 className="text-base font-semibold mb-4">Personal</h3>
              {(showFullProfile && (displayEmail || displayPhone)) || displayBio ? (
                <div className="space-y-4">
                  {showFullProfile && (displayEmail || displayPhone) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {displayEmail && (
                        <div className="space-y-1">
                          <Label className="text-muted-foreground font-normal text-sm">Email</Label>
                          <div className="font-medium flex items-center gap-2">
                            <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                            {displayEmail}
                          </div>
                        </div>
                      )}
                      {displayPhone && (
                        <div className="space-y-1">
                          <Label className="text-muted-foreground font-normal text-sm">Phone</Label>
                          <div className="font-medium flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                            {displayPhone}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {displayBio && (
                    <div className="space-y-1">
                      <Label className="text-muted-foreground font-normal text-sm">Bio</Label>
                      <p className="font-medium leading-relaxed">{displayBio}</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">—</p>
              )}
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
