import React, { useState, useRef } from 'react';
import type { KeyboardEvent, ChangeEvent, DragEvent, MouseEvent } from 'react';
import { Sparkles, Plus, Upload, Star, X } from 'lucide-react';
import type { UploadedImage, CreatePromptData, FormPromptData } from "../../../types/prompt"
import { usePrompts } from '../../../hooks/usePrompts';
import toast from 'react-hot-toast';

interface ImageUploadProps {
  onImageUpload: (images: UploadedImage[]) => void;
  images: UploadedImage[];
  onRemoveImage: (index: number) => void;
}

// ImageUpload Component
const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, images, onRemoveImage }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]): void => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      alert('Please select valid image files');
      return;
    }

    const newImages: UploadedImage[] = imageFiles.map((file, index) => ({
      public_id: `temp_${Date.now()}_${index}`,
      url: URL.createObjectURL(file),
      thumbnail_url: URL.createObjectURL(file),
      format: file.type.split('/')[1] as 'jpg' | 'jpeg' | 'png' | 'gif' | 'webp' | 'avif',
      width: 0,
      height: 0,
      bytes: file.size,
      isPrimary: index === 0 && images.length === 0,
      uploadedAt: new Date().toISOString(),
      file: file,
      name: file.name
    }));

    onImageUpload(newImages);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const setPrimaryImage = (index: number): void => {
    const updatedImages = images.map((img, i) => ({
      ...img,
      isPrimary: i === index
    }));
    onImageUpload(updatedImages);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Image Assets</h2>
      </div>
      
      <div
        className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragging ? 'border-purple-500 bg-purple-50' : 'hover:border-purple-500 hover:bg-purple-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
            <Upload className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-gray-700 font-medium mb-1">
            Drag and drop your images here
          </p>
          <p className="text-gray-500 text-sm">
            or click to browse files
          </p>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {images.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-700">
              Uploaded Images ({images.length})
            </h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div 
                key={index} 
                className="relative group border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-all duration-200"
              >
                <div className="aspect-square bg-gray-50 flex items-center justify-center">
                  <img
                    src={image.url}
                    alt={image.name || image.public_id}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 truncate">
                        {image.name || `image-${index + 1}`}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatFileSize(image.bytes || 0)}
                      </p>
                    </div>
                  </div>
                  
                  {image.isPrimary && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                        <Star className="w-3 h-3 mr-1" />
                        Primary
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPrimaryImage(index);
                    }}
                    className="w-7 h-7 bg-blue-500 text-white rounded flex items-center justify-center hover:bg-blue-600 transition-colors"
                    title="Set as primary"
                  >
                    <Star className="w-3 h-3" />
                  </button>
                  
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveImage(index);
                      if (image.url.startsWith('blob:')) {
                        URL.revokeObjectURL(image.url);
                      }
                    }}
                    className="w-7 h-7 bg-red-500 text-white rounded flex items-center justify-center hover:bg-red-600 transition-colors"
                    title="Remove image"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main PromptForm Component
const PromptForm: React.FC = () => {
  const [formData, setFormData] = useState<FormPromptData>({
    title: '',
    description: '',
    promptText: '',
    resultText: '',
    aiTool: 'ChatGPT',
    category: 'Art',
    tags: [],
    isPublic: false,
    isDraft: true,
    community: '',
    estimatedTokens: 0,
    images: []
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [tagInput, setTagInput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  const { createPrompt } = usePrompts();

  const aiTools: CreatePromptData['aiTool'][] = ['ChatGPT', 'Claude', 'Bard', 'Midjourney', 'DALL-E', 'Stable Diffusion', 'Other'];
  const categories: CreatePromptData['category'][] = ['Art', 'Writing', 'Code', 'Marketing', 'Design', 'Education', 'Other'];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTagAdd = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = tagInput.trim();
      if (tag && !formData.tags.includes(tag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tag]
        }));
        setTagInput('');
      }
    }
  };

  const addTagClick = (): void => {
    const tag = tagInput.trim();
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string): void => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleImageUpload = (newImages: UploadedImage[]): void => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  const removeImage = (index: number): void => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

// In your PromptForm component - update the handleSubmit function
const handleSubmit = async (publish: boolean = false): Promise<void> => {
  // Basic validation
  if (!formData.title.trim()) {
    toast.error('Please enter a title');
    return;
  }
  if (!formData.promptText.trim()) {
    toast.error('Please enter prompt content');
    return;
  }

  setIsSubmitting(true);

  try {
    const formDataToSend = new FormData();
    
    // Append all fields as individual form fields
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('promptText', formData.promptText);
    
    if (formData.resultText) {
      formDataToSend.append('resultText', formData.resultText);
    }
    
    formDataToSend.append('aiTool', formData.aiTool);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('isPublic', publish ? 'true' : formData.isPublic.toString());
    formDataToSend.append('isDraft', (!publish).toString());
    
    // Append tags as comma-separated string
    if (formData.tags.length > 0) {
      formDataToSend.append('tags', formData.tags.join(','));
    } else {
      formDataToSend.append('tags', '');
    }
    
    // Add default values for required backend fields
    formDataToSend.append('requiresLevel', 'Newbie');
    formDataToSend.append('difficulty', 'Beginner');

    // Try without images first to test if Cloudinary is the issue
    if (formData.images.length > 0) {
      console.log('Attempting to upload images...');
      
      // Create array for captions
      const captions: string[] = [];
      
      // Append each image file
      formData.images.forEach((image) => {
        if (image.file) {
          formDataToSend.append('images', image.file);
          captions.push(image.name || '');
        }
      });
      
      // Append captions as JSON array
      if (captions.length > 0) {
        formDataToSend.append('captions', JSON.stringify(captions));
      }
    }

    console.log('FormData contents:');
    for (const [key, value] of formDataToSend.entries()) {
      console.log(key, value instanceof File ? `${value.name} (${value.size} bytes)` : value);
    }

    await createPrompt(formDataToSend);
    
    toast.success(publish ? 'Prompt published successfully!' : 'Prompt saved successfully!');

    // Reset form
    setFormData({
      title: '',
      description: '',
      promptText: '',
      resultText: '',
      aiTool: 'ChatGPT',
      category: 'Art',
      tags: [],
      isPublic: false,
      isDraft: true,
      community: '',
      estimatedTokens: 0,
      images: []
    });
    setTagInput('');
  } catch (error) {
    console.error('Submission error:', error);
    
    // Define proper error type checking
    let errorMessage = 'Error creating prompt. Please try again.';
    let isCloudinaryError = false;
    let serverError = '';

    // Check if it's an axios-like error with response data
    if (error && typeof error === 'object') {
      const err = error as { 
        message?: string; 
        response?: { 
          data?: { 
            error?: string 
          } 
        } 
      };

      // Extract error message
      if (err.message) {
        errorMessage = err.message;
      }

      // Check for Cloudinary errors
      if (err.message?.includes('uploader') || err.message?.includes('Cloudinary')) {
        isCloudinaryError = true;
      }

      // Check for server response errors
      if (err.response?.data?.error) {
        serverError = err.response.data.error;
      }
    }

    // Show appropriate error message
    if (isCloudinaryError) {
      toast.error('Image upload service is currently unavailable. Please try without images or contact support.');
    } else if (serverError) {
      toast.error(`Server error: ${serverError}`);
    } else {
      toast.error(errorMessage);
    }
  } finally {
    setIsSubmitting(false);
  }
};

  const handleSaveClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    handleSubmit(false);
  };

  const handlePublishClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    handleSubmit(true);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Prompt</h1>
          <p className="text-gray-600">Create a new prompt to share with the community or keep for personal use.</p>
        </div>

        <form className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
              </div>
              <p className="text-sm text-gray-600 mb-6">Define the core details of your prompt</p>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter prompt title..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={4}
                    placeholder="Describe what this prompt does..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">AI Tool</label>
                    <select
                      name="aiTool"
                      value={formData.aiTool}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                    >
                      {aiTools.map(tool => (
                        <option key={tool} value={tool}>{tool}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Community</label>
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
                  <label htmlFor="isPublic" className="ml-2 text-sm font-medium text-gray-700">
                    Make Public
                  </label>
                </div>
              </div>
            </div>

            {/* Tags Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Tags</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">Add tags to help organize and find your prompt</p>

              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setTagInput(e.target.value)}
                  onKeyDown={handleTagAdd}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Add a tag..."
                />
                <button
                  type="button"
                  onClick={addTagClick}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
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

            {/* Image Upload Section */}
            <ImageUpload 
              onImageUpload={handleImageUpload}
              images={formData.images}
              onRemoveImage={removeImage}
            />

            {/* Quick Tips Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Quick Tips</h2>
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
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Prompt Content</h2>

              <div className="flex border-b border-gray-200 mb-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('edit')}
                  className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === 'edit'
                      ? 'bg-purple-100 text-purple-700 border-b-2 border-purple-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === 'preview'
                      ? 'bg-purple-100 text-purple-700 border-b-2 border-purple-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Preview
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prompt Content<span className="text-red-500">*</span>
                </label>
                <textarea
                  name="promptText"
                  value={formData.promptText}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={12}
                  placeholder="Write your detailed prompt here. Be specific about what you want the AI to do..."
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Expected Result (Optional)</label>
                <textarea
                  name="resultText"
                  value={formData.resultText}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={4}
                  placeholder="Describe what kind of output or result you expect from this prompt"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <button
              type="button"
              onClick={handleSaveClick}
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="mr-2">💾</span>
              {isSubmitting ? 'Saving...' : 'Save Prompt'}
            </button>

            <button
              type="button"
              onClick={handlePublishClick}
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-white text-purple-600 border border-purple-600 rounded-md hover:bg-purple-50 transition-colors font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="mr-2">🚀</span>
              {isSubmitting ? 'Publishing...' : 'Publish Prompt'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromptForm;