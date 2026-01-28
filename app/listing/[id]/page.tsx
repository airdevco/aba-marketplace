"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, AlertTriangle, Check, MapPin, DollarSign, Eye, Edit, Calendar, Briefcase, Building } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import HeaderWithProfile from "@/components/HeaderWithProfile";

export default function JobListingPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "view"; // Default to view if no mode
  const viewType = searchParams.get("view"); // "professional" for professional view
  const isViewMode = mode === "view";
  const isProfessionalView = viewType === "professional";

  const [positionType, setPositionType] = useState<string>("rbt");
  const [zipCode, setZipCode] = useState<string>("30308");
  const [isValidatingLocation, setIsValidatingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [locationValid, setLocationValid] = useState(true);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState("");
  
  // Mock validation for ZIP code
  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setZipCode(value);
    setLocationValid(false);
    setLocationError(null);

    if (value.length === 5) {
      setIsValidatingLocation(true);
      setTimeout(() => {
        setIsValidatingLocation(false);
        if (value.startsWith("9")) {
          setLocationError("Location is more than 100 miles from Atlanta. We currently only support the Greater Atlanta area.");
        } else {
          setLocationValid(true);
        }
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <HeaderWithProfile />
      
      {isViewMode && !isProfessionalView && (
        <div className="bg-blue-50 border-b border-blue-100 py-3 px-4 text-center">
          <p className="text-sm text-blue-800 flex items-center justify-center gap-2">
            <Eye className="w-4 h-4" />
            <span className="font-medium">You are viewing your live job listing for {positionType === "rbt" ? "Registered Behavior Technician" : "Board Certified Behavior Analyst"}</span>
          </p>
        </div>
      )}

      <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
        {/* Navigation */}
        <div className="space-y-4">
          <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary" asChild>
            <Link href={isProfessionalView ? "/professional-portal?tab=dashboard" : "/employer-portal?tab=jobs"}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                {isViewMode 
                  ? (positionType === "rbt" ? "RBT - Full Time" : "BCBA - Full Time") 
                  : "Edit job listing"
                }
                {!isViewMode && (
                   <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200 font-normal">
                     Active
                   </span>
                )}
              </h1>
              {isViewMode && isProfessionalView && (
                <Button onClick={() => setIsApplyDialogOpen(true)}>
                  Apply to job
                </Button>
              )}
              {isViewMode && !isProfessionalView && (
                 <Button onClick={() => router.push(`/listing/${params.id}?mode=edit`)} className="gap-1">
                   <Edit className="w-4 h-4" />
                   Edit Listing
                 </Button>
              )}
            </div>
            <p className="text-muted-foreground">
              {isViewMode 
                ? "Posted on Jan 15, 2026" 
                : `Manage your listing details for ${positionType === "rbt" ? "Registered Behavior Technician" : "Board Certified Behavior Analyst"}`
              }
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {isViewMode ? (
            <>
              {/* VIEW MODE - Single Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Company Information - Only for Professional View */}
                  {isProfessionalView && (
                    <>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4 pb-4 border-b">
                          <Avatar className="h-16 w-16 border-2 border-gray-200">
                            <AvatarImage src="https://images.unsplash.com/photo-1516876437184-593fda40c6ed?w=100&h=100&fit=crop" alt="Bright Future ABA" />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              <Building className="h-8 w-8" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">Bright Future ABA</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">30308 (Atlanta, GA)</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-muted-foreground font-normal">About the Company</Label>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Bright Future ABA is a leading provider of Applied Behavior Analysis services in the Greater Atlanta area. We specialize in providing high-quality, evidence-based therapy to children and adolescents with autism spectrum disorder and related developmental disabilities. Our team of experienced BCBAs and RBTs work collaboratively to create individualized treatment plans that help our clients reach their full potential.
                          </p>
                        </div>
                      </div>
                      <Separator />
                    </>
                  )}

                  {/* Section 1: Position & Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <Label className="text-muted-foreground font-normal">Position Type</Label>
                      <div className="font-medium flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                        {positionType === "rbt" ? "Registered Behavior Technician (RBT)" : "Board Certified Behavior Analyst (BCBA)"}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-muted-foreground font-normal">Location</Label>
                      <div className="font-medium flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        {zipCode} (Atlanta, GA)
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Section 2: Employment Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <Label className="text-muted-foreground font-normal">Employment Type</Label>
                      <div className="font-medium">Full-time</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-muted-foreground font-normal">Schedule</Label>
                      <div className="font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        Weekdays
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-muted-foreground font-normal">Hourly Rate</Label>
                      <div className="font-medium text-green-700 font-semibold">$25 - $35 /hr</div>
                    </div>
                  </div>

                  <Separator />

                  {/* Section 3: Description */}
                  <div className="space-y-2">
                     <Label className="text-muted-foreground font-normal">Job Description</Label>
                     <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                       <p>We are looking for a dedicated Registered Behavior Technician (RBT) to join our team. The ideal candidate will have experience working with children with autism and be passionate about making a difference in their lives.</p>
                       <p className="mt-4">Responsibilities include:</p>
                       <ul className="list-disc pl-5 mt-2 space-y-1">
                         <li>Implementing behavior intervention plans</li>
                         <li>Collecting data on client progress</li>
                         <li>Collaborating with BCBAs and other team members</li>
                         <li>Providing support to families</li>
                       </ul>
                     </div>
                  </div>
                </CardContent>
              </Card>

              {/* Apply Dialog */}
              {isProfessionalView && (
                <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Apply for Position</DialogTitle>
                      <DialogDescription>
                        Send a message to the employer along with your application.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="application-message">Message</Label>
                        <Textarea
                          id="application-message"
                          placeholder="Tell the employer why you're interested in this position..."
                          value={applicationMessage}
                          onChange={(e) => setApplicationMessage(e.target.value)}
                          className="min-h-[120px]"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsApplyDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => {
                        // TODO: Submit application
                        console.log("Submitting application", { message: applicationMessage });
                        setIsApplyDialogOpen(false);
                        setApplicationMessage("");
                      }}>
                        Send Application
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </>
          ) : (
            /* EDIT MODE - Original Forms */
            <>
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Position Details</CardTitle>
                  <CardDescription>Basic information about the role.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="position-type">Position Type</Label>
                    <Select value={positionType} onValueChange={setPositionType}>
                      <SelectTrigger id="position-type">
                        <SelectValue placeholder="Select position type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rbt">Registered Behavior Technician (RBT)</SelectItem>
                        <SelectItem value="bcba">Board Certified Behavior Analyst (BCBA)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location (ZIP Code)</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="location" 
                        placeholder="Enter ZIP code" 
                        className="pl-9" 
                        maxLength={5}
                        value={zipCode}
                        onChange={handleZipCodeChange}
                      />
                      {locationValid && (
                        <Check className="absolute right-3 top-2.5 h-4 w-4 text-green-600" />
                      )}
                    </div>
                    {isValidatingLocation && <p className="text-xs text-muted-foreground">Checking distance from Atlanta...</p>}
                    {locationError && (
                      <Alert variant="destructive" className="mt-2">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Location Unavailable</AlertTitle>
                        <AlertDescription>{locationError}</AlertDescription>
                      </Alert>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Jobs must be located within 100 miles of Atlanta, GA.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Employment Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Employment Details</CardTitle>
                  <CardDescription>Schedule and compensation.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Type */}
                  <div className="space-y-3">
                    <Label>Employment Type</Label>
                    <RadioGroup defaultValue="full-time" className="flex gap-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="full-time" id="full-time" />
                        <Label htmlFor="full-time" className="font-normal">Full-time</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="part-time" id="part-time" />
                        <Label htmlFor="part-time" className="font-normal">Part-time</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="contract" id="contract" />
                        <Label htmlFor="contract" className="font-normal">Contract</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />

                  {/* Schedule */}
                  <div className="space-y-3">
                    <Label>Schedule Preferences</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="weekdays" defaultChecked />
                        <Label htmlFor="weekdays" className="font-normal">Weekdays</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="weekends" />
                        <Label htmlFor="weekends" className="font-normal">Weekends</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="evenings" />
                        <Label htmlFor="evenings" className="font-normal">Evenings</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="school-hours" />
                        <Label htmlFor="school-hours" className="font-normal">School Hours</Label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Rate */}
                  <div className="space-y-3">
                    <Label>Hourly Rate Range</Label>
                    <div className="flex items-center gap-4">
                      <div className="relative flex-1">
                        <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Min" className="pl-9" type="number" defaultValue="25" />
                      </div>
                      <span className="text-muted-foreground">-</span>
                      <div className="relative flex-1">
                        <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Max" className="pl-9" type="number" defaultValue="35" />
                      </div>
                      <span className="text-sm text-muted-foreground">/hr</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                  <CardDescription>Detailed overview of the role and responsibilities.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    placeholder="Enter full job description here..." 
                    className="min-h-[300px] leading-relaxed"
                    defaultValue="We are looking for a dedicated RBT to join our team..."
                  />
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => router.push(`/listing/${params.id}?mode=view`)}>Cancel</Button>
                <Button onClick={() => router.push(`/listing/${params.id}?mode=view`)}>Save Changes</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}