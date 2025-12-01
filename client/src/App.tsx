import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChatSidebar } from "@/components/layout/ChatSidebar";
import { ChatWindow } from "@/components/layout/ChatWindow";
import { ProfilePanel } from "@/components/layout/ProfilePanel";
import { NewChatDialog } from "@/components/layout/NewChatDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { MessageBubbleProps } from "@/components/chat/MessageBubble";

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
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
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
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
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
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
  },
  {
    id: "6",
    name: "David Brown",
    lastMessage: "The concert was amazing!",
    timestamp: "Sun",
    isOnline: false,
    lastMessageStatus: "read" as const,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
  },
  {
    id: "7",
    name: "Eva Green",
    lastMessage: "Happy birthday!",
    timestamp: "Sat",
    isOnline: true,
    lastMessageStatus: "delivered" as const,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988bababb?w=200&h=200&fit=crop",
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
    avatar: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=200&fit=crop",
  },
  {
    id: "5",
    name: "Family Group",
    lastMessage: "Mom: Don't forget Sunday dinner!",
    timestamp: "Mon",
    unreadCount: 5,
    isGroup: true,
    memberCount: 6,
    avatar: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&h=200&fit=crop",
  },
  {
    id: "g3",
    name: "College Friends",
    lastMessage: "Jake: Reunion next month?",
    timestamp: "Tue",
    isGroup: true,
    memberCount: 15,
    avatar: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
  },
  {
    id: "g4",
    name: "Book Club",
    lastMessage: "Next read: The Great Gatsby",
    timestamp: "Wed",
    isGroup: true,
    memberCount: 8,
    avatar: "https://images.unsplash.com/photo-150784272343-583f20270319?w=200&h=200&fit=crop",
  },
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
    { id: "m1", content: "Hey! How's it going?", timestamp: "2:30 PM", isOwn: false, senderName: "Alice", senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop" },
    { id: "m2", content: "Pretty good! Just finished that project.", timestamp: "2:31 PM", isOwn: true, status: "read" },
    { id: "m3", content: "Check out this sunset photo!", timestamp: "2:32 PM", isOwn: false, senderName: "Alice", senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop", media: { type: "image", url: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=500&h=400&fit=crop" } },
    { id: "m4", content: "Wow, that's beautiful!", timestamp: "2:33 PM", isOwn: true, status: "read" },
    { id: "m5", content: "Here's a voice note for you", timestamp: "2:34 PM", isOwn: false, senderName: "Alice", senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop", media: { type: "audio", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: "0:30" } },
    { id: "m6", content: "Are you coming to the party tonight?", timestamp: "2:35 PM", isOwn: false, senderName: "Alice", senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop" },
    { id: "m7", content: "Yes! I'll be there!", timestamp: "2:36 PM", isOwn: true, status: "read" },
  ],
  "2": [
    { id: "m8", content: "Team, I've updated the project timeline.", timestamp: "12:00 PM", isOwn: false, senderName: "Mike", senderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop" },
    { id: "m9", content: "Looks good to me!", timestamp: "12:15 PM", isOwn: true, status: "read" },
    { id: "m10", content: "", timestamp: "12:30 PM", isOwn: false, senderName: "Sarah", senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop", media: { type: "video", url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=600&fit=crop", duration: "2:45", fileSize: "45.2 MB", views: 234 } },
    { id: "m11", content: "I'll review the changes today.", timestamp: "12:45 PM", isOwn: false, senderName: "Sarah", senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop" },
    { id: "m12", content: "", timestamp: "1:00 PM", isOwn: false, senderName: "Mike", senderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop", media: { type: "audio", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: "3:15" } },
    { id: "m13", content: "The presentation is ready for review", timestamp: "1:15 PM", isOwn: false, senderName: "Sarah", senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop" },
    { id: "m14", content: "Great work everyone!", timestamp: "1:20 PM", isOwn: true, status: "read" },
  ],
  "3": [
    { id: "m15", content: "Can you help me with this code review?", timestamp: "Yesterday", isOwn: false, senderName: "Bob", senderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop" },
    { id: "m16", content: "Sure! Send me the PR link", timestamp: "Yesterday", isOwn: true, status: "read" },
    { id: "m17", content: "Check out this amazing resource", timestamp: "Yesterday", isOwn: false, senderName: "Bob", senderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop", media: { type: "link", url: "https://github.com/facebook/react", title: "React Repository", description: "A JavaScript library for building user interfaces" } },
    { id: "m18", content: "Done! Take a look when you can", timestamp: "Yesterday", isOwn: false, senderName: "Bob", senderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop" },
    { id: "m19", content: "Thanks for your help with the code review!", timestamp: "Yesterday", isOwn: false, senderName: "Bob", senderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop" },
    { id: "m20", content: "Anytime! Happy to help", timestamp: "Today", isOwn: true, status: "read" },
  ],
  "4": [
    { id: "m21", content: "Hey Carol! How have you been?", timestamp: "10:00 AM", isOwn: true, status: "read" },
    { id: "m22", content: "Great! Just got back from vacation", timestamp: "10:05 AM", isOwn: false, senderName: "Carol", senderAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop" },
    { id: "m23", content: "", timestamp: "10:06 AM", isOwn: false, senderName: "Carol", senderAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop", media: { type: "image", url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=400&fit=crop" } },
    { id: "m24", content: "Beautiful! Where was this?", timestamp: "10:10 AM", isOwn: true, status: "read" },
    { id: "m25", content: "", timestamp: "10:15 AM", isOwn: false, senderName: "Carol", senderAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop", media: { type: "video", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop", duration: "1:35", fileSize: "12.5 MB" } },
  ],
  "5": [
    { id: "m26", content: "Family group chat is active!", timestamp: "9:00 AM", isOwn: false, senderName: "Mom", senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop" },
    { id: "m27", content: "Don't forget Sunday dinner!", timestamp: "9:05 AM", isOwn: false, senderName: "Mom", senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop" },
    { id: "m28", content: "I'll be there with the dessert", timestamp: "9:10 AM", isOwn: true, status: "read" },
    { id: "m29", content: "Family recipe for the cake", timestamp: "9:15 AM", isOwn: false, senderName: "Mom", senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop", media: { type: "link", url: "https://www.allrecipes.com", title: "Chocolate Cake Recipe", description: "Delicious homemade chocolate cake" } },
    { id: "m30", content: "Perfect! Can't wait to taste it", timestamp: "9:20 AM", isOwn: true, status: "read" },
  ],
  "7": [
    { id: "me1", content: "Eva! Haven't talked in forever!", timestamp: "11:00 AM", isOwn: true, status: "read" },
    { id: "me2", content: "I know! How have you been?", timestamp: "11:05 AM", isOwn: false, senderName: "Eva", senderAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop" },
    { id: "me3", content: "Pretty good! Just got back from a trip", timestamp: "11:06 AM", isOwn: true, status: "read" },
    { id: "me4", content: "", timestamp: "11:08 AM", isOwn: true, status: "read", media: { type: "image", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop" } },
    { id: "me5", content: "Here are some photos from the trip!", timestamp: "11:09 AM", isOwn: true, status: "read" },
    { id: "me6", content: "Oh wow! That looks amazing!", timestamp: "11:12 AM", isOwn: false, senderName: "Eva", senderAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop" },
    { id: "me7", content: "", timestamp: "11:15 AM", isOwn: false, senderName: "Eva", senderAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop", media: { type: "video", url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=500&h=600&fit=crop", duration: "1:20" } },
    { id: "me8", content: "Check out this video from my concert!", timestamp: "11:16 AM", isOwn: false, senderName: "Eva", senderAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop" },
    { id: "me9", content: "That's awesome! You performed well", timestamp: "11:20 AM", isOwn: true, status: "read" },
    { id: "me10", content: "I found this great article about travel", timestamp: "11:22 AM", isOwn: false, senderName: "Eva", senderAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop", media: { type: "link", url: "https://www.natgeographic.com", title: "Top Travel Destinations", description: "Explore the world's most beautiful places and travel tips" } },
    { id: "me11", content: "Perfect timing! I'm planning my next trip", timestamp: "11:25 AM", isOwn: true, status: "read" },
    { id: "me12", content: "", timestamp: "11:28 AM", isOwn: false, senderName: "Eva", senderAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop", media: { type: "audio", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: "2:15" } },
    { id: "me13", content: "Listen to this new song I really like!", timestamp: "11:29 AM", isOwn: false, senderName: "Eva", senderAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop" },
    { id: "me14", content: "Loved it! Will definitely add it to my playlist", timestamp: "11:35 AM", isOwn: true, status: "read" },
    { id: "me15", content: "", timestamp: "11:38 AM", isOwn: true, status: "read", media: [
      { type: "image", url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=300&fit=crop" },
      { type: "image", url: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=300&h=300&fit=crop" },
      { type: "image", url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=300&h=300&fit=crop" },
    ] },
    { id: "me16", content: "Gallery from my weekend!", timestamp: "11:39 AM", isOwn: true, status: "read" },
    { id: "me17", content: "Those are beautiful! Let's catch up soon over coffee", timestamp: "11:42 AM", isOwn: false, senderName: "Eva", senderAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop" },
    { id: "me18", content: "Yes! Let's do it this weekend!", timestamp: "11:45 AM", isOwn: true, status: "read" },
  ],
  "g3": [
    { id: "mg1", content: "Check out these photos from the reunion!", timestamp: "2:00 PM", isOwn: false, senderName: "Jake", senderAvatar: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=40&h=40&fit=crop", media: [
      { type: "image", url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop" },
      { type: "image", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop" },
      { type: "image", url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop" },
      { type: "image", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop" },
      { type: "image", url: "https://images.unsplash.com/photo-1517841905240-472988bababb?w=300&h=300&fit=crop" },
      { type: "image", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop" },
    ] },
    { id: "mg2", content: "Best memories!", timestamp: "2:05 PM", isOwn: true, status: "read" },
    { id: "mg3", content: "We should do a movie night soon!", timestamp: "2:10 PM", isOwn: false, senderName: "Sarah", senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop" },
    { id: "mg4", content: "Count me in! I'm free next weekend", timestamp: "2:15 PM", isOwn: true, status: "read" },
    { id: "mg5", content: "Me too! What movie should we watch?", timestamp: "2:16 PM", isOwn: false, senderName: "Emma", senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop" },
    { id: "mg6", content: "", timestamp: "2:18 PM", isOwn: false, senderName: "Jake", senderAvatar: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=40&h=40&fit=crop", media: { type: "video", url: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&h=600&fit=crop", duration: "2:30", views: 156 } },
    { id: "mg7", content: "Check out this hilarious video!", timestamp: "2:19 PM", isOwn: false, senderName: "Jake", senderAvatar: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=40&h=40&fit=crop" },
    { id: "mg8", content: "That's so funny 😂", timestamp: "2:22 PM", isOwn: true, status: "read" },
    { id: "mg9", content: "Found a cool article about our college!", timestamp: "2:25 PM", isOwn: false, senderName: "Emma", senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop", media: { type: "link", url: "https://www.topuniversities.com", title: "College Success Stories", description: "Read about our college's achievements and alumni" } },
    { id: "mg10", content: "That's amazing! Our college is doing great", timestamp: "2:28 PM", isOwn: true, status: "read" },
    { id: "mg11", content: "", timestamp: "2:30 PM", isOwn: false, senderName: "Sarah", senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop", media: { type: "audio", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: "1:45" } },
    { id: "mg12", content: "Just sent a voice message!", timestamp: "2:31 PM", isOwn: false, senderName: "Sarah", senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop" },
    { id: "mg13", content: "Got it! Sounds good", timestamp: "2:35 PM", isOwn: true, status: "read" },
    { id: "mg14", content: "", timestamp: "2:37 PM", isOwn: false, senderName: "Emma", senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop", media: { type: "image", url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=500&h=400&fit=crop" } },
    { id: "mg15", content: "Look at this sunset photo I took yesterday!", timestamp: "2:38 PM", isOwn: false, senderName: "Emma", senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop" },
    { id: "mg16", content: "That's beautiful! Where did you take it?", timestamp: "2:40 PM", isOwn: true, status: "read" },
    { id: "mg17", content: "By the lake near campus. You should come next time!", timestamp: "2:42 PM", isOwn: false, senderName: "Emma", senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop" },
    { id: "mg18", content: "Definitely will! This group is awesome", timestamp: "2:45 PM", isOwn: true, status: "read" },
  ],
  "g4": [
    { id: "bc1", content: "Hey everyone! Let's discuss The Great Gatsby", timestamp: "10:00 AM", isOwn: false, senderName: "Alice", senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop" },
    { id: "bc2", content: "I loved the writing style! So elegant", timestamp: "10:05 AM", isOwn: false, senderName: "Mark", senderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop" },
    { id: "bc3", content: "The symbolism was incredible", timestamp: "10:08 AM", isOwn: true, status: "read" },
    { id: "bc4", content: "", timestamp: "10:10 AM", isOwn: false, senderName: "Sarah", senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop", media: { type: "image", url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500&h=400&fit=crop" } },
    { id: "bc5", content: "Here's a photo of my copy with notes!", timestamp: "10:11 AM", isOwn: false, senderName: "Sarah", senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop" },
    { id: "bc6", content: "Great notes! I'm highlighting the same parts", timestamp: "10:15 AM", isOwn: true, status: "read" },
    { id: "bc7", content: "I found an amazing article about Fitzgerald", timestamp: "10:18 AM", isOwn: false, senderName: "Mark", senderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop", media: { type: "link", url: "https://www.britannica.com", title: "F. Scott Fitzgerald Biography", description: "Learn about the life and works of F. Scott Fitzgerald, author of The Great Gatsby" } },
    { id: "bc8", content: "Thanks for sharing! Will read it tonight", timestamp: "10:22 AM", isOwn: true, status: "read" },
    { id: "bc9", content: "", timestamp: "10:25 AM", isOwn: false, senderName: "Jessica", senderAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop", media: { type: "video", url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=600&fit=crop", duration: "4:15", views: 234 } },
    { id: "bc10", content: "Here's a great film adaptation scene!", timestamp: "10:26 AM", isOwn: false, senderName: "Jessica", senderAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop" },
    { id: "bc11", content: "Wow! That cinematography is beautiful", timestamp: "10:30 AM", isOwn: true, status: "read" },
    { id: "bc12", content: "", timestamp: "10:32 AM", isOwn: false, senderName: "Alice", senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop", media: { type: "audio", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: "3:45" } },
    { id: "bc13", content: "Recorded a quick book review, check it out!", timestamp: "10:33 AM", isOwn: false, senderName: "Alice", senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop" },
    { id: "bc14", content: "Love this! Your voice is so expressive", timestamp: "10:38 AM", isOwn: true, status: "read" },
    { id: "bc15", content: "Next month we're reading 'Pride and Prejudice'!", timestamp: "10:40 AM", isOwn: false, senderName: "Mark", senderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop" },
    { id: "bc16", content: "", timestamp: "10:42 AM", isOwn: true, status: "read", media: [
      { type: "image", url: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=300&h=300&fit=crop" },
      { type: "image", url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=300&fit=crop" },
      { type: "image", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop" },
    ] },
    { id: "bc17", content: "I found different editions we can compare!", timestamp: "10:43 AM", isOwn: true, status: "read" },
    { id: "bc18", content: "Great idea! I love comparing different versions", timestamp: "10:45 AM", isOwn: false, senderName: "Sarah", senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop" },
    { id: "bc19", content: "When should we meet to discuss it?", timestamp: "10:48 AM", isOwn: false, senderName: "Jessica", senderAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop" },
    { id: "bc20", content: "How about next Saturday at the coffee shop?", timestamp: "10:50 AM", isOwn: true, status: "read" },
  ],
};

function TeleChat() {
  const isMobile = useIsMobile();
  const [selectedChatId, setSelectedChatId] = useState<string | undefined>();
  const [showProfile, setShowProfile] = useState(false);
  const [showNewChat, setShowNewChat] = useState(false);
  const [messages, setMessages] = useState(mockMessages);

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

  const showSidebar = !isMobile || !selectedChatId;
  const showChat = !isMobile || selectedChatId;

  return (
    <div className="h-screen w-full flex overflow-hidden bg-background">
      {showSidebar && (
        <ChatSidebar
          chats={mockChats}
          groups={mockGroups}
          selectedChatId={selectedChatId}
          onChatSelect={setSelectedChatId}
          onNewChat={() => setShowNewChat(true)}
          onNewGroup={() => setShowNewChat(true)}
          onSettings={() => console.log("Settings")}
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
