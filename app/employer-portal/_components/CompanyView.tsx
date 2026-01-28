"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function CompanyView() {
  const [companyName, setCompanyName] = useState("Airdev, Inc.");
  const [companyLocation, setCompanyLocation] = useState("30308");
  const [companyDescription, setCompanyDescription] = useState("We provide top-tier ABA therapy services across the Atlanta metropolitan area.");
  const [companyLogo, setCompanyLogo] = useState<string | null>("https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769558510329x965473798247719000/1024favicon.png");
  const [companyLocationError, setCompanyLocationError] = useState("");

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateLocation = (zip: string) => {
    if (!zip) {
      setCompanyLocationError("");
      return;
    }
    // Simple mock validation
    const atlantaZipCodes = ["30301", "30302", "30303", "30304", "30305", "30306", "30307", "30308", "30309", "30310"];
    const isNearAtlanta = atlantaZipCodes.some((code) => zip.startsWith(code.substring(0, 3)));

    if (!isNearAtlanta && zip.length === 5) {
      setCompanyLocationError("Note: Your organization appears to be outside our primary service area (Atlanta > 100 miles). You can proceed, but please note our candidate pool is currently focused in Georgia.");
    } else {
      setCompanyLocationError("");
    }
  };

  const handleLocationChange = (value: string) => {
    setCompanyLocation(value);
    if (value.length === 5) {
      validateLocation(value);
    } else {
      setCompanyLocationError("");
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Company Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your organization&apos;s public information</p>
      </div>

      <Card className="shadow-md">
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Company Logo Upload */}
            <div>
              <Label className="text-sm font-medium mb-1 block text-center">Company Logo</Label>
              <div className="flex justify-center">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="company-logo-upload"
                />
                {companyLogo ? (
                  <label htmlFor="company-logo-upload" className="cursor-pointer">
                    <img
                      src={companyLogo}
                      alt="Company Logo"
                      className="w-24 h-24 rounded-lg object-contain border-2 border-border p-1 bg-white hover:opacity-80 transition-opacity"
                    />
                  </label>
                ) : (
                  <label htmlFor="company-logo-upload" className="cursor-pointer">
                    <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center border-2 border-dashed border-muted-foreground/30 hover:border-primary hover:bg-muted/50 transition-all">
                      <span className="text-muted-foreground text-xs">Click to upload</span>
                    </div>
                  </label>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyLocation">Location (ZIP Code)</Label>
              <Input
                id="companyLocation"
                value={companyLocation}
                onChange={(e) => handleLocationChange(e.target.value)}
                placeholder="Enter ZIP code"
                maxLength={5}
              />
              {companyLocationError && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md mt-2">
                  <p className="text-sm text-yellow-800 flex gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                    {companyLocationError}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyDescription">Description</Label>
              <Textarea
                id="companyDescription"
                className="min-h-[120px]"
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
                placeholder="Tell us about your organization..."
              />
            </div>

            <div className="pt-4 flex gap-4">
              <Button className="flex-1">Save Changes</Button>
              <Button variant="outline" className="flex-1">Discard</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
