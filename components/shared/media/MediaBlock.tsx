import React from 'react';
import Image from 'next/image';
import { getEmbedUrl, getSanityFileUrl, getSanityImageUrl } from './lib';
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
            <video
                src={url}
                controls={false}
                preload="metadata"
                className="w-full h-full aspect-video absolute inset-0"
                autoPlay
                loop
                muted
                playsInline
                style={{ objectFit: 'cover' }}
            />
        ) : (
            <p className="text-red-500">Uploaded video not found</p>
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
                className="w-full h-auto rounded-xl shadow-lg"
            />
        ) : (
            <p className="text-red-500">Image not found</p>
        );
    } else {
        content = <p className="text-gray-500 italic">No media provided</p>;
    }

    return (
        <div className='max-h-full'>
            {content}
            {/* {caption && <p className="mt-2 text-sm text-center text-gray-500">{caption}</p>} */}
        </div>
    );
};


