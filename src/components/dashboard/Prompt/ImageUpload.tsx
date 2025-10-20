import React, { useState, useRef } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { Sparkles, Upload, Star, X } from "lucide-react";
import type { UploadedImage } from "../../../types/prompt";

interface ImageUploadProps {
  onImageUpload: (images: UploadedImage[]) => void;
  images: UploadedImage[];
  onRemoveImage: (index: number) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  images,
  onRemoveImage,
}) => {
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
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length === 0) {
      alert("Please select valid image files");
      return;
    }

    const newImages: UploadedImage[] = imageFiles.map((file, index) => ({
      public_id: `temp_${Date.now()}_${index}`,
      url: URL.createObjectURL(file),
      thumbnail_url: URL.createObjectURL(file),
      format: file.type.split("/")[1] as
        | "jpg"
        | "jpeg"
        | "png"
        | "gif"
        | "webp"
        | "avif",
      width: 0,
      height: 0,
      bytes: file.size,
      isPrimary: index === 0 && images.length === 0,
      uploadedAt: new Date().toISOString(),
      file: file,
      name: file.name,
    }));

    onImageUpload(newImages);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const setPrimaryImage = (index: number): void => {
    const updatedImages = images.map((img, i) => ({
      ...img,
      isPrimary: i === index,
    }));
    onImageUpload(updatedImages);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Image Assets</h2>
      </div>
      <p className="text-sm text-gray-900 pb-3 pl-7">
        We only accept these formats: jpg jpeg and png
      </p>
      
      <div
        className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragging
            ? "border-purple-500 bg-purple-50"
            : "hover:border-purple-500 hover:bg-purple-50"
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
          <p className="text-gray-500 text-sm">or click to browse files</p>
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
                      if (image.url.startsWith("blob:")) {
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