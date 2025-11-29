import { useState } from "react";
import { StoryViewer } from "../stories/StoryViewer";
import { Button } from "@/components/ui/button";

const mockStories = [
  {
    id: "1",
    content: "Having an amazing day at the beach!",
    timestamp: "2h ago",
    backgroundColor: "bg-gradient-to-br from-orange-400 to-pink-500",
  },
  {
    id: "2",
    content: "Just finished my morning workout. Feeling energized!",
    timestamp: "4h ago",
    backgroundColor: "bg-gradient-to-br from-green-400 to-blue-500",
  },
];

export default function StoryViewerExample() {
  const [showViewer, setShowViewer] = useState(false);

  return (
    <>
      <Button onClick={() => setShowViewer(true)}>View Story</Button>
      {showViewer && (
        <StoryViewer
          userId="u2"
          userName="Alice Johnson"
          stories={mockStories}
          onClose={() => setShowViewer(false)}
          hasNext
          hasPrevious={false}
        />
      )}
    </>
  );
}
