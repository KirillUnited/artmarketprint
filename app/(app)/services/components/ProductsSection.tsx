import { ArrowRight } from 'lucide-react';
import { B, BG, BORDER, CARD, MUTED, Y } from '../mock/constants';
import { Fade, SectionEyebrow } from './primitives';
import { sanityFetch } from '@/sanity/lib/sanityFetch';
import { CURRENCIES_SYMBOLS } from '@/lib/products/companies';
import { BySymbol } from '@/components/ui/symbols/currencies';
import Image from 'next/image';
import Link from 'next/link';
import { Card, Chip } from '@heroui/react';

const FEATURED_PRODUCTS_QUERY = "*[_type == 'product'] | order(_createdAt asc) [0...9]";

export default async function ProductsSection() {
  const products = await sanityFetch({ query: FEATURED_PRODUCTS_QUERY });
  if (!products) return null;

  return (
    <section style={{ background: BG, padding: '88px 0' }}>
      <div className="container flex max-w-screen-xl flex-col gap-12">
        <Fade>
          <SectionEyebrow n="04" label="каталог" />
          <h2 className="heading-2">Популярные товары</h2>
        </Fade>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {products.map((p: any, i: number) => (
            <Link href={`/products/${p.id}`} key={p.id}>
              <Fade key={p.title} delay={i * 0.04} className="h-full">
                <Card className="h-full">
                  <Image
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={220}
                    height={144}
                    style={{
                      width: '100%',
                      height: 144,
                      objectFit: 'contain',
                      display: 'block',
                      transition: 'transform .3s',
                    }}
                  />
                  <Card.Content>
                    <Chip className="line-clamp-1 inline w-auto self-start">{p.category}</Chip>
                    <h3 className="line-clamp-1 font-semibold">{p.name}</h3>
                    <Card.Footer>
                      <p>
                        {p.price} {CURRENCIES_SYMBOLS['BYN'] && <BySymbol />}
                      </p>
                    </Card.Footer>
                  </Card.Content>
                </Card>
              </Fade>
            </Link>
          ))}
          {/* View all card */}
          <Link href="/products/categories/all">
            <Fade delay={products.length * 0.04} className="h-full">
              <div
                className="h-full"
                style={{
                  background: Y,
                  borderRadius: 16,
                  padding: 24,
                  cursor: 'pointer',
                  minHeight: 240,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'filter .15s',
                }}
              >
                <h3 style={{ fontSize: 20, fontWeight: 800, color: B, lineHeight: 1.2 }}>
                  Смотреть весь каталог
                </h3>
                <ArrowRight style={{ width: 24, height: 24, color: B }} />
              </div>
            </Fade>
          </Link>
        </div>
      </div>
    </section>
  );
}
