import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatListItem, ChatListItemProps } from "../chat/ChatListItem";
import { CategoryTabs, Category } from "./CategoryTabs";
import { SearchBar } from "./SearchBar";
import { Menu, Settings, LogOut, Search as SearchIcon, User, Users, Phone, Bookmark, UserPlus, Info } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatSidebarProps {
  chats: ChatListItemProps[];
  groups: ChatListItemProps[];
  selectedChatId?: string;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
  onNewGroup: () => void;
  onSettings: () => void;
}

export function ChatSidebar({
  chats,
  groups,
  selectedChatId,
  onChatSelect,
  onNewChat,
  onNewGroup,
  onSettings,
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

  const unreadCounts: Partial<Record<Category, number>> = {
    all: allChats.reduce((sum, c) => sum + (c.unreadCount || 0), 0),
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
              type={chat.isGroup ? "group" : "chat"}
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
              const chat = item.data as ChatListItemProps;
              return (
                <ChatListItem
                  key={chat.id}
                  {...chat}
                  type={item.type as "chat" | "group"}
                  isSelected={chat.id === selectedChatId}
                  onClick={() => onChatSelect(chat.id)}
                />
              );
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

      case "groups":
        return renderChatList(filteredGroups);

      default:
        return null;
    }
  };

  return (
    <div className="w-full md:w-72 bg-sidebar border-r border-sidebar-border flex flex-col h-full animate-slide-in-left">
      {/* Header */}
      <div className="p-3 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                data-testid="button-menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onNewGroup}>
                <Users className="w-4 h-4 mr-2" />
                <span>New Group</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users className="w-4 h-4 mr-2" />
                <span>Contacts</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Phone className="w-4 h-4 mr-2" />
                <span>Calls</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bookmark className="w-4 h-4 mr-2" />
                <span>Saved Messages</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onSettings}>
                <Settings className="w-4 h-4 mr-2" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserPlus className="w-4 h-4 mr-2" />
                <span>Invite Friends</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Info className="w-4 h-4 mr-2" />
                <span>About xmo</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="w-4 h-4 mr-2" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <h1 className="text-xl font-bold text-sidebar-foreground">xmo</h1>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setShowSearch(!showSearch)}
            data-testid="button-search"
          >
            <SearchIcon className="h-5 w-5" />
          </Button>
        </div>

        {showSearch && (
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search chats..."
          />
        )}
      </div>

      {/* Category Tabs */}
      <div className="px-3 pt-3">
        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          unreadCounts={unreadCounts}
        />
      </div>

      {/* Chat List */}
      {renderContent()}
    </div>
  );
}
