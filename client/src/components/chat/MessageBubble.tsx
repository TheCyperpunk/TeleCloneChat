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
  } | Array<{
    type: "image" | "video";
    url?: string;
    duration?: string;
    fileSize?: string;
    views?: number;
  }>;
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
        "flex gap-2",
        isOwn ? "justify-end pr-4" : "justify-start",
        isLastInGroup ? "mb-2" : "mb-1.5"
      )}
      data-testid={`message-${id}`}
    >
      {!isOwn && (
        <div className={cn(
          "flex-shrink-0 w-8 flex items-start pt-1",
          !showAvatar && "opacity-0"
        )}>
          {showAvatar ? (
            <Avatar src={senderAvatar} name={senderName || "User"} size="sm" />
          ) : (
            <div className="w-8 h-8" />
          )}
        </div>
      )}
      <div
        className={cn(
          "flex flex-col",
          isOwn ? "max-w-xs sm:max-w-sm md:max-w-md" : "flex-1 max-w-xs sm:max-w-sm md:max-w-md"
        )}
      >
        {isFirstInGroup && !isOwn && senderName && (
          <span className="text-xs font-medium text-primary mb-1 block">
            {senderName}
          </span>
        )}
        {Array.isArray(media) && media.length > 0 && (
          <div className="grid gap-1 mb-1 rounded-lg overflow-hidden" style={{ 
            gridTemplateColumns: media.length <= 2 ? '1fr 1fr' : '1fr 1fr 1fr',
            gridAutoRows: '80px'
          }}>
            {media.map((item, idx) => {
              let rowSpan = 1;
              
              // Layout pattern: 2 on top, 3 in middle rows, 2 on bottom
              if (media.length === 3) {
                if (idx < 2) rowSpan = 1; // top 2
                else rowSpan = 1; // bottom 1
              } else if (media.length === 4) {
                if (idx < 2) rowSpan = 1; // top 2
                else rowSpan = 1; // bottom 2
              } else if (media.length === 5) {
                if (idx < 2) rowSpan = 1; // top 2
                else if (idx < 5) rowSpan = 1; // middle 3
                else rowSpan = 1; // bottom
              } else if (media.length === 6) {
                if (idx < 2) rowSpan = 1; // top 2
                else if (idx < 5) rowSpan = 1; // middle 3
                else rowSpan = 1; // bottom 1
              } else if (media.length >= 7) {
                if (idx < 2) rowSpan = 1; // top 2
                else if (idx < 5) rowSpan = 1; // middle 3
                else if (idx < 8) rowSpan = 1; // middle-bottom 3
                else rowSpan = 1; // bottom
              }
              
              return (
                <div 
                  key={idx} 
                  className="relative rounded-md overflow-hidden group cursor-pointer" 
                  style={{ 
                    gridRow: `span ${rowSpan}`
                  }}
                >
                  <img
                    src={item.url}
                    alt={`Media ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-8 h-8 text-white fill-white opacity-90 drop-shadow-lg" />
                    </div>
                  )}
                  {item.type === "video" && item.duration && (
                    <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded-md bg-black/60 text-xs text-white font-medium">
                      {item.duration}
                    </div>
                  )}
                  {item.views !== undefined && (
                    <div className="absolute bottom-1 right-1 flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-black/60 text-xs text-white">
                      <Eye className="w-3 h-3" />
                      {item.views}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        
        {!Array.isArray(media) && (media?.type === "image" || media?.type === "video") && media?.url && (
          <>
            {media.type === "image" && (
              <div className="rounded-xl overflow-hidden mb-1">
                <img 
                  src={media.url} 
                  alt="Message image"
                  className="w-full max-h-80 object-cover rounded-xl"
                />
              </div>
            )}
            {media.type === "video" && (
              <div className="relative rounded-xl overflow-hidden mb-1" style={{ aspectRatio: '9/16', maxWidth: '100%' }}>
                <img
                  src={media.url}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-colors">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary hover:bg-primary/80 transition-colors shadow-lg">
                    <Play className="w-7 h-7 text-primary-foreground fill-primary-foreground" />
                  </div>
                </div>
                
                {media.duration && (
                  <div className="absolute top-3 left-3">
                    <div className="px-2.5 py-1.5 rounded-full bg-black/70 text-xs text-white font-medium">
                      {media.duration}
                    </div>
                  </div>
                )}
                
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  {media.views !== undefined && (
                    <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-black/70 text-xs text-white font-medium">
                      <Eye className="w-3 h-3" />
                      <span>{media.views}</span>
                    </div>
                  )}
                  <div className="px-2.5 py-1.5 rounded-full bg-black/70 text-xs text-white font-medium">
                    {timestamp}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        
        {!(((Array.isArray(media) && media.length > 0) || (!Array.isArray(media) && (media?.type === "video" || media?.type === "image") && media?.url)) && !content) && (
        <div
          className={cn(
            "px-3 py-2 relative",
            isOwn
              ? "bg-primary text-primary-foreground rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
              : !Array.isArray(media) && media?.type === "audio" && media?.url
              ? "bg-card border border-card-border rounded-3xl"
              : "bg-card border border-card-border rounded-tr-2xl rounded-br-2xl rounded-bl-2xl"
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
          
          {!Array.isArray(media) && media?.type === "audio" && media?.url && (
            <div className="flex items-center gap-2.5 my-1">
              <button className={cn(
                "flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors",
                isOwn
                  ? "bg-primary-foreground/40 hover:bg-primary-foreground/50"
                  : "bg-primary hover:bg-primary/90"
              )}>
                <Play className={cn(
                  "w-4 h-4 fill-current",
                  isOwn ? "text-primary-foreground" : "text-primary-foreground"
                )} />
              </button>
              
              <div className="flex-1 h-6 flex items-center">
                <svg className="w-full h-full" viewBox="0 0 100 24" preserveAspectRatio="none">
                  {[...Array(35)].map((_, i) => {
                    const height = Math.random() * 20 + 2;
                    return (
                      <rect
                        key={i}
                        x={i * 2.85}
                        y={(24 - height) / 2}
                        width="1.8"
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
                  "text-xs font-medium flex-shrink-0 min-w-fit",
                  isOwn ? "text-primary-foreground/80" : "text-muted-foreground"
                )}>
                  {media.duration}
                </span>
              )}
              
              <button className="flex-shrink-0 p-1 transition-colors">
                <Volume2 className={cn(
                  "w-4 h-4",
                  isOwn ? "text-primary-foreground/80" : "text-muted-foreground"
                )} />
              </button>
            </div>
          )}
          
          {!Array.isArray(media) && media?.type === "link" && media?.url && (
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
          
          {content && !(!Array.isArray(media) && media?.type === "audio" && media?.url) && (
            <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
              {content}
            </p>
          )}
          {(Array.isArray(media) || (!Array.isArray(media) && (media?.type === "video" || media?.type === "image"))) ? null : (
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
          )}
        </div>
        )}
      </div>
    </div>
  );
}
