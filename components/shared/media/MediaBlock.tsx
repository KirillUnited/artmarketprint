import React from 'react';
import Image from 'next/image';
import { getEmbedUrl, getSanityFileUrl, getSanityImageUrl } from '@/sanity/lib/utils';
import { MediaBlockProps } from './media.props';

export const MediaBlock: React.FC<MediaBlockProps> = async ({
    mediaType,
    image,
    videoFile,
    videoUrl,
    caption,
}) => {
    let content;

    if (mediaType === 'videoUpload' && videoFile?.asset?._ref) {
        const url = await getSanityFileUrl(videoFile.asset._ref);
        content = url ? (
            <div className="relative w-full h-full">
                <video
                    src={url}
                    controls={false}
                    preload="metadata"
                    className="w-full h-full aspect-video absolute inset-0 object-contain"
                    autoPlay
                    loop
                    muted
                    playsInline
                    // Improve performance by informing the browser about content type
                    typeof="video/mp4"
                    // Add poster attribute if you have a thumbnail
                    poster={`${image?.asset?._ref && (await getSanityImageUrl(image?.asset?._ref as string))}`}
                />
            </div>
        ) : (
            <p className="text-red-500" role="alert">Uploaded video not found</p>
        );
    } else if (mediaType === 'videoEmbed' && videoUrl) {
        content = (
            <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
                <iframe
                    src={getEmbedUrl(videoUrl)}
                    title="Embedded video"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    className="w-full h-full"
                    loading="lazy"
                />
            </div>
        );
    } else if (mediaType === 'image' && image?.asset?._ref) {
        const imageUrl = await getSanityImageUrl(image.asset._ref);
        content = imageUrl ? (
            <Image
                src={imageUrl}
                alt={image.alt || 'Uploaded image'}
                width={1280}
                height={720}
                className="w-full h-full aspect-video object-cover absolute inset-0"
                priority
            />
        ) : (
            <p className="text-red-500">Image not found</p>
        );
    } else {
        content = <p className="text-gray-500 italic">No media provided</p>;
    }

    return (
        <div className='h-full'>
            {content}
            {/* {caption && <p className="mt-2 text-sm text-center text-gray-500">{caption}</p>} */}
        </div>
    );
};


