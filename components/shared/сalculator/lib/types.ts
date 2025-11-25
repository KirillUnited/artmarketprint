export type PriceCell = {
	printKey: '1+0' | '2+0' | '3+0' | '4+0' | '1+1' | '2+2';
	per100: number;
	per1000: number;
};

export type SizeRef = {
	_id: string;
	id: string;
	name: string;
	multiplier?: number;
};

export type MaterialRef = {
	_id: string;
	id: string;
	name: string;
};

export type MaterialPriceMatrix = {
	_id: string;
	note?: string;
	material: MaterialRef;
	rows: {
		size: SizeRef;
		prices: PriceCell[];
	}[];
};

export type CalculatorWithMatrices = {
	_id: string;
	title: string;
	materials: (MaterialRef & {matrix?: MaterialPriceMatrix | null})[];
};

export interface PriceOption {
	quantity: number; // 100, 150 …
	price: number;
}

export interface PrintOption {
	type: string; // '1+0', '2+0' …
	options: PriceOption[];
}

export interface PackageSize {
	size: string; // '20x30'
	prints: PrintOption[];
}

export type PriceEntry = {
	size: string;
	type: string;
	per100?: number;
	per150?: number;
	per200?: number;
	per250?: number;
	per300?: number;
	per350?: number;
	per400?: number;
	per450?: number;
	per500?: number;
	per550?: number;
	per600?: number;
	per650?: number;
	per700?: number;
	per750?: number;
	per800?: number;
	per850?: number;
	per900?: number;
	per950?: number;
	per1000?: number;
};

export type QuantityTiers = {
	[key: string]: number | undefined;
	'100'?: number;
	'150'?: number;
	'200'?: number;
	'250'?: number;
	'300'?: number;
	'350'?: number;
	'400'?: number;
	'450'?: number;
	'500'?: number;
	'550'?: number;
	'600'?: number;
	'650'?: number;
	'700'?: number;
	'750'?: number;
	'800'?: number;
	'850'?: number;
	'900'?: number;
	'950'?: number;
	'1000'?: number;
	regular: number;
	discounted: number;
};
