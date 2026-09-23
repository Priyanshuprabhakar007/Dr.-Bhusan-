import React, { useState, useEffect } from 'react';
import { getMediaUrl } from '../../lib/cloudflareMedia';

export interface CmsImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  mediaId?: string;
  storageKey?: string;
  fallbackSrc?: string;
  alt?: string;
  focalPoint?: string; // e.g. 'center top', '60% 20%', 'center center'
  aspectRatio?: string; // e.g. '16/9', '4/5', '1/1'
  isDecorative?: boolean;
  priority?: boolean;
  mediaAssets?: Array<{ id: string; url?: string; storageKey?: string; storage_key?: string }>;
}

const DEFAULT_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80';

export const CmsImage: React.FC<CmsImageProps> = ({
  src,
  mediaId,
  storageKey,
  fallbackSrc = DEFAULT_FALLBACK_IMAGE,
  alt = '',
  focalPoint,
  aspectRatio,
  isDecorative = false,
  priority = false,
  mediaAssets,
  className = '',
  style,
  onError,
  ...rest
}) => {
  const resolveTargetUrl = (
    rawSrc?: string,
    rawMediaId?: string,
    rawStorageKey?: string
  ): string => {
    const target = rawMediaId || rawStorageKey || rawSrc;
    if (!target || !target.trim()) return fallbackSrc;
    const resolved = getMediaUrl(target, mediaAssets);
    return resolved && resolved.trim() ? resolved.trim() : fallbackSrc;
  };

  const [currentSrc, setCurrentSrc] = useState<string>(() =>
    resolveTargetUrl(src, mediaId, storageKey)
  );
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const nextUrl = resolveTargetUrl(src, mediaId, storageKey);
    setCurrentSrc(nextUrl);
    setHasError(false);
  }, [src, mediaId, storageKey, fallbackSrc, mediaAssets]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError && currentSrc !== fallbackSrc) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    }
    if (onError) {
      onError(e);
    }
  };

  const computedStyle: React.CSSProperties = {
    ...style,
    ...(focalPoint ? { objectPosition: focalPoint } : {}),
    ...(aspectRatio ? { aspectRatio } : {})
  };

  const safeSrc =
    currentSrc && currentSrc.trim()
      ? currentSrc.trim()
      : fallbackSrc && fallbackSrc.trim()
      ? fallbackSrc.trim()
      : DEFAULT_FALLBACK_IMAGE;

  return (
    <img
      src={safeSrc}
      alt={isDecorative ? '' : alt}
      aria-hidden={isDecorative ? 'true' : undefined}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      referrerPolicy="no-referrer"
      onError={handleError}
      style={computedStyle}
      className={`transition-opacity duration-300 ${className}`}
      {...rest}
    />
  );
};
