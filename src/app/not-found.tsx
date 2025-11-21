import Link from "next/link";
import { Button } from "@/shared/ui";
import { Home, ArrowLeft, Leaf } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-green-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="space-y-6 max-w-2xl mx-auto relative z-10">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <h1 className="text-9xl font-bold text-green-900/10 dark:text-green-100/10 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <Leaf className="w-24 h-24 text-green-600 animate-bounce" />
            </div>
          </div>
        </div>

        <h2 className="text-4xl font-bold text-green-800 dark:text-green-200">
          Oops! Cây này chưa mọc...
        </h2>

        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Có vẻ như bạn đã đi lạc vào một khu rừng chưa được khám phá. Trang bạn
          tìm kiếm không tồn tại hoặc đã được di chuyển đến một khu vườn khác.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link href="/">
            <Button
              size="lg"
              className="gap-2 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20"
            >
              <Home className="w-4 h-4" />
              Về Khu Vườn Chính
            </Button>
          </Link>
          <Link href="/categories">
            <Button
              variant="outline"
              size="lg"
              className="gap-2 border-green-200 hover:bg-green-50 text-green-700 dark:border-green-800 dark:hover:bg-green-900/30 dark:text-green-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Khám Phá Cây Xanh
            </Button>
          </Link>
        </div>
      </div>

      {/* Floating Leaves Animation (CSS only representation) */}
      <div className="absolute top-1/4 left-1/4 animate-bounce delay-700 opacity-20">
        <Leaf className="w-8 h-8 text-green-400 rotate-45" />
      </div>
      <div className="absolute bottom-1/3 right-1/4 animate-bounce delay-300 opacity-20">
        <Leaf className="w-12 h-12 text-emerald-500 -rotate-12" />
      </div>
    </div>
  );
}
