import { BlogPostCard } from "./blog-post-card";
import { Button } from "@/components/button";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";

interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  href: string;
}

interface BlogPreviewProps {
  title: string;
  posts: BlogPost[];
  ctaLabel?: string;
  ctaHref?: string;
}

export function BlogPreview({
  title,
  posts,
  ctaLabel = "Read More Stories →",
  ctaHref = "/stories",
}: BlogPreviewProps) {
  return (
    <Section>
      <Container>
        <h2 className="section-heading text-center mb-8">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {posts.map((post, index) => (
            <BlogPostCard key={index} {...post} />
          ))}
        </div>
        <div className="text-center">
          <Button href={ctaHref} variant="primary">
            {ctaLabel}
          </Button>
        </div>
      </Container>
    </Section>
  );
}





