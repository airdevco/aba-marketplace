"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Search, MapPin, DollarSign, Briefcase, Filter, User, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { GenericAvatarByRole } from "@/components/GenericAvatar";
import { InviteToApplyModal } from "@/components/InviteToApplyModal";
import HeaderWithProfile from "@/components/HeaderWithProfile";
import { addInvite } from "@/lib/invite-store";

// Worker type matching professional onboarding preferences + licensed
type DirectoryWorker = {
  id: string;
  role: "RBT" | "BCBA";
  location: string;
  experience: string;
  rate: string;
  schedule: string[];
  compensationPreference: "hourly" | "salary" | "both";
  employmentType: string[];
  telehealthOnly: boolean | null;
  workSettings: string[];
  radius: number;
  schedulePreference: "standard" | "flexible";
  scheduleDetails: string[];
  licensed: boolean;
  licenseNumber?: string;
};

// Mock Directory Data (fields align with professional preferences)
const directoryWorkers: DirectoryWorker[] = [
  { id: "W101", role: "RBT", location: "Atlanta, GA", experience: "3 years", rate: "$22-26/hr", schedule: ["Weekdays", "Evenings"], compensationPreference: "hourly", employmentType: ["Full-time"], telehealthOnly: false, workSettings: ["Center-based", "In-home"], radius: 25, schedulePreference: "flexible", scheduleDetails: ["Weekdays", "Evenings"], licensed: true, licenseNumber: "RBT-101234" },
  { id: "W102", role: "BCBA", location: "Marietta, GA", experience: "5 years", rate: "$75-90/hr", schedule: ["Weekdays"], compensationPreference: "both", employmentType: ["Full-time"], telehealthOnly: true, workSettings: [], radius: 30, schedulePreference: "standard", scheduleDetails: [], licensed: true, licenseNumber: "BCBA-102345" },
  { id: "W103", role: "RBT", location: "Decatur, GA", experience: "1 year", rate: "$20-24/hr", schedule: ["Weekends", "School Hours"], compensationPreference: "hourly", employmentType: ["Part-time"], telehealthOnly: false, workSettings: ["School-based"], radius: 15, schedulePreference: "flexible", scheduleDetails: ["Weekends"], licensed: false },
  { id: "W104", role: "RBT", location: "Alpharetta, GA", experience: "4 years", rate: "$24-28/hr", schedule: ["Full-time"], compensationPreference: "hourly", employmentType: ["Full-time", "Contractor"], telehealthOnly: false, workSettings: ["Center-based", "In-home", "School-based"], radius: 20, schedulePreference: "standard", scheduleDetails: [], licensed: true, licenseNumber: "RBT-104567" },
  { id: "W105", role: "BCBA", location: "Sandy Springs, GA", experience: "7 years", rate: "$80-100/hr", schedule: ["Flexible"], compensationPreference: "salary", employmentType: ["Full-time"], telehealthOnly: true, workSettings: [], radius: 35, schedulePreference: "flexible", scheduleDetails: ["Weekdays", "Mornings", "Afternoons"], licensed: true, licenseNumber: "BCBA-105678" },
  { id: "W106", role: "RBT", location: "Smyrna, GA", experience: "2 years", rate: "$21-25/hr", schedule: ["Weekdays"], compensationPreference: "hourly", employmentType: ["Part-time"], telehealthOnly: false, workSettings: ["In-home"], radius: 15, schedulePreference: "flexible", scheduleDetails: ["Weekdays", "Afternoons"], licensed: false },
  { id: "W107", role: "RBT", location: "Atlanta, GA", experience: "< 1 year", rate: "$18-22/hr", schedule: ["Weekends"], compensationPreference: "hourly", employmentType: ["Part-time", "Contractor"], telehealthOnly: null, workSettings: ["Center-based"], radius: 10, schedulePreference: "flexible", scheduleDetails: ["Weekends"], licensed: false },
  { id: "W108", role: "BCBA", location: "Roswell, GA", experience: "3 years", rate: "$70-85/hr", schedule: ["Full-time"], compensationPreference: "both", employmentType: ["Full-time"], telehealthOnly: false, workSettings: ["Center-based", "In-home"], radius: 25, schedulePreference: "standard", scheduleDetails: [], licensed: true, licenseNumber: "BCBA-108901" },
];

// Mock Active Jobs for employer (for invite modal)
const mockActiveJobs = [
  { id: 1, title: "RBT - Full Time", location: "Atlanta, GA" },
  { id: 2, title: "BCBA - Clinic Director", location: "Marietta, GA" },
  { id: 3, title: "RBT - Part Time", location: "Decatur, GA" },
];

export default function DirectoryPage() {
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [radiusMiles, setRadiusMiles] = useState<string>("all");
  const [compensationFilter, setCompensationFilter] = useState<string[]>([]);
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState<string[]>([]);
  const [telehealthFilter, setTelehealthFilter] = useState<string>("all");
  const [workSettingFilter, setWorkSettingFilter] = useState<string[]>([]);
  const [schedulePreferenceFilter, setSchedulePreferenceFilter] = useState<string>("all");
  const [scheduleDetailsFilter, setScheduleDetailsFilter] = useState<string[]>([]);
  const [licensedFilter, setLicensedFilter] = useState<string>("all");
  const [selectedWorker, setSelectedWorker] = useState<DirectoryWorker | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const filteredWorkers = directoryWorkers.filter((worker) => {
    if (selectedRole !== "all" && worker.role.toLowerCase() !== selectedRole) return false;
    if (searchQuery && !worker.location.toLowerCase().includes(searchQuery.toLowerCase()) && !worker.role.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (locationQuery && !worker.location.toLowerCase().includes(locationQuery.toLowerCase())) return false;
    if (radiusMiles !== "all" && worker.radius > parseInt(radiusMiles, 10)) return false;
    if (compensationFilter.length > 0 && !compensationFilter.includes(worker.compensationPreference)) return false;
    if (employmentTypeFilter.length > 0 && !employmentTypeFilter.some((t) => worker.employmentType.includes(t))) return false;
    if (telehealthFilter === "yes" && !worker.telehealthOnly) return false;
    if (telehealthFilter === "no" && worker.telehealthOnly !== false) return false;
    if (workSettingFilter.length > 0 && !workSettingFilter.some((s) => worker.workSettings.includes(s))) return false;
    if (schedulePreferenceFilter !== "all" && worker.schedulePreference !== schedulePreferenceFilter) return false;
    if (scheduleDetailsFilter.length > 0 && !scheduleDetailsFilter.some((d) => worker.scheduleDetails.includes(d))) return false;
    if (licensedFilter === "yes" && !worker.licensed) return false;
    if (licensedFilter === "no" && worker.licensed) return false;
    return true;
  });

  const handleSendInvite = (jobId: string | number, message: string) => {
    if (!selectedWorker) return;
    const job = mockActiveJobs.find((j) => j.id === jobId || String(j.id) === String(jobId));
    const jobTitle = job?.title ?? "Job";
    const candidateLabel = selectedWorker.role === "RBT" ? "RBT Candidate" : "BCBA Candidate";
    addInvite("E1", selectedWorker.id, jobId, jobTitle, message, candidateLabel);
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <HeaderWithProfile />

      <div className="max-w-7xl mx-auto py-8 px-4 space-y-8">
        {/* Navigation */}
        <div className="space-y-4">
          <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary" asChild>
            <Link href="/employer-portal?tab=jobs">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Worker Directory</h1>
            <p className="text-muted-foreground mt-1">Browse and search for qualified ABA professionals.</p>
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
                    <Input placeholder="City or ZIP" className="pl-9" value={locationQuery} onChange={(e) => setLocationQuery(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Max radius (miles)</Label>
                    <Select value={radiusMiles} onValueChange={setRadiusMiles}>
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

                {/* Compensation Preference - multi checkbox, none = Any */}
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

                {/* Telehealth Only - toggle */}
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

                {/* Schedule Preference - radio */}
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

                {/* Schedule Availability - only when Any or Non-Standard selected */}
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
                placeholder="Search by location, role, or keywords..." 
                className="pl-10 h-10 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
              {filteredWorkers.map((worker) => (
                <Card key={worker.id} className="overflow-hidden hover:border-primary/50 transition-colors flex flex-col h-full">
                  <CardHeader className="pb-2 pt-4 px-4 bg-muted/20">
                    <div className="flex items-start gap-3">
                      <GenericAvatarByRole roleType={worker.role as "RBT" | "BCBA"} size="sm" className="shrink-0" />
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                          {worker.role === "RBT" ? "RBT Candidate" : "BCBA Candidate"}
                          <span className="text-sm font-normal text-muted-foreground">#{worker.id}</span>
                        </CardTitle>
                        <p className="text-sm font-medium text-foreground mt-1">
                          {worker.employmentType.join(", ")} · {worker.rate}
                        </p>
                        <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="h-3.5 w-3.5 shrink-0" /> {worker.location}
                        </div>
                        {worker.licensed ? (
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <Award className="h-3.5 w-3.5 text-green-600 shrink-0" />
                            <span className="text-sm font-medium text-green-700">
                              Licensed{worker.licenseNumber ? ` · ${worker.licenseNumber}` : ""}
                            </span>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground mt-1.5">Not licensed</p>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-3 pb-3 px-4 flex-1 min-h-0">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                      <div>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium block">Experience</span>
                        <span className="font-medium flex items-center gap-1.5 mt-0.5"><Briefcase className="h-3.5 w-3.5 text-muted-foreground shrink-0" />{worker.experience}</span>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium block">Compensation</span>
                        <span className="font-medium mt-0.5 capitalize">{worker.compensationPreference === "both" ? "Hourly or salary" : worker.compensationPreference}</span>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium block">Telehealth</span>
                        <span className="font-medium mt-0.5">{worker.telehealthOnly === null ? "—" : worker.telehealthOnly ? "Yes" : "No"}</span>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium block">Radius</span>
                        <span className="font-medium mt-0.5">{worker.radius} mi</span>
                      </div>
                      {worker.workSettings.length > 0 && (
                        <div className="col-span-2">
                          <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium block">Work Setting</span>
                          <div className="flex flex-wrap gap-1.5 mt-0.5">{worker.workSettings.map((s, i) => <Badge key={i} variant="outline" className="text-xs font-normal py-0.5 px-2 h-5 bg-gray-50">{s}</Badge>)}</div>
                        </div>
                      )}
                      <div>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium block">Schedule</span>
                        <span className="font-medium mt-0.5">{worker.schedulePreference === "standard" ? "Standard FT" : "Flexible"}</span>
                      </div>
                      {worker.scheduleDetails.length > 0 ? (
                        <div>
                          <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium block">Availability</span>
                          <div className="flex flex-wrap gap-1.5 mt-0.5">{worker.scheduleDetails.map((d, i) => <Badge key={i} variant="outline" className="text-xs font-normal py-0.5 px-2 h-5 bg-gray-50">{d}</Badge>)}</div>
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/10 pt-3 pb-4 px-4 flex gap-2 shrink-0">
                    <Button 
                      variant="outline" 
                      className="flex-1 gap-2"
                      asChild
                    >
                      <Link href={`/profile/${worker.id}`} target="_blank">
                        <User className="h-4 w-4" />
                        View Profile
                      </Link>
                    </Button>
                    <Button 
                      className="flex-1 gap-2" 
                      onClick={() => {
                        setSelectedWorker(worker);
                        setIsInviteModalOpen(true);
                      }}
                    >
                      Invite to Apply
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredWorkers.length === 0 && (
               <div className="text-center py-12 bg-white rounded-lg border border-dashed">
                 <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                   <Search className="h-6 w-6 text-muted-foreground" />
                 </div>
                 <h3 className="font-semibold text-lg">No candidates found</h3>
                 <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
                 <Button variant="link" onClick={() => {
                   setSelectedRole("all");
                   setSearchQuery("");
                   setLocationQuery("");
                   setRadiusMiles("all");
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

      {/* Invite to Apply Modal */}
      {selectedWorker && (
        <InviteToApplyModal
          isOpen={isInviteModalOpen}
          onClose={() => {
            setIsInviteModalOpen(false);
            setSelectedWorker(null);
          }}
          candidateLabel={selectedWorker.role === "RBT" ? "RBT Candidate" : "BCBA Candidate"}
          candidateId={selectedWorker.id}
          jobs={mockActiveJobs}
          onSend={handleSendInvite}
        />
      )}
    </div>
  );
}