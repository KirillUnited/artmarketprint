// Mock data - in a real app, this would come from Sanity
export const MIN_QUANTITY = 50;
export const DISCOUNT_PERCENTAGE = 5;
export const materials = [
    {id: 'pvd', name: 'ПВД', price: 1.56, image: '/images/calc/dark-blue.png'},
    {id: 'flat-handles-kraft', name: 'Крафт с плоской ручкой', price: 1.61, image: '/images/calc/flat-handles-kraft.png'},
    {id: 'twisted-handles-kraft', name: 'Крафт с крученой ручкой', price: 2.1, image: '/images/calc/twisted-handles-kraft.png'},
];

export const colors = [
    {id: 'natural', name: 'Натуральный', value: '#D2B48C'},
    {id: 'white', name: 'Белый', value: '#FFFFFF'},
    {id: 'black', name: 'Черный', value: '#000000'},
    {id: 'brown', name: 'Коричневый', value: '#8B4513'},
];

export const sizes = [
    {id: 'small', name: 'Маленький (20x10x30 см)', multiplier: 1},
    {id: 'medium', name: 'Средний (30x15x40 см)', multiplier: 1.3},
    {id: 'large', name: 'Большой (40x20x50 см)', multiplier: 1.7},
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