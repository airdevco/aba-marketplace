"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Briefcase, Banknote, Calendar, BadgeCheck, Building2 } from "lucide-react";
import { useProfessionalMessageDrawer, allThreads } from "@/components/ProfessionalMessageDrawerContext";

// Placeholder company logos for messaging attribution
const COMPANY_LOGOS = {
  default: "https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769804890523x838539645913488600/favicon.png",
  airdev: "https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769558510329x965473798247719000/1024favicon.png",
  parsley: "https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769804920987x244544127826915600/parsley-favicon.png",
  icon2: "https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769804989697x108119687752882050/icon2.png",
} as const;

// Mock data for suggested matches
const suggestedMatches = [
  {
    id: 1,
    title: "Registered Behavior Technician (RBT)",
    company: "Bright Future ABA",
    location: "Atlanta, GA (5 miles)",
    employmentType: "Full-time",
    compensationDisplay: "Hourly $24 - $28/hr",
    schedulePreference: "Standard Full-Time (Weekday daytime hours)",
    licenseRequirement: "RBT",
    matchScore: 98,
    posted: "2 days ago"
  },
  {
    id: 2,
    title: "RBT - School Based",
    company: "Peach State Therapy",
    location: "Decatur, GA (8 miles)",
    employmentType: "Part-time",
    compensationDisplay: "Hourly $25 - $30/hr",
    schedulePreference: "Non-Standard / Flexible Schedule",
    licenseRequirement: "RBT",
    matchScore: 92,
    posted: "1 day ago"
  },
  {
    id: 3,
    title: "Lead RBT",
    company: "Autism Care Partners",
    location: "Marietta, GA (12 miles)",
    employmentType: "Full-time",
    compensationDisplay: "Hourly $26 - $32/hr",
    schedulePreference: "Standard Full-Time (Weekday daytime hours)",
    licenseRequirement: "RBT",
    matchScore: 85,
    posted: "3 days ago"
  }
];

// Mock data for employer reachouts
const employerReachouts = [
  {
    id: 101,
    title: "RBT - Weekend Shift",
    company: "Airdev, Inc.",
    companyLogo: COMPANY_LOGOS.airdev,
    senderName: "Andrew",
    senderCompany: "Airdev, Inc.",
    location: "Sandy Springs, GA (3 miles)",
    employmentType: "Part-time",
    compensationDisplay: "Hourly $28 - $35/hr",
    schedulePreference: "Weekends",
    licenseRequirement: "RBT",
    message: "Hi Sarah, we liked your profile and think you'd be a great fit for our weekend team.",
    date: "Yesterday"
  }
];

export default function MatchesView() {
  // Use shared message drawer
  const { openDrawer, openDrawerForInvitation } = useProfessionalMessageDrawer();

  const handleAcceptAndReply = (job: typeof employerReachouts[0]) => {
    openDrawerForInvitation({
      id: job.id,
      title: job.title,
      company: job.company,
      companyLogo: job.companyLogo,
      senderName: job.senderName,
      senderCompany: job.senderCompany,
      message: job.message,
      date: job.date,
    });
  };

  const handleOpenThread = (thread: typeof allThreads[0]) => {
    openDrawer(thread);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back, Sarah</h1>
          <p className="text-muted-foreground mt-1">Here&apos;s what&apos;s happening today.</p>
        </div>
      </div>

      {/* Stats Overview - 4 tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground pb-2">Active Applications</p>
            <p className="text-2xl font-bold">3</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground pb-2">New Invites</p>
            <p className="text-2xl font-bold">{employerReachouts.length}</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground pb-2">Messages Awaiting Response</p>
            <p className="text-2xl font-bold">{allThreads.filter(t => t.unread).length}</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground pb-2">Profile Views</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">47</span>
              <span className="text-xs text-green-600 font-medium">+12% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Two-Column Layout - matches metrics grid (lg:grid-cols-4 gap-4) so Recent Messages = 2 tiles width */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Column: New Opportunities - Pending invitations first, then recommended matches */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold">New Opportunities</h2>
          <div className="space-y-4">
            {employerReachouts.map((job) => (
              <Card key={`invite-${job.id}`} className="border-blue-200 bg-white hover:border-blue-300 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-blue-600 hover:bg-blue-700">Invitation</Badge>
                      <span className="text-xs text-muted-foreground">{job.date}</span>
                    </div>
                    <CardTitle className="text-base">{job.title}</CardTitle>
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" />{job.company}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-2">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                      <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{job.employmentType}</span>
                      <span className="flex items-center gap-1"><Banknote className="w-3 h-3" />{job.compensationDisplay}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{job.schedulePreference}</span>
                      <span className="flex items-center gap-1"><BadgeCheck className="w-3 h-3" />License required: {job.licenseRequirement}</span>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-900 border border-blue-100 mt-3 flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full overflow-hidden bg-white border">
                        <img src={job.companyLogo} alt="" className="h-8 w-8 object-contain" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground mb-1">{job.senderName} from {job.senderCompany}</p>
                        <p>{job.message}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1 text-destructive hover:text-destructive border-destructive/20">Decline</Button>
                  <Button className="flex-1" onClick={() => handleAcceptAndReply(job)}>Accept &amp; Reply</Button>
                </CardFooter>
              </Card>
            ))}
            {suggestedMatches.slice(0, 5).map((job) => (
              <Card key={`match-${job.id}`} className="hover:border-primary/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{job.matchScore}% Match</Badge>
                    <span className="text-xs text-muted-foreground">{job.posted}</span>
                  </div>
                  <CardTitle className="text-base">{job.title}</CardTitle>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" />{job.company}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-2">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{job.employmentType}</span>
                    <span className="flex items-center gap-1"><Banknote className="w-3 h-3" />{job.compensationDisplay}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{job.schedulePreference}</span>
                    <span className="flex items-center gap-1"><BadgeCheck className="w-3 h-3" />License required: {job.licenseRequirement}</span>
                  </div>
                </CardHeader>
                <CardFooter className="pt-2">
                  <Button className="w-full" asChild>
                    <Link href={`/listing/${job.id}?view=professional`}>View &amp; Apply</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Recent Messages (1/2 width) */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold">Recent Messages</h2>
          <div className="space-y-3">
            {allThreads.slice(0, 5).map((thread) => (
              <Card 
                key={thread.id} 
                className="cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => handleOpenThread(thread)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full overflow-hidden bg-white border">
                      <img src={thread.companyLogo} alt="" className="h-8 w-8 object-contain" />
                    </span>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-sm truncate flex items-center gap-1.5">
                          {thread.unread && (
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#2663EB" }} />
                          )}
                          {thread.senderName} from {thread.senderCompany}
                        </p>
                        <span className="text-[10px] text-muted-foreground shrink-0">{thread.lastMessageTime}</span>
                      </div>
                      <p className="text-xs text-foreground truncate">{thread.jobTitle}</p>
                      <p className="text-xs text-muted-foreground truncate overflow-hidden">
                        {thread.lastMessage}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
