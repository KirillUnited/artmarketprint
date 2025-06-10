'use client';
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Radio, RadioGroup } from "@heroui/radio";
import { FC } from "react";

export interface CategoryProps {
    category: string;
    subcategories?: string[];
}
interface CatFilterProps {
    sortOrder: string;
    onFilterChange: (sortOrder: string, category: string) => void;
    categories: CategoryProps[];
}

/**
 * Component for filtering products by category.
 *
 * @param {CatFilterProps} props - The properties for the CatFilter component.
 * @returns {JSX.Element} The rendered CatFilter component.
 */
export const CatFilter: FC<CatFilterProps> = ({ sortOrder, onFilterChange, categories }) => {
    return (
        <div className='flex gap-4 w-full'>
            <Accordion
                className="px-0 overflow-hidden shadow-small rounded-small bg-content1"
                itemClasses={
                    {
                        trigger: 'px-3 py-2 hover:bg-primary transition-colors group',
                        title: 'group-hover:text-primary-foreground transition-colors',
                    }
                }
            >
                {
                    categories && categories.map(({ category, subcategories }: CategoryProps) => (
                        <AccordionItem key={category} title={category}>
                            <RadioGroup classNames={{ base: 'pl-4', label: 'font-semibold text-foreground' }}>
                                <Radio value={category} onChange={(e) => onFilterChange(sortOrder, e.target.value)}>
                                    Все товары
                                </Radio>
                                {
                                    subcategories ? subcategories.map((subcat: string) => (
                                        <Radio key={subcat} value={subcat} onChange={(e) => onFilterChange(sortOrder, e.target.value)}>
                                            {subcat}
                                        </Radio>
                                    )) : null
                                }
                            </RadioGroup>
                        </AccordionItem>
                    ))
                }
            </Accordion>
        </div>
    )
};