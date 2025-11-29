import { MessageBubble } from "../chat/MessageBubble";

export default function MessageBubbleExample() {
  return (
    <div className="w-full max-w-md space-y-1 bg-background p-4">
      <MessageBubble
        id="1"
        content="Hey there! How are you doing?"
        timestamp="2:30 PM"
        isOwn={false}
        senderName="Alice"
        isFirstInGroup
        isLastInGroup
      />
      <MessageBubble
        id="2"
        content="I'm doing great, thanks for asking! Just finished working on that project we discussed."
        timestamp="2:31 PM"
        isOwn
        status="read"
        isFirstInGroup
        isLastInGroup={false}
      />
      <MessageBubble
        id="3"
        content="Want to grab coffee later?"
        timestamp="2:31 PM"
        isOwn
        status="read"
        isFirstInGroup={false}
        isLastInGroup
      />
      <MessageBubble
        id="4"
        content="Sure! Let's meet at 4pm"
        timestamp="2:32 PM"
        isOwn={false}
        senderName="Alice"
        replyTo={{ name: "You", content: "Want to grab coffee later?" }}
        isFirstInGroup
        isLastInGroup
      />
    </div>
  );
}
