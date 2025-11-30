import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search, Heart, MessageCircle, Grid3X3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExplorePost {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
  userName: string;
}

interface ExploreViewProps {
  posts: ExplorePost[];
  onPostClick: (postId: string) => void;
}

export function ExploreView({ posts, onPostClick }: ExploreViewProps) {
  const [search, setSearch] = useState("");

  const filteredPosts = posts.filter((post) =>
    post.userName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search explore..."
            className="pl-9 rounded-full bg-accent/50 border-0"
            data-testid="input-explore-search"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 px-4">
            <Grid3X3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">Nothing to explore yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-0.5 p-0.5">
            {filteredPosts.map((post) => (
              <button
                key={post.id}
                onClick={() => onPostClick(post.id)}
                className="relative aspect-square group overflow-hidden"
                data-testid={`explore-post-${post.id}`}
              >
                <img
                  src={post.imageUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <span className="flex items-center gap-1 text-white text-sm">
                    <Heart className="h-4 w-4 fill-white" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1 text-white text-sm">
                    <MessageCircle className="h-4 w-4 fill-white" />
                    {post.comments}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
