import { StoriesBar } from "../stories/StoriesBar";

const mockStories = [
  { id: "s1", userId: "u2", userName: "Alice Johnson", isViewed: false },
  { id: "s2", userId: "u3", userName: "Bob Smith", isViewed: true },
  { id: "s3", userId: "u4", userName: "Carol White", isViewed: false },
  { id: "s4", userId: "u5", userName: "David Brown", isViewed: false },
  { id: "s5", userId: "u6", userName: "Eva Green", isViewed: true },
];

export default function StoriesBarExample() {
  return (
    <div className="w-full max-w-md">
      <StoriesBar
        stories={mockStories}
        currentUserId="u1"
        currentUserName="You"
        hasOwnStory={false}
        onStoryClick={(userId) => console.log("Story clicked:", userId)}
        onAddStory={() => console.log("Add story")}
      />
    </div>
  );
}
