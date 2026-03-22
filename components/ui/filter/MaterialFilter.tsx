import { Select, SelectItem } from '@heroui/select';
import { JSX } from 'react';

/**
 * Component for filtering products by material.
 *
 * @param {Object} props - The properties for the MaterialFilter component.
 * @param {string} props.selectedMaterial - The currently selected material.
 * @param {string} props.sortOrder - The current sort order.
 * @param {Array} props.materials - Available materials with their counts.
 * @param {Function} props.onFilterChange - Callback function to handle filter changes.
 * @returns {JSX.Element} The rendered MaterialFilter component.
 */
export const MaterialFilter: ({
  selectedMaterial,
  selectedCategory,
  sortOrder,
  materials,
  onFilterChange
}: {
  selectedMaterial: string;
  selectedCategory: string;
  sortOrder: string;
  materials: any;
  onFilterChange: (sortOrder: string, category: string, material: string) => void;
}) => JSX.Element = ({ selectedMaterial, selectedCategory, sortOrder, materials, onFilterChange }) => {
  return (
    <Select
      label="Материал"
      placeholder="Выберите материал"
      radius="sm"
      selectedKeys={selectedMaterial ? [selectedMaterial] : []}
      size="sm"
      onChange={(e) => onFilterChange(sortOrder, selectedCategory, e.target.value)}
    >
      <SelectItem key="" textValue="Все материалы">
        Все материалы
      </SelectItem>
      {materials?.map((item: { material: string; count: number }) => (
        <SelectItem
          key={item.material}
          className="capitalize"
          textValue={item.material}
          // description={`${item.count} шт.`}
        >
          {item.material}
        </SelectItem>
      ))}
    </Select>
  );
};