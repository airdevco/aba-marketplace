import { cn } from "@/lib/utils";

const ANONYMOUS_RBT_IMAGE = "/avatar-rbt.svg";
const ANONYMOUS_BCBA_IMAGE = "/avatar-bcba.svg";

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

/**
 * Generic avatar for anonymous RBT candidates (directory/profile to employers)
 */
export function GenericRBTAvatar({ size = "md", className }: GenericAvatarProps) {
  return (
    <img
      src={ANONYMOUS_RBT_IMAGE}
      alt="RBT Candidate"
      className={cn("rounded-full object-cover border border-border", sizeClasses[size], className)}
    />
  );
}

/**
 * Generic avatar for anonymous BCBA candidates (directory/profile to employers)
 */
export function GenericBCBAAvatar({ size = "md", className }: GenericAvatarProps) {
  return (
    <img
      src={ANONYMOUS_BCBA_IMAGE}
      alt="BCBA Candidate"
      className={cn("rounded-full object-cover border border-border", sizeClasses[size], className)}
    />
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
