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
import { Separator } from "@/components/ui/separator";
import { Info, Lock, Check } from "lucide-react";

export default function ProfileView() {
  const [roleType, setRoleType] = useState<"RBT" | "BCBA">("RBT");
  const [photo, setPhoto] = useState<string | null>("https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop");
  const [firstName, setFirstName] = useState("Sarah");
  const [lastName, setLastName] = useState("Williams");
  const [email, setEmail] = useState("sarah.williams@example.com");
  const [phone, setPhone] = useState("(555) 123-4567");
  const [zipCode, setZipCode] = useState("30308");
  const [zipCodeError, setZipCodeError] = useState("");
  const [bio, setBio] = useState("Experienced RBT with a passion for helping children develop essential life skills.");
  const [resume, setResume] = useState<File | null>(null);
  const [hasLicense, setHasLicense] = useState(true);
  const [licenseNumber, setLicenseNumber] = useState("RBT-12345678");
  const [compensationPreference, setCompensationPreference] = useState<"hourly" | "salary" | "both">("hourly");
  const [minHourlyRate, setMinHourlyRate] = useState("24");
  const [minAnnualSalary, setMinAnnualSalary] = useState("");
  const [employmentType, setEmploymentType] = useState<string[]>(["W2 – Full Time", "Weekends"]);
  const [workSetting, setWorkSetting] = useState("in-person");
  const [geographicRadius, setGeographicRadius] = useState("25");
  const [schedulePreference, setSchedulePreference] = useState<"standard" | "flexible">("standard");
  const [scheduleDetails, setScheduleDetails] = useState<string[]>([]);

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
      // Simple validation - can be enhanced
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
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">My Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your professional information and preferences.</p>
        </div>
        <Button>Save Changes</Button>
      </div>

      <div className="space-y-8">
        {/* Role & Profile Card */}
        <Card>
          <CardContent className="p-8 space-y-6">
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
          </CardContent>
        </Card>

        {/* Personal Information Card */}
        <Card>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
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
                
              {/* Photo Upload */}
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

              {/* Email */}
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

              {/* Phone */}
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

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">
                  Bio / About You <span className="text-muted-foreground text-xs">(Optional)</span>
                </Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell employers about your experience, specializations, and what makes you a great fit..."
                  className="min-h-[100px] resize-none"
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground text-right">{bio.length}/500</p>
              </div>

              {/* Resume Upload */}
              <div className="space-y-2">
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
          </CardContent>
        </Card>

        {/* License Verification Card */}
        <Card>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-6">
              <div>
                <Label className="text-base font-semibold mb-4 block">License Verification</Label>
                
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
                    <Label htmlFor="licenseNumber">License Number (Optional)</Label>
                    <Input
                      id="licenseNumber"
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value)}
                      placeholder="Enter your license number"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter your license number to receive a &quot;Verified Professional&quot; badge after manual verification by admin
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Preferences Card */}
        <Card>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-6">
              <div>
                <Label className="text-base font-semibold mb-4 block">Job Preferences</Label>
                
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

                <div className="space-y-2 mb-6">
                  <Label>Employment Type</Label>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {["W2 – Full Time", "W2 – Part Time", "1099 Contractor", "Weekends"].map((type) => (
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

                <div className="space-y-2 mb-6">
                  <Label htmlFor="workSetting">Work Setting</Label>
                  <Select value={workSetting} onValueChange={setWorkSetting}>
                    <SelectTrigger id="workSetting">
                      <SelectValue placeholder="Select work setting" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-person">In-Person</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="telehealth">Telehealth</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

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
                <Separator className="my-6" />
                <div className="space-y-3 mb-6">
                  <Label>Schedule Preference</Label>
                  <RadioGroup value={schedulePreference} onValueChange={(value) => setSchedulePreference(value as "standard" | "flexible")}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="standard" id="sched-standard" />
                      <Label htmlFor="sched-standard" className="flex-1 cursor-pointer">Standard Full-Time (Weekday daytime hours)</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="flexible" id="sched-flexible" />
                      <Label htmlFor="sched-flexible" className="flex-1 cursor-pointer">Flexible Schedule</Label>
                    </div>
                  </RadioGroup>
                </div>

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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}