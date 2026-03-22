import { Select, SelectItem } from '@heroui/select';
import {JSX} from 'react';

/**
 * Component for sorting products by price.
 *
 * @param {Object} props - The properties for the SortFilter component.
 * @param {string} props.sortOrder - The current sort order.
 * @param {string} props.selectedCategory - The currently selected category.
 * @param {Function} props.onFilterChange - Callback function to handle filter changes.
 * @returns {JSX.Element} The rendered SortFilter component.
 */
export const SortFilter: ({sortOrder, selectedCategory, onFilterChange}: {
    sortOrder: any;
    selectedCategory: any;
    onFilterChange: any
}) => JSX.Element = ({ sortOrder, selectedCategory, onFilterChange }) => {
    return (
        <Select defaultSelectedKeys={[sortOrder]} label="Цены" placeholder="Цены" radius="sm" size="sm" onChange={(e) => onFilterChange(e.target.value, selectedCategory)}>
            <SelectItem key={'desc'} textValue="По убыванию">По убыванию</SelectItem>
            <SelectItem key={'asc'} textValue="По возрастанию">По возрастанию</SelectItem>
        </Select>
    );
};