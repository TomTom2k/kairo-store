"use client";

import { useState } from "react";
import { Star, Send } from "lucide-react";
import { Button } from "@/shared/ui";

interface WriteReviewProps {
  productId: number;
  onSubmit: (review: { rating: number; comment: string; name: string }) => void;
  isSubmitting?: boolean;
}

export function WriteReview({
  productId,
  onSubmit,
  isSubmitting = false,
}: WriteReviewProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0 || !comment.trim() || !name.trim()) {
      return;
    }

    onSubmit({ rating, comment: comment.trim(), name: name.trim() });

    // Reset form after submission (handled by parent or effect if needed,
    // but for now we'll just clear it here assuming success for optimistic UI)
    // Ideally, we should clear only on success, but this is a simple implementation
    if (!isSubmitting) {
      setRating(0);
      setComment("");
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold">Viết Đánh Giá</h3>

      {/* Rating */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Đánh giá của bạn</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  star <= (hoverRating || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Name */}
      <div className="space-y-2">
        <label htmlFor="review-name" className="text-sm font-medium">
          Tên của bạn
        </label>
        <input
          id="review-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên của bạn"
          className="w-full px-4 py-3 glass rounded-lg border border-border focus:border-primary focus:outline-none transition-colors"
          required
        />
      </div>

      {/* Comment */}
      <div className="space-y-2">
        <label htmlFor="review-comment" className="text-sm font-medium">
          Nhận xét
        </label>
        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
          rows={4}
          className="w-full px-4 py-3 glass rounded-lg border border-border focus:border-primary focus:outline-none transition-colors resize-none"
          required
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={
          rating === 0 || !comment.trim() || !name.trim() || isSubmitting
        }
        className="w-full"
        size="lg"
      >
        {isSubmitting ? (
          "Đang gửi..."
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Gửi Đánh Giá
          </>
        )}
      </Button>
    </form>
  );
}
