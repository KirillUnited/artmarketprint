import { Select, SelectItem } from "@heroui/select";
import { JSX } from "react";

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
  sortOrder,
  materials,
  onFilterChange
}: {
  selectedMaterial: string;
  sortOrder: string;
  materials: any;
  onFilterChange: (sortOrder: string, category: string, material: string) => void;
}) => JSX.Element = ({ selectedMaterial, sortOrder, materials, onFilterChange }) => {
  return (
    <Select
      size="sm"
      radius="sm"
      label="Материал"
      placeholder="Выберите материал"
      defaultSelectedKeys={selectedMaterial ? [selectedMaterial] : []}
      onChange={(e) => onFilterChange(sortOrder, '', e.target.value)}
      items={materials}
    >
      <SelectItem textValue="Все материалы" key="">
        Все материалы
      </SelectItem>
      {materials?.map((item: { material: string; count: number }) => (
        <SelectItem
          className="capitalize"
          key={item.material}
          textValue={item.material}
          description={`${item.count} шт.`}
        >
          {item.material}
        </SelectItem>
      ))}
    </Select>
  );
};