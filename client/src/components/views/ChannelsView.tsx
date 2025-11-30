import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "../chat/Avatar";
import { Button } from "@/components/ui/button";
import { Plus, Radio, Users, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Channel {
  id: string;
  name: string;
  avatar?: string;
  description: string;
  subscriberCount: number;
  isSubscribed: boolean;
  lastPost?: string;
  lastPostTime?: string;
  isVerified?: boolean;
}

interface ChannelsViewProps {
  channels: Channel[];
  selectedChannelId?: string;
  onChannelSelect: (channelId: string) => void;
  onCreateChannel: () => void;
  onSubscribe: (channelId: string) => void;
}

function formatSubscribers(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
}

export function ChannelsView({
  channels,
  selectedChannelId,
  onChannelSelect,
  onCreateChannel,
  onSubscribe,
}: ChannelsViewProps) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="p-3">
        <Button
          onClick={onCreateChannel}
          variant="outline"
          className="w-full justify-start gap-3"
          data-testid="button-create-channel"
        >
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
            <Plus className="h-5 w-5 text-primary-foreground" />
          </div>
          <span>Create New Channel</span>
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {channels.length === 0 ? (
            <div className="text-center py-12 px-4">
              <Radio className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">No channels yet</p>
              <p className="text-xs text-muted-foreground mt-1">
                Create or subscribe to channels
              </p>
            </div>
          ) : (
            channels.map((channel) => (
              <div
                key={channel.id}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg hover-elevate active-elevate-2 cursor-pointer",
                  selectedChannelId === channel.id && "bg-accent"
                )}
                onClick={() => onChannelSelect(channel.id)}
                data-testid={`channel-${channel.id}`}
              >
                <Avatar src={channel.avatar} name={channel.name} size="lg" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-sm truncate">
                      {channel.name}
                    </span>
                    {channel.isVerified && (
                      <span className="flex-shrink-0 h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                        <Check className="h-2.5 w-2.5 text-primary-foreground" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {formatSubscribers(channel.subscriberCount)} subscribers
                  </p>
                  {channel.lastPost && (
                    <p className="text-xs text-muted-foreground truncate mt-1">
                      {channel.lastPost}
                    </p>
                  )}
                </div>
                <Button
                  size="sm"
                  variant={channel.isSubscribed ? "outline" : "default"}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSubscribe(channel.id);
                  }}
                  data-testid={`button-subscribe-${channel.id}`}
                >
                  {channel.isSubscribed ? "Joined" : "Join"}
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
