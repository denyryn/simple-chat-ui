import { fetchImageBase64 } from "../lib/fetchImage";

export default async function CachedImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const base64Image = await fetchImageBase64(src);

  return <img src={base64Image} alt={alt} className={className} />;
}
