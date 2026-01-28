"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";
import MatchesView from "./_components/MatchesView";
import ApplicationsView from "./_components/ApplicationsView";
import ProfileView from "./_components/ProfileView";

export const dynamic = 'force-dynamic';

function ProfessionalPortalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab");

  // Redirect to dashboard if no tab is specified
  useEffect(() => {
    if (!tab) {
      router.replace("/professional-portal?tab=dashboard");
    }
  }, [tab, router]);

  // Show loading or nothing while redirecting
  if (!tab) {
    return null;
  }

  switch (tab) {
    case "jobs":
      return <ApplicationsView />;
    case "profile":
      return <ProfileView />;
    case "dashboard":
    default:
      return <MatchesView />;
  }
}

export default function ProfessionalPortalPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <ProfessionalPortalContent />
    </Suspense>
  );
}