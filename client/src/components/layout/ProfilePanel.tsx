import { Avatar } from "../chat/Avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  X,
  Bell,
  BellOff,
  UserPlus,
  Ban,
  Trash2,
  Image,
  FileText,
  Link2,
  Music,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfilePanelProps {
  name: string;
  avatar?: string;
  isOnline?: boolean;
  lastSeen?: string;
  bio?: string;
  phone?: string;
  username?: string;
  isGroup?: boolean;
  memberCount?: number;
  isMuted?: boolean;
  sharedMedia?: { type: "image" | "file" | "link" | "audio"; count: number }[];
  onClose: () => void;
  onMuteToggle?: () => void;
}

export function ProfilePanel({
  name,
  avatar,
  isOnline = false,
  lastSeen,
  bio,
  phone,
  username,
  isGroup = false,
  memberCount,
  isMuted = false,
  sharedMedia = [],
  onClose,
  onMuteToggle,
}: ProfilePanelProps) {
  const mediaIcons = {
    image: Image,
    file: FileText,
    link: Link2,
    audio: Music,
  };

  const mediaLabels = {
    image: "Photos",
    file: "Files",
    link: "Links",
    audio: "Audio",
  };

  return (
    <div className="w-80 border-l bg-background h-full flex flex-col">
      <header className="h-14 border-b flex items-center justify-between px-4">
        <h2 className="font-semibold">
          {isGroup ? "Group Info" : "User Info"}
        </h2>
        <Button
          size="icon"
          variant="ghost"
          onClick={onClose}
          data-testid="button-close-profile"
        >
          <X className="h-5 w-5" />
        </Button>
      </header>

      <ScrollArea className="flex-1">
        <div className="p-6 flex flex-col items-center text-center border-b">
          <Avatar
            src={avatar}
            name={name}
            size="xl"
            isOnline={isOnline}
            showStatus={!isGroup}
            className="h-24 w-24 text-3xl"
          />
          <h3 className="mt-4 text-xl font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">
            {isGroup
              ? `${memberCount} members`
              : isOnline
              ? "online"
              : lastSeen || "offline"}
          </p>
        </div>

        <div className="p-4 border-b">
          {bio && (
            <div className="mb-4">
              <span className="text-xs text-muted-foreground">Bio</span>
              <p className="text-sm mt-1">{bio}</p>
            </div>
          )}
          {username && (
            <div className="mb-4">
              <span className="text-xs text-muted-foreground">Username</span>
              <p className="text-sm mt-1 text-primary">@{username}</p>
            </div>
          )}
          {phone && (
            <div>
              <span className="text-xs text-muted-foreground">Phone</span>
              <p className="text-sm mt-1">{phone}</p>
            </div>
          )}
        </div>

        {sharedMedia.length > 0 && (
          <div className="p-4 border-b">
            <h4 className="text-sm font-medium mb-3">Shared Media</h4>
            <div className="grid grid-cols-4 gap-2">
              {sharedMedia.map((media) => {
                const Icon = mediaIcons[media.type];
                return (
                  <button
                    key={media.type}
                    className="flex flex-col items-center gap-1 p-2 rounded-md hover-elevate active-elevate-2"
                    onClick={() => console.log(`View ${media.type}`)}
                    data-testid={`button-media-${media.type}`}
                  >
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {media.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="p-4 space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3"
            onClick={onMuteToggle}
            data-testid="button-mute"
          >
            {isMuted ? (
              <>
                <Bell className="h-5 w-5" />
                Unmute notifications
              </>
            ) : (
              <>
                <BellOff className="h-5 w-5" />
                Mute notifications
              </>
            )}
          </Button>
          {!isGroup && (
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
              onClick={() => console.log("Add to contacts")}
              data-testid="button-add-contact"
            >
              <UserPlus className="h-5 w-5" />
              Add to contacts
            </Button>
          )}
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-destructive hover:text-destructive"
            onClick={() => console.log("Block user")}
            data-testid="button-block"
          >
            <Ban className="h-5 w-5" />
            {isGroup ? "Leave group" : "Block user"}
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-destructive hover:text-destructive"
            onClick={() => console.log("Delete chat")}
            data-testid="button-delete"
          >
            <Trash2 className="h-5 w-5" />
            Delete chat
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
}
