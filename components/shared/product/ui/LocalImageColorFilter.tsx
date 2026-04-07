'use client'

import { Tooltip } from '@heroui/react'
import { cn } from '@/lib/utils'
import { useMemo } from 'react'

export interface LocalImageColorFilterProps {
    products: any[]
    selectedColor: string
    onColorSelect: (color: string) => void
    className?: string
}

/**
 * LocalImageColorFilter component for filtering products by dominant image colors.
 * Used in the main catalog where filtering is done locally.
 */
export default function LocalImageColorFilter({ 
    products, 
    selectedColor, 
    onColorSelect, 
    className 
}: LocalImageColorFilterProps) {
    // Extract unique dominant colors from all products
    const colorCounts = useMemo(() => {
        const counts: Record<string, number> = {}
        products.forEach(product => {
            if (product.imagePalette) {
                const colors = Object.values(product.imagePalette)
                    .filter((c: any) => c && c.background)
                    .map((c: any) => c.background.toUpperCase())
                
                // Use a set to count each color only once per product
                const uniqueProductColors = new Set(colors)
                uniqueProductColors.forEach(color => {
                    counts[color] = (counts[color] || 0) + 1
                })
            }
        })
        return counts
    }, [products])

    const sortedColors = useMemo(() => {
        return Object.entries(colorCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 15) // Limit to top 15 colors
    }, [colorCounts])

    if (sortedColors.length === 0) return null

    return (
        <div className={cn("flex flex-col gap-2", className)}>
            <span className="text-sm font-medium">Цвет на изображении</span>
            <div className="flex flex-wrap gap-2">
                {sortedColors.map(([color, count]) => (
                    <Tooltip 
                        key={color} 
                        content={`${color} (${count})`}
                        placement="top"
                    >
                        <button
                            onClick={() => onColorSelect(selectedColor === color ? '' : color)}
                            className={cn(
                                "w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 shadow-sm",
                                selectedColor === color ? "border-primary scale-110" : "border-transparent"
                            )}
                            style={{ backgroundColor: color }}
                            aria-label={`Filter by color ${color}`}
                        />
                    </Tooltip>
                ))}
            </div>
        </div>
    )
}
