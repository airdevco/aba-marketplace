"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Search, MapPin, DollarSign, Briefcase, Filter, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { GenericAvatarByRole } from "@/components/GenericAvatar";
import { InviteToApplyModal } from "@/components/InviteToApplyModal";
import HeaderWithProfile from "@/components/HeaderWithProfile";

// Mock Directory Data (Anonymized)
const directoryWorkers = [
  { id: "W101", role: "RBT", location: "Atlanta, GA", experience: "3 years", rate: "$22-26/hr", schedule: ["Weekdays", "Evenings"], status: "Available" },
  { id: "W102", role: "BCBA", location: "Marietta, GA", experience: "5 years", rate: "$75-90/hr", schedule: ["Weekdays"], status: "Available" },
  { id: "W103", role: "RBT", location: "Decatur, GA", experience: "1 year", rate: "$20-24/hr", schedule: ["Weekends", "School Hours"], status: "Looking" },
  { id: "W104", role: "RBT", location: "Alpharetta, GA", experience: "4 years", rate: "$24-28/hr", schedule: ["Full-time"], status: "Available" },
  { id: "W105", role: "BCBA", location: "Sandy Springs, GA", experience: "7 years", rate: "$80-100/hr", schedule: ["Flexible"], status: "Available" },
  { id: "W106", role: "RBT", location: "Smyrna, GA", experience: "2 years", rate: "$21-25/hr", schedule: ["Weekdays"], status: "Looking" },
  { id: "W107", role: "RBT", location: "Atlanta, GA", experience: "< 1 year", rate: "$18-22/hr", schedule: ["Weekends"], status: "Available" },
  { id: "W108", role: "BCBA", location: "Roswell, GA", experience: "3 years", rate: "$70-85/hr", schedule: ["Full-time"], status: "Available" },
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
  const [selectedWorker, setSelectedWorker] = useState<typeof directoryWorkers[0] | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const filteredWorkers = directoryWorkers.filter(worker => {
    if (selectedRole !== "all" && worker.role.toLowerCase() !== selectedRole) return false;
    if (searchQuery && !worker.location.toLowerCase().includes(searchQuery.toLowerCase()) && !worker.role.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleSendInvite = (jobId: string | number, message: string) => {
    // TODO: API call to send invitation and create message thread
    console.log("Sending invite", { workerId: selectedWorker?.id, jobId, message });
    // Could show a success toast here
  };

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredWorkers.map((worker) => (
                <Card key={worker.id} className="overflow-hidden hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-3 bg-muted/20">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <GenericAvatarByRole roleType={worker.role as "RBT" | "BCBA"} size="sm" />
                        <div>
                          <CardTitle className="text-base font-semibold flex items-center gap-2">
                            {worker.role === "RBT" ? "RBT Candidate" : "BCBA Candidate"}
                            <span className="text-xs font-normal text-muted-foreground">#{worker.id}</span>
                          </CardTitle>
                          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" /> {worker.location}
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="font-normal text-xs bg-white border-input text-foreground hover:bg-white">
                        {worker.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 pb-2 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Experience</span>
                        <div className="font-medium flex items-center gap-1.5">
                          <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                          {worker.experience}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Rate Expectation</span>
                        <div className="font-medium flex items-center gap-1.5">
                          <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                          {worker.rate}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Schedule Availability</span>
                      <div className="flex flex-wrap gap-1.5">
                        {worker.schedule.map((sch, i) => (
                          <Badge key={i} variant="outline" className="text-xs font-normal bg-gray-50">
                            {sch}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/10 pt-4 flex gap-2">
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