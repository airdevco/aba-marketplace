"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, MessageSquare, ExternalLink, Send, ChevronLeft } from "lucide-react";

// Mock data for applications
const applications = [
  {
    id: 1,
    title: "Senior RBT",
    company: "Behavioral Health Co.",
    location: "Atlanta, GA",
    status: "Interviewing",
    appliedDate: "Jan 20, 2026",
    lastActivity: "Message received yesterday"
  },
  {
    id: 2,
    title: "RBT Specialist",
    company: "Metro Therapy Services",
    location: "Buckhead, GA",
    status: "Applied",
    appliedDate: "Jan 24, 2026",
    lastActivity: "Application submitted"
  },
  {
    id: 3,
    title: "Clinical Technician",
    company: "Spectrum Support",
    location: "Dunwoody, GA",
    status: "Offer Received",
    appliedDate: "Jan 15, 2026",
    lastActivity: "Offer letter pending review"
  }
];

// Mock threads for messaging
const applicationThreads = [
  {
    id: 1,
    jobTitle: "Senior RBT",
    company: "Behavioral Health Co.",
    companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
    lastMessage: "Thank you for your application. We'd like to schedule an interview.",
    lastMessageTime: "Yesterday",
    unread: true
  },
  {
    id: 2,
    jobTitle: "RBT Specialist",
    company: "Metro Therapy Services",
    companyLogo: "https://images.unsplash.com/photo-1554774853-719586f8c277?w=100&h=100&fit=crop",
    lastMessage: "We've received your application and will review it shortly.",
    lastMessageTime: "2 days ago",
    unread: false
  },
  {
    id: 3,
    jobTitle: "Clinical Technician",
    company: "Spectrum Support",
    companyLogo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop",
    lastMessage: "Congratulations! We're pleased to offer you the position.",
    lastMessageTime: "3 days ago",
    unread: true
  }
];

const getMessagesForApplication = (applicationId: number) => {
  if (applicationId === 1) {
    return [
      { id: 1, sender: "worker", text: "Hi, I'm very interested in the Senior RBT position. I have 5 years of experience.", time: "Jan 20, 2026 2:00 PM" },
      { id: 2, sender: "employer", text: "Thank you for your application. We'd like to schedule an interview.", time: "Yesterday 10:30 AM" },
    ];
  } else if (applicationId === 2) {
    return [
      { id: 1, sender: "worker", text: "I've submitted my application for the RBT Specialist role.", time: "Jan 24, 2026 3:15 PM" },
      { id: 2, sender: "employer", text: "We've received your application and will review it shortly.", time: "2 days ago" },
    ];
  } else {
    return [
      { id: 1, sender: "worker", text: "Thank you for considering my application for the Clinical Technician position.", time: "Jan 15, 2026 11:00 AM" },
      { id: 2, sender: "employer", text: "Congratulations! We're pleased to offer you the position.", time: "3 days ago 4:00 PM" },
      { id: 3, sender: "worker", text: "Thank you so much! I'm very excited about this opportunity.", time: "2 days ago 9:30 AM" },
    ];
  }
};

export default function ApplicationsView() {
  const [selectedThread, setSelectedThread] = useState<typeof applicationThreads[0] | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showThreadList, setShowThreadList] = useState(true);
  const [messageInput, setMessageInput] = useState("");

  const handleOpenDrawer = (app: typeof applications[0]) => {
    // Find or create thread for this application
    const thread = applicationThreads.find(t => t.id === app.id) || {
      id: app.id,
      jobTitle: app.title,
      company: app.company,
      companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
      lastMessage: app.lastActivity,
      lastMessageTime: app.appliedDate,
      unread: false
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
      setShowThreadList(true);
    }
  };

  const handleSelectThread = (thread: typeof applicationThreads[0]) => {
    setSelectedThread(thread);
    setShowThreadList(false);
  };

  const currentMessages = selectedThread ? getMessagesForApplication(selectedThread.id) : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">My Jobs</h1>
        <p className="text-muted-foreground mt-1">Track your applications and ongoing conversations.</p>
      </div>

      <div className="border rounded-md bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Activity</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">
                  <div>{app.title}</div>
                  <div className="text-xs text-muted-foreground md:hidden">{app.location}</div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{app.company}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {app.location}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      app.status === 'Offer Received' ? 'default' :
                      app.status === 'Interviewing' ? 'secondary' :
                      'outline'
                    }
                    className={
                      app.status === 'Offer Received' ? 'bg-green-600 hover:bg-green-700' :
                      app.status === 'Interviewing' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200' :
                      ''
                    }
                  >
                    {app.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {app.lastActivity}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" className="gap-2" asChild>
                      <Link href={`/listing/${app.id}?view=professional`}>
                        <ExternalLink className="w-4 h-4" /> View Job
                      </Link>
                    </Button>
                    <Button size="sm" className="gap-2" onClick={() => handleOpenDrawer(app)}>
                      <MessageSquare className="w-4 h-4" /> Message
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
                  {applicationThreads.map((thread) => (
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