"use client";

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, Send } from "lucide-react";

// Company logos
const COMPANY_LOGOS = {
  default: "https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769804890523x838539645913488600/favicon.png",
  airdev: "https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769558510329x965473798247719000/1024favicon.png",
  parsley: "https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769804920987x244544127826915600/parsley-favicon.png",
  icon2: "https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769804989697x108119687752882050/icon2.png",
} as const;

// Thread type
export type MessageThread = {
  id: number;
  jobTitle: string;
  company: string;
  companyLogo: string;
  senderName: string;
  senderCompany: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
};

// Message type
export type ThreadMessage = {
  id: number;
  sender: "employer" | "worker";
  senderName: string;
  senderCompany?: string;
  senderCompanyLogo?: string;
  text: string;
  time: string;
};

// All threads data (shared across views)
export const allThreads: MessageThread[] = [
  {
    id: 1,
    jobTitle: "RBT - School Based",
    company: "Peach State Therapy",
    companyLogo: COMPANY_LOGOS.icon2,
    senderName: "David Kim",
    senderCompany: "Peach State Therapy",
    lastMessage: "Perfect! I'll have our coordinator reach out to schedule.",
    lastMessageTime: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    jobTitle: "BCBA - Clinical Director",
    company: "Peach State Therapy",
    companyLogo: COMPANY_LOGOS.icon2,
    senderName: "Emily Rodriguez",
    senderCompany: "Peach State Therapy",
    lastMessage: "We'd love to schedule an interview with you next week.",
    lastMessageTime: "1 day ago",
    unread: false,
  },
  {
    id: 3,
    jobTitle: "Senior RBT",
    company: "Autism Care Partners",
    companyLogo: COMPANY_LOGOS.default,
    senderName: "James Wilson",
    senderCompany: "Autism Care Partners",
    lastMessage: "Could you send over your latest certification?",
    lastMessageTime: "3 days ago",
    unread: true,
  },
];

// Get messages for a thread
export const getMessagesForThread = (threadId: number): ThreadMessage[] => {
  // Handle invitation IDs (101, 102, etc.)
  if (threadId === 101) {
    return [
      {
        id: 1,
        sender: "employer",
        senderName: "Jessica",
        senderCompany: "Helping Hands ABA",
        senderCompanyLogo: COMPANY_LOGOS.airdev,
        text: "Hi, we came across your profile and think you'd be a great fit for our weekend team.",
        time: "Yesterday 3:30 PM",
      },
    ];
  } else if (threadId === 102) {
    return [
      {
        id: 1,
        sender: "employer",
        senderName: "Michael",
        senderCompany: "Bright Future ABA",
        senderCompanyLogo: COMPANY_LOGOS.icon2,
        text: "We have an opening that matches your availability perfectly. Would love to discuss!",
        time: "2 days ago 2:00 PM",
      },
    ];
  } else if (threadId === 103) {
    return [
      {
        id: 1,
        sender: "employer",
        senderName: "Rachel",
        senderCompany: "Autism Care Partners",
        senderCompanyLogo: COMPANY_LOGOS.default,
        text: "Your school-based experience would transfer well to our in-home cases. Interested in learning more?",
        time: "3 days ago 2:00 PM",
      },
    ];
  } else if (threadId === 104) {
    return [
      {
        id: 1,
        sender: "employer",
        senderName: "David",
        senderCompany: "Spectrum Support",
        senderCompanyLogo: COMPANY_LOGOS.parsley,
        text: "We're expanding our clinical team and your background looks like a strong fit. Let's connect.",
        time: "1 week ago 10:00 AM",
      },
    ];
  } else if (threadId === 1) {
    return [
      {
        id: 1,
        sender: "employer",
        senderName: "David Kim",
        senderCompany: "Peach State Therapy",
        senderCompanyLogo: COMPANY_LOGOS.icon2,
        text: "Hi Sarah, your experience with school-based placements would be a great fit for our RBT role. Are you available for a call this week?",
        time: "Yesterday 3:00 PM",
      },
      {
        id: 2,
        sender: "worker",
        senderName: "Sarah Williams",
        text: "Yes, I'd love to learn more! I have availability Tuesday afternoon.",
        time: "2 hours ago",
      },
      {
        id: 3,
        sender: "employer",
        senderName: "David Kim",
        senderCompany: "Peach State Therapy",
        senderCompanyLogo: COMPANY_LOGOS.icon2,
        text: "Perfect! I'll have our coordinator reach out to schedule.",
        time: "2 hours ago",
      },
    ];
  } else if (threadId === 2) {
    return [
      {
        id: 1,
        sender: "employer",
        senderName: "Emily Rodriguez",
        senderCompany: "Peach State Therapy",
        senderCompanyLogo: COMPANY_LOGOS.icon2,
        text: "Hello Sarah, your experience looks impressive.",
        time: "2 days ago 10:00 AM",
      },
      {
        id: 2,
        sender: "worker",
        senderName: "Sarah Williams",
        text: "Thank you! I've been working in the field for 5 years now.",
        time: "2 days ago 11:30 AM",
      },
      {
        id: 3,
        sender: "employer",
        senderName: "Emily Rodriguez",
        senderCompany: "Peach State Therapy",
        senderCompanyLogo: COMPANY_LOGOS.icon2,
        text: "We'd love to schedule an interview with you next week.",
        time: "1 day ago",
      },
    ];
  } else {
    return [
      {
        id: 1,
        sender: "employer",
        senderName: "James Wilson",
        senderCompany: "Metro Behavioral Health",
        senderCompanyLogo: COMPANY_LOGOS.default,
        text: "Hi Sarah, are you still available?",
        time: "4 days ago",
      },
      {
        id: 2,
        sender: "worker",
        senderName: "Sarah Williams",
        text: "Yes, I am.",
        time: "3 days ago",
      },
      {
        id: 3,
        sender: "employer",
        senderName: "James Wilson",
        senderCompany: "Metro Behavioral Health",
        senderCompanyLogo: COMPANY_LOGOS.default,
        text: "Could you send over your latest certification?",
        time: "3 days ago",
      },
    ];
  }
};

// Context type
type ProfessionalMessageDrawerContextType = {
  isOpen: boolean;
  openDrawer: (thread: MessageThread) => void;
  openDrawerForInvitation: (invitation: {
    id: number;
    title: string;
    company: string;
    companyLogo: string;
    senderName: string;
    senderCompany: string;
    message: string;
    date: string;
  }) => void;
  closeDrawer: () => void;
  allThreads: MessageThread[];
};

const ProfessionalMessageDrawerContext = createContext<ProfessionalMessageDrawerContextType | null>(null);

export function useProfessionalMessageDrawer() {
  const context = useContext(ProfessionalMessageDrawerContext);
  if (!context) {
    throw new Error("useProfessionalMessageDrawer must be used within ProfessionalMessageDrawerProvider");
  }
  return context;
}

export function ProfessionalMessageDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null);
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

  const openDrawer = (thread: MessageThread) => {
    setSelectedThread(thread);
    setShowThreadList(false);
    setIsOpen(true);
  };

  const openDrawerForInvitation = (invitation: {
    id: number;
    title: string;
    company: string;
    companyLogo: string;
    senderName: string;
    senderCompany: string;
    message: string;
    date: string;
  }) => {
    // Convert invitation to thread format
    const thread: MessageThread = {
      id: invitation.id,
      jobTitle: invitation.title,
      company: invitation.company,
      companyLogo: invitation.companyLogo,
      senderName: invitation.senderName,
      senderCompany: invitation.senderCompany,
      lastMessage: invitation.message,
      lastMessageTime: invitation.date,
      unread: true,
    };
    setSelectedThread(thread);
    setShowThreadList(false);
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
    setSelectedThread(null);
    setMessageInput("");
    setShowThreadList(false);
  };

  const handleCloseDrawer = (open: boolean) => {
    if (!open) {
      closeDrawer();
    }
  };

  const handleSelectThread = (thread: MessageThread) => {
    setSelectedThread(thread);
    setShowThreadList(false);
  };

  const currentMessages = selectedThread ? getMessagesForThread(selectedThread.id) : [];

  return (
    <ProfessionalMessageDrawerContext.Provider
      value={{
        isOpen,
        openDrawer,
        openDrawerForInvitation,
        closeDrawer,
        allThreads,
      }}
    >
      {children}

      {/* Shared Message Drawer */}
      <Sheet open={isOpen} onOpenChange={handleCloseDrawer}>
        <SheetContent className="w-full sm:max-w-xl flex flex-col h-full">
          {showThreadList ? (
            /* Thread List View */
            <>
              <SheetHeader className="border-b pb-4">
                <SheetTitle>Conversations</SheetTitle>
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
                                <span
                                  className="w-1.5 h-1.5 rounded-full shrink-0"
                                  style={{ backgroundColor: "#2663EB" }}
                                />
                              )}
                              {thread.senderName} from {thread.senderCompany}
                            </span>
                            <span className="text-[10px] text-muted-foreground shrink-0">
                              {thread.lastMessageTime}
                            </span>
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
                        <span className="font-semibold text-sm truncate">
                          {selectedThread.senderName} from {selectedThread.senderCompany}
                        </span>
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
                        <div className="text-xs font-medium text-black mb-1 px-1">{msg.senderName}</div>
                      )}
                      <div
                        className={`flex ${msg.sender === "worker" ? "flex-col items-end" : "items-end gap-2"} max-w-[85%]`}
                      >
                        {msg.sender === "employer" && msg.senderCompanyLogo && (
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full overflow-hidden bg-white border self-end">
                            <img src={msg.senderCompanyLogo} alt="" className="h-5 w-5 object-contain" />
                          </span>
                        )}
                        <div
                          className={`flex flex-col ${msg.sender === "worker" ? "items-end" : "items-start"} flex-1 min-w-0`}
                        >
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
                            <span className="text-[10px] text-muted-foreground mt-1 px-1">{msg.time}</span>
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
    </ProfessionalMessageDrawerContext.Provider>
  );
}
