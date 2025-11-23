"use client";

import { useState } from "react";
import {
  X,
  Facebook,
  Twitter,
  MessageCircle,
  Link as LinkIcon,
  Check,
} from "lucide-react";
import { Button } from "@/shared/ui";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    price: string;
    images: string[];
    slug?: string | null;
  };
}

export function ShareModal({ isOpen, onClose, product }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const productUrl = `${window.location.origin}/products/${
    product.slug || product.id
  }`;
  const shareText = `Xem sản phẩm ${product.name} - ${product.price}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      productUrl
    )}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(productUrl)}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const handleShareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(
      `${shareText} ${productUrl}`
    )}`;
    window.open(url, "_blank");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="glass rounded-2xl p-6 max-w-md w-full pointer-events-auto animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Chia Sẻ Sản Phẩm</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Product Preview */}
          <div className="flex items-center gap-3 p-3 glass rounded-lg mb-6">
            <img
              src={product.images?.[0] || "/placeholder.jpg"}
              alt={product.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{product.name}</h3>
              <p className="text-primary font-bold">{product.price}</p>
            </div>
          </div>

          {/* Share Options */}
          <div className="space-y-3 mb-6">
            <Button
              onClick={handleShareFacebook}
              variant="outline"
              className="w-full justify-start gap-3 h-12"
              size="lg"
            >
              <div className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center">
                <Facebook className="w-5 h-5 text-white fill-current" />
              </div>
              <span>Chia sẻ lên Facebook</span>
            </Button>

            <Button
              onClick={handleShareTwitter}
              variant="outline"
              className="w-full justify-start gap-3 h-12"
              size="lg"
            >
              <div className="w-8 h-8 rounded-full bg-[#1DA1F2] flex items-center justify-center">
                <Twitter className="w-5 h-5 text-white fill-current" />
              </div>
              <span>Chia sẻ lên Twitter</span>
            </Button>

            <Button
              onClick={handleShareWhatsApp}
              variant="outline"
              className="w-full justify-start gap-3 h-12"
              size="lg"
            >
              <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white fill-current" />
              </div>
              <span>Chia sẻ qua WhatsApp</span>
            </Button>
          </div>

          {/* Copy Link */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Hoặc copy link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={productUrl}
                readOnly
                className="flex-1 px-4 py-3 glass rounded-lg text-sm border border-border focus:border-primary focus:outline-none"
              />
              <Button
                onClick={handleCopyLink}
                className={`px-6 ${
                  copied ? "bg-green-600 hover:bg-green-600" : ""
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Đã Copy
                  </>
                ) : (
                  <>
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
