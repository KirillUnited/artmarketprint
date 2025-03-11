'use client';
import { Accordion, AccordionItem } from '@heroui/accordion';
import { Button } from '@heroui/button';
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader } from '@heroui/drawer';
import { useDisclosure } from '@heroui/modal';
import { FilterIcon } from 'lucide-react';
import { Radio, RadioGroup } from '@heroui/radio';
import React from 'react';

export const getCategory = (category: string) => category.split('|').shift();

export const CatFilter = ({ sortOrder, onFilterChange, categories }: any) => {
  return (
    <div className='flex gap-4 flex-1'>
      <RadioGroup title='Фильтр по категориям' label='Фильтр по категориям' classNames={{ label: 'font-semibold text-foreground' }}>
        {categories?.map((category: string) => (
          <Radio key={category} value={category} onChange={(e) => onFilterChange(sortOrder, e.target.value)}>
            {getCategory(category)}
          </Radio>
        ))}
      </RadioGroup>
    </div>
  )
};
export const SortFilter = ({ sortOrder, selectedCategory, onFilterChange }: any) => {
  return (
    <div className='flex gap-4'>
      <RadioGroup title='Сортировать цены' label='Сортировать цены' classNames={{ label: 'font-semibold text-foreground' }}>
        <Radio value="desc" onChange={(e) => onFilterChange(e.target.value, selectedCategory)}>По убыванию</Radio>
        <Radio value="asc" onChange={(e) => onFilterChange(e.target.value, selectedCategory)}>По возрастанию</Radio>
      </RadioGroup>
    </div>
  )
};
export const FilterGroup = ({ sortOrder, selectedCategory, categories, onFilterChange }: any) => {
  return (
    <div className='hidden md:flex flex-col gap-4'>
      <p className='text-2xl font-bold'>Фильтры</p>
      {
        CatFilter({ sortOrder, onFilterChange, categories })
      }
      {
        SortFilter({ sortOrder, selectedCategory, onFilterChange })
      }
    </div>

  )
}

export default function ProductsFilter({ sortOrder, selectedCategory, onFilterChange, categories }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className='flex flex-col gap-4 sticky top-16 z-30 bg-background py-4 border-bottom border-y
      '>
        <FilterGroup sortOrder={sortOrder} selectedCategory={selectedCategory} onFilterChange={onFilterChange} categories={categories} />
        <Button isIconOnly variant='light' onPress={onOpen} className='md:hidden'>
          <FilterIcon />
        </Button>
        <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
          <DrawerContent>
            {(onClose) => (
              <>
                <DrawerHeader className="flex flex-col gap-1">Фильтры</DrawerHeader>
                <DrawerBody>
                  <Accordion title='Категории' aria-label='Select category' selectionMode='multiple' className='w-80'>
                    <AccordionItem title={`Категории`} classNames={
                      {
                        title: 'font-semibold',
                        trigger: 'font-semibold',
                      }
                    }>
                      {CatFilter({ sortOrder, onFilterChange, categories })}
                    </AccordionItem>
                    <AccordionItem title={`Сортировать цены`} classNames={
                      {
                        title: 'font-semibold',
                        trigger: 'font-semibold',
                      }
                    }>
                      {SortFilter({ sortOrder, selectedCategory, onFilterChange })}
                    </AccordionItem>
                  </Accordion>
                </DrawerBody>
                <DrawerFooter>
                  <Button color="primary" variant="solid" onPress={onClose} radius='sm'>
                    Применить
                  </Button>
                </DrawerFooter>
              </>
            )}
          </DrawerContent>
        </Drawer>
      </div>

    </>
  )
}
