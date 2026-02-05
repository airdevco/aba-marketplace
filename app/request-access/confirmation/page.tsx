"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function RequestAccessConfirmationPage() {
  return (
    <div className="min-h-screen bg-gray-50/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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
          <CardHeader className="space-y-4 text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Thank you</CardTitle>
            <CardDescription className="text-base">
              We&apos;ve received your request and will be in touch shortly to set up your account.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-left">
              <p className="text-blue-900 font-semibold mb-2">
                What&apos;s next?
              </p>
              <p className="text-blue-800">
                We&apos;ll activate your account once approved (typically within 1-2 business days).
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
