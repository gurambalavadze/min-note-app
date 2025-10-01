import { Search } from "lucide-react";
import { useState } from "react";

interface TagSearchInputProps {
  searchTags: string[];
  onSearchTagsChange: (tags: string[]) => void;
}

export function TagSearchInput({ searchTags, onSearchTagsChange }: TagSearchInputProps) {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center mb-2">
        <Search className="h-6 w-6 text-blue-500 mr-2" />
        <span className="font-semibold text-lg text-gray-700">Search by tags</span>
      </div>
      <div className="flex flex-wrap gap-2 w-full">
        {searchTags.map((tag, idx) => (
          <span
            key={tag + idx}
            className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-full cursor-pointer hover:bg-blue-200 text-xs"
            onClick={() => {
              const newTags = searchTags.filter((_, i) => i !== idx);
              onSearchTagsChange(newTags);
            }}
            title="Remove tag"
          >
            {tag}
            <span className="ml-1 text-xs">×</span>
          </span>
        ))}
        <input
          type="text"
          placeholder={
            searchTags.length === 0 ? "Type tag and press space" : "Add more tags (space to add)"
          }
          className="border-none outline-none flex-1 min-w-[80px] text-base py-1"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === " " && inputValue.trim()) {
              onSearchTagsChange([...searchTags, inputValue.trim()]);
              setInputValue("");
              e.preventDefault();
            }
            if (e.key === "Backspace" && inputValue === "" && searchTags.length > 0) {
              onSearchTagsChange(searchTags.slice(0, -1));
              e.preventDefault();
            }
          }}
        />
      </div>
    </div>
  );
}
