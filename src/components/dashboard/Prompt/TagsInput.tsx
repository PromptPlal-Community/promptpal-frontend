import React, { useState } from "react";
import type { KeyboardEvent, ChangeEvent } from "react";
import { Sparkles, Plus } from "lucide-react";

interface TagsInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

export const TagsInput: React.FC<TagsInputProps> = ({ tags, onTagsChange }) => {
  const [tagInput, setTagInput] = useState<string>("");

  const handleTagAdd = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = (): void => {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag)) {
      onTagsChange([...tags, tag]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string): void => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Tags</h2>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Add tags to help organize and find your prompt
      </p>

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={tagInput}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTagInput(e.target.value)
          }
          onKeyDown={handleTagAdd}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Add a tag..."
        />
        <button
          type="button"
          onClick={addTag}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};