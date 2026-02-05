import Link from "next/link";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MapPin, Briefcase, Banknote, Calendar, BadgeCheck, Building2, Filter } from "lucide-react";
import { useProfessionalMessageDrawer } from "@/components/ProfessionalMessageDrawerContext";
import { JobCard, JobCardData } from "@/components/JobCard";

// Placeholder company logos for messaging attribution
const COMPANY_LOGOS = {
  default: "https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769804890523x838539645913488600/favicon.png",
  airdev: "https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769558510329x965473798247719000/1024favicon.png",
  parsley: "https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769804920987x244544127826915600/parsley-favicon.png",
  icon2: "https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769804989697x108119687752882050/icon2.png",
} as const;

// Mock data for suggested matches - formatted for JobCard component
const allJobMatches: JobCardData[] = [
  {
    id: 1,
    title: "Registered Behavior Technician (RBT)",
    company: "Bright Future ABA",
    companyLogo: COMPANY_LOGOS.airdev,
    location: "Atlanta, GA (5 miles)",
    employmentType: "Full-time",
    rate: "$24 - $28/hr",
    compensationType: "hourly",
    schedulePreference: "standard",
    schedule: ["Weekdays"],
    telehealthOnly: false,
    workSettings: ["Center-based", "In-home"],
    licensed: true,
    benefits: ["Medical / Dental / Vision", "Paid Time Off (PTO)", "CEU Stipend"],
    postedDays: 2,
    matchScore: 98,
  },
  {
    id: 2,
    title: "BCBA - Clinic Director",
    company: "Peach State Therapy",
    companyLogo: COMPANY_LOGOS.parsley,
    location: "Marietta, GA (10 miles)",
    employmentType: "Full-time",
    rate: "$75,000 - $90,000/yr",
    compensationType: "salary",
    schedulePreference: "standard",
    schedule: ["Weekdays"],
    telehealthOnly: false,
    workSettings: ["Center-based"],
    licensed: true,
    benefits: ["Medical / Dental / Vision", "401(k) with Matching", "Paid Time Off (PTO)"],
    postedDays: 1,
    matchScore: 95,
  },
  {
    id: 3,
    title: "RBT - School Based",
    company: "Autism Care Partners",
    companyLogo: COMPANY_LOGOS.icon2,
    location: "Decatur, GA (8 miles)",
    employmentType: "Part-time",
    rate: "$25 - $30/hr",
    compensationType: "hourly",
    schedulePreference: "flexible",
    schedule: ["School Hours"],
    telehealthOnly: false,
    workSettings: ["School-based"],
    licensed: true,
    benefits: ["Mileage Reimbursement"],
    postedDays: 3,
    matchScore: 88,
  },
  {
    id: 4,
    title: "Lead RBT",
    company: "Metro Behavioral Health",
    companyLogo: COMPANY_LOGOS.default,
    location: "Sandy Springs, GA (6 miles)",
    employmentType: "Full-time",
    rate: "$26 - $32/hr",
    compensationType: "hourly",
    schedulePreference: "standard",
    schedule: ["Weekdays"],
    telehealthOnly: false,
    workSettings: ["Center-based", "In-home"],
    licensed: true,
    benefits: ["Medical / Dental / Vision", "Paid Time Off (PTO)"],
    postedDays: 5,
    matchScore: 92,
  },
  {
    id: 5,
    title: "RBT - Weekend Shift",
    company: "Helping Hands ABA",
    companyLogo: COMPANY_LOGOS.airdev,
    location: "Alpharetta, GA (15 miles)",
    employmentType: "Part-time",
    rate: "$28 - $35/hr",
    compensationType: "hourly",
    schedulePreference: "flexible",
    schedule: ["Weekends"],
    telehealthOnly: false,
    workSettings: ["In-home"],
    licensed: true,
    benefits: ["Paid Indirect Time", "CEU Stipend"],
    postedDays: 7,
    matchScore: 90,
  },
  {
    id: 6,
    title: "Senior BCBA",
    company: "Spectrum Support",
    companyLogo: COMPANY_LOGOS.parsley,
    location: "Dunwoody, GA (12 miles)",
    employmentType: "Full-time",
    rate: "$80 - $100/hr",
    compensationType: "both",
    schedulePreference: "flexible",
    schedule: ["Flexible"],
    telehealthOnly: false,
    workSettings: ["Center-based", "In-home"],
    licensed: true,
    benefits: ["Medical / Dental / Vision", "401(k) with Matching", "Work From Home Flexibility"],
    postedDays: 4,
    matchScore: 82,
  },
];

// Mock employer invitations with full job posting fields (at least 4 cards)
const employerInvitations = [
  {
    id: 101,
    title: "RBT - Weekend Coverage",
    company: "Helping Hands ABA",
    companyLogo: COMPANY_LOGOS.airdev,
    senderName: "Jessica",
    senderCompany: "Helping Hands ABA",
    location: "Alpharetta, GA (15 miles)",
    employmentType: "Part-time",
    compensationDisplay: "Hourly $28 - $35/hr",
    schedulePreference: "Weekends",
    licenseRequirement: "RBT",
    message: "Hi, we came across your profile and think you'd be a great fit for our weekend team.",
    date: "Yesterday",
  },
  {
    id: 102,
    title: "RBT - After School",
    company: "Bright Future ABA",
    companyLogo: COMPANY_LOGOS.icon2,
    senderName: "Michael",
    senderCompany: "Bright Future ABA",
    location: "Atlanta, GA (5 miles)",
    employmentType: "Part-time",
    compensationDisplay: "Hourly $26 - $30/hr",
    schedulePreference: "Afternoons/Evenings",
    licenseRequirement: "RBT",
    message: "We have an opening that matches your availability perfectly. Would love to discuss!",
    date: "2 days ago",
  },
  {
    id: 103,
    title: "Lead RBT - In-Home",
    company: "Autism Care Partners",
    companyLogo: COMPANY_LOGOS.default,
    senderName: "Rachel",
    senderCompany: "Autism Care Partners",
    location: "Decatur, GA (8 miles)",
    employmentType: "Full-time",
    compensationDisplay: "Hourly $26 - $32/hr",
    schedulePreference: "Standard Full-Time (Weekday daytime hours)",
    licenseRequirement: "RBT",
    message: "Your school-based experience would transfer well to our in-home cases. Interested in learning more?",
    date: "3 days ago",
  },
  {
    id: 104,
    title: "BCBA - Clinical Supervisor",
    company: "Spectrum Support",
    companyLogo: COMPANY_LOGOS.parsley,
    senderName: "David",
    senderCompany: "Spectrum Support",
    location: "Dunwoody, GA (12 miles)",
    employmentType: "Full-time",
    compensationDisplay: "Salary $75,000 - $90,000/yr",
    schedulePreference: "Standard Full-Time (Weekday daytime hours)",
    licenseRequirement: "BCBA",
    message: "We're expanding our clinical team and your background looks like a strong fit. Let's connect.",
    date: "1 week ago",
  },
];

type SortOption = "match" | "date" | "location" | "compensation";

// Filter types based on FIELD_REFERENCE
type FilterState = {
  employmentType: string[];
  licenseRequirement: string[];
  schedulePreference: string[];
};

export default function JobsView() {
  const [sortBy, setSortBy] = useState<SortOption>("match");
  const [filters, setFilters] = useState<FilterState>({
    employmentType: [],
    licenseRequirement: [],
    schedulePreference: [],
  });

  // Use shared message drawer
  const { openDrawerForInvitation } = useProfessionalMessageDrawer();

  // Count active filters
  const activeFilterCount = filters.employmentType.length + filters.licenseRequirement.length + filters.schedulePreference.length;

  const toggleFilter = (category: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value],
    }));
  };

  const filteredAndSortedRecommendations = useMemo(() => {
    let list = [...allJobMatches];

    // Apply filters
    if (filters.employmentType.length > 0) {
      list = list.filter(job => filters.employmentType.includes(job.employmentType));
    }
    if (filters.licenseRequirement.length > 0) {
      list = list.filter(job => {
        // RBT filter matches jobs that require licenses
        // BCBA filter matches BCBA-specific jobs
        if (filters.licenseRequirement.includes("RBT")) {
          return job.licensed;
        }
        if (filters.licenseRequirement.includes("BCBA")) {
          return job.title.includes("BCBA");
        }
        return true;
      });
    }
    if (filters.schedulePreference.length > 0) {
      list = list.filter(job =>
        filters.schedulePreference.some(pref =>
          job.schedulePreference.toLowerCase().includes(pref.toLowerCase()) ||
          job.schedule.some(s => s.toLowerCase().includes(pref.toLowerCase()))
        )
      );
    }

    // Apply sorting
    if (sortBy === "match") list.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    else if (sortBy === "date") list.sort((a, b) => a.postedDays - b.postedDays);
    else if (sortBy === "location") list.sort((a, b) => a.location.localeCompare(b.location));
    else if (sortBy === "compensation") {
      list.sort((a, b) => {
        const aVal = parseFloat(a.rate.split("-")[0].replace(/[$,]/g, ""));
        const bVal = parseFloat(b.rate.split("-")[0].replace(/[$,]/g, ""));
        return bVal - aVal;
      });
    }

    return list;
  }, [sortBy, filters]);

  const handleAcceptAndReply = (invitation: typeof employerInvitations[0]) => {
    openDrawerForInvitation({
      id: invitation.id,
      title: invitation.title,
      company: invitation.company,
      companyLogo: invitation.companyLogo,
      senderName: invitation.senderName,
      senderCompany: invitation.senderCompany,
      message: invitation.message,
      date: invitation.date,
    });
  };

  return (
    <div className="space-y-8 overflow-x-hidden">
      {/* Page Header: Job Opportunities + Find More Jobs on same line */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Job Opportunities</h1>
          <p className="text-muted-foreground mt-1">Browse invitations and recommended matches</p>
        </div>
        <Button asChild className="shrink-0">
          <Link href="/search">Find More Jobs</Link>
        </Button>
      </div>

      {/* Section 1: Invitations - title with filter/sort on the right */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">Invitations ({employerInvitations.length})</h2>
          <div className="flex flex-wrap items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="default" className="gap-2 h-9 px-4 font-medium">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  Filter{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-0">
                <div className="px-3 py-2.5 border-b bg-muted/40">
                  <p className="text-sm font-semibold text-foreground">Filter recommendations</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Select one or more options</p>
                </div>
                <div className="py-2">
                  <DropdownMenuLabel className="px-3 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Employment Type
                  </DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={filters.employmentType.includes("Full-time")}
                    onCheckedChange={() => toggleFilter("employmentType", "Full-time")}
                    className="py-2 px-3 cursor-pointer"
                  >
                    Full-time
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.employmentType.includes("Part-time")}
                    onCheckedChange={() => toggleFilter("employmentType", "Part-time")}
                    className="py-2 px-3 cursor-pointer"
                  >
                    Part-time
                  </DropdownMenuCheckboxItem>
                </div>
                <div className="py-2 border-t">
                  <DropdownMenuLabel className="px-3 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    License Requirement
                  </DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={filters.licenseRequirement.includes("RBT")}
                    onCheckedChange={() => toggleFilter("licenseRequirement", "RBT")}
                    className="py-2 px-3 cursor-pointer"
                  >
                    RBT
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.licenseRequirement.includes("BCBA")}
                    onCheckedChange={() => toggleFilter("licenseRequirement", "BCBA")}
                    className="py-2 px-3 cursor-pointer"
                  >
                    BCBA
                  </DropdownMenuCheckboxItem>
                </div>
                <div className="py-2 border-t">
                  <DropdownMenuLabel className="px-3 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Schedule
                  </DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={filters.schedulePreference.includes("Standard")}
                    onCheckedChange={() => toggleFilter("schedulePreference", "Standard")}
                    className="py-2 px-3 cursor-pointer"
                  >
                    Standard (Weekday daytime)
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.schedulePreference.includes("Flexible")}
                    onCheckedChange={() => toggleFilter("schedulePreference", "Flexible")}
                    className="py-2 px-3 cursor-pointer"
                  >
                    Flexible Schedule
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.schedulePreference.includes("Weekends")}
                    onCheckedChange={() => toggleFilter("schedulePreference", "Weekends")}
                    className="py-2 px-3 cursor-pointer"
                  >
                    Weekends
                  </DropdownMenuCheckboxItem>
                </div>
                {activeFilterCount > 0 && (
                  <div className="border-t p-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-center text-muted-foreground hover:text-foreground"
                      onClick={() => setFilters({ employmentType: [], licenseRequirement: [], schedulePreference: [] })}
                    >
                      Clear all filters
                    </Button>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by</span>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger className="w-[180px] h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="match">Match quality</SelectItem>
                  <SelectItem value="date">Date posted</SelectItem>
                  <SelectItem value="location">Location (A-Z)</SelectItem>
                  <SelectItem value="compensation">Compensation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {employerInvitations.map((item) => (
            <Card
              key={`invite-${item.id}`}
              className="border-blue-200 bg-white hover:border-blue-300 transition-colors"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-blue-600 hover:bg-blue-700">Invitation</Badge>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
                <CardTitle className="text-base">{item.title}</CardTitle>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 shrink-0" />{item.company}
                </p>
                <div className="flex flex-col gap-y-1 text-sm text-muted-foreground mt-2">
                  <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 shrink-0" />{item.location}</span>
                  <span className="flex items-center gap-1.5"><Briefcase className="w-3 h-3 shrink-0" />{item.employmentType}</span>
                  <span className="flex items-center gap-1.5"><Banknote className="w-3 h-3 shrink-0" />{item.compensationDisplay}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 shrink-0" />{item.schedulePreference}</span>
                  <span className="flex items-center gap-1.5"><BadgeCheck className="w-3 h-3 shrink-0" />License: {item.licenseRequirement}</span>
                </div>
                <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-900 border border-blue-100 mt-3 flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full overflow-hidden bg-white border">
                    <img src={item.companyLogo} alt="" className="h-8 w-8 object-contain" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground mb-1">{item.senderName} from {item.senderCompany}</p>
                    <p className="whitespace-normal">{item.message}</p>
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 text-destructive hover:text-destructive border-destructive/20">Decline</Button>
                <Button size="sm" className="flex-1" onClick={() => handleAcceptAndReply(item)}>Accept &amp; Reply</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        {employerInvitations.length === 0 && (
          <p className="text-sm text-muted-foreground py-4">No pending invitations.</p>
        )}
      </div>

      {/* Section 2: Recommendations (count) */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recommendations ({filteredAndSortedRecommendations.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          {filteredAndSortedRecommendations.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              href={`/listing/${job.id}?view=professional`}
              showExternalIcon={true}
            />
          ))}
        </div>
        {filteredAndSortedRecommendations.length === 0 && (
          <div className="text-center py-8 bg-muted/30 rounded-lg border border-dashed">
            <p className="text-muted-foreground">No recommendations match your filters.</p>
            <Button
              variant="link"
              className="mt-2"
              onClick={() => setFilters({ employmentType: [], licenseRequirement: [], schedulePreference: [] })}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
