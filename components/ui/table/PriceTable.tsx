'use client';

import React from 'react';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, getKeyValue } from '@heroui/table';
import { Spinner } from '@heroui/spinner';

// Define TypeScript interfaces for better type safety
interface ColorPrice {
	colors: string;
	prices: number[];
}

interface PriceTableProps {
	quantities: string[];
	colorPrices: ColorPrice[];
	additionalNotes?: string[];
}

interface TableRow {
	key: string;
	quantity: string;
	[key: string]: string | number; // Allow dynamic color price columns
}

/**
 * Transforms raw price data into table row format
 * @param items - Price data including quantities and color prices
 * @returns Array of formatted table rows
 */
const transformPriceData = (items: PriceTableProps): TableRow[] => {
	return items.quantities.map((quantity: string, index: number) => {
		const row: TableRow = {
			key: quantity,
			quantity: quantity
		};

		// Add prices for each color option
		items.colorPrices.forEach((colorPrice: ColorPrice) => {
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
const createColumns = (items: PriceTableProps) => {
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

/**
 * PriceTable component displays pricing information in a tabular format
 * with support for multiple color options and additional notes
 */
export default function PriceTable({ items }: { items: PriceTableProps }) {
	// Return null if no color prices are available
	if (!items.colorPrices?.length) {
		return null;
	}

	const rows = transformPriceData(items);
	const columns = createColumns(items);

	return (
		<div className='flex flex-col gap-4'>
			<p className='font-bold text-gray-900'>Цена за единицу в белорусских рублях</p>

			<Table
				aria-label="Price table with dynamic content"
				radius='sm'
				isStriped
			>
				<TableHeader columns={columns} className='rounded-small'>
					{(column) => (
						<TableColumn
							className='font-bold uppercase'
							key={column.key}
						>
							{column.label}
						</TableColumn>
					)}
				</TableHeader>

				<TableBody
					items={rows}
					loadingContent={<Spinner label="Loading..." />}
				>
					{(item) => (
						<TableRow
							key={(item as TableRow).key}
							className='rounded-small'
						>
							{(columnKey) => (
								<TableCell>
									{getKeyValue(item, columnKey)}
								</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>

			{/* Render additional notes if available */}
			{(Array.isArray(items.additionalNotes) && items.additionalNotes?.length > 0) && (
				<div className="prose max-w-full bg-content2 p-2 border border-gray-300 rounded-small shadow-md">
					<ul className='text-sm'>
						{items.additionalNotes.map((note: string, index: number) => (
							<li key={index}>
								<span className="font-bold mr-2">{note}</span>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
