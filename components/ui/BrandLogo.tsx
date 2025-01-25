import Image from 'next/image'
import React from 'react'

import LogoIcon from '../../public/images/logo.png';

import { LogoIconProps } from '@/types';

export default function BrandLogo({ alt, width = 40, height = 40 }: LogoIconProps): JSX.Element {
    return (
        <div className="flex flex-row gap-4 items-center justify-center">
            <Image alt={alt} className="w-[35px] h-10" height={height} src={LogoIcon} width={width} />
            <span className="hidden lg:block text-base leading-normal font-black bg-brand-gradient text-fill-transparent">ArtMarketPrint</span>
        </div>
    )
}
