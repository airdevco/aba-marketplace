"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
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
              {step === 1 ? "Role" : step === 2 ? "Preferences" : step === 3 ? "Personal" : step === 4 ? "License" : "Review"}
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
                  {/* Step 1: Role Selection (for workers) */}
                  {currentStep === 1 && userType === "worker" && (
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-semibold mb-4 block">Select Your Role Type</Label>
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

                  {/* Step 2: Job Preferences */}
                  {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-semibold mb-4 block">Job Preferences</Label>
                      <p className="text-sm text-muted-foreground mb-6">
                        Tell us what you&apos;re looking for in your next role
                      </p>


                      {/* Compensation Preference */}
                      <div className="space-y-3 mb-6">
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

                      {/* Minimum Hourly Rate */}
                      {(compensationPreference === "hourly" || compensationPreference === "both") && (
                        <div className="space-y-2 mb-6">
                          <Label htmlFor="minHourlyRate">Minimum Hourly Rate ($)</Label>
                          <Input
                            id="minHourlyRate"
                            type="number"
                            value={minHourlyRate}
                            onChange={(e) => setMinHourlyRate(e.target.value)}
                            placeholder="Enter minimum hourly rate"
                          />
                        </div>
                      )}

                      {/* Minimum Annual Salary */}
                      {(compensationPreference === "salary" || compensationPreference === "both") && (
                        <div className="space-y-2 mb-6">
                          <Label htmlFor="minAnnualSalary">Minimum Annual Salary ($)</Label>
                          <Input
                            id="minAnnualSalary"
                            type="number"
                            value={minAnnualSalary}
                            onChange={(e) => setMinAnnualSalary(e.target.value)}
                            placeholder="Enter minimum annual salary"
                          />
                        </div>
                      )}

                      {/* Employment Type */}
                      <div className="space-y-2 mb-6">
                        <Label>Employment Type</Label>
                        <div className="flex flex-wrap gap-3 mt-2">
                          {["Full-time", "Part-time", "Contractor"].map((type) => (
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

                      {/* Telehealth Only */}
                      <div className="space-y-2 mb-6">
                        <Label>Telehealth Only</Label>
                        <RadioGroup
                          value={telehealthOnly === null ? "" : telehealthOnly ? "yes" : "no"}
                          onValueChange={(value) => setTelehealthOnly(value === "yes")}
                        >
                          <div className="flex items-center space-x-2 p-3 border rounded-lg">
                            <RadioGroupItem value="yes" id="telehealth-yes" />
                            <Label htmlFor="telehealth-yes" className="flex-1 cursor-pointer">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2 p-3 border rounded-lg">
                            <RadioGroupItem value="no" id="telehealth-no" />
                            <Label htmlFor="telehealth-no" className="flex-1 cursor-pointer">No</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Work Setting (multi-select, required if Telehealth Only = No) */}
                      {telehealthOnly === false && (
                        <div className="space-y-2 mb-6">
                          <Label>Work Setting</Label>
                          <div className="flex flex-wrap gap-3 mt-2">
                            {["Center-based", "In-home", "School-based"].map((setting) => (
                              <div key={setting} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`work-setting-${setting}`}
                                  checked={workSettings.includes(setting)}
                                  onCheckedChange={(checked) =>
                                    handleWorkSettingsChange(setting, checked === true)
                                  }
                                />
                                <Label htmlFor={`work-setting-${setting}`} className="cursor-pointer text-sm">
                                  {setting}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Geographic Radius */}
                      <div className="space-y-2 mb-6">
                        <Label htmlFor="geographicRadius">Geographic Radius (miles)</Label>
                        <Input
                          id="geographicRadius"
                          type="number"
                          value={geographicRadius}
                          onChange={(e) => setGeographicRadius(e.target.value)}
                          placeholder="Enter radius in miles"
                        />
                      </div>

                      {/* Schedule Preference */}
                      <div className="space-y-3 mb-6">
                        <Label>Schedule Preference</Label>
                        <RadioGroup value={schedulePreference} onValueChange={(value) => setSchedulePreference(value as "standard" | "flexible")}>
                          <div className="flex items-center space-x-2 p-3 border rounded-lg">
                            <RadioGroupItem value="standard" id="sched-standard" />
                            <Label htmlFor="sched-standard" className="flex-1 cursor-pointer">Standard Full-Time (Weekday daytime hours)</Label>
                          </div>
                          <div className="flex items-center space-x-2 p-3 border rounded-lg">
                            <RadioGroupItem value="flexible" id="sched-flexible" />
                            <Label htmlFor="sched-flexible" className="flex-1 cursor-pointer">Non-Standard / Flexible Schedule</Label>
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
                    </div>
                  </div>
                )}

                  {/* Step 3: Personal Information */}
                  {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Label className="text-base font-semibold block">Personal Information</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button 
                            type="button" 
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Info className="w-4 h-4" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent 
                          side="bottom" 
                          align="start"
                          className="bg-white text-foreground border shadow-lg max-w-xs w-auto"
                        >
                          <div className="space-y-1">
                            <p className="font-medium flex items-center gap-2">
                              <Lock className="w-4 h-4" />
                              Anonymous Profile
                            </p>
                            <p className="text-sm">
                              Your personal information stays private. Employers will only see it when you apply to a job or accept a message request.
                            </p>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                      
                    {/* Photo Upload */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block text-center">Profile Photo</Label>
                      <div className="flex justify-center">
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
                                className="w-24 h-24 rounded-full object-cover border-2 border-border hover:opacity-80 transition-opacity"
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
                            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-muted-foreground/30 hover:border-primary hover:bg-muted/50 transition-all">
                              <span className="text-muted-foreground text-xs">Click to upload</span>
                            </div>
                          </label>
                        )}
                      </div>
                    </div>

                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
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

                    {/* Bio */}
                    <div className="space-y-2">
                      <Label htmlFor="bio">
                        Bio / About You
                      </Label>
                      <Textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell employers about your experience, specializations, and what makes you a great fit..."
                        className="min-h-[100px] resize-none"
                        maxLength={500}
                        required
                      />
                    </div>

                    {/* Resume Upload */}
                    <div className="space-y-2">
                      <Label htmlFor="resume">
                        Resume
                      </Label>
                      <Input
                        id="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                        className="cursor-pointer"
                        required
                      />
                      {resume && (
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <Check className="w-3 h-3" /> {resume.name}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">PDF or DOC format, max 5MB</p>
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
                )}

                  {/* Step 4: License Attestation */}
                  {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-semibold mb-4 block">License Verification</Label>
                      <p className="text-sm text-muted-foreground mb-6">
                        Confirm your professional credentials
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
                )}

                  {/* Step 5: Review & Submit */}
                  {currentStep === 5 && (
                  <div className="space-y-8">
                    <div className="space-y-6">
                      {/* 1. Role (Step 1) */}
                      <div className="border-b pb-4">
                        <h3 className="text-lg font-semibold mb-4">Role</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                          <div>
                            <p className="text-sm text-muted-foreground">Role Type</p>
                            <p className="font-medium">{roleType || "RBT"}</p>
                          </div>
                        </div>
                      </div>

                      {/* 2. Job Preferences (Step 2) */}
                      <div className="border-b pb-4">
                        <h3 className="text-lg font-semibold mb-4">Preferences</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                          <div>
                            <p className="text-sm text-muted-foreground">Compensation Preference</p>
                            <p className="font-medium capitalize">{compensationPreference === "both" ? "Hourly or Salary" : compensationPreference}</p>
                          </div>
                          {(compensationPreference === "hourly" || compensationPreference === "both") && minHourlyRate && (
                            <div>
                              <p className="text-sm text-muted-foreground">Minimum Hourly Rate</p>
                              <p className="font-medium">${minHourlyRate}/hr</p>
                            </div>
                          )}
                          {(compensationPreference === "salary" || compensationPreference === "both") && minAnnualSalary && (
                            <div>
                              <p className="text-sm text-muted-foreground">Minimum Annual Salary</p>
                              <p className="font-medium">${parseInt(minAnnualSalary).toLocaleString()}/year</p>
                            </div>
                          )}
                          <div>
                            <p className="text-sm text-muted-foreground">Employment Type</p>
                            <p className="font-medium">
                              {employmentType.length > 0 
                                ? employmentType.join(", ") 
                                : "Full-time, Part-time"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Telehealth Only</p>
                            <p className="font-medium">{telehealthOnly === null ? "No" : telehealthOnly ? "Yes" : "No"}</p>
                          </div>
                          {telehealthOnly === false && (
                            <div>
                              <p className="text-sm text-muted-foreground">Work Setting</p>
                              <p className="font-medium">{workSettings.length > 0 ? workSettings.join(", ") : "Center-based, In-home"}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-sm text-muted-foreground">Geographic Radius</p>
                            <p className="font-medium">{geographicRadius ? `${geographicRadius} miles` : "25 miles"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Schedule</p>
                            <p className="font-medium capitalize">
                              {schedulePreference === "standard" ? "Standard Full-Time (Weekday daytime hours)" : "Non-Standard / Flexible Schedule"}
                            </p>
                          </div>
                          {schedulePreference === "flexible" && (
                            <div className="col-span-2">
                              <p className="text-sm text-muted-foreground">Schedule Availability</p>
                              <p className="font-medium">{scheduleDetails.length > 0 ? scheduleDetails.join(", ") : "Weekdays, Mornings, Afternoons"}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 3. Personal Information (Step 3) */}
                      <div className="border-b pb-4">
                        <h3 className="text-lg font-semibold mb-4">Personal</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                          <div>
                            <p className="text-sm text-muted-foreground">Profile Photo</p>
                            <p className="font-medium">
                              <a
                                href={photo || "#"}
                                target={photo ? "_blank" : undefined}
                                rel={photo ? "noopener noreferrer" : undefined}
                                className="text-primary hover:underline"
                              >
                                {photo ? "View photo" : "profile.jpg"}
                              </a>
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Full Name</p>
                            <p className="font-medium">{firstName || "Sarah"} {lastName || "Hammer"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Location (ZIP Code)</p>
                            <p className="font-medium">{zipCode || "30301"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p className="font-medium">{email || "sarah.hammer@example.com"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Phone</p>
                            <p className="font-medium">{phone || "(555) 123-4567"}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-sm text-muted-foreground">Bio</p>
                            <p className="font-medium">{bio || "Experienced ABA professional with a passion for helping clients achieve their goals. Specialized in early intervention and school-based services."}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-sm text-muted-foreground">Resume</p>
                            <p className="font-medium">
                              <a href="#" className="text-primary hover:underline">
                                {resume ? resume.name : "resume.pdf"}
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* 4. License (Step 4) */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">License</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                          <div>
                            <p className="text-sm text-muted-foreground">License</p>
                            <p className="font-medium">
                              {hasLicense
                                ? (licenseNumber ? `Licensed · ${licenseNumber}` : `Licensed · ${roleType === "BCBA" ? "BCBA-" : "RBT-"}12345678`)
                                : "Not Licensed"}
                            </p>
                          </div>
                        </div>
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
