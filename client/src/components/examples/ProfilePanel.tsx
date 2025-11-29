import { ProfilePanel } from "../layout/ProfilePanel";

export default function ProfilePanelExample() {
  return (
    <div className="h-[500px]">
      <ProfilePanel
        name="Alice Johnson"
        isOnline
        bio="Software developer. Coffee enthusiast. Cat lover."
        username="alice_dev"
        phone="+1 234 567 8900"
        sharedMedia={[
          { type: "image", count: 42 },
          { type: "file", count: 12 },
          { type: "link", count: 8 },
          { type: "audio", count: 3 },
        ]}
        onClose={() => console.log("Close profile")}
        onMuteToggle={() => console.log("Toggle mute")}
      />
    </div>
  );
}
