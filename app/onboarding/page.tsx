"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Lock, AlertTriangle, Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Header Component for Logged Out Users
function Header() {
  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/login" className="flex items-center gap-2">
          <img
            src="https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769551902030x600833303719120300/aba.png"
            alt="ABA Marketplace"
            className="h-10 w-auto"
          />
        </Link>
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="sm" className="bg-white hover:bg-gray-100">
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

// Pending Invite Screen
function PendingInviteScreen({ onAccept, onDecline }: { onAccept: () => void; onDecline: () => void }) {
  return (
    <div className="max-w-md mx-auto mt-20 text-center">
      <div className="mb-8">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-border/50">
            <img
              src="https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769558510329x965473798247719000/1024favicon.png"
              alt="Airdev, Inc."
              className="w-[80px] h-[80px] object-contain"
            />
          </div>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-3">
          Join Airdev, Inc.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          You&apos;ve been invited to join <span className="font-medium text-foreground">Airdev, Inc.</span> on ABA Marketplace.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={onAccept} className="flex-1 h-12 text-base font-medium shadow-sm hover:shadow-md transition-all">
          Accept Invitation
        </Button>
        <Button 
          onClick={onDecline} 
          variant="outline" 
          className="flex-1 h-12 text-base font-medium border-destructive/20 text-destructive hover:bg-destructive/5 hover:text-destructive hover:border-destructive/30"
        >
          Decline
        </Button>
      </div>
    </div>
  );
}

// Horizontal Step Navigation Component
function StepNavigation({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  // Calculate progress as a decimal (0 at step 1, 1 at last step)
  const progress = (currentStep - 1) / (totalSteps - 1);
  
  return (
    <div className="mb-12 px-4">
      <div className="flex items-center justify-between relative">
        {/* Progress Bar Background - Connecting Line */}
        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-[1px] bg-border" />
        
        {/* Progress Bar Fill - scales from left using scaleX */}
        <div 
          className="absolute left-4 right-4 top-1/2 h-[1px] bg-primary transition-transform duration-300 ease-in-out origin-left"
          style={{ 
            transform: `translateY(-50%) scaleX(${progress})`
          }}
        />

        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex flex-col items-center relative z-10">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2 bg-background ${
                step === currentStep
                  ? "border-primary text-primary scale-110 shadow-md"
                  : step < currentStep
                    ? "border-primary text-primary bg-primary"
                    : "border-muted text-muted-foreground"
              }`}
            >
              {step < currentStep ? (
                <Check className="w-4 h-4 text-primary-foreground" strokeWidth={3} />
              ) : (
                step
              )}
            </div>
            <span
              className={`absolute -bottom-6 w-24 text-center transition-colors duration-300 font-medium text-sm ${
                step === currentStep
                  ? "text-primary"
                  : step < currentStep 
                    ? "text-foreground"
                    : "text-muted-foreground"
              }`}
            >
              {step === 1 ? "Start" : step === 2 ? "Goals" : step === 3 ? "Experience" : step === 4 ? "Preferences" : "Profile"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [hasPendingInvite, setHasPendingInvite] = useState(true); // Show invite screen by default
  const [currentStep, setCurrentStep] = useState(0); // Start at 0 for user type selection
  const [userType, setUserType] = useState<"worker" | "employer" | null>(null);
  const [roleType, setRoleType] = useState<"RBT" | "BCBA">("RBT");
  
  // Worker form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [zipCodeError, setZipCodeError] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [bio, setBio] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [hasLicense, setHasLicense] = useState(false);
  const [licenseNumber, setLicenseNumber] = useState("");
  const [compensationPreference, setCompensationPreference] = useState<"hourly" | "salary" | "both">("hourly");
  const [minHourlyRate, setMinHourlyRate] = useState("");
  const [minAnnualSalary, setMinAnnualSalary] = useState("");
  const [employmentType, setEmploymentType] = useState<string[]>([]);
  const [telehealthOnly, setTelehealthOnly] = useState<boolean | null>(null);
  const [workSettings, setWorkSettings] = useState<string[]>([]);
  const [geographicRadius, setGeographicRadius] = useState("");
  const [schedulePreference, setSchedulePreference] = useState<"standard" | "flexible">("standard");
  const [scheduleDetails, setScheduleDetails] = useState<string[]>([]);

  // New fields from spec
  const [primaryGoal, setPrimaryGoal] = useState<"career" | "supplemental" | null>(null);
  const [jobSearchStatus, setJobSearchStatus] = useState<string>("");
  const [noticePeriod, setNoticePeriod] = useState<string>("");
  const [yearsExperience, setYearsExperience] = useState<string>("");
  const [ageGroups, setAgeGroups] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [willingToRelocate, setWillingToRelocate] = useState<boolean | null>(null);
  const [travelPreference, setTravelPreference] = useState<string>("");
  const [targetRoles, setTargetRoles] = useState<string[]>([]);
  const [weeklyBillable, setWeeklyBillable] = useState<string>("");
  const [linkedinUrl, setLinkedinUrl] = useState("");

  // Employer form state
  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const [companyLocation, setCompanyLocation] = useState("");
  const [companyLocationError, setCompanyLocationError] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");

  const totalSteps = 5;

  const [companyInfoCompleted, setCompanyInfoCompleted] = useState(false);

  const handleUserTypeSelect = (type: "worker" | "employer") => {
    if (type === "employer") {
      // Redirect to request access page instead of onboarding
      router.push("/request-access");
    } else {
      setUserType(type);
      setCurrentStep(1);
    }
  };

  const handleCompanyInfoSubmit = () => {
    // TODO: Validate required fields and handle submission
    // For now, just stay on the same screen
    console.log("Company info submitted", {
      companyName,
      companyLocation,
      companyDescription,
      companyLogo,
    });
    router.push("/employer-portal");
  };

  // Check for pending invite on mount
  useEffect(() => {
    // TODO: Check API for pending invite
    // setHasPendingInvite(true); // Uncomment to test
  }, []);

  const handleAcceptInvite = () => {
    // TODO: Accept invite via API
    setHasPendingInvite(false);
    setCurrentStep(0); // Show "I am registering as an" screen
  };

  const handleDeclineInvite = () => {
    // TODO: Decline invite via API
    setHasPendingInvite(false);
    setCurrentStep(0); // Show "I am registering as an" screen
  };

  const validateLocation = async (zip: string, isEmployer: boolean = false) => {
    if (!zip) {
      if (isEmployer) setCompanyLocationError("");
      else setZipCodeError("");
      return;
    }

    try {
      // TODO: Implement Google Maps API call to check distance from Atlanta
      // For now, using a simple validation
      const atlantaZipCodes = ["30301", "30302", "30303", "30304", "30305", "30306", "30307", "30308", "30309", "30310"];
      const isNearAtlanta = atlantaZipCodes.some((code) => zip.startsWith(code.substring(0, 3)));

      if (!isNearAtlanta && zip.length === 5) {
        const errorMsg = "We currently only service the Atlanta area (within 100 miles). Please enter a ZIP code near Atlanta.";
        const warningMsg = "Note: Your organization appears to be outside our primary service area (Atlanta > 100 miles). You can proceed, but please note our candidate pool is currently focused in Georgia.";
        
        if (isEmployer) setCompanyLocationError(warningMsg);
        else setZipCodeError(errorMsg);
      } else {
        if (isEmployer) setCompanyLocationError("");
        else setZipCodeError("");
      }
    } catch (error) {
      console.error("Error validating location:", error);
    }
  };

  const handleZipCodeChange = (value: string) => {
    setZipCode(value);
    if (value.length === 5) {
      validateLocation(value, false);
    } else {
      setZipCodeError("");
    }
  };

  const handleCompanyLocationChange = (value: string) => {
    setCompanyLocation(value);
    if (value.length === 5) {
      validateLocation(value, true);
    } else {
      setCompanyLocationError("");
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, isCompanyLogo: boolean = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isCompanyLogo) {
          setCompanyLogo(reader.result as string);
        } else {
          setPhoto(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmploymentTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setEmploymentType([...employmentType, type]);
    } else {
      setEmploymentType(employmentType.filter((t) => t !== type));
    }
  };

  const handleScheduleDetailsChange = (detail: string, checked: boolean) => {
    if (checked) {
      setScheduleDetails([...scheduleDetails, detail]);
    } else {
      setScheduleDetails(scheduleDetails.filter((d) => d !== detail));
    }
  };

  const handleWorkSettingsChange = (option: string, checked: boolean) => {
    if (checked) {
      setWorkSettings([...workSettings, option]);
    } else {
      setWorkSettings(workSettings.filter((s) => s !== option));
    }
  };

  const handleAgeGroupsChange = (group: string, checked: boolean) => {
    if (checked) {
      setAgeGroups([...ageGroups, group]);
    } else {
      setAgeGroups(ageGroups.filter((g) => g !== group));
    }
  };

  const handleLanguagesChange = (lang: string, checked: boolean) => {
    if (checked) {
      setLanguages([...languages, lang]);
    } else {
      setLanguages(languages.filter((l) => l !== lang));
    }
  };

  const handleTargetRolesChange = (role: string, checked: boolean) => {
    if (checked) {
      setTargetRoles([...targetRoles, role]);
    } else {
      setTargetRoles(targetRoles.filter((r) => r !== role));
    }
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type (PDF or DOC)
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (validTypes.includes(file.type)) {
        setResume(file);
      } else {
        alert("Please upload a PDF or DOC file");
      }
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = () => {
    // TODO: Submit form data
    console.log("Submitting onboarding data", {
      userType,
      roleType,
      firstName,
      lastName,
      email,
      phone,
      zipCode,
      photo,
      hasLicense,
      licenseNumber,
      minHourlyRate,
      employmentType,
      telehealthOnly,
      workSettings,
      geographicRadius,
    });

    if (userType === "worker") {
      router.push("/professional-portal");
    } else if (userType === "employer") {
      router.push("/employer-portal");
    }
  };

  if (hasPendingInvite) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <PendingInviteScreen onAccept={handleAcceptInvite} onDecline={handleDeclineInvite} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Initial User Type Selection Screen */}
        {currentStep === 0 && !userType && (
          <div className="max-w-xl mx-auto mt-16">
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-1">I am registering as an</h1>
              <p className="text-lg text-muted-foreground">Please select one</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => handleUserTypeSelect("worker")}
                className="w-full p-6 bg-background border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all text-left"
              >
                <span className="text-base font-medium text-foreground">ABA Professional</span>
              </button>

              <button
                onClick={() => handleUserTypeSelect("employer")}
                className="w-full p-6 bg-background border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all text-left"
              >
                <span className="text-base font-medium text-foreground">Employer</span>
              </button>
            </div>
          </div>
        )}

        {/* Standalone Company Information Form */}
        {userType === "employer" && !companyInfoCompleted && (
          <div className="max-w-xl mx-auto mt-8">
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-1">Company Information</h1>
              <p className="text-lg text-muted-foreground">Tell us about your organization</p>
            </div>

            <Card className="shadow-md">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Company Logo Upload */}
                  <div>
                    <Label className="text-sm font-medium mb-1 block text-center">Company Logo</Label>
                    <div className="flex justify-center">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePhotoUpload(e, true)}
                        className="hidden"
                        id="company-logo-upload"
                      />
                      {companyLogo ? (
                        <div className="relative group cursor-pointer">
                          <label htmlFor="company-logo-upload" className="cursor-pointer">
                            <img
                              src={companyLogo}
                              alt="Company Logo"
                              className="w-24 h-24 rounded-lg object-contain border-2 border-border p-1 bg-white hover:opacity-80 transition-opacity"
                            />
                          </label>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCompanyLogo(null);
                            }}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center hover:bg-destructive/90 transition-colors"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <label htmlFor="company-logo-upload" className="cursor-pointer">
                          <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center border-2 border-dashed border-muted-foreground/30 hover:border-primary hover:bg-muted/50 transition-all">
                            <span className="text-muted-foreground text-xs">Click to upload</span>
                          </div>
                        </label>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Enter company name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyLocation">Location (ZIP Code)</Label>
                    <Input
                      id="companyLocation"
                      value={companyLocation}
                      onChange={(e) => handleCompanyLocationChange(e.target.value)}
                      placeholder="Enter ZIP code"
                      maxLength={5}
                    />
                    {companyLocationError && (
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md mt-2">
                        <p className="text-sm text-yellow-800 flex gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                          {companyLocationError}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyDescription">Description</Label>
                    <Textarea
                      id="companyDescription"
                      className="min-h-[120px]"
                      value={companyDescription}
                      onChange={(e) => setCompanyDescription(e.target.value)}
                      placeholder="Tell us about your organization..."
                    />
                  </div>

                  <div className="pt-4">
                    <Button 
                      type="button"
                      onClick={handleCompanyInfoSubmit} 
                      className="w-full h-12 text-base font-medium"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Onboarding Steps (only show if not employer company info or if company info completed) */}
        {currentStep > 0 && (userType !== "employer" || companyInfoCompleted) && (
          <div className="max-w-xl mx-auto mt-8">
            {/* Step Navigation */}
            <StepNavigation currentStep={currentStep} totalSteps={totalSteps} />

            {/* Main Content */}
            <div className="mt-8">
              <Card className="shadow-md">
                <CardContent className="p-8">
                  {/* Step 1: Let's Get Started (for workers) */}
                  {currentStep === 1 && userType === "worker" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">Let&apos;s Get Started</h2>
                      <p className="text-sm text-muted-foreground mb-6">
                        Create your profile in just a few minutes! Your identifiable information stays private and is only shared when you choose to apply to a role or accept a message from an employer.
                      </p>

                      <Label className="text-base font-semibold mb-4 block">Are you an active BCBA or RBT?</Label>
                      <RadioGroup value={roleType} onValueChange={(value) => setRoleType(value as "RBT" | "BCBA")}>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50">
                          <RadioGroupItem value="RBT" id="rbt" />
                          <Label htmlFor="rbt" className="flex-1 cursor-pointer">
                            RBT (Registered Behavior Technician)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50">
                          <RadioGroupItem value="BCBA" id="bcba" />
                          <Label htmlFor="bcba" className="flex-1 cursor-pointer">
                            BCBA (Board Certified Behavior Analyst)
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}

                  {/* Step 1: Employer onboarding - placeholder for future steps */}
                  {currentStep === 1 && userType === "employer" && (
                    <div className="space-y-6">
                      <div>
                        <Label className="text-base font-semibold mb-4 block">Employer Onboarding</Label>
                        <p className="text-muted-foreground">Additional employer onboarding steps will go here...</p>
                      </div>
                    </div>
                  )}

                  {/* Step 2: What Are You Looking For? */}
                  {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">What Are You Looking For?</h2>
                      <p className="text-sm text-muted-foreground mb-6">
                        Tell us what kind of opportunity you&apos;re hoping to find right now. This helps us show roles that match with what you need.
                      </p>

                      {/* Primary Goal */}
                      <div className="space-y-3 mb-6">
                        <Label>Primary Goal</Label>
                        <RadioGroup value={primaryGoal || ""} onValueChange={(value) => setPrimaryGoal(value as "career" | "supplemental")}>
                          <div className="flex items-center space-x-2 p-3 border rounded-lg">
                            <RadioGroupItem value="career" id="goal-career" />
                            <Label htmlFor="goal-career" className="flex-1 cursor-pointer">Career Move (new primary role)</Label>
                          </div>
                          <div className="flex items-center space-x-2 p-3 border rounded-lg">
                            <RadioGroupItem value="supplemental" id="goal-supplemental" />
                            <Label htmlFor="goal-supplemental" className="flex-1 cursor-pointer">Supplemental / Side Hustle</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Job Search Status */}
                      <div className="space-y-2 mb-6">
                        <Label>Job Search Status</Label>
                        <Select value={jobSearchStatus} onValueChange={setJobSearchStatus}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="actively-looking">Actively looking</SelectItem>
                            <SelectItem value="open">Open to opportunities</SelectItem>
                            <SelectItem value="browsing">Just browsing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Employment Type */}
                      <div className="space-y-2 mb-6">
                        <Label>Employment Type</Label>
                        <div className="flex flex-wrap gap-3 mt-2">
                          {["Full-time", "Part-time", "Contract"].map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <Checkbox
                                id={`onboard-${type}`}
                                checked={employmentType.includes(type)}
                                onCheckedChange={(checked) =>
                                  handleEmploymentTypeChange(type, checked === true)
                                }
                              />
                              <Label htmlFor={`onboard-${type}`} className="cursor-pointer text-sm">
                                {type}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Schedule Preference */}
                      <div className="space-y-3 mb-6">
                        <Label>Schedule Preference</Label>
                        <RadioGroup value={schedulePreference} onValueChange={(value) => setSchedulePreference(value as "standard" | "flexible")}>
                          <div className="flex items-center space-x-2 p-3 border rounded-lg">
                            <RadioGroupItem value="standard" id="sched-standard" />
                            <Label htmlFor="sched-standard" className="flex-1 cursor-pointer">Standard weekday</Label>
                          </div>
                          <div className="flex items-center space-x-2 p-3 border rounded-lg">
                            <RadioGroupItem value="flexible" id="sched-flexible" />
                            <Label htmlFor="sched-flexible" className="flex-1 cursor-pointer">Non-standard / flexible</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Schedule Details (conditional) */}
                      {schedulePreference === "flexible" && (
                        <div className="space-y-2 mb-6">
                          <Label>Schedule Availability</Label>
                          <div className="flex flex-wrap gap-3 mt-2">
                            {["Weekdays", "Weekends", "Mornings", "Afternoons", "Evenings"].map((detail) => (
                              <div key={detail} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`schedule-${detail}`}
                                  checked={scheduleDetails.includes(detail)}
                                  onCheckedChange={(checked) =>
                                    handleScheduleDetailsChange(detail, checked === true)
                                  }
                                />
                                <Label htmlFor={`schedule-${detail}`} className="cursor-pointer text-sm">
                                  {detail}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Notice Period */}
                      <div className="space-y-2 mb-6">
                        <Label>Required Notice Period</Label>
                        <Select value={noticePeriod} onValueChange={setNoticePeriod}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select notice period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immediate</SelectItem>
                            <SelectItem value="2-weeks">2 Weeks</SelectItem>
                            <SelectItem value="30-days">30 Days</SelectItem>
                            <SelectItem value="60-days">60+ Days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                  {/* Step 3: Tell Us About Your Experience */}
                  {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">Tell Us About Your Experience</h2>
                      <p className="text-sm text-muted-foreground mb-6">
                        Share a bit about your background and the types of clients you&apos;ve worked with.
                      </p>

                      {/* Years of Experience */}
                      <div className="space-y-2 mb-6">
                        <Label>Years of Experience</Label>
                        <Select value={yearsExperience} onValueChange={setYearsExperience}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select years of experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-2">0-2 years</SelectItem>
                            <SelectItem value="2-5">2-5 years</SelectItem>
                            <SelectItem value="5-8">5-8 years</SelectItem>
                            <SelectItem value="8+">8+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Age Groups Served */}
                      <div className="space-y-2 mb-6">
                        <Label>Age Groups Served</Label>
                        <div className="space-y-2 mt-2">
                          {[
                            { value: "early-intervention", label: "Early Intervention (0-5)" },
                            { value: "school-age", label: "School Age (6-12)" },
                            { value: "adolescents", label: "Adolescents (13-17)" },
                            { value: "adults", label: "Adults (18+)" }
                          ].map((group) => (
                            <div key={group.value} className="flex items-center space-x-2 p-3 border rounded-lg">
                              <Checkbox
                                id={`age-${group.value}`}
                                checked={ageGroups.includes(group.value)}
                                onCheckedChange={(checked) =>
                                  handleAgeGroupsChange(group.value, checked === true)
                                }
                              />
                              <Label htmlFor={`age-${group.value}`} className="cursor-pointer flex-1">
                                {group.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Languages Spoken */}
                      <div className="space-y-2 mb-6">
                        <Label>Languages Spoken</Label>
                        <div className="space-y-2 mt-2">
                          {[
                            "English",
                            "Spanish",
                            "Mandarin",
                            "Vietnamese",
                            "Korean",
                            "Tagalog",
                            "Arabic",
                            "French",
                            "Portuguese",
                            "Other"
                          ].map((lang) => (
                            <div key={lang} className="flex items-center space-x-2 p-3 border rounded-lg">
                              <Checkbox
                                id={`lang-${lang}`}
                                checked={languages.includes(lang)}
                                onCheckedChange={(checked) =>
                                  handleLanguagesChange(lang, checked === true)
                                }
                              />
                              <Label htmlFor={`lang-${lang}`} className="cursor-pointer flex-1">
                                {lang}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                  {/* Step 4: Tell Us What's Important To You */}
                  {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">Tell Us What&apos;s Important To You</h2>
                      <p className="text-sm text-muted-foreground mb-6">
                        Set your non-negotiables, like pay, location, and work setting.
                      </p>

                      {/* Compensation Section */}
                      <div className="border-b pb-6 mb-6">
                        <h3 className="text-base font-semibold mb-4">Compensation</h3>

                        {/* Compensation Preference */}
                        <div className="space-y-3 mb-4">
                          <Label>Compensation Preference</Label>
                          <RadioGroup value={compensationPreference} onValueChange={(value) => setCompensationPreference(value as "hourly" | "salary" | "both")}>
                            <div className="flex items-center space-x-2 p-3 border rounded-lg">
                              <RadioGroupItem value="hourly" id="comp-hourly" />
                              <Label htmlFor="comp-hourly" className="flex-1 cursor-pointer">Hourly only</Label>
                            </div>
                            <div className="flex items-center space-x-2 p-3 border rounded-lg">
                              <RadioGroupItem value="salary" id="comp-salary" />
                              <Label htmlFor="comp-salary" className="flex-1 cursor-pointer">Salary only</Label>
                            </div>
                            <div className="flex items-center space-x-2 p-3 border rounded-lg">
                              <RadioGroupItem value="both" id="comp-both" />
                              <Label htmlFor="comp-both" className="flex-1 cursor-pointer">Open to hourly or salary</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        {/* Minimum Hourly Rate (conditional) */}
                        {(compensationPreference === "hourly" || compensationPreference === "both") && (
                          <div className="space-y-2 mb-4">
                            <Label htmlFor="minHourlyRate">Minimum Hourly Rate</Label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                              <Input
                                id="minHourlyRate"
                                type="number"
                                value={minHourlyRate}
                                onChange={(e) => setMinHourlyRate(e.target.value)}
                                placeholder="25"
                                className="pl-7"
                              />
                            </div>
                          </div>
                        )}

                        {/* Minimum Annual Salary (conditional) */}
                        {(compensationPreference === "salary" || compensationPreference === "both") && (
                          <div className="space-y-2">
                            <Label htmlFor="minAnnualSalary">Minimum Annual Salary</Label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                              <Input
                                id="minAnnualSalary"
                                type="number"
                                value={minAnnualSalary}
                                onChange={(e) => setMinAnnualSalary(e.target.value)}
                                placeholder="50000"
                                className="pl-7"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Work Setting Section */}
                      <div className="border-b pb-6 mb-6">
                        <h3 className="text-base font-semibold mb-4">Work Setting</h3>

                        {/* Telehealth Only */}
                        <div className="space-y-3 mb-4">
                          <Label>Telehealth Only?</Label>
                          <RadioGroup
                            value={telehealthOnly === null ? "" : telehealthOnly ? "yes" : "no"}
                            onValueChange={(value) => setTelehealthOnly(value === "yes")}
                          >
                            <div className="flex items-center space-x-2 p-3 border rounded-lg">
                              <RadioGroupItem value="yes" id="telehealth-yes" />
                              <Label htmlFor="telehealth-yes" className="flex-1 cursor-pointer">Yes, telehealth only</Label>
                            </div>
                            <div className="flex items-center space-x-2 p-3 border rounded-lg">
                              <RadioGroupItem value="no" id="telehealth-no" />
                              <Label htmlFor="telehealth-no" className="flex-1 cursor-pointer">No, open to in-person</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        {/* Work Setting Preference (conditional - only if NOT telehealth only) */}
                        {telehealthOnly === false && (
                          <div className="space-y-2 mb-4">
                            <Label>Work Setting Preference</Label>
                            <div className="space-y-2 mt-2">
                              {["Center-based", "In-home", "School-based", "Community-based"].map((setting) => (
                                <div key={setting} className="flex items-center space-x-2 p-3 border rounded-lg">
                                  <Checkbox
                                    id={`setting-${setting}`}
                                    checked={workSettings.includes(setting)}
                                    onCheckedChange={(checked) =>
                                      handleWorkSettingsChange(setting, checked === true)
                                    }
                                  />
                                  <Label htmlFor={`setting-${setting}`} className="cursor-pointer flex-1">
                                    {setting}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Location & Travel Section */}
                      <div className="border-b pb-6 mb-6">
                        <h3 className="text-base font-semibold mb-4">Location & Travel</h3>

                        {/* Geographic Radius (only if NOT telehealth only) */}
                        {telehealthOnly !== true && (
                          <div className="space-y-2 mb-4">
                            <Label>Geographic Radius</Label>
                            <Select value={geographicRadius} onValueChange={setGeographicRadius}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select radius" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="5">5 miles</SelectItem>
                                <SelectItem value="10">10 miles</SelectItem>
                                <SelectItem value="15">15 miles</SelectItem>
                                <SelectItem value="25">25 miles</SelectItem>
                                <SelectItem value="50">50 miles</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {/* Willing to Relocate */}
                        <div className="space-y-3 mb-4">
                          <Label>Willing to Relocate?</Label>
                          <RadioGroup
                            value={willingToRelocate === null ? "" : willingToRelocate ? "yes" : "no"}
                            onValueChange={(value) => setWillingToRelocate(value === "yes")}
                          >
                            <div className="flex items-center space-x-2 p-3 border rounded-lg">
                              <RadioGroupItem value="yes" id="relocate-yes" />
                              <Label htmlFor="relocate-yes" className="flex-1 cursor-pointer">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2 p-3 border rounded-lg">
                              <RadioGroupItem value="no" id="relocate-no" />
                              <Label htmlFor="relocate-no" className="flex-1 cursor-pointer">No</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        {/* Travel / Multi-Site */}
                        <div className="space-y-2">
                          <Label>Travel / Multi-Site Preference</Label>
                          <Select value={travelPreference} onValueChange={setTravelPreference}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select preference" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="single-site">Single site only</SelectItem>
                              <SelectItem value="some-travel">Some travel required</SelectItem>
                              <SelectItem value="multi-site">Multi-site travel</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Target Roles Section */}
                      <div className="mb-6">
                        <h3 className="text-base font-semibold mb-4">Target Roles</h3>

                        <div className="space-y-2">
                          <Label>Roles of Interest</Label>
                          <div className="space-y-2 mt-2">
                            {(roleType === "RBT"
                              ? ["RBT", "Senior RBT", "Lead / Supervisor", "Other"]
                              : ["BCBA", "Lead BCBA", "Clinic Supervisor", "Clinical Director", "Other"]
                            ).map((role) => (
                              <div key={role} className="flex items-center space-x-2 p-3 border rounded-lg">
                                <Checkbox
                                  id={`role-${role}`}
                                  checked={targetRoles.includes(role)}
                                  onCheckedChange={(checked) =>
                                    handleTargetRolesChange(role, checked === true)
                                  }
                                />
                                <Label htmlFor={`role-${role}`} className="cursor-pointer flex-1">
                                  {role}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* BCBA-only: Maximum Weekly Billable */}
                        {roleType === "BCBA" && (
                          <div className="space-y-2 mt-4">
                            <Label>Maximum Weekly Billable Requirement</Label>
                            <Select value={weeklyBillable} onValueChange={setWeeklyBillable}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select preference" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="under-20">Under 20 hours</SelectItem>
                                <SelectItem value="21-25">21-25 hours</SelectItem>
                                <SelectItem value="26-30">26-30 hours</SelectItem>
                                <SelectItem value="30+">30+ hours</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                  {/* Step 5: Make Your Profile Shine */}
                  {currentStep === 5 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">Make Your Profile Shine</h2>
                      <p className="text-sm text-muted-foreground mb-6">
                        Add optional details to strengthen your profile and stand out.
                      </p>

                      {/* Privacy Notice */}
                      <div className="flex items-center gap-2 mb-6 p-4 bg-muted/50 rounded-lg">
                        <Lock className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Your personal information stays private. Employers will only see it when you apply to a job or accept a message request.
                        </p>
                      </div>

                      {/* Personal Info Section */}
                      <div className="border-b pb-6 mb-6">
                        <h3 className="text-base font-semibold mb-4">Personal Information</h3>

                        {/* Photo Upload */}
                        <div className="mb-4">
                          <Label className="text-sm font-medium mb-2 block">Profile Photo <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                          <div className="flex items-center gap-4">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handlePhotoUpload(e, false)}
                              className="hidden"
                              id="photo-upload"
                            />
                            {photo ? (
                              <div className="relative group cursor-pointer">
                                <label htmlFor="photo-upload" className="cursor-pointer">
                                  <img
                                    src={photo}
                                    alt="Profile"
                                    className="w-20 h-20 rounded-full object-cover border-2 border-border hover:opacity-80 transition-opacity"
                                  />
                                </label>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setPhoto(null);
                                  }}
                                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center hover:bg-destructive/90 transition-colors"
                                >
                                  ×
                                </button>
                              </div>
                            ) : (
                              <label htmlFor="photo-upload" className="cursor-pointer">
                                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-muted-foreground/30 hover:border-primary hover:bg-muted/50 transition-all">
                                  <span className="text-muted-foreground text-xs text-center px-2">Click to upload</span>
                                </div>
                              </label>
                            )}
                          </div>
                        </div>

                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              placeholder="Enter your first name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              placeholder="Enter your last name"
                            />
                          </div>
                        </div>

                        {/* Phone (optional) */}
                        <div className="space-y-2 mb-4">
                          <Label htmlFor="phone">Phone Number <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="(555) 123-4567"
                          />
                        </div>

                        {/* ZIP Code */}
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">ZIP Code</Label>
                          <Input
                            id="zipCode"
                            value={zipCode}
                            onChange={(e) => handleZipCodeChange(e.target.value)}
                            placeholder="Enter your ZIP code"
                            maxLength={5}
                          />
                          {zipCodeError && (
                            <p className="text-sm text-destructive mt-1">{zipCodeError}</p>
                          )}
                          {!zipCodeError && zipCode.length === 5 && (
                            <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                              <Check className="w-3 h-3" /> Location verified
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Profile Details Section */}
                      <div className="border-b pb-6 mb-6">
                        <h3 className="text-base font-semibold mb-4">Profile Details</h3>

                        {/* Bio */}
                        <div className="space-y-2 mb-4">
                          <Label htmlFor="bio">
                            Professional Bio / Description <span className="text-muted-foreground text-xs">(Optional)</span>
                          </Label>
                          <Textarea
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Tell employers about your experience, specializations, and what makes you a great fit..."
                            className="min-h-[100px] resize-none"
                            maxLength={500}
                          />
                          <p className="text-xs text-muted-foreground">{bio.length}/500 characters</p>
                        </div>

                        {/* Resume Upload */}
                        <div className="space-y-2 mb-4">
                          <Label htmlFor="resume">
                            Resume <span className="text-muted-foreground text-xs">(Optional)</span>
                          </Label>
                          <Input
                            id="resume"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleResumeUpload}
                            className="cursor-pointer"
                          />
                          {resume && (
                            <p className="text-xs text-green-600 flex items-center gap-1">
                              <Check className="w-3 h-3" /> {resume.name}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground">PDF or DOC format, max 5MB</p>
                        </div>

                        {/* LinkedIn URL */}
                        <div className="space-y-2">
                          <Label htmlFor="linkedinUrl">
                            LinkedIn Profile URL <span className="text-muted-foreground text-xs">(Optional)</span>
                          </Label>
                          <Input
                            id="linkedinUrl"
                            type="url"
                            value={linkedinUrl}
                            onChange={(e) => setLinkedinUrl(e.target.value)}
                            placeholder="https://linkedin.com/in/yourprofile"
                          />
                        </div>
                      </div>

                      {/* License Verification Section */}
                      <div>
                        <h3 className="text-base font-semibold mb-4">License Verification</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Confirm your professional credentials to receive a verification badge.
                        </p>

                        <div className="flex items-start space-x-2 p-4 border rounded-lg">
                          <Checkbox
                            id="hasLicense"
                            checked={hasLicense}
                            onCheckedChange={(checked) => setHasLicense(checked === true)}
                          />
                          <Label
                            htmlFor="hasLicense"
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                          >
                            I attest that I hold an active {roleType} credential
                          </Label>
                        </div>

                        {hasLicense && (
                          <div className="mt-4 space-y-2">
                            <Label htmlFor="licenseNumber">License Number <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                            <Input
                              id="licenseNumber"
                              value={licenseNumber}
                              onChange={(e) => setLicenseNumber(e.target.value)}
                              placeholder="Enter your license number"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Enter your license number to receive a &quot;Verified Professional&quot; badge after we verify your license
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8 pt-6 border-t">
                    <Button type="button" variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                      Back
                    </Button>
                    {currentStep < totalSteps ? (
                      <Button type="button" onClick={handleNext}>
                        Next
                      </Button>
                    ) : (
                      <Button type="button" onClick={handleSubmit}>
                        Complete Onboarding
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
