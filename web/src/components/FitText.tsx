import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

interface FitTextProps {
  text: string;
  /** Fraction of the container width the text should span. */
  fill?: number;
  className?: string;
}

/**
 * Scales a single line of text so it spans the full width of its container.
 * The hero name is longer than a fixed vw size can safely assume, so the size
 * is measured instead of hard-coded — it stays edge-to-edge at any viewport
 * width and for any name length.
 */
export default function FitText({ text, fill = 1, className = '' }: FitTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState<number | null>(null);

  const fit = useCallback(() => {
    const container = containerRef.current;
    const node = textRef.current;
    if (!container || !node) return;

    const target = container.clientWidth * fill;
    if (!target) return;

    // Letter-spacing and font fallbacks make width only roughly proportional to
    // font-size, so correct across a few passes instead of trusting one ratio.
    let size = 100;
    node.style.fontSize = `${size}px`;

    for (let pass = 0; pass < 4; pass += 1) {
      const measured = node.getBoundingClientRect().width;
      if (!measured) return;
      size = (size * target) / measured;
      node.style.fontSize = `${size}px`;
    }

    setFontSize(size);
  }, [fill]);

  useLayoutEffect(() => {
    fit();

    const container = containerRef.current;
    if (!container) return;

    // Observing the container (not the text) keeps this from feeding back on itself.
    const observer = new ResizeObserver(fit);
    observer.observe(container);
    return () => observer.disconnect();
  }, [fit, text]);

  useEffect(() => {
    // Kanit changes the metrics once it loads, so re-measure after it arrives.
    document.fonts?.ready.then(fit).catch(() => undefined);
  }, [fit]);

  return (
    <span ref={containerRef} className="block w-full">
      <span
        ref={textRef}
        className={`inline-block whitespace-nowrap ${className}`}
        style={fontSize ? { fontSize: `${fontSize}px` } : undefined}
      >
        {text}
      </span>
    </span>
  );
}
