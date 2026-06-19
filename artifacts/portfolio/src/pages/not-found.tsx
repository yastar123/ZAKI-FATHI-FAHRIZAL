import { Link } from "wouter";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-50 border border-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle size={28} className="text-red-400" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">404</h1>
        <p className="text-lg font-medium text-foreground mb-2">Page Not Found</p>
        <p className="text-sm text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary/90 transition-colors cursor-pointer">
            <ArrowLeft size={16} />
            Back to Home
          </span>
        </Link>
      </div>
    </div>
  );
}
