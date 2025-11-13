import Image from "next/image";
import { Button } from "@/components/button";
import { Card } from "@/components/card";

interface AboutPreviewProps {
  title: string;
  description: string;
  image: string;
  cta: { label: string; href: string };
}

export function AboutPreview({ title, description, image, cta }: AboutPreviewProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="relative h-96 rounded overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <Card className="bg-[var(--color-sand)] p-8">
        <h2 className="font-display text-3xl text-[var(--color-navy)] mb-4">{title}</h2>
        <p className="text-[var(--color-text-primary)] mb-6 leading-relaxed">{description}</p>
        <Button href={cta.href} variant="primary">
          {cta.label}
        </Button>
      </Card>
    </div>
  );
}





