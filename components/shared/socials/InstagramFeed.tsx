'use client'
import clsx from 'clsx';
import Script from 'next/script';
import Link from 'next/link';

import Section, { SectionDescription, SectionHeading, SectionSubtitle, SectionTitle } from '@/components/layout/Section';
import { SectionProps } from '@/types';

import styles from './style.module.css';
import { useEffect, useState } from 'react';

export default function InstagramFeed({ className }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={
            clsx(
                className
            )
        }>
            <Script src="https://cdn.lightwidget.com/widgets/lightwidget.js"></Script>
            <iframe title='Instagram Feed' src="https://cdn.lightwidget.com/widgets/9182bf37593d50c0a994202f51247340.html" scrolling="no" className="lightwidget-widget" style={{width: '100%', border: 0, overflow: 'hidden'}} />

        </div>
    )
}

export const InstagramFeedOld = ({ className }: SectionProps) => {
    const [isLoaded, setIsLoaded] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            const insta = document.querySelectorAll('.elfsight-app-066c23ef-c819-421b-a4f2-60acfc8ea266 > a');
            insta?.forEach((item) => {
                item.remove();
            });
        }, 5000);
        setIsLoaded(false);
    });

    return (
        <div className={
            clsx(
                'relative after:absolute after:z-[99999] after:left-0 after:bottom-0 after:w-full after:block after:bg-background after:h-12',
                styles.instagramFeed,
                className
            )
        }>
            <Script async src="https://static.elfsight.com/platform/platform.js" />
            <div className="elfsight-app-066c23ef-c819-421b-a4f2-60acfc8ea266" data-elfsight-app-lazy='false' />
        </div>
    )
}

export const InstagramFeedSection = ({ className }: SectionProps) => {
    return (
        <Section className={clsx(className)} containerFluid={true}>
            <div className="container flex flex-col items-center text-center">
                <SectionHeading>
                    <SectionSubtitle>
                        мы в instagram
                    </SectionSubtitle>
                    <SectionTitle>
                        <Link className='bg-brand-gradient text-fill-transparent truncate' href={'https://www.instagram.com/artmarketprint_by/'} target='_blank'> @artmarketprint_by</Link>
                    </SectionTitle>
                    <SectionDescription>
                        Ознакомьтесь с нашими примерами работ и услуг.
                    </SectionDescription>
                </SectionHeading>
            </div>
            {/* <InstagramFeedOld /> */}
        </Section>
    )
}