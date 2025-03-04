'use client';
import { Input } from '@heroui/input';
import { Select, SelectItem } from '@heroui/select'
import React from 'react'

export default function ProductsFilter(props: any) {
  return (
    <div className='flex flex-wrap gap-4'>
      <Select label="Фильтр по категориям" radius='sm' size='sm' className='max-w-xs'>
        {props?.categories?.map((category: string) => (
          <SelectItem key={category}>
            {category}
          </SelectItem>
        ))}
      </Select>
      <Input label='Поиск товара' variant='bordered' type='search' placeholder='Поиск' radius='sm' size='sm' className='flex-1' />
    </div>
  )
}
