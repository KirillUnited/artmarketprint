'use client';
import React from 'react';

import { Button } from '@heroui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from 'lucide-react';

import BrandButton from '@/components/ui/BrandButton';
import { PortableText } from 'next-sanity';

export default function HeroContent({ title, description, subtitle }: { title?: any, description?: string, subtitle?: string }) {
    return (
        <>
            <div className="flex flex-col gap-4 md:gap-6">
                {
                    subtitle &&
                    <motion.span
                        className="text-primary uppercase text-base leading-normal font-bold"
                        initial={{
                            opacity: 0,
                            translate: '0 -100%',
                        }}
                        transition={{ duration: 2.5, ease: 'easeInOut' }}
                        viewport={{ once: true, amount: 0 }}
                        whileInView={{
                            opacity: 1,
                            translate: '0',
                        }}
                    >
                        - {subtitle} -
                    </motion.span>
                }
                <motion.div
                    className="text-4xl md:text-5xl lg:text-6xl leading-none font-medium break-words text-balance"
                    initial={{
                        opacity: 0,
                        translate: '100% 0',
                    }}
                    transition={{ duration: 2.5, ease: 'easeInOut' }}
                    viewport={{ once: true, amount: 0 }}
                    whileInView={{
                        opacity: 1,
                        translate: '0',
                    }}
                >
                    {/* <span className="hidden md:inline">Профессиональная</span> <span className="hidden md:inline">печать</span> <span className="md:hidden">Печать</span> на
                        <span className="font-extrabold"> любых материалах </span>в<span className="font-extrabold bg-brand-gradient text-fill-transparent"> Минске</span> */}
                    <PortableText value={title} />
                </motion.div>
                {
                    description &&
                    <p className="text-foreground/70 text-base md:text-lg leading-normal font-medium">{description}</p>
                }
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                <BrandButton as={Link} href={'/#services'} state="primary">
                    УЗНАТЬ ЦЕНЫ
                </BrandButton>

                <Button
                    as={Link}
                    className="bg-brand-gradient text-fill-transparent font-semibold"
                    color="secondary"
                    href={'/catalog'}
                    radius="sm"
                    size="lg"
                    target="_blank"
                    variant="bordered"
                >
                    <span className="leading-none">КАТАЛОГ</span>
                    <ArrowUpRightIcon className="text-secondary" size={18} />
                </Button>
            </div>
        </>
    )
}
