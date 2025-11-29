import { ChatListItem } from "../chat/ChatListItem";

export default function ChatListItemExample() {
  return (
    <div className="w-80 space-y-1">
      <ChatListItem
        id="1"
        name="Alice Johnson"
        lastMessage="Hey! Are you coming to the party tonight?"
        timestamp="2:34 PM"
        unreadCount={3}
        isOnline
        lastMessageStatus="delivered"
        onClick={() => console.log("Chat 1 clicked")}
      />
      <ChatListItem
        id="2"
        name="Team Project"
        lastMessage="Sarah: The presentation is ready"
        timestamp="1:15 PM"
        unreadCount={12}
        isGroup
        isTyping
        onClick={() => console.log("Chat 2 clicked")}
      />
      <ChatListItem
        id="3"
        name="Bob Smith"
        lastMessage="Thanks for your help!"
        timestamp="Yesterday"
        isOnline={false}
        isSelected
        lastMessageStatus="read"
        onClick={() => console.log("Chat 3 clicked")}
      />
    </div>
  );
}
