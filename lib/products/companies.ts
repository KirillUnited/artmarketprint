export type CompanyInfo = {
	id: string;
	name: string;
	abbr: string;
	discount: number;
	product_data_url: string;
};

export const Companies: Record<string, CompanyInfo> = {
	ARTE: {
		id: 'ARTE',
		name: 'Artegifts',
		abbr: 'AG',
		discount: 7,
		product_data_url: 'https://markli.by/bitrix/catalog_export/arte.xml',
	},
	OASIS: {
		id: 'OASIS',
		name: 'Oasis',
		abbr: 'OAS',
		discount: 7,
		product_data_url: 'https://markli.by/bitrix/catalog_export/oasis.xml',
	},
	HAPPY: {
		id: 'HAPPY',
		name: 'Happy Gifts',
		abbr: 'HG',
		discount: 7,
		product_data_url: 'https://markli.by/bitrix/catalog_export/happy_gifts.xml',
	},
	MARKLI: {
		id: 'MARKLI',
		name: 'Markli',
		abbr: 'MRK',
		discount: 7,
		product_data_url: 'https://markli.by/bitrix/catalog_export/markli.xml',
	},
};

export const CURRENCIES: Record<string, string> = {
	by: 'BYN',
	ru: 'RUB',
};

export const CURRENCIES_NAMES: Record<string, string> = {
	BYN: 'Белорусские рубли',
	RUB: 'Рубли',
};

export const CURRENCIES_SYMBOLS: Record<string, string> = {
	BYN: 'Br',
	RUB: '₽',
};

export const CURRENCIES_EXCHANGE_RATES: Record<string, number> = {
	BYN: 1,
	RUB: 27.55,
};
