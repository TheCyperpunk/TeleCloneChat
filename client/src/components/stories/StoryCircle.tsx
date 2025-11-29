import { Avatar } from "../chat/Avatar";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface StoryCircleProps {
  id: string;
  name: string;
  avatar?: string;
  isViewed?: boolean;
  isOwn?: boolean;
  hasStory?: boolean;
  onClick?: () => void;
}

export function StoryCircle({
  id,
  name,
  avatar,
  isViewed = false,
  isOwn = false,
  hasStory = true,
  onClick,
}: StoryCircleProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 min-w-[72px] py-2"
      data-testid={`story-circle-${id}`}
    >
      <div
        className={cn(
          "relative p-[2px] rounded-full",
          hasStory && !isViewed && "bg-gradient-to-tr from-primary to-blue-400",
          hasStory && isViewed && "bg-muted",
          !hasStory && "bg-transparent"
        )}
      >
        <div className="bg-background rounded-full p-0.5">
          <Avatar src={avatar} name={name} size="xl" />
        </div>
        {isOwn && !hasStory && (
          <span className="absolute bottom-0 right-0 bg-primary rounded-full p-0.5 border-2 border-background">
            <Plus className="h-3 w-3 text-primary-foreground" />
          </span>
        )}
      </div>
      <span className="text-xs truncate max-w-[64px] text-muted-foreground">
        {isOwn ? "Your story" : name.split(" ")[0]}
      </span>
    </button>
  );
}
