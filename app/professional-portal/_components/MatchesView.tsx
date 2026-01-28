"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, DollarSign, Clock, Building, MessageSquare, Send, ChevronLeft } from "lucide-react";

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
    companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
    lastMessage: "Hi Sarah, we liked your profile and think you'd be a great fit for our weekend team.",
    lastMessageTime: "Yesterday",
    unread: true
  },
  {
    id: 1,
    jobTitle: "Registered Behavior Technician (RBT)",
    company: "Bright Future ABA",
    companyLogo: "https://images.unsplash.com/photo-1516876437184-593fda40c6ed?w=100&h=100&fit=crop",
    lastMessage: "Thanks for your interest! When would be a good time to discuss?",
    lastMessageTime: "2 hours ago",
    unread: false
  },
  {
    id: 2,
    jobTitle: "BCBA - Clinical Director",
    company: "Peach State Therapy",
    companyLogo: "https://images.unsplash.com/photo-1554774853-719586f8c277?w=100&h=100&fit=crop",
    lastMessage: "We'd love to schedule an interview with you next week.",
    lastMessageTime: "1 day ago",
    unread: false
  },
  {
    id: 3,
    jobTitle: "Senior RBT",
    company: "Autism Care Partners",
    companyLogo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop",
    lastMessage: "Could you send over your latest certification?",
    lastMessageTime: "3 days ago",
    unread: true
  }
];

const getMessagesForThread = (threadId: number) => {
  if (threadId === 101) {
    return [
      { id: 1, sender: "employer", text: "Hi Sarah, we liked your profile and think you'd be a great fit for our weekend team.", time: "Yesterday 3:30 PM" },
    ];
  } else if (threadId === 1) {
    return [
      { id: 1, sender: "worker", text: "Hi, I'm very interested in this position. Could you tell me more about the schedule?", time: "Yesterday 2:00 PM" },
      { id: 2, sender: "employer", text: "Thanks for your interest! When would be a good time to discuss?", time: "2 hours ago" },
    ];
  } else if (threadId === 2) {
    return [
      { id: 1, sender: "employer", text: "Hello Sarah, your experience looks impressive.", time: "2 days ago 10:00 AM" },
      { id: 2, sender: "worker", text: "Thank you! I've been working in the field for 5 years now.", time: "2 days ago 11:30 AM" },
      { id: 3, sender: "employer", text: "We'd love to schedule an interview with you next week.", time: "1 day ago" },
    ];
  } else {
    return [
      { id: 1, sender: "employer", text: "Hi Sarah, are you still available?", time: "4 days ago" },
      { id: 2, sender: "worker", text: "Yes, I am.", time: "3 days ago" },
      { id: 3, sender: "employer", text: "Could you send over your latest certification?", time: "3 days ago" },
    ];
  }
};

export default function MatchesView() {
  const [selectedThread, setSelectedThread] = useState<typeof allThreads[0] | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showThreadList, setShowThreadList] = useState(false);
  const [messageInput, setMessageInput] = useState("");

  const handleOpenDrawer = (job: typeof employerReachouts[0]) => {
    // Find or create thread for this job
    const thread = allThreads.find(t => t.id === job.id) || {
      id: job.id,
      jobTitle: job.title,
      company: job.company,
      companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
      lastMessage: job.message,
      lastMessageTime: job.date,
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
        <p className="text-muted-foreground mt-1">View your suggested matches and employer invitations.</p>
      </div>

      {/* Employer Reachouts Section */}
      {employerReachouts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Pending Invitations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employerReachouts.map((job) => (
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
                  <div className="bg-white p-3 rounded-md text-sm italic text-muted-foreground border">
                    "{job.message}"
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
                  <Button variant="outline" className="flex-1 bg-white hover:bg-gray-50 text-destructive hover:text-destructive border-destructive/20">
                    Decline
                  </Button>
                  <Button className="flex-1" onClick={() => handleOpenDrawer(job)}>Accept & Reply</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Matches Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Suggested for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestedMatches.map((job) => (
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
                      className={`p-2.5 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedThread?.id === thread.id ? "bg-muted border-primary" : ""
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <Avatar className="h-10 w-10 border shrink-0">
                          <AvatarImage src={thread.companyLogo} className="object-cover" />
                          <AvatarFallback>{thread.company.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-sm truncate">{thread.company}</span>
                            {thread.unread && (
                              <span className="w-2 h-2 bg-primary rounded-full shrink-0"></span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{thread.jobTitle}</p>
                          <p className="text-xs text-muted-foreground mt-1 truncate">{thread.lastMessage}</p>
                          <p className="text-[10px] text-muted-foreground mt-1">{thread.lastMessageTime}</p>
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
                      <Avatar>
                        <AvatarImage src={selectedThread.companyLogo} />
                        <AvatarFallback>{selectedThread.company.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start flex-1">
                        <span className="font-semibold">{selectedThread.company}</span>
                        <span className="text-xs text-muted-foreground">{selectedThread.jobTitle}</span>
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
                      className={`flex flex-col ${msg.sender === 'worker' ? 'items-end' : 'items-start'}`}
                    >
                      <div 
                        className={`max-w-[85%] rounded-lg p-3 text-sm ${
                          msg.sender === 'worker' 
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
              </div>

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
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}