'use client';

import { useState } from 'react';
import { SUBTLE, BORDER, CARD, Y, B, MUTED } from '../mock/constants';
import { Fade, SectionEyebrow } from './primitives';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';

export default function GallerySection({ items }: any) {
  const [filter, setFilter] = useState('Все');
  const filters = ['Все', 'Ритейл', 'Интерьер', 'Сувениры'];

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section id="портфолио" style={{ background: SUBTLE, padding: '88px 0' }}>
      <div className="mx-auto max-w-screen-xl px-6">
        <Fade>
          <SectionEyebrow n="07" label="портфолио" />
          <h2
            style={{
              fontSize: 'clamp(28px,4vw,42px)',
              fontWeight: 800,
              color: B,
              marginBottom: 16,
              letterSpacing: '-0.02em',
            }}
          >
            Галерея работ
          </h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '9px 18px',
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: `1px solid ${filter === f ? Y : BORDER}`,
                  background: filter === f ? Y : CARD,
                  color: filter === f ? B : MUTED,
                  transition: 'all .15s',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </Fade>
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item: any, i: number) => (
            <Image
              key={i}
              src={urlFor(item).width(500).height(500).url()}
              alt="Пример работы ArtMarketPrint"
              loading="lazy"
              width={500}
              height={500}
              className="w-full rounded-2xl object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
