import { cn } from "@/lib/utils";
import { Check, CheckCheck, Play, Link2, Eye, Download, Volume2 } from "lucide-react";
import { Avatar } from "./Avatar";
import { useState } from "react";

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
    duration?: string;
    fileSize?: string;
    views?: number;
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
        {(media?.type === "image" || media?.type === "video") && media?.url && (
          <>
            {media.type === "image" && (
              <div className="rounded-xl overflow-hidden -mx-3 -mt-2 mb-2">
                <img 
                  src={media.url} 
                  alt="Message image"
                  className="w-full max-h-80 object-cover"
                />
              </div>
            )}
            {media.type === "video" && (
              <div className="relative rounded-xl overflow-hidden -mx-3 -mt-2 mb-2" style={{ aspectRatio: '9/16' }}>
                <img
                  src={media.url}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/90 hover:bg-primary transition-colors">
                    <Play className="w-6 h-6 text-primary-foreground fill-primary-foreground" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 flex flex-col gap-1">
                  {media.duration && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-black/70 text-xs text-white">
                      {media.duration}
                    </div>
                  )}
                  {media.fileSize && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-black/70 text-xs text-white">
                      <Download className="w-3 h-3" />
                      {media.fileSize}
                    </div>
                  )}
                </div>
                {media.views !== undefined && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md bg-black/70 text-xs text-white">
                    <Eye className="w-3 h-3" />
                    {media.views}
                  </div>
                )}
              </div>
            )}
          </>
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
          
          {media?.type === "audio" && media?.url && (
            <div className="flex items-center gap-2 mb-2 -mx-3 px-2 -mt-2">
              <button className={cn(
                "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                isOwn
                  ? "bg-primary-foreground/40 hover:bg-primary-foreground/50"
                  : "bg-primary hover:bg-primary/90"
              )}>
                <Play className={cn(
                  "w-5 h-5 fill-current",
                  isOwn ? "text-primary-foreground" : "text-primary-foreground"
                )} />
              </button>
              
              <div className="flex-1 h-6">
                <svg className="w-full h-full" viewBox="0 0 100 24" preserveAspectRatio="none">
                  {[...Array(40)].map((_, i) => {
                    const height = Math.random() * 20 + 2;
                    return (
                      <rect
                        key={i}
                        x={i * 2.5}
                        y={(24 - height) / 2}
                        width="1.5"
                        height={height}
                        fill={isOwn ? "rgba(255,255,255,0.6)" : "rgba(42, 171, 238, 0.6)"}
                        rx="0.75"
                      />
                    );
                  })}
                </svg>
              </div>
              
              {media.duration && (
                <span className={cn(
                  "text-xs font-medium flex-shrink-0 min-w-fit px-1",
                  isOwn ? "text-primary-foreground/80" : "text-primary"
                )}>
                  {media.duration}
                </span>
              )}
              
              <button className="flex-shrink-0 p-1.5 transition-colors">
                <Volume2 className={cn(
                  "w-4 h-4",
                  isOwn ? "text-primary-foreground" : "text-primary"
                )} />
              </button>
            </div>
          )}
          
          {media?.type === "link" && media?.url && (
            <div className="mb-2">
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
