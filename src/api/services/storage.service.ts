import { supabase } from "@/lib/supabase/client";

const BUCKET_NAME = "product-images";

/**
 * Upload a single image to Supabase Storage
 */
export async function uploadImage(file: File): Promise<string> {
  try {
    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    // Upload file
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Supabase upload error:", error);

      // Provide helpful error messages
      if (error.message.includes("not found")) {
        throw new Error(
          `Bucket '${BUCKET_NAME}' chưa được tạo. Vui lòng tạo bucket trong Supabase Dashboard.`
        );
      }
      if (
        error.message.includes("permission") ||
        error.message.includes("policy")
      ) {
        throw new Error(
          "Không có quyền upload. Vui lòng kiểm tra bucket policies trong Supabase."
        );
      }
      throw error;
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Lỗi khi upload ảnh");
  }
}

/**
 * Upload multiple images to Supabase Storage
 */
export async function uploadImages(files: File[]): Promise<string[]> {
  try {
    const uploadPromises = files.map((file) => uploadImage(file));
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw new Error("Failed to upload images");
  }
}

/**
 * Delete an image from Supabase Storage
 */
export async function deleteImage(imageUrl: string): Promise<void> {
  try {
    // Extract file path from URL
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split(`/${BUCKET_NAME}/`);
    if (pathParts.length < 2) {
      throw new Error("Invalid image URL");
    }
    const filePath = pathParts[1];

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    throw new Error("Failed to delete image");
  }
}

/**
 * Delete multiple images from Supabase Storage
 */
export async function deleteImages(imageUrls: string[]): Promise<void> {
  try {
    const deletePromises = imageUrls.map((url) => deleteImage(url));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error deleting images:", error);
    throw new Error("Failed to delete images");
  }
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): {
  valid: boolean;
  error?: string;
} {
  // Check file type
  const validTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];
  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Chỉ chấp nhận file ảnh (JPEG, PNG, WebP, GIF)",
    };
  }

  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return {
      valid: false,
      error: "Kích thước file không được vượt quá 5MB",
    };
  }

  return { valid: true };
}
