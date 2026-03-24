// Helper component for video player to reduce duplication
export const VideoPlayer: React.FC<{
    url: string;
    posterUrl?: string;
    className?: string;
}> = ({ url, posterUrl, className }) => (
    <video
        autoPlay
        loop
        muted
        playsInline
        className={className}
        controls={false}
        poster={posterUrl}
        preload="metadata"
        src={url}
    />
);