import { Avatar } from "../chat/Avatar";

export default function AvatarExample() {
  return (
    <div className="flex items-center gap-4">
      <Avatar name="John Doe" size="sm" isOnline showStatus />
      <Avatar name="Jane Smith" size="md" isOnline={false} showStatus />
      <Avatar name="Alex Johnson" size="lg" isOnline showStatus />
      <Avatar name="Chris Lee" size="xl" />
    </div>
  );
}
