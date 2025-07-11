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
export const formattedOptions = (options: string) => options?.replace(/<\/?p>/g, '').replace(/<li><strong>Бренд:<\/strong>.*?<\/li>/g, '').replace(/<li><strong>Поставщик:<\/strong>.*?<\/li>/g, '').replace(/<li><strong>Картинки:<\/strong>.*?<\/li>/g, '');
export const getVariantImages = (items: any, selectedColor: string) => {    
    const productImages = (items as any)?.images_urls?.split(',') || [];

    if (!items?.items || !selectedColor) return productImages;

    const selectedVariant = items.items.find((item: any) =>
        item.color === selectedColor
    );

    if (!selectedVariant) return productImages;

    const variantImages = Array.isArray(selectedVariant.images_urls)
        ? selectedVariant.images_urls[0].split(',').filter(Boolean)
        : selectedVariant.images_urls
            ? selectedVariant.images_urls.split(',').filter(Boolean)
            : [];

    return variantImages.length > 0 ? variantImages : productImages;
};

// Calculate stock for the selected color
export const getStockForSelectedColor = (selectedColor: string, items: any) => {
    if (!selectedColor) return null;
    const selectedItem = items.find((item: any) => item.color === selectedColor);

    return selectedItem?.stock ?? null;
};
// Calculate total stock
export const getTotalStock = (items: any[]) => () => {
    return items.reduce((total, item) => total + Number(item.stock), 0);
};