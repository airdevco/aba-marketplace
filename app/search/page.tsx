"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, Briefcase, Filter, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { JobCard, JobCardData } from "@/components/JobCard";

// Company logos
const COMPANY_LOGOS = {
  default: "https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769804890523x838539645913488600/favicon.png",
  airdev: "https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769558510329x965473798247719000/1024favicon.png",
  parsley: "https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769804920987x244544127826915600/parsley-favicon.png",
  icon2: "https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769804989697x108119687752882050/icon2.png",
} as const;

// Mock Job Postings Data
const jobPostings: JobCardData[] = [
  {
    id: 1,
    title: "Registered Behavior Technician (RBT)",
    company: "Bright Future ABA",
    companyLogo: COMPANY_LOGOS.airdev,
    location: "Atlanta, GA",
    zipCode: "30308",
    role: "RBT",
    rate: "$24-28/hr",
    compensationType: "hourly",
    employmentType: "Full-time",
    schedule: ["Weekdays"],
    schedulePreference: "standard",
    telehealthOnly: false,
    workSettings: ["Center-based", "In-home"],
    licensed: true,
    benefits: ["Medical / Dental / Vision", "Paid Time Off (PTO)", "CEU Stipend"],
    postedDays: 2,
    matchScore: 98
  },
  {
    id: 2,
    title: "RBT - School Based",
    company: "Peach State Therapy",
    companyLogo: COMPANY_LOGOS.parsley,
    location: "Decatur, GA",
    zipCode: "30030",
    role: "RBT",
    rate: "$25-30/hr",
    compensationType: "hourly",
    employmentType: "Part-time",
    schedule: ["School Hours"],
    schedulePreference: "flexible",
    telehealthOnly: false,
    workSettings: ["School-based"],
    licensed: true,
    benefits: ["Mileage Reimbursement"],
    postedDays: 1,
    matchScore: 92
  },
  {
    id: 3,
    title: "Lead RBT",
    company: "Autism Care Partners",
    companyLogo: COMPANY_LOGOS.icon2,
    location: "Marietta, GA",
    zipCode: "30060",
    role: "RBT",
    rate: "$26-32/hr",
    compensationType: "hourly",
    employmentType: "Full-time",
    schedule: ["Weekdays", "Evenings"],
    schedulePreference: "flexible",
    telehealthOnly: false,
    workSettings: ["Center-based", "In-home"],
    licensed: false,
    postedDays: 3,
    matchScore: 85
  },
  {
    id: 4,
    title: "BCBA - Clinical Supervisor",
    company: "Metro Behavioral Health",
    companyLogo: COMPANY_LOGOS.default,
    location: "Atlanta, GA",
    zipCode: "30303",
    role: "BCBA",
    rate: "$75,000-90,000/yr",
    compensationType: "salary",
    employmentType: "Full-time",
    schedule: ["Weekdays"],
    schedulePreference: "standard",
    telehealthOnly: false,
    workSettings: ["Center-based"],
    licensed: true,
    benefits: ["Medical / Dental / Vision", "401(k) with Matching", "Paid Time Off (PTO)"],
    postedDays: 7,
    matchScore: 85
  },
  {
    id: 5,
    title: "RBT - Weekend Coverage",
    company: "Spectrum ABA Services",
    companyLogo: COMPANY_LOGOS.airdev,
    location: "Alpharetta, GA",
    zipCode: "30009",
    role: "RBT",
    rate: "$28-34/hr",
    compensationType: "hourly",
    employmentType: "Part-time",
    schedule: ["Weekends"],
    schedulePreference: "flexible",
    telehealthOnly: false,
    workSettings: ["In-home"],
    licensed: true,
    benefits: ["Paid Indirect Time", "CEU Stipend"],
    postedDays: 5,
    matchScore: 90
  },
  {
    id: 6,
    title: "BCBA - Program Director",
    company: "Kids First ABA",
    companyLogo: COMPANY_LOGOS.parsley,
    location: "Roswell, GA",
    zipCode: "30076",
    role: "BCBA",
    rate: "$80-95/hr",
    compensationType: "both",
    employmentType: "Full-time",
    schedule: ["Flexible"],
    schedulePreference: "flexible",
    telehealthOnly: false,
    workSettings: ["Center-based", "In-home"],
    licensed: true,
    benefits: ["Medical / Dental / Vision", "401(k) with Matching", "Work From Home Flexibility"],
    postedDays: 14,
    matchScore: 82
  }
];

export default function SearchPage() {
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [radiusFilter, setRadiusFilter] = useState("all");
  const [compensationFilter, setCompensationFilter] = useState<string[]>([]);
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState<string[]>([]);
  const [telehealthFilter, setTelehealthFilter] = useState<string>("all");
  const [workSettingFilter, setWorkSettingFilter] = useState<string[]>([]);
  const [schedulePreferenceFilter, setSchedulePreferenceFilter] = useState<string>("all");
  const [scheduleDetailsFilter, setScheduleDetailsFilter] = useState<string[]>([]);
  const [licensedFilter, setLicensedFilter] = useState<string>("all");

  const filteredJobs = jobPostings.filter(job => {
    if (selectedRole !== "all" && job.role.toLowerCase() !== selectedRole.toLowerCase()) return false;
    if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !job.company.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !job.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (locationFilter && !job.location.toLowerCase().includes(locationFilter.toLowerCase()) && 
        !job.zipCode.includes(locationFilter)) return false;
    if (compensationFilter.length > 0 && !compensationFilter.includes(job.compensationType)) return false;
    if (employmentTypeFilter.length > 0 && !employmentTypeFilter.includes(job.employmentType)) return false;
    if (telehealthFilter === "yes" && !job.telehealthOnly) return false;
    if (telehealthFilter === "no" && job.telehealthOnly !== false) return false;
    if (workSettingFilter.length > 0 && !workSettingFilter.some((s) => job.workSettings.includes(s))) return false;
    if (schedulePreferenceFilter !== "all" && job.schedulePreference !== schedulePreferenceFilter) return false;
    if (scheduleDetailsFilter.length > 0 && !scheduleDetailsFilter.some((d) => job.schedule.includes(d))) return false;
    if (licensedFilter === "yes" && !job.licensed) return false;
    if (licensedFilter === "no" && job.licensed) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50/30">
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/professional-portal?tab=dashboard" className="flex items-center gap-2">
            <img
              src="https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769551902030x600833303719120300/aba.png"
              alt="ABA Marketplace"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <div className="flex items-center gap-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769817783115x473563165576327740/mary.jpeg" alt="Sarah Williams" />
              <AvatarFallback className="text-xs">SW</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-8 px-4 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Search Jobs</h1>
            <p className="text-muted-foreground mt-1">Browse and search for job postings that match your preferences.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Filter className="w-4 h-4" /> Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                {/* Role Type */}
                <div className="space-y-3">
                  <Label>Role Type</Label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Roles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="rbt">RBT</SelectItem>
                      <SelectItem value="bcba">BCBA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location & Geographic Radius */}
                <div className="space-y-3">
                  <Label>Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="City or ZIP" className="pl-9" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Max radius (miles)</Label>
                    <Select value={radiusFilter} onValueChange={setRadiusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any</SelectItem>
                        <SelectItem value="10">10 miles</SelectItem>
                        <SelectItem value="15">15 miles</SelectItem>
                        <SelectItem value="20">20 miles</SelectItem>
                        <SelectItem value="25">25 miles</SelectItem>
                        <SelectItem value="30">30 miles</SelectItem>
                        <SelectItem value="35">35 miles</SelectItem>
                        <SelectItem value="50">50 miles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Compensation Preference */}
                <div className="space-y-3">
                  <Label>Compensation Preference</Label>
                  <div className="space-y-2">
                    {[
                      { value: "hourly", label: "Hourly only" },
                      { value: "salary", label: "Salary only" },
                      { value: "both", label: "Open to hourly or salary" },
                    ].map((opt) => (
                      <div key={opt.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`comp-${opt.value}`}
                          checked={compensationFilter.includes(opt.value)}
                          onCheckedChange={(c) => setCompensationFilter((prev) => (c ? [...prev, opt.value] : prev.filter((v) => v !== opt.value)))}
                        />
                        <Label htmlFor={`comp-${opt.value}`} className="font-normal text-sm">{opt.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Employment Type */}
                <div className="space-y-3">
                  <Label>Employment Type</Label>
                  <div className="space-y-2">
                    {["Full-time", "Part-time", "Contractor"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`emp-${type}`}
                          checked={employmentTypeFilter.includes(type)}
                          onCheckedChange={(c) => setEmploymentTypeFilter((prev) => (c ? [...prev, type] : prev.filter((t) => t !== type)))}
                        />
                        <Label htmlFor={`emp-${type}`} className="font-normal text-sm">{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Telehealth Only */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="telehealth-toggle" className="flex-1">Telehealth Only</Label>
                    <Switch
                      id="telehealth-toggle"
                      checked={telehealthFilter === "yes"}
                      onCheckedChange={(checked) => setTelehealthFilter(checked ? "yes" : "no")}
                    />
                  </div>
                </div>

                {/* Work Setting - only when Telehealth = No */}
                {telehealthFilter === "no" && (
                  <div className="space-y-3">
                    <Label>Work Setting</Label>
                    <div className="space-y-2">
                      {["Center-based", "In-home", "School-based"].map((setting) => (
                        <div key={setting} className="flex items-center space-x-2">
                          <Checkbox
                            id={`ws-${setting}`}
                            checked={workSettingFilter.includes(setting)}
                            onCheckedChange={(c) => setWorkSettingFilter((prev) => (c ? [...prev, setting] : prev.filter((s) => s !== setting)))}
                          />
                          <Label htmlFor={`ws-${setting}`} className="font-normal text-sm">{setting}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Schedule Preference */}
                <div className="space-y-3">
                  <Label>Schedule Preference</Label>
                  <RadioGroup value={schedulePreferenceFilter} onValueChange={setSchedulePreferenceFilter} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="sched-pref-all" />
                      <Label htmlFor="sched-pref-all" className="font-normal text-sm cursor-pointer">Any</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="sched-pref-standard" />
                      <Label htmlFor="sched-pref-standard" className="font-normal text-sm cursor-pointer">Standard Full-Time</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="flexible" id="sched-pref-flexible" />
                      <Label htmlFor="sched-pref-flexible" className="font-normal text-sm cursor-pointer">Non-Standard / Flexible</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Schedule Availability */}
                {(schedulePreferenceFilter === "all" || schedulePreferenceFilter === "flexible") && (
                  <div className="space-y-3">
                    <Label className="text-xs text-muted-foreground">Schedule Availability</Label>
                    <div className="space-y-2">
                      {["Weekdays", "Weekends", "Mornings", "Afternoons", "Evenings"].map((detail) => (
                        <div key={detail} className="flex items-center space-x-2">
                          <Checkbox
                            id={`sched-${detail}`}
                            checked={scheduleDetailsFilter.includes(detail)}
                            onCheckedChange={(c) => setScheduleDetailsFilter((prev) => (c ? [...prev, detail] : prev.filter((d) => d !== detail)))}
                          />
                          <Label htmlFor={`sched-${detail}`} className="font-normal text-sm">{detail}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Licensed */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    Licensed
                  </Label>
                  <Select value={licensedFilter} onValueChange={setLicensedFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any</SelectItem>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by job title, company, or location..." 
                className="pl-10 h-10 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
              {filteredJobs.map((job) => (
                <JobCard 
                  key={job.id}
                  job={job}
                  href={`/listing/${job.id}?view=professional&from=search`}
                  linkTarget="_blank"
                  showExternalIcon={true}
                />
              ))}
            </div>

            {filteredJobs.length === 0 && (
               <div className="text-center py-12 bg-white rounded-lg border border-dashed">
                 <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                   <Search className="h-6 w-6 text-muted-foreground" />
                 </div>
                 <h3 className="font-semibold text-lg">No jobs found</h3>
                 <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
                 <Button variant="link" onClick={() => {
                   setSelectedRole("all");
                   setSearchQuery("");
                   setLocationFilter("");
                   setRadiusFilter("all");
                   setCompensationFilter([]);
                   setEmploymentTypeFilter([]);
                   setTelehealthFilter("all");
                   setWorkSettingFilter([]);
                   setSchedulePreferenceFilter("all");
                   setScheduleDetailsFilter([]);
                   setLicensedFilter("all");
                 }} className="mt-2">
                   Clear all filters
                 </Button>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
