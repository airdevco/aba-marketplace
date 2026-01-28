"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus, Eye, Edit, Users, ExternalLink } from "lucide-react";

// Mock data
const jobs = [
  { id: 1, title: "RBT - Full Time", location: "Atlanta, GA", type: "Full-time", status: "Active", applicants: 5, posted: "2024-01-15" },
  { id: 2, title: "BCBA - Clinic Director", location: "Marietta, GA", type: "Full-time", status: "Active", applicants: 2, posted: "2024-01-12" },
  { id: 3, title: "RBT - Part Time", location: "Decatur, GA", type: "Part-time", status: "Closing Soon", applicants: 8, posted: "2024-01-10" },
  { id: 4, title: "Clinical Supervisor", location: "Alpharetta, GA", type: "Full-time", status: "Closed", applicants: 12, posted: "2023-12-20" },
];

export default function JobsView() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Job Listings</h1>
          <p className="text-muted-foreground mt-1">Manage your open positions and view applicants</p>
        </div>
        <Button asChild>
          <Link href="/employer-portal/jobs/new">
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
          </Link>
        </Button>
      </div>

      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Job Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applicants</TableHead>
              <TableHead>Posted Date</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>
                  <div className="font-medium">{job.title}</div>
                  <div className="text-xs text-muted-foreground md:hidden">{job.location}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{job.location}</TableCell>
                <TableCell>{job.type}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      job.status === "Active" ? "default" : 
                      job.status === "Closing Soon" ? "secondary" : "outline"
                    }
                  >
                    {job.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="link" className="p-0 h-auto font-medium" asChild>
                    <Link href={`/employer-portal/jobs/${job.id}/applicants`}>
                      {job.applicants} Candidates
                    </Link>
                  </Button>
                </TableCell>
                <TableCell className="text-muted-foreground">{job.posted}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Listing
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Live
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        View Applicants
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
