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
    availableSizes: string[];  // Array of size IDs
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
        price: 1,
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
        availableSizes: ['20x30', '30x40', '40x50', '50x60', '60x50']
    },
    {
        id: 'flat-handles-kraft',
        name: 'Крафт с плоской ручкой',
        price: 1.61,
        image: '/images/calc/flat-handles-kraft.png',
        availableColors: ['natural', 'white'],
        availableSizes: ['240x140x280', '280x150x320']
    },
    {
        id: 'twisted-handles-kraft',
        name: 'Крафт с крученой ручкой',
        price: 2.1,
        image: '/images/calc/twisted-handles-kraft.png',
        availableColors: [
            'natural',
            'brown',
            'beige',
            'black',
            'white',
            'green',
            'brown',
            'red',
            'gold',
        ],
        availableSizes: ['240x140x280', '280x150x320']
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
            '1+0': { regular: 1, discounted: 0.71 },
            '2+0': { regular: 1.70, discounted: 1.15 },
            '3+0': { regular: 2.20, discounted: 1.45 },
            '4+0': { regular: 2.50, discounted: 1.70 },
            '1+1': { regular: 1.47, discounted: 1.10 },
            '2+2': { regular: 2.85, discounted: 1.69 },
            '3+3': { regular: 3.25, discounted: 2.40 },
            '4+4': { regular: 3.50, discounted: 2.60 },
        },
    },
    {
        size: '30x40',
        prices: {
            '1+0': { regular: 1.31, discounted: 0.96 },
            '2+0': { regular: 2.01, discounted: 1.28 },
            '3+0': { regular: 2.50, discounted: 1.65 },
            '4+0': { regular: 3.25, discounted: 1.95 },
            '1+1': { regular: 1.72, discounted: 1.30 },
            '2+2': { regular: 2.75, discounted: 2.14 },
            '3+3': { regular: 3.40, discounted: 2.50 },
            '4+4': { regular: 3.80, discounted: 2.80 },
        },
    },
    {
        size: '40x50',
        prices: {
            '1+0': { regular: 1.47, discounted: 1.10 },
            '2+0': { regular: 2.14, discounted: 1.50 },
            '3+0': { regular: 2.79, discounted: 1.90 },
            '4+0': { regular: 3.30, discounted: 2.45 },
            '1+1': { regular: 1.85, discounted: 1.57 },
            '2+2': { regular: 3.25, discounted: 2.40 },
            '3+3': { regular: 3.60, discounted: 2.70 },
            '4+4': { regular: 4.00, discounted: 3.00 },
        },
    },
    {
        size: '50x60',
        prices: {
            '1+0': { regular: 1.80, discounted: 1.35 },
            '2+0': { regular: 2.30, discounted: 1.70 },
            '3+0': { regular: 3.00, discounted: 2.20 },
            '4+0': { regular: 3.50, discounted: 2.60 },
            '1+1': { regular: 2.10, discounted: 1.80 },
            '2+2': { regular: 3.50, discounted: 2.60 },
            '3+3': { regular: 3.80, discounted: 2.90 },
            '4+4': { regular: 4.20, discounted: 3.20 },
        },
    },
    {
        size: '60x50',
        prices: {
            '1+0': { regular: 1.80, discounted: 1.35 },
            '2+0': { regular: 2.30, discounted: 1.70 },
            '3+0': { regular: 3.00, discounted: 2.20 },
            '4+0': { regular: 3.50, discounted: 2.60 },
            '1+1': { regular: 2.10, discounted: 1.80 },
            '2+2': { regular: 3.50, discounted: 2.60 },
            '3+3': { regular: 3.80, discounted: 2.90 },
            '4+4': { regular: 4.20, discounted: 3.20 },
        },
    },
];

// Quantity discount thresholds
export const quantityDiscounts = [
    {min: MIN_QUANTITY, discount: 0},
    {min: 1000, discount: 0.3}, // Discount for 1000+ packages
];