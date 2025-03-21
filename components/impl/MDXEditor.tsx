"use client";

import React from "react";
import { MDXClient } from "@/components/impl/MDXClient";

interface MDXEditorProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export const MDXEditor = ({ id, label, value, onChange, placeholder = "", rows = 5 }: MDXEditorProps) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [tempValue, setTempValue] = React.useState(value);
  const [showPreview, setShowPreview] = React.useState(false);

  // Update temp value when value prop changes (for external updates)
  React.useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleBlur = () => {
    setIsFocused(false);
    // Only update parent state when leaving the field
    if (tempValue !== value) {
      onChange(tempValue);
    }
  };

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="text-xs text-blue-600 hover:text-blue-500"
        >
          {showPreview ? "Edit" : "Preview"}
        </button>
      </div>

      {showPreview ? (
        <div className="min-h-[6rem] rounded-md border border-gray-300 bg-gray-50 p-3 text-sm">
          <MDXClient content={tempValue || "*No content yet*"} />
        </div>
      ) : (
        <textarea
          id={id}
          name={id}
          rows={rows}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
          placeholder={placeholder}
          value={tempValue || ""}
          onChange={(e) => setTempValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
        />
      )}

      <p className="mt-1 text-xs text-gray-500">
        Supports Markdown formatting: **bold**, *italic*, ## headings, - lists, [links](url)
      </p>
    </div>
  );
};
