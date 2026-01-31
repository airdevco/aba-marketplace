"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Search, Eye, CheckCircle, XCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock pending verifications
const pendingVerifications = [
  { workerId: "XY987ZW", workerName: "Jessica Davis", roleType: "BCBA", licenseNumber: "BCBA-34567890", submittedAt: "2026-01-25", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop" },
  { workerId: "QR789ST", workerName: "Emily Johnson", roleType: "BCBA", licenseNumber: "BCBA-56789012", submittedAt: "2026-01-24", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop" },
  { workerId: "JK654MN", workerName: "Jennifer Brown", roleType: "RBT", licenseNumber: "RBT-67890123", submittedAt: "2026-01-23", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop" },
];

// Mock professionals data
const professionals = [
  { id: "EF454GR", name: "Sarah Williams", roleType: "RBT", location: "Atlanta, GA", verified: true, status: "Active", registered: "2025-11-10" },
  { id: "AB123CD", name: "Michael Chen", roleType: "RBT", location: "Decatur, GA", verified: false, status: "Active", registered: "2025-12-05" },
  { id: "XY987ZW", name: "Jessica Davis", roleType: "BCBA", location: "Marietta, GA", verified: false, status: "Active", registered: "2026-01-08" },
  { id: "LM456OP", name: "David Wilson", roleType: "RBT", location: "Alpharetta, GA", verified: false, status: "Active", registered: "2026-01-12" },
  { id: "QR789ST", name: "Emily Johnson", roleType: "BCBA", location: "Atlanta, GA", verified: false, status: "Active", registered: "2026-01-15" },
  { id: "UV321WX", name: "Robert Taylor", roleType: "RBT", location: "Roswell, GA", verified: false, status: "Inactive", registered: "2025-10-20" },
  { id: "JK654MN", name: "Jennifer Brown", roleType: "RBT", location: "Smyrna, GA", verified: false, status: "Active", registered: "2026-01-18" },
  { id: "GH987IJ", name: "James Miller", roleType: "RBT", location: "Atlanta, GA", verified: false, status: "Active", registered: "2026-01-20" },
];

export default function ProfessionalsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");

  const filteredProfessionals = professionals.filter(prof => {
    const matchesSearch = searchQuery === "" ||
      prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prof.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === "all" || prof.roleType === roleFilter;
    const matchesVerification = verificationFilter === "all" ||
      (verificationFilter === "verified" && prof.verified) ||
      (verificationFilter === "unverified" && !prof.verified);

    return matchesSearch && matchesRole && matchesVerification;
  });

  const handleApproveVerification = (workerId: string) => {
    // TODO: API call to approve verification
    console.log("Approving verification for", workerId);
    alert("Verification approved!");
  };

  const handleDenyVerification = (workerId: string) => {
    // TODO: API call to deny verification
    console.log("Denying verification for", workerId);
    alert("Verification denied");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ABA Professionals</h1>
        <p className="text-muted-foreground mt-1">Manage professional accounts and license verifications</p>
      </div>

      {/* Pending Verifications Section */}
      {pendingVerifications.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Pending License Verifications</h2>
            <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-amber-200">
              {pendingVerifications.length} Pending
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingVerifications.map((verification) => (
              <Card key={verification.workerId}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar className="h-12 w-12 border border-border shrink-0">
                        <AvatarImage src={verification.photo} />
                        <AvatarFallback>{verification.workerName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <CardTitle className="text-base">{verification.workerName}</CardTitle>
                        <p className="text-xs text-muted-foreground">Role: {verification.roleType}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="shrink-0 gap-1" asChild>
                      <Link href={`/profile/${verification.workerId}?from=admin`} target="_blank" className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        Profile
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Role:</span>
                      <span className="font-medium">{verification.roleType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">License #:</span>
                      <span className="font-normal">{verification.licenseNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Submitted:</span>
                      <span className="font-medium">{new Date(verification.submittedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleDenyVerification(verification.workerId)}
                    >
                      <XCircle className="h-3 w-3" />
                      Deny
                    </Button>
                    <Button
                      size="sm"
                      className="gap-1 bg-green-600 hover:bg-green-700"
                      onClick={() => handleApproveVerification(verification.workerId)}
                    >
                      <CheckCircle className="h-3 w-3" />
                      Approve
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Professionals Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">All Professionals</h2>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or location..."
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
          <Select value={verificationFilter} onValueChange={setVerificationFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Verification" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="unverified">Unverified</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Professionals Table */}
        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Name</TableHead>
                  <TableHead>Role Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Verification</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date registered</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProfessionals.map((prof) => (
                  <TableRow key={prof.id}>
                    <TableCell className="font-medium">{prof.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{prof.roleType}</Badge>
                    </TableCell>
                    <TableCell>{prof.location}</TableCell>
                    <TableCell>
                      {prof.verified ? (
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          Unverified
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch checked={prof.status === "Active"} />
                        <span className="text-sm">{prof.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(prof.registered).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {filteredProfessionals.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg">No professionals found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
