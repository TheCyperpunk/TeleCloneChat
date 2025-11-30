import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChatSidebar } from "@/components/layout/ChatSidebar";
import { ChatWindow } from "@/components/layout/ChatWindow";
import { ProfilePanel } from "@/components/layout/ProfilePanel";
import { NewChatDialog } from "@/components/layout/NewChatDialog";
import { StoryViewer } from "@/components/stories/StoryViewer";
import { useIsMobile } from "@/hooks/use-mobile";
import { MessageBubbleProps } from "@/components/chat/MessageBubble";
import { StoryUser } from "@/components/views/StoriesView";
import { Channel } from "@/components/views/ChannelsView";
import { BotItem } from "@/components/views/BotsView";
import { SavedMessage } from "@/components/views/SavedView";

// todo: remove mock data - replace with real API data
const mockChats = [
  {
    id: "1",
    name: "Alice Johnson",
    lastMessage: "Hey! Are you coming to the party tonight?",
    timestamp: "2:34 PM",
    unreadCount: 3,
    isOnline: true,
    lastMessageStatus: "delivered" as const,
    bio: "Software developer. Coffee enthusiast.",
    username: "alice_dev",
    phone: "+1 234 567 8900",
  },
  {
    id: "3",
    name: "Bob Smith",
    lastMessage: "Thanks for your help with the code review!",
    timestamp: "Yesterday",
    isOnline: false,
    lastMessageStatus: "read" as const,
    bio: "Full-stack developer. Open source contributor.",
    username: "bob_codes",
  },
  {
    id: "4",
    name: "Carol White",
    lastMessage: "See you at the meeting tomorrow!",
    timestamp: "Yesterday",
    isOnline: true,
    lastMessageStatus: "read" as const,
    bio: "UX Designer. Cat mom.",
    username: "carol_ux",
  },
  {
    id: "6",
    name: "David Brown",
    lastMessage: "The concert was amazing!",
    timestamp: "Sun",
    isOnline: false,
    lastMessageStatus: "read" as const,
  },
  {
    id: "7",
    name: "Eva Green",
    lastMessage: "Happy birthday!",
    timestamp: "Sat",
    isOnline: true,
    lastMessageStatus: "delivered" as const,
  },
];

// todo: remove mock data
const mockGroups = [
  {
    id: "2",
    name: "Team Project",
    lastMessage: "Sarah: The presentation is ready for review",
    timestamp: "1:15 PM",
    unreadCount: 12,
    isGroup: true,
    memberCount: 8,
  },
  {
    id: "5",
    name: "Family Group",
    lastMessage: "Mom: Don't forget Sunday dinner!",
    timestamp: "Mon",
    unreadCount: 5,
    isGroup: true,
    memberCount: 6,
  },
  {
    id: "g3",
    name: "College Friends",
    lastMessage: "Jake: Reunion next month?",
    timestamp: "Tue",
    isGroup: true,
    memberCount: 15,
  },
  {
    id: "g4",
    name: "Book Club",
    lastMessage: "Next read: The Great Gatsby",
    timestamp: "Wed",
    isGroup: true,
    memberCount: 8,
  },
];

// todo: remove mock data
const mockStories: StoryUser[] = [
  { id: "1", name: "Alice Johnson", hasStory: true, isViewed: false, storyCount: 3, lastUpdate: "2h ago" },
  { id: "3", name: "Bob Smith", hasStory: true, isViewed: true, storyCount: 1, lastUpdate: "5h ago" },
  { id: "4", name: "Carol White", hasStory: true, isViewed: false, storyCount: 2, lastUpdate: "1h ago" },
  { id: "6", name: "David Brown", hasStory: true, isViewed: false, storyCount: 4, lastUpdate: "3h ago" },
  { id: "7", name: "Eva Green", hasStory: true, isViewed: true, storyCount: 1, lastUpdate: "6h ago" },
];

// todo: remove mock data
const mockChannels: Channel[] = [
  {
    id: "ch1",
    name: "Tech News Daily",
    description: "Latest technology news and updates",
    subscriberCount: 125000,
    isSubscribed: true,
    isVerified: true,
    lastPost: "Apple announces new MacBook Pro with M4 chip",
    lastPostTime: "1h ago",
  },
  {
    id: "ch2",
    name: "Crypto Updates",
    description: "Cryptocurrency market analysis and news",
    subscriberCount: 89000,
    isSubscribed: false,
    isVerified: true,
    lastPost: "Bitcoin reaches new all-time high",
  },
  {
    id: "ch3",
    name: "Design Inspiration",
    description: "Daily design inspiration and resources",
    subscriberCount: 45000,
    isSubscribed: true,
    lastPost: "10 UI trends for 2025",
  },
  {
    id: "ch4",
    name: "Startup Hub",
    description: "Startup news, funding updates, and tips",
    subscriberCount: 67000,
    isSubscribed: false,
    isVerified: true,
    lastPost: "Series A funding tips from YC partners",
  },
];

// todo: remove mock data
const mockBots: BotItem[] = [
  {
    id: "b1",
    name: "GPT Assistant",
    username: "gpt_helper",
    description: "AI-powered assistant for answering questions and helping with tasks",
    category: "AI & Productivity",
    isVerified: true,
    rating: 4.8,
    usersCount: 500000,
  },
  {
    id: "b2",
    name: "Weather Bot",
    username: "weather_now",
    description: "Get real-time weather updates for any location",
    category: "Utilities",
    rating: 4.5,
    usersCount: 120000,
  },
  {
    id: "b3",
    name: "Translate Bot",
    username: "translator",
    description: "Translate text between 100+ languages instantly",
    category: "AI & Productivity",
    isVerified: true,
    rating: 4.7,
    usersCount: 300000,
  },
  {
    id: "b4",
    name: "Quiz Master",
    username: "quiz_bot",
    description: "Test your knowledge with fun trivia quizzes",
    category: "Games",
    rating: 4.3,
    usersCount: 80000,
  },
  {
    id: "b5",
    name: "Reminder Bot",
    username: "remind_me",
    description: "Set reminders and never forget important tasks",
    category: "Utilities",
    rating: 4.6,
    usersCount: 200000,
  },
];

// todo: remove mock data
const mockSavedMessages: SavedMessage[] = [
  {
    id: "sm1",
    content: "Here's the link to the project documentation you asked for",
    fromName: "Alice Johnson",
    chatName: "Alice Johnson",
    timestamp: "Yesterday",
    type: "link",
  },
  {
    id: "sm2",
    content: "Meeting notes from today's standup",
    fromName: "Bob Smith",
    chatName: "Team Project",
    timestamp: "2 days ago",
    type: "text",
  },
  {
    id: "sm3",
    content: "Check out this design mockup",
    fromName: "Carol White",
    chatName: "Design Team",
    timestamp: "3 days ago",
    type: "image",
  },
];

// todo: remove mock data
const mockExplorePosts = [
  { id: "e1", imageUrl: "https://picsum.photos/seed/1/400/400", likes: 1234, comments: 89, userName: "user1" },
  { id: "e2", imageUrl: "https://picsum.photos/seed/2/400/400", likes: 567, comments: 34, userName: "user2" },
  { id: "e3", imageUrl: "https://picsum.photos/seed/3/400/400", likes: 890, comments: 56, userName: "user3" },
  { id: "e4", imageUrl: "https://picsum.photos/seed/4/400/400", likes: 2345, comments: 123, userName: "user4" },
  { id: "e5", imageUrl: "https://picsum.photos/seed/5/400/400", likes: 432, comments: 21, userName: "user5" },
  { id: "e6", imageUrl: "https://picsum.photos/seed/6/400/400", likes: 765, comments: 45, userName: "user6" },
  { id: "e7", imageUrl: "https://picsum.photos/seed/7/400/400", likes: 1098, comments: 67, userName: "user7" },
  { id: "e8", imageUrl: "https://picsum.photos/seed/8/400/400", likes: 543, comments: 32, userName: "user8" },
  { id: "e9", imageUrl: "https://picsum.photos/seed/9/400/400", likes: 876, comments: 54, userName: "user9" },
  { id: "e10", imageUrl: "https://picsum.photos/seed/10/400/400", likes: 1567, comments: 98, userName: "user10" },
  { id: "e11", imageUrl: "https://picsum.photos/seed/11/400/400", likes: 234, comments: 12, userName: "user11" },
  { id: "e12", imageUrl: "https://picsum.photos/seed/12/400/400", likes: 678, comments: 43, userName: "user12" },
];

// todo: remove mock data
const mockContacts = [
  { id: "1", name: "Alice Johnson", isOnline: true },
  { id: "3", name: "Bob Smith", isOnline: false, lastSeen: "last seen 2h ago" },
  { id: "4", name: "Carol White", isOnline: true },
  { id: "6", name: "David Brown", isOnline: false, lastSeen: "last seen yesterday" },
  { id: "7", name: "Eva Green", isOnline: true },
  { id: "8", name: "Frank Miller", isOnline: false, lastSeen: "last seen 3d ago" },
  { id: "9", name: "Grace Lee", isOnline: true },
];

// todo: remove mock data
const mockMessages: Record<string, MessageBubbleProps[]> = {
  "1": [
    { id: "m1", content: "Hey! How's it going?", timestamp: "2:30 PM", isOwn: false, senderName: "Alice" },
    { id: "m2", content: "Pretty good! Just finished that project.", timestamp: "2:31 PM", isOwn: true, status: "read" },
    { id: "m3", content: "Nice! We should celebrate", timestamp: "2:32 PM", isOwn: false, senderName: "Alice" },
    { id: "m4", content: "Are you coming to the party tonight?", timestamp: "2:34 PM", isOwn: false, senderName: "Alice" },
  ],
  "2": [
    { id: "m5", content: "Team, I've updated the project timeline.", timestamp: "12:00 PM", isOwn: false, senderName: "Mike" },
    { id: "m6", content: "Looks good to me!", timestamp: "12:15 PM", isOwn: true, status: "read" },
    { id: "m7", content: "I'll review the changes today.", timestamp: "12:45 PM", isOwn: false, senderName: "Sarah" },
    { id: "m8", content: "The presentation is ready for review", timestamp: "1:15 PM", isOwn: false, senderName: "Sarah" },
  ],
  "3": [
    { id: "m9", content: "Can you help me with this code review?", timestamp: "Yesterday", isOwn: false, senderName: "Bob" },
    { id: "m10", content: "Sure! Send me the PR link", timestamp: "Yesterday", isOwn: true, status: "read" },
    { id: "m11", content: "Done! Take a look when you can", timestamp: "Yesterday", isOwn: false, senderName: "Bob" },
    { id: "m12", content: "Thanks for your help with the code review!", timestamp: "Yesterday", isOwn: false, senderName: "Bob" },
  ],
};

// todo: remove mock data
const mockUserStories: Record<string, { id: string; content?: string; timestamp: string; backgroundColor?: string }[]> = {
  "1": [
    { id: "us1", content: "Just finished my morning workout!", timestamp: "2h ago", backgroundColor: "bg-gradient-to-br from-green-400 to-blue-500" },
    { id: "us2", content: "Coffee time", timestamp: "4h ago", backgroundColor: "bg-gradient-to-br from-orange-400 to-pink-500" },
  ],
  "3": [
    { id: "us3", content: "Working on something exciting!", timestamp: "5h ago", backgroundColor: "bg-gradient-to-br from-purple-400 to-indigo-500" },
  ],
  "4": [
    { id: "us4", content: "New design coming soon!", timestamp: "1h ago", backgroundColor: "bg-gradient-to-br from-pink-400 to-red-500" },
  ],
};

function TeleChat() {
  const isMobile = useIsMobile();
  const [selectedChatId, setSelectedChatId] = useState<string | undefined>();
  const [showProfile, setShowProfile] = useState(false);
  const [showNewChat, setShowNewChat] = useState(false);
  const [storyViewer, setStoryViewer] = useState<{ userId: string; index: number } | null>(null);
  const [messages, setMessages] = useState(mockMessages);
  const [channels, setChannels] = useState(mockChannels);
  const [savedMessages, setSavedMessages] = useState(mockSavedMessages);

  const allChats = [...mockChats, ...mockGroups];
  const selectedChat = allChats.find((chat) => chat.id === selectedChatId);
  const chatMessages = selectedChatId ? messages[selectedChatId] || [] : [];

  const handleSendMessage = (content: string) => {
    if (!selectedChatId) return;

    const newMessage: MessageBubbleProps = {
      id: `m${Date.now()}`,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
      status: "sent",
    };

    setMessages((prev) => ({
      ...prev,
      [selectedChatId]: [...(prev[selectedChatId] || []), newMessage],
    }));
  };

  const handleStoryClick = (userId: string) => {
    const storyIndex = mockStories.findIndex((s) => s.id === userId);
    if (storyIndex !== -1 && mockUserStories[userId]) {
      setStoryViewer({ userId, index: storyIndex });
    }
  };

  const handleNextStory = () => {
    if (!storyViewer) return;
    const storiesWithContent = mockStories.filter((s) => s.hasStory && mockUserStories[s.id]);
    const currentIdx = storiesWithContent.findIndex((s) => s.id === storyViewer.userId);
    if (currentIdx < storiesWithContent.length - 1) {
      const next = storiesWithContent[currentIdx + 1];
      setStoryViewer({ userId: next.id, index: mockStories.findIndex((s) => s.id === next.id) });
    } else {
      setStoryViewer(null);
    }
  };

  const handlePreviousStory = () => {
    if (!storyViewer) return;
    const storiesWithContent = mockStories.filter((s) => s.hasStory && mockUserStories[s.id]);
    const currentIdx = storiesWithContent.findIndex((s) => s.id === storyViewer.userId);
    if (currentIdx > 0) {
      const prev = storiesWithContent[currentIdx - 1];
      setStoryViewer({ userId: prev.id, index: mockStories.findIndex((s) => s.id === prev.id) });
    }
  };

  const handleSelectContact = (contactId: string) => {
    const existingChat = allChats.find((chat) => chat.id === contactId);
    if (existingChat) {
      setSelectedChatId(contactId);
    } else {
      console.log("Start new chat with contact:", contactId);
      setSelectedChatId(contactId);
    }
  };

  const handleCreateGroup = (memberIds: string[], groupName: string) => {
    console.log("Create group:", groupName, "with members:", memberIds);
  };

  const handleSubscribeChannel = (channelId: string) => {
    setChannels((prev) =>
      prev.map((ch) =>
        ch.id === channelId ? { ...ch, isSubscribed: !ch.isSubscribed } : ch
      )
    );
  };

  const handleDeleteSavedMessage = (messageId: string) => {
    setSavedMessages((prev) => prev.filter((m) => m.id !== messageId));
  };

  const showSidebar = !isMobile || !selectedChatId;
  const showChat = !isMobile || selectedChatId;

  return (
    <div className="h-screen w-full flex overflow-hidden bg-background">
      {showSidebar && (
        <ChatSidebar
          chats={mockChats}
          stories={mockStories}
          groups={mockGroups}
          explorePosts={mockExplorePosts}
          channels={channels}
          bots={mockBots}
          savedMessages={savedMessages}
          currentUserName="You"
          currentUserAvatar={undefined}
          hasOwnStory={false}
          selectedChatId={selectedChatId}
          onChatSelect={setSelectedChatId}
          onStoryClick={handleStoryClick}
          onAddStory={() => console.log("Add story")}
          onNewChat={() => setShowNewChat(true)}
          onNewGroup={() => setShowNewChat(true)}
          onNewChannel={() => console.log("Create channel")}
          onSettings={() => console.log("Settings")}
          onSubscribeChannel={handleSubscribeChannel}
          onStartBot={(botId) => console.log("Start bot:", botId)}
          onDeleteSavedMessage={handleDeleteSavedMessage}
        />
      )}

      {showChat && (
        <div className="flex-1 flex">
          {selectedChat ? (
            <ChatWindow
              chat={{
                id: selectedChat.id,
                name: selectedChat.name,
                isOnline: (selectedChat as any).isOnline,
                isGroup: (selectedChat as any).isGroup,
                memberCount: (selectedChat as any).memberCount,
              }}
              messages={chatMessages}
              onSendMessage={handleSendMessage}
              onBack={() => setSelectedChatId(undefined)}
              onProfileClick={() => setShowProfile(true)}
              showBackButton={isMobile}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-accent/20">
              <div className="text-center text-muted-foreground">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-accent/50 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-muted-foreground/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold mb-2">Welcome to TeleChat</h2>
                <p className="text-sm">Select a chat to start messaging</p>
              </div>
            </div>
          )}

          {showProfile && selectedChat && !isMobile && (
            <ProfilePanel
              name={selectedChat.name}
              isOnline={(selectedChat as any).isOnline}
              bio={(selectedChat as any).bio}
              username={(selectedChat as any).username}
              phone={(selectedChat as any).phone}
              isGroup={(selectedChat as any).isGroup}
              memberCount={(selectedChat as any).memberCount}
              sharedMedia={[
                { type: "image", count: 42 },
                { type: "file", count: 12 },
                { type: "link", count: 8 },
                { type: "audio", count: 3 },
              ]}
              onClose={() => setShowProfile(false)}
              onMuteToggle={() => console.log("Mute toggled")}
            />
          )}
        </div>
      )}

      <NewChatDialog
        open={showNewChat}
        onClose={() => setShowNewChat(false)}
        contacts={mockContacts}
        onSelectContact={handleSelectContact}
        onCreateGroup={handleCreateGroup}
      />

      {storyViewer && mockUserStories[storyViewer.userId] && (
        <StoryViewer
          userId={storyViewer.userId}
          userName={mockStories.find((s) => s.id === storyViewer.userId)?.name || ""}
          stories={mockUserStories[storyViewer.userId]}
          onClose={() => setStoryViewer(null)}
          onNext={handleNextStory}
          onPrevious={handlePreviousStory}
          hasNext={
            mockStories.filter((s) => s.hasStory && mockUserStories[s.id]).findIndex((s) => s.id === storyViewer.userId) <
            mockStories.filter((s) => s.hasStory && mockUserStories[s.id]).length - 1
          }
          hasPrevious={
            mockStories.filter((s) => s.hasStory && mockUserStories[s.id]).findIndex((s) => s.id === storyViewer.userId) > 0
          }
        />
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TeleChat />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
