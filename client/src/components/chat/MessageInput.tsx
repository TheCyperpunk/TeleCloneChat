import { useState, useRef, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Paperclip,
  Smile,
  Mic,
  Send,
  Image,
  FileText,
  MapPin,
  X,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface MessageInputProps {
  onSend: (message: string) => void;
  onTyping?: (isTyping: boolean) => void;
  replyTo?: {
    name: string;
    content: string;
  };
  onCancelReply?: () => void;
  placeholder?: string;
}

export function MessageInput({
  onSend,
  onTyping,
  replyTo,
  onCancelReply,
  placeholder = "Message",
}: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [showAttachments, setShowAttachments] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
      onTyping?.(false);
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    onTyping?.(e.target.value.length > 0);
    
    const target = e.target;
    target.style.height = "auto";
    target.style.height = Math.min(target.scrollHeight, 120) + "px";
  };

  const attachmentOptions = [
    { icon: Image, label: "Photo", color: "text-violet-500" },
    { icon: FileText, label: "Document", color: "text-blue-500" },
    { icon: MapPin, label: "Location", color: "text-green-500" },
  ];

  return (
    <div className="px-2 py-2">
      {replyTo && (
        <div className="flex items-center gap-2 px-3 py-2 mb-2 bg-accent/50 rounded-lg">
          <div className="flex-1 min-w-0 border-l-2 border-primary pl-2">
            <span className="text-xs font-medium text-primary block">
              {replyTo.name}
            </span>
            <span className="text-xs text-muted-foreground line-clamp-1">
              {replyTo.content}
            </span>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={onCancelReply}
            className="h-6 w-6"
            data-testid="button-cancel-reply"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      <div className="flex items-end gap-2">
        <Popover open={showAttachments} onOpenChange={setShowAttachments}>
          <PopoverTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              data-testid="button-attach"
            >
              <Paperclip className="h-10 w-10" />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" align="start" className="w-auto p-2">
            <div className="flex gap-2">
              {attachmentOptions.map((option) => (
                <Button
                  key={option.label}
                  variant="ghost"
                  className="flex flex-col items-center gap-1 h-auto py-2 px-3"
                  onClick={() => {
                    console.log(`Attach ${option.label}`);
                    setShowAttachments(false);
                  }}
                  data-testid={`button-attach-${option.label.toLowerCase()}`}
                >
                  <option.icon className={cn("h-6 w-6", option.color)} />
                  <span className="text-xs">{option.label}</span>
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <div className="flex-1 flex items-end gap-2 bg-accent/50 rounded-3xl px-4 py-2">
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 flex-shrink-0"
            onClick={() => console.log("Open emoji picker")}
            data-testid="button-emoji"
          >
            <Smile className="h-9 w-9" />
          </Button>
          <textarea
            ref={inputRef}
            value={message}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            className="flex-1 bg-transparent border-0 outline-none resize-none text-sm leading-relaxed max-h-[120px] py-0.5"
            data-testid="input-message"
          />
        </div>
        <Button
          size="icon"
          variant={message.trim() ? "default" : "ghost"}
          onClick={message.trim() ? handleSend : () => console.log("Record voice")}
          data-testid={message.trim() ? "button-send" : "button-record"}
        >
          {message.trim() ? (
            <Send className="h-10 w-10" />
          ) : (
            <Mic className="h-10 w-10" />
          )}
        </Button>
      </div>
    </div>
  );
}
