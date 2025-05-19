import { ColorItemProps } from "../product.types";

export const filterItemsByColor = (items: ColorItemProps[]): ColorItemProps[] => {
    const uniqueColors = new Set<string>();
    return items.filter(item => {
        if (uniqueColors.has(item.color)) {
            return false;
        } else {
            uniqueColors.add(item.color);
            return true;
        }
    });
};
export const formattedOptions = (options: string) => options?.replace(/<\/?p>/g, '').replace(/<li>Цвет:.*?<\/li>/g, '').replace(/<li>Размер товара:.*?<\/li>/g, '');
export const getVariantImages = (items: any, selectedColor: string) => {    
    const productImages = (items as any)?.images_urls?.split(',') || [];

    if (!items?.items || !selectedColor) return productImages;

    const selectedVariant = items.items.find((item: any) =>
        item.color === selectedColor
    );

    if (!selectedVariant) return productImages;

    const variantImages = [
        ...(selectedVariant.images_urls[0].split(',') || [])
    ].filter(Boolean);

    return variantImages.length > 0 ? variantImages : productImages;
};