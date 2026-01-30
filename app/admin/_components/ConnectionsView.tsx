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

// Mock connections data
const connections = [
  { id: 1, workerName: "Sarah Williams", workerRole: "RBT", companyName: "Bright Future ABA", jobTitle: "RBT - Full Time", status: "Active", connectedAt: "2026-01-18", lastActivity: "2 hours ago" },
  { id: 2, workerName: "Jessica Davis", workerRole: "BCBA", companyName: "Peach State Therapy", jobTitle: "BCBA - Clinic Director", status: "Accepted", connectedAt: "2026-01-15", lastActivity: "Yesterday" },
  { id: 3, workerName: "Michael Chen", workerRole: "RBT", companyName: "Autism Care Partners", jobTitle: "RBT - Part Time", status: "Active", connectedAt: "2026-01-20", lastActivity: "3 hours ago" },
  { id: 4, workerName: "Emily Johnson", workerRole: "BCBA", companyName: "Metro Behavioral Health", jobTitle: "BCBA - Clinical Director", status: "Active", connectedAt: "2026-01-12", lastActivity: "5 days ago" },
  { id: 5, workerName: "David Wilson", workerRole: "RBT", companyName: "Helping Hands ABA", jobTitle: "RBT - Weekend Shift", status: "Declined by Employer", connectedAt: "2026-01-10", lastActivity: "1 week ago" },
];

export default function ConnectionsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredConnections = connections.filter(conn => {
    const matchesSearch = searchQuery === "" ||
      conn.workerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conn.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conn.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || conn.status === statusFilter;
    const matchesRole = roleFilter === "all" || conn.workerRole === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Connections & Matches</h1>
        <p className="text-muted-foreground mt-1">Monitor employer-worker connections and application activity</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by worker, company, or job..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
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
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Accepted">Accepted</SelectItem>
            <SelectItem value="Declined by Employer">Declined by Employer</SelectItem>
            <SelectItem value="Declined by Candidate">Declined by Candidate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Connections Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Worker</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Connected</TableHead>
                <TableHead>Last Activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredConnections.map((conn) => (
                <TableRow key={conn.id}>
                  <TableCell className="font-medium">{conn.workerName}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{conn.workerRole}</Badge>
                  </TableCell>
                  <TableCell>{conn.companyName}</TableCell>
                  <TableCell>{conn.jobTitle}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={conn.status === "Active" ? "default" : conn.status === "Accepted" ? "secondary" : "outline"}
                      className={
                        conn.status === "Accepted" ? "bg-green-100 text-green-700 border-green-200" :
                        conn.status.includes("Declined") ? "bg-gray-100 text-gray-700 border-gray-200" :
                        ""
                      }
                    >
                      {conn.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(conn.connectedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {conn.lastActivity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {filteredConnections.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg">No connections found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
