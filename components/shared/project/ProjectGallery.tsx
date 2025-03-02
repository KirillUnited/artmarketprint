'use client';
import React from 'react';
import { SlideshowLightbox } from 'lightbox.js-react'

/**
 * @typedef {Object} ProjectGalleryItem
 * @property {_key: string} _key - A unique key for the image
 * @property {string} imageUrl - The URL of the image
 * @property {string} altText - The alt text for the image
 */

/**
 * A React component that renders a grid of images which can be clicked to open a lightbox.
 * @param {ProjectGalleryItem[]} items - The list of items to render
 * @returns {React.ReactElement} The rendered component
 */

export type ProjectGalleryItem = { _key: string, imageUrl: string, altText: string };
export interface ProjectGalleryProps {
    items: ProjectGalleryItem[]
}

export default function ProjectGallery({ items }: ProjectGalleryProps): React.ReactElement {
    return (
        <SlideshowLightbox className='grid grid-cols-1 md:grid-cols-3 gap-4' showThumbnails={true}>
            {items.map(({ _key, imageUrl, altText }: ProjectGalleryItem) => <img key={_key} className='w-full rounded-small aspect-square object-cover' src={imageUrl} alt={altText} width={320} height={320} data-lightboxjs="lightbox1" loading='lazy' decoding='async' />)}
        </SlideshowLightbox>
    )
}
