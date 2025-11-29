import { Avatar as ShadAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  isOnline?: boolean;
  showStatus?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-14 w-14",
};

const statusSizeClasses = {
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3",
  xl: "h-3.5 w-3.5",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name: string): string {
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-yellow-500",
    "bg-lime-500",
    "bg-green-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-sky-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-violet-500",
    "bg-purple-500",
    "bg-fuchsia-500",
    "bg-pink-500",
    "bg-rose-500",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

export function Avatar({
  src,
  name,
  size = "md",
  isOnline = false,
  showStatus = false,
  className,
}: AvatarProps) {
  return (
    <div className="relative inline-block">
      <ShadAvatar className={cn(sizeClasses[size], className)}>
        <AvatarImage src={src} alt={name} />
        <AvatarFallback className={cn(getAvatarColor(name), "text-white font-medium")}>
          {getInitials(name)}
        </AvatarFallback>
      </ShadAvatar>
      {showStatus && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-background",
            statusSizeClasses[size],
            isOnline ? "bg-status-online" : "bg-status-offline"
          )}
          data-testid={`status-indicator-${isOnline ? "online" : "offline"}`}
        />
      )}
    </div>
  );
}
