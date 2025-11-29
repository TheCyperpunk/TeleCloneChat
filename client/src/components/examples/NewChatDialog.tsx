import { useState } from "react";
import { NewChatDialog } from "../layout/NewChatDialog";
import { Button } from "@/components/ui/button";

const mockContacts = [
  { id: "c1", name: "Alice Johnson", isOnline: true },
  { id: "c2", name: "Bob Smith", isOnline: false, lastSeen: "last seen 2h ago" },
  { id: "c3", name: "Carol White", isOnline: true },
  { id: "c4", name: "David Brown", isOnline: false, lastSeen: "last seen yesterday" },
  { id: "c5", name: "Eva Green", isOnline: true },
];

export default function NewChatDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>New Chat</Button>
      <NewChatDialog
        open={open}
        onClose={() => setOpen(false)}
        contacts={mockContacts}
        onSelectContact={(id) => console.log("Selected contact:", id)}
        onCreateGroup={(members, name) =>
          console.log("Create group:", name, members)
        }
      />
    </>
  );
}
