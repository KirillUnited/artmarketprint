export interface ProductData {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export interface Product {
    id: Array<{ '_': string }>;
    product: Array<{ '_': string }>;
    price: string[];
}