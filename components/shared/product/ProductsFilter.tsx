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
			<div className="flex flex-col gap-4 max-w-full">
				<div className="pb-4 border-b border-gray-100">
					<h3 className="text-md font-medium mb-3">Сортировать</h3>
					<SortFilter sortOrder={sortOrder} selectedCategory={selectedCategory} onFilterChange={(sort: string, cat: string) => onFilterChange(sort, cat)} />
				</div>

				{materials && materials.length > 0 && (
					<div className="pb-4 border-b border-gray-100">
						<MaterialFilter
							sortOrder={sortOrder}
							selectedMaterial={selectedMaterial}
							materials={materials}
							onFilterChange={(sort, cat, material) => onFilterChange(sort, cat, material)}
						/>
					</div>
				)}
				
				{categories && (
					<div className="pb-4">
						<h3 className="text-md font-medium mb-3">Категории</h3>
						<CatFilter 
							sortOrder={sortOrder} 
							onFilterChange={(sort, cat) => onFilterChange(sort, cat)} 
							categories={categories} 
							selectedCategory={selectedCategory} 
						/>
					</div>
				)}
			</div>
			
			<Button 
				color="default" 
				radius="sm" 
				variant="solid" 
				type="reset" 
				className="w-full mt-2"
				onPress={() => onFilterChange('asc', '', '')}
			>
				Сбросить фильтры
			</Button>
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
		<Button className="flex-grow min-w-max border-1 sticky top-20" radius="sm" color="primary" variant="bordered" onPress={onOpen}>
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
			sortOrder={sortOrder}
			onFilterChange={(sort, cat) => onFilterChange(sort, cat)}
			categories={categories}
			selectedCategory={selectedCategory}
		/>
	) : null;

	const materialsSet = materials && materials.length > 0 ? (
		<MaterialFilter
			sortOrder={sortOrder}
			selectedMaterial={selectedMaterial}
			materials={materials}
			onFilterChange={(sort, cat, material) => onFilterChange(sort, cat, material)}
		/>
	) : null;

	return (
		<Drawer isOpen={isOpen} onOpenChange={onOpenChange} radius="none">
			<DrawerContent>
				{(onClose) => (
					<>
						<DrawerHeader className="flex flex-col gap-1">Фильтры по товарам</DrawerHeader>
						<Form className="left-0w-full items-stretch">
							<DrawerBody className="pb-20">{categoriesSet}</DrawerBody>
							{selectedCategory && (
								<DrawerFooter className="absolute left-0 right-0 bottom-0 w-full bg-background border-t-1">
									{/* Reset button to clear filters */}
									<Button color="default" radius="sm" variant="solid" type="reset" onPress={() => onFilterChange('asc', '', '')}>
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
const ProductsFilter: FC<ProductsFilterProps> = ({ sortOrder, selectedCategory, onFilterChange, categories, materials=[], selectedMaterial }) => {
	return (
		<div className="hidden md:flex flex-col gap-4 sticky top-20 z-30 bg-background">
			<FilterGroup categories={categories} selectedCategory={selectedCategory} sortOrder={sortOrder} onFilterChange={onFilterChange} materials={materials} selectedMaterial={selectedMaterial} />

		</div>
	);
};

export default ProductsFilter;
