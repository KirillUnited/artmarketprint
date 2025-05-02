export interface ProductData {
    _id: string;
    id: string;
    name: string;
    price: number;
    image: string;
    images_urls: string;
    description: string;
    variation_description: string;
    category: string;
    quantity: number;
}

export interface Product {
    id: Array<{ '_': string }>;
    product: Array<{ '_': string }>;
    price: string[];
    images_urls: string[];
    general_description: string[];
    variation_description: string[];
    category: string[];
}