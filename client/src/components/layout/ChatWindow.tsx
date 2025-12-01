import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatHeader, ChatHeaderProps } from "../chat/ChatHeader";
import { MessageBubble, MessageBubbleProps } from "../chat/MessageBubble";
import { MessageInput } from "../chat/MessageInput";
import { MessageSquare } from "lucide-react";

interface ChatWindowProps {
  chat: ChatHeaderProps & {
    id: string;
  };
  messages: MessageBubbleProps[];
  onSendMessage: (content: string) => void;
  onBack?: () => void;
  onProfileClick?: () => void;
  showBackButton?: boolean;
}

export function ChatWindow({
  chat,
  messages,
  onSendMessage,
  onBack,
  onProfileClick,
  showBackButton = false,
}: ChatWindowProps) {
  const [replyTo, setReplyTo] = useState<{ name: string; content: string } | undefined>();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const groupedMessages = messages.reduce((acc, message, index) => {
    const prevMessage = messages[index - 1];
    const nextMessage = messages[index + 1];

    const isFirstInGroup =
      !prevMessage || prevMessage.isOwn !== message.isOwn;
    const isLastInGroup =
      !nextMessage || nextMessage.isOwn !== message.isOwn;

    acc.push({
      ...message,
      isFirstInGroup,
      isLastInGroup,
    });

    return acc;
  }, [] as (MessageBubbleProps & { isFirstInGroup: boolean; isLastInGroup: boolean })[]);

  const handleSend = (content: string) => {
    onSendMessage(content);
    setReplyTo(undefined);
  };

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center text-muted-foreground">
          <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-20" />
          <p>Select a chat to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-background">
      <div className="sticky top-0 z-20">
        <ChatHeader
          {...chat}
          onBack={onBack}
          onProfileClick={onProfileClick}
          showBackButton={showBackButton}
        />
      </div>

      <ScrollArea className="flex-1 overflow-hidden" ref={scrollRef}>
        <div className="py-4 min-h-full flex flex-col justify-end">
          {messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <p className="text-sm">No messages yet. Say hello!</p>
            </div>
          ) : (
            groupedMessages.map((message) => (
              <MessageBubble
                key={message.id}
                {...message}
                showAvatar={!message.isOwn && chat.isGroup && message.isLastInGroup}
              />
            ))
          )}
        </div>
      </ScrollArea>

      <div className="sticky bottom-0 z-20 bg-background border-t">
        <MessageInput
          onSend={handleSend}
          replyTo={replyTo}
          onCancelReply={() => setReplyTo(undefined)}
        />
      </div>
    </div>
  );
}
