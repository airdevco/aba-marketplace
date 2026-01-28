"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement authentication logic
    if (isSignUp) {
      console.log("Sign up", { firstName, lastName, email, password, agreedToTerms });
    } else {
      console.log("Log in", { email, password });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center bg-background p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <img
              src="https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769551902030x600833303719120300/aba.png"
              alt="ABA Marketplace"
              className="h-16 w-auto"
            />
          </div>

          {/* Card */}
          <Card className="shadow-md">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-3xl font-bold">
                {isSignUp ? "Sign up" : "Log in"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {isSignUp && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="h-11"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                {isSignUp && (
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                      required
                    />
                    <Label
                      htmlFor="terms"
                      className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                )}

                {isSignUp ? (
                  <Button asChild className="w-full h-11 text-base font-medium" size="lg">
                    <Link href="/onboarding">Sign up</Link>
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full h-11 text-base font-medium"
                    size="lg"
                  >
                    Log in
                  </Button>
                )}
              </form>

              <div className="text-center text-sm text-muted-foreground">
                {isSignUp ? (
                  <>
                    Have an account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setIsSignUp(false);
                        setAgreedToTerms(false);
                        setFirstName("");
                        setLastName("");
                      }}
                      className="text-primary hover:underline font-medium"
                    >
                      Log in
                    </button>
                  </>
                ) : (
                  <>
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsSignUp(true)}
                      className="text-primary hover:underline font-medium"
                    >
                      Sign up
                    </button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Section - Promotional Content */}
      <div className="flex-1 bg-gradient-to-br from-primary via-primary/95 to-primary/90 relative overflow-hidden hidden lg:flex flex-col items-center justify-center p-12">
        {/* Modern Dotted Pattern Background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle, currentColor 1.5px, transparent 1.5px)`,
            backgroundSize: "32px 32px",
            color: "hsl(var(--primary-foreground))",
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-50" />

        <div className="relative z-10 max-w-lg space-y-10">
          {/* Modern Testimonial Card */}
          <Card className="bg-white shadow-2xl border-0">
            <CardContent className="p-8 space-y-5">
              <div className="flex items-start gap-5">
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                    alt="ABA Professional"
                    className="w-20 h-20 rounded-full object-cover border border-gray-300"
                  />
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-base font-semibold text-foreground">Sarah Hammer</p>
                  <p className="text-sm text-muted-foreground font-medium">Atlanta, GA</p>
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 fill-yellow-400"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                &quot;ABA Marketplace has transformed how I find opportunities. The platform connects me
                with quality clinics in Georgia, and the application process is seamless. I&apos;ve found
                my ideal position through this marketplace.&quot;
              </p>
            </CardContent>
          </Card>

          {/* Modern App Description */}
          <div className="space-y-6 text-primary-foreground">
            <div>
              <h2 className="text-4xl font-bold leading-tight">
                Connect with Georgia&apos;s top ABA opportunities
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-lg leading-relaxed opacity-95 font-light">
                ABA Marketplace is the premier platform connecting RBTs and BCBAs with clinics and
                employers across Georgia. Whether you&apos;re a therapist seeking your next role or an
                employer looking for qualified professionals, we make the connection simple and
                efficient.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-300" />
                  <span className="text-sm opacity-90">Verified professionals</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-300" />
                  <span className="text-sm opacity-90">Quick matching</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-300" />
                  <span className="text-sm opacity-90">Georgia focused</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
