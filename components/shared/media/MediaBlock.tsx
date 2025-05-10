import React from 'react';
import Image from 'next/image';
import { getEmbedUrl, getSanityFileUrl, getSanityImageUrl } from '@/sanity/lib/utils';
import { MediaBlockProps } from './media.props';
import { VideoPlayer } from './VideoPlayer';

export const MediaBlock: React.FC<MediaBlockProps> = async ({
    mediaType,
    image,
    videoFile,
    videoUrl,
    caption,
}) => {
    let content;

    const mediaHandlers = {
        async videoUpload() {
            if (!videoFile?.asset?._ref) return null;
            
            const url = await getSanityFileUrl(videoFile.asset._ref);
            const posterUrl = image?.asset?._ref ? 
                (await getSanityImageUrl(image.asset._ref) as string) : 
                undefined;

            return url ? (
                <div className="relative w-full h-full">
                    {/* Background blurred video for visual effect */}
                    {/* <VideoPlayer
                        url={url}
                        posterUrl={posterUrl}
                        className="w-full h-full aspect-video absolute inset-0 object-cover blur"
                    /> */}
                    {/* Main video player */}
                    <VideoPlayer
                        url={url}
                        posterUrl={posterUrl}
                        className="w-full h-full aspect-video absolute inset-0 object-contain"
                    />
                </div>
            ) : (
                <p className="text-red-500" role="alert">Uploaded video not found</p>
            );
        },
        
        videoEmbed() {
            if (!videoUrl) return null;
            
            return (
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
        },

        async image() {
            if (!image?.asset?._ref) return null;
            
            const imageUrl = await getSanityImageUrl(image.asset._ref);
            return imageUrl ? (
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
        }
    };

    content = await mediaHandlers[mediaType]?.() || <p className="text-gray-500 italic">No media provided</p>;

    return (
        <div className='h-full'>
            {content}
            {/* {caption && <p className="mt-2 text-sm text-center text-gray-500">{caption}</p>} */}
        </div>
    );
};


