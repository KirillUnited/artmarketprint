// lib/googleSheets.ts
import Papa from 'papaparse';

import {PriceEntry, QuantityTiers} from '@/components/shared/сalculator/lib/types';

export async function fetchPriceData(sheetName: string): Promise<PriceEntry[]> {
	const BASE_URL = 'https://docs.google.com/spreadsheets/d/1cLq4KtBDIr8PVQlzcvf99t1Iw9vUjhx1/gviz/tq?tqx=out:csv';

	const SHEET_URL = `${BASE_URL}&sheet=${encodeURIComponent(sheetName)}`;

	try {
		const response = await fetch(SHEET_URL, {
			next: {revalidate: 3600}, // ISR: Revalidate every hour (Next.js 15+)
		});

		if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

		const csvText = await response.text();

		// Разбираем CSV без header, так как там "широкий" формат
		const parsed = Papa.parse<string[]>(csvText, {
			header: false,
			skipEmptyLines: true,
		});

		if (parsed.errors.length > 0) {
			throw new Error(`CSV Parse Error: ${parsed.errors[0].message}`);
		}

		const rows = parsed.data as string[][];

		// Берем первую строку — размеры и типы печати
		const headerRow = rows[0];
		// Остальные строки — количество и цены
		const qtyRows = rows.slice(1);

		const result: PriceEntry[] = [];

		// Каждые 3 колонки — блок: [size, type, null]
		for (let col = 0; col < headerRow.length; col += 3) {
			const size = headerRow[col];
			const type = headerRow[col + 1];

			if (!size || !type) continue;

			const entry: PriceEntry = {size, type};

			for (const row of qtyRows) {
				const qtyLabel = row[col]; // '100шт', '150шт'...
				const priceStr = row[col + 1];
				const price = priceStr ? parseFloat(priceStr.replace(',', '.')) : NaN;

				if (!Number.isFinite(price)) continue;

				switch (qtyLabel) {
					case '100шт':
						entry.per100 = price;
						break;
					case '150шт':
						entry.per150 = price;
						break;
					case '200шт':
						entry.per200 = price;
						break;
					case '250шт':
						entry.per250 = price;
						break;
					case '300шт':
						entry.per300 = price;
						break;
					case '350шт':
						entry.per350 = price;
						break;
					case '400шт':
						entry.per400 = price;
						break;
					case '450шт':
						entry.per450 = price;
						break;
					case '500шт':
						entry.per500 = price;
						break;
					case '550шт':
						entry.per550 = price;
						break;
					case '600шт':
						entry.per600 = price;
						break;
					case '650шт':
						entry.per650 = price;
						break;
					case '700шт':
						entry.per700 = price;
						break;
					case '750шт':
						entry.per750 = price;
						break;
					case '800шт':
						entry.per800 = price;
						break;
					case '850шт':
						entry.per850 = price;
						break;
					case '900шт':
						entry.per900 = price;
						break;
					case '950шт':
						entry.per950 = price;
						break;
					case '1000шт':
						entry.per1000 = price;
						break;
				}
			}

			result.push(entry);
		}

		return result;
	} catch (error) {
		console.error('Google Sheets Fetch Error:', error);

		return [];
	}
}

export function formatPriceTable(dataFromGoogleSheet: PriceEntry[][]) {
	return dataFromGoogleSheet.flatMap((sheetData) => {
		// Group by size
		const groupedBySize = sheetData.reduce(
			(acc, item) => {
				if (!acc[item.size]) {
					acc[item.size] = [];
				}
				acc[item.size].push(item);

				return acc;
			},
			{} as Record<string, typeof sheetData>,
		);

		// Convert to pvdPriceTable format
		return Object.entries(groupedBySize).map(([size, items]) => {
			const prices = items.reduce(
				(acc, item) => {
					// Convert type to the format used in mock data (e.g., "1+0", "2+0", etc.)
					const printType = item.type;

					// Map all quantity tiers
					const quantityTiers = {
						'100': item.per100,
						'150': item.per150,
						'200': item.per200,
						'250': item.per250,
						'300': item.per300,
						'350': item.per350,
						'400': item.per400,
						'450': item.per450,
						'500': item.per500,
						'550': item.per550,
						'600': item.per600,
						'650': item.per650,
						'700': item.per700,
						'750': item.per750,
						'800': item.per800,
						'850': item.per850,
						'900': item.per900,
						'950': item.per950,
						'1000': item.per1000,
					};

					// Calculate regular and discounted prices
					const regularPrice = item.per100 || 0;
					const discountedPrice = item.per1000 || 0; // or calculate based on your discount logic

					return {
						...acc,
						[printType]: {
							...quantityTiers,
							regular: regularPrice,
							discounted: discountedPrice,
						},
					};
				},
				{} as Record<string, QuantityTiers>,
			);

			return {
				size,
				prices,
			};
		});
	});
}

export async function getPriceTable() {
	const dataFromGoogleSheet = await Promise.all([fetchPriceData('20x30'), fetchPriceData('30x40'), fetchPriceData('40x50'), fetchPriceData('50x60')]);

	return formatPriceTable(dataFromGoogleSheet);
}
