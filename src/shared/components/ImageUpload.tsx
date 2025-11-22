"use client";

import { useState, useCallback } from "react";
import { Upload, X, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/shared/ui";
import {
  uploadImage,
  deleteImage,
  validateImageFile,
} from "@/api/services/storage.service";

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

export function ImageUpload({
  images,
  onImagesChange,
  maxImages = 10,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      setError("");

      // Check max images limit
      if (images.length + files.length > maxImages) {
        setError(`Chỉ được upload tối đa ${maxImages} ảnh`);
        return;
      }

      const fileArray = Array.from(files);

      // Validate all files first
      for (const file of fileArray) {
        const validation = validateImageFile(file);
        if (!validation.valid) {
          setError(validation.error || "File không hợp lệ");
          return;
        }
      }

      setUploading(true);

      try {
        // Upload files one by one with progress
        const uploadedUrls: string[] = [];

        for (let i = 0; i < fileArray.length; i++) {
          const file = fileArray[i];
          const progressKey = file.name;

          // Simulate progress (since Supabase doesn't provide upload progress)
          setUploadProgress((prev) => ({ ...prev, [progressKey]: 0 }));

          const progressInterval = setInterval(() => {
            setUploadProgress((prev) => ({
              ...prev,
              [progressKey]: Math.min((prev[progressKey] || 0) + 20, 90),
            }));
          }, 200);

          try {
            const url = await uploadImage(file);
            uploadedUrls.push(url);

            clearInterval(progressInterval);
            setUploadProgress((prev) => ({ ...prev, [progressKey]: 100 }));

            // Remove progress after a short delay
            setTimeout(() => {
              setUploadProgress((prev) => {
                const newProgress = { ...prev };
                delete newProgress[progressKey];
                return newProgress;
              });
            }, 500);
          } catch (err) {
            clearInterval(progressInterval);
            throw err;
          }
        }

        onImagesChange([...images, ...uploadedUrls]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Lỗi khi upload ảnh");
      } finally {
        setUploading(false);
      }
    },
    [images, maxImages, onImagesChange]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFiles(e.target.files);
      }
    },
    [handleFiles]
  );

  const handleDelete = async (imageUrl: string, index: number) => {
    try {
      await deleteImage(imageUrl);
      const newImages = images.filter((_, i) => i !== index);
      onImagesChange(newImages);
    } catch (err) {
      setError("Lỗi khi xóa ảnh");
    }
  };

  const hasProgress = Object.keys(uploadProgress).length > 0;

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 transition-all ${
          dragActive
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50"
        } ${uploading ? "opacity-50 pointer-events-none" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="image-upload"
          multiple
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          onChange={handleChange}
          className="hidden"
          disabled={uploading || images.length >= maxImages}
        />

        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            {uploading ? (
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            ) : (
              <Upload className="w-8 h-8 text-primary" />
            )}
          </div>

          <p className="text-lg font-medium mb-2">
            {uploading ? "Đang upload..." : "Kéo thả ảnh vào đây"}
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            hoặc click để chọn file
          </p>
          <p className="text-xs text-muted-foreground">
            PNG, JPG, WebP, GIF (tối đa 5MB mỗi ảnh)
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Tối đa {maxImages} ảnh ({images.length}/{maxImages})
          </p>
        </label>
      </div>

      {/* Upload Progress */}
      {hasProgress && (
        <div className="space-y-2">
          {Object.entries(uploadProgress).map(([fileName, progress]) => (
            <div key={fileName} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="truncate flex-1">{fileName}</span>
                <span className="text-muted-foreground ml-2">{progress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((imageUrl, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden border border-border group"
            >
              <img
                src={imageUrl}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Main Image Badge */}
              {index === 0 && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded">
                  Ảnh chính
                </div>
              )}

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(imageUrl, index)}
                className="absolute top-2 right-2 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                aria-label="Xóa ảnh"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Image Number */}
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/50 text-white text-xs rounded">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
