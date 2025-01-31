import { ButtonProps } from '@heroui/button';
import { SVGProps } from 'react';

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
};

export interface BrandCardProps extends React.AllHTMLAttributes<HTMLDivElement> {
  title: string;
  price?: string;
  description?: string;
  image?: string;
  href?: string;
  variant?: string;
}

export interface ServiceDetailsProps {
  name: string,
  description?: string,
  image?: string,
  advantages?: string[],
  price?: string
}

export interface CatalogDataProps {
  services: ServiceDetailsProps[];
}