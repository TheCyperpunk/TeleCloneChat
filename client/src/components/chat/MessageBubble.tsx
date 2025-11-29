import { cn } from "@/lib/utils";
import { Check, CheckCheck } from "lucide-react";
import { Avatar } from "./Avatar";

export interface MessageBubbleProps {
  id: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  senderName?: string;
  senderAvatar?: string;
  status?: "sent" | "delivered" | "read";
  showAvatar?: boolean;
  isFirstInGroup?: boolean;
  isLastInGroup?: boolean;
  replyTo?: {
    name: string;
    content: string;
  };
}

export function MessageBubble({
  id,
  content,
  timestamp,
  isOwn,
  senderName,
  senderAvatar,
  status,
  showAvatar = false,
  isFirstInGroup = true,
  isLastInGroup = true,
  replyTo,
}: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "flex gap-2 px-4",
        isOwn ? "justify-end" : "justify-start",
        isLastInGroup ? "mb-2" : "mb-0.5"
      )}
      data-testid={`message-${id}`}
    >
      {!isOwn && showAvatar && (
        <div className="flex-shrink-0 w-8">
          {isLastInGroup && (
            <Avatar src={senderAvatar} name={senderName || "User"} size="sm" />
          )}
        </div>
      )}
      <div
        className={cn(
          "max-w-[70%] md:max-w-md",
          !isOwn && showAvatar && !isLastInGroup && "ml-10"
        )}
      >
        {isFirstInGroup && !isOwn && senderName && (
          <span className="text-xs font-medium text-primary ml-3 mb-0.5 block">
            {senderName}
          </span>
        )}
        <div
          className={cn(
            "px-3 py-2 relative",
            isOwn
              ? "bg-primary text-primary-foreground rounded-2xl rounded-br-md"
              : "bg-card border border-card-border rounded-2xl rounded-bl-md",
            !isFirstInGroup && isOwn && "rounded-tr-md",
            !isFirstInGroup && !isOwn && "rounded-tl-md",
            !isLastInGroup && isOwn && "rounded-br-2xl",
            !isLastInGroup && !isOwn && "rounded-bl-2xl"
          )}
        >
          {replyTo && (
            <div
              className={cn(
                "mb-1.5 pl-2 border-l-2 text-xs",
                isOwn
                  ? "border-primary-foreground/50 text-primary-foreground/80"
                  : "border-primary text-muted-foreground"
              )}
            >
              <span className="font-medium block">{replyTo.name}</span>
              <span className="line-clamp-1">{replyTo.content}</span>
            </div>
          )}
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
            {content}
          </p>
          <div
            className={cn(
              "flex items-center justify-end gap-1 mt-1 -mb-0.5",
              isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
            )}
          >
            <span className="text-[10px]">{timestamp}</span>
            {isOwn && status && (
              <span className="flex-shrink-0">
                {status === "read" ? (
                  <CheckCheck className="h-3.5 w-3.5" />
                ) : (
                  <Check className="h-3.5 w-3.5" />
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
