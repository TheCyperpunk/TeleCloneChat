import { StoryCircle } from "./StoryCircle";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export interface Story {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  isViewed: boolean;
}

interface StoriesBarProps {
  stories: Story[];
  currentUserId: string;
  currentUserName: string;
  currentUserAvatar?: string;
  hasOwnStory?: boolean;
  onStoryClick: (userId: string) => void;
  onAddStory: () => void;
}

export function StoriesBar({
  stories,
  currentUserId,
  currentUserName,
  currentUserAvatar,
  hasOwnStory = false,
  onStoryClick,
  onAddStory,
}: StoriesBarProps) {
  const uniqueUsers = stories.reduce((acc, story) => {
    if (!acc.find((s) => s.userId === story.userId)) {
      acc.push(story);
    }
    return acc;
  }, [] as Story[]);

  return (
    <div className="border-b">
      <ScrollArea className="w-full">
        <div className="flex px-2">
          <StoryCircle
            id={currentUserId}
            name={currentUserName}
            avatar={currentUserAvatar}
            isOwn
            hasStory={hasOwnStory}
            onClick={hasOwnStory ? () => onStoryClick(currentUserId) : onAddStory}
          />
          {uniqueUsers.map((story) => (
            <StoryCircle
              key={story.userId}
              id={story.userId}
              name={story.userName}
              avatar={story.userAvatar}
              isViewed={story.isViewed}
              onClick={() => onStoryClick(story.userId)}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
