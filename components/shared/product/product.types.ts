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
    colors: string[];
    sizes: string[];
    quantity: number;
    items: any
}

export interface Product {
    _id: string;
    id: Array<{ '_': string }>;
    product: Array<{ '_': string }>;
    name: string;
    price: string[];
    image: string;
    images_urls: string[];
    general_description: string[];
    description: string;
    variation_description: string[];
    category: string[];
    colors: string[];
    sizes: string[];
    items: any
}

export interface ColorItemProps {
    id: string;
    color: string;
    cover: string;
}