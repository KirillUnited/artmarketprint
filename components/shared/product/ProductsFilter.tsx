'use client';
import { Accordion, AccordionItem } from '@heroui/accordion';
import { Button } from '@heroui/button';
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader } from '@heroui/drawer';
import { FilterIcon } from 'lucide-react';
import { Radio, RadioGroup } from '@heroui/radio';
import React from 'react';
import { Form } from '@heroui/form';

export const getCategory = (category: string) => category[0].split('|').shift();

import { FC } from 'react';

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
        {categories?.map((category: string) => (
          <Radio key={category} value={category} onChange={(e) => onFilterChange(sortOrder, e.target.value)}>
            {category}
          </Radio>
        ))}
      </RadioGroup>
    </div>
  )
};
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
        label='Сортировать цены'
        title='Сортировать цены'
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
      {CatFilter({ sortOrder, onFilterChange, categories })}
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
    <Button className='md:hidden border-1' radius='sm' color='primary' onPress={onOpen}>
      <span className='text-sm'>Фильтры</span>
      <FilterIcon size={16} />
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
  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange} radius='none'>
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-col gap-1">Фильтры</DrawerHeader>
            <Form className='w-full items-stretch'>
              <DrawerBody>
                <Accordion aria-label='Select category' selectionMode='multiple' title='Категории'>
                  {/* Accordion item for category filter */}
                  <AccordionItem classNames={{ title: 'font-semibold', trigger: 'font-semibold' }} title={'Категории'}>
                    {CatFilter({ sortOrder, onFilterChange, categories })}
                  </AccordionItem>
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
