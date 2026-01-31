import Link from "next/link";
import { MapPin, Clock, Award, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
};

type JobCardProps = {
  job: JobCardData;
  href: string;
  linkTarget?: "_blank" | "_self";
  showExternalIcon?: boolean;
};

export function JobCard({ job, href, linkTarget = "_self", showExternalIcon = false }: JobCardProps) {
  const linkProps = linkTarget === "_blank" 
    ? { target: "_blank", rel: "noopener noreferrer" } 
    : {};

  return (
    <Card className="overflow-hidden hover:border-primary/50 transition-colors flex flex-col h-full">
      <CardHeader className="pb-2 pt-4 px-4 bg-muted/20">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full overflow-hidden bg-white border">
            <img src={job.companyLogo} alt="" className="h-7 w-7 object-contain" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-base font-semibold">{job.title}</CardTitle>
              {job.matchScore && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 shrink-0 text-xs font-normal">
                  {job.matchScore}% Match
                </Badge>
              )}
            </div>
            <p className="text-sm font-medium text-foreground mt-1">
              {job.employmentType} · {job.rate}
            </p>
            <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="h-3.5 w-3.5 shrink-0" /> {job.location}
            </div>
            {job.licensed ? (
              <div className="flex items-center gap-1.5 mt-1.5">
                <Award className="h-3.5 w-3.5 text-green-600 shrink-0" />
                <span className="text-sm font-medium text-green-700">Licensed Position</span>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground mt-1.5">No license required</p>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-3 pb-3 px-4 flex-1 min-h-0">
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium block">Posted</span>
            <span className="font-medium flex items-center gap-1.5 mt-0.5">
              <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              {job.postedDays === 1 ? "1 day ago" : job.postedDays < 7 ? `${job.postedDays} days ago` : job.postedDays === 7 ? "1 week ago" : `${Math.floor(job.postedDays / 7)} weeks ago`}
            </span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium block">Compensation</span>
            <span className="font-medium mt-0.5 capitalize">{job.compensationType === "both" ? "Hourly or salary" : job.compensationType}</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium block">Telehealth</span>
            <span className="font-medium mt-0.5">{job.telehealthOnly ? "Yes" : "No"}</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium block">Schedule</span>
            <span className="font-medium mt-0.5">{job.schedulePreference === "standard" ? "Standard FT" : "Flexible"}</span>
          </div>
          {job.workSettings.length > 0 && (
            <div className="col-span-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium block">Work Setting</span>
              <div className="flex flex-wrap gap-1.5 mt-0.5">{job.workSettings.map((s, i) => <Badge key={i} variant="outline" className="text-xs font-normal py-0.5 px-2 h-5 bg-gray-50">{s}</Badge>)}</div>
            </div>
          )}
          {job.schedule.length > 0 && (
            <div className="col-span-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium block">Availability</span>
              <div className="flex flex-wrap gap-1.5 mt-0.5">{job.schedule.map((d, i) => <Badge key={i} variant="outline" className="text-xs font-normal py-0.5 px-2 h-5 bg-gray-50">{d}</Badge>)}</div>
            </div>
          )}
          {job.benefits && job.benefits.length > 0 && (
            <div className="col-span-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium block">Benefits</span>
              <div className="flex flex-wrap gap-1.5 mt-0.5 items-center">
                {job.benefits.slice(0, 2).map((benefit, i) => (
                  <Badge key={i} variant="outline" className="text-xs font-normal py-0.5 px-2 h-5 bg-gray-50">
                    {benefit}
                  </Badge>
                ))}
                {job.benefits.length > 2 && (
                  <span className="text-xs text-muted-foreground">+{job.benefits.length - 2} more</span>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/10 pt-3 pb-4 px-4 flex gap-2 shrink-0">
        <Button className="flex-1 gap-2" asChild>
          <Link href={href} {...linkProps}>
            {showExternalIcon && <ExternalLink className="h-4 w-4" />}
            View & Apply
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
