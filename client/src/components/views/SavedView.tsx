import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Bookmark, Search, Trash2, MessageSquare, Image, FileText, Link2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Avatar } from "../chat/Avatar";
import { cn } from "@/lib/utils";

export interface SavedMessage {
  id: string;
  content: string;
  fromName: string;
  fromAvatar?: string;
  chatName: string;
  timestamp: string;
  type: "text" | "image" | "file" | "link";
}

interface SavedViewProps {
  messages: SavedMessage[];
  onMessageClick: (messageId: string) => void;
  onDeleteSaved: (messageId: string) => void;
}

const typeIcons = {
  text: MessageSquare,
  image: Image,
  file: FileText,
  link: Link2,
};

export function SavedView({
  messages,
  onMessageClick,
  onDeleteSaved,
}: SavedViewProps) {
  const [search, setSearch] = useState("");

  const filteredMessages = messages.filter(
    (msg) =>
      msg.content.toLowerCase().includes(search.toLowerCase()) ||
      msg.fromName.toLowerCase().includes(search.toLowerCase()) ||
      msg.chatName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search saved messages..."
            className="pl-9 rounded-full bg-accent/50 border-0"
            data-testid="input-saved-search"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-12 px-4">
              <Bookmark className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">No saved messages</p>
              <p className="text-xs text-muted-foreground mt-1">
                Long press messages to save them
              </p>
            </div>
          ) : (
            filteredMessages.map((message) => {
              const TypeIcon = typeIcons[message.type];
              return (
                <div
                  key={message.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover-elevate active-elevate-2 cursor-pointer group"
                  onClick={() => onMessageClick(message.id)}
                  data-testid={`saved-message-${message.id}`}
                >
                  <Avatar src={message.fromAvatar} name={message.fromName} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-sm truncate">
                        {message.fromName}
                      </span>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {message.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      in {message.chatName}
                    </p>
                    <div className="flex items-start gap-2 mt-1">
                      <TypeIcon className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <p className="text-sm line-clamp-2">{message.content}</p>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100 h-8 w-8 flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSaved(message.id);
                    }}
                    data-testid={`button-delete-saved-${message.id}`}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
