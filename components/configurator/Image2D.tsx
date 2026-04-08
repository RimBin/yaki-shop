import SeoImage from '@/components/ui/SeoImage';

export interface Image2DProps {
  src?: string;
  alt: string;
  title?: string;
  description?: string;
}

export default function Image2D({ src = '/images/ui/wood/imgSpruce.png', alt, title, description }: Image2DProps) {
  return (
    <SeoImage
      src={src}
      alt={alt}
      title={title}
      description={description}
      fill
      className="object-cover"
      sizes="(max-width: 1024px) 100vw, 60vw"
      priority
      data-testid="configurator-2d-image"
    />
  );
}
