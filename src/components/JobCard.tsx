import Link from "next/link";
import { MapPin, Clock, DollarSign, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

export type JobCardData = {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  employmentType: string;
  rate: string;
  compensationType: "hourly" | "salary" | "both";
  schedulePreference: "standard" | "flexible";
  telehealthOnly: boolean;
  workSettings: string[];
  schedule: string[];
  licensed: boolean;
  benefits?: string[];
  postedDays: number;
  matchScore?: number;
  description?: string;
  zipCode?: string;
  role?: string;
};

type JobCardProps = {
  job: JobCardData;
  href: string;
  linkTarget?: "_blank" | "_self";
  showExternalIcon?: boolean;
};

export function JobCard({ job, href, linkTarget = "_self" }: JobCardProps) {
  const linkProps = linkTarget === "_blank"
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <div className="bg-white rounded-xl border shadow-sm p-5 hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full overflow-hidden bg-white border">
            <img src={job.companyLogo} alt="" className="h-7 w-7 object-contain" />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-base">{job.title}</h3>
            <p className="text-sm text-muted-foreground">{job.company}</p>
          </div>
        </div>
        <Button size="sm" asChild className="shrink-0">
          <Link href={href} {...linkProps}>
            View & Apply
          </Link>
        </Button>
      </div>

      {/* Condensed fields row with icons */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {job.location}
        </span>
        <span className="flex items-center gap-1">
          <DollarSign className="h-3.5 w-3.5" />
          {job.rate}
        </span>
        <span className="flex items-center gap-1">
          <Briefcase className="h-3.5 w-3.5" />
          {job.employmentType}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {job.schedule.join(", ") || "Flexible"}
        </span>
      </div>

      {/* Job description - 2 line clamp */}
      {job.description && (
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
          {job.description}
        </p>
      )}
    </div>
  );
}
