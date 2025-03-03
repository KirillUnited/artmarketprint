import {ButtonProps} from '@heroui/button';
import {SVGProps} from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number;
};

export interface LogoIconProps extends React.AllHTMLAttributes<HTMLDivElement> {
	width?: number;
	height?: number;
	alt: string;
}

export interface BrandButtonProps extends ButtonProps {
	state?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | undefined | null;
	children: React.ReactNode;
}

export interface BrandCardProps {
	title: string;
	variant: 'product' | 'service';
	price?: string;
	description?: string;
	image?: string;
	tags?: { _id: string; title: string }[];
	href: string;
	imageFit?: 'cover' | 'contain';
	className?: string;
}

export interface ServiceDetailsProps {
	slug?: string;
	name: string;
	description?: string;
	image?: string;
	advantages?: string[];
	price?: string;
	children?: React.ReactNode;
}

export interface CategoryDetailsProps {
	slug?: string;
	name: string;
	description?: string;
	image?: string;
	advantages?: string[];
	price?: string;
}

export interface CatalogDataProps {
	services: ServiceDetailsProps[];
	categories: CategoryDetailsProps[];
}

export interface SectionProps extends React.AllHTMLAttributes<HTMLElement> {
	containerFluid?: boolean;
	innerClassname?: string;
}
