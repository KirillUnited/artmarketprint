import { Radio, RadioGroup } from "@heroui/radio";
import { Select, SelectItem } from "@heroui/select";
import {FC, JSX} from "react";

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
        <Select size="sm" radius="sm" label="Цены" placeholder="Цены" defaultSelectedKeys={[sortOrder]} onChange={(e) => onFilterChange(e.target.value, selectedCategory)}>
            <SelectItem textValue="По убыванию" key={"desc"}>По убыванию</SelectItem>
            <SelectItem textValue="По возрастанию" key={"asc"}>По возрастанию</SelectItem>
        </Select>
    );
};