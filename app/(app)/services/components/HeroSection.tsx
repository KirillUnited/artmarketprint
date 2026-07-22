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
    <section className="border-b">
      <div className="container max-w-screen-xl py-20">
        <div className="grid items-center gap-12 md:grid-cols-12">
          {/* Left — 7 cols */}
          <div className="flex flex-col items-start gap-10 md:col-span-7">
            <ServiceBreadcrumb service="Услуги" serviceSlug="services" title={service.title} />
            <div className="flex flex-col items-start gap-6">
              <Chip className="bg-accent text-accent-foreground">
                <Check className="size-3" /> Собственное производство · Минск
              </Chip>
              <h1 className="heading-1">
                {service.title}
                <br />
                <span className="text-muted">для бизнеса</span>
              </h1>
              <p className="text-lg text-pretty">{service?.description || ''}</p>
            </div>
            <div className="flex flex-wrap gap-4">
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
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {(
                [
                  [Clock, service?.term || 'от 1 дня', 'срок изготовления'],
                  [PackageCheck, service?.min || 'от 100 шт.', 'минимальный тираж'],
                  [Check, '6 подложек', 'материалов'],
                ] as [React.ElementType, string, string][]
              ).map(([Icon, val, label]) => (
                <Card key={label}>
                  <Icon className="size-6" />
                  <Card.Header>
                    <Card.Title className="font-semibold">{val}</Card.Title>
                    <Card.Description className="text-xs">{label}</Card.Description>
                  </Card.Header>
                </Card>
              ))}
              {/* Floating badge */}
              <Card className="bg-accent">
                <p className="text-uppercase text-xs font-semibold">Срочный запуск</p>
                <Card.Header>
                  <Card.Title className="heading-3 font-bold">24 ч</Card.Title>
                  <Card.Description className="text-xs">после утверждения макета</Card.Description>
                </Card.Header>
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
              className="h-120 w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
