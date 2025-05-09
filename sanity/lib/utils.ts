import { client } from "@/sanity/client";

// 🔧 Util: Convert Sanity ref to video URL
export async function getSanityFileUrl(ref: string): Promise<string | null> {
    const asset = await client.fetch(`*[_type == "sanity.fileAsset" && _id == $id][0]`, {
        id: ref,
    });
    return asset?.url || null;
}

// 🔧 Util: Convert Sanity ref to image URL
export async function getSanityImageUrl(ref: string): Promise<string | null> {
    const asset = await client.fetch(`*[_type == "sanity.imageAsset" && _id == $id][0]`, {
        id: ref,
    });
    return asset?.url || null;
}

// 🔧 Util: Normalize YouTube/Vimeo embed URL
export function getEmbedUrl(url: string): string {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
        return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('vimeo.com')) {
        const videoId = url.split('/').pop();
        return `https://player.vimeo.com/video/${videoId}`;
    }
    return url; // Fallback
}