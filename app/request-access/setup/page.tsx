"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function EmployerSetupPage() {
  const router = useRouter();
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [companyLocationError, setCompanyLocationError] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");

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

  const handleCompanyLocationChange = (value: string) => {
    setCompanyLocation(value);
    if (value.length === 5) {
      const atlantaZipCodes = ["30301", "30302", "30303", "30304", "30305", "30306", "30307", "30308", "30309", "30310"];
      const isNearAtlanta = atlantaZipCodes.some((code) => value.startsWith(code.substring(0, 3)));
      if (!isNearAtlanta) {
        setCompanyLocationError("We currently only service the Atlanta area (within 100 miles).");
      } else {
        setCompanyLocationError("");
      }
    } else {
      setCompanyLocationError("");
    }
  };

  const handleContinue = () => {
    // TODO: API call to save company information to pending account
    router.push("/employer-portal");
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Header */}
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/login" className="flex items-center gap-2">
            <img
              src="https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769551902030x600833303719120300/aba.png"
              alt="Behavoya"
              className="h-10 w-auto"
            />
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-xl mx-auto mt-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-foreground mb-1">Company Information</h1>
            <p className="text-lg text-muted-foreground">Tell us about your organization</p>
          </div>

          {/* Pending Access Banner */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Account Pending Approval:</strong> Your access request has been submitted. You can complete your profile now, and we&apos;ll notify you once your account is approved.
            </p>
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
                      <div className="relative group cursor-pointer">
                        <label htmlFor="company-logo-upload" className="cursor-pointer">
                          <img
                            src={companyLogo}
                            alt="Company Logo"
                            className="w-24 h-24 rounded-lg object-contain border-2 border-border p-1 bg-white hover:opacity-80 transition-opacity"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCompanyLogo(null);
                          }}
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center hover:bg-destructive/90 transition-colors"
                        >
                          ×
                        </button>
                      </div>
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
                    onChange={(e) => handleCompanyLocationChange(e.target.value)}
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

                <div className="pt-4">
                  <Button 
                    type="button"
                    onClick={handleContinue}
                    className="w-full h-12 text-base font-medium"
                  >
                    Continue to Dashboard
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
