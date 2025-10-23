import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sparkles, Eye, Save, ArrowLeft } from "lucide-react";
import type { FormPromptData, UploadedImage, Prompt } from "../../../types/prompt";
import { usePrompts } from "../../../hooks/usePrompts";
import toast from "react-hot-toast";
import { PreviewModal } from "./PreviewModal";
import { ImageUpload } from "./ImageUpload";
import { CharacterCountInput } from "./CharacterCountInput";
import { AiToolsSelector } from "./AiToolsSelector";
import { TagsInput } from "./TagsInput";

export const EditPrompt: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Use Partial<Prompt> because response data may omit required fields like _id;
  // use optional chaining when accessing properties on originalPrompt.
  const [originalPrompt, setOriginalPrompt] = useState<Partial<Prompt> | null>(null);

  const { updatePrompt, getPromptById } = usePrompts();

  const categories: FormPromptData["category"][] = [
    "Art",
    "Writing",
    "Code",
    "Marketing",
    "Design",
    "Education",
  ];

// Load prompt data when component mounts or id changes
useEffect(() => {
  let isMounted = true;

  const loadPrompt = async () => {
    if (!id) {
      toast.error("No prompt ID provided");
      navigate("/dashboard/library", { replace: true });
      return;
    }

    setIsLoading(true);

    try {
      // ✅ getPromptById returns the prompt object directly
      const promptToEdit = await getPromptById(id);
      
      if (!promptToEdit || !promptToEdit._id) {
        toast.error("Prompt not found");
        navigate("/dashboard/library", { replace: true });
        return;
      }

      const newFormData: FormPromptData = {
        title: promptToEdit.title || "",
        description: promptToEdit.description || "",
        promptText: promptToEdit.promptText || "",
        resultText: promptToEdit.resultText || "",
        aiTool: Array.isArray(promptToEdit.aiTool) ? promptToEdit.aiTool : [],
        category: promptToEdit.category || "Art",
        tags: Array.isArray(promptToEdit.tags) ? promptToEdit.tags : [],
        isPublic: !!promptToEdit.isPublic,
        isDraft: typeof promptToEdit.isDraft === "boolean" ? promptToEdit.isDraft : true,
        community: typeof promptToEdit.community === "string" ? promptToEdit.community : "",
        estimatedTokens: Number(promptToEdit.estimatedTokens) || 0,
        images: Array.isArray(promptToEdit.images) ? promptToEdit.images : [],
        maxLength: 10000,
      };

      if (isMounted) {
        setFormData(newFormData);
        setOriginalPrompt(promptToEdit);
        setHasUnsavedChanges(false);
      }
    } catch (error) {
      console.error("Error loading prompt:", error);
      toast.error("Error loading prompt");
      navigate("/dashboard/library", { replace: true });
    } finally {
      if (isMounted) setIsLoading(false);
    }
  };

  loadPrompt();

  return () => {
    isMounted = false;
  };
}, [id, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

  const handleSave = async (publish: boolean = false): Promise<void> => {
    if (!formData.title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!formData.promptText.trim()) {
      toast.error("Please enter prompt content");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Please enter prompt description");
      return;
    }
    if (!formData.aiTool.length) {
      toast.error("Please select at least one AI tool");
      return;
    }

    if (!id) {
      toast.error("No prompt ID available");
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
      formDataToSend.append("isPublic", publish ? "true" : formData.isPublic.toString());
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

      await updatePrompt(id, formDataToSend);
      setHasUnsavedChanges(false);

      toast.success(
        publish
          ? "Prompt published successfully!"
          : "Prompt updated successfully!"
      );

      // Navigate back to library after successful save
      navigate("/dashboard/library");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Error updating prompt. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublishClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    handleSave(true);
  };

  const handleSaveClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    handleSave(false);
  };

  // Warn user about unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleBackClick = () => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      if (confirmLeave) {
        navigate("/dashboard/library");
      }
    } else {
      navigate("/dashboard/library");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex-1">
            <button
              onClick={handleBackClick}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Library
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              Edit Prompt
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Update your prompt details
            </p>
            {originalPrompt && (
              <div className="mt-2 text-sm text-gray-500">
                Status: {originalPrompt.isPublic ? "Published" : "Draft"}
                {originalPrompt.version && ` • Version ${originalPrompt.version}`}
                {hasUnsavedChanges && " • Unsaved changes"}
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <button
              type="button"
              onClick={handleSaveClick}
              disabled={isSubmitting || !hasUnsavedChanges}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => setShowPreviewModal(true)}
              className="flex cursor-pointer items-center gap-2 px-4 py-2 text-sm text-purple-600 border border-purple-600 rounded-md hover:text-white hover:bg-purple-600 transition-colors"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>

            {!originalPrompt?.isPublic && (
              <button
                type="button"
                onClick={handlePublishClick}
                disabled={isSubmitting}
                className="px-4 py-2 bg-purple-600 text-white border border-purple-600 rounded-md hover:bg-purple-700 transition-colors font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="mr-2">🚀</span>
                {isSubmitting ? "Publishing..." : "Publish"}
              </button>
            )}
          </div>
        </div>

        {/* Form Content - Same as PromptForm */}
        <form className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Basic Information
                </h2>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Define the core details of your prompt
              </p>

              <div className="space-y-5">
                <CharacterCountInput
                  value={formData.title}
                  onChange={(value) => {
                    setFormData(prev => ({ ...prev, title: value }));
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={4}
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

            <TagsInput
              tags={formData.tags}
              onTagsChange={handleTagsChange}
            />

            <ImageUpload
              onImageUpload={handleImageUpload}
              images={formData.images}
              onRemoveImage={removeImage}
            />

            {/* Quick Tips Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Quick Tips
                </h2>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Use {"{variable_name}"} for dynamic content</li>
                <li>• Be specific and clear in your instructions</li>
                <li>• Test with different variable values</li>
                <li>• Add context and examples when needed</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Prompt Content and Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="space-y-4">
                <CharacterCountInput
                  value={formData.promptText}
                  onChange={(value) => {
                    setFormData(prev => ({ ...prev, promptText: value }));
                    setHasUnsavedChanges(true);
                  }}
                  maxLength={formData.maxLength}
                  placeholder="Write your detailed prompt here. Be specific about what you want the AI to do..."
                  label="Prompt Content"
                  type="textarea"
                  rows={15}
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={10}
                    placeholder="Describe what kind of output or result you expect from this prompt"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleSaveClick}
                disabled={isSubmitting || !hasUnsavedChanges}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => setShowPreviewModal(true)}
                className="w-full flex cursor-pointer items-center justify-center gap-2 px-4 py-3 text-sm text-purple-600 border border-purple-600 rounded-md hover:bg-purple-50 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>

              {!originalPrompt?.isPublic && (
                <button
                  type="button"
                  onClick={handlePublishClick}
                  disabled={isSubmitting}
                  className="w-full cursor-pointer px-4 py-3 bg-purple-600 text-white border border-purple-600 rounded-md hover:bg-purple-700 transition-colors font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="mr-2">🚀</span>
                  {isSubmitting ? "Publishing..." : "Publish Prompt"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      <PreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        formData={formData}
      />
    </div>
  );
};

export default EditPrompt;