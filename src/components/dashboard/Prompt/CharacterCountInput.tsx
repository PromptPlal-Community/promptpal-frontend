import React from "react";
import type { ChangeEvent } from "react";

interface CharacterCountInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  placeholder?: string;
  label?: string;
  type?: "text" | "textarea";
  rows?: number;
  required?: boolean;
  name?: string;
}

export const CharacterCountInput: React.FC<CharacterCountInputProps> = ({
  value,
  onChange,
  maxLength,
  placeholder,
  label,
  type = "text",
  rows = 4,
  required = false,
  name,
}) => {
  const remaining = maxLength ? maxLength - value.length : 0;
  const isNearLimit = maxLength ? value.length >= maxLength * 0.9 : false;
  const isOverLimit = maxLength ? value.length > maxLength : false;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
    if (!maxLength || newValue.length <= maxLength) {
      onChange(newValue);
    }
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none ${
            isOverLimit ? "border-red-500" : "border-gray-300"
          }`}
          rows={rows}
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
            isOverLimit ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={placeholder}
          required={required}
        />
      )}

      {maxLength && (
        <>
          <div className="absolute right-3 top-9 transform -translate-y-1/2">
            <span
              className={`text-xs ${
                isOverLimit
                  ? "text-red-600"
                  : isNearLimit
                  ? "text-orange-500"
                  : "text-gray-500"
              }`}
            >
              {value.length}/{maxLength}
            </span>
          </div>

          <div className="flex justify-between items-center mt-2">
            <div
              className={`text-xs ${
                isOverLimit
                  ? "text-red-600"
                  : isNearLimit
                  ? "text-orange-500"
                  : "text-gray-500"
              }`}
            >
              {remaining} characters remaining
            </div>

            <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  isOverLimit
                    ? "bg-red-500"
                    : isNearLimit
                    ? "bg-orange-500"
                    : "bg-green-500"
                }`}
                style={{
                  width: `${Math.min(
                    100,
                    (value.length / maxLength) * 100
                  )}%`,
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};