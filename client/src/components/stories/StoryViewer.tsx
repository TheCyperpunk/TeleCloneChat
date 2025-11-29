import { useState, useEffect, useCallback } from "react";
import { Avatar } from "../chat/Avatar";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Send, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface StoryItem {
  id: string;
  imageUrl?: string;
  content?: string;
  timestamp: string;
  backgroundColor?: string;
}

interface StoryViewerProps {
  userId: string;
  userName: string;
  userAvatar?: string;
  stories: StoryItem[];
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export function StoryViewer({
  userId,
  userName,
  userAvatar,
  stories,
  onClose,
  onNext,
  onPrevious,
  hasNext = false,
  hasPrevious = false,
}: StoryViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reply, setReply] = useState("");

  const currentStory = stories[currentIndex];

  const goToNext = useCallback(() => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
    } else if (hasNext && onNext) {
      onNext();
    } else {
      onClose();
    }
  }, [currentIndex, stories.length, hasNext, onNext, onClose]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setProgress(0);
    } else if (hasPrevious && onPrevious) {
      onPrevious();
    }
  }, [currentIndex, hasPrevious, onPrevious]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  const handleSendReply = () => {
    if (reply.trim()) {
      console.log("Reply sent:", reply);
      setReply("");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      onMouseDown={() => setIsPaused(true)}
      onMouseUp={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="relative w-full max-w-md h-full md:h-[90vh] md:rounded-xl overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            currentStory.backgroundColor || "bg-gradient-to-br from-primary to-blue-600"
          )}
        >
          {currentStory.imageUrl ? (
            <img
              src={currentStory.imageUrl}
              alt="Story"
              className="w-full h-full object-cover"
            />
          ) : (
            <p className="text-white text-2xl font-medium text-center px-8">
              {currentStory.content}
            </p>
          )}
        </div>

        <div className="absolute top-0 left-0 right-0 p-2">
          <div className="flex gap-1 mb-2">
            {stories.map((_, index) => (
              <div
                key={index}
                className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-white transition-all duration-100"
                  style={{
                    width:
                      index < currentIndex
                        ? "100%"
                        : index === currentIndex
                        ? `${progress}%`
                        : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar src={userAvatar} name={userName} size="sm" />
              <div>
                <span className="text-white text-sm font-medium">{userName}</span>
                <span className="text-white/70 text-xs ml-2">
                  {currentStory.timestamp}
                </span>
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={onClose}
              className="text-white hover:bg-white/20"
              data-testid="button-close-story"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <button
          onClick={goToPrevious}
          className="absolute left-0 top-20 bottom-20 w-1/3"
          data-testid="button-story-previous"
        />
        <button
          onClick={goToNext}
          className="absolute right-0 top-20 bottom-20 w-1/3"
          data-testid="button-story-next"
        />

        {hasPrevious && (
          <Button
            size="icon"
            variant="ghost"
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 hidden md:flex"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}
        {hasNext && (
          <Button
            size="icon"
            variant="ghost"
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 hidden md:flex"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Reply to story..."
              className="flex-1 bg-white/20 text-white placeholder:text-white/60 rounded-full px-4 py-2 text-sm outline-none"
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
              data-testid="input-story-reply"
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={() => console.log("Liked story")}
              className="text-white hover:bg-white/20"
              data-testid="button-like-story"
            >
              <Heart className="h-5 w-5" />
            </Button>
            {reply.trim() && (
              <Button
                size="icon"
                variant="ghost"
                onClick={handleSendReply}
                className="text-white hover:bg-white/20"
                data-testid="button-send-reply"
              >
                <Send className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
