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