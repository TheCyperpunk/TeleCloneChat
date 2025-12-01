import { cn } from "@/lib/utils";
import { Check, CheckCheck, Play, Link2, Eye, Download, X, Pause } from "lucide-react";
import { Avatar } from "./Avatar";
import { useState, useRef, useEffect } from "react";

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (!audioRef.current || !(!Array.isArray(media) && media?.type === "audio" && media?.url)) return;
    
    if (playingAudio === id && !audioRef.current.paused) {
      audioRef.current.pause();
      setPlayingAudio(null);
    } else {
      audioRef.current.play();
      setPlayingAudio(id);
    }
  };

  const handleSeek = (newTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setPlayingAudio(null);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [id]);

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
                  onClick={() => setSelectedImage(item.url || "")}
                  data-testid={`image-grid-${idx}`}
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
              <div className="rounded-xl overflow-hidden mb-1 cursor-pointer" onClick={() => setSelectedImage(media.url || "")} data-testid="image-single">
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
            <>
              <audio ref={audioRef} src={media.url} />
              <div className="flex flex-col gap-2 my-1 w-full">
                <div className="flex items-center gap-2.5">
                  <button 
                    onClick={toggleAudio}
                    className={cn(
                      "flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors",
                      isOwn
                        ? "bg-primary-foreground/40 hover:bg-primary-foreground/50"
                        : "bg-primary hover:bg-primary/90"
                    )}
                    data-testid={`button-play-audio-${id}`}
                  >
                    {playingAudio === id ? (
                      <Pause className={cn(
                        "w-4 h-4 fill-current",
                        isOwn ? "text-primary-foreground" : "text-primary-foreground"
                      )} />
                    ) : (
                      <Play className={cn(
                        "w-4 h-4 fill-current",
                        isOwn ? "text-primary-foreground" : "text-primary-foreground"
                      )} />
                    )}
                  </button>
                
                  <div className="flex-1 h-6 flex items-end gap-0.5 cursor-pointer" onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const newTime = (e.clientX - rect.left) / rect.width * duration;
                    handleSeek(newTime);
                  }} data-testid={`waveform-audio-${id}`}>
                    {[...Array(25)].map((_, i) => {
                      const baseHeight = Math.random() * 16 + 4;
                      const progress = duration ? (currentTime / duration) * 100 : 0;
                      const barProgress = (i / 25) * 100;
                      const isPlayed = barProgress <= progress;
                      
                      return (
                        <div
                          key={i}
                          className={cn(
                            "flex-1 transition-colors",
                            isPlayed 
                              ? (isOwn ? "bg-primary-foreground" : "bg-primary")
                              : (isOwn ? "bg-primary-foreground/30" : "bg-primary/30")
                          )}
                          style={{ height: `${baseHeight}px` }}
                        />
                      );
                    })}
                  </div>
                  
                  <span className={cn(
                    "text-xs font-medium flex-shrink-0 min-w-fit",
                    isOwn ? "text-primary-foreground/80" : "text-muted-foreground"
                  )}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
              </div>
            </>
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
      
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
          data-testid="lightbox-overlay"
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage} 
              alt="Lightbox"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              data-testid="button-close-lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
