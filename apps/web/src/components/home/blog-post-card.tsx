import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { Card } from "@/components/card";

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  href: string;
}

export function BlogPostCard({
  title,
  excerpt,
  image,
  date,
  category,
  href,
}: BlogPostCardProps) {
  return (
    <Link href={href}>
      <Card className="group overflow-hidden h-full">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <span className="text-xs uppercase tracking-wider text-[var(--color-ocean)] font-semibold">
            {category}
          </span>
          <h3 className="font-display text-xl text-[var(--color-navy)] mt-2 mb-2">{title}</h3>
          <p className="text-sm text-[var(--color-text-muted)] mb-4 line-clamp-2">{excerpt}</p>
          <time className="text-xs text-[var(--color-text-muted)]">{date}</time>
        </div>
      </Card>
    </Link>
  );
}





