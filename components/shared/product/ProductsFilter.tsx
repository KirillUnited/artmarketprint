'use client';
import { Button } from '@heroui/button';
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader } from '@heroui/drawer';
import { FilterIcon } from 'lucide-react';
import React from 'react';
import { Form } from '@heroui/form';
import { FC } from 'react';

import { CategoryProps, CatFilter } from '@/components/ui/filter/CatFilter';
import { SortFilter } from '@/components/ui/filter/SortFilter';
import { MaterialFilter } from '@/components/ui/filter/MaterialFilter';
import LocalImageColorFilter from './ui/LocalImageColorFilter';

interface FilterGroupProps {
	sortOrder: string;
	selectedCategory: string;
	selectedMaterial: string;
	selectedImageColor: string;
	categories: CategoryProps[];
	materials: Array<{ material: string; count: number }>;
	products: any[];
	onFilterChange: (sortOrder: string, category: string, material?: string, imageColor?: string) => void;
}

/**
 * Component for grouping category and sort filters.
 *
 * @param {FilterGroupProps} props - The properties for the FilterGroup component.
 * @returns {JSX.Element} The rendered FilterGroup component.
 */
export const FilterGroup: FC<FilterGroupProps> = ({ sortOrder, selectedCategory, selectedMaterial, selectedImageColor, categories, materials, products, onFilterChange }) => {
	return (
		<Form className="flex flex-col">
			<div className="flex flex-col gap-4 w-full">
				<div className="pb-4 border-b border-gray-100">
					<h3 className="text-md font-medium mb-3">Сортировать</h3>
					<SortFilter selectedCategory={selectedCategory} sortOrder={sortOrder} onFilterChange={(sort: string, cat: string) => onFilterChange(sort, cat, selectedMaterial, selectedImageColor)} />
				</div>

				<div className="pb-4 border-b border-gray-100">
					<LocalImageColorFilter 
						products={products}
						selectedColor={selectedImageColor}
						onColorSelect={(color) => onFilterChange(sortOrder, selectedCategory, selectedMaterial, color)}
					/>
				</div>

				{materials && materials.length > 0 && (
					<div className="pb-4 border-b border-gray-100">
						<MaterialFilter
							materials={materials}
							selectedCategory={selectedCategory}
							selectedMaterial={selectedMaterial}
							sortOrder={sortOrder}
							onFilterChange={(sort, cat, material) => onFilterChange(sort, cat, material, selectedImageColor)}
						/>
					</div>
				)}

				{categories && (
					<div className="pb-4">
						<h3 className="text-md font-medium mb-3">Категории</h3>
						<CatFilter
							categories={categories}
							selectedCategory={selectedCategory}
							sortOrder={sortOrder}
							onFilterChange={(sort, cat) => onFilterChange(sort, cat, selectedMaterial, selectedImageColor)}
						/>
					</div>
				)}
			</div>

			{(selectedCategory || selectedMaterial || selectedImageColor) && (
				<Button
					className="w-full mt-2 sticky bottom-4 z-30"
					color="primary"
					radius="sm"
					size='sm'
					type="reset"
					onPress={() => onFilterChange('asc', '', '', '')}
				>
					Сбросить фильтры
				</Button>
			)}
		</Form>
	);
};

interface FilterButtonProps {
	onOpen: () => void;
}

/**
 * Button component to open the filter drawer.
 *
 * @param {FilterButtonProps} props - The properties for the FilterButton component.
 * @returns {JSX.Element} The rendered FilterButton component.
 */
export const FilterButton: FC<FilterButtonProps> = ({ onOpen }) => {
	return (
		<Button className="grow min-w-max border sticky top-20" color="primary" radius="sm" variant="bordered" onPress={onOpen}>
			<FilterIcon size={16} />
			<span className="text-sm">Фильтр по категориям</span>
		</Button>
	);
};

interface FilterDrawerProps {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	onFilterChange: (sortOrder: string, category: string, material?: string, imageColor?: string) => void;
	sortOrder: string;
	selectedCategory: string;
	selectedMaterial: string;
	selectedImageColor: string;
	categories: CategoryProps[];
	materials: Array<{ material: string; count: number }>;
	products: any[];
}

/**
 * Drawer component to display filters on mobile devices.
 *
 * @param {FilterDrawerProps} props - The properties for the FilterDrawer component.
 * @returns {JSX.Element} The rendered FilterDrawer component.
 */
export const FilterDrawer: FC<FilterDrawerProps> = ({ isOpen, onOpenChange, onFilterChange, sortOrder, selectedCategory, selectedMaterial, selectedImageColor, categories, materials, products }) => {
	return (
		<Drawer isOpen={isOpen} placement="right" size="full" onOpenChange={onOpenChange}>
			<DrawerContent>
				{(onClose) => (
					<>
						<DrawerHeader className="flex flex-col gap-1">Фильтры</DrawerHeader>
						<DrawerBody>
							<FilterGroup
								categories={categories}
								materials={materials}
								products={products}
								selectedCategory={selectedCategory}
								selectedImageColor={selectedImageColor}
								selectedMaterial={selectedMaterial}
								sortOrder={sortOrder}
								onFilterChange={(sort, cat, material, imageColor) => {
									onFilterChange(sort, cat, material, imageColor);
									onClose();
								}}
							/>
						</DrawerBody>
						<DrawerFooter>
							<Button color="danger" variant="light" onPress={onClose}>
								Закрыть
							</Button>
						</DrawerFooter>
					</>
				)}
			</DrawerContent>
		</Drawer>
	);
};

interface ProductsFilterProps {
	categories: CategoryProps[];
	materials: Array<{ material: string; count: number }>;
	products: any[];
	sortOrder: string;
	selectedCategory: string;
	selectedMaterial: string;
	selectedImageColor: string;
	onFilterChange: (sortOrder: string, category: string, material?: string, imageColor?: string) => void;
}

/**
 * Main component for rendering product filters.
 *
 * @param {ProductsFilterProps} props - The properties for the ProductsFilter component.
 * @returns {JSX.Element} The rendered ProductsFilter component.
 */
const ProductsFilter: FC<ProductsFilterProps> = ({ categories, materials, products, sortOrder, selectedCategory, selectedMaterial, selectedImageColor, onFilterChange }) => {
	return (
		<aside className="hidden md:block sticky top-24 self-start max-h-[calc(100vh-120px)] overflow-y-auto pr-4 scrollbar-hide">
			<FilterGroup
				categories={categories}
				materials={materials}
				products={products}
				selectedCategory={selectedCategory}
				selectedImageColor={selectedImageColor}
				selectedMaterial={selectedMaterial}
				sortOrder={sortOrder}
				onFilterChange={onFilterChange}
			/>
		</aside>
	);
};

export default ProductsFilter;