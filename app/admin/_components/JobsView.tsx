"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Search } from "lucide-react";

// Mock jobs data
const jobs = [
  { id: 1, title: "RBT - Full Time", company: "Bright Future ABA", positionType: "RBT", location: "Atlanta, GA", status: "Active", applicants: 3, posted: "2026-01-15" },
  { id: 2, title: "BCBA - Clinic Director", company: "Peach State Therapy", positionType: "BCBA", location: "Marietta, GA", status: "Active", applicants: 2, posted: "2026-01-12" },
  { id: 3, title: "RBT - Part Time", company: "Autism Care Partners", positionType: "RBT", location: "Decatur, GA", status: "Active", applicants: 3, posted: "2026-01-10" },
  { id: 4, title: "Clinical Supervisor", company: "Metro Behavioral Health", positionType: "BCBA", location: "Alpharetta, GA", status: "Closed", applicants: 2, posted: "2025-12-20" },
  { id: 5, title: "RBT - Weekend Shift", company: "Helping Hands ABA", positionType: "RBT", location: "Sandy Springs, GA", status: "Paused", applicants: 0, posted: "2026-01-20" },
  { id: 6, title: "Senior BCBA", company: "Spectrum Support", positionType: "BCBA", location: "Dunwoody, GA", status: "Active", applicants: 5, posted: "2026-01-08" },
  { id: 7, title: "Lead RBT", company: "Kids First ABA", positionType: "RBT", location: "Roswell, GA", status: "Active", applicants: 4, posted: "2026-01-18" },
];

export default function JobsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || job.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesRole = roleFilter === "all" || job.positionType === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Job Postings</h1>
        <p className="text-muted-foreground mt-1">View and manage all job listings on the platform</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by job title or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="RBT">RBT</SelectItem>
            <SelectItem value="BCBA">BCBA</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Jobs Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Job Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Position Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applicants</TableHead>
                <TableHead>Posted Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{job.positionType}</Badge>
                  </TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        job.status === "Active" ? "default" :
                        job.status === "Paused" ? "outline" : "secondary"
                      }
                    >
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{job.applicants}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(job.posted).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg">No jobs found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
