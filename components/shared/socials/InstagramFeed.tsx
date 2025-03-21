'use client'
import clsx from 'clsx';
import Script from 'next/script';
import Link from 'next/link';

import Section, {SectionDescription, SectionHeading, SectionSubtitle, SectionTitle} from '@/components/layout/Section';
import {SectionProps} from '@/types';

import styles from './style.module.css';
import { useEffect, useState } from 'react';

export default function InstagramFeed({className}: React.HTMLAttributes<HTMLDivElement>) {
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        const handleScriptLoad = () => {
            setIsLoaded(true);
        };
        window.addEventListener('elfsight:widget:loaded', handleScriptLoad);
        return () => window.removeEventListener('elfsight:widget:loaded', handleScriptLoad);
    }, []);
     return (
        <div className={
            clsx(
				'relative after:absolute after:z-[99999] after:left-0 after:bottom-0 after:w-full after:block after:bg-background after:h-12',
                styles.instagramFeed,
                className
            )
        }>
            <Script async src="https://static.elfsight.com/platform/platform.js"/>
            <div className="elfsight-app-066c23ef-c819-421b-a4f2-60acfc8ea266" data-elfsight-app-lazy='false'/>
        </div>
    )
}

export const InstagramFeedSection = ({className}: SectionProps) => {
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
            {/* <InstagramFeed/> */}
        </Section>
    )
}