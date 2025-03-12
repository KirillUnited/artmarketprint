'use client';
import { Accordion, AccordionItem } from '@heroui/accordion';
import { Button } from '@heroui/button';
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader } from '@heroui/drawer';
import { useDisclosure } from '@heroui/modal';
import { FilterIcon } from 'lucide-react';
import { Radio, RadioGroup } from '@heroui/radio';
import React from 'react';
import { Form } from '@heroui/form';

export const getCategory = (category: string) => category.split('|').shift();

export const CatFilter = ({ sortOrder, onFilterChange, categories }: any) => {
  return (
    <div className='flex gap-4 flex-1'>
      <RadioGroup classNames={{ label: 'font-semibold text-foreground' }} label='Фильтр по категориям' title='Фильтр по категориям'>
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
      <RadioGroup classNames={{ label: 'font-semibold text-foreground' }} label='Сортировать цены' title='Сортировать цены'>
        <Radio value="desc" onChange={(e) => onFilterChange(e.target.value, selectedCategory)}>По убыванию</Radio>
        <Radio value="asc" onChange={(e) => onFilterChange(e.target.value, selectedCategory)}>По возрастанию</Radio>
      </RadioGroup>
    </div>
  )
};
export const FilterGroup = ({ sortOrder, selectedCategory, categories, onFilterChange }: any) => {
  return (
    <Form className='hidden md:flex flex-col gap-4'>
      {
        CatFilter({ sortOrder, onFilterChange, categories })
      }
      {
        SortFilter({ sortOrder, selectedCategory, onFilterChange })
      }

      <Button color="danger" radius='sm' variant="light" type='reset'>
        Сбросить
      </Button>
    </Form>

  )
}

export default function ProductsFilter({ sortOrder, selectedCategory, onFilterChange, categories }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className='flex flex-col gap-4 sticky top-20 z-30 bg-background'>
        <FilterGroup categories={categories} selectedCategory={selectedCategory} sortOrder={sortOrder} onFilterChange={onFilterChange} />
        <Button isIconOnly className='md:hidden' variant='shadow' radius='sm' onPress={onOpen}>
          <FilterIcon />
        </Button>
        <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
          <DrawerContent>
            {(onClose) => (
              <>
                <DrawerHeader className="flex flex-col gap-1">Фильтры</DrawerHeader>
                <Form className='w-full items-stretch'>
                  <DrawerBody>
                    <Accordion aria-label='Select category' selectionMode='multiple' title='Категории'>
                      <AccordionItem classNames={
                        {
                          title: 'font-semibold',
                          trigger: 'font-semibold',
                        }
                      } title={'Категории'}>
                        {CatFilter({ sortOrder, onFilterChange, categories })}
                      </AccordionItem>
                      <AccordionItem classNames={
                        {
                          title: 'font-semibold',
                          trigger: 'font-semibold',
                        }
                      } title={'Цены'}>
                        {SortFilter({ sortOrder, selectedCategory, onFilterChange })}
                      </AccordionItem>
                    </Accordion>
                  </DrawerBody>
                  <DrawerFooter>
                    <Button color="danger" radius='sm' variant="light" type='reset'>
                      Сбросить
                    </Button>
                    <Button color="primary" radius='sm' variant="solid" onPress={onClose}>
                      Применить
                    </Button>
                  </DrawerFooter>
                </Form>
              </>
            )}
          </DrawerContent>
        </Drawer>
      </div>

    </>
  )
}
