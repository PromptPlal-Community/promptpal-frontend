import React, { useState } from "react";

interface AiToolsSelectorProps {
  selectedTools: string[];
  onToolsChange: (tools: string[]) => void;
}

export const AiToolsSelector: React.FC<AiToolsSelectorProps> = ({
  selectedTools,
  onToolsChange,
}) => {
  const [customTool, setCustomTool] = useState<string>("");
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);

  // Predefined AI tools
  const predefinedTools: string[] = [
    "ChatGPT",
    "Claude",
    "Bard",
    "Midjourney",
    "DALL-E",
    "Stable Diffusion",
  ];

  const handleToolClick = (tool: string) => {
    const isSelected = selectedTools.includes(tool);
    const updatedTools = isSelected
      ? selectedTools.filter((t) => t !== tool)
      : [...selectedTools, tool];
    onToolsChange(updatedTools);
  };

  const handleAddCustomTool = () => {
    if (customTool.trim() && !selectedTools.includes(customTool)) {
      const updatedTools = [...selectedTools, customTool.trim()];
      onToolsChange(updatedTools);
      setCustomTool("");
      setShowCustomInput(false);
    }
  };

  const clearAllAiTools = () => {
    onToolsChange([]);
  };

  const removeAiTool = (aiToolToRemove: string) => {
    onToolsChange(selectedTools.filter((aiTool) => aiTool !== aiToolToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomTool();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          AI Tools {selectedTools.length > 0 && `(${selectedTools.length})`}
        </label>
        
        {/* Predefined Tools */}
        <div className="border border-gray-300 rounded-md bg-white p-4 mb-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {predefinedTools.map((tool) => (
              <label
                key={tool}
                className={`flex items-center space-x-3 cursor-pointer p-3 rounded-lg border transition-colors ${
                  selectedTools.includes(tool)
                    ? "bg-purple-50 border-purple-200"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedTools.includes(tool)}
                  onChange={() => handleToolClick(tool)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm font-medium text-gray-700">{tool}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Custom Tool Input */}
        <div className="space-y-2">
          {!showCustomInput ? (
            <button
              type="button"
              onClick={() => setShowCustomInput(true)}
              className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add custom AI tool
            </button>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={customTool}
                onChange={(e) => setCustomTool(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter custom AI tool name..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                autoFocus
              />
              <button
                type="button"
                onClick={handleAddCustomTool}
                disabled={!customTool.trim()}
                className="px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCustomInput(false);
                  setCustomTool("");
                }}
                className="px-3 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Select from popular AI tools or add your own
        </p>
      </div>

      {/* Selected Tools Display */}
      {selectedTools.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Selected Tools
            </label>
            <button
              type="button"
              onClick={clearAllAiTools}
              className="text-xs text-red-600 hover:text-red-800 font-medium"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-md border border-gray-200">
            {selectedTools.map((aiTool, index) => (
              <span
                key={index}
                className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium border ${
                  predefinedTools.includes(aiTool)
                    ? "bg-purple-100 text-purple-800 border-purple-200"
                    : "bg-blue-100 text-blue-800 border-blue-200"
                }`}
              >
                {aiTool}
                {predefinedTools.includes(aiTool) ? (
                  <span className="ml-1 text-xs opacity-70">✓</span>
                ) : (
                  <span className="ml-1 text-xs opacity-70">✎</span>
                )}
                <button
                  type="button"
                  onClick={() => removeAiTool(aiTool)}
                  className="ml-2 hover:bg-opacity-20 rounded-full w-4 h-4 flex items-center justify-center transition-colors"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Validation Message */}
      {selectedTools.length === 0 && (
        <div className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-md p-3">
          ⚠️ Please select at least one AI tool for your prompt
        </div>
      )}
    </div>
  );
};