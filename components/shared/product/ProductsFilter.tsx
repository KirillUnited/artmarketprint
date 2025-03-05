'use client';
import { Input } from '@heroui/input';
import { Select, SelectItem } from '@heroui/select'
import React from 'react'

export default function ProductsFilter(props: any) {
  return (
    <div className='flex flex-wrap gap-4'>
      <Select label="Фильтр по категориям" labelPlacement='outside' radius='sm' size='sm'>
        {props?.categories?.map((category: string) => (
          <SelectItem key={category}>
            {category}
          </SelectItem>
        ))}
      </Select>
      <Input label='Поиск товара' labelPlacement='outside' variant='bordered' type='search' placeholder='Поиск' radius='sm' size='sm' className='flex-1' />
      <Select label="Сортировать" labelPlacement='outside' radius='sm' size='sm'>
        <SelectItem key="1" textValue='По убыванию'>
          По убыванию
        </SelectItem>
        <SelectItem key="2" textValue='По возрастанию'>
          По возрастанию
        </SelectItem>
      </Select>
    </div>
  )
}
