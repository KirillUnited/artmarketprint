'use client';
import React from 'react';
import { SlideshowLightbox, initLightboxJS } from 'lightbox.js-react'
import Image from 'next/image';

export default function ProjectGallery({ items }: any) {
    console.log('items', items);

    React.useEffect(() => {
        initLightboxJS("Insert License key", "Insert plan type here");
    }, []);

    return (
        // <SlideshowLightbox className='grid grid-cols-1 md:grid-cols-3 gap-4' showThumbnails={true}>
        //     {items.map(({ _key, imageUrl, altText }: { _key: string, imageUrl: string, altText: string }) => <Image key={_key} className='w-full rounded' src={imageUrl} alt={altText} width={320} height={320} />)}
        // </SlideshowLightbox>
        <SlideshowLightbox lightboxIdentifier="lightbox1" framework="next" images={items}>
            {items.map(({ _key, imageUrl, altText }: { _key: string, imageUrl: string, altText: string }) => (
                <Image
                    key={_key}
                    src={imageUrl}
                    alt={altText}
                    height={500}
                    width={500}
                    data-lightboxjs="lightbox1"
                    quality={80}
                />
            ))}
        </SlideshowLightbox>
    )
}
