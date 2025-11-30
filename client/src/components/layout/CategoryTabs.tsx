import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export type Category = "all" | "groups" | "channels" | "bots" | "saved";

interface CategoryTabsProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
  unreadCounts?: Partial<Record<Category, number>>;
}

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "groups", label: "Groups" },
  { id: "channels", label: "Channels" },
  { id: "bots", label: "Bots" },
  { id: "saved", label: "Saved" },
];

export function CategoryTabs({
  activeCategory,
  onCategoryChange,
  unreadCounts = {},
}: CategoryTabsProps) {
  return (
    <div className="border-b border-border/50">
      <ScrollArea className="w-full">
        <div className="flex px-3 py-2 gap-2">
          {categories.map((category) => {
            const count = unreadCounts[category.id];
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
                data-testid={`tab-${category.id}`}
              >
                <span>{category.label}</span>
                {count !== undefined && count > 0 && (
                  <span
                    className={cn(
                      "min-w-5 h-5 px-1.5 rounded-full text-xs flex items-center justify-center font-semibold",
                      isActive
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-primary text-primary-foreground"
                    )}
                  >
                    {count > 999 ? "999+" : count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}
