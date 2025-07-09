export type CompanyInfo = {
	id: string;
	name: string;
	discount: number;
	product_data_url : string
};

export const Companies: Record<string, CompanyInfo> = {
	ARTE: {
		id: 'ARTE',
		name: 'Artegifts',
		discount: 7,
		product_data_url : 'https://markli.by/bitrix/catalog_export/arte.xml'
	},
	MARKLI: {
		id: 'MARKLI',
		name: 'Markli',
		discount: 7,
		product_data_url : 'https://markli.by/bitrix/catalog_export/markli.xml'
	},
	OASIS: {
		id: 'OASIS',
		name: 'Oasis',
		discount: 7,
		product_data_url : 'https://markli.by/bitrix/catalog_export/oasis.xml'
	},
	HAPPY: {
		id: 'HAPPY',
		name: 'Happy Gifts',
		discount: 7,
		product_data_url : 'https://markli.by/bitrix/catalog_export/happy_gifts.xml'
	},
};
