import { Avatar } from "./Avatar";
import { Button } from "@/components/ui/button";
import { Phone, Video, Search, MoreVertical, ArrowLeft, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface ChatHeaderProps {
  name: string;
  avatar?: string;
  isOnline?: boolean;
  lastSeen?: string;
  isGroup?: boolean;
  memberCount?: number;
  onBack?: () => void;
  onProfileClick?: () => void;
  onSearchClick?: () => void;
  showBackButton?: boolean;
}

export function ChatHeader({
  name,
  avatar,
  isOnline = false,
  lastSeen,
  isGroup = false,
  memberCount,
  onBack,
  onProfileClick,
  onSearchClick,
  showBackButton = false,
}: ChatHeaderProps) {
  return (
    <header className="h-14 border-b flex items-center justify-between px-2 gap-2 bg-background sticky top-0 z-10">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {showBackButton && (
          <Button
            size="icon"
            variant="ghost"
            onClick={onBack}
            data-testid="button-back"
          >
            <ArrowLeft className="h-9 w-9" />
          </Button>
        )}
        <button
          onClick={onProfileClick}
          className="flex items-center gap-3 min-w-0 flex-1 hover-elevate active-elevate-2 rounded-md px-2 py-1 -ml-2"
          data-testid="button-profile"
        >
          <Avatar
            src={avatar}
            name={name}
            size="md"
            isOnline={isOnline}
            showStatus={!isGroup}
          />
          <div className="text-left min-w-0">
            <h2 className="font-semibold text-sm truncate">{name}</h2>
            <p className="text-xs text-muted-foreground truncate">
              {isGroup ? (
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {memberCount} members
                </span>
              ) : isOnline ? (
                "online"
              ) : (
                lastSeen || "offline"
              )}
            </p>
          </div>
        </button>
      </div>
      <div className="flex items-center gap-1">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => console.log("Voice call")}
          data-testid="button-voice-call"
        >
          <Phone className="h-9 w-9" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => console.log("Video call")}
          data-testid="button-video-call"
        >
          <Video className="h-9 w-9" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={onSearchClick}
          data-testid="button-search-chat"
        >
          <Search className="h-9 w-9" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" data-testid="button-chat-menu">
              <MoreVertical className="h-9 w-9" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => console.log("View profile")}>
              View profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Mute notifications")}>
              Mute notifications
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Search")}>
              Search
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log("Clear history")}>
              Clear history
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Delete chat")}
              className="text-destructive"
            >
              Delete chat
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
