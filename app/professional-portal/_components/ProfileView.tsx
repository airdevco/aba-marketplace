"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info, Lock, Check } from "lucide-react";

export default function ProfileView() {
  const [roleType, setRoleType] = useState<"RBT" | "BCBA">("RBT");
  const [photo, setPhoto] = useState<string | null>("https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769817783115x473563165576327740/mary.jpeg");
  const [firstName, setFirstName] = useState("Sarah");
  const [lastName, setLastName] = useState("Williams");
  const [email, setEmail] = useState("sarah.williams@example.com");
  const [phone, setPhone] = useState("(555) 123-4567");
  const [zipCode, setZipCode] = useState("30308");
  const [zipCodeError, setZipCodeError] = useState("");
  const [bio, setBio] = useState("Experienced RBT with a passion for helping children develop essential life skills.");
  const [resume, setResume] = useState<File | null>(null);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [hasLicense, setHasLicense] = useState(true);
  const [licenseNumber, setLicenseNumber] = useState("RBT-12345678");

  // Job Intent fields
  const [jobIntent, setJobIntent] = useState<"primary" | "supplemental">("primary");
  const [jobSearchStatus, setJobSearchStatus] = useState("actively-looking");

  // Compensation fields
  const [compensationPreference, setCompensationPreference] = useState<"hourly" | "salary" | "both">("hourly");
  const [minHourlyRate, setMinHourlyRate] = useState("24");
  const [minAnnualSalary, setMinAnnualSalary] = useState("");
  const [preferredWeeklyHours, setPreferredWeeklyHours] = useState("");

  // Employment fields
  const [employmentType, setEmploymentType] = useState<string[]>(["Full-time"]);
  const [telehealthOnly, setTelehealthOnly] = useState<boolean>(false);
  const [workSettings, setWorkSettings] = useState<string[]>(["Center-based"]);
  const [geographicRadius, setGeographicRadius] = useState("25");
  const [schedulePreference, setSchedulePreference] = useState<"standard" | "flexible">("standard");
  const [scheduleDetails, setScheduleDetails] = useState<string[]>([]);
  const [earliestStart, setEarliestStart] = useState("immediate");

  // Location & Travel
  const [openToRelocation, setOpenToRelocation] = useState<boolean>(false);
  const [multiSiteComfort, setMultiSiteComfort] = useState("single-site");

  // Experience fields
  const [yearsExperience, setYearsExperience] = useState("");
  const [ageGroups, setAgeGroups] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>(["English"]);

  // Role-specific fields
  const [targetRoles, setTargetRoles] = useState<string[]>([]);
  const [weeklyBillable, setWeeklyBillable] = useState("");

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleZipCodeChange = (value: string) => {
    setZipCode(value);
    if (value.length === 5) {
      const atlantaZipCodes = ["30301", "30302", "30303", "30304", "30305", "30306", "30307", "30308", "30309", "30310"];
      const isNearAtlanta = atlantaZipCodes.some((code) => value.startsWith(code.substring(0, 3)));
      if (!isNearAtlanta) {
        setZipCodeError("We currently only service the Atlanta area (within 100 miles).");
      } else {
        setZipCodeError("");
      }
    } else {
      setZipCodeError("");
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

  const handleWorkSettingsChange = (setting: string, checked: boolean) => {
    if (checked) {
      setWorkSettings([...workSettings, setting]);
    } else {
      setWorkSettings(workSettings.filter((s) => s !== setting));
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
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (validTypes.includes(file.type)) {
        setResume(file);
      } else {
        alert("Please upload a PDF or DOC file");
      }
    }
  };

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your professional information and preferences.</p>
      </div>

      {/* Section 1: Personal Information (first) */}
      <Card className="shadow-md">
        <CardContent className="p-8">
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
                      Your personal information (photo, name, contact info) stays private. Employers will only see it when you apply to a job or accept a message request.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block text-center">Profile Photo</Label>
              <div className="flex justify-center">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                {photo ? (
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <img
                      src={photo}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-2 border-border hover:opacity-80 transition-opacity"
                    />
                  </label>
                ) : (
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-muted-foreground/30 hover:border-primary hover:bg-muted/50 transition-all">
                      <span className="text-muted-foreground text-xs">Click to upload</span>
                    </div>
                  </label>
                )}
              </div>
            </div>

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

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio / About You</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell employers about your experience, specializations, and what makes you a great fit..."
                className="min-h-[100px] resize-none"
                maxLength={500}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resume">Resume</Label>
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

            <div className="space-y-2">
              <Label htmlFor="linkedinUrl">LinkedIn Profile URL</Label>
              <Input
                id="linkedinUrl"
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

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
        </CardContent>
      </Card>

      {/* Section 2: Role */}
      <Card className="shadow-md">
        <CardContent className="p-8">
          <div className="space-y-6">
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
        </CardContent>
      </Card>

      {/* Section 3: Job Intent */}
      <Card className="shadow-md">
        <CardContent className="p-8">
          <div className="space-y-6">
            <Label className="text-base font-semibold mb-4 block">Job Intent</Label>

            <div className="space-y-3 mb-6">
              <Label>What type of opportunity are you looking for?</Label>
              <RadioGroup value={jobIntent} onValueChange={(value) => setJobIntent(value as "primary" | "supplemental")}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="primary" id="intent-primary" />
                  <Label htmlFor="intent-primary" className="flex-1 cursor-pointer">Primary role</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="supplemental" id="intent-supplemental" />
                  <Label htmlFor="intent-supplemental" className="flex-1 cursor-pointer">Supplemental / additional work</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
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
          </div>
        </CardContent>
      </Card>

      {/* Section 4: Experience */}
      <Card className="shadow-md">
        <CardContent className="p-8">
          <div className="space-y-6">
            <Label className="text-base font-semibold mb-4 block">Experience</Label>

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
                      id={`profile-age-${group.value}`}
                      checked={ageGroups.includes(group.value)}
                      onCheckedChange={(checked) =>
                        handleAgeGroupsChange(group.value, checked === true)
                      }
                    />
                    <Label htmlFor={`profile-age-${group.value}`} className="cursor-pointer flex-1">
                      {group.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
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
                      id={`profile-lang-${lang}`}
                      checked={languages.includes(lang)}
                      onCheckedChange={(checked) =>
                        handleLanguagesChange(lang, checked === true)
                      }
                    />
                    <Label htmlFor={`profile-lang-${lang}`} className="cursor-pointer flex-1">
                      {lang}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 6: Job Preferences */}
      <Card className="shadow-md">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold mb-4 block">Job Preferences</Label>
              <p className="text-sm text-muted-foreground mb-6">
                Tell us what you&apos;re looking for in your next role
              </p>

              {/* Compensation Section */}
              <div className="border-b pb-6 mb-6">
                <h3 className="text-sm font-semibold mb-4">Compensation</h3>

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

                {(compensationPreference === "salary" || compensationPreference === "both") && (
                  <div className="space-y-2 mb-4">
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

                {(compensationPreference === "hourly" || compensationPreference === "both") && (
                  <div className="space-y-2">
                    <Label>Preferred Weekly Hours</Label>
                    <Select value={preferredWeeklyHours} onValueChange={setPreferredWeeklyHours}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select preferred hours" />
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
              </div>

              {/* Employment Type & Schedule */}
              <div className="border-b pb-6 mb-6">
                <h3 className="text-sm font-semibold mb-4">Employment & Schedule</h3>

                <div className="space-y-2 mb-4">
                  <Label>Employment Type</Label>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {["Full-time", "Part-time", "Contract"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`profile-${type}`}
                          checked={employmentType.includes(type)}
                          onCheckedChange={(checked) =>
                            handleEmploymentTypeChange(type, checked === true)
                          }
                        />
                        <Label htmlFor={`profile-${type}`} className="cursor-pointer text-sm">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 mb-4">
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

                {schedulePreference === "flexible" && (
                  <div className="space-y-2 mb-4">
                    <Label>Schedule Availability</Label>
                    <div className="flex flex-wrap gap-3 mt-2">
                      {["Weekdays", "Weekends", "Mornings", "Afternoons", "Evenings"].map((detail) => (
                        <div key={detail} className="flex items-center space-x-2">
                          <Checkbox
                            id={`profile-schedule-${detail}`}
                            checked={scheduleDetails.includes(detail)}
                            onCheckedChange={(checked) =>
                              handleScheduleDetailsChange(detail, checked === true)
                            }
                          />
                          <Label htmlFor={`profile-schedule-${detail}`} className="cursor-pointer text-sm">
                            {detail}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Earliest Start Availability</Label>
                  <Select value={earliestStart} onValueChange={setEarliestStart}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="2-weeks">2 weeks</SelectItem>
                      <SelectItem value="30-days">30 days</SelectItem>
                      <SelectItem value="60-days">60+ days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Work Setting Section */}
              <div className="border-b pb-6 mb-6">
                <h3 className="text-sm font-semibold mb-4">Work Setting</h3>

                <div className="space-y-3 mb-4">
                  <Label>Telehealth Only?</Label>
                  <RadioGroup
                    value={telehealthOnly ? "yes" : "no"}
                    onValueChange={(value) => setTelehealthOnly(value === "yes")}
                  >
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="yes" id="profile-telehealth-yes" />
                      <Label htmlFor="profile-telehealth-yes" className="flex-1 cursor-pointer">Yes, telehealth only</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="no" id="profile-telehealth-no" />
                      <Label htmlFor="profile-telehealth-no" className="flex-1 cursor-pointer">No, open to in-person</Label>
                    </div>
                  </RadioGroup>
                </div>

                {!telehealthOnly && (
                  <div className="space-y-2">
                    <Label>Work Setting Preference</Label>
                    <div className="space-y-2 mt-2">
                      {["Center-based", "In-home", "School-based", "Community-based"].map((setting) => (
                        <div key={setting} className="flex items-center space-x-2 p-3 border rounded-lg">
                          <Checkbox
                            id={`profile-setting-${setting}`}
                            checked={workSettings.includes(setting)}
                            onCheckedChange={(checked) =>
                              handleWorkSettingsChange(setting, checked === true)
                            }
                          />
                          <Label htmlFor={`profile-setting-${setting}`} className="cursor-pointer flex-1">
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
                <h3 className="text-sm font-semibold mb-4">Location & Travel</h3>

                {!telehealthOnly && (
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

                <div className="space-y-3 mb-4">
                  <Label>Open to Relocation?</Label>
                  <RadioGroup
                    value={openToRelocation ? "yes" : "no"}
                    onValueChange={(value) => setOpenToRelocation(value === "yes")}
                  >
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="yes" id="profile-relocate-yes" />
                      <Label htmlFor="profile-relocate-yes" className="flex-1 cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="no" id="profile-relocate-no" />
                      <Label htmlFor="profile-relocate-no" className="flex-1 cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Comfort with Multi-Site Work</Label>
                  <Select value={multiSiteComfort} onValueChange={setMultiSiteComfort}>
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
              <div>
                <h3 className="text-sm font-semibold mb-4">Target Roles</h3>

                <div className="space-y-2 mb-4">
                  <Label>Roles of Interest</Label>
                  <div className="space-y-2 mt-2">
                    {(roleType === "RBT"
                      ? ["RBT", "Senior RBT", "Lead / Supervisor", "Other"]
                      : ["BCBA", "Lead BCBA", "Clinic Supervisor", "Clinical Director", "Other"]
                    ).map((role) => (
                      <div key={role} className="flex items-center space-x-2 p-3 border rounded-lg">
                        <Checkbox
                          id={`profile-role-${role}`}
                          checked={targetRoles.includes(role)}
                          onCheckedChange={(checked) =>
                            handleTargetRolesChange(role, checked === true)
                          }
                        />
                        <Label htmlFor={`profile-role-${role}`} className="cursor-pointer flex-1">
                          {role}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {roleType === "BCBA" && (
                  <div className="space-y-2">
                    <Label>Weekly Billable Preference</Label>
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
        </CardContent>
      </Card>

      {/* Section 7: License Verification */}
      <Card className="shadow-md">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold mb-4 block">License Verification</Label>
              <p className="text-sm text-muted-foreground mb-6">
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
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
