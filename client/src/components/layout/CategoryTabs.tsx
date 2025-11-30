import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  MessageCircle,
  CircleDot,
  Users,
  Compass,
  Radio,
  Bot,
  Bookmark,
} from "lucide-react";

export type Category = "chats" | "stories" | "groups" | "explore" | "channels" | "bots" | "saved";

interface CategoryTabsProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
  unreadCounts?: Partial<Record<Category, number>>;
}

const categories: { id: Category; label: string; icon: typeof MessageCircle }[] = [
  { id: "chats", label: "Chats", icon: MessageCircle },
  { id: "stories", label: "Stories", icon: CircleDot },
  { id: "groups", label: "Groups", icon: Users },
  { id: "explore", label: "Explore", icon: Compass },
  { id: "channels", label: "Channels", icon: Radio },
  { id: "bots", label: "Bots", icon: Bot },
  { id: "saved", label: "Saved", icon: Bookmark },
];

export function CategoryTabs({
  activeCategory,
  onCategoryChange,
  unreadCounts = {},
}: CategoryTabsProps) {
  return (
    <div className="border-b">
      <ScrollArea className="w-full">
        <div className="flex px-2 py-2 gap-1">
          {categories.map((category) => {
            const Icon = category.icon;
            const count = unreadCounts[category.id];
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  "flex flex-col items-center gap-1 min-w-[56px] px-2 py-2 rounded-lg transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover-elevate active-elevate-2 text-muted-foreground"
                )}
                data-testid={`tab-${category.id}`}
              >
                <div className="relative">
                  <Icon className="h-5 w-5" />
                  {count && count > 0 && (
                    <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center">
                      {count > 99 ? "99+" : count}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium">{category.label}</span>
              </button>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
