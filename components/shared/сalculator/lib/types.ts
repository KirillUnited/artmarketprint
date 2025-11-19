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
