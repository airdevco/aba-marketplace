"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, Search, User, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type UserType = "employer" | "professional";

interface AppHeaderProps {
  userType: UserType;
}

// Mock user data - in a real app this would come from auth context
const EMPLOYER_USER = {
  name: "John Doe",
  initials: "JD",
  avatar: "",
};

const PROFESSIONAL_USER = {
  name: "Sarah Williams",
  initials: "SW",
  avatar: "https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769817783115x473563165576327740/mary.jpeg",
};

export function AppHeader({ userType }: AppHeaderProps) {
  const router = useRouter();
  const user = userType === "employer" ? EMPLOYER_USER : PROFESSIONAL_USER;
  const portalLink = userType === "employer" ? "/employer-portal" : "/professional-portal";

  const handleLogout = () => {
    // In a real app, this would clear auth state
    router.push("/login");
  };

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={portalLink} className="flex items-center gap-2">
          <img
            src="https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769551902030x600833303719120300/aba.png"
            alt="ABA Marketplace"
            className="h-10 w-auto object-contain"
          />
        </Link>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {userType === "employer" ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/employer-portal" className="flex items-center gap-2 cursor-pointer">
                      <Building2 className="h-4 w-4" />
                      Employer Portal
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/directory" className="flex items-center gap-2 cursor-pointer">
                      <Search className="h-4 w-4" />
                      Find Professionals
                    </Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/professional-portal" className="flex items-center gap-2 cursor-pointer">
                      <User className="h-4 w-4" />
                      Professional Portal
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/search" className="flex items-center gap-2 cursor-pointer">
                      <Search className="h-4 w-4" />
                      Find Jobs
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/account" className="flex items-center gap-2 cursor-pointer">
                  <Settings className="h-4 w-4" />
                  My Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
              >
                <LogOut className="h-4 w-4" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
