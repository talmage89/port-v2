"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";

interface TagInputProps {
  tags: string[];
  availableTags?: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export const TagInput = ({ tags, availableTags = [], onChange, placeholder = "Add a tag..." }: TagInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleAddTag = (tagToAdd: string) => {
    if (!tagToAdd.trim()) return;

    // Don't add if already exists
    if (tags.includes(tagToAdd)) return;

    onChange([...tags, tagToAdd]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddTag(inputValue);
    }
  };

  // Filter available tags that aren't already selected
  const filteredAvailableTags = availableTags
    .filter((tag) => !tags.includes(tag))
    .filter((tag) => tag.toLowerCase().includes(inputValue.toLowerCase()));

  return (
    <div className="w-full">
      <div className="mb-2 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div key={tag} className="flex items-center gap-1 rounded-md bg-blue-100 px-2 py-1 text-sm text-blue-800">
            <span>{tag}</span>
            <button type="button" onClick={() => handleRemoveTag(tag)} className="text-blue-600 hover:text-blue-800">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="relative">
        <div className="flex items-center rounded-md border border-gray-300 shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setTimeout(() => setIsInputFocused(false), 200)}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 text-sm outline-none"
          />
          <button
            type="button"
            onClick={() => handleAddTag(inputValue)}
            className="mr-1 px-2 py-1 text-gray-500 hover:text-gray-700"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Dropdown for available tags */}
        {isInputFocused && inputValue && filteredAvailableTags.length > 0 && (
          <div className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
            {filteredAvailableTags.map((tag) => (
              <div
                key={tag}
                onClick={() => handleAddTag(tag)}
                className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
              >
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="mt-1 text-xs text-gray-500">Press Enter or comma to add a tag</p>
    </div>
  );
};
