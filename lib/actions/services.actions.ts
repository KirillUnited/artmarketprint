'use server';

import fs from 'fs/promises';
import path from 'path';

import { CatalogDataProps} from '@/types';

const DATA_FILE_PATH = path.join(process.cwd(), '_data/index.json');

export async function getCatalogData(): Promise<CatalogDataProps> {
	try {
		const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');

		return JSON.parse(fileContent) as CatalogDataProps;
	} catch (error) {
		console.error('Error reading JSON file:', error);
		throw new Error('Failed to load printing services data');
	}
}
