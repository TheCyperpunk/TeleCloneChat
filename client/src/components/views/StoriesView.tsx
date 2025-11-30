import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "../chat/Avatar";
import { Button } from "@/components/ui/button";
import { Plus, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StoryUser {
  id: string;
  name: string;
  avatar?: string;
  hasStory: boolean;
  isViewed: boolean;
  storyCount: number;
  lastUpdate?: string;
}

interface StoriesViewProps {
  stories: StoryUser[];
  currentUserName: string;
  currentUserAvatar?: string;
  hasOwnStory: boolean;
  onStoryClick: (userId: string) => void;
  onAddStory: () => void;
}

export function StoriesView({
  stories,
  currentUserName,
  currentUserAvatar,
  hasOwnStory,
  onStoryClick,
  onAddStory,
}: StoriesViewProps) {
  return (
    <ScrollArea className="flex-1">
      <div className="p-3 space-y-2">
        <button
          onClick={hasOwnStory ? () => onStoryClick("current") : onAddStory}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover-elevate active-elevate-2"
          data-testid="story-own"
        >
          <div className="relative">
            <div
              className={cn(
                "p-[2px] rounded-full",
                hasOwnStory && "bg-gradient-to-tr from-primary to-blue-400"
              )}
            >
              <div className="bg-background rounded-full p-0.5">
                <Avatar src={currentUserAvatar} name={currentUserName} size="lg" />
              </div>
            </div>
            {!hasOwnStory && (
              <span className="absolute bottom-0 right-0 bg-primary rounded-full p-0.5 border-2 border-background">
                <Plus className="h-3 w-3 text-primary-foreground" />
              </span>
            )}
          </div>
          <div className="flex-1 text-left">
            <span className="font-medium text-sm">Your story</span>
            <p className="text-xs text-muted-foreground">
              {hasOwnStory ? "Tap to view" : "Add to your story"}
            </p>
          </div>
        </button>

        <div className="pt-2">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-2">
            Recent Stories
          </h3>
          {stories.filter(s => s.hasStory).map((story) => (
            <button
              key={story.id}
              onClick={() => onStoryClick(story.id)}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover-elevate active-elevate-2"
              data-testid={`story-user-${story.id}`}
            >
              <div
                className={cn(
                  "p-[2px] rounded-full",
                  !story.isViewed
                    ? "bg-gradient-to-tr from-primary to-blue-400"
                    : "bg-muted"
                )}
              >
                <div className="bg-background rounded-full p-0.5">
                  <Avatar src={story.avatar} name={story.name} size="lg" />
                </div>
              </div>
              <div className="flex-1 text-left">
                <span className="font-medium text-sm">{story.name}</span>
                <p className="text-xs text-muted-foreground">
                  {story.storyCount} {story.storyCount === 1 ? "story" : "stories"} • {story.lastUpdate || "Recently"}
                </p>
              </div>
              {story.isViewed && (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
