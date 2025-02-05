'use client';
import React, {useCallback, useEffect} from 'react'
import clsx from 'clsx';
import Script from 'next/script';

import Section from '@/components/layout/Section';
import {SectionProps} from '@/types';

export default function InstagramFeed({className}: React.HTMLAttributes<HTMLDivElement>) {
    useEffect(()=>{
        const eapps = document.getElementById('eapps-instagram-feed-2');
        console.log(eapps);
    }, [])


    return (
        <div className={
            clsx('relative after:absolute after:z-[99999] after:left-0 after:bottom-0 after:w-full after:block after:bg-background after:h-12',
                className)
        }>
            <Script async src="https://static.elfsight.com/platform/platform.js"/>
            <div className="elfsight-app-066c23ef-c819-421b-a4f2-60acfc8ea266" data-elfsight-app-lazy='false'/>
        </div>
    )
}

export const InstagramFeedSection = ({className}: SectionProps) => {
    return (
        <Section className={clsx(className)} containerFluid={true}>
            <InstagramFeed/>
        </Section>
    )
}