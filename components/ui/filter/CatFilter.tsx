'use client';
import { Accordion, AccordionItem } from '@heroui/accordion';
import { Radio, RadioGroup } from '@heroui/radio';
import { ScrollShadow } from '@heroui/scroll-shadow';
import React, {FC} from 'react';

export interface CategoryProps {
    category: string;
    count?: number;
    subcategories?: Array<string | { name: string; count?: number }>;
}

interface CatFilterProps {
    sortOrder: string;
    onFilterChange: (sortOrder: string, category: string) => void;
    categories: CategoryProps[];
    selectedCategory: string
}

/**
 * Component for filtering products by category.
 *
 * @param {CatFilterProps} props - The properties for the CatFilter component.
 * @returns {JSX.Element} The rendered CatFilter component.
 */
export const CatFilter: FC<CatFilterProps> = ({ sortOrder, onFilterChange, categories, selectedCategory }) => {
    const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(new Set());
    
    // Reset accordion state when selectedCategory is cleared
    React.useEffect(() => {
        if (!selectedCategory) {
            setSelectedKeys(new Set());
        }
    }, [selectedCategory]);
    

    return (
        <div className='flex gap-4 w-full'>
            <ScrollShadow hideScrollBar className="w-full max-h-[calc(85vh-128px)] md:max-h-[calc(70vh-128px)]" size={50}>
                <Accordion
                    className="px-0 shadow-small rounded-small bg-content1 overflow-x-hidden"
                    defaultExpandedKeys={categories.length === 1 ? ['0'] : []}
                    itemClasses={{
                        trigger: 'px-3 py-2 hover:bg-primary transition-colors group',
                        title: 'text-black group-hover:text-primary-foreground transition-colors',
                    }}
                    selectedKeys={selectedKeys}
                    selectionMode="single"
                    onSelectionChange={(keys) => setSelectedKeys(keys as Set<string>)}
                >
                    {categories && categories.map(({ category, count, subcategories = [] }: CategoryProps, index: number) => (
                        <AccordionItem
                            key={index}
                            textValue={category}
                            title={
                                <div className="flex justify-between items-center w-full text-sm">
                                    <span>{category}</span>
                                    {count !== undefined && (
                                        <span className="text-xs bg-default-100 text-default-600 rounded-full px-2 py-1">
                                            {count}
                                        </span>
                                    )}
                                </div>
                            }
                        >
                            <RadioGroup classNames={{ base: 'pl-4', label: 'font-semibold text-foreground' }}>
                                <Radio
                                    classNames={{
                                        wrapper: 'mr-1',
                                        label: 'flex items-center justify-between w-full pr-2 text-sm'
                                    }}
                                    value={category}
                                    onChange={(e) => onFilterChange(sortOrder, e.target.value)}
                                >
                                    <span>Все товары</span>
                                </Radio>
                                {subcategories && subcategories.map((subcat) => {
                                    const name = typeof subcat === 'string' ? subcat : subcat.name;
                                    const subCount = typeof subcat === 'object' ? subcat.count : undefined;

                                    return (
                                        <Radio
                                            key={name}
                                            classNames={{
                                                wrapper: 'mr-1',
                                                label: 'w-full pr-2 text-sm'
                                            }}
                                            value={name}
                                            onChange={(e) => onFilterChange(sortOrder, e.target.value)}
                                        >
                                            <span>{name}</span>
                                            {subCount !== undefined && (
                                                <sup className="text-xs text-default-500">({subCount})</sup>
                                            )}
                                        </Radio>
                                    );
                                })}
                            </RadioGroup>
                        </AccordionItem>
                    ))}
                </Accordion>
            </ScrollShadow>

        </div>
    );
};