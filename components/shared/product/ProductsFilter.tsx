'use client';
import { Input } from '@heroui/input';
import { Select, SelectItem } from '@heroui/select'
import React from 'react'

export default function ProductsFilter(props: any) {
  return (
    <div className='flex gap-4 justify-between sticky top-0 z-10 bg-background py-4 border-bottom border-y
    '>
      <div className='flex gap-4 flex-1'>
        <Select label="Фильтр по категориям" labelPlacement='outside' radius='sm' size='sm' selectionMode='multiple' className='w-60'>
          {props?.categories?.map((category: string) => (
            <SelectItem key={category}>
              {category}
            </SelectItem>
          ))}
        </Select>
        <Input label='Поиск товара' labelPlacement='outside' variant='bordered' type='search' placeholder='Поиск' radius='sm' size='sm' />
      </div>
      <div className='flex gap-4'>
        <Select label="Сортировать" labelPlacement='outside' radius='sm' size='sm' className='w-60'>
          <SelectItem key="1" textValue='По убыванию'>
            По убыванию
          </SelectItem>
          <SelectItem key="2" textValue='По возрастанию'>
            По возрастанию
          </SelectItem>
        </Select>
      </div>
    </div>
  )
}
