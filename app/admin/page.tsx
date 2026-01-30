"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";
import DashboardView from "./_components/DashboardView";
import OrganizationsView from "./_components/OrganizationsView";
import JobsView from "./_components/JobsView";
import ProfessionalsView from "./_components/ProfessionalsView";
import ConnectionsView from "./_components/ConnectionsView";

export const dynamic = 'force-dynamic';

function AdminPortalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab");

  // Redirect to dashboard if no tab is specified
  useEffect(() => {
    if (!tab) {
      router.replace("/admin?tab=dashboard");
    }
  }, [tab, router]);

  // Show loading or nothing while redirecting
  if (!tab) {
    return null;
  }

  switch (tab) {
    case "organizations":
      return <OrganizationsView />;
    case "jobs":
      return <JobsView />;
    case "professionals":
      return <ProfessionalsView />;
    case "connections":
      return <ConnectionsView />;
    case "dashboard":
    default:
      return <DashboardView />;
  }
}

export default function AdminPortalPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <AdminPortalContent />
    </Suspense>
  );
}
