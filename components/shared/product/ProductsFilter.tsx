'use client';
import { Select, SelectItem } from '@heroui/select'
import React from 'react'

export default function ProductsFilter(props: any) {
  return (
    <div>
      <Select label="Фильтр по категориям" radius='sm' size='sm'>
        {props?.categories?.map((category: string) => (
          <SelectItem key={category}>
            {category}
          </SelectItem>
        ))}
      </Select>
    </div>
  )
}
