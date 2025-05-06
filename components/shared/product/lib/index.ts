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