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
        "flex gap-2 px-4",
        isOwn ? "justify-end" : "justify-start",
        isLastInGroup ? "mb-2" : "mb-0.5"
      )}
      data-testid={`message-${id}`}
    >
      {!isOwn && showAvatar && (
        <div className="flex-shrink-0 w-8">
          <Avatar src={senderAvatar} name={senderName || "User"} size="sm" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[70%] md:max-w-md",
          !isOwn && showAvatar && "ml-0",
          !isOwn && !showAvatar && "ml-10"
        )}
      >
        {isFirstInGroup && !isOwn && senderName && (
          <span className="text-xs font-medium text-primary ml-3 mb-0.5 block">
            {senderName}
          </span>
        )}
        {Array.isArray(media) && media.length > 0 && (
          <div className="grid gap-1 -mx-3 -mt-2 mb-2" style={{ gridTemplateColumns: media.length === 1 ? '1fr' : media.length === 2 ? '1fr 1fr' : '1fr 1fr 1fr' }}>
            {media.map((item, idx) => (
              <div key={idx} className="relative rounded-lg overflow-hidden group" style={{ aspectRatio: '1/1' }}>
                <img
                  src={item.url}
                  alt={`Media ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                {item.type === "video" && (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-colors">
                      <Play className="w-8 h-8 text-primary-foreground fill-primary-foreground opacity-80" />
                    </div>
                    {item.duration && (
                      <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded-md bg-black/60 text-xs text-white font-medium">
                        {item.duration}
                      </div>
                    )}
                  </>
                )}
                {item.views !== undefined && (
                  <div className="absolute bottom-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-black/60 text-xs text-white">
                    <Eye className="w-3 h-3" />
                    {item.views}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {!Array.isArray(media) && (media?.type === "image" || media?.type === "video") && media?.url && (
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
              <div className="relative rounded-xl overflow-hidden -mx-3 -mt-2 mb-2 w-screen -left-1/2 left-[calc(-50vw+50%)]" style={{ maxWidth: 'calc(70vw)', aspectRatio: '9/16' }}>
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
                  <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/60 text-xs text-white font-medium">
                    {media.duration}
                  </div>
                )}
                
                {media.fileSize && (
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 rounded-md bg-black/60 text-xs text-white">
                    <Download className="w-3 h-3" />
                    <span>{media.fileSize}</span>
                  </div>
                )}
                
                {media.views !== undefined && (
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md bg-black/60 text-xs text-white">
                    <Eye className="w-3 h-3" />
                    <span>{media.views}</span>
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
              ? "bg-primary text-primary-foreground rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
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
            <div className="flex items-center gap-2 -mx-3 px-3 py-2 -mt-2 mb-2 bg-black/10 rounded-lg">
              <button className={cn(
                "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                isOwn
                  ? "bg-primary-foreground/30 hover:bg-primary-foreground/40"
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
