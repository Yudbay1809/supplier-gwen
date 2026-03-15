import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="mb-6 flex items-center gap-2">
      {items.map((item, index) => (
        <div key={item.label + index} className="flex items-center gap-2">
          {item.href ? (
            <Link
              href={item.href}
              className="text-sm text-muted-foreground font-inter transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-sm text-ink font-inter">
              {item.label}
            </span>
          )}
          {index < items.length - 1 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
        </div>
      ))}
    </nav>
  );
}
