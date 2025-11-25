// Helper functions to get available options
import {Color, colors, materials, Size, sizes} from '@/components/shared/сalculator/mock-data';
import {QuantityTiers} from '@/components/shared/сalculator/lib/types';

const getAvailableColors = (materialId: string): Color[] => {
	const material = materials.find((m) => m.id === materialId);

	if (!material) return [];

	return colors.filter((color) => material.availableColors.includes(color.id));
};

const getAvailableSizes = (materialId: string): Size[] => {
	const material = materials.find((m) => m.id === materialId);

	if (!material) return [];

	return sizes.filter((size) => material.availableSizes.includes(size.id));
};

const calculatePVDPrice = (priceTable: any, selectedSize: Size, selectedPrint: any, quantity: any) => {
	const priceEntry = priceTable.find((entry: any) => {
		return entry.size === selectedSize.id;
	});
	let pricePerBagValue = 0;

	if (priceEntry && priceEntry.prices[selectedPrint.id]) {
		const quantityTiers = priceEntry.prices[selectedPrint.id];

		// Find the appropriate price based on quantity
		const quantityKey = Object.keys(quantityTiers)
			.filter((key) => key !== 'regular' && key !== 'discounted' && quantityTiers[key as keyof QuantityTiers] !== undefined)
			.sort((a, b) => parseInt(a) - parseInt(b))
			.find((key) => quantity <= parseInt(key) || key === '1000');

		if (quantityKey) {
			pricePerBagValue = quantityTiers[quantityKey as keyof QuantityTiers] || 0;
		} else {
			// Fallback to regular price if no matching tier found
			pricePerBagValue = quantityTiers.regular || 0;
		}
	}

	return pricePerBagValue;
};

export {getAvailableColors, getAvailableSizes, calculatePVDPrice};
