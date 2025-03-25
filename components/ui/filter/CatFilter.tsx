import { Radio, RadioGroup } from "@heroui/radio";
import { FC } from "react";

interface CatFilterProps {
    sortOrder: string;
    onFilterChange: (sortOrder: string, category: string) => void;
    categories: string[];
}

/**
 * Component for filtering products by category.
 *
 * @param {CatFilterProps} props - The properties for the CatFilter component.
 * @returns {JSX.Element} The rendered CatFilter component.
 */
export const CatFilter: FC<CatFilterProps> = ({ sortOrder, onFilterChange, categories }) => {
    return (
        <div className='flex gap-4 flex-1'>
            <RadioGroup classNames={{ label: 'font-semibold text-foreground' }} label='Фильтр по категориям' title='Фильтр по категориям'>
                {
                    categories ? categories.map((category: string) => (
                        <Radio key={category} value={category} onChange={(e) => onFilterChange(sortOrder, e.target.value)}>
                            {category}
                        </Radio>
                    )) : <p className="text-sm">Категории не найдены</p>
            }
            </RadioGroup>
        </div>
    )
};