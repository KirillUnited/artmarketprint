'use client';
import { Button } from '@heroui/button';
import { ArrowRightIcon, TicketPercent, XIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import clsx from "clsx";

export default function SalesBanner({ isActive, title, description, discountPercentage, products }: any) {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsVisible(isActive);
  }, [isActive]);

  if (!isVisible) return null;

  if (pathname.match(/\/products/)) return null;

  return (
    <aside className={clsx(styles.banner)}>
      <div className="container">
        <div className="flex gap-3 md:items-center">
          <div className="flex flex-1 md:items-center gap-3">
            <div
              aria-hidden="true"
              className="bg-secondary/30 flex size-9 shrink-0 items-center justify-center rounded-full"
            >
              <TicketPercent className="opacity-80" size={16} />
            </div>
            <div className="flex grow flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex flex-1 flex-col gap-1">
                <p className="text-sm font-medium leading-none">
                  {title}
                </p>
                {discountPercentage && (
                  <p className="text-sm font-medium leading-none">Скидка <span className="text-lg font-bold leading-none">- {discountPercentage}%</span></p>
                )}
                <p className="text-xs font-extralight text-slate-100">
                  {description}
                </p>
              </div>
              {
                products?.slug?.current &&
                <Button as={Link} className="group font-medium whitespace-nowrap text-foreground" href={`/services/${products?.slug?.current}`} radius="sm" size="sm" target="_blank">
                  Заказать
                  <ArrowRightIcon
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-0.5"
                    color="currentColor"
                    size={12}
                  />
                </Button>
              }
            </div>
          </div>
          <Button
            isIconOnly
            aria-label="Close banner"
            className="group size-9 min-w-0 shrink-0 p-0 hover:bg-transparent"
            variant="ghost"
            onPress={() => setIsVisible(false)}
          >
            <XIcon
              aria-hidden="true"
              className="text-primary-foreground text-opacity-60 transition-opacity group-hover:opacity-100 group-hover:text-black"
              size={16}
            />
          </Button>
        </div>
      </div>
    </aside>
  );
}
