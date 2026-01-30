"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, Briefcase, Users, AlertCircle, ArrowUpRight } from "lucide-react";

// Mock metrics data
const metrics = {
  totalCompanies: 127,
  totalJobsPosted: 342,
  totalABAProfessionals: 1456,
  pendingVerifications: 12,
  pendingAccessRequests: 8,
};

// Mock recent activity
const recentActivity = [
  { id: 1, type: "worker_registered", description: "New RBT registered: Sarah Williams", timestamp: "2 minutes ago" },
  { id: 2, type: "job_posted", description: "Bright Future ABA posted: RBT - Full Time", timestamp: "15 minutes ago" },
  { id: 3, type: "application_submitted", description: "Application submitted for BCBA position", timestamp: "1 hour ago" },
  { id: 4, type: "verification_requested", description: "License verification requested: Jessica Davis (BCBA)", timestamp: "2 hours ago" },
  { id: 5, type: "access_requested", description: "Access request from: Metro Behavioral Health", timestamp: "3 hours ago" },
];

export default function DashboardView() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Platform overview and quick actions</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Companies</p>
                <p className="text-3xl font-bold">{metrics.totalCompanies}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Jobs Posted</p>
                <p className="text-3xl font-bold">{metrics.totalJobsPosted}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">ABA Professionals</p>
                <p className="text-3xl font-bold">{metrics.totalABAProfessionals}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-orange-700 font-medium">Pending Actions</p>
                <p className="text-3xl font-bold text-orange-700">
                  {metrics.pendingVerifications + metrics.pendingAccessRequests}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-200 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-orange-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pending License Verifications */}
        <Card className="border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Pending License Verifications</h3>
                <p className="text-sm text-muted-foreground">Professionals awaiting review</p>
              </div>
              <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-amber-200">
                {metrics.pendingVerifications}
              </Badge>
            </div>
            <Button asChild className="w-full">
              <Link href="/admin?tab=professionals">
                Review Verifications
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Pending Access Requests */}
        <Card className="border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Pending Access Requests</h3>
                <p className="text-sm text-muted-foreground">Employers requesting accounts</p>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                {metrics.pendingAccessRequests}
              </Badge>
            </div>
            <Button asChild className="w-full">
              <Link href="/admin?tab=organizations">
                Review Requests
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                <div className="mt-1">
                  {activity.type === "worker_registered" && (
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <Users className="h-4 w-4 text-purple-600" />
                    </div>
                  )}
                  {activity.type === "job_posted" && (
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Briefcase className="h-4 w-4 text-green-600" />
                    </div>
                  )}
                  {activity.type === "application_submitted" && (
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Briefcase className="h-4 w-4 text-blue-600" />
                    </div>
                  )}
                  {activity.type === "verification_requested" && (
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                    </div>
                  )}
                  {activity.type === "access_requested" && (
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Building className="h-4 w-4 text-indigo-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
