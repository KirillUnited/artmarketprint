'use client';
import { Accordion, AccordionItem } from '@heroui/accordion';
import { Button } from '@heroui/button';
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader } from '@heroui/drawer';
import { FilterIcon } from 'lucide-react';
import React from 'react';
import { Form } from '@heroui/form';

import { FC } from 'react';
import { CatFilter } from '@/components/ui/filter/CatFilter';
import { SortFilter } from '@/components/ui/filter/SortFilter';

export const getCategory = (category: string) => category[0].split('|').shift();

interface FilterGroupProps {
  sortOrder: string;
  selectedCategory: string;
  categories: string[];
  onFilterChange: (sortOrder: string, category: string) => void;
}

/**
 * Component for grouping category and sort filters.
 *
 * @param {FilterGroupProps} props - The properties for the FilterGroup component.
 * @returns {JSX.Element} The rendered FilterGroup component.
 */
export const FilterGroup: FC<FilterGroupProps> = ({ sortOrder, selectedCategory, categories, onFilterChange }) => {
  return (
    <Form className='flex flex-col gap-4'>
      {/* Render category filter */}
      {categories && CatFilter({ sortOrder, onFilterChange, categories })}
      {/* Render sort filter */}
      {SortFilter({ sortOrder, selectedCategory, onFilterChange })}
      {/* Reset button to clear filters */}
      <Button color="danger" radius='sm' variant="light" type='reset' onPress={() => onFilterChange('asc', '')}>
        Сбросить
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
    <Button className='flex-grow min-w-max md:hidden border-1' radius='sm' color='primary' onPress={onOpen}>
      <FilterIcon size={16} />
      <span className='text-sm'>Фильтры по товарам</span>
    </Button>
  );
};

interface FilterDrawerProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onFilterChange: (sortOrder: string, category: string) => void;
  categories: string[];
  sortOrder: string;
  selectedCategory: string;
}

/**
 * Drawer component for displaying filters.
 *
 * @param {FilterDrawerProps} props - The properties for the FilterDrawer component.
 * @returns {JSX.Element} The rendered FilterDrawer component.
 */
export const FilterDrawer: FC<FilterDrawerProps> = ({ isOpen, onOpenChange, onFilterChange, categories, sortOrder, selectedCategory }) => {
  const categoriesSet = categories
    ?
    <AccordionItem classNames={{ title: 'font-semibold', trigger: 'font-semibold' }} title={'Категории'}>
      {CatFilter({ sortOrder, onFilterChange, categories })}
    </AccordionItem>
    : null;

  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange} radius='none'>
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-col gap-1">Фильтры по товарам</DrawerHeader>
            <Form className='w-full items-stretch'>
              <DrawerBody>
                <Accordion aria-label='Select category' selectionMode='multiple' title='Категории'>
                  {/* Accordion item for category filter */}
                  {categoriesSet}
                  {/* Accordion item for price sort filter */}
                  <AccordionItem classNames={{ title: 'font-semibold', trigger: 'font-semibold' }} title={'Цены'}>
                    {SortFilter({ sortOrder, selectedCategory, onFilterChange })}
                  </AccordionItem>
                </Accordion>
              </DrawerBody>
              <DrawerFooter>
                {/* Reset button to clear filters */}
                <Button color="danger" radius='sm' variant="light" type='reset' onPress={() => onFilterChange('asc', '')}>
                  Сбросить
                </Button>
                {/* Apply button to close the drawer */}
                <Button color="primary" radius='sm' variant="solid" onPress={onClose}>
                  Применить
                </Button>
              </DrawerFooter>
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
  categories: string[];
}

/**
 * Main component for filtering products.
 *
 * @param {ProductsFilterProps} props - The properties for the ProductsFilter component.
 * @returns {JSX.Element} The rendered ProductsFilter component.
 */
const ProductsFilter: FC<ProductsFilterProps> = ({ sortOrder, selectedCategory, onFilterChange, categories }) => {
  return (
    <div className='hidden md:flex flex-col gap-4 sticky top-20 z-30 bg-background'>
      <FilterGroup categories={categories} selectedCategory={selectedCategory} sortOrder={sortOrder} onFilterChange={onFilterChange} />
    </div>
  );
};

export default ProductsFilter;
