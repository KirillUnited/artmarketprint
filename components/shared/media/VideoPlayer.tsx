// Helper component for video player to reduce duplication
export const VideoPlayer: React.FC<{
    url: string;
    posterUrl?: string;
    className?: string;
}> = ({ url, posterUrl, className }) => (
    <video
        src={url}
        controls={false}
        preload="metadata"
        className={className}
        autoPlay
        loop
        muted
        playsInline
        poster={posterUrl}
    />
);