"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardView from "./_components/DashboardView";
import JobsView from "./_components/JobsView";
import TeamView from "./_components/TeamView";
import CompanyView from "./_components/CompanyView";

export default function EmployerPortalPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab");

  // Redirect to dashboard if no tab is specified
  useEffect(() => {
    if (!tab) {
      router.replace("/employer-portal?tab=dashboard");
    }
  }, [tab, router]);

  // Show loading or nothing while redirecting
  if (!tab) {
    return null;
  }

  switch (tab) {
    case "jobs":
      return <JobsView />;
    case "team":
      return <TeamView />;
    case "company":
      return <CompanyView />;
    case "dashboard":
    default:
      return <DashboardView />;
  }
}
