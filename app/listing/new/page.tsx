"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, AlertTriangle, Check, MapPin, DollarSign } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import HeaderWithProfile from "@/components/HeaderWithProfile";

export default function CreateJobPage() {
  const router = useRouter();
  
  // Basic Information
  const [jobTitle, setJobTitle] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [isValidatingLocation, setIsValidatingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [locationValid, setLocationValid] = useState(false);
  
  // Role & Requirements
  const [licenseRequirement, setLicenseRequirement] = useState<"RBT" | "BCBA" | "">("");
  const [minYearsExperience, setMinYearsExperience] = useState("");
  
  // Job Structure
  const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);
  const [telehealthOnly, setTelehealthOnly] = useState(false);
  const [workSettings, setWorkSettings] = useState<string[]>([]);
  const [schedulePreference, setSchedulePreference] = useState<"standard" | "flexible">("standard");
  const [scheduleDetails, setScheduleDetails] = useState<string[]>([]);
  
  // Location & Travel
  const [travelRequirement, setTravelRequirement] = useState("");
  
  // Compensation
  const [compensationPreference, setCompensationPreference] = useState<"hourly" | "salary" | "both">("hourly");
  const [minHourlyRate, setMinHourlyRate] = useState("");
  const [minAnnualSalary, setMinAnnualSalary] = useState("");
  
  // BCBA-Specific
  const [billableExpectation, setBillableExpectation] = useState("");
  const [wfhFlexibility, setWfhFlexibility] = useState(false);
  
  // Client Population
  const [clientAgeGroups, setClientAgeGroups] = useState<string[]>([]);
  const [clientNeeds, setClientNeeds] = useState<string[]>([]);
  
  // Job Details
  const [jobDescription, setJobDescription] = useState("");
  
  // Benefits
  const [paidCancellations, setPaidCancellations] = useState(false);
  const [signOnBonus, setSignOnBonus] = useState(false);
  const [relocationAssistance, setRelocationAssistance] = useState(false);
  const [benefitsOffered, setBenefitsOffered] = useState<string[]>([]);
  
  // Handlers
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

  const handlePublish = () => {
    // TODO: API call to create job posting
    router.push('/listing/SDWER3?mode=view');
  };

  const handleSaveDraft = () => {
    // TODO: API call to save draft
    alert("Draft saved!");
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <HeaderWithProfile />

      <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
        {/* Navigation */}
        <div className="space-y-4">
          <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary" asChild>
            <Link href="/employer-portal?tab=jobs">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Post a New Job</h1>
              <p className="text-muted-foreground mt-1">Create a listing to find an ABA professional.</p>
            </div>
            <div className="flex items-center gap-3">
               <Button variant="outline" onClick={handleSaveDraft}>Save as Draft</Button>
               <Button onClick={handlePublish}>Publish Listing</Button>
            </div>
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
                <Label htmlFor="job-title">Job Title <span className="text-destructive">*</span></Label>
                <Input 
                  id="job-title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., Registered Behavior Technician - Full Time"
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zip-code">ZIP Code <span className="text-destructive">*</span></Label>
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

          {/* 2. Role & Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Role & Requirements</CardTitle>
              <CardDescription>Credentials and experience needed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="license-req">License Requirement <span className="text-destructive">*</span></Label>
                <Select value={licenseRequirement} onValueChange={(val) => setLicenseRequirement(val as "RBT" | "BCBA")}>
                  <SelectTrigger id="license-req">
                    <SelectValue placeholder="Select required credential" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RBT">RBT (Registered Behavior Technician)</SelectItem>
                    <SelectItem value="BCBA">BCBA (Board Certified Behavior Analyst)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="min-experience">
                  Minimum Years of Experience <span className="text-muted-foreground text-xs">(Optional)</span>
                </Label>
                <Input 
                  id="min-experience"
                  type="number"
                  value={minYearsExperience}
                  onChange={(e) => setMinYearsExperience(e.target.value)}
                  placeholder="0"
                  min="0"
                  max="20"
                />
              </div>
            </CardContent>
          </Card>

          {/* 3. Job Structure */}
          <Card>
            <CardHeader>
              <CardTitle>Job Structure</CardTitle>
              <CardDescription>Employment type, location, and schedule details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Employment Type */}
              <div className="space-y-3">
                <Label>Employment Type <span className="text-destructive">*</span></Label>
                <div className="flex flex-col gap-3">
                  {["W2 – Full Time", "W2 – Part Time", "1099 Contractor"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`emp-type-${type}`}
                        checked={employmentTypes.includes(type)}
                        onCheckedChange={(checked) =>
                          handleCheckboxArrayChange(type, checked as boolean, employmentTypes, setEmploymentTypes)
                        }
                      />
                      <Label htmlFor={`emp-type-${type}`} className="font-normal cursor-pointer">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Telehealth Toggle */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="telehealth-toggle" className="text-base cursor-pointer">
                    Telehealth Only
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    This position is exclusively remote/telehealth
                  </p>
                </div>
                <Switch
                  id="telehealth-toggle"
                  checked={telehealthOnly}
                  onCheckedChange={setTelehealthOnly}
                />
              </div>

              {/* Work Setting (conditional) */}
              {!telehealthOnly && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <Label>Work Setting <span className="text-destructive">*</span></Label>
                    <div className="flex flex-col gap-3">
                      {["Center-based", "In-home", "School-based"].map((setting) => (
                        <div key={setting} className="flex items-center space-x-2">
                          <Checkbox
                            id={`work-setting-${setting}`}
                            checked={workSettings.includes(setting)}
                            onCheckedChange={(checked) =>
                              handleCheckboxArrayChange(setting, checked as boolean, workSettings, setWorkSettings)
                            }
                          />
                          <Label htmlFor={`work-setting-${setting}`} className="font-normal cursor-pointer">
                            {setting}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <Separator />

              {/* Schedule Preference */}
              <div className="space-y-3">
                <Label>Schedule Preference <span className="text-destructive">*</span></Label>
                <RadioGroup value={schedulePreference} onValueChange={(val) => setSchedulePreference(val as "standard" | "flexible")}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="standard" id="sched-standard" />
                    <Label htmlFor="sched-standard" className="flex-1 cursor-pointer">
                      Standard Full-Time (Weekday daytime hours)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="flexible" id="sched-flexible" />
                    <Label htmlFor="sched-flexible" className="flex-1 cursor-pointer">
                      Non-Standard / Flexible Schedule
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Schedule Details (conditional) */}
              {schedulePreference === "flexible" && (
                <div className="space-y-3">
                  <Label>Schedule Details</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Weekdays", "Weekends", "Mornings", "Afternoons", "Evenings"].map((detail) => (
                      <div key={detail} className="flex items-center space-x-2">
                        <Checkbox
                          id={`schedule-${detail}`}
                          checked={scheduleDetails.includes(detail)}
                          onCheckedChange={(checked) =>
                            handleCheckboxArrayChange(detail, checked as boolean, scheduleDetails, setScheduleDetails)
                          }
                        />
                        <Label htmlFor={`schedule-${detail}`} className="font-normal cursor-pointer">
                          {detail}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 4. Location & Travel (conditional) */}
          {!telehealthOnly && (
            <Card>
              <CardHeader>
                <CardTitle>Location & Travel</CardTitle>
                <CardDescription>Travel requirements for this role</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="travel-req">Travel Between Locations Required</Label>
                  <Select value={travelRequirement} onValueChange={setTravelRequirement}>
                    <SelectTrigger id="travel-req">
                      <SelectValue placeholder="Select travel requirement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single site only</SelectItem>
                      <SelectItem value="limited">Limited travel</SelectItem>
                      <SelectItem value="multi">Multi-site travel required</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 5. Compensation */}
          <Card>
            <CardHeader>
              <CardTitle>Compensation</CardTitle>
              <CardDescription>Pay structure and rates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Compensation Preference */}
              <div className="space-y-3">
                <Label>Compensation Preference <span className="text-destructive">*</span></Label>
                <RadioGroup value={compensationPreference} onValueChange={(val) => setCompensationPreference(val as "hourly" | "salary" | "both")}>
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

              {/* Hourly Rate */}
              {(compensationPreference === "hourly" || compensationPreference === "both") && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="hourly-rate">Minimum Hourly Rate ($) <span className="text-destructive">*</span></Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="hourly-rate"
                        type="number"
                        placeholder="Enter minimum hourly rate"
                        className="pl-9"
                        value={minHourlyRate}
                        onChange={(e) => setMinHourlyRate(e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">$/hour</p>
                  </div>
                </>
              )}

              {/* Annual Salary */}
              {(compensationPreference === "salary" || compensationPreference === "both") && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="annual-salary">Minimum Annual Salary ($) <span className="text-destructive">*</span></Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="annual-salary"
                        type="number"
                        placeholder="Enter minimum annual salary"
                        className="pl-9"
                        value={minAnnualSalary}
                        onChange={(e) => setMinAnnualSalary(e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">$/year</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* 6. BCBA-Specific Fields (conditional) */}
          {licenseRequirement === "BCBA" && (
            <Card>
              <CardHeader>
                <CardTitle>BCBA-Specific Requirements</CardTitle>
                <CardDescription>Additional details for BCBA positions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="billable">Billable Expectation <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                  <Select value={billableExpectation} onValueChange={setBillableExpectation}>
                    <SelectTrigger id="billable">
                      <SelectValue placeholder="Select billable hours expectation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-20">Under 20 hours</SelectItem>
                      <SelectItem value="21-25">21–25 hours</SelectItem>
                      <SelectItem value="26-30">26–30 hours</SelectItem>
                      <SelectItem value="30-plus">30+ hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label htmlFor="wfh-toggle" className="text-base cursor-pointer">
                      Work From Home Flexibility
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Remote work options available
                    </p>
                  </div>
                  <Switch
                    id="wfh-toggle"
                    checked={wfhFlexibility}
                    onCheckedChange={setWfhFlexibility}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* 7. Client Population */}
          <Card>
            <CardHeader>
              <CardTitle>Client Population & Experience</CardTitle>
              <CardDescription>Who will the professional be working with?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Age Groups */}
              <div className="space-y-3">
                <Label>Client Age Groups Served <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Early Intervention (0–5)",
                    "School Age (6–12)",
                    "Adolescents (13–17)",
                    "Adults (18+)"
                  ].map((group) => (
                    <div key={group} className="flex items-center space-x-2">
                      <Checkbox
                        id={`age-${group}`}
                        checked={clientAgeGroups.includes(group)}
                        onCheckedChange={(checked) =>
                          handleCheckboxArrayChange(group, checked as boolean, clientAgeGroups, setClientAgeGroups)
                        }
                      />
                      <Label htmlFor={`age-${group}`} className="font-normal cursor-pointer text-sm">
                        {group}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Client Needs */}
              <div className="space-y-3">
                <Label>Client Needs / Case Mix <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Verbal",
                    "Non-verbal",
                    "AAC",
                    "Severe behaviors",
                    "Mild / moderate behaviors",
                    "Early learner programs",
                    "School-based / IEP experience",
                    "Parent / caregiver training required"
                  ].map((need) => (
                    <div key={need} className="flex items-center space-x-2">
                      <Checkbox
                        id={`need-${need}`}
                        checked={clientNeeds.includes(need)}
                        onCheckedChange={(checked) =>
                          handleCheckboxArrayChange(need, checked as boolean, clientNeeds, setClientNeeds)
                        }
                      />
                      <Label htmlFor={`need-${need}`} className="font-normal cursor-pointer text-sm">
                        {need}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 8. Job Description */}
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
              <CardDescription>Provide details about the role and responsibilities</CardDescription>
            </CardHeader>
            <CardContent>
              <Label htmlFor="description" className="sr-only">Job Description</Label>
              <Textarea 
                id="description"
                placeholder="Enter full job description here... Include responsibilities, qualifications, and what makes this role unique."
                className="min-h-[300px] leading-relaxed"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </CardContent>
          </Card>

          {/* 9. Benefits & Incentives */}
          <Card>
            <CardHeader>
              <CardTitle>Benefits & Incentives</CardTitle>
              <CardDescription>What additional benefits does this role offer?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Yes/No Toggles */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <Label htmlFor="paid-cancel" className="cursor-pointer">
                    Paid Client Cancellations / No-Shows
                  </Label>
                  <Switch
                    id="paid-cancel"
                    checked={paidCancellations}
                    onCheckedChange={setPaidCancellations}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <Label htmlFor="sign-on" className="cursor-pointer">
                    Sign-on or Retention Bonus
                  </Label>
                  <Switch
                    id="sign-on"
                    checked={signOnBonus}
                    onCheckedChange={setSignOnBonus}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <Label htmlFor="relocation" className="cursor-pointer">
                    Relocation Assistance
                  </Label>
                  <Switch
                    id="relocation"
                    checked={relocationAssistance}
                    onCheckedChange={setRelocationAssistance}
                  />
                </div>
              </div>

              <Separator />

              {/* Benefits Checkboxes */}
              <div className="space-y-3">
                <Label>Benefits Offered <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Medical / Dental / Vision",
                    "401(k) with Matching",
                    "Paid Time Off (PTO)",
                    "CEU Stipend",
                    "Paid Indirect Time",
                    "Mileage Reimbursement",
                    "Laptop / Tablet Provided",
                    "Life / Disability Insurance",
                    "Professional Liability Insurance"
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-center space-x-2">
                      <Checkbox
                        id={`benefit-${benefit}`}
                        checked={benefitsOffered.includes(benefit)}
                        onCheckedChange={(checked) =>
                          handleCheckboxArrayChange(benefit, checked as boolean, benefitsOffered, setBenefitsOffered)
                        }
                      />
                      <Label htmlFor={`benefit-${benefit}`} className="font-normal cursor-pointer text-sm">
                        {benefit}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
