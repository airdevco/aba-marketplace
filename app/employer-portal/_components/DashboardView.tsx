"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, FileText, ArrowUpRight, Clock, MapPin } from "lucide-react";
import Link from "next/link";

export default function DashboardView() {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-2">
        <div>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-1">{currentDate}</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Listings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Active Listings</h2>
            <Link href="/employer-portal?tab=jobs" className="text-sm text-primary hover:underline font-medium flex items-center">
              View all listings
              <ArrowUpRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
          
          <div className="bg-white rounded-xl border shadow-sm divide-y overflow-hidden">
            {[
              { title: "RBT - Part Time", location: "Decatur, GA", applicants: 8, status: "Closing Soon", posted: "1 week ago", type: "Part-time" },
              { title: "RBT - Full Time", location: "Atlanta, GA", applicants: 5, status: "Active", posted: "2 days ago", type: "Full-time" },
              { title: "BCBA - Clinic Director", location: "Marietta, GA", applicants: 2, status: "Active", posted: "5 days ago", type: "Full-time" },
            ].map((job, i) => (
              <Link key={i} href={`/employer-portal/jobs/${i}`} className="block p-6 hover:bg-muted/30 transition-colors group">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg text-foreground group-hover:underline transition-colors">
                        {job.title}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide border ${
                        job.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {job.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        Posted {job.posted}
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5" />
                        {job.type}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="mb-2">
                      <span className="text-2xl font-bold text-foreground">{job.applicants}</span>
                      <span className="text-xs text-muted-foreground block font-medium uppercase tracking-wide">Candidates</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions / Tips */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Grow your team</h3>
                <p className="text-sm text-muted-foreground">Invite colleagues to help manage listings and review candidates.</p>
              </div>
              <Button variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white transition-colors" asChild>
                <Link href="/employer-portal?tab=team">Invite Team Member</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Profile Strength</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Company Profile</span>
                    <span className="text-muted-foreground">85%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[85%] rounded-full" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Add a cover photo to reach 100% and attract more candidates.
                </p>
                <Button variant="link" className="px-0 h-auto text-xs" asChild>
                  <Link href="/employer-portal?tab=company">Complete Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
