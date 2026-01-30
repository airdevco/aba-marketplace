"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DollarSign, Clock, Building, Send, ChevronLeft } from "lucide-react";

// Placeholder company logos for messaging attribution
const COMPANY_LOGOS = {
  default: "https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769804890523x838539645913488600/favicon.png",
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
    rate: "$24 - $28/hr",
    type: "Full-time",
    matchScore: 98,
    posted: "2 days ago"
  },
  {
    id: 2,
    title: "RBT - School Based",
    company: "Peach State Therapy",
    location: "Decatur, GA (8 miles)",
    rate: "$25 - $30/hr",
    type: "Part-time",
    matchScore: 92,
    posted: "1 day ago"
  },
  {
    id: 3,
    title: "Lead RBT",
    company: "Autism Care Partners",
    location: "Marietta, GA (12 miles)",
    rate: "$26 - $32/hr",
    type: "Full-time",
    matchScore: 85,
    posted: "3 days ago"
  }
];

// Mock data for employer reachouts
const employerReachouts = [
  {
    id: 101,
    title: "RBT - Weekend Shift",
    company: "Helping Hands ABA",
    location: "Sandy Springs, GA",
    rate: "$28 - $35/hr",
    message: "Hi Sarah, we liked your profile and think you'd be a great fit for our weekend team.",
    date: "Yesterday"
  }
];

// Mock threads/conversations
const allThreads = [
  {
    id: 101,
    jobTitle: "RBT - Weekend Shift",
    company: "Helping Hands ABA",
    companyLogo: COMPANY_LOGOS.default,
    lastMessage: "Hi Sarah, we liked your profile and think you'd be a great fit for our weekend team.",
    lastMessageTime: "Yesterday",
    lastMessageSenderName: "Jessica Martinez",
    lastMessageSenderCompany: "Helping Hands ABA",
    unread: true
  },
  {
    id: 1,
    jobTitle: "Registered Behavior Technician (RBT)",
    company: "Bright Future ABA",
    companyLogo: COMPANY_LOGOS.parsley,
    lastMessage: "Thanks for your interest! When would be a good time to discuss?",
    lastMessageTime: "2 hours ago",
    lastMessageSenderName: "Robert Chen",
    lastMessageSenderCompany: "Bright Future ABA",
    unread: false
  },
  {
    id: 2,
    jobTitle: "BCBA - Clinical Director",
    company: "Peach State Therapy",
    companyLogo: COMPANY_LOGOS.icon2,
    lastMessage: "We'd love to schedule an interview with you next week.",
    lastMessageTime: "1 day ago",
    lastMessageSenderName: "Emily Rodriguez",
    lastMessageSenderCompany: "Peach State Therapy",
    unread: false
  },
  {
    id: 3,
    jobTitle: "Senior RBT",
    company: "Autism Care Partners",
    companyLogo: COMPANY_LOGOS.default,
    lastMessage: "Could you send over your latest certification?",
    lastMessageTime: "3 days ago",
    lastMessageSenderName: "James Wilson",
    lastMessageSenderCompany: "Autism Care Partners",
    unread: true
  }
];

const getMessagesForThread = (threadId: number) => {
  if (threadId === 101) {
    return [
      { id: 1, sender: "employer", senderName: "Jessica Martinez", senderCompany: "Helping Hands ABA", senderCompanyLogo: COMPANY_LOGOS.default, text: "Hi Sarah, we liked your profile and think you'd be a great fit for our weekend team.", time: "Yesterday 3:30 PM" },
    ];
  } else if (threadId === 1) {
    return [
      { id: 1, sender: "worker", senderName: "Sarah Williams", text: "Hi, I'm very interested in this position. Could you tell me more about the schedule?", time: "Yesterday 2:00 PM" },
      { id: 2, sender: "employer", senderName: "Robert Chen", senderCompany: "Bright Future ABA", senderCompanyLogo: COMPANY_LOGOS.parsley, text: "Thanks for your interest! When would be a good time to discuss?", time: "2 hours ago" },
    ];
  } else if (threadId === 2) {
    return [
      { id: 1, sender: "employer", senderName: "Emily Rodriguez", senderCompany: "Peach State Therapy", senderCompanyLogo: COMPANY_LOGOS.icon2, text: "Hello Sarah, your experience looks impressive.", time: "2 days ago 10:00 AM" },
      { id: 2, sender: "worker", senderName: "Sarah Williams", text: "Thank you! I've been working in the field for 5 years now.", time: "2 days ago 11:30 AM" },
      { id: 3, sender: "employer", senderName: "Emily Rodriguez", senderCompany: "Peach State Therapy", senderCompanyLogo: COMPANY_LOGOS.icon2, text: "We'd love to schedule an interview with you next week.", time: "1 day ago" },
    ];
  } else {
    return [
      { id: 1, sender: "employer", senderName: "James Wilson", senderCompany: "Metro Behavioral Health", senderCompanyLogo: COMPANY_LOGOS.default, text: "Hi Sarah, are you still available?", time: "4 days ago" },
      { id: 2, sender: "worker", senderName: "Sarah Williams", text: "Yes, I am.", time: "3 days ago" },
      { id: 3, sender: "employer", senderName: "James Wilson", senderCompany: "Metro Behavioral Health", senderCompanyLogo: COMPANY_LOGOS.default, text: "Could you send over your latest certification?", time: "3 days ago" },
    ];
  }
};

export default function MatchesView() {
  const [selectedThread, setSelectedThread] = useState<typeof allThreads[0] | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showThreadList, setShowThreadList] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const adjustMessageInputHeight = () => {
    const textarea = messageInputRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    const lineHeight = 20;
    const maxHeight = lineHeight * 3;
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  };

  useEffect(() => {
    adjustMessageInputHeight();
  }, [messageInput]);

  const handleOpenDrawer = (job: typeof employerReachouts[0]) => {
    // Find or create thread for this job
    const thread = allThreads.find(t => t.id === job.id) || {
      id: job.id,
      jobTitle: job.title,
      company: job.company,
      companyLogo: COMPANY_LOGOS.default,
      lastMessage: job.message,
      lastMessageTime: job.date,
      lastMessageSenderName: "Jessica Martinez",
      lastMessageSenderCompany: job.company,
      unread: true
    };
    setSelectedThread(thread);
    setShowThreadList(false);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
    if (!open) {
      setSelectedThread(null);
      setMessageInput("");
      setShowThreadList(false);
    }
  };

  const handleSelectThread = (thread: typeof allThreads[0]) => {
    setSelectedThread(thread);
    setShowThreadList(false);
  };

  const currentMessages = selectedThread ? getMessagesForThread(selectedThread.id) : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Your personalized job search hub</p>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Active Applications</p>
              <p className="text-3xl font-bold">3</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">New Invites</p>
              <p className="text-3xl font-bold">{employerReachouts.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Messages Awaiting</p>
              <p className="text-3xl font-bold">{allThreads.filter(t => t.unread).length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Profile Views</p>
              <p className="text-3xl font-bold">47</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Two-Column Layout - matches metrics grid (lg:grid-cols-4 gap-4) so Recent Messages = 2 tiles width */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Column: New Opportunities */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">New Opportunities</h2>
            <Button asChild>
              <Link href="/search">Find More Jobs</Link>
            </Button>
          </div>

          {/* Employer Invitations */}
          {employerReachouts.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-700">Pending Invitations</h3>
              <div className="space-y-4">
                {employerReachouts.map((job) => (
                  <Card key={job.id} className="border-blue-200 bg-white">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-blue-600 hover:bg-blue-700">Invitation</Badge>
                            <span className="text-xs text-muted-foreground">{job.date}</span>
                          </div>
                          <CardTitle className="text-base">{job.title}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <Building className="w-3 h-3" /> {job.company} • {job.location}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-0">
                      <div className="bg-blue-50 p-3 rounded-md text-sm italic text-blue-900 border border-blue-100">
                        &quot;{job.message}&quot;
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" /> {job.rate}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2 pt-3">
                      <Button variant="outline" className="flex-1 text-destructive hover:text-destructive border-destructive/20">
                        Decline
                      </Button>
                      <Button className="flex-1" onClick={() => handleOpenDrawer(job)}>Accept & Reply</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Suggested Matches (Top 5) */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-700">Recommended Matches</h3>
            <div className="space-y-4">
              {suggestedMatches.slice(0, 5).map((job) => (
                <Card key={job.id} className="hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {job.matchScore}% Match
                          </Badge>
                          <span className="text-xs text-muted-foreground">{job.posted}</span>
                        </div>
                        <CardTitle className="text-base">{job.title}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <Building className="w-3 h-3" /> {job.company} • {job.location}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 pt-0">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" /> {job.rate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {job.type}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3">
                    <Button className="w-full" asChild>
                      <Link href={`/listing/${job.id}?view=professional`}>View & Apply</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
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
                onClick={() => {
                  setSelectedThread(thread);
                  setShowThreadList(false);
                  setIsDrawerOpen(true);
                }}
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
                          {"lastMessageSenderName" in thread && thread.lastMessageSenderName
                            ? `${thread.lastMessageSenderName} from ${thread.lastMessageSenderCompany}`
                            : thread.company}
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

      {/* Messaging Drawer */}
      <Sheet open={isDrawerOpen} onOpenChange={handleCloseDrawer}>
        <SheetContent className="w-full sm:max-w-xl flex flex-col h-full">
          {showThreadList ? (
            /* Thread List View */
            <>
              <SheetHeader className="border-b pb-4">
                <SheetTitle>Conversations</SheetTitle>
                <SheetDescription>Your job conversations with employers</SheetDescription>
              </SheetHeader>
              
              <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-2">
                  {allThreads.map((thread) => (
                    <div
                      key={thread.id}
                      onClick={() => handleSelectThread(thread)}
                      className="p-2.5 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full overflow-hidden bg-white border">
                          <img src={thread.companyLogo} alt="" className="h-8 w-8 object-contain" />
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="font-semibold text-sm truncate flex items-center gap-1.5">
                              {thread.unread && (
                                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#2663EB" }} />
                              )}
                              {"lastMessageSenderName" in thread && thread.lastMessageSenderName
                                ? `${thread.lastMessageSenderName} from ${thread.lastMessageSenderCompany}`
                                : thread.company}
                            </span>
                            <span className="text-[10px] text-muted-foreground shrink-0">{thread.lastMessageTime}</span>
                          </div>
                          <p className="text-xs text-foreground truncate">{thread.jobTitle}</p>
                          <p className="text-xs text-muted-foreground mt-1 truncate">{thread.lastMessage}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Message View */
            <>
              <SheetHeader className="border-b pb-4">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 -ml-2"
                    onClick={() => setShowThreadList(true)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {selectedThread && (
                    <>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full overflow-hidden bg-white border">
                        <img src={selectedThread.companyLogo} alt="" className="h-5 w-5 object-contain" />
                      </span>
                      <div className="flex flex-col items-start flex-1 min-w-0">
                        <div className="flex items-center gap-2 w-full">
                          <span className="font-semibold text-sm truncate">
                            {"lastMessageSenderName" in selectedThread && selectedThread.lastMessageSenderName
                              ? `${selectedThread.lastMessageSenderName} from ${selectedThread.lastMessageSenderCompany}`
                              : selectedThread.company}
                          </span>
                        </div>
                        <span className="text-xs text-foreground truncate">{selectedThread.jobTitle}</span>
                      </div>
                    </>
                  )}
                </div>
              </SheetHeader>
              
              <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-4">
                  {currentMessages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`flex flex-col ${msg.sender === "worker" ? "items-end" : "items-start"}`}
                    >
                      {msg.sender === "employer" && msg.senderName && (
                        <div className="text-xs font-medium text-black mb-1 px-1 max-w-[85%]">
                          {msg.senderName} from {msg.senderCompany}
                        </div>
                      )}
                      {msg.sender === "worker" && msg.senderName && (
                        <div className="text-xs font-medium text-black mb-1 px-1">
                          {msg.senderName}
                        </div>
                      )}
                      <div className={`flex ${msg.sender === "worker" ? "flex-col items-end" : "items-end gap-2"} max-w-[85%]`}>
                        {/* Company message: logo aligned to bottom of bubble only (not timestamp) */}
                        {msg.sender === "employer" && (("senderCompanyLogo" in msg && msg.senderCompanyLogo) || selectedThread?.companyLogo) && (
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full overflow-hidden bg-white border">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={("senderCompanyLogo" in msg && msg.senderCompanyLogo) || selectedThread?.companyLogo || ""} alt="" className="h-5 w-5 object-contain" />
                          </span>
                        )}
                        <div className={`flex flex-col ${msg.sender === "worker" ? "items-end" : "items-start"}`}>
                          <div 
                            className={`rounded-lg p-3 text-sm ${
                              msg.sender === "worker" 
                                ? "bg-primary text-primary-foreground rounded-br-none" 
                                : "bg-muted rounded-bl-none"
                            }`}
                          >
                            {msg.text}
                          </div>
                          {msg.sender === "worker" && (
                            <span className="text-[10px] text-muted-foreground mt-1 px-1">
                              {msg.time}
                            </span>
                          )}
                        </div>
                      </div>
                      {msg.sender === "employer" && (
                        <span className="text-[10px] text-muted-foreground mt-1 px-1 max-w-[85%] ml-10">
                          {msg.time}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <SheetFooter className="pt-4 mt-auto">
                <div className="relative w-full">
                  <Textarea
                    ref={messageInputRef}
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onInput={adjustMessageInputHeight}
                    rows={1}
                    className="w-full min-h-[48px] max-h-[60px] overflow-y-auto resize-none py-3 pr-12"
                  />
                  <Button
                    size="icon"
                    className="absolute bottom-2.5 right-2.5 h-8 w-8 shrink-0"
                    onClick={() => setMessageInput("")}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}