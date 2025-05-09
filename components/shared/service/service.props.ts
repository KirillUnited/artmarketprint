import { MediaBlockProps } from "@/components/shared/media/media.props";

export type ServiceHeroProps = {
    title: string;
    description: string;
    mediaBlock?: MediaBlockProps;
    image?: string;
};