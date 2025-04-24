// Define TypeScript interfaces for better type safety
export interface ColorPriceProps {
    colors: string;
    prices: number[];
}

export interface PriceTableProps {
    quantities: string[];
    colorPrices: ColorPriceProps[];
    additionalNotes?: string[];
}

export interface TableRowProps {
    key: string;
    quantity: string;
    [key: string]: string | number; // Allow dynamic color price columns
}