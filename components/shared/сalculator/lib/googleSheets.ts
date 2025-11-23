// lib/googleSheets.ts
import Papa from 'papaparse';

import {PriceEntry} from '@/components/shared/сalculator/lib/types';

export async function fetchPriceData(): Promise<PriceEntry[]> {
	const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1cLq4KtBDIr8PVQlzcvf99t1Iw9vUjhx1/gviz/tq?tqx=out:csv&sheet=%D0%9B%D0%B8%D1%81%D1%82%202';

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
