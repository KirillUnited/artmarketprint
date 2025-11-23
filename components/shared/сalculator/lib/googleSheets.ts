// lib/googleSheets.ts
import Papa from 'papaparse';

export async function fetchPriceData(): Promise<any> {
	const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1cLq4KtBDIr8PVQlzcvf99t1Iw9vUjhx1/gviz/tq?tqx=out:csv&sheet=%D0%9B%D0%B8%D1%81%D1%82%202';

	try {
		const response = await fetch(SHEET_URL, {
			next: {revalidate: 3600}, // ISR: Revalidate every hour (Next.js 15+ cache control)
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch: ${response.statusText}`);
		}

		const csvText = await response.text();

		// Parse CSV with PapaParse
		const parsed = Papa.parse<any>(csvText, {
			header: true, // Use first row as headers (if present; otherwise, customize keys)
			dynamicTyping: true, // Auto-convert numbers/booleans
			skipEmptyLines: true,
		});

		if (parsed.errors.length > 0) {
			throw new Error(`CSV Parse Error: ${parsed.errors[0].message}`);
		}

		return parsed.data;
	} catch (error) {
		console.error('Google Sheets Fetch Error:', error);

		return []; // Fallback to empty array or mock data
	}
}
