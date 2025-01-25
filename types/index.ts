import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface LogoIconProps extends React.AllHTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
  alt: string;
}

export type BrandButtonProps = {
  state?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined | null;
  children: React.ReactNode;
};