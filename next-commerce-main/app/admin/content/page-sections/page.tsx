import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function PageSectionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Page Sections</h1>
          <p>Manage your website's landing page sections and content layout.</p>
        </div>
        <Button asChild className="shrink-0 font-bold">
          <Link href="/admin/content/page-sections/new">
            <Plus />
            New Section
          </Link>
        </Button>
      </div>
    </div>
  );
}