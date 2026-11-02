import Link from "next/link";

type BreadcrumbProps = {
  category: string;
  categoryNameBn: string;
  nameBn: string;
};

export default function Breadcrumb({
  category,
  categoryNameBn,
  nameBn,
}: BreadcrumbProps) {
  return (
    <nav className="py-4 text-sm text-gray-500">
      <div className="flex items-center gap-2">

        
        <Link
          href="/"
          className="hover:text-green-600 transition-colors"
        >
          হোম
        </Link>

        <span>›</span>

        
        <Link
          href={`/category/${category}`}
          className="hover:text-green-600 transition-colors"
        >
          {categoryNameBn}
        </Link>

        <span>›</span>

        {/* Current Product */}
        <span className="text-gray-700">
          {nameBn}
        </span>

      </div>
    </nav>
  );
}