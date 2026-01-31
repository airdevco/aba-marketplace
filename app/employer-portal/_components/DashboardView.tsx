"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, ArrowUpRight, Clock, MapPin } from "lucide-react";
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

          </div>
      </div>
    </div>
  );
}
