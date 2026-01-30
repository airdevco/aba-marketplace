"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { MapPin, DollarSign, Clock, Building, Search } from "lucide-react";
import { useState } from "react";

// Mock data for suggested matches (same as MatchesView but shows all)
const allJobMatches = [
  { id: 1, title: "RBT - Full Time", company: "Bright Future ABA", location: "Atlanta, GA", rate: "$24-28/hr", type: "Full-time", matchScore: 98, posted: "2 days ago" },
  { id: 2, title: "BCBA - Clinic Director", company: "Peach State Therapy", location: "Marietta, GA", rate: "$75-90/hr", type: "Full-time", matchScore: 95, posted: "1 day ago" },
  { id: 3, title: "RBT - School Based", company: "Autism Care Partners", location: "Decatur, GA", rate: "$25-30/hr", type: "Part-time", matchScore: 88, posted: "3 days ago" },
  { id: 4, title: "Lead RBT", company: "Metro Behavioral Health", location: "Sandy Springs, GA", rate: "$26-32/hr", type: "Full-time", matchScore: 92, posted: "5 days ago" },
  { id: 5, title: "RBT - Weekend Shift", company: "Helping Hands ABA", location: "Alpharetta, GA", rate: "$28-35/hr", type: "Part-time", matchScore: 90, posted: "1 week ago" },
  { id: 6, title: "Senior BCBA", company: "Spectrum Support", location: "Dunwoody, GA", rate: "$80-100/hr", type: "Full-time", matchScore: 82, posted: "4 days ago" },
];

// Mock employer invitations
const employerInvitations = [
  {
    id: 101,
    title: "RBT - Weekend Coverage",
    company: "Helping Hands ABA",
    location: "Alpharetta, GA",
    rate: "$28-35/hr",
    message: "Hi, we came across your profile and think you'd be a great fit for our weekend team.",
    date: "Yesterday"
  },
];

export default function JobsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("match");

  const filteredJobs = allJobMatches.filter(job => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "match") return b.matchScore - a.matchScore;
    if (sortBy === "date") return a.id - b.id; // Mock sorting by ID (newest first)
    return 0;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Job Opportunities</h1>
        <p className="text-muted-foreground mt-1">Browse invitations and recommended matches</p>
      </div>

      {/* Pending Invitations Section */}
      {employerInvitations.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Pending Invitations ({employerInvitations.length})</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employerInvitations.map((job) => (
              <Card key={job.id} className="border-blue-200 bg-white">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge className="bg-blue-600 hover:bg-blue-700">Invitation</Badge>
                    <span className="text-xs text-muted-foreground">{job.date}</span>
                  </div>
                  <CardTitle className="mt-2 text-lg">{job.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Building className="w-3 h-3" /> {job.company}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 p-3 rounded-md text-sm italic text-blue-900 border border-blue-100">
                    &quot;{job.message}&quot;
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" /> {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="w-4 h-4" /> {job.rate}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" className="flex-1">Decline</Button>
                  <Button className="flex-1" asChild>
                    <Link href={`/listing/${job.id}?view=professional`}>View & Reply</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Separator />

      {/* All Recommendations Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">All Recommendations ({sortedJobs.length})</h2>
          
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="match">Best Match</SelectItem>
                <SelectItem value="date">Most Recent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedJobs.map((job) => (
            <Card key={job.id} className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {job.matchScore}% Match
                  </Badge>
                  <span className="text-xs text-muted-foreground">{job.posted}</span>
                </div>
                <CardTitle className="mt-2 text-lg">{job.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Building className="w-3 h-3" /> {job.company}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" /> {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="w-4 h-4" /> {job.rate}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" /> {job.type}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href={`/listing/${job.id}?view=professional`}>View & Apply</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {sortedJobs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-dashed">
            <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg">No jobs found</h3>
            <p className="text-muted-foreground">Try a different search term</p>
          </div>
        )}
      </div>

      {/* CTA to Full Job Search */}
      <div className="pt-8 text-center">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold mb-2">Want to explore more opportunities?</h3>
            <p className="text-muted-foreground mb-6">
              Browse our full job listings with advanced filters
            </p>
            <Button size="lg" asChild>
              <Link href="/search">Browse All Jobs</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
