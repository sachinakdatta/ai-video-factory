import { useEffect, useRef, useState } from 'react';
import { marqueeImages } from '../data/content';

const ROW_ONE = marqueeImages.slice(0, 11);
const ROW_TWO = marqueeImages.slice(11);

function Row({ images, offset }: { images: string[]; offset: number }) {
  // Tripled so the strip always covers the viewport as it slides either way.
  const tiles = [...images, ...images, ...images];

  return (
    <div className="flex gap-3" style={{ transform: `translateX(${offset}px)`, willChange: 'transform' }}>
      {tiles.map((src, i) => (
        <div key={`${src}-${i}`} className="h-[270px] w-[420px] shrink-0 overflow-hidden rounded-2xl">
          <img
            src={src}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const update = () => {
      const node = sectionRef.current;
      if (!node) return;

      const sectionTop = node.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const shifted = offset - 200;

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40"
      style={{ overflowX: 'clip' }}
    >
      <div className="flex flex-col gap-3">
        <Row images={ROW_ONE} offset={shifted} />
        <Row images={ROW_TWO} offset={-shifted} />
      </div>
    </section>
  );
}
