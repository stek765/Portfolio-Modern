import { Link } from "wouter";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground px-6">
      <div className="w-full max-w-md text-center space-y-4">
        <AlertCircle className="w-10 h-10 text-primary mx-auto" />
        <h1 className="text-2xl font-bold">Page not found</h1>
        <p className="text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <Link href="/">
          <Button variant="outline">Back to home</Button>
        </Link>
      </div>
    </div>
  );
}
