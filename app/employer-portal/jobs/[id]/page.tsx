"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Info, AlertTriangle, Check, MapPin, DollarSign, Clock, Calendar } from "lucide-react";
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

export default function JobListingPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [positionType, setPositionType] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [isValidatingLocation, setIsValidatingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [locationValid, setLocationValid] = useState(false);
  
  // Mock validation for ZIP code
  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setZipCode(value);
    setLocationValid(false);
    setLocationError(null);

    if (value.length === 5) {
      setIsValidatingLocation(true);
      // Simulate API call
      setTimeout(() => {
        setIsValidatingLocation(false);
        // Mock logic: 303xx are usually Atlanta. 
        // Let's just say any zip starting with '9' is too far for this demo
        if (value.startsWith("9")) {
          setLocationError("Location is more than 100 miles from Atlanta. We currently only support the Greater Atlanta area.");
        } else {
          setLocationValid(true);
        }
      }, 800);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary" asChild>
          <Link href="/employer-portal?tab=dashboard">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Job Listing Details</h1>
            <p className="text-muted-foreground mt-1">Manage the details and requirements for this position.</p>
          </div>
          <div className="flex items-center gap-3">
             <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200">
               Active
             </span>
             <Button variant="outline" className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20">
               Close Listing
             </Button>
             <Button>Save Changes</Button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-8">
          
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
                    <SelectItem value="bcaba">Board Certified Assistant Behavior Analyst (BCaBA)</SelectItem>
                    <SelectItem value="analyst">Behavior Analyst</SelectItem>
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
                    <Checkbox id="weekdays" />
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
                    <Input placeholder="Min" className="pl-9" type="number" />
                  </div>
                  <span className="text-muted-foreground">-</span>
                  <div className="relative flex-1">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Max" className="pl-9" type="number" />
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
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="bg-muted/30 border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-base">Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p>Be specific about schedule requirements to find the best matching candidates.</p>
              </div>
              <div className="flex gap-3">
                <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p>Competitive rates for RBTs in Atlanta range from $22-$28/hr based on experience.</p>
              </div>
            </CardContent>
          </Card>

           <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Candidate Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6 space-y-2">
                <div className="text-3xl font-bold">12</div>
                <p className="text-sm text-muted-foreground">Qualified Candidates Nearby</p>
                <Button variant="link" className="text-primary text-xs">View Candidates</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
