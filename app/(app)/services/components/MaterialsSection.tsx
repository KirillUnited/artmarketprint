'use client';

import Link from 'next/link';
import { SUBTLE, BORDER, CARD, Y, B, MUTED } from '../mock/constants';
import { Fade, SectionEyebrow } from './primitives';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import { Card } from '@heroui/react';

export default function MaterialsSection({ items }: { items: any[] }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section id="материалы" className="bg-subtle py-20">
      <div className="container max-w-7xl">
        <Fade>
          <SectionEyebrow n="09" label="технологии" />
          <h2 className="heading-2 mb-4">Технологии и материалы</h2>
          <p className="subtitle-5 mb-12">
            Технологии и материалы, которые мы используем в производстве
          </p>
        </Fade>
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((m, i) => (
            <Link key={m.title} href={`/services/${m.currentSlug}`} className="h-full">
              <Fade delay={i * 0.06} className="h-full">
                <Card className="hover:border-accent h-full gap-0 border p-0 transition-colors">
                  <div className="h-48 overflow-hidden">
                    <Image
                      src={urlFor(m.image).width(400).height(220).url()}
                      alt={m.title}
                      loading="lazy"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="h-full w-full object-cover transition-transform"
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  </div>
                  <Card.Header className="gap-2 p-4">
                    <Card.Title className="line-clamp-1 text-base font-semibold">
                      {m.title}
                    </Card.Title>
                    {m.description && (
                      <Card.Description className="line-clamp-2">{m.description}</Card.Description>
                    )}
                  </Card.Header>
                </Card>
              </Fade>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
