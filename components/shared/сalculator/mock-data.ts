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
    {id: 'small', name: 'Маленький (20x10x30 см)', multiplier: 1},
    {id: 'medium', name: 'Средний (30x15x40 см)', multiplier: 1.3},
    {id: 'large', name: 'Большой (40x20x50 см)', multiplier: 1.7},
    {id: '240x140x280', name: '240x140x280', multiplier: 1.7},
    {id: '280x150x320', name: '280x150x320', multiplier: 1.7},
];

export const materials: Material[] = [
    {
        id: 'pvd',
        name: 'ПВД',
        price: 1.56,
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
        availableSizes: ['small', 'medium', 'large']
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
    {id: '1-0', name: '1+0 (Одна краска с одной стороны)', multiplier: 1},
    {id: '1-1', name: '1+1 (Одна краска с двух сторон)', multiplier: 1.5},
    {id: '2-0', name: '2+0 (Две краски с одной стороны)', multiplier: 1.8},
    {id: '2-2', name: '2+2 (Две краски с двух сторон)', multiplier: 2.2},
];

export const quantityDiscounts = [
    {min: MIN_QUANTITY, discount: DISCOUNT_PERCENTAGE / 100},
    {min: 2000, discount: 0.05},
    {min: 5000, discount: 0.1},
    {min: 10000, discount: 0.15},
];