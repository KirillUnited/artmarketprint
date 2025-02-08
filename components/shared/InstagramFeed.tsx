import clsx from 'clsx';
import Script from 'next/script';

import Section, {SectionDescription, SectionHeading, SectionSubtitle, SectionTitle} from '@/components/layout/Section';
import {SectionProps} from '@/types';

export default function InstagramFeed({className}: React.HTMLAttributes<HTMLDivElement>) {
     return (
        <div className={
            clsx(
				'relative after:absolute after:z-[99999] after:left-0 after:bottom-0 after:w-full after:block after:bg-background after:h-12',
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
                        - мы в instagram -
                    </SectionSubtitle>
                    <SectionTitle>
                        @artmarketprint_by
                    </SectionTitle>
                    <SectionDescription>
                        Ознакомьтесь с нашими примерами работ и услуг.
                    </SectionDescription>
                </SectionHeading>
            </div>
            <InstagramFeed/>
        </Section>
    )
}