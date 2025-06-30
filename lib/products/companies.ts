export type CompanyInfo = {
	name: string;
	discount: number;
	product_data_url : string
};

export const Companies: Record<string, CompanyInfo> = {
	ARTE: {
		name: 'Artegifts',
		discount: 7,
		product_data_url : 'https://markli.by/bitrix/catalog_export/arte.xml'
	},
	MARKLI: {
		name: 'Markli',
		discount: 7,
		product_data_url : 'https://markli.by/bitrix/catalog_export/markli.xml'
	},
	OASIS: {
		name: 'Oasis',
		discount: 7,
		product_data_url : 'https://markli.by/bitrix/catalog_export/oasis.xml'
	},
	HAPPY: {
		name: 'Happy Gifts',
		discount: 7,
		product_data_url : 'https://markli.by/bitrix/catalog_export/happy_gifts.xml'
	},
};
