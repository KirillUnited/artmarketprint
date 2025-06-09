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
            <Accordion selectionMode="multiple" itemClasses={{ trigger: 'py-2' }}>
                {
                    categories && categories.map(({ category, subcategories }: CategoryProps) => (
                        <AccordionItem key={category} title={category}>
                            <RadioGroup classNames={{ label: 'font-semibold text-foreground' }}>
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