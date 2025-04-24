import { ColorPriceProps, PriceTableProps, TableRowProps } from "../table.props";

/**
 * Transforms raw price data into table row format
 * @param items - Price data including quantities and color prices
 * @returns Array of formatted table rows
 */
export const transformPriceData = (items: PriceTableProps): TableRowProps[] => {
    return items.quantities.map((quantity: string, index: number) => {
        const row: TableRowProps = {
            key: quantity,
            quantity: quantity
        };

        // Add prices for each color option
        items.colorPrices.forEach((colorPrice: ColorPriceProps) => {
            row[colorPrice.colors] = colorPrice.prices[index];
        });

        return row;
    });
};

/**
 * Creates column definitions for the price table
 * @param items - Price data including color prices
 * @returns Array of column definitions
 */
export const createColumns = (items: PriceTableProps) => {
    const baseColumns = [
        {
            key: "quantity",
            label: "Тираж"
        }
    ];

    // Add column for each color option
    const colorColumns = items.colorPrices.map((colorPrice) => ({
        key: colorPrice.colors,
        label: colorPrice.colors
    }));

    return [...baseColumns, ...colorColumns];
};