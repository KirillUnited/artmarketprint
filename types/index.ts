import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface LogoIconProps extends React.AllHTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
  alt: string;
}