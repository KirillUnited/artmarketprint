'use client';
import { Button } from "@heroui/button";
import { ArrowRightIcon, Eclipse, XIcon } from "lucide-react";
import { useState } from "react";

export default function SalesBanner({ isActive, title, description, discountPercentage }: any) {
  const [isVisible, setIsVisible] = useState(isActive);

  if (!isVisible) return null;

  return (
    <div className="bg-brand-gradient text-primary-foreground px-4 py-3">
      <div className="container">
        <div className="flex gap-2">
          <div className="flex grow items-baseline gap-3">
            <Eclipse className=" shrink-0 opacity-60" size={16} aria-hidden="true" />
            <div className="flex grow flex-col justify-between gap-2">
              <p className="text-xl font-semibold">
                {title} - <span className="text-2xl font-bold">{discountPercentage}%</span>
              </p>
              <p>
                {description}
              </p>
              <Button href="#" variant="bordered" color="default" className="text-primary-foreground group text-sm font-medium whitespace-nowrap self-start">
                Узнать больше
                <ArrowRightIcon
                  className="ms-1 -mt-0.5 inline-flex opacity-60 transition-transform group-hover:translate-x-0.5"
                  size={16}
                  aria-hidden="true"
                />
              </Button>
            </div>
          </div>
          <Button
            variant="ghost"
            className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
            onPress={() => setIsVisible(false)}
            aria-label="Close banner"
            isIconOnly
          >
            <XIcon
              size={16}
              className="opacity-60 transition-opacity group-hover:opacity-100"
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
