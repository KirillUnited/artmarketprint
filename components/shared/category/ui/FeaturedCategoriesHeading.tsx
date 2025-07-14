import {SectionDescription, SectionHeading, SectionSubtitle, SectionTitle} from "@/components/layout/Section";
import React from "react";

export const FeaturedCategoriesHeading = ({title, subtitle, description}: {title?: string; subtitle?: string; description?: string}) => {
    return (
        <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading>
                {subtitle && <SectionSubtitle>{subtitle}</SectionSubtitle>}
                {title && <SectionTitle>{title}</SectionTitle>}
                {description && <SectionDescription>{description}</SectionDescription>}
            </SectionHeading>
        </div>
    );
};