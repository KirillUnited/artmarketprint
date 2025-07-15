'use client';

import { useCallback, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, FreeMode, Navigation, Pagination} from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight, LoaderIcon } from 'lucide-react';
import { Button } from '@heroui/button';
import { FeaturedCategoryThumb } from "@/components/shared/category/ui";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

interface FeaturedCategoryListProps {
    items?: any[];
}

export const FeaturedCategoryList = ({items}: FeaturedCategoryListProps) => {
    return (
        <ul className="grid grid-cols-[var(--grid-template-columns)] gap-8">
            {items?.map((item: any) => (
                <li key={item.title}>
                    <FeaturedCategoryThumb item={item} />
                </li>
            ))}
        </ul>
    );
};