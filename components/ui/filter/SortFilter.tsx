import { Radio, RadioGroup } from "@heroui/radio";
import { FC } from "react";

/**
 * Component for sorting products by price.
 *
 * @param {Object} props - The properties for the SortFilter component.
 * @param {string} props.sortOrder - The current sort order.
 * @param {string} props.selectedCategory - The currently selected category.
 * @param {Function} props.onFilterChange - Callback function to handle filter changes.
 * @returns {JSX.Element} The rendered SortFilter component.
 */
export const SortFilter: FC<{
    sortOrder: string;
    selectedCategory: string;
    onFilterChange: (sortOrder: string, category: string) => void;
}> = ({ sortOrder, selectedCategory, onFilterChange }) => {
    return (
        <div className='flex gap-4'>
            <RadioGroup
                classNames={{ label: 'font-semibold text-foreground' }}
                label='Цены'
                title='Цены'
            >
                {/* Radio button for descending order */}
                <Radio
                    value="desc"
                    onChange={(e) => onFilterChange(e.target.value, selectedCategory)}
                >
                    По убыванию
                </Radio>
                {/* Radio button for ascending order */}
                <Radio
                    value="asc"
                    onChange={(e) => onFilterChange(e.target.value, selectedCategory)}
                >
                    По возрастанию
                </Radio>
            </RadioGroup>
        </div>
    );
};