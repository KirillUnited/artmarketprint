// Mock data - in a real app, this would come from Sanity
export const MIN_QUANTITY: number = 100 as const;
export const DISCOUNT_PERCENTAGE: number = 5 as const;

// Define color and size types for type safety
export type Color = {
	id: string;
	name: string;
	value: string;
};

export type Size = {
	id: string;
	name: string;
	multiplier: number;
};

export type Material = {
	id: string;
	name: string;
	price: number;
	image: string;
	availableColors: string[]; // Array of color IDs
	availableSizes: string[]; // Array of size IDs
};

export const colors: Color[] = [
	{id: 'natural', name: 'Натуральный', value: '#D2B48C'},
	{id: 'white', name: 'Белый', value: '#FFFFFF'},
	{id: 'black', name: 'Черный', value: '#000000'},
	{id: 'brown', name: 'Коричневый', value: '#8B4513'},
	{id: 'beige', name: 'Бежевый', value: '#F5DEB3'},
	{id: 'matte', name: 'Матовый', value: '#808080'},
	{id: 'red', name: 'Красный', value: '#FF0000'},
	{id: 'orange', name: 'Оранжевый', value: '#FFA500'},
	{id: 'yellow', name: 'Жёлтый', value: '#FFFF00'},
	{id: 'green', name: 'Зелёный', value: '#008000'},
	{id: 'dark-green', name: 'Тёмно-зелёный', value: '#2F4F4F'},
	{id: 'blue', name: 'Синий', value: '#0000FF'},
	{id: 'dark-blue', name: 'Тёмно-синий', value: '#03055B'},
	{id: 'purple', name: 'Фиолетовый', value: '#800080'},
	{id: 'pink', name: 'Розовый', value: '#FFC0CB'},
	{id: 'salad', name: 'Салатовый', value: '#C3FDB8'},
	{id: 'silver', name: 'Серебристый', value: '#B1B1B1'},
	{id: 'gold', name: 'Золотистый', value: '#FFD700'},
	{id: 'transparent', name: 'Прозрачный', value: 'transparent'},
];

export const sizes: Size[] = [
	{id: '20x30', name: '20x30 см', multiplier: 1},
	{id: '30x40', name: '30x40 см', multiplier: 1.31},
	{id: '40x50', name: '40x50 см', multiplier: 1.47},
	{id: '50x60', name: '50x60 см', multiplier: 1.8},
	{id: '60x50', name: '60x50 см', multiplier: 1.8},
	{id: '240x140x280', name: '240x140x280', multiplier: 1.7},
	{id: '280x150x320', name: '280x150x320', multiplier: 1.7},
];

export const materials: Material[] = [
	{
		id: 'pvd',
		name: 'ПВД',
		price: 1.1,
		image: '/images/calc/dark-blue.png',
		availableColors: [
			'white',
			'black',
			'blue',
			'red',
			'green',
			'yellow',
			'pink',
			'purple',
			'transparent',
			'matte',
			'dark-blue',
			'dark-green',
			'gold',
			'salad',
			'silver',
			'beige',
			'brown',
			'orange',
			'dark-blue',
		],
		availableSizes: ['20x30', '30x40', '40x50', '50x60', '60x50'],
	},
	{
		id: 'flat-handles-kraft',
		name: 'Крафт с плоской ручкой',
		price: 1.71,
		image: '/images/calc/flat-handles-kraft.png',
		availableColors: ['natural', 'white'],
		availableSizes: ['240x140x280', '280x150x320'],
	},
	{
		id: 'twisted-handles-kraft',
		name: 'Крафт с крученой ручкой',
		price: 2.2,
		image: '/images/calc/twisted-handles-kraft.png',
		availableColors: ['natural', 'brown', 'beige', 'black', 'white', 'green', 'brown', 'red', 'gold'],
		availableSizes: ['240x140x280', '280x150x320'],
	},
];

export const printOptions = [
	{id: '1+0', name: '1+0 (Один цвет с одной стороны)', multiplier: 1},
	{id: '2+0', name: '2+0 (Два цвета с одной стороны)', multiplier: 1.7},
	{id: '3+0', name: '3+0 (Три цвета с одной стороны)', multiplier: 2.2},
	{id: '4+0', name: '4+0 (Четыре цвета с одной стороны)', multiplier: 2.5},
	{id: '1+1', name: '1+1 (Один цвет с двух сторон)', multiplier: 1.47},
	{id: '2+2', name: '2+2 (Два цвета с двух сторон)', multiplier: 2.85},
	{id: '3+3', name: '3+3 (Три цвета с двух сторон)', multiplier: 3.25},
	{id: '4+4', name: '4+4 (Четыре цвета с двух сторон)', multiplier: 3.5},
];

// Define price table type for PVD packages
export type PriceTableEntry = {
	size: string;
	prices: {
		[printOption: string]: {
			regular: number;
			discounted: number;
		};
	};
};

// Price table for PVD packages per 100 packages
export const pvdPriceTable: PriceTableEntry[] = [
	{
		size: '20x30',
		prices: {
			'1+0': {regular: 1.1, discounted: 0.81},
			'2+0': {regular: 1.8, discounted: 1.25},
			'3+0': {regular: 2.3, discounted: 1.55},
			'4+0': {regular: 2.6, discounted: 1.8},
			'1+1': {regular: 1.57, discounted: 1.2},
			'2+2': {regular: 2.95, discounted: 1.79},
			'3+3': {regular: 3.35, discounted: 2.5},
			'4+4': {regular: 3.6, discounted: 2.7},
		},
	},
	{
		size: '30x40',
		prices: {
			'1+0': {regular: 1.41, discounted: 1.06},
			'2+0': {regular: 2.11, discounted: 1.38},
			'3+0': {regular: 2.6, discounted: 1.75},
			'4+0': {regular: 3.35, discounted: 2.05},
			'1+1': {regular: 1.82, discounted: 1.4},
			'2+2': {regular: 2.85, discounted: 2.24},
			'3+3': {regular: 3.5, discounted: 2.6},
			'4+4': {regular: 3.9, discounted: 2.9},
		},
	},
	{
		size: '40x50',
		prices: {
			'1+0': {regular: 1.57, discounted: 1.2},
			'2+0': {regular: 2.24, discounted: 1.6},
			'3+0': {regular: 2.89, discounted: 2.0},
			'4+0': {regular: 3.4, discounted: 2.55},
			'1+1': {regular: 1.95, discounted: 1.67},
			'2+2': {regular: 3.35, discounted: 2.5},
			'3+3': {regular: 3.7, discounted: 2.8},
			'4+4': {regular: 4.1, discounted: 3.1},
		},
	},
	{
		size: '50x60',
		prices: {
			'1+0': {regular: 1.9, discounted: 1.45},
			'2+0': {regular: 2.4, discounted: 1.8},
			'3+0': {regular: 3.1, discounted: 2.3},
			'4+0': {regular: 3.6, discounted: 2.7},
			'1+1': {regular: 2.2, discounted: 1.9},
			'2+2': {regular: 3.6, discounted: 2.7},
			'3+3': {regular: 3.9, discounted: 3.0},
			'4+4': {regular: 4.3, discounted: 3.3},
		},
	},
	{
		size: '60x50',
		prices: {
			'1+0': {regular: 1.9, discounted: 1.45},
			'2+0': {regular: 2.4, discounted: 1.8},
			'3+0': {regular: 3.1, discounted: 2.3},
			'4+0': {regular: 3.6, discounted: 2.7},
			'1+1': {regular: 2.2, discounted: 1.9},
			'2+2': {regular: 3.6, discounted: 2.7},
			'3+3': {regular: 3.9, discounted: 3.0},
			'4+4': {regular: 4.3, discounted: 3.3},
		},
	},
];

// Quantity discount thresholds
export const quantityDiscounts = [
	{min: MIN_QUANTITY, discount: 0},
	{min: 1000, discount: 0.3}, // Discount for 1000+ packages
];
