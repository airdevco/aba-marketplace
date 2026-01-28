"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Search, MapPin, DollarSign, Briefcase, Filter, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import HeaderWithProfile from "@/components/HeaderWithProfile";

// Mock Directory Data (Anonymized)
const directoryWorkers = [
  { id: "W101", role: "RBT", location: "Atlanta, GA", experience: "3 years", rate: "$22-26/hr", schedule: ["Weekdays", "Evenings"], status: "Available", bio: "Passionate about helping children reach their full potential through evidence-based ABA therapy." },
  { id: "W102", role: "BCBA", location: "Marietta, GA", experience: "5 years", rate: "$75-90/hr", schedule: ["Weekdays"], status: "Available", bio: "Experienced BCBA specializing in early intervention and parent training programs." },
  { id: "W103", role: "RBT", location: "Decatur, GA", experience: "1 year", rate: "$20-24/hr", schedule: ["Weekends", "School Hours"], status: "Looking", bio: "Dedicated RBT with experience in school-based settings and a focus on social skills development." },
  { id: "W104", role: "RBT", location: "Alpharetta, GA", experience: "4 years", rate: "$24-28/hr", schedule: ["Full-time"], status: "Available", bio: "Skilled in discrete trial training and natural environment teaching with diverse client populations." },
  { id: "W105", role: "BCBA", location: "Sandy Springs, GA", experience: "7 years", rate: "$80-100/hr", schedule: ["Flexible"], status: "Available", bio: "Senior BCBA with expertise in behavior reduction and skill acquisition programming." },
  { id: "W106", role: "RBT", location: "Smyrna, GA", experience: "2 years", rate: "$21-25/hr", schedule: ["Weekdays"], status: "Looking", bio: "Energetic and creative RBT who loves incorporating play-based learning into therapy sessions." },
  { id: "W107", role: "RBT", location: "Atlanta, GA", experience: "< 1 year", rate: "$18-22/hr", schedule: ["Weekends"], status: "Available", bio: "Recently certified RBT eager to learn and grow in the field of applied behavior analysis." },
  { id: "W108", role: "BCBA", location: "Roswell, GA", experience: "3 years", rate: "$70-85/hr", schedule: ["Full-time"], status: "Available", bio: "Compassionate BCBA focused on family-centered care and collaborative treatment planning." },
];

export default function DirectoryPage() {
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWorkers = directoryWorkers.filter(worker => {
    if (selectedRole !== "all" && worker.role.toLowerCase() !== selectedRole) return false;
    if (searchQuery && !worker.location.toLowerCase().includes(searchQuery.toLowerCase()) && !worker.role.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50/30">
      <HeaderWithProfile />

      <div className="max-w-7xl mx-auto py-8 px-4 space-y-8">
        {/* Navigation */}
        <div className="space-y-4">
          <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary" asChild>
            <Link href="/employer-portal?tab=jobs">
              <ChevronLeft className="w-4 h-4 mr-2" />
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
                    <Input placeholder="City or ZIP" className="pl-9" />
                  </div>
                  <Select defaultValue="10">
                    <SelectTrigger>
                      <SelectValue placeholder="Within 10 miles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Within 5 miles</SelectItem>
                      <SelectItem value="10">Within 10 miles</SelectItem>
                      <SelectItem value="25">Within 25 miles</SelectItem>
                      <SelectItem value="50">Within 50 miles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Availability */}
                <div className="space-y-3">
                  <Label>Availability</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="full-time" />
                      <Label htmlFor="full-time" className="font-normal">Full-time</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="part-time" />
                      <Label htmlFor="part-time" className="font-normal">Part-time</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="weekends" />
                      <Label htmlFor="weekends" className="font-normal">Weekends</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="evenings" />
                      <Label htmlFor="evenings" className="font-normal">Evenings</Label>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Pay Rate */}
                <div className="space-y-3">
                  <Label>Hourly Rate</Label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-2.5 top-2.5 text-muted-foreground">$</span>
                      <Input placeholder="Min" className="pl-6" type="number" />
                    </div>
                    <span className="text-muted-foreground">-</span>
                    <div className="relative flex-1">
                      <span className="absolute left-2.5 top-2.5 text-muted-foreground">$</span>
                      <Input placeholder="Max" className="pl-6" type="number" />
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
                placeholder="Search by location, role, or keywords..." 
                className="pl-10 h-10 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 gap-4">
              {filteredWorkers.map((worker) => (
                <Card key={worker.id} className="overflow-hidden hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-3 bg-muted/20">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Avatar className="h-10 w-10 border bg-white shrink-0">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            <User className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base font-semibold truncate">
                            {worker.role === "RBT" ? "RBT Candidate" : "BCBA Candidate"}
                          </CardTitle>
                          <span className="text-xs text-muted-foreground">#{worker.id}</span>
                        </div>
                      </div>
                      <Button size="sm" className="shrink-0" asChild>
                        <Link href={`/profile/${worker.id}`}>
                          View & Connect
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-3 pb-4 space-y-3 ml-[52px]">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {worker.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <DollarSign className="h-3.5 w-3.5" />
                        {worker.rate}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5" />
                        {worker.experience}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {worker.schedule.join(", ")}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{worker.bio}</p>
                  </CardContent>
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