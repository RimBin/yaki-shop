import NextImage, { type ImageProps } from 'next/image';

type SeoImageProps = ImageProps & {
  title?: string;
  description?: string;
  useMicrodata?: boolean;
  wrapperClassName?: string;
};

export default function SeoImage({
  alt,
  title,
  description,
  useMicrodata = true,
  wrapperClassName,
  ...props
}: SeoImageProps) {
  const resolvedTitle = title ?? (typeof alt === 'string' && alt.trim() ? alt.trim() : undefined);
  const resolvedDescription = description ?? resolvedTitle;

  const image = <NextImage {...props} alt={alt} title={resolvedTitle} />;

  if (!useMicrodata) {
    return image;
  }

  return (
    <span className={wrapperClassName ?? 'contents'} itemScope itemType="https://schema.org/ImageObject">
      {image}
      {resolvedTitle ? <meta itemProp="name" content={resolvedTitle} /> : null}
      {resolvedDescription ? <meta itemProp="description" content={resolvedDescription} /> : null}
      {typeof props.src === 'string' ? <meta itemProp="contentUrl" content={props.src} /> : null}
    </span>
  );
}