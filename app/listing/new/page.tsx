"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, AlertTriangle, Check, MapPin, DollarSign } from "lucide-react";
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
import HeaderWithProfile from "@/components/HeaderWithProfile";

export default function CreateJobPage() {
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

      <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
        {/* Navigation */}
        <div className="space-y-4">
          <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary" asChild>
            <Link href="/employer-portal?tab=jobs">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Post a New Job</h1>
              <p className="text-muted-foreground mt-1">Create a listing to find an ABA professional.</p>
            </div>
            <div className="flex items-center gap-3">
               <Button variant="outline">Save as Draft</Button>
               <Button onClick={() => router.push('/listing/SDWER3?mode=view')}>Publish Listing</Button>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="space-y-8">
            
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
      </div>
    </div>
  );
}
