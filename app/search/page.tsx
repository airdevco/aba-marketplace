"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, DollarSign, Briefcase, Filter, Clock, Building, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock Job Postings Data
const jobPostings = [
  {
    id: 1,
    title: "Registered Behavior Technician (RBT)",
    company: "Bright Future ABA",
    companyLogo: "https://images.unsplash.com/photo-1516876437184-593fda40c6ed?w=100&h=100&fit=crop",
    location: "Atlanta, GA",
    zipCode: "30308",
    role: "RBT",
    rate: "$24-28/hr",
    employmentType: "W2 – Full Time",
    schedule: ["Weekdays"],
    telehealthOnly: false,
    benefits: ["Medical / Dental / Vision", "Paid Time Off (PTO)", "CEU Stipend"],
    posted: "2 days ago",
    matchScore: 98
  },
  {
    id: 2,
    title: "RBT - School Based",
    company: "Peach State Therapy",
    companyLogo: "https://images.unsplash.com/photo-1554774853-719586f8c277?w=100&h=100&fit=crop",
    location: "Decatur, GA",
    zipCode: "30030",
    role: "RBT",
    rate: "$25-30/hr",
    employmentType: "W2 – Part Time",
    schedule: ["School Hours"],
    telehealthOnly: false,
    benefits: ["Mileage Reimbursement"],
    posted: "1 day ago",
    matchScore: 92
  },
  {
    id: 3,
    title: "Lead RBT",
    company: "Autism Care Partners",
    companyLogo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop",
    location: "Marietta, GA",
    zipCode: "30060",
    role: "RBT",
    rate: "$26-32/hr",
    employmentType: "Full-time",
    schedule: ["Weekdays", "Evenings"],
    posted: "3 days ago",
    matchScore: 85
  },
  {
    id: 4,
    title: "BCBA - Clinical Supervisor",
    company: "Metro Behavioral Health",
    companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
    location: "Atlanta, GA",
    zipCode: "30303",
    role: "BCBA",
    rate: "$75,000-90,000/yr",
    employmentType: "W2 – Full Time",
    schedule: ["Weekdays"],
    telehealthOnly: false,
    benefits: ["Medical / Dental / Vision", "401(k) with Matching", "Paid Time Off (PTO)"],
    posted: "1 week ago",
    matchScore: 85
  },
  {
    id: 5,
    title: "RBT - Weekend Coverage",
    company: "Spectrum ABA Services",
    companyLogo: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=100&h=100&fit=crop",
    location: "Alpharetta, GA",
    zipCode: "30009",
    role: "RBT",
    rate: "$28-34/hr",
    employmentType: "W2 – Part Time",
    schedule: ["Weekends"],
    telehealthOnly: false,
    benefits: ["Paid Indirect Time", "CEU Stipend"],
    posted: "5 days ago",
    matchScore: 90
  },
  {
    id: 6,
    title: "BCBA - Program Director",
    company: "Kids First ABA",
    companyLogo: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=100&h=100&fit=crop",
    location: "Roswell, GA",
    zipCode: "30076",
    role: "BCBA",
    rate: "$80-95/hr",
    employmentType: "W2 – Full Time",
    schedule: ["Flexible"],
    telehealthOnly: false,
    benefits: ["Medical / Dental / Vision", "401(k) with Matching", "Work From Home Flexibility"],
    posted: "2 weeks ago",
    matchScore: 82
  }
];

export default function SearchPage() {
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [radiusFilter, setRadiusFilter] = useState("25");
  const [minRate, setMinRate] = useState("");
  const [maxRate, setMaxRate] = useState("");
  const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);
  const [scheduleTypes, setScheduleTypes] = useState<string[]>([]);

  const handleEmploymentTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setEmploymentTypes([...employmentTypes, type]);
    } else {
      setEmploymentTypes(employmentTypes.filter((t) => t !== type));
    }
  };

  const handleScheduleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setScheduleTypes([...scheduleTypes, type]);
    } else {
      setScheduleTypes(scheduleTypes.filter((t) => t !== type));
    }
  };

  const filteredJobs = jobPostings.filter(job => {
    if (selectedRole !== "all" && job.role.toLowerCase() !== selectedRole.toLowerCase()) return false;
    if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !job.company.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !job.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (locationFilter && !job.location.toLowerCase().includes(locationFilter.toLowerCase()) && 
        !job.zipCode.includes(locationFilter)) return false;
    if (minRate && parseInt(job.rate.split("-")[0].replace("$", "").replace("/hr", "")) < parseInt(minRate)) return false;
    if (maxRate && parseInt(job.rate.split("-")[1]?.replace("/hr", "").trim() || job.rate.split("-")[0].replace("$", "").replace("/hr", "")) > parseInt(maxRate)) return false;
    if (employmentTypes.length > 0 && !employmentTypes.includes(job.employmentType)) return false;
    if (scheduleTypes.length > 0 && !scheduleTypes.some(st => job.schedule.includes(st))) return false;
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
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
              SW
            </div>
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
                {/* Role Filter */}
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

                <Separator />

                {/* Location Filter */}
                <div className="space-y-3">
                  <Label>Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="City or ZIP" 
                      className="pl-9" 
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                    />
                  </div>
                  <Select value={radiusFilter} onValueChange={setRadiusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Within 25 miles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Within 5 miles</SelectItem>
                      <SelectItem value="10">Within 10 miles</SelectItem>
                      <SelectItem value="15">Within 15 miles</SelectItem>
                      <SelectItem value="25">Within 25 miles</SelectItem>
                      <SelectItem value="50">Within 50 miles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Pay Range */}
                <div className="space-y-3">
                  <Label>Hourly Rate Range</Label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-2.5 top-2.5 text-muted-foreground">$</span>
                      <Input 
                        placeholder="Min" 
                        className="pl-6" 
                        type="number" 
                        value={minRate}
                        onChange={(e) => setMinRate(e.target.value)}
                      />
                    </div>
                    <span className="text-muted-foreground">-</span>
                    <div className="relative flex-1">
                      <span className="absolute left-2.5 top-2.5 text-muted-foreground">$</span>
                      <Input 
                        placeholder="Max" 
                        className="pl-6" 
                        type="number"
                        value={maxRate}
                        onChange={(e) => setMaxRate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Employment Type */}
                <div className="space-y-3">
                  <Label>Employment Type</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="filter-full-time" 
                        checked={employmentTypes.includes("W2 – Full Time")}
                        onCheckedChange={(checked) => handleEmploymentTypeChange("W2 – Full Time", checked === true)}
                      />
                      <Label htmlFor="filter-full-time" className="font-normal">Full-time</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="filter-part-time"
                        checked={employmentTypes.includes("W2 – Part Time")}
                        onCheckedChange={(checked) => handleEmploymentTypeChange("W2 – Part Time", checked === true)}
                      />
                      <Label htmlFor="filter-part-time" className="font-normal">Part-time</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="filter-contract"
                        checked={employmentTypes.includes("1099 Contractor")}
                        onCheckedChange={(checked) => handleEmploymentTypeChange("1099 Contractor", checked === true)}
                      />
                      <Label htmlFor="filter-contract" className="font-normal">Contract</Label>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Schedule Availability */}
                <div className="space-y-3">
                  <Label>Schedule</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="filter-weekdays"
                        checked={scheduleTypes.includes("Weekdays")}
                        onCheckedChange={(checked) => handleScheduleTypeChange("Weekdays", checked === true)}
                      />
                      <Label htmlFor="filter-weekdays" className="font-normal">Weekdays</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="filter-weekends"
                        checked={scheduleTypes.includes("Weekends")}
                        onCheckedChange={(checked) => handleScheduleTypeChange("Weekends", checked === true)}
                      />
                      <Label htmlFor="filter-weekends" className="font-normal">Weekends</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="filter-evenings"
                        checked={scheduleTypes.includes("Evenings")}
                        onCheckedChange={(checked) => handleScheduleTypeChange("Evenings", checked === true)}
                      />
                      <Label htmlFor="filter-evenings" className="font-normal">Evenings</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="filter-school-hours"
                        checked={scheduleTypes.includes("School Hours")}
                        onCheckedChange={(checked) => handleScheduleTypeChange("School Hours", checked === true)}
                      />
                      <Label htmlFor="filter-school-hours" className="font-normal">School Hours</Label>
                    </div>
                  </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="overflow-hidden hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-3 bg-muted/20">
                    <div className="flex justify-between items-start gap-2 flex-wrap">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Avatar className="h-10 w-10 border bg-white shrink-0">
                          <AvatarImage src={job.companyLogo} />
                          <AvatarFallback>
                            <Building className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base font-semibold truncate">{job.title}</CardTitle>
                          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Building className="h-3 w-3 shrink-0" /> 
                            <span className="truncate">{job.company}</span>
                          </div>
                        </div>
                      </div>
                      {job.matchScore && (
                        <Badge variant="secondary" className="font-normal text-xs bg-green-50 text-green-700 border-green-200 hover:bg-green-50 shrink-0 whitespace-nowrap">
                          {job.matchScore}% Match
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 pb-2 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Location</span>
                        <div className="font-medium flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                          {job.location}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Pay Rate</span>
                        <div className="font-medium flex items-center gap-1.5">
                          <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                          {job.rate}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Type</span>
                        <div className="font-medium flex items-center gap-1.5">
                          <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                          {job.employmentType}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Posted</span>
                        <div className="font-medium flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          {job.posted}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Schedule</span>
                      <div className="flex flex-wrap gap-1.5">
                        {job.schedule.map((sch, i) => (
                          <Badge key={i} variant="outline" className="text-xs font-normal bg-gray-50">
                            {sch}
                          </Badge>
                        ))}
                        {job.telehealthOnly && (
                          <Badge variant="secondary" className="text-xs font-normal bg-blue-50 text-blue-700 border-blue-200">
                            Telehealth
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Benefits Preview */}
                    {job.benefits && job.benefits.length > 0 && (
                      <div className="space-y-1.5 pt-2 border-t">
                        <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Benefits</span>
                        <div className="flex flex-wrap gap-1.5">
                          {job.benefits.slice(0, 2).map((benefit, i) => (
                            <Badge key={i} variant="outline" className="text-xs font-normal bg-green-50 text-green-700 border-green-200">
                              {benefit}
                            </Badge>
                          ))}
                          {job.benefits.length > 2 && (
                            <span className="text-xs text-muted-foreground">+{job.benefits.length - 2} more</span>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="bg-muted/10 pt-4">
                    <Button className="w-full gap-2" asChild>
                      <Link href={`/listing/${job.id}?view=professional`}>
                        <ExternalLink className="h-4 w-4" />
                        View & Apply
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
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
                   setMinRate("");
                   setMaxRate("");
                   setEmploymentTypes([]);
                   setScheduleTypes([]);
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
