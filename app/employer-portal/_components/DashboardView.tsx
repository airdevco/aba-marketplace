"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, ArrowUpRight, Clock, MapPin, Plus, User } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardView() {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back, John</h1>
          <p className="text-muted-foreground mt-1">Here&apos;s what&apos;s happening with your job listings today.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" className="gap-1">
            <Link href="/directory">
              <User className="w-4 h-4" />
              Find candidates
            </Link>
          </Button>
          <Button asChild className="gap-1">
            <Link href="/listing/new">
              <Plus className="w-4 h-4" />
              Post new job
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground pb-2">Active Jobs</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">3</span>
              <span className="text-xs text-green-600 font-medium">+1 from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground pb-2">Total Applicants</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">12</span>
              <span className="text-xs text-green-600 font-medium">+4 this week</span>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground pb-2">Profile Views</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">245</span>
              <span className="text-xs text-green-600 font-medium">+12% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Listings */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Active Listings</h2>
            <Link href="/employer-portal?tab=jobs" className="text-sm text-primary hover:underline font-medium flex items-center">
              View all
              <ArrowUpRight className="w-3 h-3 ml-1" />
            </Link>
          </div>

          <div className="bg-white rounded-xl border shadow-sm divide-y overflow-hidden">
            {[
              { id: 3, title: "RBT - Part Time", location: "Decatur, GA", applicants: 8, status: "Active", posted: "1 week ago", type: "Part-time" },
              { id: 1, title: "RBT - Full Time", location: "Atlanta, GA", applicants: 5, status: "Active", posted: "2 days ago", type: "Full-time" },
              { id: 2, title: "BCBA - Clinic Director", location: "Marietta, GA", applicants: 2, status: "Paused", posted: "5 days ago", type: "Full-time" },
            ].map((job) => (
              <Link key={job.id} href={`/listing/${job.id}?mode=view`} className="block p-6 hover:bg-muted/30 transition-colors group">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg text-foreground">
                        {job.title}
                      </h3>
                      <Badge
                        variant={
                          job.status === "Active" ? "default" :
                          job.status === "Paused" ? "outline" : "secondary"
                        }
                        className="pointer-events-none"
                      >
                        {job.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5" />
                        {job.type}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-foreground">{job.applicants}</span>
                    <span className="text-xs text-muted-foreground block">Candidates</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Messages</h2>
            <Link href="/employer-portal?tab=messages" className="text-sm text-primary hover:underline font-medium flex items-center">
              View all messages
              <ArrowUpRight className="w-3 h-3 ml-1" />
            </Link>
          </div>

          <div className="bg-white rounded-xl border shadow-sm divide-y overflow-hidden">
            {[
              { id: 1, name: "Sarah Johnson", avatar: "/avatars/sarah.jpg", initials: "SJ", message: "Hi! I'm very interested in the RBT position. I have 3 years of experience...", time: "2 hours ago", unread: true },
              { id: 2, name: "Michael Chen", avatar: "/avatars/michael.jpg", initials: "MC", message: "Thank you for reviewing my application. I wanted to follow up on...", time: "5 hours ago", unread: true },
              { id: 3, name: "Emily Davis", avatar: "/avatars/emily.jpg", initials: "ED", message: "I'm available for an interview anytime this week. Please let me know...", time: "1 day ago", unread: false },
            ].map((msg) => (
              <Link key={msg.id} href={`/employer-portal?tab=messages&id=${msg.id}`} className="block p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={msg.avatar} alt={msg.name} />
                    <AvatarFallback>{msg.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`font-medium ${msg.unread ? 'text-foreground' : 'text-muted-foreground'}`}>{msg.name}</span>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{msg.time}</span>
                    </div>
                    <p className={`text-sm truncate ${msg.unread ? 'text-foreground' : 'text-muted-foreground'}`}>{msg.message}</p>
                  </div>
                  {msg.unread && (
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
