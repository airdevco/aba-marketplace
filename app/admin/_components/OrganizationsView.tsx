"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Search, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";

// Mock organizations data
const organizations = [
  { id: 1, companyName: "Bright Future ABA", adminName: "John Doe", adminEmail: "john@brightfuture.com", teamMembers: 8, activeJobs: 5, status: "Active", createdAt: "2025-11-15" },
  { id: 2, companyName: "Peach State Therapy", adminName: "Jane Smith", adminEmail: "jane@peachstate.com", teamMembers: 12, activeJobs: 7, status: "Active", createdAt: "2025-10-22" },
  { id: 3, companyName: "Autism Care Partners", adminName: "Michael Brown", adminEmail: "michael@autismcare.com", teamMembers: 5, activeJobs: 3, status: "Active", createdAt: "2025-12-01" },
  { id: 4, companyName: "Metro Behavioral Health", adminName: "Emily Johnson", adminEmail: "emily@metrobh.com", teamMembers: 15, activeJobs: 10, status: "Active", createdAt: "2025-09-10" },
  { id: 5, companyName: "Helping Hands ABA", adminName: "David Wilson", adminEmail: "david@helpinghands.com", teamMembers: 6, activeJobs: 0, status: "Inactive", createdAt: "2025-08-15" },
];

export default function OrganizationsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newOrgName, setNewOrgName] = useState("");
  const [newOwnerEmail, setNewOwnerEmail] = useState("");

  const filteredOrgs = organizations.filter(org => 
    searchQuery === "" ||
    org.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.adminName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateOrganization = () => {
    // TODO: API call to create organization and send invite
    console.log("Creating organization", { name: newOrgName, ownerEmail: newOwnerEmail });
    setIsCreateModalOpen(false);
    setNewOrgName("");
    setNewOwnerEmail("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Organizations</h1>
          <p className="text-muted-foreground mt-1">Manage employer organizations and accounts</p>
        </div>

        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create New Organization
            </Button>
          </DialogTrigger>
          <DialogContent overlayClassName="bg-black/40">
            <DialogHeader>
              <DialogTitle>Create New Organization</DialogTitle>
              <DialogDescription>
                Set up a new employer organization and invite the owner
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="org-name">Company Name</Label>
                <Input
                  id="org-name"
                  value={newOrgName}
                  onChange={(e) => setNewOrgName(e.target.value)}
                  placeholder="Enter company name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner-email">Owner Email</Label>
                <Input
                  id="owner-email"
                  type="email"
                  value={newOwnerEmail}
                  onChange={(e) => setNewOwnerEmail(e.target.value)}
                  placeholder="owner@company.com"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateOrganization}>
                Create & Send Invite
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search organizations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Organizations Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Company Name</TableHead>
                <TableHead>Admin User</TableHead>
                <TableHead>Team Members</TableHead>
                <TableHead>Active Jobs</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrgs.map((org) => (
                <TableRow key={org.id}>
                  <TableCell className="font-medium">{org.companyName}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-sm">{org.adminName}</div>
                      <div className="text-xs text-muted-foreground">{org.adminEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>{org.teamMembers}</TableCell>
                  <TableCell>{org.activeJobs}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch checked={org.status === "Active"} />
                      <span className="text-sm">{org.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(org.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {filteredOrgs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg">No organizations found</h3>
          <p className="text-muted-foreground">Try a different search term</p>
        </div>
      )}
    </div>
  );
}
