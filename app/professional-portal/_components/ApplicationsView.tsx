"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// Card components not used in this file
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, MessageSquare, ExternalLink, Send, ChevronLeft } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

// Placeholder company logos for messaging attribution
const COMPANY_LOGOS = {
  default: "https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769804890523x838539645913488600/favicon.png",
  parsley: "https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769804920987x244544127826915600/parsley-favicon.png",
  icon2: "https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769804989697x108119687752882050/icon2.png",
} as const;

// Mock data for applications — statuses: Active, Closed, Paused
const applications = [
  {
    id: 1,
    title: "Senior RBT",
    company: "Behavioral Health Co.",
    location: "Atlanta, GA",
    status: "Active",
    appliedDate: "Jan 20, 2026",
    lastActivity: "Message received yesterday"
  },
  {
    id: 2,
    title: "RBT Specialist",
    company: "Metro Therapy Services",
    location: "Buckhead, GA",
    status: "Active",
    appliedDate: "Jan 24, 2026",
    lastActivity: "Application submitted"
  },
  {
    id: 3,
    title: "Clinical Technician",
    company: "Spectrum Support",
    location: "Dunwoody, GA",
    status: "Paused",
    appliedDate: "Jan 15, 2026",
    lastActivity: "Offer accepted - start date pending"
  }
];

// Mock threads for messaging
const applicationThreads = [
  {
    id: 1,
    jobTitle: "Senior RBT",
    company: "Behavioral Health Co.",
    companyLogo: COMPANY_LOGOS.default,
    lastMessage: "Thank you for your application. We'd like to schedule an interview.",
    lastMessageTime: "Yesterday",
    lastMessageSenderName: "Michael Chen",
    lastMessageSenderCompany: "Behavioral Health Co.",
    unread: true
  },
  {
    id: 2,
    jobTitle: "RBT Specialist",
    company: "Metro Therapy Services",
    companyLogo: COMPANY_LOGOS.parsley,
    lastMessage: "We've received your application and will review it shortly.",
    lastMessageTime: "2 days ago",
    lastMessageSenderName: "Jennifer Brown",
    lastMessageSenderCompany: "Metro Therapy Services",
    unread: false
  },
  {
    id: 3,
    jobTitle: "Clinical Technician",
    company: "Spectrum Support",
    companyLogo: COMPANY_LOGOS.icon2,
    lastMessage: "Congratulations! We're pleased to offer you the position.",
    lastMessageTime: "3 days ago",
    lastMessageSenderName: "David Lee",
    lastMessageSenderCompany: "Spectrum Support",
    unread: true
  }
];

const getMessagesForApplication = (applicationId: number) => {
  if (applicationId === 1) {
    return [
      { id: 1, sender: "worker", senderName: "Sarah Williams", text: "Hi, I'm very interested in the Senior RBT position. I have 5 years of experience.", time: "Jan 20, 2026 2:00 PM" },
      { id: 2, sender: "employer", senderName: "Michael Chen", senderCompany: "Behavioral Health Co.", senderCompanyLogo: COMPANY_LOGOS.default, text: "Thank you for your application. We'd like to schedule an interview.", time: "Yesterday 10:30 AM" },
    ];
  } else if (applicationId === 2) {
    return [
      { id: 1, sender: "worker", senderName: "Sarah Williams", text: "I've submitted my application for the RBT Specialist role.", time: "Jan 24, 2026 3:15 PM" },
      { id: 2, sender: "employer", senderName: "Jennifer Brown", senderCompany: "Metro Therapy Services", senderCompanyLogo: COMPANY_LOGOS.parsley, text: "We've received your application and will review it shortly.", time: "2 days ago" },
    ];
  } else {
    return [
      { id: 1, sender: "worker", senderName: "Sarah Williams", text: "Thank you for considering my application for the Clinical Technician position.", time: "Jan 15, 2026 11:00 AM" },
      { id: 2, sender: "employer", senderName: "David Lee", senderCompany: "Spectrum Support", senderCompanyLogo: COMPANY_LOGOS.icon2, text: "Congratulations! We're pleased to offer you the position.", time: "3 days ago 4:00 PM" },
      { id: 3, sender: "worker", senderName: "Sarah Williams", text: "Thank you so much! I'm very excited about this opportunity.", time: "2 days ago 9:30 AM" },
    ];
  }
};

export default function ApplicationsView() {
  const [selectedThread, setSelectedThread] = useState<typeof applicationThreads[0] | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showThreadList, setShowThreadList] = useState(true);
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

  const handleOpenDrawer = (app: typeof applications[0]) => {
    // Find or create thread for this application
    const thread = applicationThreads.find(t => t.id === app.id) || {
      id: app.id,
      jobTitle: app.title,
      company: app.company,
      companyLogo: COMPANY_LOGOS.default,
      lastMessage: app.lastActivity,
      lastMessageTime: app.appliedDate,
      lastMessageSenderName: undefined,
      lastMessageSenderCompany: app.company,
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
            <TableRow className="hover:bg-transparent">
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
                        app.status === "Active" ? "default" :
                        app.status === "Closed" ? "secondary" :
                        app.status === "Paused" ? "outline" :
                        "secondary"
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
              <VisuallyHidden>
                <SheetTitle>
                  {selectedThread
                    ? `Conversation with ${selectedThread.company}`
                    : "Messages"}
                </SheetTitle>
              </VisuallyHidden>
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
                      {msg.sender === "worker" && msg.senderName && (
                        <div className="text-xs font-medium text-black mb-1 px-1">
                          {msg.senderName}
                        </div>
                      )}
                      <div className={`flex ${msg.sender === "worker" ? "flex-col items-end" : "items-end gap-2"} max-w-[85%]`}>
                        {msg.sender === "employer" && (("senderCompanyLogo" in msg && msg.senderCompanyLogo) || selectedThread?.companyLogo) && (
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full overflow-hidden bg-white border self-end">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={("senderCompanyLogo" in msg && msg.senderCompanyLogo) || selectedThread?.companyLogo || ""} alt="" className="h-5 w-5 object-contain" />
                          </span>
                        )}
                        <div className={`flex flex-col ${msg.sender === "worker" ? "items-end" : "items-start"} flex-1 min-w-0`}>
                          {msg.sender === "employer" && msg.senderName && (
                            <div className="text-xs font-medium text-black mb-1">
                              {msg.senderName} from {msg.senderCompany}
                            </div>
                          )}
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