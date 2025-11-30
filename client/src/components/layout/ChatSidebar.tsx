import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatListItem, ChatListItemProps } from "../chat/ChatListItem";
import { CategoryTabs, Category } from "./CategoryTabs";
import { SearchBar } from "./SearchBar";
import { StoriesView, StoryUser } from "../views/StoriesView";
import { GroupsView } from "../views/GroupsView";
import { ExploreView } from "../views/ExploreView";
import { ChannelsView, Channel } from "../views/ChannelsView";
import { BotsView, BotItem } from "../views/BotsView";
import { SavedView, SavedMessage } from "../views/SavedView";
import { Menu, Edit, Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "../ThemeToggle";

interface ExplorePost {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
  userName: string;
}

interface ChatSidebarProps {
  chats: ChatListItemProps[];
  stories: StoryUser[];
  groups: ChatListItemProps[];
  channels: Channel[];
  bots: BotItem[];
  savedMessages: SavedMessage[];
  explorePosts: ExplorePost[];
  currentUserId: string;
  currentUserName: string;
  currentUserAvatar?: string;
  hasOwnStory?: boolean;
  selectedChatId?: string;
  onChatSelect: (chatId: string) => void;
  onStoryClick: (userId: string) => void;
  onAddStory: () => void;
  onNewChat: () => void;
  onNewGroup: () => void;
  onNewChannel: () => void;
  onSettings: () => void;
  onSubscribeChannel: (channelId: string) => void;
  onStartBot: (botId: string) => void;
  onDeleteSavedMessage: (messageId: string) => void;
}

export function ChatSidebar({
  chats,
  stories,
  groups,
  channels,
  bots,
  savedMessages,
  explorePosts,
  currentUserId,
  currentUserName,
  currentUserAvatar,
  hasOwnStory = false,
  selectedChatId,
  onChatSelect,
  onStoryClick,
  onAddStory,
  onNewChat,
  onNewGroup,
  onNewChannel,
  onSettings,
  onSubscribeChannel,
  onStartBot,
  onDeleteSavedMessage,
}: ChatSidebarProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("chats");

  const filteredChats = (chats || []).filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  const unreadCounts: Partial<Record<Category, number>> = {
    chats: (chats || []).reduce((sum, c) => sum + (c.unreadCount || 0), 0),
    groups: (groups || []).reduce((sum, g) => sum + (g.unreadCount || 0), 0),
    stories: (stories || []).filter((s) => s.hasStory && !s.isViewed).length,
  };

  const renderContent = () => {
    switch (activeCategory) {
      case "chats":
        return (
          <>
            <div className="p-3">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search chats..."
              />
            </div>
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
          </>
        );

      case "stories":
        return (
          <StoriesView
            stories={stories}
            currentUserName={currentUserName}
            currentUserAvatar={currentUserAvatar}
            hasOwnStory={hasOwnStory}
            onStoryClick={onStoryClick}
            onAddStory={onAddStory}
          />
        );

      case "groups":
        return (
          <GroupsView
            groups={groups}
            selectedGroupId={selectedChatId}
            onGroupSelect={onChatSelect}
            onCreateGroup={onNewGroup}
          />
        );

      case "explore":
        return (
          <ExploreView
            posts={explorePosts}
            onPostClick={(postId) => console.log("View post:", postId)}
          />
        );

      case "channels":
        return (
          <ChannelsView
            channels={channels}
            selectedChannelId={selectedChatId}
            onChannelSelect={onChatSelect}
            onCreateChannel={onNewChannel}
            onSubscribe={onSubscribeChannel}
          />
        );

      case "bots":
        return (
          <BotsView
            bots={bots}
            selectedBotId={selectedChatId}
            onBotSelect={onChatSelect}
            onStartBot={onStartBot}
          />
        );

      case "saved":
        return (
          <SavedView
            messages={savedMessages}
            onMessageClick={(msgId) => console.log("View saved:", msgId)}
            onDeleteSaved={onDeleteSavedMessage}
          />
        );

      default:
        return null;
    }
  };

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

      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        unreadCounts={unreadCounts}
      />

      {renderContent()}
    </div>
  );
}
