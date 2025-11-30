import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatListItem, ChatListItemProps } from "../chat/ChatListItem";
import { CategoryTabs, Category } from "./CategoryTabs";
import { SearchBar } from "./SearchBar";
import { StoriesView, StoryUser } from "../views/StoriesView";
import { ExploreView } from "../views/ExploreView";
import { ChannelsView, Channel } from "../views/ChannelsView";
import { BotsView, BotItem } from "../views/BotsView";
import { SavedView, SavedMessage } from "../views/SavedView";
import { Menu, Edit, Settings, LogOut, Search } from "lucide-react";
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
  explorePosts: ExplorePost[];
  channels: Channel[];
  bots: BotItem[];
  savedMessages: SavedMessage[];
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
  explorePosts,
  channels,
  bots,
  savedMessages,
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
  const [showSearch, setShowSearch] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const allChats = [...(chats || []), ...(groups || [])];
  
  const filteredPersonalChats = (chats || []).filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredChats = allChats.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredGroups = (groups || []).filter((group) =>
    group.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredChannels = (channels || []).filter((ch) =>
    ch.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredBots = (bots || []).filter((bot) =>
    bot.name.toLowerCase().includes(search.toLowerCase()) ||
    bot.username.toLowerCase().includes(search.toLowerCase())
  );

  const unreadCounts: Partial<Record<Category, number>> = {
    all: allChats.reduce((sum, c) => sum + (c.unreadCount || 0), 0),
    stories: (stories || []).filter((s) => s.hasStory && !s.isViewed).length,
    groups: (groups || []).reduce((sum, g) => sum + (g.unreadCount || 0), 0),
  };

  const renderChatList = (chatList: ChatListItemProps[]) => (
    <ScrollArea className="flex-1">
      <div className="px-2 pb-2">
        {chatList.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No chats found</p>
          </div>
        ) : (
          chatList.map((chat) => (
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
  );

  const renderAllContent = () => {
    // Combine all items with their type
    const allItems = [
      ...filteredPersonalChats.map((chat) => ({ type: "chat", data: chat })),
      ...filteredGroups.map((group) => ({ type: "group", data: group })),
      ...filteredChannels.map((channel) => ({ type: "channel", data: channel })),
      ...filteredBots.map((bot) => ({ type: "bot", data: bot })),
    ];

    // Shuffle array using Fisher-Yates algorithm
    const shuffled = [...allItems];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return (
      <ScrollArea className="flex-1">
        <div className="px-2 pb-2">
          {shuffled.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">No results found</p>
            </div>
          ) : (
            shuffled.map((item) => {
              if (item.type === "chat" || item.type === "group") {
                const chat = item.data as ChatListItemProps;
                return (
                  <ChatListItem
                    key={chat.id}
                    {...chat}
                    isSelected={chat.id === selectedChatId}
                    onClick={() => onChatSelect(chat.id)}
                  />
                );
              } else if (item.type === "channel") {
                const channel = item.data as Channel;
                return (
                  <ChatListItem
                    key={channel.id}
                    id={channel.id}
                    name={channel.name}
                    avatar={channel.avatar}
                    lastMessage={channel.description}
                    timestamp=""
                    unreadCount={0}
                    isSelected={channel.id === selectedChatId}
                    onClick={() => onChatSelect(channel.id)}
                  />
                );
              } else if (item.type === "bot") {
                const bot = item.data as BotItem;
                return (
                  <ChatListItem
                    key={bot.id}
                    id={bot.id}
                    name={bot.name}
                    avatar={bot.avatar}
                    lastMessage={bot.username}
                    timestamp=""
                    unreadCount={0}
                    isSelected={bot.id === selectedChatId}
                    onClick={() => onChatSelect(bot.id)}
                  />
                );
              }
              return null;
            })
          )}
        </div>
      </ScrollArea>
    );
  };

  const renderContent = () => {
    switch (activeCategory) {
      case "all":
        return renderAllContent();

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
        return renderChatList(filteredGroups);

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

        {showSearch ? (
          <div className="flex-1">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search..."
              autoFocus
              onBlur={() => {
                if (!search) setShowSearch(false);
              }}
            />
          </div>
        ) : (
          <>
            <h1 className="text-lg font-semibold flex-1">TeleChat</h1>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setShowSearch(true)}
              data-testid="button-search"
            >
              <Search className="h-5 w-5" />
            </Button>
          </>
        )}

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
