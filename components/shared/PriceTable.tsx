'use client';
import React from 'react';
import {Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, getKeyValue} from '@heroui/table';
import {Spinner} from '@heroui/spinner';

const list = {
	items: [
		{
			name: 'Luke Skywalker',
			height: '172',
			mass: '77',
			birth_year: '19BBY',
		},
		{
			name: 'C-3PO',
			height: '167',
			mass: '75',
			birth_year: '112BBY',
		},
		{
			name: 'R2-D2',
			height: '96',
			mass: '32',
			birth_year: '33BBY',
		},
	],
}

export default function PriceTable() {
	return (
		<Table
			aria-label="Example table with client side sorting"
			classNames={{
				table: '',
			}}
		>
			<TableHeader>
				<TableColumn key="name">
					Name
				</TableColumn>
				<TableColumn key="height">
					Height
				</TableColumn>
				<TableColumn key="mass">
					Mass
				</TableColumn>
				<TableColumn key="birth_year">
					Birth year
				</TableColumn>
			</TableHeader>
			<TableBody items={list.items} loadingContent={<Spinner label="Loading..." />}>
				{(item) => <TableRow key={item.name}>{(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}</TableRow>}
			</TableBody>
		</Table>
	);
}
