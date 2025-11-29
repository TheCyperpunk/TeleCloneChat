import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatListItem, ChatListItemProps } from "../chat/ChatListItem";
import { StoriesBar, Story } from "../stories/StoriesBar";
import { SearchBar } from "./SearchBar";
import { Menu, Edit, Settings, Moon, Sun, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "../ThemeToggle";

interface ChatSidebarProps {
  chats: ChatListItemProps[];
  stories: Story[];
  currentUserId: string;
  currentUserName: string;
  currentUserAvatar?: string;
  hasOwnStory?: boolean;
  selectedChatId?: string;
  onChatSelect: (chatId: string) => void;
  onStoryClick: (userId: string) => void;
  onAddStory: () => void;
  onNewChat: () => void;
  onSettings: () => void;
}

export function ChatSidebar({
  chats,
  stories,
  currentUserId,
  currentUserName,
  currentUserAvatar,
  hasOwnStory = false,
  selectedChatId,
  onChatSelect,
  onStoryClick,
  onAddStory,
  onNewChat,
  onSettings,
}: ChatSidebarProps) {
  const [search, setSearch] = useState("");

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full md:w-80 h-full flex flex-col border-r bg-sidebar">
      <header className="h-14 border-b flex items-center justify-between px-3 gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" data-testid="button-menu">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem onClick={onSettings}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log("Logout")}>
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <h1 className="text-lg font-semibold flex-1">TeleChat</h1>
        <ThemeToggle />
        <Button
          size="icon"
          variant="ghost"
          onClick={onNewChat}
          data-testid="button-new-chat"
        >
          <Edit className="h-5 w-5" />
        </Button>
      </header>

      <div className="p-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search chats..."
        />
      </div>

      <StoriesBar
        stories={stories}
        currentUserId={currentUserId}
        currentUserName={currentUserName}
        currentUserAvatar={currentUserAvatar}
        hasOwnStory={hasOwnStory}
        onStoryClick={onStoryClick}
        onAddStory={onAddStory}
      />

      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredChats.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">No chats found</p>
            </div>
          ) : (
            filteredChats.map((chat) => (
              <ChatListItem
                key={chat.id}
                {...chat}
                isSelected={chat.id === selectedChatId}
                onClick={() => onChatSelect(chat.id)}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
