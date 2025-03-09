'use client';
import { Accordion, AccordionItem } from '@heroui/accordion';
import { Button } from '@heroui/button';
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader } from '@heroui/drawer';
import { Input } from '@heroui/input';
import { useDisclosure } from '@heroui/modal';
import { Select, SelectItem } from '@heroui/select'
import { FilterIcon } from 'lucide-react';
import { Radio, RadioGroup } from '@heroui/radio';
import React from 'react';

export const getCategory = (category: string) => category.split('|').shift();

export default function ProductsFilter({ sortOrder, selectedCategory, onFilterChange, categories }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className='flex flex-col gap-4 sticky top-16 z-30 bg-background py-4 border-bottom border-y
      '>
        <p className='text-2xl font-bold'>Фильтры</p>
        <div className='flex gap-4 flex-1'>
          <RadioGroup title='Фильтр по категориям' label='Фильтр по категориям'>
            {categories?.map((category: string) => (
              <Radio key={category} value={category} onChange={(e) => onFilterChange(sortOrder, e.target.value)}>
                {getCategory(category)}
              </Radio>
            ))}
          </RadioGroup>
        </div>
        <div className='hidden md:flex gap-4'>
          <RadioGroup title='Сортировать цены' label='Сортировать цены'>
            <Radio value="desc" onChange={(e) => onFilterChange(e.target.value, selectedCategory)}>По убыванию</Radio>
            <Radio value="asc" onChange={(e) => onFilterChange(e.target.value, selectedCategory)}>По возрастанию</Radio>
          </RadioGroup>
        </div>
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
                    <AccordionItem title={`Категории`}>
                      {categories?.map((category: string) => (
                        <p key={category}>
                          {getCategory(category)}
                        </p>
                      ))}
                    </AccordionItem>
                    <AccordionItem title={`Сортировать цены`}>
                      <p>По убыванию</p>
                      <p>По возрастанию</p>
                    </AccordionItem>
                  </Accordion>
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
      </div>

    </>
  )
}
