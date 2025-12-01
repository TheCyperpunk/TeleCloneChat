import { cn } from "@/lib/utils";
import { Check, CheckCheck, Play, Link2 } from "lucide-react";
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
  media?: {
    type: "image" | "video" | "audio" | "link";
    url?: string;
    title?: string;
    description?: string;
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
  media,
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
          
          {media && (
            <div className="mb-2">
              {media.type === "image" && media.url && (
                <img 
                  src={media.url} 
                  alt="Message image"
                  className="rounded-lg w-full max-h-64 object-cover"
                />
              )}
              {media.type === "video" && media.url && (
                <div className="relative rounded-lg overflow-hidden bg-black/20 aspect-video">
                  <video
                    src={media.url}
                    className="w-full h-full object-cover"
                    controls
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                    <Play className="w-12 h-12" />
                  </div>
                </div>
              )}
              {media.type === "audio" && media.url && (
                <audio 
                  src={media.url}
                  className="w-full rounded-lg"
                  controls
                />
              )}
              {media.type === "link" && media.url && (
                <a
                  href={media.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "block p-2 rounded-lg border",
                    isOwn
                      ? "bg-primary-foreground/10 border-primary-foreground/20"
                      : "bg-background border-card-border"
                  )}
                >
                  <div className="flex items-start gap-2">
                    <Link2 className="w-4 h-4 flex-shrink-0 mt-1" />
                    <div className="min-w-0">
                      {media.title && (
                        <p className="font-medium text-sm truncate">{media.title}</p>
                      )}
                      {media.description && (
                        <p className="text-xs opacity-75 truncate">{media.description}</p>
                      )}
                      <p className="text-xs opacity-50 truncate">{new URL(media.url).hostname}</p>
                    </div>
                  </div>
                </a>
              )}
            </div>
          )}
          
          {content && (
            <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
              {content}
            </p>
          )}
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
