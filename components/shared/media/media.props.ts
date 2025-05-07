export type MediaType = 'image' | 'videoUpload' | 'videoEmbed';

export type MediaBlockProps = {
    mediaType: MediaType;
    image?: {
        asset: {
            _ref: string;
        };
        alt?: string;
    };
    videoFile?: {
        asset: {
            _ref: string;
        };
    };
    videoUrl?: string;
    caption?: string;
};