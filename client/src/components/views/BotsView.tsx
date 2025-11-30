import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "../chat/Avatar";
import { Button } from "@/components/ui/button";
import { Bot, Search, Zap, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface BotItem {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  description: string;
  category: string;
  isVerified?: boolean;
  rating?: number;
  usersCount?: number;
}

interface BotsViewProps {
  bots: BotItem[];
  selectedBotId?: string;
  onBotSelect: (botId: string) => void;
  onStartBot: (botId: string) => void;
}

export function BotsView({
  bots,
  selectedBotId,
  onBotSelect,
  onStartBot,
}: BotsViewProps) {
  const [search, setSearch] = useState("");

  const filteredBots = bots.filter(
    (bot) =>
      bot.name.toLowerCase().includes(search.toLowerCase()) ||
      bot.username.toLowerCase().includes(search.toLowerCase())
  );

  const categories = Array.from(new Set(bots.map((b) => b.category)));

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bots..."
            className="pl-9 rounded-full bg-accent/50 border-0"
            data-testid="input-bot-search"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-4">
          {filteredBots.length === 0 ? (
            <div className="text-center py-12 px-4">
              <Bot className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">No bots found</p>
            </div>
          ) : (
            categories.map((category) => {
              const categoryBots = filteredBots.filter(
                (b) => b.category === category
              );
              if (categoryBots.length === 0) return null;

              return (
                <div key={category}>
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-2">
                    {category}
                  </h3>
                  <div className="space-y-1">
                    {categoryBots.map((bot) => (
                      <div
                        key={bot.id}
                        className={cn(
                          "flex items-start gap-3 p-3 rounded-lg hover-elevate active-elevate-2 cursor-pointer",
                          selectedBotId === bot.id && "bg-accent"
                        )}
                        onClick={() => onBotSelect(bot.id)}
                        data-testid={`bot-${bot.id}`}
                      >
                        <div className="relative">
                          <Avatar src={bot.avatar} name={bot.name} size="lg" />
                          <span className="absolute -bottom-0.5 -right-0.5 bg-primary rounded-full p-0.5">
                            <Bot className="h-3 w-3 text-primary-foreground" />
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-sm">
                              {bot.name}
                            </span>
                            {bot.isVerified && (
                              <Zap className="h-3.5 w-3.5 text-primary" />
                            )}
                          </div>
                          <p className="text-xs text-primary">@{bot.username}</p>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                            {bot.description}
                          </p>
                          {bot.rating && (
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                              <span className="text-xs text-muted-foreground">
                                {bot.rating.toFixed(1)}
                              </span>
                            </div>
                          )}
                        </div>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onStartBot(bot.id);
                          }}
                          data-testid={`button-start-bot-${bot.id}`}
                        >
                          Start
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
