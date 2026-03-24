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

interface FilterGroupProps {
	sortOrder: string;
	selectedCategory: string;
	selectedMaterial: string;
	categories: CategoryProps[];
	materials: Array<{ material: string; count: number }>;
	onFilterChange: (sortOrder: string, category: string, material?: string) => void;
}

/**
 * Component for grouping category and sort filters.
 *
 * @param {FilterGroupProps} props - The properties for the FilterGroup component.
 * @returns {JSX.Element} The rendered FilterGroup component.
 */
export const FilterGroup: FC<FilterGroupProps> = ({ sortOrder, selectedCategory, selectedMaterial, categories, materials, onFilterChange }) => {
	return (
		<Form className="flex flex-col">
			<div className="flex flex-col gap-4 w-full">
				<div className="pb-4 border-b border-gray-100">
					<h3 className="text-md font-medium mb-3">Сортировать</h3>
					<SortFilter selectedCategory={selectedCategory} sortOrder={sortOrder} onFilterChange={(sort: string, cat: string) => onFilterChange(sort, cat)} />
				</div>

				{materials && materials.length > 0 && (
					<div className="pb-4 border-b border-gray-100">
						<MaterialFilter
							materials={materials}
							selectedCategory={selectedCategory}
							selectedMaterial={selectedMaterial}
							sortOrder={sortOrder}
							onFilterChange={(sort, cat, material) => onFilterChange(sort, cat, material)}
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
							onFilterChange={(sort, cat) => onFilterChange(sort, cat)}
						/>
					</div>
				)}
			</div>

			{(selectedCategory || selectedMaterial) && (
				<Button
					className="w-full mt-2 sticky bottom-4 z-30"
					color="primary"
					radius="sm"
					size='sm'
					type="reset"
					onPress={() => onFilterChange('asc', '', '')}
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
	onFilterChange: (sortOrder: string, category: string, material?: string) => void;
	categories: CategoryProps[];
	materials?: Array<{ material: string; count: number }>;
	sortOrder: string;
	selectedCategory: string;
	selectedMaterial: string;
}

/**
 * Drawer component for displaying filters.
 *
 * @param {FilterDrawerProps} props - The properties for the FilterDrawer component.
 * @returns {JSX.Element} The rendered FilterDrawer component.
 */
export const FilterDrawer: FC<FilterDrawerProps> = ({ isOpen, onOpenChange, onFilterChange, categories, materials, sortOrder, selectedCategory, selectedMaterial }) => {
	const categoriesSet = categories ? (
		<CatFilter
			categories={categories}
			selectedCategory={selectedCategory}
			sortOrder={sortOrder}
			onFilterChange={(sort, cat) => onFilterChange(sort, cat)}
		/>
	) : null;

	const materialsSet = materials && materials.length > 0 ? (
		<MaterialFilter
			materials={materials}
			selectedCategory={selectedCategory}
			selectedMaterial={selectedMaterial}
			sortOrder={sortOrder}
			onFilterChange={(sort, cat, material) => onFilterChange(sort, cat, material)}
		/>
	) : null;

	return (
		<Drawer isOpen={isOpen} radius="none" onOpenChange={onOpenChange}>
			<DrawerContent>
				{(onClose) => (
					<>
						<DrawerHeader className="flex flex-col gap-1">Фильтры по товарам</DrawerHeader>
						<Form className="left-0w-full items-stretch">
							<DrawerBody className="pb-20">{categoriesSet}</DrawerBody>
							{selectedCategory && (
								<DrawerFooter className="absolute left-0 right-0 bottom-0 w-full bg-background border-t">
									{/* Reset button to clear filters */}
									<Button color="default" radius="sm" type="reset" variant="solid" onPress={() => onFilterChange('asc', '', '')}>
										Сбросить
									</Button>
									{/* Apply button to close the drawer */}
									<Button color="primary" radius="sm" variant="solid" onPress={onClose}>
										Применить
									</Button>
								</DrawerFooter>
							)}
						</Form>
					</>
				)}
			</DrawerContent>
		</Drawer>
	);
};

interface ProductsFilterProps {
	sortOrder: string;
	selectedCategory: string;
	onFilterChange: (sortOrder: string, category: string) => void;
	categories: CategoryProps[];
	materials?: Array<{ material: string; count: number }>;
	selectedMaterial: string;
}

/**
 * Main component for filtering products.
 *
 * @param {ProductsFilterProps} props - The properties for the ProductsFilter component.
 * @returns {JSX.Element} The rendered ProductsFilter component.
 */
const ProductsFilter: FC<ProductsFilterProps> = ({ sortOrder, selectedCategory, onFilterChange, categories, materials = [], selectedMaterial }) => {
	return (
		<div className="hidden md:flex flex-col gap-4 sticky top-20 z-30 bg-background">
			<FilterGroup categories={categories} materials={materials} selectedCategory={selectedCategory} selectedMaterial={selectedMaterial} sortOrder={sortOrder} onFilterChange={onFilterChange} />

		</div>
	);
};

export default ProductsFilter;
