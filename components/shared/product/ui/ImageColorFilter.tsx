'use client'

import { useRefinementList, UseRefinementListProps } from 'react-instantsearch'
import { Tooltip } from '@heroui/tooltip'
import { cn } from '@/lib/utils'

export interface ImageColorFilterProps extends Omit<UseRefinementListProps, 'attribute'> {
    className?: string
}

/**
 * ImageColorFilter component for filtering products by dominant image colors.
 * Uses Algolia's refinement list to provide a color swatch UI.
 */
export default function ImageColorFilter(props: ImageColorFilterProps) {
    const {
        items,
        refine,
    } = useRefinementList({
        ...props,
        attribute: 'dominantColors',
    })

    if (items.length === 0) return null

    return (
        <div className={cn("flex flex-col gap-2", props.className)}>
            <span className="text-sm font-medium">Цвет на изображении</span>
            <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                    <Tooltip 
                        key={item.label} 
                        content={`${item.label} (${item.count})`}
                        placement="top"
                    >
                        <button
                            onClick={() => refine(item.value)}
                            className={cn(
                                "w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 shadow-sm",
                                item.isRefined ? "border-primary scale-110" : "border-transparent"
                            )}
                            style={{ backgroundColor: item.label }}
                            aria-label={`Filter by color ${item.label}`}
                        />
                    </Tooltip>
                ))}
            </div>
        </div>
    )
}
