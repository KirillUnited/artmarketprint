// Helper functions to get available options
import {Color, colors, materials, Size, sizes} from "@/components/shared/сalculator/mock-data";

const getAvailableColors = (materialId: string): Color[] => {
    const material = materials.find(m => m.id === materialId);
    if (!material) return [];
    return colors.filter(color => material.availableColors.includes(color.id));
};

const getAvailableSizes = (materialId: string): Size[] => {
    const material = materials.find(m => m.id === materialId);
    if (!material) return [];
    return sizes.filter(size => material.availableSizes.includes(size.id));
};

export { getAvailableColors, getAvailableSizes };