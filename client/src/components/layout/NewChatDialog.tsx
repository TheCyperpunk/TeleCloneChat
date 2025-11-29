import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "../chat/Avatar";
import { Search, Users, UserPlus, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  isOnline?: boolean;
  lastSeen?: string;
}

interface NewChatDialogProps {
  open: boolean;
  onClose: () => void;
  contacts: Contact[];
  onSelectContact: (contactId: string) => void;
  onCreateGroup: (memberIds: string[], groupName: string) => void;
}

export function NewChatDialog({
  open,
  onClose,
  contacts,
  onSelectContact,
  onCreateGroup,
}: NewChatDialogProps) {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<"chat" | "group">("chat");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [groupName, setGroupName] = useState("");

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleContactClick = (contactId: string) => {
    if (mode === "chat") {
      onSelectContact(contactId);
      onClose();
    } else {
      setSelectedMembers((prev) =>
        prev.includes(contactId)
          ? prev.filter((id) => id !== contactId)
          : [...prev, contactId]
      );
    }
  };

  const handleCreateGroup = () => {
    if (selectedMembers.length >= 2 && groupName.trim()) {
      onCreateGroup(selectedMembers, groupName.trim());
      onClose();
      setSelectedMembers([]);
      setGroupName("");
      setMode("chat");
    }
  };

  const resetState = () => {
    setSearch("");
    setMode("chat");
    setSelectedMembers([]);
    setGroupName("");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          resetState();
          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>
            {mode === "chat" ? "New Message" : "New Group"}
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 border-b space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search contacts..."
              className="pl-9"
              data-testid="input-search-contacts"
            />
          </div>

          {mode === "chat" && (
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
              onClick={() => setMode("group")}
              data-testid="button-new-group"
            >
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <Users className="h-5 w-5 text-primary-foreground" />
              </div>
              <span>New Group</span>
            </Button>
          )}

          {mode === "group" && (
            <div className="space-y-3">
              <Input
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Group name"
                data-testid="input-group-name"
              />
              {selectedMembers.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedMembers.map((memberId) => {
                    const contact = contacts.find((c) => c.id === memberId);
                    if (!contact) return null;
                    return (
                      <span
                        key={memberId}
                        className="flex items-center gap-1 bg-accent rounded-full pl-1 pr-2 py-1"
                      >
                        <Avatar src={contact.avatar} name={contact.name} size="sm" />
                        <span className="text-xs">{contact.name.split(" ")[0]}</span>
                        <button
                          onClick={() =>
                            setSelectedMembers((prev) =>
                              prev.filter((id) => id !== memberId)
                            )
                          }
                          className="hover:bg-muted rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        <ScrollArea className="h-[300px]">
          <div className="p-2">
            {filteredContacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => handleContactClick(contact.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-2 rounded-md hover-elevate active-elevate-2",
                  mode === "group" &&
                    selectedMembers.includes(contact.id) &&
                    "bg-accent"
                )}
                data-testid={`contact-${contact.id}`}
              >
                <Avatar
                  src={contact.avatar}
                  name={contact.name}
                  size="md"
                  isOnline={contact.isOnline}
                  showStatus
                />
                <div className="flex-1 text-left">
                  <span className="font-medium text-sm">{contact.name}</span>
                  <p className="text-xs text-muted-foreground">
                    {contact.isOnline ? "online" : contact.lastSeen || "offline"}
                  </p>
                </div>
                {mode === "group" && selectedMembers.includes(contact.id) && (
                  <span className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>

        {mode === "group" && (
          <div className="p-4 border-t">
            <Button
              onClick={handleCreateGroup}
              disabled={selectedMembers.length < 2 || !groupName.trim()}
              className="w-full"
              data-testid="button-create-group"
            >
              Create Group ({selectedMembers.length} members)
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
