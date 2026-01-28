"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Company Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your organization's public information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Organization Details</CardTitle>
          <CardDescription>This information will be visible to candidates on your job listings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Logo Upload */}
          <div>
            <Label className="text-sm font-medium mb-4 block">Company Logo</Label>
            <div className="flex items-start gap-6">
              <div className="relative group cursor-pointer">
                {companyLogo ? (
                  <>
                    <label htmlFor="company-logo-upload" className="cursor-pointer block">
                      <img
                        src={companyLogo}
                        alt="Company Logo"
                        className="w-32 h-32 rounded-lg object-contain border-2 border-border p-2 bg-white hover:border-primary transition-colors"
                      />
                    </label>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full shadow-md"
                      onClick={(e) => {
                        e.preventDefault();
                        setCompanyLogo(null);
                      }}
                    >
                      <span className="text-xs">×</span>
                    </Button>
                  </>
                ) : (
                  <label htmlFor="company-logo-upload" className="cursor-pointer block">
                    <div className="w-32 h-32 rounded-lg bg-muted flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/30 hover:border-primary hover:bg-muted/50 transition-all text-center p-2">
                      <span className="text-muted-foreground text-xs font-medium">Click to upload logo</span>
                    </div>
                  </label>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="company-logo-upload"
                />
              </div>
              <div className="space-y-1 py-2">
                <h4 className="font-medium text-sm">Logo Guidelines</h4>
                <p className="text-xs text-muted-foreground max-w-xs">
                  Upload a high-quality image of your company logo. 
                  Recommended size: 400x400px.
                  Formats: PNG, JPG.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 max-w-2xl">
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
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md mt-2 flex gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-800">{companyLocationError}</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyDescription">Description</Label>
              <Textarea
                id="companyDescription"
                className="min-h-[150px]"
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
                placeholder="Tell us about your organization..."
              />
              <p className="text-xs text-muted-foreground text-right">
                {companyDescription.length} characters
              </p>
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <Button>Save Changes</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
