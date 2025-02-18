'use client';
import React from 'react';

import { Button } from '@heroui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from 'lucide-react';

import BrandButton from '@/components/ui/BrandButton';

export default function HeroContent() {
    return (
        <>
            <motion.div
                className="bg-[rgba(255,255,255,0.50)] backdrop-blur-md rounded-lg py-10 md:py-16 pr-4 md:pr-7 flex flex-col gap-8 md:gap-16 z-10 max-w-full md:max-w-4xl overflow-hidden"
                initial={{
                    opacity: 0,
                    translate: '-100%',
                }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                viewport={{ once: true, amount: 0 }}
                whileInView={{
                    opacity: 1,
                    translate: '0',
                }}
            >
                <div className="flex flex-col gap-4 md:gap-6">
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
                        - Делаем Вашу жизнь приятнее -
                    </motion.span>
                    <motion.h1
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
                        <span className="hidden md:inline">Профессиональная</span> <span className="hidden md:inline">печать</span> <span className="md:hidden">Печать</span> на
                        <span className="font-extrabold"> любых материалах </span>в<span className="font-extrabold bg-brand-gradient text-fill-transparent"> Минске</span>
                    </motion.h1>
                    <p className="text-foreground/70 text-base md:text-lg leading-normal font-medium">Качественная УФ-печать, DTF-печать, гравировка и шелкография для ваших проектов</p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                    <BrandButton as={Link} href={'/#services'} state="primary">
                        УЗНАТЬ ЦЕНЫ
                    </BrandButton>
                    {/* <BrandModalOffer /> */}

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
            </motion.div>
        </>
    )
}
