'use client';
import React from 'react';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, getKeyValue } from '@heroui/table';
import { Spinner } from '@heroui/spinner';

const transformPriceData = (items: any) => {
	const rows = items.quantities.map((quantity: string, index: number) => {
		const row: any = {
			key: quantity,
			quantity: quantity
		};

		// Add prices for each color option
		items.colorPrices.forEach((colorPrice: any) => {
			row[colorPrice.colors] = colorPrice.prices[index];
		});

		return row;
	});

	return rows;
};

const createColumns = (items: any) => {
	const columns = [
		{
			key: "quantity",
			label: "Тираж"
		}
	];

	// Add column for each color option
	items.colorPrices.forEach((colorPrice: any) => {
		columns.push({
			key: colorPrice.colors,
			label: colorPrice.colors
		});
	});

	return columns;
};

export default function PriceTable({ items }: any) {
	if (!items.colorPrices || items.colorPrices.length === 0) {
		return null;
	}

	// Transform the data into a format suitable for the Table component
	const rows = transformPriceData(items);
	const columns = createColumns(items);

	return (
		<div className='flex flex-col gap-4'>
			<p className='font-bold text-gray-900'>Цена за ед.в Бел.Рублях</p>
			<Table aria-label="Example table with dynamic content" radius='sm' isStriped>
				<TableHeader columns={columns}>
					{(column: any) => <TableColumn className='font-bold uppercase' key={column.key}>{column.label}</TableColumn>}
				</TableHeader>
				<TableBody items={rows} loadingContent={<Spinner label="Loading..." />}>
					{(item) => (
						<TableRow key={(item as { key: string }).key}>
							{(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
						</TableRow>
					)}
				</TableBody>
			</Table>
			{
				(Array.isArray(items.additionalNotes) && items.additionalNotes.length > 0) && (
					<div className="prose max-w-full bg-content2 p-2 border border-gray-300 rounded-small shadow-md">
						<ul className='text-sm'>
							{
								items.additionalNotes.map((item: string, index: number) => (
									<li key={index}>
										<span className="font-bold mr-2">{item}</span>
									</li>
								))
							}
						</ul>
					</div>
				)
			}
		</div>
	);
}
