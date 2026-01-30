import { cn } from "@/lib/utils";
import { Briefcase, GraduationCap } from "lucide-react";

interface GenericAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-20 w-20",
  xl: "h-24 w-24",
};

const iconSizeClasses = {
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-10 w-10",
  xl: "h-12 w-12",
};

/**
 * Generic avatar for RBT candidates
 * Blue color scheme to distinguish from BCBA
 */
export function GenericRBTAvatar({ size = "md", className }: GenericAvatarProps) {
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center bg-blue-100 border-2 border-blue-200",
        sizeClasses[size],
        className
      )}
    >
      <Briefcase className={cn("text-blue-600", iconSizeClasses[size])} />
    </div>
  );
}

/**
 * Generic avatar for BCBA candidates
 * Purple/indigo color scheme to distinguish from RBT
 */
export function GenericBCBAAvatar({ size = "md", className }: GenericAvatarProps) {
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center bg-indigo-100 border-2 border-indigo-200",
        sizeClasses[size],
        className
      )}
    >
      <GraduationCap className={cn("text-indigo-600", iconSizeClasses[size])} />
    </div>
  );
}

/**
 * Convenience component that auto-selects the appropriate avatar based on role type
 */
export interface GenericAvatarByRoleProps extends GenericAvatarProps {
  roleType: "RBT" | "BCBA";
}

export function GenericAvatarByRole({ roleType, size = "md", className }: GenericAvatarByRoleProps) {
  if (roleType === "BCBA") {
    return <GenericBCBAAvatar size={size} className={className} />;
  }
  return <GenericRBTAvatar size={size} className={className} />;
}
