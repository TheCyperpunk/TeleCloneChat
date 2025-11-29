# Design Guidelines: Telegram Clone Application

## Design Approach
**Reference-Based Design:** Telegram Messenger
This messaging application will closely follow Telegram's established design patterns, adapting its mobile-first, efficiency-focused interface for web while maintaining its distinctive visual identity and interaction models.

## Layout System

### Core Structure
- **Three-Column Layout (Desktop):** Fixed sidebar (280px) for chat list, main chat area (flexible), optional info panel (320px)
- **Mobile:** Single-column stack with slide-out navigation and full-screen chat view
- **Spacing Primitives:** Use Tailwind units of 2, 3, 4, 6, and 8 for consistent spacing throughout (p-4, gap-3, m-2, etc.)

### Chat List Sidebar
- Full-height fixed panel with search bar at top (h-14)
- Scrollable chat items with 64px height per conversation
- Avatar (40px circle), name, timestamp, preview text, and unread badge layout
- Pinned chats section at top with subtle separator

### Main Chat Area
- Fixed header (56px) with contact info, avatar, online status, and action buttons
- Message container with padding (px-4 py-2) and bottom-aligned message input
- Message bubbles: outgoing (right-aligned, max-w-md), incoming (left-aligned, max-w-md)
- Input area (h-14) with attachment button, text field, and send button

## Typography

### Font Stack
- **Primary:** 'Inter' or 'SF Pro Display' for interface text
- **Monospace:** 'JetBrains Mono' for timestamps and technical info

### Hierarchy
- Contact names: text-sm font-semibold
- Message text: text-base (15px)
- Timestamps: text-xs opacity-70
- Preview text: text-sm opacity-60
- Header titles: text-lg font-medium
- Story names: text-xs truncate

## Component Library

### Navigation & Menus
- **Bottom Tab Bar (Mobile):** 5 fixed tabs with icons - Chats, Contacts, Stories, Settings (h-16)
- **Hamburger Menu:** Slide-out drawer with profile header and menu items (w-72)
- **Context Menus:** Floating dropdown on message long-press/right-click

### Chat Components
- **Message Bubbles:** Rounded corners (rounded-2xl), tail on sender side, padding (px-4 py-2)
- **Avatar System:** Circle avatars in 3 sizes - 32px (list), 40px (chat header), 56px (profile)
- **Status Indicators:** 8px circle for online (absolute bottom-right of avatar)
- **Typing Indicator:** Three animated dots within bubble layout
- **Message Metadata:** Timestamp + read status (checkmarks) inline at bottom-right

### Stories Section
- **Horizontal Scroll:** Avatar circles (64px) with gradient ring for unviewed stories
- **Story Viewer:** Full-screen overlay with progress bars (h-1) at top, tap zones for navigation
- **Story Creation:** Floating action button (56px circle) with camera icon

### Group Features
- **Group Header:** Stacked avatars for members (overlapping by 8px), member count
- **Member List:** Similar to chat list but with role badges and action icons
- **Group Info Panel:** Collapsible sections for media, links, members

### Forms & Input
- **Message Input:** Single-line expanding to multi-line (max 5 lines), rounded-3xl background
- **Search Bar:** Rounded-full with icon prefix, persistent in chat list (h-10)
- **Attachment Menu:** Grid of options (photos, files, location, poll) in bottom sheet

### Data Display
- **Last Seen:** Text below username in chat header (text-xs)
- **Unread Counters:** Circle badge (min-w-5 h-5) with count, positioned top-right
- **Date Separators:** Centered pill shape with date text in chat flow
- **Media Grid:** 2-3 column responsive grid in shared media section

### Overlays
- **Profile Modal:** Slide-up sheet (mobile) or centered card (desktop) with large avatar
- **Media Viewer:** Full-screen with transparent controls overlay
- **Settings Panels:** Nested navigation with back button and hierarchical menu items

## Interaction Patterns

### Message Actions
- Swipe right to reply (mobile), hover to show action buttons (desktop)
- Long-press/right-click for context menu (forward, delete, pin, select)
- Tap message to show timestamp, double-tap for reactions

### Navigation Flow
- Tap chat → slide animation to full-screen chat view (mobile)
- Back gesture/button returns to chat list
- Tap contact avatar → opens profile with shared media tabs

### Real-time Feedback
- Instant message delivery with status progression (clock → single check → double check)
- Online status updates reflected immediately in chat headers
- New message appears with subtle slide-in animation

## Responsive Behavior

### Breakpoints
- **Mobile:** < 768px - single column, bottom navigation
- **Tablet:** 768px-1024px - two columns (list + chat), collapsible info panel
- **Desktop:** > 1024px - three columns visible, persistent navigation

### Mobile-Specific
- Stories bar at top of chat list (horizontal scroll)
- FAB for new message (bottom-right, 56px)
- Swipe gestures for navigation and message actions
- Full-screen modals for all detail views

### Desktop Enhancements
- Persistent three-column layout
- Keyboard shortcuts (Ctrl+K for search, Esc to close modals)
- Hover states on all interactive elements
- Right panel toggles for chat info without disrupting main view

## Images

**No large hero images** - This is a utility application, not a marketing site.

**Functional Images:**
- User avatars throughout (profile photos, fallback to initials)
- Shared media thumbnails in chat and gallery views
- Story preview thumbnails in horizontal scroll
- Message attachments (images inline, files as cards)

All images should be circle-cropped for avatars, aspect-ratio maintained for media previews, with lazy loading for performance.