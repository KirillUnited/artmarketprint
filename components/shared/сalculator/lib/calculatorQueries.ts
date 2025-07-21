// GROQ Query to fetch calculator by ID
import {sanityFetch} from '@/sanity/lib/sanityFetch';

export const getCalculatorByTitleQuery = `
  *[_type == "calculator" && title == $title][0] {
    _id,
    title,
    description,
    "materials": materials[]->{
      _id,
      title,
      name,
      price,
      "image": image.asset->url,
      "availableColors": availableColors[]->{
        _id,
        name,
        value
      },
      "availableSizes": availableSizes[]->{
        _id,
        name,
        multiplier
      }
    },
    "printOptions": printOptions[]->{
      _id,
      id,
      name,
      price
    }
  }
`;

// GROQ Query to fetch all calculators
export const getAllCalculatorsQuery = `
  *[_type == "calculator"] {
    _id,
    title,
    description,
    "materialsCount": count(materials),
    "printOptionsCount": count(printOptions)
  } | order(title asc)
`;

// Type definitions
export interface Color {
	_id: string;
	name: string;
	value: string;
}

export interface Size {
	_id: string;
	name: string;
	multiplier: number;
}

export interface Material {
	_id: string;
	title: string;
	name: string;
	price: number;
	image?: string;
	availableColors: Color[];
	availableSizes: Size[];
}

export interface PrintOption {
	_id: string;
	id: string;
	name: string;
	price: number;
}

export interface CalculatorData {
	_id: string;
	title: string;
	description?: string;
	materials: Material[];
	printOptions: PrintOption[];
}

export interface CalculatorListItem {
	_id: string;
	title: string;
	description?: string;
	materialsCount: number;
	printOptionsCount: number;
}

/**
 * Fetches a single calculator by its ID with all related data
 */
export async function getCalculatorByTitle(title: string): Promise<CalculatorData | null> {
	try {
		const calculator = await sanityFetch({
			query: getCalculatorByTitleQuery,
			params: {
				title,
			},
		});
		return calculator || null;
	} catch (error) {
		console.error('Error fetching calculator:', error);
		return null;
	}
}

/**
 * Fetches all available calculators with basic information
 */
export async function getAllCalculators(): Promise<CalculatorListItem[]> {
	try {
		const calculators = await sanityFetch({query: getAllCalculatorsQuery});
		return calculators || [];
	} catch (error) {
		console.error('Error fetching calculators:', error);
		return [];
	}
}
