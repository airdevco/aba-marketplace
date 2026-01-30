"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Building, 
  LogOut,
  Menu,
  Settings,
  MoreVertical,
  MessageSquare,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", value: "dashboard" },
  { icon: Briefcase, label: "Jobs", value: "jobs" },
  { icon: Users, label: "Team", value: "team" },
  { icon: Building, label: "Company", value: "company" },
];

// Mock unread messages
const unreadMessages = [
  {
    id: 1,
    workerId: "EF454GR",
    workerName: "Sarah Williams",
    workerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    jobTitle: "RBT - Full Time",
    lastMessage: "Hi, I'm very interested in this position.",
    time: "2 hours ago",
    unread: true
  },
  {
    id: 2,
    workerId: "XY987ZW",
    workerName: "Jessica Davis",
    workerImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    jobTitle: "BCBA - Clinic Director",
    lastMessage: "Thank you! I've been working in the field...",
    time: "Yesterday",
    unread: true
  },
  {
    id: 3,
    workerId: "LM456OP",
    workerName: "David Wilson",
    workerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    jobTitle: "RBT - Part Time",
    lastMessage: "Yes, I am available tomorrow afternoon.",
    time: "3 hours ago",
    unread: true
  }
];

const getMessagesForWorker = (workerId: string) => {
  const worker = unreadMessages.find(m => m.workerId === workerId);
  if (!worker) return [];
  
  return [
    { 
      id: 1, 
      sender: "employer", 
      senderName: "Andrew Johnson",
      senderCompany: "Airdev",
      text: `Hi ${worker.workerName.split(' ')[0]}, thanks for your application. Are you available for a quick call?`, 
      time: "Yesterday 2:30 PM" 
    },
    { 
      id: 2, 
      sender: "worker", 
      senderName: worker.workerName,
      text: worker.lastMessage, 
      time: worker.time 
    },
  ];
};

function EmployerPortalLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "dashboard";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMessageDrawerOpen, setIsMessageDrawerOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<typeof unreadMessages[0] | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [isMessageDropdownOpen, setIsMessageDropdownOpen] = useState(false);

  const handleMessageClick = (message: typeof unreadMessages[0]) => {
    setSelectedMessage(message);
    setIsMessageDropdownOpen(false);
    setIsMessageDrawerOpen(true);
    // Navigate to jobs tab if not already there
    if (currentTab !== "jobs") {
      router.push("/employer-portal?tab=jobs");
    }
  };

  const handleCloseDrawer = (open: boolean) => {
    setIsMessageDrawerOpen(open);
    if (!open) {
      setSelectedMessage(null);
      setMessageInput("");
    }
  };

  const currentMessages = selectedMessage ? getMessagesForWorker(selectedMessage.workerId) : [];
  const unreadCount = unreadMessages.filter(m => m.unread).length;

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r">
      {/* App Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <Link href="/employer-portal?tab=dashboard">
            <img
              src="https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769551902030x600833303719120300/aba.png"
              alt="ABA Marketplace"
              className="h-8 w-auto object-contain"
            />
        </Link>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 py-6 px-3 space-y-1">
        <div className="px-3 mb-2">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Menu
          </h2>
        </div>
        {sidebarItems.map((item) => {
          const isActive = currentTab === item.value;
          return (
            <Link
              key={item.value}
              href={`/employer-portal?tab=${item.value}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-gray-100 hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Company/User Profile */}
      <div className="p-4 border-t bg-gray-50/50">
        <div className="flex items-center gap-3 px-2">
          <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
            <AvatarImage src="https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769558510329x965473798247719000/1024favicon.png" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">Airdev, Inc.</p>
            <p className="text-xs text-muted-foreground">Employer</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" asChild>
                <Link href="/login">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/30 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 fixed inset-y-0 z-50">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50 bg-white shadow-sm border">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          <VisuallyHidden>
            <SheetTitle>Navigation Menu</SheetTitle>
          </VisuallyHidden>
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 md:ml-72">
        {/* Top Header for Mobile/Context */}
        <header className="h-16 border-b border-border bg-white sticky top-0 z-40 px-8 flex items-center justify-end">
          <div className="flex items-center gap-4">
            {/* Messages Dropdown */}
            <DropdownMenu open={isMessageDropdownOpen} onOpenChange={setIsMessageDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <MessageSquare className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] font-medium flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-0">
                <DropdownMenuLabel className="px-3 py-2">Messages</DropdownMenuLabel>
                <DropdownMenuSeparator className="m-0" />
                <ScrollArea className="max-h-[400px]">
                  {unreadMessages.length > 0 ? (
                    <div className="py-1">
                      {unreadMessages.map((message) => (
                        <div
                          key={message.id}
                          className="px-3 py-3 cursor-pointer hover:bg-muted transition-colors"
                          onClick={() => handleMessageClick(message)}
                        >
                          <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10 border shrink-0">
                              <AvatarImage src={message.workerImage} />
                              <AvatarFallback>{message.workerName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0 overflow-hidden pr-2">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <p className="font-semibold text-sm truncate flex-1 min-w-0">{message.workerName}</p>
                                <span className="text-[10px] text-muted-foreground shrink-0">{message.time}</span>
                              </div>
                              <p className="text-xs text-muted-foreground truncate">{message.jobTitle}</p>
                              <p className="text-xs text-muted-foreground mt-1 truncate">{message.lastMessage}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      No new messages
                    </div>
                  )}
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
              JD
            </div>
          </div>
        </header>

        {/* Messaging Drawer */}
        <Sheet open={isMessageDrawerOpen} onOpenChange={handleCloseDrawer}>
          <SheetContent className="sm:max-w-md flex flex-col h-full">
            <SheetHeader className="border-b pb-4">
              <SheetTitle className="flex items-center gap-3">
                {selectedMessage && (
                  <>
                    <Avatar>
                      <AvatarImage src={selectedMessage.workerImage} />
                      <AvatarFallback>{selectedMessage.workerName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span>{selectedMessage.workerName}</span>
                      <span className="text-xs font-normal text-muted-foreground">{selectedMessage.jobTitle}</span>
                    </div>
                  </>
                )}
              </SheetTitle>
              <SheetDescription>
                {selectedMessage && `Messages regarding ${selectedMessage.jobTitle}`}
              </SheetDescription>
            </SheetHeader>
            
            <ScrollArea className="flex-1 pr-4 -mr-4 py-4">
              <div className="space-y-4">
                {currentMessages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex flex-col ${msg.sender === 'employer' ? 'items-end' : 'items-start'}`}
                  >
                    {/* Sender Attribution */}
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

        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function EmployerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <EmployerPortalLayoutContent>{children}</EmployerPortalLayoutContent>
    </Suspense>
  );
}
