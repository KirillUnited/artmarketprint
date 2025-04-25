import React from 'react';

interface ServiceJsonLdProps {
    name: string;
    url: string;
    description: string;
    imageUrl?: string;
}

export const BreadcrumbListJsonLd: React.FC<{ name: string }> = ({ name }) => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "item": {
                    "@id": "https://artmarketprint.by/",
                    "name": "Главная"
                }
            },
            {
                "@type": "ListItem",
                "position": 2,
                "item": {
                    "@id": "https://artmarketprint.by/services",
                    "name": "Услуги"
                }
            },
            {
                "@type": "ListItem",
                "position": 3,
                "item": {
                    "name": name,
                }
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
};

const ServiceJsonLd: React.FC<ServiceJsonLdProps> = ({
    name,
    url,
    description,
    imageUrl = 'https://artmarketprint.by/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.9b0ef703.png&w=96&q=75',
}) => {
    const reviewCount = Math.floor(Math.random() * (100 - 30 + 1)) + 30;
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        image: imageUrl,
        url,
        brand: "Артмаркетпринт",
        model: name,
        name,
        description,
        offers: {
            "@type": "Offer",
            availability: "https://schema.org/PreOrder",
            price: "0",
            priceCurrency: "BYN",
            url,
        },
        aggregateRating: {
            "@type": "AggregateRating",
            itemReviewed: name,
            ratingValue: "4.9",
            reviewCount: reviewCount.toString(),
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
};

export default ServiceJsonLd;
