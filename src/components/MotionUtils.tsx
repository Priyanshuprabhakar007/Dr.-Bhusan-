import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';

// Custom high-end easing matching reference recording
export const EDITORIAL_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * MaskedHeading Component
 * Wraps each line in an overflow-hidden container and translates from 105% to 0%
 * with stagger and smooth cubic-bezier easing.
 */
interface MaskedHeadingProps {
  lines: string[];
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
}

export const MaskedHeading: React.FC<MaskedHeadingProps> = ({
  lines,
  as = 'h2',
  className = '',
  lineClassName = '',
  delay = 0.1,
  stagger = 0.1,
  duration = 0.75
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const Tag = as as React.ElementType;

  return (
    <div ref={ref} className={className}>
      <Tag className="contents">
        {lines.map((line, idx) => (
          <span
            key={idx}
            className={`block overflow-hidden pb-1 -mb-1 ${lineClassName}`}
          >
            <motion.span
              className="block"
              initial={{ y: '105%', opacity: 0.1 }}
              animate={isInView ? { y: '0%', opacity: 1 } : { y: '105%', opacity: 0.1 }}
              transition={{
                duration,
                delay: delay + idx * stagger,
                ease: EDITORIAL_EASE
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </Tag>
    </div>
  );
};

/**
 * MaskedText Component for single line or simple text block
 */
interface MaskedTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export const MaskedText: React.FC<MaskedTextProps> = ({
  children,
  className = '',
  delay = 0.15,
  duration = 0.65
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '105%', opacity: 0.1 }}
        animate={isInView ? { y: '0%', opacity: 1 } : { y: '105%', opacity: 0.1 }}
        transition={{
          duration,
          delay,
          ease: EDITORIAL_EASE
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/**
 * CountUp Component
 * Animates a verified number from 0 to target (e.g. 10+) when entering the viewport.
 * Runs once only.
 */
interface CountUpProps {
  target: number;
  suffix?: string;
  prefix?: string;
  durationMs?: number;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  target,
  suffix = '+',
  prefix = '',
  durationMs = 1200,
  className = ''
}) => {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrent(target);
      return;
    }

    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // easeOutExpo function
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const val = Math.round(easeProgress * target);
      setCurrent(val);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setCurrent(target);
      }
    };

    requestAnimationFrame(frame);
  }, [isInView, target, durationMs]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {current}
      {suffix}
    </span>
  );
};

/**
 * ClipRevealImage Component
 * Clips an image in from an edge with inner zoom settle (scale 1.07 -> 1.0)
 * Alternating directions: 'left' | 'right' | 'bottom' | 'top'
 */
interface ClipRevealImageProps {
  src: string;
  mobileSrc?: string;
  alt: string;
  direction?: 'bottom' | 'right' | 'left' | 'top';
  className?: string;
  imgClassName?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
}

export const ClipRevealImage: React.FC<ClipRevealImageProps> = ({
  src,
  mobileSrc,
  alt,
  direction = 'bottom',
  className = '',
  imgClassName = '',
  style,
  delay = 0.15,
  duration = 1.0
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const clipInitialMap = {
    bottom: 'inset(0 0 100% 0)',
    right: 'inset(0 100% 0 0)',
    left: 'inset(0 0 0 100%)',
    top: 'inset(100% 0 0 0)'
  };

  const initialClip = clipInitialMap[direction];

  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`}>
      <motion.div
        className="w-full h-full"
        initial={{ clipPath: initialClip }}
        animate={isInView ? { clipPath: 'inset(0% 0% 0% 0%)' } : { clipPath: initialClip }}
        transition={{
          duration,
          delay,
          ease: EDITORIAL_EASE
        }}
      >
        <picture className="w-full h-full block">
          {mobileSrc && mobileSrc.trim() ? (
            <source media="(max-width: 768px)" srcSet={mobileSrc.trim()} />
          ) : null}
          <motion.img
            src={src && src.trim() ? src.trim() : 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1600&q=85'}
            alt={alt}
            style={style}
            initial={{ scale: 1.07 }}
            animate={isInView ? { scale: 1 } : { scale: 1.07 }}
            transition={{
              duration: duration * 1.1,
              delay,
              ease: EDITORIAL_EASE
            }}
            className={`w-full h-full object-cover will-change-transform ${imgClassName}`}
            referrerPolicy="no-referrer"
          />
        </picture>
      </motion.div>
    </div>
  );
};
