'use client';

import React from 'react';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, getKeyValue } from '@heroui/table';
import { Spinner } from '@heroui/spinner';
import { Alert } from '@heroui/alert';

import { PriceTableProps, TableRowProps } from './table.props';
import { createColumns, transformPriceData } from './lib';

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
				isStriped
				aria-label="Price table with dynamic content"
				className='border border-gray-300 rounded-small'
				radius='sm'
			>
				<TableHeader className='rounded-small' columns={columns}>
					{(column) => (
						<TableColumn
							key={column.key}
							className='font-bold uppercase'
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
							key={(item as TableRowProps).key}
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
				<Alert className='border border-primary-300 shadow-md text-pretty' color="primary" icon="warning" radius='sm'>
					<ul className='text-sm mt-0'>
						{items.additionalNotes.map((note: string, index: number) => (
							<li key={index}>
								<span>{note}</span>
							</li>
						))}
					</ul>
				</Alert>
			)}
		</div>
	);
}
