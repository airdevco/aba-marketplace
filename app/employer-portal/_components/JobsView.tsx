"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetFooter
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  MoreHorizontal, 
  Plus, 
  Edit, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp,
  MapPin,
  Mail,
  MessageSquare,
  Send,
  User,
  CheckCircle2
} from "lucide-react";

// Mock data
const jobs = [
  { id: 1, title: "RBT - Full Time", location: "Atlanta, GA", type: "Full-time", status: "Active", applicants: 3, posted: "2026-01-15" },
  { id: 2, title: "BCBA - Clinic Director", location: "Marietta, GA", type: "Full-time", status: "Active", applicants: 2, posted: "2026-01-12" },
  { id: 3, title: "RBT - Part Time", location: "Decatur, GA", type: "Part-time", status: "Active", applicants: 3, posted: "2026-01-10" },
  { id: 4, title: "Clinical Supervisor", location: "Alpharetta, GA", type: "Full-time", status: "Closed", applicants: 2, posted: "2025-12-20" },
  { id: 5, title: "RBT - Weekend Shift", location: "Sandy Springs, GA", type: "Part-time", status: "Paused", applicants: 0, posted: "2026-01-20" },
];

const allMockApplicants = [
  { id: "EF454GR", name: "Sarah Williams", email: "sarah.w@example.com", role: "RBT", location: "Atlanta, GA (5 miles)", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", experience: "3 years", status: "Active" },
  { id: "AB123CD", name: "Michael Chen", email: "m.chen@example.com", role: "RBT", location: "Decatur, GA (8 miles)", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", experience: "1 year", status: "Active" },
  { id: "XY987ZW", name: "Jessica Davis", email: "jess.davis@example.com", role: "BCBA", location: "Marietta, GA (15 miles)", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop", experience: "5 years", status: "Accepted" },
  { id: "LM456OP", name: "David Wilson", email: "david.w@example.com", role: "RBT", location: "Alpharetta, GA (12 miles)", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop", experience: "2 years", status: "Active" },
  { id: "QR789ST", name: "Emily Johnson", email: "emily.j@example.com", role: "BCBA", location: "Atlanta, GA (3 miles)", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop", experience: "4 years", status: "Active" },
  { id: "UV321WX", name: "Robert Taylor", email: "robert.t@example.com", role: "RBT", location: "Roswell, GA (20 miles)", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop", experience: "6 months", status: "Declined by Employer" },
  { id: "JK654MN", name: "Jennifer Brown", email: "jen.b@example.com", role: "Clinical Supervisor", location: "Smyrna, GA (10 miles)", image: "https://images.unsplash.com/photo-1554151228-14d9def656ec?w=400&h=400&fit=crop", experience: "7 years", status: "Active" },
  { id: "GH987IJ", name: "James Miller", email: "james.m@example.com", role: "RBT", location: "Atlanta, GA (downtown)", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop", experience: "2 years", status: "Active" },
  { id: "DE123FG", name: "Ashley Moore", email: "ashley.m@example.com", role: "BCBA", location: "Dunwoody, GA (8 miles)", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop", experience: "3 years", status: "Active" },
  { id: "BC456HI", name: "Daniel Anderson", email: "daniel.a@example.com", role: "RBT", location: "Sandy Springs, GA (6 miles)", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop", experience: "1.5 years", status: "Active" },
];

const getApplicantsForJob = (jobId: number, count: number) => {
  // Return different applicants based on jobId to ensure variety
  const startIndex = (jobId * 2) % allMockApplicants.length;
  const selected = [];
  for (let i = 0; i < count; i++) {
    selected.push(allMockApplicants[(startIndex + i) % allMockApplicants.length]);
  }
  return selected;
};

const getMessagesForWorker = (workerId: string) => {
  // Generate unique messages based on worker ID
  const worker = allMockApplicants.find(a => a.id === workerId);
  const workerName = worker?.name || "Candidate";
  const workerFirstName = worker?.name.split(' ')[0] || "there";
  
  const messages = [
    { 
      id: 1, 
      sender: "employer", 
      senderName: "Andrew Johnson",
      senderCompany: "Airdev",
      senderRole: "Hiring Manager",
      text: `Hi ${workerFirstName}, thanks for your application. Are you available for a quick call?`, 
      time: "Yesterday 2:30 PM" 
    },
  ];
  
  if (workerId.endsWith("GR") || workerId.endsWith("CD")) {
    messages.push({ id: 2, sender: "worker", senderName: workerName, text: "Yes, I am available tomorrow afternoon.", time: "Yesterday 3:45 PM" });
    messages.push({ id: 3, sender: "employer", senderName: "Andrew Johnson", senderCompany: "Airdev", senderRole: "Hiring Manager", text: "Great, I'll send an invite.", time: "Today 9:00 AM" });
  } else if (workerId.endsWith("ZW") || workerId.endsWith("OP")) {
    messages.push({ id: 2, sender: "worker", senderName: workerName, text: "Hi! I'm currently working but free after 5pm.", time: "Yesterday 5:15 PM" });
    messages.push({ id: 3, sender: "employer", senderName: "Andrew Johnson", senderCompany: "Airdev", senderRole: "Hiring Manager", text: "Perfect, let's schedule for 5:30 PM then.", time: "Today 10:00 AM" });
  } else if (workerId.endsWith("ST") || workerId.endsWith("WX")) {
    messages.push({ id: 2, sender: "worker", senderName: workerName, text: "Thank you! I'm very interested. When would be a good time?", time: "Yesterday 4:20 PM" });
  } else if (workerId.endsWith("MN") || workerId.endsWith("IJ")) {
    messages.push({ id: 2, sender: "worker", senderName: workerName, text: "Hi, I'd love to learn more about the position.", time: "Yesterday 6:00 PM" });
    messages.push({ id: 3, sender: "employer", senderName: "Andrew Johnson", senderCompany: "Airdev", senderRole: "Hiring Manager", text: "Great! Let me know your availability this week.", time: "Today 8:30 AM" });
  } else {
    messages.push({ id: 2, sender: "worker", senderName: workerName, text: "Thanks for reaching out! I'm definitely interested.", time: "Yesterday 3:00 PM" });
  }
  
  return messages;
};

export default function JobsView() {
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<typeof allMockApplicants[0] | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");

  const toggleExpand = (id: number) => {
    setExpandedJobId(expandedJobId === id ? null : id);
  };

  const handleOpenDrawer = (worker: typeof allMockApplicants[0]) => {
    setSelectedWorker(worker);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
    if (!open) {
      // Reset state when drawer closes
      setSelectedWorker(null);
      setMessageInput("");
    }
  };

  const currentMessages = selectedWorker ? getMessagesForWorker(selectedWorker.id) : [];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Job Listings</h1>
          <p className="text-muted-foreground mt-1">Manage your open positions and view applicants</p>
        </div>
        <Button asChild className="gap-1">
          <Link href="/listing/new">
            <Plus className="w-4 h-4" />
            Post new job
          </Link>
        </Button>
      </div>

      <div className="border rounded-md bg-white overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[300px]">Job Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applicants</TableHead>
              <TableHead>Posted Date</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <>
                <TableRow key={job.id} className={expandedJobId === job.id ? "bg-muted/50" : ""}>
                  <TableCell>
                    <div className="font-medium">{job.title}</div>
                    <div className="text-xs text-muted-foreground md:hidden">{job.location}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{job.location}</TableCell>
                  <TableCell>{job.type}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        job.status === "Active" ? "default" : 
                        job.status === "Paused" ? "outline" : "secondary"
                      }
                    >
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      className="p-0 h-auto font-medium hover:bg-transparent flex items-center gap-1"
                      onClick={() => toggleExpand(job.id)}
                    >
                      {job.applicants} Candidates
                      {expandedJobId === job.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{job.posted}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/listing/${job.id}?mode=edit`}>
                            <Edit className="mr-1.5 h-4 w-4" />
                            Edit listing
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/listing/${job.id}?mode=view`}>
                            <ExternalLink className="mr-1.5 h-4 w-4" />
                            View listing
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                
                {/* Expanded Applicants Row */}
                {expandedJobId === job.id && (
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableCell colSpan={7} className="p-0">
                      <div className="p-4 space-y-4">
                        <h3 className="font-semibold px-2">Applicants for {job.title}</h3>
                        
                        {job.applicants === 0 ? (
                          <div className="flex flex-col items-center justify-center py-8 text-center space-y-4 bg-gray-50 rounded-lg border border-dashed">
                             <div className="bg-white p-3 rounded-full shadow-sm">
                               <User className="h-6 w-6 text-muted-foreground" />
                             </div>
                             <div className="space-y-1">
                               <h4 className="font-semibold text-gray-900">No matching candidates found yet</h4>
                               <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                                 We haven&apos;t found any candidates that match your criteria yet. You can browse our full directory to find potential matches.
                               </p>
                             </div>
                             <Button asChild variant="outline">
                               <Link href="/directory">
                                 Browse Worker Directory
                               </Link>
                             </Button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {getApplicantsForJob(job.id, job.applicants).map((worker) => (
                              <div key={worker.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-lg border shadow-sm gap-4">
                                <div className="flex items-center gap-4">
                                  <div className="relative">
                                    <Avatar className="h-12 w-12 border">
                                      <AvatarImage src={worker.image} alt={worker.name} />
                                      <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    {worker.id === "XY987ZW" && (
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
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-semibold text-base">{worker.name}</h4>
                                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide border ${
                                        worker.status === 'New' 
                                          ? 'bg-green-50 text-green-700 border-green-200' 
                                          : worker.status === 'Reviewing' 
                                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                                          : worker.status === 'Shortlisted'
                                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                                          : worker.status === 'Interviewing'
                                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                                          : 'bg-gray-50 text-gray-700 border-gray-200'
                                      }`}>
                                        {worker.status}
                                      </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                                      <div className="flex items-center gap-1">
                                        <Mail className="h-3.5 w-3.5" />
                                        {worker.email}
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <MapPin className="h-3.5 w-3.5" />
                                        {worker.location}
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <User className="h-3.5 w-3.5" />
                                        {worker.experience} exp
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="flex-1 sm:flex-none"
                                    asChild
                                  >
                                    <Link href={`/profile/${worker.id}`} target="_blank">
                                      View Profile
                                    </Link>
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    className="gap-1.5 flex-1 sm:flex-none"
                                    onClick={() => handleOpenDrawer(worker)}
                                  >
                                    <MessageSquare className="h-4 w-4" />
                                    Message
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Messaging Drawer */}
      <Sheet open={isDrawerOpen} onOpenChange={handleCloseDrawer}>
        <SheetContent className="sm:max-w-md flex flex-col h-full">
          <SheetHeader className="border-b pb-4">
            <SheetTitle className="flex items-center gap-3">
              {selectedWorker && (
                <>
                  <Avatar>
                    <AvatarImage src={selectedWorker.image} />
                    <AvatarFallback>{selectedWorker.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span>{selectedWorker.name}</span>
                    <span className="text-xs font-normal text-muted-foreground">{selectedWorker.role} • {selectedWorker.location}</span>
                  </div>
                </>
              )}
            </SheetTitle>
            <SheetDescription>
              Messages regarding {jobs.find(j => j.id === expandedJobId)?.title || "Application"}
            </SheetDescription>
          </SheetHeader>
          
          <ScrollArea className="flex-1 pr-4 -mr-4 py-4">
            <div className="space-y-4">
              {currentMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col ${msg.sender === 'employer' ? 'items-end' : 'items-start'}`}
                >
                  {/* Sender Name */}
                  {msg.sender === 'employer' && msg.senderName && (
                    <div className="text-[10px] text-muted-foreground mb-1 px-1">
                      {msg.senderName} from {msg.senderCompany}
                    </div>
                  )}
                  {msg.sender === 'worker' && msg.senderName && (
                    <div className="text-[10px] text-muted-foreground mb-1 px-1">
                      {msg.senderName}
                    </div>
                  )}
                  
                  <div 
                    className={`max-w-[85%] rounded-lg p-3 text-sm ${
                      msg.sender === 'employer' 
                        ? 'bg-primary text-primary-foreground rounded-br-none' 
                        : 'bg-muted rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1 px-1">
                    {msg.time}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>

          <SheetFooter className="pt-4 border-t mt-auto">
            <div className="flex items-center gap-2 w-full">
              <Input 
                placeholder="Type your message..." 
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1"
              />
              <Button size="icon" onClick={() => setMessageInput("")}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
