import React, { useState } from "react";
import type { MouseEvent } from "react";
import { usePrompts } from "../../../hooks/usePrompts";
import { X, Star, Edit } from "lucide-react";
import type { FormPromptData } from "../../../types/prompt";
import toast from "react-hot-toast";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormPromptData;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({ 
  isOpen, 
  onClose, 
  formData 
}) => {
  // Call hooks unconditionally at the top of the component
  const { createPrompt } = usePrompts();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = async (publish: boolean = false): Promise<void> => {
    if (!formData.title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!formData.promptText.trim()) {
      toast.error("Please enter prompt content");
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("promptText", formData.promptText);

      if (formData.resultText) {
        formDataToSend.append("resultText", formData.resultText);
      }

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

      await createPrompt(formDataToSend);

      toast.success(
        publish
          ? "Prompt published successfully!"
          : "Prompt saved successfully!"
      );

      onClose();
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

        if (err.message?.includes("uploader") || err.message?.includes("Cloudinary")) {
          toast.error(
            "Image upload service is currently unavailable. Please try without images or contact support."
          );
        } else if (err.response?.data?.error) {
          toast.error(`Server error: ${err.response.data.error}`);
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublishClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    handleSubmit(true);
  };

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Fixed Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-6 border-b bg-purple-300 border-gray-300 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">Prompt Preview</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50 to-white">
            {/* Basic Information */}
            <div className="space-y-4 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 pb-2 bg-purple-50 rounded-2xl border border-purple-200 px-4 py-2">
                Basic Information
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <p className="text-gray-900 font-medium">{formData.title || "No title provided"}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <p className="text-gray-600 whitespace-pre-wrap">
                  {formData.description || "No description provided"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    AI Tools
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {formData.aiTool.length > 0 ? (
                      formData.aiTool.map((tool, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700 border border-purple-200"
                        >
                          {tool}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No tools selected</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <p className="text-gray-600">{formData.category}</p>
                </div>
              </div>

              {formData.community && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Community
                  </label>
                  <p className="text-gray-600">{formData.community}</p>
                </div>
              )}

              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700 mr-2">
                  Visibility:
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  formData.isPublic 
                    ? "bg-green-100 text-green-800" 
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {formData.isPublic ? "Public" : "Private"}
                </span>
              </div>
            </div>

            {/* Tags */}
            {formData.tags.length > 0 && (
              <div className="space-y-4 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 pb-2 bg-purple-50 rounded-2xl border border-purple-200 px-4 py-2">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Prompt Content */}
            <div className="space-y-4 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 pb-2 bg-purple-50 rounded-2xl border border-purple-200 px-4 py-2">
                Prompt Content
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prompt
                </label>
                <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                  <pre className="text-gray-900 whitespace-pre-wrap font-sans text-sm">
                    {formData.promptText || "No prompt content provided"}
                  </pre>
                </div>
              </div>

              {formData.resultText && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expected Result
                  </label>
                  <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                    <p className="text-gray-600 whitespace-pre-wrap">
                      {formData.resultText}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Images */}
            {formData.images.length > 0 && (
              <div className="space-y-4 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 pb-2 bg-purple-50 rounded-2xl border border-purple-200 px-4 py-2">
                  Images ({formData.images.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative border border-gray-200 rounded-lg overflow-hidden bg-white"
                    >
                      <div className="aspect-square bg-gray-50 flex items-center justify-center">
                        <img
                          src={image.url}
                          alt={image.name || image.public_id}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {image.isPrimary && (
                        <div className="absolute top-2 left-2">
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                            <Star className="w-3 h-3 mr-1" />
                            Primary
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 flex justify-end gap-3 p-6 border-t border-gray-200 bg-white">
          <button
            type="button"
            onClick={handlePublishClick}
            disabled={isSubmitting}
            className="cursor-pointer px-4 py-3 bg-purple-600 text-white border border-purple-600 rounded-md hover:bg-purple-700 transition-colors font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="mr-2">🚀</span>
            {isSubmitting ? "Publishing..." : "Publish Prompt"}
          </button>
          <button
            onClick={onClose}
            className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-purple-600 border border-purple-600 rounded-md hover:bg-purple-50 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};