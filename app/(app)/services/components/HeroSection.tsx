import { ArrowRight, Check, Clock, PackageCheck, Star } from 'lucide-react';
import { B, BORDER, MUTED, Y } from '../mock/constants';
import { BtnDark, BtnPrimary, YellowTag } from './primitives';
import { Card } from '@heroui/react';
import { getUrlFor } from '@/lib/utils';
import { ServiceBreadcrumb } from '@/components/ui/Breadcrumb';
import { Image } from '@heroui/image';
import { Button, Chip } from '@heroui/react';
import Link from 'next/link';

export default function HeroSection({ service }: any) {
  return (
    <section style={{ borderBottom: `1px solid ${BORDER}` }}>
      <div className="mx-auto max-w-screen-xl px-6" style={{ paddingTop: 72, paddingBottom: 80 }}>
        <div className="grid items-center gap-10 md:grid-cols-12">
          {/* Left — 7 cols */}
          <div className="md:col-span-7">
            <ServiceBreadcrumb service="Услуги" serviceSlug="services" title={service.title} />
            <Chip className="bg-accent text-accent-foreground mt-6">
              <Check className="size-3" /> Собственное производство · Минск
            </Chip>
            <h1
              style={{
                marginTop: 24,
                fontSize: 'clamp(40px,5vw,64px)',
                fontWeight: 900,
                lineHeight: 1.04,
                color: B,
                letterSpacing: '-0.02em',
              }}
              className="heading-1"
            >
              {service.title}
              <br />
              <span style={{ color: MUTED, fontWeight: 400 }}>для бизнеса</span>
            </h1>
            <p
              style={{ marginTop: 24, fontSize: 18, color: '#555', lineHeight: 1.7, maxWidth: 520 }}
            >
              {service?.description || ''}
            </p>
            <div style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <Link href={'#calculator'}>
                <Button variant="primary" size="lg">
                  Получить расчёт <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link href={'#contacts'}>
                <Button variant="tertiary" size="lg" className="bg-foreground text-surface">
                  Заказать услугу
                </Button>
              </Link>
            </div>
            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" style={{ marginTop: 40 }}>
              {(
                [
                  [Clock, service?.term || 'от 1 дня', 'срок изготовления'],
                  [PackageCheck, service?.min || 'от 100 шт.', 'минимальный тираж'],
                  [Check, '6 подложек', 'материалов'],
                ] as [React.ElementType, string, string][]
              ).map(([Icon, val, label]) => (
                <Card key={label} style={{ padding: 16 }}>
                  <Icon style={{ width: 16, height: 16, color: Y, marginBottom: 8 }} />
                  <p style={{ fontWeight: 700, fontSize: 14, color: B }}>{val}</p>
                  <p style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>{label}</p>
                </Card>
              ))}
              {/* Floating badge */}
              <Card
                style={{
                  background: Y,
                  padding: '16px 20px',
                  boxShadow: '0 8px 32px rgba(0,0,0,.12)',
                }}
              >
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: B,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  Срочный запуск
                </p>
                <p style={{ fontSize: 28, fontWeight: 900, color: B, lineHeight: 1, marginTop: 4 }}>
                  24 ч
                </p>
                <p style={{ fontSize: 11, color: '#555', marginTop: 2 }}>
                  после утверждения макета
                </p>
              </Card>
            </div>
          </div>

          {/* Right — 5 cols */}
          <div className="relative mt-8 md:col-span-5 md:mt-0">
            <Image
              src={getUrlFor(service?.image) || ''}
              alt="Производство ArtMarketPrint"
              width={600}
              height={480}
              className="rounded-24 h-120 w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
