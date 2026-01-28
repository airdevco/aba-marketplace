"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, MapPin, Mail, Phone, Briefcase, Award, Check, DollarSign, MessageSquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import HeaderWithProfile from "@/components/HeaderWithProfile";

// Mock worker data that matches employer portal applicants
const allMockApplicants = [
  { id: "EF454GR", name: "Sarah Williams", email: "sarah.w@example.com", phone: "(555) 123-4567", role: "RBT", location: "Atlanta, GA", zipCode: "30308", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", experience: "3 years", licenseNumber: "RBT-12345678", minRate: "24", employmentType: ["Full-time", "Weekends"], workSetting: "In-person", radius: "25" },
  { id: "AB123CD", name: "Michael Chen", email: "m.chen@example.com", phone: "(555) 234-5678", role: "RBT", location: "Decatur, GA", zipCode: "30030", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", experience: "1 year", licenseNumber: "RBT-23456789", minRate: "22", employmentType: ["Part-time"], workSetting: "Hybrid", radius: "15" },
  { id: "XY987ZW", name: "Jessica Davis", email: "jess.davis@example.com", phone: "(555) 345-6789", role: "BCBA", location: "Marietta, GA", zipCode: "30060", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop", experience: "5 years", licenseNumber: "BCBA-34567890", minRate: "75", employmentType: ["Full-time"], workSetting: "In-person", radius: "30" },
  { id: "LM456OP", name: "David Wilson", email: "david.w@example.com", phone: "(555) 456-7890", role: "RBT", location: "Alpharetta, GA", zipCode: "30009", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop", experience: "2 years", licenseNumber: "RBT-45678901", minRate: "26", employmentType: ["Full-time", "Part-time"], workSetting: "In-person", radius: "20" },
  { id: "QR789ST", name: "Emily Johnson", email: "emily.j@example.com", phone: "(555) 567-8901", role: "BCBA", location: "Atlanta, GA", zipCode: "30305", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop", experience: "4 years", licenseNumber: "BCBA-56789012", minRate: "80", employmentType: ["Full-time"], workSetting: "Hybrid", radius: "25" },
  { id: "UV321WX", name: "Robert Taylor", email: "robert.t@example.com", phone: "(555) 678-9012", role: "RBT", location: "Roswell, GA", zipCode: "30076", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop", experience: "6 months", licenseNumber: "RBT-67890123", minRate: "20", employmentType: ["Weekends"], workSetting: "In-person", radius: "10" },
];

// Directory workers
const directoryWorkers = [
  { id: "W101", name: "Anonymous RBT", role: "RBT", location: "Atlanta, GA", zipCode: "30301", image: "", experience: "3 years", licenseNumber: "RBT-W101", minRate: "24", employmentType: ["Weekdays", "Evenings"], workSetting: "In-person", radius: "25" },
  { id: "W102", name: "Anonymous BCBA", role: "BCBA", location: "Marietta, GA", zipCode: "30060", image: "", experience: "5 years", licenseNumber: "BCBA-W102", minRate: "82", employmentType: ["Weekdays"], workSetting: "In-person", radius: "30" },
  { id: "W103", name: "Anonymous RBT", role: "RBT", location: "Decatur, GA", zipCode: "30030", image: "", experience: "1 year", licenseNumber: "RBT-W103", minRate: "22", employmentType: ["Weekends", "School Hours"], workSetting: "Hybrid", radius: "15" },
  { id: "W104", name: "Anonymous RBT", role: "RBT", location: "Alpharetta, GA", zipCode: "30009", image: "", experience: "4 years", licenseNumber: "RBT-W104", minRate: "26", employmentType: ["Full-time"], workSetting: "In-person", radius: "20" },
  { id: "W105", name: "Anonymous BCBA", role: "BCBA", location: "Sandy Springs, GA", zipCode: "30328", image: "", experience: "7 years", licenseNumber: "BCBA-W105", minRate: "90", employmentType: ["Flexible"], workSetting: "Hybrid", radius: "35" },
  { id: "W106", name: "Anonymous RBT", role: "RBT", location: "Smyrna, GA", zipCode: "30080", image: "", experience: "2 years", licenseNumber: "RBT-W106", minRate: "23", employmentType: ["Weekdays"], workSetting: "In-person", radius: "15" },
  { id: "W107", name: "Anonymous RBT", role: "RBT", location: "Atlanta, GA", zipCode: "30303", image: "", experience: "< 1 year", licenseNumber: "RBT-W107", minRate: "20", employmentType: ["Weekends"], workSetting: "In-person", radius: "10" },
  { id: "W108", name: "Anonymous BCBA", role: "BCBA", location: "Roswell, GA", zipCode: "30076", image: "", experience: "3 years", licenseNumber: "BCBA-W108", minRate: "77", employmentType: ["Full-time"], workSetting: "In-person", radius: "25" },
];

export default function ProfilePage({ params }: { params: { id: string } }) {
  const workerId = params.id;
  
  // Find worker from applicants or directory
  let foundWorker = allMockApplicants.find(a => a.id === workerId);
  if (!foundWorker) {
    const dirWorker = directoryWorkers.find(w => w.id === workerId);
    if (dirWorker) {
      foundWorker = dirWorker;
    }
  }
  
  // Default data fallback
  const worker = foundWorker || {
    id: workerId,
    name: "Sarah Williams",
    role: "RBT",
    location: "Atlanta, GA",
    zipCode: "30308",
    email: "sarah.w@example.com",
    phone: "(555) 123-4567",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    experience: "3 years",
    licenseNumber: "RBT-12345678",
    minRate: "24",
    employmentType: ["Full-time", "Weekends"],
    workSetting: "In-person",
    radius: "25"
  };

  const isVerified = worker.id === "XY987ZW";
  const isAnonymous = worker.id.startsWith("W");

  const [messageText, setMessageText] = useState("");
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  const handleSendMessage = () => {
    // In a real app, this would verify the user and send the message
    setIsMessageOpen(false);
    setMessageText("");
    // Could show a toast here
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <HeaderWithProfile />

      <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
        {/* Navigation */}
        <div className="space-y-2">
          <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary" asChild>
            <Link href="/employer-portal?tab=jobs">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              {isAnonymous ? `${worker.role} Candidate` : worker.name}
            </h1>
            <Sheet open={isMessageOpen} onOpenChange={setIsMessageOpen}>
              <SheetTrigger asChild>
                <Button>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message Candidate
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Contact {isAnonymous ? `${worker.role} Candidate` : worker.name}</SheetTitle>
                  <SheetDescription>
                    Send a message to initiate contact. Your full company profile will be visible to them.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-4">
                  <div className="space-y-2">
                    <Label>Candidate Details</Label>
                    <div className="bg-muted p-3 rounded-md text-sm space-y-1">
                      <p><span className="font-medium">Role:</span> {worker.role}</p>
                      <p><span className="font-medium">Location:</span> {worker.location}</p>
                      <p><span className="font-medium">ID:</span> #{worker.id}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Hi, we'd like to discuss a potential opportunity..." 
                      className="min-h-[150px]"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                    />
                  </div>
                </div>
                <SheetFooter>
                  <Button variant="outline" onClick={() => setIsMessageOpen(false)}>Cancel</Button>
                  <Button onClick={handleSendMessage}>Send Message</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
          <p className="text-muted-foreground">
            {worker.role === "RBT" ? "Registered Behavior Technician" : "Board Certified Behavior Analyst"} · {worker.experience} experience
          </p>
        </div>

        {/* Content - Single Card like listing page */}
        <Card>
          <CardContent className="space-y-8 pt-6">
            {/* Profile Photo - Centered */}
            <div className="flex justify-center pb-6 border-b">
              <div className="relative">
                <Avatar className="h-24 w-24 border-2 border-gray-200">
                  {worker.image ? (
                    <AvatarImage src={worker.image} alt={worker.name} />
                  ) : null}
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">
                    {worker.role.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {isVerified && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5 border-2 border-white shadow-sm cursor-pointer">
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" align="start">
                        <p>Verified professional</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>

            {/* Contact Information */}
            {!isAnonymous && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label className="text-muted-foreground font-normal">Email</Label>
                  <div className="font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    {worker.email}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground font-normal">Phone</Label>
                  <div className="font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    {worker.phone}
                  </div>
                </div>
              </div>
            )}

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label className="text-muted-foreground font-normal">Location</Label>
                <div className="font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  {worker.location}
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-muted-foreground font-normal">ZIP Code</Label>
                <div className="font-medium">{worker.zipCode}</div>
              </div>
            </div>

            <Separator />

            {/* License Verification */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">License Verification</Label>
              <div className="flex items-center gap-4 border p-4 rounded-lg bg-gray-50/50">
                <div className="bg-white p-2 rounded-full border shadow-sm">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{worker.role} Credential</h3>
                    <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-[10px] h-5">
                      Active
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">License #: {worker.licenseNumber}</p>
                </div>
                <div className="text-right">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Job Preferences */}
            <div className="space-y-6">
              <Label className="text-base font-semibold">Job Preferences</Label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label className="text-muted-foreground font-normal">Minimum Hourly Rate</Label>
                  <div className="font-medium text-green-700 font-semibold flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    ${worker.minRate}/hr
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground font-normal">Geographic Radius</Label>
                  <div className="font-medium">{worker.radius} miles</div>
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-muted-foreground font-normal">Employment Type</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {worker.employmentType.map((type: string, i: number) => (
                    <Badge key={i} variant="outline" className="font-normal">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-muted-foreground font-normal">Work Setting</Label>
                <div className="font-medium flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  {worker.workSetting}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
