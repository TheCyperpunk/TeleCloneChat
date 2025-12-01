import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatListItem, ChatListItemProps } from "../chat/ChatListItem";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";

interface GroupsViewProps {
  groups: ChatListItemProps[];
  selectedGroupId?: string;
  onGroupSelect: (groupId: string) => void;
  onCreateGroup: () => void;
}

export function GroupsView({
  groups,
  selectedGroupId,
  onGroupSelect,
  onCreateGroup,
}: GroupsViewProps) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="p-3">
        <Button
          onClick={onCreateGroup}
          variant="outline"
          className="w-full justify-start gap-3"
          data-testid="button-create-group"
        >
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
            <Plus className="h-5 w-5 text-primary-foreground" />
          </div>
          <span>Create New Group</span>
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {groups.length === 0 ? (
            <div className="text-center py-12 px-4">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">No groups yet</p>
              <p className="text-xs text-muted-foreground mt-1">
                Create a group to start chatting
              </p>
            </div>
          ) : (
            groups.map((group) => (
              <ChatListItem
                key={group.id}
                {...group}
                type="group"
                isSelected={group.id === selectedGroupId}
                onClick={() => onGroupSelect(group.id)}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
