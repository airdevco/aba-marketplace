"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Users, FileText, ArrowUpRight, Clock, MapPin, MessageSquare } from "lucide-react";
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
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Active Jobs</p>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold">3</span>
              <span className="text-xs text-green-600 font-medium">
                +1 from last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Total Applicants</p>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold">12</span>
              <span className="text-xs text-green-600 font-medium">
                +4 this week
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Profile Views</p>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold">245</span>
              <span className="text-xs text-green-600 font-medium">
                +12% from last month
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Listings */}
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
              { title: "RBT - Part Time", location: "Decatur, GA", applicants: 8, status: "Closing Soon", posted: "1 week ago", type: "Part-time" },
              { title: "RBT - Full Time", location: "Atlanta, GA", applicants: 5, status: "Active", posted: "2 days ago", type: "Full-time" },
              { title: "BCBA - Clinic Director", location: "Marietta, GA", applicants: 2, status: "Active", posted: "5 days ago", type: "Full-time" },
            ].map((job, i) => (
              <Link key={i} href={`/employer-portal/jobs/${i}`} className="block p-4 hover:bg-muted/30 transition-colors group">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground group-hover:underline transition-colors">
                        {job.title}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide border ${
                        job.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {job.status}
                      </span>
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
            <button className="text-sm text-primary hover:underline font-medium flex items-center">
              View all
              <ArrowUpRight className="w-3 h-3 ml-1" />
            </button>
          </div>

          <div className="bg-white rounded-xl border shadow-sm divide-y overflow-hidden">
            {[
              { name: "Sarah Williams", avatar: "SW", role: "RBT Candidate", message: "Thank you for considering my application! I wanted to follow up on the interview we discussed...", time: "2h ago", unread: true },
              { name: "Marcus Johnson", avatar: "MJ", role: "BCBA Candidate", message: "I'm very interested in the Clinical Director position. My availability for an interview is...", time: "5h ago", unread: true },
              { name: "Emily Chen", avatar: "EC", role: "RBT Candidate", message: "I've attached my updated certifications as requested. Please let me know if you need anything else.", time: "1d ago", unread: false },
              { name: "David Park", avatar: "DP", role: "RBT Candidate", message: "Thanks for the update on my application status. I look forward to hearing back soon.", time: "2d ago", unread: false },
            ].map((msg, i) => (
              <button key={i} className="w-full text-left p-4 hover:bg-muted/30 transition-colors group">
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">{msg.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold text-sm ${msg.unread ? 'text-foreground' : 'text-muted-foreground'}`}>{msg.name}</span>
                        {msg.unread && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">{msg.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{msg.role}</p>
                    <p className={`text-sm mt-1 line-clamp-2 ${msg.unread ? 'text-foreground' : 'text-muted-foreground'}`}>{msg.message}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
