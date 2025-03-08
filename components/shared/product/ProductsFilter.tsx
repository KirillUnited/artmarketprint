'use client';
import { Accordion, AccordionItem } from '@heroui/accordion';
import { Button } from '@heroui/button';
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader } from '@heroui/drawer';
import { Input } from '@heroui/input';
import { useDisclosure } from '@heroui/modal';
import { Select, SelectItem } from '@heroui/select'
import { FilterIcon } from 'lucide-react';
import React from 'react';

export const getCategory = (category: string) => category.split('|').shift();

export default function ProductsFilter({ sortOrder, selectedCategory, onFilterChange, categories }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className='flex gap-4 justify-between items-center sticky top-16 z-30 bg-background py-4 border-bottom border-y
      '>
        <div className='flex gap-4 flex-1'>
          <Select label="Фильтр по категориям" labelPlacement='outside' aria-label='Select category' radius='sm' size='sm' className='hidden md:block w-80' onChange={(e) => onFilterChange(sortOrder, e.target.value)}>
            {categories?.map((category: string) => (
              <SelectItem key={category}>
                {getCategory(category)}
              </SelectItem>
            ))}
          </Select>
          <Input label='Поиск товара' labelPlacement='outside' variant='bordered' type='search' placeholder='Поиск' radius='sm' size='sm' classNames={{ inputWrapper: 'border-1' }} />
        </div>
        <div className='hidden md:flex gap-4'>
          <Select label="Сортировать цены" labelPlacement='outside' radius='sm' size='sm' className='w-60' onChange={(e) => onFilterChange(e.target.value, selectedCategory)}>
            <SelectItem key="desc" textValue='По убыванию'>
              По убыванию
            </SelectItem>
            <SelectItem key="asc" textValue='По возрастанию'>
              По возрастанию
            </SelectItem>
          </Select>
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
