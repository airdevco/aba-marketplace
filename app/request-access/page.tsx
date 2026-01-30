"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building } from "lucide-react";

export default function RequestAccessPage() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [yourName, setYourName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: API call to save employer access request
    // Mock delay for submission
    await new Promise(resolve => setTimeout(resolve, 800));

    // Navigate to confirmation page
    router.push("/request-access/confirmation");
  };

  return (
    <div className="min-h-screen bg-gray-50/30 flex items-center justify-center p-4 pb-12">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/login">
            <img
              src="https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769551902030x600833303719120300/aba.png"
              alt="Behavoya"
              className="h-10 w-auto object-contain cursor-pointer"
            />
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-3 text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Building className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Request Employer Access</CardTitle>
            <CardDescription className="text-base max-w-md mx-auto">
              Looking to hire ABA professionals? Submit your information and we&apos;ll be in touch to set up your account.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Name */}
              <div className="space-y-2">
                <Label htmlFor="companyName">Company name</Label>
                <Input
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter your company name"
                />
              </div>

              {/* Your Name */}
              <div className="space-y-2">
                <Label htmlFor="yourName">Your name</Label>
                <Input
                  id="yourName"
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              {/* Work Email */}
              <div className="space-y-2">
                <Label htmlFor="workEmail">Work email</Label>
                <Input
                  id="workEmail"
                  type="email"
                  value={workEmail}
                  onChange={(e) => setWorkEmail(e.target.value)}
                  placeholder="your.name@company.com"
                />
                <p className="text-xs text-muted-foreground">
                  Please use your work email address
                </p>
              </div>

              {/* Optional Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Brief message (Optional)</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your hiring needs, team size, or any questions you have..."
                  className="min-h-[120px] resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Request Access"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
