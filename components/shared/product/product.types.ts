export interface ProductData {
    _id: string;
    id: string;
    name: string;
    price: number;
    image: string;
    images: string[];
    images_urls: string;
    description: string;
    variation_description: string;
    category: string;
    subcategory: string;
    colors: string[];
    sizes: string[];
    quantity: number;
    items: any;
    stock: string;
    sku: string;
    brand?: string;
}

export interface Product {
    categoryId: string;
    _id: string;
    id: string;
    name: string;
    price: string[];
    image: string;
    images: string[];
    images_urls: string[];
    general_description: string[];
    description: string;
    variation_description: string[];
    category: string[] | string;
    subcategory: string[];
    colors: string[];
    sizes: string[];
    materials: string[];
    items: any;
    stock: string;
    sku: string;
    brand?: string;
}

export interface ColorItemProps {
    id: string;
    color: string;
    cover: string;
    stock?: number;
}