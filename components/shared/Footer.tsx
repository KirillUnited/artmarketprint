import React from 'react'

import BrandLogo from '../ui/BrandLogo'

export default function Footer() {
    return (
        <footer
            className="bg-foreground"
        >
            <div className="container">
                <div
                    className="flex flex-row gap-16 items-start justify-start self-stretch shrink-0 relative py-10 md:py-20"
                >
                    <div
                        className="flex flex-col gap-8"
                    >
                        <div className='self-start'><BrandLogo alt="ArtMarketPrint"/></div>
                        <div
                            className="flex flex-col gap-6"
                        >
                            <div
                                className="flex flex-col gap-1"
                            >
                                <div
                                    className="text-[#eeeeee] text-text-small-semi-bold-font-size leading-text-small-semi-bold-line-height font-text-small-semi-bold-font-weight relative self-stretch"
                                >
                                    Address:
                                </div>
                                <div
                                    className="text-[#eeeeee] text-left font-text-small-normal-font-family text-text-small-normal-font-size leading-text-small-normal-line-height font-text-small-normal-font-weight relative self-stretch"
                                >
                                    Level 1, 12 Sample St, Sydney NSW 2000
                                </div>
                            </div>
                            <div
                                className="flex flex-col gap-1 items-start justify-start self-stretch shrink-0 relative"
                            >
                                <div
                                    className="text-[#eeeeee] text-left font-text-small-semi-bold-font-family text-text-small-semi-bold-font-size leading-text-small-semi-bold-line-height font-text-small-semi-bold-font-weight relative self-stretch"
                                >
                                    Contact:
                                </div>
                                <div
                                    className="flex flex-col gap-0 items-start justify-start self-stretch shrink-0 relative"
                                >
                                    <div
                                        className="text-[#eeeeee] text-left font-text-small-link-font-family text-text-small-link-font-size leading-text-small-link-line-height font-text-small-link-font-weight relative self-stretch"
                                    >
                                        1800 123 4567
                                    </div>
                                    <div
                                        className="text-[#eeeeee] text-left font-text-small-link-font-family text-text-small-link-font-size leading-text-small-link-line-height font-text-small-link-font-weight relative self-stretch"
                                    >
                                        info@artmarketprint.com
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
            <div
                className="flex flex-col gap-8 items-start justify-start self-stretch shrink-0 relative"
            >
                <div
                    className="bg-[#eeeeee] border-solid border-[#eeeeee] border self-stretch shrink-0 h-px relative"
                 />
                <div
                    className="flex flex-row items-start justify-between self-stretch shrink-0 relative"
                >
                    <div
                        className="text-[#eeeeee] text-left font-text-small-normal-font-family text-text-small-normal-font-size leading-text-small-normal-line-height font-text-small-normal-font-weight relative"
                    >
                        © 2025. Все права защищены.
                    </div>
                </div>
            </div>А
            </div>
        </footer>

    )
}
