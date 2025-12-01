import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  onBlur?: () => void;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search",
  autoFocus,
  onBlur,
}: SearchBarProps) {
  return (
    <div className="relative flex items-center">
      <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 rounded-full bg-accent/50 border-0"
        autoFocus={autoFocus}
        onBlur={onBlur}
        data-testid="input-search"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors pointer-events-auto"
          data-testid="button-clear-search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
