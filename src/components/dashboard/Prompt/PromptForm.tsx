import React, { useState, useEffect } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import { Sparkles, Eye, Save, Menu, X } from "lucide-react";
import type {
  FormPromptData,
  UploadedImage,
  Prompt,
} from "../../../types/prompt";
import { usePrompts } from "../../../hooks/usePrompts";
import { PreviewModal } from "./PreviewModal";
import { ImageUpload } from "./ImageUpload";
import { CharacterCountInput } from "./CharacterCountInput";
import { AiToolsSelector } from "./AiToolsSelector";
import { TagsInput } from "./TagsInput";
import { useMessage } from "../../../hooks/useMessage";

// Local storage keys
const DRAFT_KEY = "prompt_draft";
const CURRENT_PROMPT_ID_KEY = "current_prompt_id";

export const PromptForm: React.FC = () => {
  const [formData, setFormData] = useState<FormPromptData>({
    title: "",
    description: "",
    promptText: "",
    resultText: "",
    aiTool: [],
    category: "Art",
    tags: [],
    isPublic: false,
    isDraft: true,
    community: "",
    estimatedTokens: 0,
    images: [],
    maxLength: 10000,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [currentPromptId, setCurrentPromptId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isMobileActionsOpen, setIsMobileActionsOpen] =
    useState<boolean>(false);
  const { showMessage } = useMessage();

  const { createPrompt, updatePrompt } = usePrompts();

  // Load draft from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(DRAFT_KEY);
    const savedPromptId = localStorage.getItem(CURRENT_PROMPT_ID_KEY);

    if (savedDraft) {
      try {
        const draftData = JSON.parse(savedDraft);
        setFormData(draftData);
        setHasUnsavedChanges(true);
      } catch (error) {
        console.error("Error loading draft:", error);
      }
    }

    if (savedPromptId) {
      setCurrentPromptId(savedPromptId);
      setIsEditing(true);
    }
  }, []);

  // Save to localStorage when form data changes
  useEffect(() => {
    if (hasUnsavedChanges) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
      }, 1000); // Debounce to avoid too many writes

      return () => clearTimeout(timeoutId);
    }
  }, [formData, hasUnsavedChanges]);

  // Warn user before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        showMessage(
          "You have unsaved changes. Are you sure you want to leave?",
          "warning",
          5000,
          "Warning"
        );
        return showMessage;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges, showMessage]);

  const categories: FormPromptData["category"][] = [
    "Art",
    "Writing",
    "Code",
    "Marketing",
    "Design",
    "Education",
  ];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setHasUnsavedChanges(true);
  };

  const handleAiToolsChange = (tools: string[]): void => {
    setFormData((prev) => ({
      ...prev,
      aiTool: tools,
    }));
    setHasUnsavedChanges(true);
  };

  const handleTagsChange = (tags: string[]): void => {
    setFormData((prev) => ({
      ...prev,
      tags,
    }));
    setHasUnsavedChanges(true);
  };

  const handleImageUpload = (newImages: UploadedImage[]): void => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
    setHasUnsavedChanges(true);
  };

  const removeImage = (index: number): void => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setHasUnsavedChanges(true);
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
    localStorage.removeItem(CURRENT_PROMPT_ID_KEY);
    setCurrentPromptId(null);
    setIsEditing(false);
    setHasUnsavedChanges(false);
  };

  const handleSaveDraft = async (): Promise<void> => {
    if (!formData.title.trim() && !formData.promptText.trim()) {
      showMessage("Something went wrong!", "error", 3000, "Error Title");
      return;
    }

    // Prevent multiple submissions
    if (isSubmitting) {
      showMessage(
        "Please wait, saving in progress...",
        "error",
        3000,
        "Error Title"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("promptText", formData.promptText);
      formDataToSend.append("resultText", formData.resultText || "");

      formDataToSend.append("aiTool", JSON.stringify(formData.aiTool));
      formDataToSend.append("category", formData.category);
      formDataToSend.append("isPublic", formData.isPublic.toString());
      formDataToSend.append("isDraft", "true");

      if (formData.tags.length > 0) {
        formDataToSend.append("tags", formData.tags.join(","));
      } else {
        formDataToSend.append("tags", "");
      }

      formDataToSend.append("requiresLevel", "Newbie");
      formDataToSend.append("difficulty", "Beginner");

      if (formData.images.length > 0) {
        const captions: string[] = [];
        formData.images.forEach((image) => {
          if (image.file) {
            formDataToSend.append("images", image.file);
            captions.push(image.name || "");
          }
        });

        if (captions.length > 0) {
          formDataToSend.append("captions", JSON.stringify(captions));
        }
      }

      let savedPrompt: Prompt;

      if (currentPromptId && isEditing) {
        // Update existing prompt
        savedPrompt = await updatePrompt(currentPromptId, formDataToSend);
        showMessage("Draft updated successfully!", "success");
      } else {
        // Create new prompt
        savedPrompt = await createPrompt(formDataToSend);
        setCurrentPromptId(savedPrompt._id);
        localStorage.setItem(CURRENT_PROMPT_ID_KEY, savedPrompt._id);
        setIsEditing(true);
        showMessage("Draft saved successfully!", "success");
      }

      setHasUnsavedChanges(false);
      // Clear localStorage draft since it's now saved to database
      localStorage.removeItem(DRAFT_KEY);
    } catch (error) {
      console.error("Draft save error:", error);
      showMessage(
        "Error saving draft. Please try again.",
        "error",
        3000,
        "Error Title"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (publish: boolean = false): Promise<void> => {
    if (!formData.title.trim()) {
      showMessage("Please enter a title", "error", 3000, "Error Title");
      return;
    }
    if (!formData.promptText.trim()) {
      showMessage("Please enter prompt content", "error", 3000, "Error Title");
      return;
    }
    if (!formData.description.trim()) {
      showMessage(
        "Please enter prompt description",
        "error",
        3000,
        "Error Title"
      );
      return;
    }
    if (!formData.aiTool.length) {
      showMessage(
        "Please select at least one AI tool",
        "error",
        3000,
        "Error Title"
      );
      return;
    }

    // Prevent multiple submissions
    if (isSubmitting) {
      showMessage(
        "Please wait, submission in progress...",
        "error",
        3000,
        "Error Title"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("promptText", formData.promptText);
      formDataToSend.append("resultText", formData.resultText || "");

      formDataToSend.append("aiTool", JSON.stringify(formData.aiTool));
      formDataToSend.append("category", formData.category);
      formDataToSend.append(
        "isPublic",
        publish ? "true" : formData.isPublic.toString()
      );
      formDataToSend.append("isDraft", (!publish).toString());

      if (formData.tags.length > 0) {
        formDataToSend.append("tags", formData.tags.join(","));
      } else {
        formDataToSend.append("tags", "");
      }

      formDataToSend.append("requiresLevel", "Newbie");
      formDataToSend.append("difficulty", "Beginner");

      if (formData.images.length > 0) {
        const captions: string[] = [];
        formData.images.forEach((image) => {
          if (image.file) {
            formDataToSend.append("images", image.file);
            captions.push(image.name || "");
          }
        });

        if (captions.length > 0) {
          formDataToSend.append("captions", JSON.stringify(captions));
        }
      }

      let result: Prompt;

      if (currentPromptId && isEditing) {
        // Update existing prompt
        result = await updatePrompt(currentPromptId, formDataToSend);
      } else {
        // Create new prompt
        result = await createPrompt(formDataToSend);
        setCurrentPromptId(result._id);
        setIsEditing(true);
      }

      setHasUnsavedChanges(false);
      clearDraft();

      showMessage(
        publish ? "Prompt published successfully!" : "Prompt saved as draft!",
        "success"
      );

      // Reset form only on successful publish
      if (publish) {
        setFormData({
          title: "",
          description: "",
          promptText: "",
          resultText: "",
          aiTool: [],
          category: "Art",
          tags: [],
          isPublic: false,
          isDraft: true,
          community: "",
          estimatedTokens: 0,
          images: [],
          maxLength: 10000,
        });
        clearDraft();
      }
    } catch (error) {
      console.error("Submission error:", error);
      const errorMessage = "Error creating prompt. Please try again.";

      if (error && typeof error === "object") {
        const err = error as {
          message?: string;
          response?: {
            data?: {
              error?: string;
            };
          };
        };

        if (
          err.message?.includes("uploader") ||
          err.message?.includes("Cloudinary")
        ) {
          showMessage(
            "Image upload service configuration error. Please try without images.",
            "error",
            5000,
            "Error Title"
          );
        } else if (err.response?.data?.error) {
          showMessage(
            `Server error: ${err.response.data.error}`,
            "error",
            5000,
            "Error Title"
          );
        } else {
          showMessage(errorMessage, "error", 5000, "Error Title");
        }
      } else {
        showMessage(errorMessage, "error", 5000, "Error Title");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublishClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    handleSubmit(true);
  };

  const handleCreateNew = () => {
    if (hasUnsavedChanges) {
      showMessage(
        "You have unsaved changes. Please save or discard them before creating a new prompt.",
        "warning",
        5000,
        "Warning"
      );
      return;
    }

    setFormData({
      title: "",
      description: "",
      promptText: "",
      resultText: "",
      aiTool: [],
      category: "Art",
      tags: [],
      isPublic: false,
      isDraft: true,
      community: "",
      estimatedTokens: 0,
      images: [],
      maxLength: 10000,
    });
    clearDraft();
    showMessage("New prompt form ready!", "success");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Header Section - Mobile Responsive */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 lg:mb-8">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {isEditing ? "Edit Prompt" : "Create New Prompt"}
            </h1>
            <p className="mt-1 sm:mt-2 text-sm text-gray-600">
              {isEditing
                ? "Update your existing prompt draft"
                : "Build and share your AI prompts with the community"}
            </p>
            {hasUnsavedChanges && (
              <p className="mt-1 text-sm text-amber-600">
                ⚠️ You have unsaved changes
              </p>
            )}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            {isEditing && (
              <button
                type="button"
                onClick={handleCreateNew}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
              >
                New Prompt
              </button>
            )}

            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm"
            >
              <Save className="w-4 h-4" />
              {isEditing ? "Update Draft" : "Save Draft"}
            </button>

            <button
              type="button"
              onClick={() => setShowPreviewModal(true)}
              className="flex cursor-pointer items-center gap-2 px-4 py-2 text-sm text-purple-600 border border-purple-600 rounded-md hover:text-white hover:bg-purple-600 transition-colors"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>

            <button
              type="button"
              onClick={handlePublishClick}
              disabled={isSubmitting}
              className="px-4 py-2 bg-purple-600 text-white border border-purple-600 rounded-md hover:bg-purple-700 transition-colors font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              <span className="mr-2">🚀</span>
              {isSubmitting ? "Publishing..." : "Publish"}
            </button>
          </div>

          {/* Mobile Action Buttons Toggle */}
          <div className="lg:hidden flex items-center justify-between">
            <div className="flex-1"></div>
            <button
              type="button"
              onClick={() => setIsMobileActionsOpen(!isMobileActionsOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              {isMobileActionsOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
              <span>Actions</span>
            </button>
          </div>
        </div>

        {/* Mobile Actions Dropdown */}
        {isMobileActionsOpen && (
          <div className="lg:hidden bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
            <div className="grid grid-cols-2 gap-3">
              {isEditing && (
                <button
                  type="button"
                  onClick={handleCreateNew}
                  className="col-span-2 flex items-center justify-center gap-2 px-4 py-3 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
                >
                  New Prompt
                </button>
              )}

              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 px-3 py-3 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm"
              >
                <Save className="w-4 h-4" />
                {isEditing ? "Update" : "Save"}
              </button>

              <button
                type="button"
                onClick={() => setShowPreviewModal(true)}
                className="flex items-center justify-center gap-2 px-3 py-3 text-purple-600 border border-purple-600 rounded-md hover:bg-purple-50 transition-colors text-sm"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>

              <button
                type="button"
                onClick={handlePublishClick}
                disabled={isSubmitting}
                className="col-span-2 flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white border border-purple-600 rounded-md hover:bg-purple-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                <span>🚀</span>
                {isSubmitting ? "Publishing..." : "Publish Prompt"}
              </button>
            </div>
          </div>
        )}

        {/* Form Content */}
        <form className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Form Fields */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6">
            {/* Basic Information Section */}
            <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center mb-4 sm:mb-6">
                <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-purple-600 mr-2" />
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                  Basic Information
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                Define the core details of your prompt
              </p>

              <div className="space-y-4 sm:space-y-5">
                <CharacterCountInput
                  value={formData.title}
                  onChange={(value) => {
                    setFormData((prev) => ({ ...prev, title: value }));
                    setHasUnsavedChanges(true);
                  }}
                  maxLength={100}
                  placeholder="Enter prompt title..."
                  label="Title"
                  type="text"
                  required={true}
                  name="title"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={3}
                    placeholder="Describe what this prompt does..."
                  />
                </div>

                <AiToolsSelector
                  selectedTools={formData.aiTool}
                  onToolsChange={handleAiToolsChange}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Community
                  </label>
                  <input
                    type="text"
                    name="community"
                    value={formData.community}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter community name (optional)"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isPublic"
                    id="isPublic"
                    checked={formData.isPublic}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label
                    htmlFor="isPublic"
                    className="ml-2 text-sm font-medium text-gray-700"
                  >
                    Make Public
                  </label>
                </div>
              </div>
            </div>

            <TagsInput tags={formData.tags} onTagsChange={handleTagsChange} />

            <ImageUpload
              onImageUpload={handleImageUpload}
              images={formData.images}
              onRemoveImage={removeImage}
            />

            {/* Quick Tips Section */}
            <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center mb-4 sm:mb-6">
                <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-purple-600 mr-2" />
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                  Quick Tips
                </h2>
              </div>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                <li>• Use {"{variable_name}"} for dynamic content</li>
                <li>• Be specific and clear in your instructions</li>
                <li>• Test with different variable values</li>
                <li>• Add context and examples when needed</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Prompt Content and Actions */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-6">
              <div className="space-y-4">
                <CharacterCountInput
                  value={formData.promptText}
                  onChange={(value) => {
                    setFormData((prev) => ({ ...prev, promptText: value }));
                    setHasUnsavedChanges(true);
                  }}
                  maxLength={formData.maxLength}
                  placeholder="Write your detailed prompt here. Be specific about what you want the AI to do..."
                  label="Prompt Content"
                  type="textarea"
                  rows={8}
                  required={true}
                  name="promptText"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Result (Optional)
                  </label>
                  <textarea
                    name="resultText"
                    value={formData.resultText}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={6}
                    placeholder="Describe what kind of output or result you expect from this prompt"
                  />
                </div>
              </div>
            </div>

            {/* Desktop Action Buttons Sidebar */}
            <div className="hidden lg:block space-y-3">
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm"
              >
                <Save className="w-4 h-4" />
                Save Draft
              </button>

              <button
                type="button"
                onClick={() => setShowPreviewModal(true)}
                className="w-full flex cursor-pointer items-center justify-center gap-2 px-4 py-3 text-sm text-purple-600 border border-purple-600 rounded-md hover:bg-purple-50 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>

              <button
                type="button"
                onClick={handlePublishClick}
                disabled={isSubmitting}
                className="w-full cursor-pointer px-4 py-3 bg-purple-600 text-white border border-purple-600 rounded-md hover:bg-purple-700 transition-colors font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                <span className="mr-2">🚀</span>
                {isSubmitting ? "Publishing..." : "Publish Prompt"}
              </button>
            </div>

            {/* Mobile Action Buttons Toggle */}
            <div className="lg:hidden flex items-center justify-between">
              <div className="flex-1"></div>
              <button
                type="button"
                onClick={() => setIsMobileActionsOpen(!isMobileActionsOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                {isMobileActionsOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
                <span>Actions</span>
              </button>
            </div>

            {/* Mobile Actions Dropdown */}
            {isMobileActionsOpen && (
              <div className="lg:hidden bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
                <div className="grid grid-cols-2 gap-3">
                  {isEditing && (
                    <button
                      type="button"
                      onClick={handleCreateNew}
                      className="col-span-2 flex items-center justify-center gap-2 px-4 py-3 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
                    >
                      New Prompt
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 px-3 py-3 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm"
                  >
                    <Save className="w-4 h-4" />
                    {isEditing ? "Update" : "Save"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowPreviewModal(true)}
                    className="flex items-center justify-center gap-2 px-3 py-3 text-purple-600 border border-purple-600 rounded-md hover:bg-purple-50 transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>

                  <button
                    type="button"
                    onClick={handlePublishClick}
                    disabled={isSubmitting}
                    className="col-span-2 flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white border border-purple-600 rounded-md hover:bg-purple-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    <span>🚀</span>
                    {isSubmitting ? "Publishing..." : "Publish Prompt"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Spacer for mobile bottom bar */}
      <div className="lg:hidden h-20" />

      <PreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        formData={formData}
      />
    </div>
  );
};

export default PromptForm;
