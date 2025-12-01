import { Avatar } from "./Avatar";
import { cn } from "@/lib/utils";
import { Check, CheckCheck, Users, Users2 } from "lucide-react";

export interface ChatListItemProps {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isOnline?: boolean;
  isSelected?: boolean;
  isTyping?: boolean;
  isGroup?: boolean;
  isMuted?: boolean;
  isPinned?: boolean;
  lastMessageStatus?: "sent" | "delivered" | "read";
  type?: "chat" | "group" | "channel" | "bot";
  onClick?: () => void;
}

export function ChatListItem({
  id,
  name,
  avatar,
  lastMessage,
  timestamp,
  unreadCount = 0,
  isOnline = false,
  isSelected = false,
  isTyping = false,
  isGroup = false,
  isMuted = false,
  lastMessageStatus,
  type = "chat",
  onClick,
}: ChatListItemProps) {
  const getTypeLabel = () => {
    switch (type) {
      case "group":
        return { label: "Group", icon: Users2 };
      case "channel":
        return { label: "Channel", icon: null };
      case "bot":
        return { label: "Bot", icon: null };
      default:
        return null;
    }
  };

  const typeInfo = getTypeLabel();

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-3 py-2 cursor-pointer hover-elevate active-elevate-2 rounded-md",
        isSelected && "bg-accent"
      )}
      data-testid={`chat-item-${id}`}
    >
      <div className="relative flex-shrink-0">
        <Avatar
          src={avatar}
          name={name}
          size="lg"
          isOnline={isOnline}
          showStatus={!isGroup}
        />
        {isGroup && (
          <span className="absolute -bottom-0.5 -right-0.5 bg-primary rounded-full p-0.5">
            <Users className="h-2.5 w-2.5 text-primary-foreground" />
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            <span className="font-semibold text-sm truncate">{name}</span>
            {typeInfo && (
              <span className="flex items-center gap-1 px-1.5 py-0.5 bg-primary/20 rounded-md flex-shrink-0 text-xs">
                {typeInfo.icon && (
                  <typeInfo.icon className="h-3 w-3 text-primary" />
                )}
                <span className="font-medium text-primary text-xs">
                  {typeInfo.label}
                </span>
              </span>
            )}
          </div>
        </div>
        {timestamp && (
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex-1"></div>
            <span className="text-xs text-muted-foreground flex-shrink-0">
              {timestamp}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <div className="flex items-center gap-1 min-w-0 flex-1">
            {lastMessageStatus && !isTyping && (
              <span className="flex-shrink-0">
                {lastMessageStatus === "read" ? (
                  <CheckCheck className="h-3.5 w-3.5 text-primary" />
                ) : (
                  <Check className="h-3.5 w-3.5 text-muted-foreground" />
                )}
              </span>
            )}
            <span
              className={cn(
                "text-sm truncate",
                isTyping ? "text-primary italic" : "text-muted-foreground"
              )}
            >
              {isTyping ? "typing..." : lastMessage}
            </span>
          </div>
          {unreadCount > 0 && (
            <span
              className={cn(
                "flex-shrink-0 min-w-5 h-5 px-1.5 rounded-full text-xs font-medium flex items-center justify-center",
                isMuted
                  ? "bg-muted text-muted-foreground"
                  : "bg-primary text-primary-foreground"
              )}
              data-testid={`unread-count-${id}`}
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
